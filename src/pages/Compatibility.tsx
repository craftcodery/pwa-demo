import { useState, useEffect } from 'react'
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline'

type SupportLevel = 'full' | 'partial' | 'none' | 'extension'

interface BrowserSupport {
  browser: string
  logo: string
  serviceWorker: SupportLevel
  serviceWorkerVersion: string
  pushAPI: SupportLevel
  pushAPIVersion: string
  installPrompt: SupportLevel
  installPromptVersion: string
  webShare: SupportLevel
  webShareVersion: string
  notifications: SupportLevel
  notificationsVersion: string
  backgroundSync: SupportLevel
  backgroundSyncVersion: string
  badging: SupportLevel
  badgingVersion: string
  geolocation: SupportLevel
  geolocationVersion: string
  camera: SupportLevel
  cameraVersion: string
  notes: string[]
}

const browserData: BrowserSupport[] = [
  {
    browser: 'Chrome (Desktop)',
    logo: 'chrome',
    serviceWorker: 'full',
    serviceWorkerVersion: '45+',
    pushAPI: 'full',
    pushAPIVersion: '50+',
    installPrompt: 'full',
    installPromptVersion: '68+',
    webShare: 'full',
    webShareVersion: '89+',
    notifications: 'full',
    notificationsVersion: '50+',
    backgroundSync: 'full',
    backgroundSyncVersion: '49+',
    badging: 'full',
    badgingVersion: '81+',
    geolocation: 'full',
    geolocationVersion: 'All',
    camera: 'full',
    cameraVersion: '53+',
    notes: ['Best PWA support overall', 'Full beforeinstallprompt event']
  },
  {
    browser: 'Chrome (Android)',
    logo: 'chrome',
    serviceWorker: 'full',
    serviceWorkerVersion: '45+',
    pushAPI: 'full',
    pushAPIVersion: '50+',
    installPrompt: 'full',
    installPromptVersion: '68+',
    webShare: 'full',
    webShareVersion: '61+',
    notifications: 'full',
    notificationsVersion: '50+',
    backgroundSync: 'full',
    backgroundSyncVersion: '49+',
    badging: 'full',
    badgingVersion: '81+',
    geolocation: 'full',
    geolocationVersion: 'All',
    camera: 'full',
    cameraVersion: '53+',
    notes: ['Native app-like experience', 'Ambient badge shows install option']
  },
  {
    browser: 'Edge (Desktop)',
    logo: 'edge',
    serviceWorker: 'full',
    serviceWorkerVersion: '17+',
    pushAPI: 'full',
    pushAPIVersion: '17+',
    installPrompt: 'full',
    installPromptVersion: '79+',
    webShare: 'full',
    webShareVersion: '93+',
    notifications: 'full',
    notificationsVersion: '17+',
    backgroundSync: 'full',
    backgroundSyncVersion: '79+',
    badging: 'full',
    badgingVersion: '81+',
    geolocation: 'full',
    geolocationVersion: 'All',
    camera: 'full',
    cameraVersion: '79+',
    notes: ['Chromium-based since v79', 'Full PWA support', 'PWA sidebar in settings']
  },
  {
    browser: 'Brave (Desktop)',
    logo: 'brave',
    serviceWorker: 'full',
    serviceWorkerVersion: '1.0+',
    pushAPI: 'full',
    pushAPIVersion: '1.0+',
    installPrompt: 'partial',
    installPromptVersion: '1.0+',
    webShare: 'full',
    webShareVersion: '1.0+',
    notifications: 'partial',
    notificationsVersion: '1.0+',
    backgroundSync: 'full',
    backgroundSyncVersion: '1.0+',
    badging: 'full',
    badgingVersion: '1.0+',
    geolocation: 'partial',
    geolocationVersion: '1.0+',
    camera: 'full',
    cameraVersion: '1.0+',
    notes: [
      'Shields may block install prompts',
      'Set brave://flags "Shortcuts not Apps" to Disabled',
      'Notifications may require Shields adjustment'
    ]
  },
  {
    browser: 'Firefox (Desktop)',
    logo: 'firefox',
    serviceWorker: 'full',
    serviceWorkerVersion: '44+',
    pushAPI: 'full',
    pushAPIVersion: '44+',
    installPrompt: 'extension',
    installPromptVersion: 'N/A',
    webShare: 'partial',
    webShareVersion: '71+ (HTTPS)',
    notifications: 'full',
    notificationsVersion: '44+',
    backgroundSync: 'none',
    backgroundSyncVersion: 'N/A',
    badging: 'none',
    badgingVersion: 'N/A',
    geolocation: 'full',
    geolocationVersion: 'All',
    camera: 'full',
    cameraVersion: '36+',
    notes: [
      'No native PWA install until v143+ (Windows, experimental)',
      'Use "PWAs for Firefox" extension for install support',
      'about:preferences#experimental to enable PWA labs'
    ]
  },
  {
    browser: 'Firefox (Android)',
    logo: 'firefox',
    serviceWorker: 'full',
    serviceWorkerVersion: '44+',
    pushAPI: 'full',
    pushAPIVersion: '44+',
    installPrompt: 'full',
    installPromptVersion: '58+',
    webShare: 'full',
    webShareVersion: '79+',
    notifications: 'full',
    notificationsVersion: '44+',
    backgroundSync: 'none',
    backgroundSyncVersion: 'N/A',
    badging: 'none',
    badgingVersion: 'N/A',
    geolocation: 'full',
    geolocationVersion: 'All',
    camera: 'full',
    cameraVersion: '36+',
    notes: ['Better PWA support than desktop Firefox', 'Add to Home Screen supported']
  },
  {
    browser: 'Safari (macOS)',
    logo: 'safari',
    serviceWorker: 'full',
    serviceWorkerVersion: '11.1+',
    pushAPI: 'full',
    pushAPIVersion: '16.1+',
    installPrompt: 'partial',
    installPromptVersion: '17+ (Add to Dock)',
    webShare: 'full',
    webShareVersion: '12.1+',
    notifications: 'full',
    notificationsVersion: '16.1+',
    backgroundSync: 'none',
    backgroundSyncVersion: 'N/A',
    badging: 'none',
    badgingVersion: 'N/A',
    geolocation: 'full',
    geolocationVersion: 'All',
    camera: 'full',
    cameraVersion: '11+',
    notes: [
      'File > Add to Dock (Safari 17+, macOS Sonoma)',
      'No beforeinstallprompt event',
      'Push requires macOS 13 Ventura+'
    ]
  },
  {
    browser: 'Safari (iOS/iPadOS)',
    logo: 'safari',
    serviceWorker: 'full',
    serviceWorkerVersion: '11.3+',
    pushAPI: 'partial',
    pushAPIVersion: '16.4+ (Home Screen only)',
    installPrompt: 'none',
    installPromptVersion: 'N/A',
    webShare: 'full',
    webShareVersion: '12.2+',
    notifications: 'partial',
    notificationsVersion: '16.4+ (Home Screen only)',
    backgroundSync: 'none',
    backgroundSyncVersion: 'N/A',
    badging: 'partial',
    badgingVersion: '16.4+ (Home Screen only)',
    geolocation: 'full',
    geolocationVersion: 'All',
    camera: 'full',
    cameraVersion: '11+',
    notes: [
      'Manual install: Share > Add to Home Screen',
      'Push/Badge only work when installed to Home Screen',
      '50MB cache storage limit',
      'All browsers on iOS use WebKit (Safari engine)'
    ]
  },
  {
    browser: 'Samsung Internet',
    logo: 'samsung',
    serviceWorker: 'full',
    serviceWorkerVersion: '4+',
    pushAPI: 'full',
    pushAPIVersion: '4+',
    installPrompt: 'full',
    installPromptVersion: '4+',
    webShare: 'full',
    webShareVersion: '5.4+',
    notifications: 'full',
    notificationsVersion: '4+',
    backgroundSync: 'full',
    backgroundSyncVersion: '4+',
    badging: 'full',
    badgingVersion: '4+',
    geolocation: 'full',
    geolocationVersion: 'All',
    camera: 'full',
    cameraVersion: '4+',
    notes: ['Chromium-based', 'Good PWA support on Samsung devices']
  },
  {
    browser: 'Opera (Desktop)',
    logo: 'opera',
    serviceWorker: 'full',
    serviceWorkerVersion: '32+',
    pushAPI: 'full',
    pushAPIVersion: '42+',
    installPrompt: 'full',
    installPromptVersion: '32+',
    webShare: 'full',
    webShareVersion: '76+',
    notifications: 'full',
    notificationsVersion: '42+',
    backgroundSync: 'full',
    backgroundSyncVersion: '32+',
    badging: 'full',
    badgingVersion: '68+',
    geolocation: 'full',
    geolocationVersion: 'All',
    camera: 'full',
    cameraVersion: '40+',
    notes: ['Chromium-based', 'Full PWA support']
  }
]

