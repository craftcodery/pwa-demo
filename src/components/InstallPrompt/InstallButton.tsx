import { ArrowDownTrayIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { useInstallPrompt } from '../../hooks'

interface InstallButtonProps {
  variant?: 'primary' | 'secondary' | 'minimal'
  className?: string
}

export function InstallButton({ variant = 'primary', className = '' }: InstallButtonProps) {
  const { isInstallable, isInstalled, canShowNativePrompt, installPrompt } = useInstallPrompt()

  // isInstalled is known synchronously on first render - no flicker
  if (isInstalled) {
    return (
      <div className={`inline-flex items-center gap-2 text-sm text-[#24554F] dark:text-[#40968C] ${className}`}>
        <CheckCircleIcon className="w-5 h-5" />
        <span>Installed</span>
      </div>
    )
  }

  const baseStyles = 'inline-flex items-center gap-2 font-medium transition-all duration-300'

  // Enabled styles for each variant
  const variantStyles = {
    primary: 'px-4 py-2 text-sm rounded-xl',
    secondary: 'px-4 py-2 text-sm rounded-xl',
    minimal: 'px-3 py-1.5 text-sm'
  }

  // Color styles that change based on installable state (for smooth animation)
  const enabledColors = {
    primary: 'text-white bg-[#24554F] dark:bg-[#40968C] shadow-lg shadow-[#24554F]/25 dark:shadow-[#40968C]/25 hover:bg-[#2E6B64] dark:hover:bg-[#378178] hover:shadow-xl hover:shadow-[#24554F]/30 dark:hover:shadow-[#40968C]/30',
    secondary: 'text-[#3C3E3E] dark:text-white bg-[#24554F]/10 dark:bg-[#40968C]/20 hover:bg-[#24554F]/20 dark:hover:bg-[#40968C]/30',
    minimal: 'text-[#505353] dark:text-[#B1B4B4] hover:text-[#3C3E3E] dark:hover:text-white'
  }

  const disabledColors = {
    primary: 'text-[#979B9A] bg-[#CBCDCD] dark:bg-[#5A5E5D] dark:text-[#7D8281] shadow-none cursor-wait',
    secondary: 'text-[#979B9A] dark:text-[#7D8281] bg-[#CBCDCD]/50 dark:bg-[#5A5E5D]/50 cursor-wait',
    minimal: 'text-[#979B9A] dark:text-[#7D8281] cursor-wait'
  }

  // Always render the button to prevent flicker
  // Disable it until we know it's installable
  return (
    <button
      onClick={installPrompt}
      disabled={!isInstallable}
      className={`${baseStyles} ${variantStyles[variant]} ${isInstallable ? enabledColors[variant] : disabledColors[variant]} ${className}`}
    >
      <ArrowDownTrayIcon className="w-4 h-4" />
      <span>Install</span>
    </button>
  )
}
