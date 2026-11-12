// A generated sauna soundscape: a slow drone, a singing bowl now and then, and steam hiss.
// Nothing is downloaded; the volume follows how clear the glass is.

const clamp01 = (v: number) => Math.max(0, Math.min(1, v))

/** 0..1 volume for the glass: faint while fogged, full once it's clear (by scroll or by wiping). */
export function levelFor(sweep: number, clear: number) {
  const v = clamp01(Math.max(sweep, clear))
  return 0.08 + 0.92 * Math.pow(v, 1.5)
}

/** Sound is on unless this visitor turned it off before. */
export const wantsSound = (pref: string | null) => pref !== 'off'

const PEAK = 0.5
const DRONE = [73.42, 110, 146.83, 164.81, 220] // D2 A2 D3 E3 A3: open fifths with an added ninth
const BOWLS = [220, 293.66, 440]

export class SaunaSound {
  playing = false
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private wet: ConvolverNode | null = null
  private level = levelFor(0, 0)
  private bowlTimer = 0

  start() {
    if (typeof window === 'undefined' || !('AudioContext' in window)) return
    if (!this.ctx) this.build()
    this.playing = true
    void this.ctx!.resume()
    this.setLevel(this.level)
    this.scheduleBowl(1.5)
  }

  stop() {
    this.playing = false
    window.clearTimeout(this.bowlTimer)
    if (!this.ctx || !this.master) return
    this.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.15)
    window.setTimeout(() => !this.playing && this.ctx?.suspend(), 600)
  }

  setLevel(v: number) {
    this.level = v
    if (!this.ctx || !this.master || !this.playing) return
    this.master.gain.setTargetAtTime(v * PEAK, this.ctx.currentTime, 0.5)
  }

  dispose() {
    this.playing = false
    window.clearTimeout(this.bowlTimer)
    document.removeEventListener('visibilitychange', this.onVisibility)
    void this.ctx?.close()
    this.ctx = null
  }

  private onVisibility = () => {
    if (!this.ctx || !this.playing) return
    if (document.hidden) void this.ctx.suspend()
    else void this.ctx.resume()
  }

  private build() {
    const ctx = new AudioContext()
    this.ctx = ctx
    const master = ctx.createGain()
    master.gain.value = 0
    const comp = ctx.createDynamicsCompressor()
    master.connect(comp).connect(ctx.destination)
    this.master = master

    const wet = ctx.createConvolver()
    wet.buffer = this.impulse(4.5)
    const wetGain = ctx.createGain()
    wetGain.gain.value = 0.8
    wet.connect(wetGain).connect(master)
    this.wet = wet

    // drone: each note is a sine plus a slightly detuned triangle, breathing on its own slow LFO
    const padFilter = ctx.createBiquadFilter()
    padFilter.type = 'lowpass'
    padFilter.frequency.value = 700
    padFilter.Q.value = 0.5
    this.lfo(0.03, 250).connect(padFilter.frequency)
    const padDry = ctx.createGain()
    padDry.gain.value = 0.6
    padFilter.connect(padDry).connect(master)
    padFilter.connect(wet)
    DRONE.forEach((f, i) => {
      const g = ctx.createGain()
      const base = 0.07 / (1 + i * 0.35)
      g.gain.value = base
      this.lfo(0.04 + Math.random() * 0.06, base * 0.6).connect(g.gain)
      for (const [type, cents] of [['sine', 0], ['triangle', 5]] as const) {
        const o = ctx.createOscillator()
        o.type = type
        o.frequency.value = f
        o.detune.value = cents
        o.connect(g)
        o.start()
      }
      g.connect(padFilter)
    })

    // steam: filtered noise, very low
    const noise = ctx.createBufferSource()
    const nb = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate)
    const nd = nb.getChannelData(0)
    for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1
    noise.buffer = nb
    noise.loop = true
    const band = ctx.createBiquadFilter()
    band.type = 'bandpass'
    band.frequency.value = 3200
    band.Q.value = 0.7
    const hiss = ctx.createGain()
    hiss.gain.value = 0.012
    this.lfo(0.07, 0.008).connect(hiss.gain)
    noise.connect(band).connect(hiss)
    hiss.connect(master)
    hiss.connect(wet)
    noise.start()

    document.addEventListener('visibilitychange', this.onVisibility)
  }

  private lfo(hz: number, depth: number) {
    const ctx = this.ctx!
    const o = ctx.createOscillator()
    o.frequency.value = hz
    const g = ctx.createGain()
    g.gain.value = depth
    o.connect(g)
    o.start()
    return g
  }

  private impulse(seconds: number) {
    const ctx = this.ctx!
    const len = Math.floor(ctx.sampleRate * seconds)
    const buf = ctx.createBuffer(2, len, ctx.sampleRate)
    for (let c = 0; c < 2; c++) {
      const d = buf.getChannelData(c)
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.5)
    }
    return buf
  }

  private scheduleBowl(inSeconds: number) {
    window.clearTimeout(this.bowlTimer)
    this.bowlTimer = window.setTimeout(() => {
      if (!this.playing) return
      this.strike()
      this.scheduleBowl(9 + Math.random() * 8)
    }, inSeconds * 1000)
  }

  private strike() {
    const ctx = this.ctx
    if (!ctx || !this.master || !this.wet) return
    const t = ctx.currentTime
    const f = BOWLS[Math.floor(Math.random() * BOWLS.length)]
    ;[
      [1, 0.1, 8],
      [2.71, 0.04, 5],
      [5.15, 0.015, 3],
    ].forEach(([ratio, amp, decay]) => {
      const o = ctx.createOscillator()
      o.frequency.value = f * ratio
      const g = ctx.createGain()
      g.gain.setValueAtTime(0, t)
      g.gain.linearRampToValueAtTime(amp, t + 0.02)
      g.gain.exponentialRampToValueAtTime(0.0001, t + decay)
      o.connect(g)
      g.connect(this.master!)
      g.connect(this.wet!)
      o.start(t)
      o.stop(t + decay + 0.1)
    })
  }
}