const iosLimitations = [
  { feature: 'Install Prompt', status: 'Not supported', detail: 'Manual 4+ tap process via Share menu' },
  { feature: 'Background Sync', status: 'Not supported', detail: 'Service workers have limited background access' },
  { feature: 'Push Notifications', status: 'iOS 16.4+ only', detail: 'Only works when installed to Home Screen' },
  { feature: 'Storage Persistence', status: 'Limited', detail: '50MB cache limit; data may be cleared after 7 days of inactivity' },
  { feature: 'Web Bluetooth', status: 'Not supported', detail: 'Apple has not implemented this API' },
  { feature: 'Web USB', status: 'Not supported', detail: 'Apple has not implemented this API' },
  { feature: 'Badging API', status: 'iOS 16.4+ only', detail: 'Only works when installed to Home Screen' },
  { feature: 'Fullscreen API', status: 'Limited', detail: 'Only in PWA mode, not in Safari' },
  { feature: 'Screen Wake Lock', status: 'Safari 18.4+', detail: 'Recently added support' },
  { feature: 'Browser Engine', status: 'WebKit only', detail: 'All iOS browsers must use Safari engine' }
]

const braveTips = [
  {
    title: 'Disable Shields for testing',
    description: 'Click the Brave Shields icon (lion) in the address bar and disable shields for the site you want to test.'
  },
  {
    title: 'Enable "Shortcuts not Apps" flag',
    description: 'Go to brave://flags, search for "Shortcuts not Apps", set it to "Disabled", and relaunch Brave.'
  },
  {
    title: 'Check notification settings',
    description: 'Go to brave://settings/content/notifications and ensure the site is allowed.'
  },
  {
    title: 'Verify site permissions',
    description: 'Click the lock icon in the address bar to check and modify site-specific permissions.'
  }
]

