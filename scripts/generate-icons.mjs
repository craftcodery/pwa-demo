import sharp from 'sharp'
import { mkdir } from 'fs/promises'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const ICONS_DIR = join(__dirname, '../public/icons')
const SCREENSHOTS_DIR = join(__dirname, '../public/screenshots')

// Icon sizes needed for PWA
const STANDARD_SIZES = [16, 32, 72, 96, 128, 144, 152, 180, 192, 384, 512]
const MASKABLE_SIZES = [192, 512]

// Create a base icon image
async function createBaseIcon(size, maskable = false) {
  const padding = maskable ? Math.floor(size * 0.1) : 0
  const innerSize = size - (padding * 2)
  const cornerRadius = Math.floor(size * 0.1875) // ~96/512

  // Create gradient background
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#6366f1"/>
          <stop offset="100%" style="stop-color:#a855f7"/>
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" fill="${maskable ? '#6366f1' : 'url(#grad)'}" rx="${maskable ? 0 : cornerRadius}"/>
      <g transform="translate(${padding}, ${padding})">
        <circle cx="${innerSize/2}" cy="${innerSize/2}" r="${innerSize * 0.35}" fill="none" stroke="white" stroke-width="${innerSize * 0.06}" opacity="0.9"/>
        <circle cx="${innerSize/2}" cy="${innerSize/2}" r="${innerSize * 0.15}" fill="white" opacity="0.9"/>
        <g transform="translate(${innerSize/2}, ${innerSize * 0.25})">
          <polygon points="0,-${innerSize*0.08} ${innerSize*0.02},-${innerSize*0.02} ${innerSize*0.07},-${innerSize*0.02} ${innerSize*0.03},${innerSize*0.02} ${innerSize*0.05},${innerSize*0.08} 0,${innerSize*0.04} -${innerSize*0.05},${innerSize*0.08} -${innerSize*0.03},${innerSize*0.02} -${innerSize*0.07},-${innerSize*0.02} -${innerSize*0.02},-${innerSize*0.02}" fill="white"/>
        </g>
      </g>
    </svg>
  `

  return sharp(Buffer.from(svg)).png()
}

// Create shortcut icons
async function createShortcutIcon(type, size = 96) {
  const icons = {
    add: `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" fill="#10b981" rx="${size * 0.1875}"/>
        <line x1="${size * 0.3}" y1="${size * 0.5}" x2="${size * 0.7}" y2="${size * 0.5}" stroke="white" stroke-width="${size * 0.08}" stroke-linecap="round"/>
        <line x1="${size * 0.5}" y1="${size * 0.3}" x2="${size * 0.5}" y2="${size * 0.7}" stroke="white" stroke-width="${size * 0.08}" stroke-linecap="round"/>
      </svg>
    `,
    today: `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" fill="#f59e0b" rx="${size * 0.1875}"/>
        <circle cx="${size * 0.5}" cy="${size * 0.5}" r="${size * 0.3}" fill="none" stroke="white" stroke-width="${size * 0.06}"/>
        <line x1="${size * 0.5}" y1="${size * 0.35}" x2="${size * 0.5}" y2="${size * 0.5}" stroke="white" stroke-width="${size * 0.06}" stroke-linecap="round"/>
        <line x1="${size * 0.5}" y1="${size * 0.5}" x2="${size * 0.65}" y2="${size * 0.5}" stroke="white" stroke-width="${size * 0.06}" stroke-linecap="round"/>
      </svg>
    `
  }

  return sharp(Buffer.from(icons[type])).png()
}

// Create screenshot placeholder
async function createScreenshot(type) {
  const sizes = {
    desktop: { width: 1280, height: 720 },
    mobile: { width: 540, height: 720 }
  }

  const { width, height } = sizes[type]
  const isMobile = type === 'mobile'
  const padding = isMobile ? 20 : 40
  const contentWidth = width - (padding * 2)

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f8fafc"/>
          <stop offset="100%" style="stop-color:#e2e8f0"/>
        </linearGradient>
        <linearGradient id="brand" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#6366f1"/>
          <stop offset="100%" style="stop-color:#a855f7"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bg)"/>

      <!-- Header -->
      <rect y="0" width="${width}" height="56" fill="white" fill-opacity="0.9"/>
      <rect x="${padding}" y="12" width="32" height="32" rx="8" fill="url(#brand)"/>
      <text x="${padding + 42}" y="35" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="600" fill="#1e293b">PWA Demo</text>

      <!-- Hero Badge -->
      <rect x="${padding}" y="76" width="${isMobile ? 120 : 140}" height="28" rx="14" fill="#eef2ff"/>
      <text x="${padding + (isMobile ? 60 : 70)}" y="95" font-family="system-ui" font-size="12" font-weight="500" fill="#6366f1" text-anchor="middle">Interactive Demo</text>

      <!-- Title -->
      <text x="${padding}" y="140" font-family="system-ui, -apple-system, sans-serif" font-size="${isMobile ? 24 : 32}" font-weight="700" fill="#0f172a">Progressive Web Apps</text>
      <text x="${padding}" y="170" font-family="system-ui" font-size="14" fill="#64748b">Explore PWA capabilities for your project</text>

      <!-- Stats Grid -->
      <rect x="${padding}" y="200" width="${(contentWidth - 12) / 2}" height="80" rx="16" fill="white"/>
      <text x="${padding + 16}" y="235" font-family="system-ui" font-size="28" font-weight="700" fill="#6366f1">68%</text>
      <text x="${padding + 16}" y="258" font-family="system-ui" font-size="11" fill="#64748b">mobile web traffic</text>

      <rect x="${padding + (contentWidth - 12) / 2 + 12}" y="200" width="${(contentWidth - 12) / 2}" height="80" rx="16" fill="white"/>
      <text x="${padding + (contentWidth - 12) / 2 + 28}" y="235" font-family="system-ui" font-size="28" font-weight="700" fill="#6366f1">50%</text>
      <text x="${padding + (contentWidth - 12) / 2 + 28}" y="258" font-family="system-ui" font-size="11" fill="#64748b">lower dev cost</text>

      <!-- Feature Cards -->
      <rect x="${padding}" y="296" width="${contentWidth}" height="64" rx="12" fill="white"/>
      <rect x="${padding + 12}" y="308" width="40" height="40" rx="10" fill="#eef2ff"/>
      <text x="${padding + 68}" y="332" font-family="system-ui" font-size="14" font-weight="600" fill="#0f172a">Cross-Platform</text>
      <text x="${padding + 68}" y="350" font-family="system-ui" font-size="12" fill="#64748b">Single codebase for all devices</text>

      <rect x="${padding}" y="372" width="${contentWidth}" height="64" rx="12" fill="white"/>
      <rect x="${padding + 12}" y="384" width="40" height="40" rx="10" fill="#eef2ff"/>
      <text x="${padding + 68}" y="408" font-family="system-ui" font-size="14" font-weight="600" fill="#0f172a">Offline Support</text>
      <text x="${padding + 68}" y="426" font-family="system-ui" font-size="12" fill="#64748b">Works without internet</text>

      <rect x="${padding}" y="448" width="${contentWidth}" height="64" rx="12" fill="white"/>
      <rect x="${padding + 12}" y="460" width="40" height="40" rx="10" fill="#eef2ff"/>
      <text x="${padding + 68}" y="484" font-family="system-ui" font-size="14" font-weight="600" fill="#0f172a">Installable</text>
      <text x="${padding + 68}" y="502" font-family="system-ui" font-size="12" fill="#64748b">Add to home screen</text>

      <!-- Bottom Nav -->
      <rect y="${height - 64}" width="${width}" height="64" fill="white" fill-opacity="0.9"/>
      <text x="${width * 0.125}" y="${height - 28}" font-family="system-ui" font-size="11" font-weight="500" fill="#6366f1" text-anchor="middle">Overview</text>
      <text x="${width * 0.375}" y="${height - 28}" font-family="system-ui" font-size="11" font-weight="500" fill="#64748b" text-anchor="middle">Capabilities</text>
      <text x="${width * 0.625}" y="${height - 28}" font-family="system-ui" font-size="11" font-weight="500" fill="#64748b" text-anchor="middle">Compare</text>
      <text x="${width * 0.875}" y="${height - 28}" font-family="system-ui" font-size="11" font-weight="500" fill="#64748b" text-anchor="middle">How-To</text>
    </svg>
  `

  return sharp(Buffer.from(svg)).png()
}

