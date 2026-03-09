import {
  CheckIcon,
  XMarkIcon,
  MinusIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

type Support = 'yes' | 'no' | 'partial' | 'varies'

interface ComparisonRow {
  feature: string
  pwa: Support
  pwaNote?: string
  native: Support
  nativeNote?: string
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
    pwaNote: 'Google Play, Microsoft Store; limited iOS',
    native: 'yes'
  },
  {
    feature: 'Home screen installation',
    pwa: 'yes',
    native: 'yes'
  },
  {
    feature: 'Offline functionality',
    pwa: 'yes',
    pwaNote: 'Via Service Workers',
    native: 'yes'
  },
  {
    feature: 'Push notifications',
    pwa: 'yes',
    pwaNote: 'iOS Safari 16.4+ required',
    native: 'yes'
  },
  {
    feature: 'Background sync',
    pwa: 'partial',
    pwaNote: 'Chrome/Edge only',
    native: 'yes'
  },
  {
    feature: 'Camera access',
    pwa: 'yes',
    native: 'yes'
  },
  {
    feature: 'Geolocation',
    pwa: 'yes',
    native: 'yes'
  },
  {
    feature: 'Bluetooth access',
    pwa: 'partial',
    pwaNote: 'Web Bluetooth API (Chrome only)',
    native: 'yes'
  },
  {
    feature: 'NFC access',
    pwa: 'partial',
    pwaNote: 'Web NFC API (Chrome Android only)',
    native: 'yes'
  },
  {
    feature: 'File system access',
    pwa: 'partial',
    pwaNote: 'File System Access API (Chrome/Edge)',
    native: 'yes'
  },
  {
    feature: 'Contacts access',
    pwa: 'partial',
    pwaNote: 'Contact Picker API (Chrome Android)',
    native: 'yes'
  },
  {
    feature: 'Biometric auth (Face ID, etc.)',
    pwa: 'yes',
    pwaNote: 'Via WebAuthn API',
    native: 'yes'
  },
  {
    feature: 'AR/VR capabilities',
    pwa: 'partial',
    pwaNote: 'WebXR (limited browser support)',
    native: 'yes'
  },
  {
    feature: 'In-app purchases',
    pwa: 'partial',
    pwaNote: 'Payment Request API; no App Store IAP',
    native: 'yes'
  },
  {
    feature: 'Instant updates (no app store)',
    pwa: 'yes',
    native: 'no',
    nativeNote: 'Requires app store review'
  },
  {
    feature: 'SEO / Discoverability',
    pwa: 'yes',
    pwaNote: 'Indexable by search engines',
    native: 'no',
    nativeNote: 'Only via app store'
  },
  {
    feature: 'Deep linking',
    pwa: 'yes',
    native: 'partial',
    nativeNote: 'Requires configuration'
  },
  {
    feature: 'Hardware acceleration',
    pwa: 'partial',
    pwaNote: 'Limited compared to native',
    native: 'yes'
  },
  {
    feature: 'Complex animations/games',
    pwa: 'partial',
    pwaNote: 'WebGL exists but performance varies',
    native: 'yes'
  }
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
                <strong>iOS Restrictions:</strong> Safari has limited PWA support compared to Chrome. No background sync, limited push notifications, 50MB cache limit.
              </li>
              <li>
                <strong>No App Store:</strong> Some users expect to find apps in stores. PWAs can be listed in Google Play and Microsoft Store, but not Apple App Store.
              </li>
              <li>
                <strong>Hardware Access:</strong> Bluetooth, NFC, and some sensors are limited or unavailable on certain platforms.
              </li>
              <li>
                <strong>Performance:</strong> For CPU-intensive tasks or complex graphics, native apps still have an edge.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Browser Support Note */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Browser Support</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-white dark:bg-slate-700 rounded-lg">
            <p className="font-medium text-slate-900 dark:text-white">Chrome / Edge</p>
            <p className="text-slate-500 dark:text-slate-400">Best PWA support, all features</p>
          </div>
          <div className="p-2 bg-white dark:bg-slate-700 rounded-lg">
            <p className="font-medium text-slate-900 dark:text-white">Firefox</p>
            <p className="text-slate-500 dark:text-slate-400">Good support, no install prompt API</p>
          </div>
          <div className="p-2 bg-white dark:bg-slate-700 rounded-lg">
            <p className="font-medium text-slate-900 dark:text-white">Safari (iOS)</p>
            <p className="text-slate-500 dark:text-slate-400">Basic PWA, push in 16.4+</p>
          </div>
          <div className="p-2 bg-white dark:bg-slate-700 rounded-lg">
            <p className="font-medium text-slate-900 dark:text-white">Safari (macOS)</p>
            <p className="text-slate-500 dark:text-slate-400">Install support in Sonoma+</p>
          </div>
        </div>
      </div>
    </div>
  )
}
