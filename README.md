# Daily Focus - PWA Demo

A comprehensive Progressive Web App demo showcasing modern PWA best practices and features.

**Live Demo:** [https://craftcodery.github.io/pwa-demo/](https://craftcodery.github.io/pwa-demo/)

## PWA Features Demonstrated

### Core PWA Capabilities
- **Installable** - Full web app manifest with icons, screenshots, and shortcuts
- **Offline Support** - Service worker with cache-first strategy via Workbox
- **Standalone Mode** - Runs in its own window without browser chrome

### Installation Experience
- `beforeinstallprompt` event handling for custom install UI
- Non-intrusive install banner with dismiss functionality
- Header install button with install state awareness
- iOS-specific instructions for Add to Home Screen
- `appinstalled` event tracking

### Advanced Features
- **Notifications API** - Permission request and demo notifications
- **Badging API** - Update app icon badge count
- **Web Share API** - Share content to other apps
- **Share Target** - Receive shared content from other apps
- **App Shortcuts** - Quick actions from long-press on app icon
- **Theme Colors** - Dynamic theme and background colors
- **Dark Mode** - System preference detection and manual toggle

### Offline & Background
- Service worker with Workbox for asset caching
- Runtime caching for Google Fonts
- Custom offline indicator with connection status
- Cache-first strategy for static assets

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 5
- **PWA Plugin:** vite-plugin-pwa (Workbox 7)
- **Styling:** Tailwind CSS 4
- **Icons:** Heroicons
- **Hosting:** GitHub Pages

## Getting Started

```bash
# Install dependencies
npm install

# Generate PWA icons
npm run generate-icons

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
pwa-demo/
├── public/
│   ├── icons/              # PWA icons (generated)
│   └── screenshots/        # Install screenshots (generated)
├── src/
│   ├── components/
│   │   ├── InstallPrompt/  # Install banner & button
│   │   ├── OfflineIndicator/
│   │   └── PWAFeatureDemo/
│   ├── hooks/
│   │   ├── useInstallPrompt.ts
│   │   ├── useOnlineStatus.ts
│   │   └── usePWAStatus.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Features.tsx
│   │   └── Settings.tsx
│   ├── App.tsx
│   └── main.tsx
├── scripts/
│   └── generate-icons.mjs  # Icon generation script
└── vite.config.ts          # PWA plugin configuration
```

## Web App Manifest Features

The manifest includes:
- Multiple icon sizes (72-512px) including maskable icons
- Screenshots for enhanced install UI on Android
- App shortcuts for quick actions
- Share target for receiving shared content
- Theme and background colors

## Browser Support

| Feature | Chrome | Edge | Firefox | Safari |
|---------|--------|------|---------|--------|
| Service Workers | Yes | Yes | Yes | Yes |
| beforeinstallprompt | Yes | Yes | No | No |
| Push Notifications | Yes | Yes | Yes | Yes (16.4+) |
| Badging API | Yes | Yes | No | Yes (16.4+) |
| Web Share | Yes | Yes | Yes | Yes |

## Resources

- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [web.dev: Learn PWA](https://web.dev/learn/pwa/)
- [vite-plugin-pwa Documentation](https://vite-pwa-org.netlify.app/)
- [Workbox Documentation](https://developer.chrome.com/docs/workbox/)

## License

MIT
