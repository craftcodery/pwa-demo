import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.tsx'

// Register service worker with auto-update
registerSW({
  onNeedRefresh() {
    // Could show a prompt to the user here
    console.log('New content available, refresh to update.')
  },
  onOfflineReady() {
    console.log('App ready to work offline')
  },
  onRegistered(registration) {
    console.log('Service worker registered:', registration)
  },
  onRegisterError(error) {
    console.error('Service worker registration error:', error)
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
