// SPDX-License-Identifier: AGPL-3.0-only
// Cold production startup, including a real Settings click. Owns a local
// gzip server and fresh headless profiles; never targets an existing server.
// Run npm run build first. Do not run alongside another timing/GPU job.
import { createServer } from 'node:http'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, extname, sep } from 'node:path'
import { gzipSync } from 'node:zlib'
import puppeteer from 'puppeteer-core'

const root = resolve('dist'), cache = new Map()
const types = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html',
  '.wasm': 'application/wasm', '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
  '.png': 'image/png', '.ttf': 'font/ttf', '.ico': 'image/x-icon' }
const server = createServer((req, res) => {
  try {
    let file = resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://local').pathname))
    if (file === root) file = resolve(root, 'index.html')
    if (!file.startsWith(root + sep) || !existsSync(file)) {
      res.writeHead(404); res.end(); return
    }
    if (!cache.has(file)) cache.set(file, gzipSync(readFileSync(file)))
    const data = cache.get(file)
    res.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream',
      'Content-Encoding': 'gzip', 'Content-Length': data.length, 'Cache-Control': 'no-store' })
    res.end(data)
  } catch { res.writeHead(500); res.end() }
})
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const origin = `http://127.0.0.1:${server.address().port}`
const executablePath = process.env.CHROME ?? (process.platform === 'darwin'
  ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  : process.platform === 'win32' ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' : '/usr/bin/google-chrome')
try {
  for (const mode of ['default', 'none']) for (let run = 0; run < 3; run++) {
    const browser = await puppeteer.launch({ executablePath, headless: true, defaultViewport: { width: 1440, height: 900 } })
    try {
      const page = await browser.newPage(), errors = []
      page.on('pageerror', (error) => errors.push(String(error)))
      const cdp = await page.createCDPSession()
      await cdp.send('Network.enable')
      await cdp.send('Network.setCacheDisabled', { cacheDisabled: true })
      await cdp.send('Network.emulateNetworkConditions', {
        offline: false, latency: 100, downloadThroughput: 1_000_000, uploadThroughput: 500_000,
      })
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 })
      await page.goto(origin + (mode === 'none' ? '/?plugins=none' : '/'), { waitUntil: 'domcontentloaded' })
      await page.waitForSelector('[data-test=open-settings]', { visible: true })
      const buttonAt = await page.evaluate(() => performance.now())
      await page.click('[data-test=open-settings]')
      await page.waitForSelector('[data-test=settings-modal]', { visible: true })
      const result = await page.evaluate(() => ({
        usableMs: performance.now(),
        paints: performance.getEntriesByType('paint').map((e) => ({ name: e.name, ms: e.startTime })),
        resources: performance.getEntriesByType('resource').filter((e) => /\.js|\.css|\.wasm/.test(e.name))
          .map((e) => ({ name: new URL(e.name).pathname, encoded: e.encodedBodySize, decoded: e.decodedBodySize, duration: e.duration })),
      }))
      console.log(JSON.stringify({ mode, run, buttonAt, ...result, errors,
        profile: { cpu: 4, latency: 100, bytesPerSecond: 1_000_000, gzip: true, cold: true } }))
      if (errors.length) process.exitCode = 1
    } finally { await browser.close() }
  }
} finally { await new Promise((resolve) => server.close(resolve)) }
