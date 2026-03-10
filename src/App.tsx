import { useState, useEffect } from 'react'
import {
  HomeIcon,
  Cog6ToothIcon,
  BoltIcon,
  ScaleIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  BoltIcon as BoltIconSolid,
  ScaleIcon as ScaleIconSolid,
  BookOpenIcon as BookOpenIconSolid
} from '@heroicons/react/24/solid'
import { Overview, Capabilities, Compare, HowTo, Settings } from './pages'
import { InstallBanner, InstallButton, OfflineIndicator } from './components'
import { useInstallPrompt } from './hooks'

type Page = 'overview' | 'capabilities' | 'compare' | 'howto' | 'settings'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('overview')
  const { isInstalled } = useInstallPrompt()

  // Map hash values to pages (supports aliases for shortcuts/share targets)
  const hashToPage = (hash: string): Page => {
    const normalized = hash.toLowerCase()
    if (normalized === 'capabilities' || normalized === 'features') return 'capabilities'
    if (normalized === 'compare') return 'compare'
    if (normalized === 'howto' || normalized === 'how-to') return 'howto'
    if (normalized === 'settings') return 'settings'
    return 'overview' // Default for '', 'overview', 'add', 'today', 'share', etc.
  }

  // Navigate to a page by updating the URL hash
  const navigateTo = (page: Page) => {
    const newHash = page === 'overview' ? '#/' : `#/${page}`
    if (window.location.hash !== newHash) {
      window.location.hash = newHash
    }
  }

  // Handle hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(2) // Remove #/
      setCurrentPage(hashToPage(hash))
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navItems: { id: Page; label: string; icon: typeof HomeIcon; iconActive: typeof HomeIconSolid }[] = [
    { id: 'overview', label: 'Overview', icon: HomeIcon, iconActive: HomeIconSolid },
    { id: 'capabilities', label: 'Capabilities', icon: BoltIcon, iconActive: BoltIconSolid },
    { id: 'compare', label: 'Compare', icon: ScaleIcon, iconActive: ScaleIconSolid },
    { id: 'howto', label: 'How-To', icon: BookOpenIcon, iconActive: BookOpenIconSolid }
  ]

  const NavButton = ({ id, label, icon: Icon, iconActive: IconActive, isSidebar = false }: {
    id: Page
    label: string
    icon: typeof HomeIcon
    iconActive: typeof HomeIconSolid
    isSidebar?: boolean
  }) => {
    const isActive = currentPage === id

    if (isSidebar) {
      return (
        <button
          onClick={() => navigateTo(id)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
            isActive
              ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {isActive ? <IconActive className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
          <span className="font-medium">{label}</span>
        </button>
      )
    }

    return (
      <button
        onClick={() => navigateTo(id)}
        className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-colors ${
          isActive
            ? 'text-indigo-600 dark:text-indigo-400'
            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
        }`}
      >
        {isActive ? <IconActive className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
        <span className="text-xs font-medium">{label}</span>
      </button>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Offline Indicator */}
      <OfflineIndicator />

      {/* Desktop Sidebar - hidden on mobile */}
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-64 md:bg-white md:dark:bg-slate-800 md:border-r md:border-slate-200 md:dark:border-slate-700">
        {/* Sidebar Header */}
        <div className="flex items-center gap-2 px-4 h-16 border-b border-slate-200 dark:border-slate-700">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <BoltIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-semibold text-slate-900 dark:text-white">PWA Demo</span>
            <p className="text-xs text-slate-500 dark:text-slate-400">Capability Showcase</p>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavButton key={item.id} {...item} isSidebar />
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-3 py-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
          {!isInstalled && (
            <InstallButton variant="primary" className="w-full justify-center" />
          )}
          <NavButton
            id="settings"
            label="Settings"
            icon={Cog6ToothIcon}
            iconActive={Cog6ToothIconSolid}
            isSidebar
          />
        </div>
      </aside>

      {/* Mobile Header - hidden on desktop */}
      <header className="md:hidden sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 safe-area-top">
        <div className="px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <BoltIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-slate-900 dark:text-white">PWA Demo</span>
          </div>

          <div className="flex items-center gap-2">
            {!isInstalled && (
              <InstallButton variant="secondary" />
            )}
            <button
              onClick={() => navigateTo('settings')}
              className={`p-2 rounded-lg transition-colors ${
                currentPage === 'settings'
                  ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              aria-label="Settings"
            >
              <Cog6ToothIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="md:ml-64 px-4 py-6 pb-24 md:pb-6">
        <div className="max-w-2xl mx-auto">
          {currentPage === 'overview' && <Overview />}
          {currentPage === 'capabilities' && <Capabilities />}
          {currentPage === 'compare' && <Compare />}
          {currentPage === 'howto' && <HowTo />}
          {currentPage === 'settings' && <Settings />}
        </div>
      </main>

      {/* Mobile Bottom Navigation - hidden on desktop */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 safe-area-bottom">
        <div className="px-4">
          <div className="flex items-center justify-around h-16">
            {navItems.map((item) => (
              <NavButton key={item.id} {...item} />
            ))}
          </div>
        </div>
      </nav>

      {/* Install Banner */}
      <InstallBanner />
    </div>
  )
}

export default App
