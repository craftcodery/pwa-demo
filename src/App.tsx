import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  NavLink,
  useNavigate,
  useParams
} from 'react-router-dom'
import {
  HomeIcon,
  Cog6ToothIcon,
  BoltIcon,
  ScaleIcon,
  BookOpenIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import {
  HomeIcon as HomeIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  BoltIcon as BoltIconSolid,
  ScaleIcon as ScaleIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  GlobeAltIcon as GlobeAltIconSolid
} from '@heroicons/react/24/solid'
import { Overview, Capabilities, Compare, Compatibility, HowTo, Settings } from './pages'
import { ErrorBoundary, InstallBanner, OfflineIndicator } from './components'

// Layout component with navigation
function Layout() {
  const navItems = [
    { to: '/', label: 'Overview', icon: HomeIcon, iconActive: HomeIconSolid },
    { to: '/capabilities', label: 'Capabilities', icon: BoltIcon, iconActive: BoltIconSolid },
    { to: '/compare', label: 'Compare', icon: ScaleIcon, iconActive: ScaleIconSolid },
    { to: '/compatibility', label: 'Browsers', icon: GlobeAltIcon, iconActive: GlobeAltIconSolid },
    { to: '/howto', label: 'How-To', icon: BookOpenIcon, iconActive: BookOpenIconSolid }
  ]

  return (
    <div className="min-h-screen bg-[#E5E6E6] dark:bg-[#3C3E3E]">
      {/* Skip to main content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#24554F] focus:text-white focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>
      <OfflineIndicator />

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-64 md:bg-white md:dark:bg-[#505353] md:border-r md:border-[#CBCDCD] md:dark:border-[#5A5E5D]">
        <div className="flex items-center gap-2 px-4 h-16 border-b border-[#CBCDCD] dark:border-[#5A5E5D]">
          <img
            src={`${import.meta.env.BASE_URL}icons/icon-72x72.png`}
            alt="NorthBuilt logo"
            className="w-9 h-9 rounded-lg"
          />
          <div>
            <span className="font-semibold text-[#3C3E3E] dark:text-white">PWA Demo</span>
            <p className="text-xs text-[#696D6D] dark:text-[#B1B4B4]">by NorthBuilt</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Main navigation">
          {navItems.map(({ to, label, icon: Icon, iconActive: IconActive }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-[#24554F] focus-visible:ring-offset-2 ${
                  isActive
                    ? 'bg-[#24554F] dark:bg-[#40968C] text-white font-semibold'
                    : 'text-[#505353] dark:text-[#B1B4B4] hover:bg-[#CBCDCD]/50 dark:hover:bg-[#5A5E5D] hover:text-[#3C3E3E] dark:hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive ? <IconActive className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  <span className="font-medium">{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-[#CBCDCD] dark:border-[#5A5E5D]">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-[#24554F] focus-visible:ring-offset-2 ${
                isActive
                  ? 'bg-[#24554F] dark:bg-[#40968C] text-white font-semibold'
                  : 'text-[#505353] dark:text-[#B1B4B4] hover:bg-[#CBCDCD]/50 dark:hover:bg-[#5A5E5D] hover:text-[#3C3E3E] dark:hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? <Cog6ToothIconSolid className="w-5 h-5" /> : <Cog6ToothIcon className="w-5 h-5" />}
                <span className="font-medium">Settings</span>
              </>
            )}
          </NavLink>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-40 bg-white/90 dark:bg-[#505353]/90 backdrop-blur-lg border-b border-[#CBCDCD] dark:border-[#5A5E5D] safe-area-top">
        <div className="px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={`${import.meta.env.BASE_URL}icons/icon-72x72.png`}
              alt="NorthBuilt logo"
              className="w-8 h-8 rounded-lg"
            />
            <span className="font-semibold text-[#3C3E3E] dark:text-white">PWA Demo</span>
          </div>

          <div className="flex items-center gap-2">
            <NavLink
              to="/settings"
              aria-label="Settings"
              className={({ isActive }) =>
                `p-2 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-[#24554F] ${
                  isActive
                    ? 'bg-[#24554F] dark:bg-[#40968C] text-white'
                    : 'text-[#505353] dark:text-[#B1B4B4] hover:bg-[#CBCDCD]/50 dark:hover:bg-[#5A5E5D]'
                }`
              }
            >
              <Cog6ToothIcon className="w-5 h-5" />
            </NavLink>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="md:ml-64 px-4 py-6 pb-24 md:pb-6" tabIndex={-1}>
        <div className="max-w-2xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#505353]/95 backdrop-blur-lg border-t border-[#CBCDCD] dark:border-[#5A5E5D] safe-area-bottom" aria-label="Mobile navigation">
        <div className="px-4">
          <div className="flex items-center justify-around h-16">
            {navItems.map(({ to, label, icon: Icon, iconActive: IconActive }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-[#24554F] ${
                    isActive
                      ? 'bg-[#24554F] dark:bg-[#40968C] text-white'
                      : 'text-[#505353] dark:text-[#B1B4B4] hover:text-[#24554F] dark:hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive ? <IconActive className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                    <span className="text-xs font-medium">{label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <InstallBanner />
    </div>
  )
}

// Wrapper components for pages with tabs
function CapabilitiesPage() {
  const { tab } = useParams()
  const navigate = useNavigate()

  return (
    <Capabilities
      initialTab={tab as 'core' | 'device' | 'engagement' | undefined}
      onTabChange={(newTab) => navigate(`/capabilities/${newTab}`, { replace: true })}
    />
  )
}

function HowToPage() {
  const { section } = useParams()
  const navigate = useNavigate()

  return (
    <HowTo
      initialSection={section as 'install' | 'uninstall' | 'permissions' | 'testing' | undefined}
      onSectionChange={(newSection) => navigate(`/howto/${newSection}`, { replace: true })}
    />
  )
}

function CompatibilityPage() {
  const { tab } = useParams()
  const navigate = useNavigate()

  return (
    <Compatibility
      initialTab={tab as 'browsers' | 'ios' | 'brave' | undefined}
      onTabChange={(newTab) => navigate(`/compatibility/${newTab}`, { replace: true })}
    />
  )
}

// Create router with basename for GitHub Pages (production) or root (development)
const basename = import.meta.env.PROD ? '/pwa-demo' : ''

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorBoundary />,
      children: [
        { index: true, element: <Overview /> },
        { path: 'capabilities', element: <CapabilitiesPage /> },
        { path: 'capabilities/:tab', element: <CapabilitiesPage /> },
        { path: 'compare', element: <Compare /> },
        { path: 'compatibility', element: <CompatibilityPage /> },
        { path: 'compatibility/:tab', element: <CompatibilityPage /> },
        { path: 'howto', element: <HowToPage /> },
        { path: 'howto/:section', element: <HowToPage /> },
        { path: 'settings', element: <Settings /> },
        // Catch-all shows 404 error
        { path: '*', loader: () => { throw new Response('Not Found', { status: 404 }) } }
      ]
    }
  ],
  {
    basename
  }
)

function App() {
  return <RouterProvider router={router} />
}

export default App
