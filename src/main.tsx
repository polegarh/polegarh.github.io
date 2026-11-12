import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource-variable/inter'
import '@fontsource/ibm-plex-mono/500.css'
import './condensation.css'
import './profile.css'
import CondensationHero from './CondensationHero'
import Profile from './Profile'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main>
      <CondensationHero />
      <Profile />
    </main>
  </StrictMode>,
)
