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
  crossPlatform: Support
  crossPlatformNote?: string
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
    feature: 'Single codebase',
    pwa: 'yes',
    pwaNote: 'Web technologies',
    crossPlatform: 'yes',
    crossPlatformNote: 'React Native, Flutter, etc.',
    native: 'no',
    nativeNote: 'Separate iOS/Android'
  },
  {
    feature: 'App store distribution',
    pwa: 'partial',
    pwaNote: 'Play Store, MS Store only',
    crossPlatform: 'yes',
    crossPlatformNote: 'All app stores',
    native: 'yes'
  },
  {
    feature: 'No app store required',
    pwa: 'yes',
    pwaNote: 'Direct web install',
    crossPlatform: 'no',
    crossPlatformNote: 'Requires app stores',
    native: 'no'
  },
  {
    feature: 'Instant updates',
    pwa: 'yes',
    pwaNote: 'No review process',
    crossPlatform: 'partial',
    crossPlatformNote: 'OTA for JS; native needs review',
    native: 'no',
    nativeNote: 'App store review'
  },
  {
    feature: 'Push notifications',
    pwa: 'yes',
    pwaNote: 'iOS 16.4+ (PWA only)',
    crossPlatform: 'yes',
    native: 'yes'
  },
  {
    feature: 'Background processing',
    pwa: 'partial',
    pwaNote: 'Chromium only',
    crossPlatform: 'yes',
    native: 'yes'
  },
  {
    feature: 'Offline support',
    pwa: 'yes',
    pwaNote: 'Service Workers',
    crossPlatform: 'yes',
    native: 'yes'
  },
  {
    feature: 'Camera access',
    pwa: 'yes',
    crossPlatform: 'yes',
    native: 'yes'
  },
  {
    feature: 'Geolocation',
    pwa: 'partial',
    pwaNote: 'Foreground only',
    crossPlatform: 'yes',
    crossPlatformNote: 'Including background',
    native: 'yes'
  },
  {
    feature: 'Bluetooth',
    pwa: 'partial',
    pwaNote: 'Chromium only',
    crossPlatform: 'yes',
    native: 'yes'
  },
  {
    feature: 'NFC',
    pwa: 'partial',
    pwaNote: 'Chrome Android only',
    crossPlatform: 'yes',
    native: 'yes'
  },
  {
    feature: 'Biometric auth',
    pwa: 'yes',
    pwaNote: 'WebAuthn',
    crossPlatform: 'yes',
    native: 'yes'
  },
  {
    feature: 'File system access',
    pwa: 'partial',
    pwaNote: 'Limited on Safari/Firefox',
    crossPlatform: 'yes',
    native: 'yes'
  },
  {
    feature: 'Contacts access',
    pwa: 'partial',
    pwaNote: 'Chrome Android only',
    crossPlatform: 'yes',
    native: 'yes'
  },
  {
    feature: 'In-app purchases',
    pwa: 'partial',
    pwaNote: 'Payment Request API',
    crossPlatform: 'yes',
    crossPlatformNote: 'Store IAP supported',
    native: 'yes'
  },
  {
    feature: 'AR/VR',
    pwa: 'partial',
    pwaNote: 'WebXR, limited',
    crossPlatform: 'yes',
    crossPlatformNote: 'Via native modules',
    native: 'yes'
  },
  {
    feature: 'SEO / Web indexing',
    pwa: 'yes',
    pwaNote: 'Fully indexable',
    crossPlatform: 'no',
    crossPlatformNote: 'App store only',
    native: 'no'
  },
  {
    feature: 'Deep linking',
    pwa: 'yes',
    pwaNote: 'Standard URLs',
    crossPlatform: 'yes',
    crossPlatformNote: 'Requires config',
    native: 'yes',
    nativeNote: 'Requires config'
  },
  {
    feature: 'Development speed',
    pwa: 'yes',
    pwaNote: 'Fastest iteration',
    crossPlatform: 'partial',
    crossPlatformNote: 'Hot reload helps',
    native: 'no',
    nativeNote: 'Slowest builds'
  },
  {
    feature: 'Performance',
    pwa: 'partial',
    pwaNote: 'Browser-limited',
    crossPlatform: 'yes',
    crossPlatformNote: 'Near-native',
    native: 'yes',
    nativeNote: 'Best possible'
  },
  {
    feature: 'App size',
    pwa: 'yes',
    pwaNote: 'Smallest (cached)',
    crossPlatform: 'partial',
    crossPlatformNote: 'Larger (runtime)',
    native: 'yes',
    nativeNote: 'Optimized'
  },
  {
    feature: 'Team skills needed',
    pwa: 'yes',
    pwaNote: 'Web developers',
    crossPlatform: 'partial',
    crossPlatformNote: 'Framework + some native',
    native: 'no',
    nativeNote: 'iOS + Android experts'
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
        <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
          <CheckIcon className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
        </div>
      )
    case 'no':
      return (
        <div className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
          <XMarkIcon className="w-3 h-3 text-red-600 dark:text-red-400" />
        </div>
      )
    case 'partial':
      return (
        <div className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
          <MinusIcon className="w-3 h-3 text-amber-600 dark:text-amber-400" />
        </div>
      )
    default:
      return (
        <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
          <MinusIcon className="w-3 h-3 text-slate-400" />
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
          PWA vs Cross-Platform vs Native
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          An honest comparison to help you choose the right approach
        </p>
      </div>

      {/* Quick Summary - 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
          <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">Choose PWA if...</h3>
          <ul className="space-y-1 text-xs text-indigo-700 dark:text-indigo-300">
            <li>• Budget is limited</li>
            <li>• Web team, no native devs</li>
            <li>• SEO matters</li>
            <li>• Rapid iteration needed</li>
            <li>• Content-focused app</li>
            <li>• Skip app store review</li>
          </ul>
        </div>
        <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-200 dark:border-teal-800">
          <h3 className="font-semibold text-teal-900 dark:text-teal-100 mb-2">Choose Cross-Platform if...</h3>
          <ul className="space-y-1 text-xs text-teal-700 dark:text-teal-300">
            <li>• Need app store presence</li>
            <li>• Full device API access</li>
            <li>• Near-native performance</li>
            <li>• Single team for iOS + Android</li>
            <li>• Background processing</li>
            <li>• Complex UI/animations</li>
          </ul>
        </div>
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
          <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Choose Native if...</h3>
          <ul className="space-y-1 text-xs text-purple-700 dark:text-purple-300">
            <li>• Maximum performance</li>
            <li>• Graphics-intensive (games)</li>
            <li>• Cutting-edge OS features</li>
            <li>• Large dedicated teams</li>
            <li>• Platform-specific UX</li>
            <li>• Smallest app size</li>
          </ul>
        </div>
      </div>

      {/* Cross-Platform Frameworks Info */}
      <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-200 dark:border-teal-800">
        <h3 className="font-semibold text-teal-900 dark:text-teal-100 mb-2">Cross-Platform Frameworks</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-2 bg-white dark:bg-slate-800 rounded-lg">
            <p className="font-medium text-slate-900 dark:text-white">React Native</p>
            <p className="text-slate-500 dark:text-slate-400">JavaScript/React</p>
          </div>
          <div className="p-2 bg-white dark:bg-slate-800 rounded-lg">
            <p className="font-medium text-slate-900 dark:text-white">Flutter</p>
            <p className="text-slate-500 dark:text-slate-400">Dart language</p>
          </div>
          <div className="p-2 bg-white dark:bg-slate-800 rounded-lg">
            <p className="font-medium text-slate-900 dark:text-white">.NET MAUI</p>
            <p className="text-slate-500 dark:text-slate-400">C# / .NET</p>
          </div>
          <div className="p-2 bg-white dark:bg-slate-800 rounded-lg">
            <p className="font-medium text-slate-900 dark:text-white">Kotlin Multiplatform</p>
            <p className="text-slate-500 dark:text-slate-400">Kotlin shared logic</p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
          <div className="p-2 text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase">
            Feature
          </div>
          <div className="p-2 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase text-center">
            PWA
          </div>
          <div className="p-2 text-[10px] font-semibold text-teal-600 dark:text-teal-400 uppercase text-center">
            Cross-Plat
          </div>
          <div className="p-2 text-[10px] font-semibold text-purple-600 dark:text-purple-400 uppercase text-center">
            Native
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
          {comparisons.map((row, i) => (
            <div key={i} className="grid grid-cols-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
              <div className="p-2">
                <p className="text-xs text-slate-900 dark:text-white leading-tight">{row.feature}</p>
              </div>
              <div className="p-2 flex flex-col items-center justify-center">
                <SupportIcon support={row.pwa} />
                {row.pwaNote && (
                  <p className="text-[9px] text-slate-500 dark:text-slate-400 text-center mt-0.5 leading-tight">
                    {row.pwaNote}
                  </p>
                )}
              </div>
              <div className="p-2 flex flex-col items-center justify-center">
                <SupportIcon support={row.crossPlatform} />
                {row.crossPlatformNote && (
                  <p className="text-[9px] text-slate-500 dark:text-slate-400 text-center mt-0.5 leading-tight">
                    {row.crossPlatformNote}
                  </p>
                )}
              </div>
              <div className="p-2 flex flex-col items-center justify-center">
                <SupportIcon support={row.native} />
                {row.nativeNote && (
                  <p className="text-[9px] text-slate-500 dark:text-slate-400 text-center mt-0.5 leading-tight">
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

      {/* Limitations sections */}
      <div className="space-y-3">
        {/* PWA Limitations */}
        <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800">
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
                PWA Limitations
              </h3>
              <ul className="space-y-1 text-sm text-indigo-800 dark:text-indigo-200">
                <li><strong>iOS:</strong> Push requires 16.4+, installed PWA only. No background sync. WebKit engine for all browsers.</li>
                <li><strong>Hardware:</strong> Bluetooth/NFC Chromium-only. No background geolocation.</li>
                <li><strong>Distribution:</strong> No Apple App Store. Users must manually install.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cross-Platform Limitations */}
        <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-200 dark:border-teal-800">
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-teal-900 dark:text-teal-100 mb-2">
                Cross-Platform Limitations
              </h3>
              <ul className="space-y-1 text-sm text-teal-800 dark:text-teal-200">
                <li><strong>Learning curve:</strong> Must learn framework (React Native, Flutter, etc.) plus native concepts.</li>
                <li><strong>App size:</strong> Larger than native due to framework runtime (~10-20MB+ overhead).</li>
                <li><strong>Native modules:</strong> Some features require writing native code (Swift/Kotlin).</li>
                <li><strong>Platform lag:</strong> New OS features available later than native.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Native Limitations */}
        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
          <div className="flex items-start gap-3">
            <ExclamationTriangleIcon className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                Native Limitations
              </h3>
              <ul className="space-y-1 text-sm text-purple-800 dark:text-purple-200">
                <li><strong>Cost:</strong> Separate iOS (Swift) and Android (Kotlin) teams/codebases.</li>
                <li><strong>Updates:</strong> App store review delays (1-7 days). No instant hotfixes.</li>
                <li><strong>Discovery:</strong> No SEO. Users must find you in app stores.</li>
                <li><strong>Development speed:</strong> Slower iteration vs web technologies.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Browser Support Overview (PWA-specific) */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-3">PWA Browser Support</h3>
        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div className="p-2 bg-white dark:bg-slate-700 rounded-lg">
            <p className="font-medium text-slate-900 dark:text-white">Chrome / Edge</p>
            <p className="text-slate-500 dark:text-slate-400">Best support: all PWA APIs</p>
          </div>
          <div className="p-2 bg-white dark:bg-slate-700 rounded-lg">
            <p className="font-medium text-slate-900 dark:text-white">Firefox</p>
            <p className="text-slate-500 dark:text-slate-400">Core features; no install prompt</p>
          </div>
          <div className="p-2 bg-white dark:bg-slate-700 rounded-lg">
            <p className="font-medium text-slate-900 dark:text-white">Safari iOS (16.4+)</p>
            <p className="text-slate-500 dark:text-slate-400">Push for installed PWAs</p>
          </div>
          <div className="p-2 bg-white dark:bg-slate-700 rounded-lg">
            <p className="font-medium text-slate-900 dark:text-white">Safari macOS (17+)</p>
            <p className="text-slate-500 dark:text-slate-400">Add to Dock support</p>
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
              Data current as of March 2026. Check caniuse.com for latest.
            </p>
          </div>
        )}
      </div>

      {/* Bottom line */}
      <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
        <p className="text-xs text-slate-600 dark:text-slate-300 text-center">
          <strong>The right choice depends on your constraints:</strong> budget, team skills, timeline, feature requirements, and distribution strategy. Many successful products use a combination—PWA for web, cross-platform for mobile apps.
        </p>
      </div>
    </div>
  )
}
