import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './App.tsx'

// Initialize theme before React renders to prevent flash
function initializeTheme() {
  const theme = localStorage.getItem('theme') || 'system'
  const root = document.documentElement

  if (theme === 'dark') {
    root.classList.add('dark')
  } else if (theme === 'light') {
    root.classList.remove('dark')
  } else {
    // System preference
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    root.classList.toggle('dark', systemDark)
  }
}
initializeTheme()

// Listen for system theme changes when set to 'system'
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  const theme = localStorage.getItem('theme') || 'system'
  if (theme === 'system') {
    document.documentElement.classList.toggle('dark', e.matches)
  }
})

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
