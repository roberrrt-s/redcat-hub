import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Baloo 2 — a chunky rounded face in the spirit of the RedCat box art.
// Self-hosted via @fontsource: no third-party requests, two weights only.
import '@fontsource/baloo-2/latin-700.css'
import '@fontsource/baloo-2/latin-800.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
