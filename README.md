# PWA Demo - Progressive Web App Showcase

An interactive educational showcase demonstrating Progressive Web App capabilities, browser APIs, and best practices. Use this demo to evaluate whether a PWA is the right choice for your project.

**Live Demo:** [https://craftcodery.github.io/pwa-demo/](https://craftcodery.github.io/pwa-demo/)

## Purpose

This demo is designed for:
- **Evaluating PWAs** - See real PWA features in action before committing to the approach
- **Client demonstrations** - Show stakeholders what PWAs can (and can't) do
- **Learning** - Understand PWA APIs, browser support, and implementation patterns
- **Testing** - Verify PWA capabilities on different devices and browsers

## Demo Sections

### Overview
Introduction to PWAs with key benefits, statistics, and use cases. Learn when a PWA makes sense vs. native apps.

### Capabilities
Interactive demos of PWA APIs with real-time browser support detection:
- **Core PWA**: Service Worker, Offline Support, Installation
- **Engagement**: Push Notifications, App Badges, Web Share
- **Device APIs**: Clipboard, Geolocation, Camera, Vibration, Biometrics

### Compare
Honest side-by-side comparison of PWA vs Native apps:
- Feature support matrix
- Honest limitations (iOS restrictions, hardware access, etc.)
- Browser compatibility breakdown
- When to choose each approach

### How-To
Practical guides for:
- **Installation**: Step-by-step for Chrome, Safari (iOS/macOS), Edge, Firefox
- **Uninstallation**: Platform-specific removal instructions
- **Permissions**: How to enable/disable notifications, location, camera
- **Testing**: DevTools tips, Lighthouse audits, offline simulation

## PWA Features Implemented

### Installation Experience
- `beforeinstallprompt` event handling with custom UI
- Toggle between custom banner and browser's native UI
- iOS-specific "Add to Home Screen" instructions
- Install state detection (`display-mode: standalone`)

### Offline Support
- Service Worker with Workbox
- Cache-first strategy for static assets
- Runtime caching for external resources
- Offline indicator with connection status

### Device Integration
- Push Notifications with permission handling
- Badging API for app icon badges
- Web Share API (share to other apps)
- Share Target (receive shared content)
- App Shortcuts for quick actions

### UI/UX
- Dark mode with system preference detection
- Responsive mobile-first design
- Safe area insets for notched devices

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| PWA Plugin | vite-plugin-pwa (Workbox 7) |
| Styling | Tailwind CSS 4 |
| Icons | Heroicons |
| Hosting | GitHub Pages |

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
│   │   ├── Overview.tsx    # PWA introduction
│   │   ├── Capabilities.tsx # Interactive API demos
│   │   ├── Compare.tsx     # PWA vs Native comparison
│   │   ├── HowTo.tsx       # Installation & testing guides
│   │   └── Settings.tsx    # App settings
│   ├── App.tsx
│   └── main.tsx
├── scripts/
│   └── generate-icons.mjs
└── vite.config.ts
```

## Browser Support

| Feature | Chrome | Edge | Firefox | Safari |
|---------|--------|------|---------|--------|
| Service Workers | Yes | Yes | Yes | Yes |
| beforeinstallprompt | Yes | Yes | No | No |
| Push Notifications | Yes | Yes | Yes | Yes (16.4+) |
| Badging API | Yes | Yes | No | Yes (16.4+) |
| Web Share | Yes | Yes | Yes | Yes |
| Background Sync | Yes | Yes | No | No |
| Geolocation | Yes | Yes | Yes | Yes |
| Camera/Microphone | Yes | Yes | Yes | Yes |

## Known PWA Limitations

This demo honestly presents PWA limitations:

- **iOS Safari**: Limited cache (50MB), no background sync, push requires 16.4+
- **App Store**: PWAs can't be listed in Apple App Store (Google Play and Microsoft Store support PWAs)
- **Hardware**: Bluetooth, NFC, and some sensors have limited browser support
- **Performance**: Graphics-intensive apps may perform better as native

## Resources

- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [web.dev: Learn PWA](https://web.dev/learn/pwa/)
- [vite-plugin-pwa Documentation](https://vite-pwa-org.netlify.app/)
- [Workbox Documentation](https://developer.chrome.com/docs/workbox/)
- [Can I Use - PWA Features](https://caniuse.com/?search=pwa)

## License

MIT
