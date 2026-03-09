import { WifiIcon, SignalSlashIcon } from '@heroicons/react/24/outline'
import { useOnlineStatus } from '../../hooks'
import { useState, useEffect } from 'react'

export function OfflineIndicator() {
  const isOnline = useOnlineStatus()
  const [showReconnected, setShowReconnected] = useState(false)
  const [wasOffline, setWasOffline] = useState(false)

  useEffect(() => {
    if (!isOnline) {
      setWasOffline(true)
    } else if (wasOffline) {
      setShowReconnected(true)
      const timer = setTimeout(() => {
        setShowReconnected(false)
        setWasOffline(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isOnline, wasOffline])

  if (isOnline && !showReconnected) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 safe-area-top animate-fade-in">
      <div className={`py-2 px-4 text-center text-sm font-medium ${
        isOnline
          ? 'bg-emerald-500 text-white'
          : 'bg-amber-500 text-white'
      }`}>
        <div className="flex items-center justify-center gap-2">
          {isOnline ? (
            <>
              <WifiIcon className="w-4 h-4" />
              <span>Back online</span>
            </>
          ) : (
            <>
              <SignalSlashIcon className="w-4 h-4 animate-pulse-subtle" />
              <span>You're offline - some features may be limited</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
