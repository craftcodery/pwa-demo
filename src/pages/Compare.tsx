import { useState } from 'react'
import {
  CheckIcon,
  XMarkIcon,
  MinusIcon,
  ExclamationTriangleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'

type Support = 'yes' | 'no' | 'partial' | 'varies'

interface ComparisonRow {
  feature: string
  pwa: Support
  pwaNote?: string
  native: Support
  nativeNote?: string
}

interface BrowserSupport {
  api: string
  chrome: string
  edge: string
  firefox: string
  safariMac: string
  safariIOS: string
  notes?: string
}

const comparisons: ComparisonRow[] = [
  {
    feature: 'Cross-platform (single codebase)',
    pwa: 'yes',
    native: 'no',
    nativeNote: 'Requires separate iOS/Android codebases'
  },
  {
    feature: 'App store distribution',
    pwa: 'partial',
    pwaNote: 'Google Play, Microsoft Store only',
    native: 'yes'
  },
  {
    feature: 'Home screen installation',
    pwa: 'yes',
    pwaNote: 'All platforms (iOS via Add to Home Screen)',
    native: 'yes'
  },
  {
    feature: 'Offline functionality',
    pwa: 'yes',
    pwaNote: 'Service Workers: all browsers',
    native: 'yes'
  },
  {
    feature: 'Push notifications',
    pwa: 'yes',
    pwaNote: 'iOS 16.4+ (home screen only)',
    native: 'yes'
  },
  {
    feature: 'Background sync',
    pwa: 'partial',
    pwaNote: 'Chromium only (Chrome/Edge 80+)',
    native: 'yes'
  },
  {
    feature: 'Periodic background sync',
    pwa: 'partial',
    pwaNote: 'Chromium only, installed PWAs',
    native: 'yes'
  },
  {
    feature: 'Camera access',
    pwa: 'yes',
    pwaNote: 'All browsers (HTTPS required)',
    native: 'yes'
  },
  {
    feature: 'Geolocation',
    pwa: 'yes',
    pwaNote: 'All browsers (foreground only)',
    native: 'yes',
    nativeNote: 'Includes background/geofencing'
  },
  {
    feature: 'Bluetooth access',
    pwa: 'partial',
    pwaNote: 'Chromium only (no Safari/Firefox)',
    native: 'yes'
  },
  {
    feature: 'NFC access',
    pwa: 'partial',
    pwaNote: 'Chrome Android only',
    native: 'yes'
  },
  {
    feature: 'File system access',
    pwa: 'partial',
    pwaNote: 'Chromium full; Safari/Firefox partial',
    native: 'yes'
  },
  {
    feature: 'Contacts access',
    pwa: 'partial',
    pwaNote: 'Chrome Android only',
    native: 'yes'
  },
  {
    feature: 'Biometric auth',
    pwa: 'yes',
    pwaNote: 'WebAuthn: all major browsers',
    native: 'yes'
  },
  {
    feature: 'App badges',
    pwa: 'partial',
    pwaNote: 'Chromium, Safari 16.4+ (installed)',
    native: 'yes'
  },
  {
    feature: 'Screen wake lock',
    pwa: 'yes',
    pwaNote: 'All browsers (Safari 16.6+)',
    native: 'yes'
  },
  {
    feature: 'Web Share',
    pwa: 'yes',
    pwaNote: 'All browsers except Firefox desktop',
    native: 'yes'
  },
  {
    feature: 'AR/VR capabilities',
    pwa: 'partial',
    pwaNote: 'WebXR: Chromium, limited Safari',
    native: 'yes'
  },
  {
    feature: 'In-app purchases',
    pwa: 'partial',
    pwaNote: 'Payment Request API only',
    native: 'yes'
  },
  {
    feature: 'Instant updates',
    pwa: 'yes',
    native: 'no',
    nativeNote: 'Requires app store review'
  },
  {
    feature: 'SEO / Discoverability',
    pwa: 'yes',
    pwaNote: 'Indexable by search engines',
    native: 'no',
    nativeNote: 'App store only'
  },
  {
    feature: 'Deep linking',
    pwa: 'yes',
    native: 'partial',
    nativeNote: 'Requires configuration'
  }
]

// Detailed browser support for key APIs
const browserSupport: BrowserSupport[] = [
  {
    api: 'Service Workers',
    chrome: 'Full (40+)',
    edge: 'Full (17+)',
    firefox: 'Full (44+)',
    safariMac: 'Full (11.1+)',
    safariIOS: 'Full (11.3+)',
  },
  {
    api: 'Push Notifications',
    chrome: 'Full (50+)',
    edge: 'Full (17+)',
    firefox: 'Full (44+)',
    safariMac: 'Full (16+)',
    safariIOS: 'PWA only (16.4+)',
    notes: 'iOS requires Add to Home Screen'
  },
  {
    api: 'beforeinstallprompt',
    chrome: 'Full (68+)',
    edge: 'Full (79+)',
    firefox: 'None',
    safariMac: 'None',
    safariIOS: 'None',
    notes: 'Chromium only; others use manual install'
  },
  {
    api: 'Badging API',
    chrome: 'Full (81+)',
    edge: 'Full (81+)',
    firefox: 'None',
    safariMac: 'None',
    safariIOS: 'PWA only (16.4+)',
    notes: 'Requires installed PWA on iOS'
  },
  {
    api: 'Background Sync',
    chrome: 'Full (49+)',
    edge: 'Full (79+)',
    firefox: 'None',
    safariMac: 'None',
    safariIOS: 'None',
    notes: 'Chromium only'
  },
  {
    api: 'Web Bluetooth',
    chrome: 'Full (56+)',
    edge: 'Full (79+)',
    firefox: 'None',
    safariMac: 'None',
    safariIOS: 'None',
    notes: 'Security concerns block Safari/Firefox'
  },
  {
    api: 'Web NFC',
    chrome: 'Android (89+)',
    edge: 'None',
    firefox: 'None',
    safariMac: 'None',
    safariIOS: 'None',
    notes: 'Chrome Android only'
  },
  {
    api: 'File System Access',
    chrome: 'Full (86+)',
    edge: 'Full (86+)',
    firefox: 'Partial (111+)',
    safariMac: 'Partial (15.2+)',
    safariIOS: 'Partial (15.2+)',
    notes: 'OPFS supported more broadly'
  },
  {
    api: 'Screen Wake Lock',
    chrome: 'Full (84+)',
    edge: 'Full (84+)',
    firefox: 'Full (126+)',
    safariMac: 'Full (16.6+)',
    safariIOS: 'Full (16.6+)',
  },
  {
    api: 'Web Share',
    chrome: 'Full (89+)',
    edge: 'Full (93+)',
    firefox: 'Mobile only',
    safariMac: 'Full (12.1+)',
    safariIOS: 'Full (12.2+)',
  },
  {
    api: 'WebAuthn/Passkeys',
    chrome: 'Full (67+)',
    edge: 'Full (18+)',
    firefox: 'Full (60+)',
    safariMac: 'Full (13+)',
    safariIOS: 'Full (14.5+)',
  },
  {
    api: 'Contact Picker',
    chrome: 'Android (80+)',
    edge: 'None',
    firefox: 'None',
    safariMac: 'None',
    safariIOS: 'Flag only',
    notes: 'Chrome Android only'
  },
  {
    api: 'Geolocation',
    chrome: 'Full (5+)',
    edge: 'Full (12+)',
    firefox: 'Full (3.5+)',
    safariMac: 'Full (5+)',
    safariIOS: 'Full (3.2+)',
    notes: 'Foreground only; no background/geofencing'
  },
]

const SupportIcon = ({ support }: { support: Support }) => {
  switch (support) {
    case 'yes':
      return (
        <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
          <CheckIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        </div>
      )
    case 'no':
      return (
        <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <XMarkIcon className="w-4 h-4 text-red-600 dark:text-red-400" />
        </div>
      )
    case 'partial':
      return (
        <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
          <MinusIcon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        </div>
      )
    default:
      return (
        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
          <MinusIcon className="w-4 h-4 text-slate-400" />
        </div>
      )
  }
}

export function Compare() {
  const [showBrowserDetails, setShowBrowserDetails] = useState(false)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          PWA vs Native
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          An honest comparison to help you choose the right approach
        </p>
      </div>

      {/* Quick Summary */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
          <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">Choose PWA if...</h3>
          <ul className="space-y-1 text-xs text-indigo-700 dark:text-indigo-300">
            <li>• Cross-platform is priority</li>
            <li>• Rapid iteration needed</li>
            <li>• Budget is limited</li>
            <li>• Content-focused app</li>
            <li>• SEO matters</li>
          </ul>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
          <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Choose Native if...</h3>
          <ul className="space-y-1 text-xs text-purple-700 dark:text-purple-300">
            <li>• Heavy device APIs needed</li>
            <li>• Graphics-intensive (games)</li>
            <li>• Bluetooth/NFC critical</li>
            <li>• App Store presence required</li>
            <li>• Maximum performance</li>
          </ul>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-3 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
          <div className="p-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">
            Feature
          </div>
          <div className="p-3 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase text-center">
            PWA
          </div>
          <div className="p-3 text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase text-center">
            Native
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
          {comparisons.map((row, i) => (
            <div key={i} className="grid grid-cols-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
              <div className="p-3">
                <p className="text-sm text-slate-900 dark:text-white">{row.feature}</p>
              </div>
              <div className="p-3 flex flex-col items-center justify-center">
                <SupportIcon support={row.pwa} />
                {row.pwaNote && (
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 text-center mt-1 leading-tight">
                    {row.pwaNote}
                  </p>
                )}
              </div>
              <div className="p-3 flex flex-col items-center justify-center">
                <SupportIcon support={row.native} />
                {row.nativeNote && (
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 text-center mt-1 leading-tight">
                    {row.nativeNote}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5">
          <SupportIcon support="yes" />
          <span>Full Support</span>
        </div>
        <div className="flex items-center gap-1.5">
          <SupportIcon support="partial" />
          <span>Partial/Limited</span>
        </div>
        <div className="flex items-center gap-1.5">
          <SupportIcon support="no" />
          <span>Not Supported</span>
        </div>
      </div>

      {/* Honest Limitations */}
      <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
        <div className="flex items-start gap-3">
          <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
              PWA Limitations to Consider
            </h3>
            <ul className="space-y-1.5 text-sm text-amber-800 dark:text-amber-200">
              <li>
                <strong>iOS Safari Restrictions:</strong> Push only works for installed PWAs (16.4+). No background sync, periodic sync, or background fetch. All iOS browsers use WebKit engine.
              </li>
              <li>
                <strong>No Apple App Store:</strong> PWAs can be listed in Google Play (TWA) and Microsoft Store, but not Apple App Store.
              </li>
              <li>
                <strong>Hardware Access:</strong> Web Bluetooth (Chromium only), Web NFC (Chrome Android only). No background geolocation or geofencing.
              </li>
              <li>
                <strong>Install Prompt:</strong> Only Chromium browsers support beforeinstallprompt. Safari/Firefox users must manually "Add to Home Screen."
              </li>
              <li>
                <strong>Push Opt-in Rates:</strong> ~16% on web vs 40-70% for native apps. iOS users must first install the PWA.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Browser Support Overview */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Browser Support Overview</h3>
        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div className="p-2 bg-white dark:bg-slate-700 rounded-lg">
            <p className="font-medium text-slate-900 dark:text-white">Chrome / Edge</p>
            <p className="text-slate-500 dark:text-slate-400">Best support: all PWA APIs including Bluetooth, NFC, Background Sync</p>
          </div>
          <div className="p-2 bg-white dark:bg-slate-700 rounded-lg">
            <p className="font-medium text-slate-900 dark:text-white">Firefox</p>
            <p className="text-slate-500 dark:text-slate-400">Core PWA features; no install prompt, Bluetooth, or Background Sync</p>
          </div>
          <div className="p-2 bg-white dark:bg-slate-700 rounded-lg">
            <p className="font-medium text-slate-900 dark:text-white">Safari iOS (16.4+)</p>
            <p className="text-slate-500 dark:text-slate-400">Push & badges for installed PWAs; no Background Sync or Bluetooth</p>
          </div>
          <div className="p-2 bg-white dark:bg-slate-700 rounded-lg">
            <p className="font-medium text-slate-900 dark:text-white">Safari macOS (17+)</p>
            <p className="text-slate-500 dark:text-slate-400">Add to Dock; Push notifications; Screen Wake Lock (16.6+)</p>
          </div>
        </div>

        {/* Expandable detailed browser support */}
        <button
          onClick={() => setShowBrowserDetails(!showBrowserDetails)}
          className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <ChevronDownIcon className={`w-4 h-4 transition-transform ${showBrowserDetails ? 'rotate-180' : ''}`} />
          {showBrowserDetails ? 'Hide' : 'Show'} detailed API support
        </button>

        {showBrowserDetails && (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-600">
                  <th className="text-left py-2 pr-2 font-medium text-slate-700 dark:text-slate-300">API</th>
                  <th className="text-center py-2 px-1 font-medium text-slate-700 dark:text-slate-300">Chrome</th>
                  <th className="text-center py-2 px-1 font-medium text-slate-700 dark:text-slate-300">Edge</th>
                  <th className="text-center py-2 px-1 font-medium text-slate-700 dark:text-slate-300">Firefox</th>
                  <th className="text-center py-2 px-1 font-medium text-slate-700 dark:text-slate-300">Safari</th>
                  <th className="text-center py-2 px-1 font-medium text-slate-700 dark:text-slate-300">iOS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {browserSupport.map((row, i) => (
                  <tr key={i} className="hover:bg-white dark:hover:bg-slate-700/50">
                    <td className="py-1.5 pr-2 font-medium text-slate-900 dark:text-white">{row.api}</td>
                    <td className={`py-1.5 px-1 text-center ${row.chrome.includes('Full') ? 'text-emerald-600 dark:text-emerald-400' : row.chrome === 'None' ? 'text-slate-400' : 'text-amber-600 dark:text-amber-400'}`}>
                      {row.chrome.includes('Full') ? 'Yes' : row.chrome === 'None' ? '-' : row.chrome}
                    </td>
                    <td className={`py-1.5 px-1 text-center ${row.edge.includes('Full') ? 'text-emerald-600 dark:text-emerald-400' : row.edge === 'None' ? 'text-slate-400' : 'text-amber-600 dark:text-amber-400'}`}>
                      {row.edge.includes('Full') ? 'Yes' : row.edge === 'None' ? '-' : row.edge}
                    </td>
                    <td className={`py-1.5 px-1 text-center ${row.firefox.includes('Full') ? 'text-emerald-600 dark:text-emerald-400' : row.firefox === 'None' ? 'text-slate-400' : 'text-amber-600 dark:text-amber-400'}`}>
                      {row.firefox.includes('Full') ? 'Yes' : row.firefox === 'None' ? '-' : row.firefox}
                    </td>
                    <td className={`py-1.5 px-1 text-center ${row.safariMac.includes('Full') ? 'text-emerald-600 dark:text-emerald-400' : row.safariMac === 'None' ? 'text-slate-400' : 'text-amber-600 dark:text-amber-400'}`}>
                      {row.safariMac.includes('Full') ? 'Yes' : row.safariMac === 'None' ? '-' : row.safariMac}
                    </td>
                    <td className={`py-1.5 px-1 text-center ${row.safariIOS.includes('Full') ? 'text-emerald-600 dark:text-emerald-400' : row.safariIOS === 'None' ? 'text-slate-400' : 'text-amber-600 dark:text-amber-400'}`}>
                      {row.safariIOS.includes('Full') ? 'Yes' : row.safariIOS === 'None' ? '-' : row.safariIOS}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-[10px] text-slate-500 dark:text-slate-400">
              Data current as of March 2026. "PWA only" = requires Add to Home Screen. Check caniuse.com for latest.
            </p>
          </div>
        )}
      </div>

      {/* iOS 26 Note */}
      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <p className="text-xs text-blue-800 dark:text-blue-200">
          <strong>iOS 26 Update:</strong> Sites added to Home Screen now default to opening as a web app. Safari 18.4 added Declarative Web Push (no service worker required) and Screen Wake Lock for PWAs.
        </p>
      </div>
    </div>
  )
}
