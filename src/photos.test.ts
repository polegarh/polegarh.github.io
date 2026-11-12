import { statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { FOG, SHARP } from './photos'

// A missing photo does not fail the build: Vite leaves the URL as-is and the page drops to its error state.
describe('photos behind the glass', () => {
  it.each([
    ['sharp', SHARP],
    ['fog', FOG],
  ])('%s plate points at a real, non-empty file', (_name, url) => {
    expect(statSync(fileURLToPath(url)).size).toBeGreaterThan(1000)
  })
})
