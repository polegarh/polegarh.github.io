import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import Profile from './Profile'

const html = renderToStaticMarkup(<Profile />)

describe('Profile', () => {
  it('leads with Budget & Chill, before anything else on the page', () => {
    const feature = html.indexOf('https://budgetchill.app')
    const about = html.indexOf('>About<')
    const experience = html.indexOf('>Experience<')
    expect(feature).toBeGreaterThan(-1)
    expect(about).toBeGreaterThan(-1)
    expect(experience).toBeGreaterThan(-1)
    expect(feature).toBeLessThan(about)
    expect(feature).toBeLessThan(experience)
  })

  it('is the #work target the hero finale links to', () => {
    expect(html).toMatch(/<section id="work"[^>]*>[\s\S]*budgetchill\.app/)
  })

  it('lists every employer from the profile', () => {
    const found = new Set([...html.matchAll(/<h3>([^<]+)<\/h3>/g)].map((m) => m[1]))
    for (const org of ['Cypris AI', 'Total Expert', 'Gumroad', 'CNA Insurance']) expect(found).toContain(org)
  })

  it('sends people to the writing and the code', () => {
    const hrefs = new Set([...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]))
    for (const url of ['https://olegpuchkov.substack.com/', 'https://medium.com/@PuchkovOleg', 'https://github.com/polegarh'])
      expect(hrefs).toContain(url)
  })

  // The source PDF carries a mobile number; the public page must never.
  it('publishes no phone number', () => {
    const text = html.replace(/<[^>]+>/g, ' ')
    expect(text).not.toMatch(/\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/)
    expect(html).not.toMatch(/tel:/i)
  })
})
