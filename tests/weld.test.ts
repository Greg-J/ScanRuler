// SPDX-License-Identifier: AGPL-3.0-only
import { describe, expect, it } from 'vitest'
import { filterDegenerateTriangles, weldTriangleSoup } from '../src/core/geometry/weld'

describe('triangle soup welding', () => {
  it.each([0, 1, 2])('joins signed zero on coordinate %s without changing the input', (axis) => {
    const soup = Float32Array.of(0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1)
    soup[9 + axis] = -0
    const { positions, indices } = weldTriangleSoup(soup)
    expect(positions.length / 3).toBe(4)
    expect(Array.from(indices)).toEqual([0, 1, 2, 0, 2, 3])
    expect(Object.is(soup[9 + axis], -0)).toBe(true)
  })

  it('joins a positive zero to a negative zero encountered first', () => {
    const soup = Float32Array.of(-0, -0, -0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1)
    const { positions, indices } = weldTriangleSoup(soup)
    expect(positions.length / 3).toBe(4)
    expect(Array.from(indices)).toEqual([0, 1, 2, 0, 2, 3])
  })

  it('keeps distinct nonzero coordinates separate', () => {
    const soup = Float32Array.of(0, 0, 0, 1, 0, 0, 0, 1, 0, 1e-10, 0, 0, 0, 1, 0, 0, 0, 1)
    expect(weldTriangleSoup(soup).positions.length / 3).toBe(5)
  })
})


describe('degenerate triangle filtering', () => {
  it('keeps every valid triangle in order and returns storage independent of the input', () => {
    const backing = Uint32Array.of(99, 0, 1, 2, 2, 3, 0, 99)
    const input = backing.subarray(1, 7)
    const filtered = filterDegenerateTriangles(input)
    expect(Array.from(filtered)).toEqual([0, 1, 2, 2, 3, 0])
    expect(filtered.buffer.byteLength).toBe(filtered.byteLength)
    filtered[0] = 42
    expect(Array.from(backing)).toEqual([99, 0, 1, 2, 2, 3, 0, 99])
  })

  it('removes repeated-index triangles without changing valid neighbours or the source', () => {
    const input = Uint32Array.of(0, 1, 2, 0, 0, 1, 2, 3, 2, 4, 5, 5, 2, 3, 4)
    const before = input.slice()
    const filtered = filterDegenerateTriangles(input)
    expect(Array.from(filtered)).toEqual([0, 1, 2, 2, 3, 4])
    expect(filtered.buffer.byteLength).toBe(filtered.byteLength)
    expect(input).toEqual(before)
  })

  it('returns an empty exact-sized result for empty or entirely degenerate input', () => {
    for (const input of [new Uint32Array(0), Uint32Array.of(1, 1, 1, 2, 3, 3)]) {
      const filtered = filterDegenerateTriangles(input)
      expect(filtered.length).toBe(0)
      expect(filtered.buffer.byteLength).toBe(0)
    }
  })
})
