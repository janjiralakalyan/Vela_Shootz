# VELA SHOOTZ — 2D ANIMATION STYLE ASSET SPECIFICATION & PROMPT BIBLE

This document provides the complete UI/UX asset breakdown for the **VELA SHOOTZ** platform. All assets are styled in a **premium 2D animated / stylized cinematic aesthetic** (blending modern anime, Arcane/Spider-Verse cel-shading, and luxury motion-graphic finishes) adhering to our core brand palette:

- **Deep Burgundy / Wine**: `#2E000E`
- **Antique Metallic Gold**: `#E5AD36`
- **Bright Gold Highlights**: `#F7CA64`
- **Warm Ivory / Linen**: `#FAF0E6`

---

## 🎨 Art Style Guide: 2D Animation Aesthetic

When generating your assets using AI tools (Midjourney, Stable Diffusion, DALL-E 3, Imagen, etc.), use the following artistic parameters:

- **Visual Style**: High-end 2D Japanese animation / Korean webtoon / stylized cinematic keyframe illustration.
- **Lighting**: Dramatic rim-lighting in Antique Metallic Gold, volumetric dust particles, anamorphic golden lens flares, and deep wine-colored shadows.
- **Linework**: Clean, dynamic vector-like contour lines, expressive silhouettes, sharp folds, and minimal clutter.
- **Characters**: Fashionable, youthful Indian and global creators dressed in dark tech-streetwear with golden badges, holding compact smartphone camera rigs.
- **Master Style Keywords to include in all prompts**:
  `"high-end 2D animation style, stylized anime cinematic illustration, Studio Trigger and Makoto Shinkai aesthetic, clean vector line art, deep burgundy (#2E000E) dark background, antique metallic gold (#E5AD36) glowing rim lighting, 8k resolution, trending on ArtStation"`

---

## 📋 Comprehensive Asset Matrix

---

### Category 1: Core Brand Identity

