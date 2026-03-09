import { useState, useEffect } from 'react'
import {
  HomeIcon,
  Cog6ToothIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  SparklesIcon as SparklesIconSolid
} from '@heroicons/react/24/solid'
import { Home, Features, Settings } from './pages'
import { InstallBanner, InstallButton, OfflineIndicator } from './components'
import { useInstallPrompt } from './hooks'

type Page = 'home' | 'features' | 'settings'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const { isInstalled } = useInstallPrompt()

  // Handle hash-based routing for share_target and shortcuts
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(2) // Remove #/
      if (hash === 'add' || hash === 'today' || hash === 'share') {
        setCurrentPage('home')
      } else if (hash === 'features') {
        setCurrentPage('features')
      } else if (hash === 'settings') {
        setCurrentPage('settings')
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navItems: { id: Page; label: string; icon: typeof HomeIcon; iconActive: typeof HomeIconSolid }[] = [
    { id: 'home', label: 'Focus', icon: HomeIcon, iconActive: HomeIconSolid },
    { id: 'features', label: 'Features', icon: SparklesIcon, iconActive: SparklesIconSolid },
    { id: 'settings', label: 'Settings', icon: Cog6ToothIcon, iconActive: Cog6ToothIconSolid }
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Offline Indicator */}
      <OfflineIndicator />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 safe-area-top">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <SparklesIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">Daily Focus</span>
          </div>

          {!isInstalled && (
            <InstallButton variant="secondary" />
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-6 pb-24">
        {currentPage === 'home' && <Home />}
        {currentPage === 'features' && <Features />}
        {currentPage === 'settings' && <Settings />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 safe-area-bottom">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex items-center justify-around h-16">
            {navItems.map(({ id, label, icon: Icon, iconActive: IconActive }) => {
              const isActive = currentPage === id
              return (
                <button
                  key={id}
                  onClick={() => setCurrentPage(id)}
                  className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-colors ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  {isActive ? (
                    <IconActive className="w-6 h-6" />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                  <span className="text-xs font-medium">{label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Install Banner */}
      <InstallBanner />
    </div>
  )
}

export default App