async function main() {
  console.log('Generating PWA icons...')

  // Ensure directories exist
  await mkdir(ICONS_DIR, { recursive: true })
  await mkdir(SCREENSHOTS_DIR, { recursive: true })

  // Generate standard icons
  for (const size of STANDARD_SIZES) {
    const icon = await createBaseIcon(size)
    await icon.toFile(join(ICONS_DIR, `icon-${size}x${size}.png`))
    console.log(`Generated icon-${size}x${size}.png`)
  }

  // Generate maskable icons
  for (const size of MASKABLE_SIZES) {
    const icon = await createBaseIcon(size, true)
    await icon.toFile(join(ICONS_DIR, `icon-maskable-${size}x${size}.png`))
    console.log(`Generated icon-maskable-${size}x${size}.png`)
  }

  // Generate Apple touch icon
  const appleIcon = await createBaseIcon(180)
  await appleIcon.toFile(join(ICONS_DIR, 'apple-touch-icon.png'))
  console.log('Generated apple-touch-icon.png')

  // Generate shortcut icons
  const addIcon = await createShortcutIcon('add')
  await addIcon.toFile(join(ICONS_DIR, 'shortcut-add.png'))
  console.log('Generated shortcut-add.png')

  const todayIcon = await createShortcutIcon('today')
  await todayIcon.toFile(join(ICONS_DIR, 'shortcut-today.png'))
  console.log('Generated shortcut-today.png')

  // Generate screenshots
  const desktopScreenshot = await createScreenshot('desktop')
  await desktopScreenshot.toFile(join(SCREENSHOTS_DIR, 'desktop.png'))
  console.log('Generated desktop.png')

  const mobileScreenshot = await createScreenshot('mobile')
  await mobileScreenshot.toFile(join(SCREENSHOTS_DIR, 'mobile.png'))
  console.log('Generated mobile.png')

  console.log('\nAll icons generated successfully!')
}

main().catch(console.error)
