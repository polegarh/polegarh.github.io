import { describe, expect, it } from 'vitest'
import { SaunaSound, levelFor, wantsSound } from './SaunaSound'

describe('levelFor', () => {
  it('is faint but audible while the glass is fogged', () => {
    expect(levelFor(0, 0)).toBeGreaterThan(0)
    expect(levelFor(0, 0)).toBeLessThan(0.15)
  })

  it('is full once the glass is clear, by scrolling or by wiping', () => {
    expect(levelFor(1, 0)).toBe(1)
    expect(levelFor(0, 1)).toBe(1)
  })

  it('gets louder as the glass clears', () => {
    const steps = [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1].map((v) => levelFor(v, 0))
    for (let i = 1; i < steps.length; i++) expect(steps[i]).toBeGreaterThan(steps[i - 1])
  })

  it('never leaves 0..1, even for out-of-range input', () => {
    expect(levelFor(-1, -1)).toBeGreaterThanOrEqual(0)
    expect(levelFor(3, 3)).toBe(1)
  })
})

describe('SaunaSound', () => {
  it('does nothing, and does not throw, where there is no Web Audio', () => {
    const s = new SaunaSound()
    s.start()
    expect(s.playing).toBe(false)
  })
})

describe('wantsSound', () => {
  it('is on by default and stays off only for a visitor who turned it off', () => {
    expect(wantsSound(null)).toBe(true)
    expect(wantsSound('on')).toBe(true)
    expect(wantsSound('off')).toBe(false)
  })
})
