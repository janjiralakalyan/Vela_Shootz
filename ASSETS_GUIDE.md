# VELA SHOOTZ — BRAND ASSETS & REPLACEMENT GUIDE

Welcome! The entire VELA SHOOTZ website and platform is completely built and pre-configured. Whenever you are ready with your official photos, videos, and logo, follow this simple guide to drop them into the designated places.

---

## 1. Brand Logo & Favicon
| Asset | Current Location | Recommended Format & Dimensions |
|---|---|---|
| **Main Brand Logo** | `public/assets/logo.svg` | SVG or high-res transparent PNG (`400x90px` or wider). Gold text on transparent background. |
| **Favicon** | `public/favicon.svg` | SVG or ICO (`64x64px` or `128x128px`). Circular shutter mark. |

---

## 2. Hero & Featured Visuals
| Asset | Current Location | Recommended Format & Dimensions |
|---|---|---|
| **Cinematic Hero Visual** | `public/assets/hero-cinematic.jpg` | 16:9 aspect ratio (`1920x1080px` or `2560x1440px`), dark burgundy & warm gold mood. |
| **Instant Reels Spotlight** | Configured in `src/components/FeaturedService.jsx` | Can reference any image in `public/assets/` |

---

## 3. Vertical Reels (9:16) Video Assets
The 9:16 Vertical Video Carousel in `src/components/ReelsShowcase.jsx` features playable vertical video loops:
- **Aspect Ratio**: `9:16` (Vertical format: `1080x1920px` or `720x1280px`).
- **File Format**: `.mp4` (H.264 / ProRes exported for web).
- **Where to drop**: Place video files in `public/assets/reels/` (e.g., `wedding-drop.mp4`, `fest-moshpit.mp4`, `cafe-promo.mp4`) and update the `videoUrl` path in `src/components/ReelsShowcase.jsx` or upload them via the **Admin Dashboard > Portfolio CMS**.

---

## 4. Portfolio Projects & Event Banners
All portfolio projects and upcoming event banners are managed dynamically:
- **Code Seed File**: `src/data/initialData.js`
  - `INITIAL_PORTFOLIO`: Edit `image` and `videoUrl` for each project.
  - `INITIAL_EVENTS`: Edit `banner` for upcoming events.
- **Admin Dashboard**: Alternatively, go to `/ #admin` (login: `admin@velashootz.com` / `vela2026`) and click **Portfolio CMS** to add or delete projects directly from your browser without touching code!

---

## 5. Palette Specifications Applied Across System
- **Background**: `#2E000E` (Deep Burgundy / Almost Black Wine)
- **Primary Text & Accent**: `#E5AD36` (Antique Metallic Gold)
- **Gold Highlights**: `#F7CA64` & `#FFF0BD`
- **Body Legibility**: `#FAF0E6` (Warm Ivory / Soft Linen)
- **Glassmorphism**: `rgba(46, 0, 14, 0.82)` with `backdrop-filter: blur(16px)` and thin gold borders (`rgba(229, 173, 54, 0.22)`).