const sources = [
  { name: 'Can I Use - Service Workers', url: 'https://caniuse.com/serviceworkers' },
  { name: 'Can I Use - Push API', url: 'https://caniuse.com/push-api' },
  { name: 'Can I Use - Web App Manifest', url: 'https://caniuse.com/web-app-manifest' },
  { name: 'MDN - Making PWAs Installable', url: 'https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable' },
  { name: 'web.dev - PWA Installation', url: 'https://web.dev/articles/customize-install' },
  { name: 'Brave Help Center - Web Apps', url: 'https://support.brave.app/hc/en-us/articles/39077114659597' },
  { name: 'PWAs for Firefox Extension', url: 'https://pwasforfirefox.filips.si/' },
  { name: 'Brainhub - PWA on iOS', url: 'https://brainhub.eu/library/pwa-on-ios' },
  { name: 'firt.dev - iOS PWA Compatibility', url: 'https://firt.dev/notes/pwa-ios/' },
  { name: 'What PWA Can Do Today', url: 'https://whatpwacando.today/' }
]

type Category = 'browsers' | 'ios' | 'brave'

interface CompatibilityProps {
  initialTab?: Category
  onTabChange?: (tab: Category) => void
}

export function Compatibility({ initialTab, onTabChange }: CompatibilityProps) {
  const [activeCategory, setActiveCategory] = useState<Category>(initialTab || 'browsers')

  // Sync with URL when initialTab changes (browser back/forward)
  useEffect(() => {
    if (initialTab && initialTab !== activeCategory) {
      setActiveCategory(initialTab)
    }
  }, [initialTab])

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category)
    onTabChange?.(category)
  }

  const SupportBadge = ({ level, version }: { level: SupportLevel; version: string }) => {
    const styles = {
      full: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
      partial: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
      none: 'bg-[#E5E6E6] dark:bg-[#505353] text-[#7D8281] dark:text-[#B1B4B4]',
      extension: 'bg-[#45818E]/20 dark:bg-[#45818E]/30 text-[#45818E] dark:text-[#7DB8C4]'
    }

    const icons = {
      full: <CheckCircleIcon className="w-3.5 h-3.5" />,
      partial: <ExclamationTriangleIcon className="w-3.5 h-3.5" />,
      none: <XCircleIcon className="w-3.5 h-3.5" />,
      extension: <InformationCircleIcon className="w-3.5 h-3.5" />
    }

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${styles[level]}`}>
        {icons[level]}
        {version}
      </span>
    )
  }

  const categories = [
    { id: 'browsers', label: 'All Browsers' },
    { id: 'ios', label: 'iOS Limits' },
    { id: 'brave', label: 'Brave Tips' }
  ] as const

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#3C3E3E] dark:text-white">
          Browser Compatibility
        </h1>
        <p className="mt-2 text-sm text-[#696D6D] dark:text-[#B1B4B4]">
          Comprehensive PWA feature support across browsers and devices
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 p-1.5 bg-[#CBCDCD] dark:bg-[#3C3E3E] rounded-xl border border-[#B1B4B4] dark:border-[#505353]">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`flex-1 py-2.5 px-3 text-sm font-medium rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-[#24554F] focus-visible:ring-offset-1 ${
              activeCategory === cat.id
                ? 'bg-white dark:bg-[#505353] text-[#24554F] dark:text-white shadow-md border border-[#979B9A] dark:border-[#696D6D]'
                : 'text-[#505353] dark:text-[#B1B4B4] hover:text-[#24554F] dark:hover:text-white hover:bg-white/50 dark:hover:bg-[#505353]/50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* All Browsers Tab */}
      {activeCategory === 'browsers' && (
        <div className="space-y-4">
          <p className="text-xs text-[#505353] dark:text-[#B1B4B4] text-center font-medium">
            Global Service Worker support: ~96% | Push API support: ~95%
          </p>

          {browserData.map((browser) => (
            <div
              key={browser.browser}
              className="p-4 bg-white dark:bg-[#505353] rounded-xl border border-[#CBCDCD] dark:border-[#5A5E5D]"
            >
              <h3 className="font-semibold text-[#3C3E3E] dark:text-white mb-3">
                {browser.browser}
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#696D6D] dark:text-[#B1B4B4]">Service Worker</span>
                  <SupportBadge level={browser.serviceWorker} version={browser.serviceWorkerVersion} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#696D6D] dark:text-[#B1B4B4]">Push API</span>
                  <SupportBadge level={browser.pushAPI} version={browser.pushAPIVersion} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#696D6D] dark:text-[#B1B4B4]">Install Prompt</span>
                  <SupportBadge level={browser.installPrompt} version={browser.installPromptVersion} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#696D6D] dark:text-[#B1B4B4]">Notifications</span>
                  <SupportBadge level={browser.notifications} version={browser.notificationsVersion} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#696D6D] dark:text-[#B1B4B4]">Background Sync</span>
                  <SupportBadge level={browser.backgroundSync} version={browser.backgroundSyncVersion} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#696D6D] dark:text-[#B1B4B4]">Badging</span>
                  <SupportBadge level={browser.badging} version={browser.badgingVersion} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#696D6D] dark:text-[#B1B4B4]">Web Share</span>
                  <SupportBadge level={browser.webShare} version={browser.webShareVersion} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#696D6D] dark:text-[#B1B4B4]">Camera</span>
                  <SupportBadge level={browser.camera} version={browser.cameraVersion} />
                </div>
              </div>

              {browser.notes.length > 0 && (
                <div className="pt-2 border-t border-[#E5E6E6] dark:border-[#5A5E5D]">
                  <ul className="text-xs text-[#7D8281] dark:text-[#B1B4B4] space-y-1">
                    {browser.notes.map((note, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-[#979B9A]">-</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#505353] dark:text-[#B1B4B4] pt-2">
            <div className="flex items-center gap-1">
              <CheckCircleIcon className="w-4 h-4 text-emerald-600" />
              <span>Full Support</span>
            </div>
            <div className="flex items-center gap-1">
              <ExclamationTriangleIcon className="w-4 h-4 text-amber-600" />
              <span>Partial</span>
            </div>
            <div className="flex items-center gap-1">
              <XCircleIcon className="w-4 h-4 text-[#696D6D]" />
              <span>Not Supported</span>
            </div>
            <div className="flex items-center gap-1">
              <InformationCircleIcon className="w-4 h-4 text-[#45818E]" />
              <span>Extension Required</span>
            </div>
          </div>
        </div>
      )}

      {/* iOS Limitations Tab */}
      {activeCategory === 'ios' && (
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
            <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">
              Why iOS is Different
            </h3>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              All browsers on iOS must use Apple's WebKit engine (Safari). This means Chrome, Firefox,
              Brave, and others on iOS have the same PWA limitations as Safari. Apple controls which
              web APIs are available on iOS.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-[#505353] rounded-xl border border-[#CBCDCD] dark:border-[#5A5E5D]">
            <h3 className="font-semibold text-[#3C3E3E] dark:text-white mb-4">
              iOS/iPadOS PWA Limitations
            </h3>
            <div className="space-y-3">
              {iosLimitations.map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-[#E5E6E6] dark:border-[#5A5E5D] last:border-0 last:pb-0">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-[#3C3E3E] dark:text-white">
                        {item.feature}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        item.status.includes('Not')
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                          : item.status.includes('Limited')
                            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                            : 'bg-[#45818E]/20 dark:bg-[#45818E]/30 text-[#45818E] dark:text-[#7DB8C4]'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#7D8281] dark:text-[#B1B4B4] mt-0.5">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-[#505353] rounded-xl border border-[#CBCDCD] dark:border-[#5A5E5D]">
            <h3 className="font-semibold text-[#3C3E3E] dark:text-white mb-3">
              iOS Version Timeline
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex gap-3">
                <span className="font-mono text-xs bg-[#CBCDCD] dark:bg-[#5A5E5D] text-[#3C3E3E] dark:text-white px-2 py-1 rounded">iOS 11.3</span>
                <span className="text-[#505353] dark:text-[#B1B4B4]">Service Worker support added</span>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-xs bg-[#CBCDCD] dark:bg-[#5A5E5D] text-[#3C3E3E] dark:text-white px-2 py-1 rounded">iOS 13</span>
                <span className="text-[#505353] dark:text-[#B1B4B4]">Dark mode, improved Share Sheet</span>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-xs bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded text-emerald-700 dark:text-emerald-400">iOS 16.4</span>
                <span className="text-[#505353] dark:text-[#B1B4B4]">Push notifications for Home Screen PWAs</span>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-xs bg-[#CBCDCD] dark:bg-[#5A5E5D] text-[#3C3E3E] dark:text-white px-2 py-1 rounded">Safari 17</span>
                <span className="text-[#505353] dark:text-[#B1B4B4]">Improved storage policies</span>
              </div>
              <div className="flex gap-3">
                <span className="font-mono text-xs bg-[#CBCDCD] dark:bg-[#5A5E5D] text-[#3C3E3E] dark:text-white px-2 py-1 rounded">Safari 18.4</span>
                <span className="text-[#505353] dark:text-[#B1B4B4]">Screen Wake Lock, Declarative Web Push</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Brave Tips Tab */}
      {activeCategory === 'brave' && (
        <div className="space-y-4">
          <div className="p-4 bg-[#FFAB40]/10 dark:bg-[#FFAB40]/20 rounded-xl border border-[#FFAB40]/30 dark:border-[#FFAB40]/40">
            <h3 className="font-semibold text-[#996500] dark:text-[#FFAB40] mb-2">
              About Brave Browser & PWAs
            </h3>
            <p className="text-sm text-[#7D6000] dark:text-[#B1B4B4]">
              Brave is Chromium-based and supports most PWA features. However, Brave's privacy-focused
              Shields can block the <code className="bg-[#FFAB40]/20 dark:bg-[#FFAB40]/30 px-1 rounded">beforeinstallprompt</code> event
              and some notifications. As of August 2024, Brave changed defaults that may require manual configuration.
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-[#505353] rounded-xl border border-[#CBCDCD] dark:border-[#5A5E5D]">
            <h3 className="font-semibold text-[#3C3E3E] dark:text-white mb-4">
              How to Enable Full PWA Support in Brave
            </h3>
            <div className="space-y-4">
              {braveTips.map((tip, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#24554F]/10 dark:bg-[#40968C]/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-[#24554F] dark:text-[#40968C]">{i + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-[#3C3E3E] dark:text-white">{tip.title}</h4>
                    <p className="text-xs text-[#7D8281] dark:text-[#B1B4B4] mt-0.5">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-[#505353] rounded-xl border border-[#CBCDCD] dark:border-[#5A5E5D]">
            <h3 className="font-semibold text-[#3C3E3E] dark:text-white mb-3">
              Quick Reference URLs
            </h3>
            <div className="space-y-2 text-sm font-mono">
              <div className="p-2 bg-[#CBCDCD] dark:bg-[#3C3E3E] rounded">
                <span className="text-[#505353] dark:text-[#B1B4B4]">Flags: </span>
                <span className="text-[#24554F] dark:text-[#40968C] font-semibold">brave://flags</span>
              </div>
              <div className="p-2 bg-[#CBCDCD] dark:bg-[#3C3E3E] rounded">
                <span className="text-[#505353] dark:text-[#B1B4B4]">Settings: </span>
                <span className="text-[#24554F] dark:text-[#40968C] font-semibold">brave://settings/content/notifications</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-[#505353]/50 rounded-xl border border-[#CBCDCD] dark:border-[#5A5E5D]">
            <p className="text-xs text-[#505353] dark:text-[#B1B4B4] text-center">
              After making changes, restart Brave for them to take effect.
            </p>
          </div>
        </div>
      )}

      {/* Sources */}
      <div className="p-4 bg-white dark:bg-[#505353] rounded-xl border border-[#CBCDCD] dark:border-[#5A5E5D]">
        <h3 className="font-semibold text-[#3C3E3E] dark:text-white mb-3">
          Sources & References
        </h3>
        <p className="text-xs text-[#7D8281] dark:text-[#B1B4B4] mb-3">
          This compatibility data is aggregated from the following authoritative sources:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {sources.map((source) => (
            <a
              key={source.url}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 text-xs text-[#24554F] dark:text-[#40968C] hover:bg-[#E5E6E6] dark:hover:bg-[#5A5E5D] rounded-lg transition-colors"
            >
              <ArrowTopRightOnSquareIcon className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{source.name}</span>
            </a>
          ))}
        </div>
        <p className="text-xs text-[#979B9A] dark:text-[#7D8281] mt-3 text-center">
          Last updated: March 2026
        </p>
      </div>
    </div>
  )
}