#### 1. Primary Brand Logo
- **File Path in Code**: `public/assets/logo.svg` (or `public/assets/logo.png`)
- **Dimensions**: `800 x 180 px` (Vector SVG or Transparent PNG)
- **Aspect Ratio**: `4.4:1` (Horizontal banner)
- **Where Displayed**: Sticky Navigation Header, Footer, Invoice/Receipts, Booking Modals.
- **Visual Description**: Stylized camera shutter/aperture icon glowing in metallic gold with the bold typography `VELA SHOOTZ` and subtitle `SHOOT • EDIT • POST`.
- **Generation Prompt**:
  > *Minimalist 2D animated logo mark, camera aperture shutter stylized with sharp geometric blades in antique metallic gold (#E5AD36), glowing gold sparks in the center, typography "VELA SHOOTZ", luxury graphic design, pure transparent background, vector art, high contrast, clean lines --ar 4:1 --v 6.0*

#### 2. Browser Favicon & App Icon
- **File Path in Code**: `public/favicon.svg` (or `public/favicon.ico`)
- **Dimensions**: `512 x 512 px` (Square 1:1)
- **Aspect Ratio**: `1:1`
- **Where Displayed**: Browser tab icon, mobile home-screen shortcut, PWA icon.
- **Visual Description**: Rounded square in deep burgundy with a golden glowing lens aperture shutter blades.
- **Generation Prompt**:
  > *Square 2D vector app icon, deep burgundy wine (#2E000E) background with rounded corners, glowing antique metallic gold (#E5AD36) circular camera shutter blades in the center, anime aesthetic, clean vector emblem, minimalist, high definition --ar 1:1 --v 6.0*

---

### Category 2: Hero Section & Core Storytelling

#### 3. Cinematic Hero Background Visual
- **File Path in Code**: `public/assets/hero-cinematic.jpg`
- **Dimensions**: `1920 x 1080 px` (Full HD) or `2560 x 1440 px` (2K)
- **Aspect Ratio**: `16:9` (Widescreen Landscape)
- **Where Displayed**: Behind the central hero headline `YOUR MOMENT. YOUR REEL. RIGHT NOW.` with wine gradient vignette overlay.
- **Visual Description**: A stylish 2D animated female and male creator duo filming an energetic celebration party / concert. Fairy lights bokeh in metallic gold, celebratory confetti in the air, deep burgundy velvet curtains in the backdrop, smartphone on a sleek gimbal emitting a golden screen glow.
- **Generation Prompt**:
  > *2D cinematic anime keyframe illustration of a cool modern videographer holding an iPhone on a handheld gimbal, filming an ecstatic VIP party celebration, golden fairy lights and floating confetti particles glowing in antique gold (#E5AD36), background in moody deep burgundy wine (#2E000E), stylized anime movie aesthetic, Makoto Shinkai lighting, dynamic composition, 8k --ar 16:9 --v 6.0*

---

### Category 3: Instant Reels Spotlight & 4-Step Process

#### 4. Instant Reels Spotlight Visual
- **File Path in Code**: `public/assets/instant-reels-spotlight.jpg`
- **Dimensions**: `1200 x 800 px`
- **Aspect Ratio**: `3:2`
- **Where Displayed**: Featured Service "INSTANT REELS" section (Old School 3-6 weeks vs Vela Shootz same-day comparison).
- **Visual Description**: A 2D stylized smartphone floating mid-air, surrounded by animated golden timeline editing waveforms, scissor/cut sparks, and a glowing green "EXPORTED & READY TO POST" pop-up.
- **Generation Prompt**:
  > *2D animated stylized illustration of a sleek smartphone suspended in air, vibrant glowing video reel on screen with musical waveforms, glowing gold scissor cuts and magic spark particles in antique gold (#E5AD36), deep burgundy dark background, isometric tech anime aesthetic, clean line art --ar 3:2 --v 6.0*

#### 5. How It Works: 4 Process Step Icons / Badges
- **Dimensions**: `400 x 400 px` each (1:1 Square)
- **Where Displayed**: "How It Works" cards:
  - **Step 01 — BOOK**: Stylized animated digital calendar with a glowing golden slot checkmark.
  - **Step 02 — SHOOT**: Stylized 2D animator character running with an iPhone gimbal rig.
  - **Step 03 — EDIT**: Rapid editing station with audio bars and speed timeline streaks.
  - **Step 04 — POST**: Paper rocket / Instagram share arrow bursting into golden confetti.
- **Generation Prompts**:
  - *Step 01*: `2D anime vector icon, futuristic glowing calendar interface with golden checkmark, deep burgundy (#2E000E) and antique gold (#E5AD36), clean UI icon --ar 1:1`
  - *Step 02*: `2D anime illustration of a cute chibi videographer character holding a phone on a gimbal, speed lines, dark streetwear, glowing gold accents --ar 1:1`
  - *Step 03*: `2D anime graphic of rapid video editing, glowing sound waves, scissors cutting film, digital timeline in metallic gold, deep wine backdrop --ar 1:1`
  - *Step 04*: `2D stylized icon of a paper plane launching into social media hearts and stars, antique gold metallic gradient, transparent background --ar 1:1`

---

### Category 4: Vertical Reels Showcase (9:16 Vertical Video / Posters)

These 3 assets power the vertical phone frame in **Reels Showcase**:
- **File Format**: `.mp4` (video animation loop) or high-res vertical `.jpg` poster
- **Dimensions**: `1080 x 1920 px` (Standard Mobile Story/Reel)
- **Aspect Ratio**: `9:16` (Vertical Portrait)

#### 6. Reel 1: "College Fest Mosh Pit Drop"
- **Where Displayed**: Reels Showcase (Reel #1 - Category: ON-SPOT REELS)
- **Visual Description**: 2D anime music festival crowd jumping in rhythm with glowsticks, golden laser lights cutting across a deep burgundy concert hall, DJ with headphones in the center.
- **Generation Prompt**:
  > *Vertical 9:16 2D anime concert animation still, wild college fest crowd jumping with raised hands, golden beam lasers and antique gold confetti, deep burgundy dark stage, high-energy festival anime keyframe, crisp line art, Studio Trigger style --ar 9:16 --v 6.0*

#### 7. Reel 2: "Royal Haldi Flower Shower Slow-Mo"
- **Where Displayed**: Reels Showcase (Reel #2 - Category: WEDDINGS)
- **Visual Description**: 2D animated Indian bride and groom laughing together under a slow-motion explosion of golden marigold petals and turmeric splashes, warm antique gold sunlight.
- **Generation Prompt**:
  > *Vertical 9:16 2D stylized anime illustration of a happy Indian wedding couple, laughing under a cinematic shower of golden flower petals and water splashes, traditional attire with gold embroidery, deep burgundy background, romantic cinematic lighting, Makoto Shinkai style --ar 9:16 --v 6.0*

#### 8. Reel 3: "Artisan Cafe Latte Art Hook Drop"
- **Where Displayed**: Reels Showcase (Reel #3 - Category: BUSINESS)
- **Visual Description**: 2D anime aesthetic close-up of a cool barista pouring golden-crema latte art in an aesthetic modern cafe with warm neon ambient lights.
- **Generation Prompt**:
  > *Vertical 9:16 2D anime close-up illustration of hands pouring silky latte art into a ceramic cup, golden glowing coffee steam, cozy modern cafe interior with burgundy and wood tones, lofi anime aesthetic, ultra detailed line art --ar 9:16 --v 6.0*

---

### Category 5: Portfolio Project Covers (Masonry Gallery)

These represent the project gallery cards in `/ #portfolio`:
- **Dimensions**: `1200 x 900 px` (or `800 x 600 px`)
- **Aspect Ratio**: `4:3` Landscape

#### 9. Project 1: College Fest 2026 — Neon Echoes
- **Category**: Events
- **Prompt**:
  > *2D anime style festival stage night scene, outdoor campus arena with thousands of cheering students, golden spotlights and fireworks over the stage, deep burgundy velvet sky, cinematic anime wallpaper --ar 4:3 --v 6.0*

#### 10. Project 2: Ananya & Rohan — Sunset Vows
- **Category**: Weddings
- **Prompt**:
  > *2D anime illustration of an Indian royal wedding palace lawn during sunset, couple holding hands on royal mandap pavilion, golden fairy lights draped on trees, deep wine and gold regal aesthetic, romantic cel-shaded art --ar 4:3 --v 6.0*

#### 11. Project 3: Kaviar Luxe Cafe — Brand Launch
- **Category**: Business
- **Prompt**:
  > *2D stylized anime architectural illustration of a luxury trendy urban cafe and bakery, warm golden tungsten bulbs, patrons enjoying desserts, rich burgundy booths and marble counters, modern anime concept art --ar 4:3 --v 6.0*

#### 12. Project 4: DJ Astral — Sonic Pulse Tour
- **Category**: Instant Reels
- **Prompt**:
  > *2D anime keyframe of a futuristic DJ performing on stage, glowing turntables and audio spectrum visualizers in bright gold (#F7CA64), smoke machine haze in deep burgundy (#2E000E), cyber-anime aesthetic --ar 4:3 --v 6.0*

#### 13. Project 5: Varun & Priya — Candid Haldi Splashes
- **Category**: Weddings
- **Prompt**:
  > *2D anime scene of an Indian Haldi celebration in a sunny courtyard, cheerful family splashing yellow turmeric powder and golden flower petals, joyful laughter, dynamic action anime lines, rich warm palette --ar 4:3 --v 6.0*

#### 14. Project 6: Urban Fitwear — Streetwear Drop 04
- **Category**: Creators
- **Prompt**:
  > *2D anime fashion editorial illustration of an athletic young model posing on a city rooftop, trendy oversized dark streetwear with metallic gold straps, golden hour skyline, stylized aesthetic --ar 4:3 --v 6.0*

---

### Category 6: Upcoming Event Posters & Banners

These power the **Upcoming Events** cards in `/ #events`:
- **Dimensions**: `1200 x 675 px` (16:9 Landscape)

#### 15. Event 1: National College Fest 2026 — Media Slot
- **Prompt**:
  > *2D anime poster banner for a grand student festival, musical instruments and festival flags silhouette against a massive crowd and glowing golden stage lasers, deep burgundy background, bold event banner style --ar 16:9 --v 6.0*

#### 16. Event 2: Neon Beats Open Air DJ Festival
- **Prompt**:
  > *2D anime concert poster illustration of an open-air amphitheater at night, pulsating sound waves, lasers and golden sparklers lighting up the night sky, cyber festival anime style --ar 16:9 --v 6.0*

#### 17. Event 3: Royal Heritage Wedding Showcase
- **Prompt**:
  > *2D anime illustration of an opulent royal convention ballroom, draped golden silk curtains, chandeliers glowing warm amber gold, burgundy carpets, luxury wedding exhibition concept art --ar 16:9 --v 6.0*

---

### Category 7: "One Device. Endless Moments." iPhone Philosophy

#### 18. Minimal 2D Anime Camera Rig Visual
- **File Path in Code**: Used in `src/components/iPhonePhilosophy.jsx`
- **Dimensions**: `800 x 1000 px` (4:5 Portrait)
- **Visual Description**: An artistic 2D animated breakdown of a sleek dark smartphone fitted with a professional mobile lens adapter, compact wireless receiver, and mini-gimbal, emitting a subtle golden aura.
- **Generation Prompt**:
  > *2D stylized anime schematic illustration of a modern smartphone camera rig, mounted on a compact handheld stabilizer with wireless audio receiver, glowing golden optics (#E5AD36), dark metallic burgundy finish, tech-anime gadget aesthetic, clean white-and-gold line art --ar 4:5 --v 6.0*

---

## 🛠️ Step-by-Step Instructions: How to Drop Assets into Code

Once you generate your images, place them into the project using these steps:

1. **Save Image Files**:
   Save all images into the `d:\Vela Shootz\public\assets\` folder.
   Recommended filenames:
   - `logo.svg` or `logo.png` (Brand Logo)
   - `hero-cinematic.jpg` (Main Hero image)
   - `project-fest.jpg`, `project-wedding.jpg`, `project-cafe.jpg`, `project-dj.jpg`, `project-haldi.jpg`, `project-creator.jpg`
   - `event-fest.jpg`, `event-dj.jpg`, `event-wedding.jpg`
   - `phone-rig.png`

2. **Update Portfolio & Events Data (Optional)**:
   Open [`src/data/initialData.js`](file:///d:/Vela%20Shootz/src/data/initialData.js) and update the `image` or `banner` paths to match your generated filenames:
   ```javascript
   image: '/assets/project-fest.jpg',
   banner: '/assets/event-fest.jpg',
   ```

3. **Or Upload Directly Through Admin**:
   Alternatively, open `http://localhost:5173/#admin` (login: `admin@velashootz.com` / `vela2026`) and use the **Portfolio CMS** tab to add your new projects and assets without touching code!
