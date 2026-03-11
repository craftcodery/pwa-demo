import { Link } from 'react-router-dom'
import {
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  BoltIcon,
  ArrowPathIcon,
  WifiIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

export function Overview() {
  const benefits = [
    {
      icon: GlobeAltIcon,
      title: 'Cross-Platform',
      description: 'Single codebase runs on iOS, Android, Windows, macOS, and Linux'
    },
    {
      icon: BoltIcon,
      title: 'Instant Updates',
      description: 'No app store approval process - deploy updates immediately'
    },
    {
      icon: WifiIcon,
      title: 'Offline Support',
      description: 'Service workers cache assets for offline functionality'
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Installable',
      description: 'Add to home screen with native app-like experience'
    },
    {
      icon: ArrowPathIcon,
      title: 'Always Fresh',
      description: 'Users always get the latest version automatically'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Cost Effective',
      description: 'One team, one codebase - reduced development and maintenance costs'
    }
  ]

  const stats = [
    { value: '68%', label: 'of web traffic is mobile', source: 'Statista 2024' },
    { value: '50%', label: 'lower cost vs separate native apps', source: 'Industry avg' },
    { value: '3x', label: 'faster time to market', source: 'vs native development' },
    { value: '36%', label: 'higher conversion rates', source: 'Google case studies' }
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#3C3E3E] dark:text-white">
          Progressive Web Apps
        </h1>
        <p className="mt-2 text-sm text-[#696D6D] dark:text-[#B1B4B4]">
          The best of web and native apps combined. Explore this interactive demo to see if a PWA is right for your project.
        </p>
      </div>

      {/* What is a PWA */}
      <div className="p-5 bg-white dark:bg-[#505353] rounded-2xl border border-[#CBCDCD] dark:border-[#5A5E5D]">
        <h2 className="text-lg font-semibold text-[#3C3E3E] dark:text-white mb-3">
          What is a PWA?
        </h2>
        <p className="text-sm text-[#696D6D] dark:text-[#B1B4B4] leading-relaxed">
          A <strong>Progressive Web App</strong> is a website that uses modern web technologies to deliver
          app-like experiences. PWAs can be installed on devices, work offline, send push notifications,
          and access device features - all from a single codebase that runs in any browser.
        </p>
        <div className="mt-4 p-3 bg-[#24554F]/10 dark:bg-[#3C3E3E] rounded-xl border border-[#24554F]/20 dark:border-[#505353]">
          <p className="text-xs text-[#505353] dark:text-[#B1B4B4]">
            <strong className="text-[#24554F] dark:text-[#40968C]">This demo is a PWA.</strong> Try installing it on your device to experience the features firsthand.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, i) => (
          <div key={i} className="p-4 bg-white dark:bg-[#505353] rounded-xl border border-[#CBCDCD] dark:border-[#5A5E5D] text-center">
            <p className="text-2xl font-bold text-[#24554F] dark:text-[#40968C]">{stat.value}</p>
            <p className="text-xs text-[#696D6D] dark:text-[#B1B4B4] mt-1">{stat.label}</p>
            <p className="text-[10px] text-[#979B9A] dark:text-[#7D8281] mt-0.5">{stat.source}</p>
          </div>
        ))}
      </div>

      {/* Key Benefits */}
      <div>
        <h2 className="text-lg font-semibold text-[#3C3E3E] dark:text-white mb-4">
          Key Benefits
        </h2>
        <div className="grid gap-3">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-white dark:bg-[#505353] rounded-xl border border-[#CBCDCD] dark:border-[#5A5E5D]">
              <div className="w-10 h-10 rounded-lg bg-[#24554F]/10 dark:bg-[#40968C]/20 flex items-center justify-center flex-shrink-0">
                <benefit.icon className="w-5 h-5 text-[#24554F] dark:text-[#40968C]" />
              </div>
              <div>
                <h3 className="font-medium text-[#3C3E3E] dark:text-white">{benefit.title}</h3>
                <p className="text-sm text-[#696D6D] dark:text-[#B1B4B4] mt-0.5">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Who Uses PWAs */}
      <div className="p-5 bg-[#24554F] rounded-2xl text-white">
        <h2 className="text-lg font-semibold mb-3">Who Uses PWAs?</h2>
        <p className="text-sm text-white/80 mb-4">
          Major companies have adopted PWAs with impressive results:
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center p-2 bg-white/10 rounded-lg">
            <span>Twitter Lite</span>
            <span className="text-[#FFAB40]">65% more pages/session</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-white/10 rounded-lg">
            <span>Pinterest</span>
            <span className="text-[#FFAB40]">60% more engagement</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-white/10 rounded-lg">
            <span>Starbucks</span>
            <span className="text-[#FFAB40]">2x daily active users</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-white/10 rounded-lg">
            <span>Alibaba</span>
            <span className="text-[#FFAB40]">76% more conversions</span>
          </div>
        </div>
      </div>

      {/* When to Consider */}
      <div className="p-5 bg-white dark:bg-[#505353] rounded-2xl border border-[#CBCDCD] dark:border-[#5A5E5D]">
        <h2 className="text-lg font-semibold text-[#3C3E3E] dark:text-white mb-3">
          PWA is a Good Fit When...
        </h2>
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <ShieldCheckIcon className="w-5 h-5 text-[#24554F] dark:text-[#40968C] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[#696D6D] dark:text-[#B1B4B4]">
              <strong className="text-[#3C3E3E] dark:text-white">You have a web team</strong> - Leverage existing HTML/CSS/JS skills
            </p>
          </div>
          <div className="flex items-start gap-2">
            <ShieldCheckIcon className="w-5 h-5 text-[#24554F] dark:text-[#40968C] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[#696D6D] dark:text-[#B1B4B4]">
              <strong className="text-[#3C3E3E] dark:text-white">SEO matters</strong> - PWAs are fully indexable by search engines
            </p>
          </div>
          <div className="flex items-start gap-2">
            <ShieldCheckIcon className="w-5 h-5 text-[#24554F] dark:text-[#40968C] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[#696D6D] dark:text-[#B1B4B4]">
              <strong className="text-[#3C3E3E] dark:text-white">Skip app stores</strong> - Deploy updates instantly, no review process
            </p>
          </div>
          <div className="flex items-start gap-2">
            <ShieldCheckIcon className="w-5 h-5 text-[#24554F] dark:text-[#40968C] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[#696D6D] dark:text-[#B1B4B4]">
              <strong className="text-[#3C3E3E] dark:text-white">Content-focused apps</strong> - News, e-commerce, social, productivity
            </p>
          </div>
        </div>
        <div className="mt-4 p-3 bg-[#FFAB40]/10 dark:bg-[#3C3E3E] rounded-xl border border-[#FFAB40]/30 dark:border-[#505353]">
          <p className="text-xs text-[#505353] dark:text-[#B1B4B4]">
            <strong className="text-[#996500] dark:text-[#FFAB40]">Consider alternatives</strong> if you need: full Bluetooth/NFC, background location, App Store presence, or graphics-intensive features. See the <strong>Compare</strong> tab for PWA vs Cross-Platform vs Native.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center text-sm text-[#505353] dark:text-[#B1B4B4] pb-4">
        <p>
          Explore the{' '}
          <Link to="/capabilities" className="font-semibold text-[#24554F] dark:text-[#40968C] hover:underline">
            Capabilities
          </Link>
          {' '}tab to try PWA features,
        </p>
        <p>
          or check{' '}
          <Link to="/compare" className="font-semibold text-[#24554F] dark:text-[#40968C] hover:underline">
            Compare
          </Link>
          {' '}for PWA vs Cross-Platform vs Native.
        </p>
      </div>
    </div>
  )
}
