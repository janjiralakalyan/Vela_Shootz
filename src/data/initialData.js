// VELA SHOOTZ SEED DATA
// Configured according to Vela Shootz Packages & Booking Policy

export const INITIAL_PACKAGES = [
  // ON-SPOT REELS
  {
    id: 'pkg-quick-reels',
    category: 'on-spot',
    categoryName: 'On-Spot Reels',
    name: 'Quick Reels',
    price: 1299,
    isCustom: false,
    badge: 'QUICK START',
    featured: false,
    coverageHours: 2,
    reelsCount: 2,
    portraitsCount: 0,
    subtitle: '2 Hours · 2 Reels',
    delivery: 'Same-day delivery',
    description: 'Perfect for Instagram creators, personal content, small businesses, quick promotional content, fashion/lifestyle shoots, and simple product content.',
    perfectFor: [
      'Instagram creators',
      'Personal content',
      'Small businesses',
      'Quick promotional content',
      'Fashion and lifestyle shoots',
      'Simple product content'
    ],
    includes: [
      '2 hours of on-location shooting',
      '2 professionally edited vertical reels',
      'iPhone HDR video capture',
      'Basic creative direction',
      'Trending audio selection',
      'Professional color grading',
      'Social-media-ready delivery',
      'Same-day delivery'
    ],
    shootProcess: {
      before: [
        'Confirm date and time',
        'Confirm shooting location',
        'Discuss the content concept',
        'Confirm outfits, products and required props'
      ],
      during: [
        'Maximum 2 hours of shooting',
        'One primary location',
        'Footage captured according to the agreed concept'
      ],
      after: [
        'Best footage selected',
        '2 reels professionally edited',
        'Color grading and audio added',
        'Final reels delivered digitally'
      ]
    },
    extraAddons: [
      { id: 'extra-hour-reel', name: '+1 Extra Hour + 1 Extra Reel', price: 699 }
    ],
    extraAddonNotes: '+1 Extra Hour + 1 Extra Reel — ₹699',
    limits: [
      'Maximum 2 shooting hours',
      '2 included reels',
      'One primary location',
      'Customer must provide required products, outfits and props',
      'Advanced VFX, animation and complex effects are not included',
      'Actors/models are not included',
      'Drone footage is not included',
      'Raw footage is not included',
      '1 minor revision per included reel',
      'Additional travel may be charged separately'
    ],
    cta: 'BOOK QUICK REELS'
  },
  {
    id: 'pkg-half-day',
    category: 'on-spot',
    categoryName: 'On-Spot Reels',
    name: 'Half Day',
    price: 1999,
    isCustom: false,
    badge: 'MOST POPULAR',
    featured: true,
    coverageHours: 4,
    reelsCount: 3,
    portraitsCount: 5,
    subtitle: '4 Hours · 3 Reels · 5 Portraits',
    delivery: '24–48 hours',
    description: 'Our signature package for influencers, personal brands, clothing brands, fitness creators, cafes, and multiple content concepts.',
    perfectFor: [
      'Influencers',
      'Personal brands',
      'Clothing brands',
      'Fitness creators',
      'Cafes and restaurants',
      'Small businesses',
      'Portfolio shoots',
      'Multiple content concepts'
    ],
    includes: [
      '4 hours of on-location shooting',
      '3 professionally edited vertical reels',
      '5 professional iPhone portraits',
      'Creative shooting assistance',
      'Trending audio selection',
      'Professional color grading',
      'Social-media-optimized delivery'
    ],
    shootProcess: {
      before: [
        'Confirm shooting location',
        'Discuss content concepts',
        'Confirm outfits & products',
        'Plan approximate reel concepts',
        'Establish shooting sequence'
      ],
      during: [
        'Maximum 4 hours of shooting',
        'One primary location recommended',
        'Footage captured according to the agreed concepts'
      ]
    },
    extraAddons: [
      { id: 'extra-reel', name: '+1 Additional Reel', price: 399 }
    ],
    extraAddonNotes: 'Additional reel editing does not automatically extend the shooting time. If additional shooting time is required, it must be booked separately.',
    limits: [
      'Maximum 4 shooting hours',
      '3 included reels',
      '5 included portraits',
      'One primary location',
      'Multiple locations may require additional travel/time charges',
      'Customer waiting time counts toward the booked shooting time',
      'Actors/models are not included',
      'Special equipment is not included unless agreed',
      'Drone footage is not included',
      'Raw footage is not included',
      '1 minor revision per included reel'
    ],
    cta: 'BOOK HALF DAY'
  },
  {
    id: 'pkg-family-events',
    category: 'on-spot',
    categoryName: 'On-Spot Reels',
    name: 'Family Events',
    price: null,
    isCustom: true,
    badge: 'TAILORED',
    featured: false,
    coverageHours: 'Flexible',
    reelsCount: 'Custom',
    portraitsCount: 'Custom',
    subtitle: 'Custom Hours & Deliverables',
    description: "Tell us what you're planning and we'll build the package around your event.",
    perfectFor: [
      'Birthdays & Anniversaries',
      'Engagements & Naming ceremonies',
      'Family functions & Celebrations',
      'Custom hours & deliverables'
    ],
    includes: [
      'Birthdays & Anniversaries coverage',
      'Engagements & Naming ceremonies',
      'Family functions & Celebrations',
      'Custom hours & deliverables',
      'Dedicated mobile cinematographer',
      'Family group portraits & highlight reel'
    ],
    extraAddons: [],
    cta: "LET'S HAVE A TALK"
  },

  // BUSINESS
  {
    id: 'pkg-promotions',
    category: 'business',
    categoryName: 'Business',
    name: 'Promotions',
    price: 2999,
    isCustom: false,
    badge: 'GROWTH',
    featured: true,
    coverageHours: 3,
    reelsCount: 3,
    portraitsCount: 10,
    subtitle: '3 Hours · 3 Promotional Reels · 10 Portraits',
    delivery: 'Ready-to-upload delivery within 24 hours',
    description: 'High-conversion, social-first commercial reels tailored for cafes, stores, salons, gyms, product launches, and brand growth.',
    perfectFor: [
      'Businesses needing social-media marketing content',
      'Cafes & Restaurants',
      'Retail stores',
      'Clothing brands',
      'Salons & Spas',
      'Gyms & Fitness centers',
      'Startups & Product launches',
      'Local businesses',
      'Service businesses'
    ],
    includes: [
      '3 hours of on-location shooting',
      '3 promotional vertical reels',
      '10 professional portraits',
      'Product highlight shots',
      'Ambience shots',
      'Brand-focused visuals',
      'Hook-driven editing',
      'Trending audio selection',
      'Professional color grading',
      'Ready-to-upload delivery within 24 hours'
    ],
    reelStructure: [
      'Reel 1: Hook → Product → Experience → CTA',
      'Reel 2: Location/Ambience → Product → Customer Experience',
      'Reel 3: Offer/Service → Benefits → CTA'
    ],
    shootProcess: {
      before: [
        'Business name & brand information',
        'Products/services to promote',
        'Shooting location & ambience details',
        'Current offers, if applicable',
        'Target audience & main promotional message',
        'Vela Shootz prepares a simple content direction'
      ],
      during: [
        'Maximum 3 hours of on-location shooting',
        'One business / location',
        'Capturing brand-focused visuals, products, and customer experience'
      ]
    },
    extraAddons: [
      { id: 'extra-biz-reel', name: 'Additional Campaign Reel', price: 699 }
    ],
    extraAddonNotes: 'The additional reel is subject to available shooting/editing capacity. Additional shooting time is not included automatically.',
    limits: [
      'Maximum 3 shooting hours',
      '3 included promotional reels',
      '10 included portraits',
      'One business/location',
      'Actors/models are not included',
      'Paid advertising/boosting is not included',
      'Social-media account management is not included',
      'Advanced product photography is not included',
      'Drone footage is not included',
      'Major script or concept changes after filming may incur additional charges',
      '1 minor revision per included reel'
    ],
    cta: 'BOOK PROMOTIONS'
  },
  {
    id: 'pkg-custom-business',
    category: 'business',
    categoryName: 'Business',
    name: 'Custom Business Package',
    price: null,
    isCustom: true,
    badge: 'ENTERPRISE',
    featured: false,
    coverageHours: 'Custom',
    reelsCount: 'Custom',
    portraitsCount: 'Custom',
    subtitle: 'Custom Retainers & Campaigns',
    description: 'Every business has different content requirements. Let’s build a package around yours.',
    perfectFor: [
      'Brand campaigns & Product launches',
      'Corporate summits & Business events',
      'Social media content retainers',
      'Promotional ad videos'
    ],
    includes: [
      'Brand campaigns & Product launches',
      'Corporate summits & Business events',
      'Social media content retainers',
      'Promotional ad videos',
      'Multi-angle mobile crew',
      'Dedicated creative direction'
    ],
    extraAddons: [],
    cta: "LET'S HAVE A TALK"
  },

  // WEDDINGS
  {
    id: 'pkg-wedding-essentials',
    category: 'weddings',
    categoryName: 'Weddings',
    name: 'Wedding Essentials',
    price: 14999,
    isCustom: false,
    badge: 'ONE FUNCTION',
    featured: false,
    coverageHours: 8,
    reelsCount: 8,
    portraitsCount: 15,
    subtitle: '1 Function · Up to 8 Hours',
    delivery: 'Delivery schedule confirmed at booking',
    description: 'Dedicated mobile wedding content capturing every candid emotion and celebration for ONE important function.',
    perfectFor: [
      'Haldi',
      'Mehendi',
      'Sangeet',
      'Engagement',
      'Wedding Ceremony',
      'Reception'
    ],
    functionRule: 'Wedding Essentials covers ONE function only. One function means one separately scheduled wedding event (Haldi = 1 function, Mehendi = 1 function, Sangeet = 1 function, Wedding Ceremony = 1 function, Reception = 1 function). A customer cannot combine multiple separately scheduled functions under one Wedding Essentials booking (e.g. Haldi + Sangeet + Wedding = Multiple Functions requires a separate quotation or the Full Marriage package).',
    includes: [
      'Up to 8 hours of coverage (ONE function)',
      '8 professionally edited wedding reels',
      '15 cinematic portraits',
      'On-location mobile cinematography',
      'Professional color grading',
      'Trending audio selection',
      'Priority reel editing',
      'Digital delivery'
    ],
    shootProcess: {
      before: [
        'Confirm function type (Haldi, Mehendi, Sangeet, Ceremony, or Reception)',
        'Date, venue & reporting time',
        'Coverage duration & important moments',
        'Couple/family requirements & content preferences'
      ],
      during: [
        'Bride and groom focus',
        'Family & ritual moments',
        'Decorations & candid interactions',
        'Candid guest moments & couple portraits',
        'Important event highlights'
      ]
    },
    extraAddons: [
      { id: 'additional-function', name: 'Additional Function (Custom Quote)', price: 0, isCustom: true }
    ],
    extraAddonNotes: 'Additional function pricing depends on: Function duration, Date, Venue, Location, Travel requirements, Team availability, Required deliverables. Additional functions are not automatically charged at ₹7,999.',
    limits: [
      'Maximum 8 hours',
      'One function only',
      '8 included reels',
      '15 included portraits',
      'Traditional wedding album is not included',
      'Full-length cinematic wedding film is not included',
      'Drone coverage is not included',
      'Professional photography is not included unless separately booked',
      'Makeup, decoration, venue and catering are not included',
      'Raw footage is not included',
      '1 minor revision per included reel',
      'Overtime requires prior approval and additional charges'
    ],
    cta: 'BOOK WEDDING ESSENTIALS'
  },
  {
    id: 'pkg-full-marriage',
    category: 'weddings',
    categoryName: 'Weddings',
    name: 'Full Marriage',
    price: 59999,
    isCustom: false,
    badge: '3-DAY ROYAL WEDDING',
    featured: true,
    coverageHours: 36,
    reelsCount: 25,
    portraitsCount: 45,
    subtitle: '3 Days · Up to 36 Total Coverage Hours',
    delivery: 'Priority reels during/after events + remaining content per agreed schedule',
    description: 'The ultimate royal coverage across multiple functions and days with 2 dedicated mobile creators.',
    perfectFor: [
      'Three-day weddings',
      'Large weddings',
      'Multi-function weddings',
      'Luxury celebrations',
      'Customers wanting a dedicated content team'
    ],
    includes: [
      'Up to 36 total coverage hours',
      'Maximum 12 coverage hours per day',
      '25 cinematic vertical wedding reels',
      '45 cinematic portraits',
      '2 dedicated mobile creators',
      'Gimbal cinematography',
      'Multi-function coverage',
      'Priority live-editing setup',
      'Same-day priority reels',
      'Professional color grading',
      'Trending audio selection',
      'Private cloud gallery',
      'Coordinated coverage across the wedding schedule'
    ],
    exampleCoverage: [
      'DAY 1: Haldi, Mehendi, Family moments',
      'DAY 2: Sangeet, Couple portraits, Guest interactions',
      'DAY 3: Wedding ceremony, Reception, Couple highlights (Final schedule confirmed before booking)'
    ],
    creatorsInfo: 'The package includes 2 mobile creators during the agreed coverage periods. Both creators may operate simultaneously when required to capture different angles, people or moments.',
    importantCoverageRule: '36 hours means TOTAL coverage across all 3 days. Maximum: 12 hours per day. Unused hours from one day cannot automatically be transferred to another day (e.g. If customer uses only 8 hours on Day 1, the unused 4 hours do not automatically become 16 hours on Day 2).',
    extraAddons: [
      { id: 'drone-aerial', name: 'Aerial 4K Reel Teaser', price: 7500 }
    ],
    extraAddonNotes: 'Aerial 4K Reel Teaser — ₹7,500. Subject to: Drone/operator availability, Location feasibility, Weather conditions, Applicable permissions and regulations.',
    limits: [
      'Maximum 36 total coverage hours',
      'Maximum 12 hours per day',
      '3 scheduled coverage days',
      '25 included reels',
      '45 included portraits',
      '2 creators during agreed coverage periods',
      'Traditional wedding album is not included',
      'Full-length cinematic wedding film is not included',
      'Professional photography is not included unless separately booked',
      'Drone coverage is not included (available as optional extra)',
      'Makeup, decoration, venue and catering are not included',
      'Raw footage is not included',
      '1 minor revision per included reel',
      'Additional coverage requires a separate quotation'
    ],
    cta: 'BOOK FULL MARRIAGE'
  },
  {
    id: 'pkg-custom-wedding',
    category: 'weddings',
    categoryName: 'Weddings',
    name: 'Custom Wedding Package',
    price: null,
    isCustom: true,
    badge: 'BESPOKE',
    featured: false,
    coverageHours: 'Bespoke',
    reelsCount: 'Bespoke',
    portraitsCount: 'Bespoke',
    subtitle: 'Destination & Custom Weddings',
    description: 'Suitable for destination weddings, multi-city celebrations, and tailored deliverables.',
    perfectFor: [
      'Destination weddings',
      'Multi-city celebrations',
      'Extended family gatherings',
      'Tailored deliverable schedules'
    ],
    includes: [
      'Additional days & functions',
      'Additional reels & specialized portraits',
      'Multi-creator production crew',
      'Customized music & editing aesthetics',
      'Full destination travel readiness',
      'VIP direct creative director access'
    ],
    extraAddons: [],
    cta: "LET'S HAVE A TALK"
  }
];

// ============================================================
// COMPREHENSIVE BOOKING POLICIES & TERMS
// ============================================================
export const BOOKING_POLICIES = [
  {
    id: 'policy-reel-definition',
    title: 'What Counts as a Reel?',
    icon: 'Film',
    summary: '1 Reel = 1 final edited vertical social-media video delivered as one final file.',
    details: [
      'Multiple versions of the same reel are not counted as separate included reels.',
      'Requests for different hooks, alternate edits, different languages, different versions, additional aspect ratios, or completely new concepts are treated as additional editing work.'
    ]
  },
  {
    id: 'policy-portrait-definition',
    title: 'What Counts as a Portrait?',
    icon: 'Camera',
    summary: '1 Portrait = 1 individually selected and professionally edited final photograph.',
    details: [
      'Duplicate versions, alternate color grades, or additional photographs beyond the package quantity are not included.'
    ]
  },
  {
    id: 'policy-revisions',
    title: 'Revision Policy',
    icon: 'Edit3',
    summary: 'Each included reel comes with 1 minor revision.',
    details: [
      'Minor revision includes: small clip replacement, text correction, audio adjustment, small timing adjustment.',
      'Not included: completely new concept, complete re-edit, new script, new footage, new shoot, or multiple alternate versions.',
      'Additional editing work may be quoted separately.'
    ]
  },
  {
    id: 'policy-raw-footage',
    title: 'Raw Footage Policy',
    icon: 'HardDrive',
    summary: 'Raw footage is not included in any standard package.',
    details: [
      'Raw unedited footage can only be provided if separately agreed and priced before delivery.'
    ]
  },
  {
    id: 'policy-location',
    title: 'Location & Travel Policy',
    icon: 'MapPin',
    summary: 'Quick Reels, Half Day, and Promotions are designed around one primary location.',
    details: [
      'Customer must provide the correct shooting location before booking confirmation.',
      'If multiple locations are requested, additional travel fees apply and travel time may reduce shooting time.',
      'For wedding packages, all venues should be disclosed before confirmation.'
    ]
  },
  {
    id: 'policy-shooting-time',
    title: 'Shooting Time Policy',
    icon: 'Clock',
    summary: 'The booked time is the shooting/coverage window. Clock starts at agreed reporting time.',
    details: [
      'Customer delays do not automatically extend the booking window.',
      'Example: If a 4-hour shoot starts at 2:00 PM, coverage is 2:00 PM–6:00 PM. If customer is ready at 2:30 PM, the shoot still ends at 6:00 PM.'
    ]
  },
  {
    id: 'policy-overtime',
    title: 'Overtime Policy',
    icon: 'AlertCircle',
    summary: 'Additional shooting time is not automatic.',
    details: [
      'Overtime requires prior Vela Shootz approval and incurs additional charges.',
      'The team is not required to extend the booking beyond agreed time without prior confirmation.'
    ]
  },
  {
    id: 'policy-payment',
    title: 'Booking & Payment Policy',
    icon: 'CreditCard',
    summary: '50% Advance is required to reserve your date. 50% Balance due per delivery schedule.',
    details: [
      'A booking is confirmed only after the required advance payment has been received.',
      '50% Advance → Date Reservation.',
      '50% Balance → According to the agreed delivery/payment schedule.',
      'For large wedding bookings, the final payment schedule is confirmed in the booking confirmation.'
    ]
  },
  {
    id: 'policy-date-reservation',
    title: 'Date Reservation Policy',
    icon: 'Calendar',
    summary: 'A date is not considered reserved until the advance payment is received.',
    details: [
      'Vela Shootz may accept another booking for an unconfirmed date.',
      'Slots remain available to other clients until advance payment is completed.'
    ]
  },
  {
    id: 'policy-cancellation',
    title: 'Cancellation Policy',
    icon: 'XCircle',
    summary: 'The booking advance is strictly non-refundable once a date is reserved and blocked.',
    details: [
      'Once a date has been reserved and blocked for the customer, the booking advance is non-refundable.',
      'Any exception is solely at the discretion of Vela Shootz and must be confirmed in writing.'
    ]
  },
  {
    id: 'policy-rescheduling',
    title: 'Rescheduling Policy',
    icon: 'RefreshCw',
    summary: 'Date changes are subject to availability and advance notice.',
    details: [
      'Rescheduling depends on Vela Shootz team availability, venue availability, and advance notice.',
      'A new date is not confirmed until Vela Shootz confirms it.',
      'For weddings, rescheduling terms may be stricter because multiple team members and blocked availability are involved.'
    ]
  },
  {
    id: 'policy-weather',
    title: 'Weather & Unforeseen Conditions',
    icon: 'CloudRain',
    summary: 'For outdoor shoots, weather-related changes are accommodated where possible.',
    details: [
      'If safe shooting is not possible due to extreme weather, Vela Shootz may offer a rescheduled date where possible.',
      'Additional costs caused by venue changes, travel changes, or extended requirements may apply.'
    ]
  },
  {
    id: 'policy-delivery',
    title: 'Content Delivery Timelines',
    icon: 'Send',
    summary: 'Lightning fast turnarounds tailored for each package type.',
    details: [
      '🎬 Quick Reels: Same-day delivery',
      '🎥 Half Day: 24–48 hours delivery',
      '📣 Promotions: Within 24 hours delivery',
      '💍 Wedding Essentials: Delivery schedule confirmed at booking',
      '👑 Full Marriage: Priority reels during/after events + remaining content according to agreed delivery schedule',
      'Note: Timelines may change when customer delays approvals, provides required material late, or requests additional revisions.'
    ]
  },
  {
    id: 'policy-exclusions',
    title: 'Services Not Included by Default',
    icon: 'ShieldAlert',
    summary: 'Items not included unless specifically quoted or booked.',
    details: [
      'Professional makeup, decoration, venue, and catering are not included.',
      'Models/actors, paid ads/boosting, and social-media account management are not included.',
      'Traditional photo albums, physical prints, and full-length cinematic wedding films are not included.',
      'Drone coverage (except add-on), raw footage, and special equipment are not included.',
      'Travel/accommodation outside agreed service area is charged separately.'
    ]
  },
  {
    id: 'policy-scope',
    title: 'Final Scope Rule',
    icon: 'Lock',
    summary: 'The selected package defines the agreed scope of work.',
    details: [
      'Any request outside included hours, locations, reels, portraits, creators, functions, revisions, or services requires an additional charge or custom quotation.',
      'No additional work is considered confirmed until Vela Shootz approves it in writing.',
      'All final deliverables, timings, and additional services must be recorded in the booking confirmation.'
    ]
  }
];

// ============================================================
// PACKAGE COMPARISON MATRIX TABLE
// ============================================================
export const PACKAGE_COMPARISON_TABLE = [
  {
    id: 'pkg-quick-reels',
    name: 'Quick Reels',
    icon: '🎬',
    price: 1299,
    priceLabel: '₹1,299',
    coverage: '2 Hours',
    reels: '2 Reels',
    portraits: '—',
    bestFor: 'Quick social content & personal moments',
    delivery: 'Same-day',
    creators: '1 Creator'
  },
  {
    id: 'pkg-half-day',
    name: 'Half Day',
    icon: '🎥',
    price: 1999,
    priceLabel: '₹1,999',
    coverage: '4 Hours',
    reels: '3 Reels',
    portraits: '5 Portraits',
    bestFor: 'Personal, influencer & cafe shoots',
    delivery: '24–48 Hours',
    creators: '1 Creator'
  },
  {
    id: 'pkg-promotions',
    name: 'Promotions',
    icon: '📣',
    price: 2999,
    priceLabel: '₹2,999',
    coverage: '3 Hours',
    reels: '3 Reels',
    portraits: '10 Portraits',
    bestFor: 'Business & brand marketing',
    delivery: 'Within 24 Hours',
    creators: '1 Creator'
  },
  {
    id: 'pkg-wedding-essentials',
    name: 'Wedding Essentials',
    icon: '💍',
    price: 14999,
    priceLabel: '₹14,999',
    coverage: '1 Function / Up to 8 Hours',
    reels: '8 Reels',
    portraits: '15 Portraits',
    bestFor: 'One important wedding function',
    delivery: 'Confirmed at booking',
    creators: '1 Cinematographer'
  },
  {
    id: 'pkg-full-marriage',
    name: 'Full Marriage',
    icon: '👑',
    price: 59999,
    priceLabel: '₹59,999',
    coverage: '3 Days / Up to 36 Hours',
    reels: '25 Reels',
    portraits: '45 Portraits',
    bestFor: 'Complete multi-function royal wedding',
    delivery: 'Same-day priority reels',
    creators: '2 Dedicated Creators'
  }
];

// ============================================================
// SIMPLE PACKAGE GUIDE
// ============================================================
export const SIMPLE_PACKAGE_GUIDE = [
  {
    question: 'Need quick Instagram content?',
    recommendation: 'Quick Reels',
    packageId: 'pkg-quick-reels',
    price: '₹1,299',
    desc: '2 Hours · 2 Reels · Same-day delivery'
  },
  {
    question: 'Need more time and portraits?',
    recommendation: 'Half Day',
    packageId: 'pkg-half-day',
    price: '₹1,999',
    desc: '4 Hours · 3 Reels · 5 Portraits'
  },
  {
    question: 'Are you a business promoting your products or services?',
    recommendation: 'Promotions',
    packageId: 'pkg-promotions',
    price: '₹2,999',
    desc: '3 Hours · 3 Promotional Reels · 10 Portraits'
  },
  {
    question: 'Need one wedding function covered?',
    recommendation: 'Wedding Essentials',
    packageId: 'pkg-wedding-essentials',
    price: '₹14,999',
    desc: '1 Function · Up to 8 Hours · 8 Reels · 15 Portraits'
  },
  {
    question: 'Need multiple wedding functions across three days?',
    recommendation: 'Full Marriage',
    packageId: 'pkg-full-marriage',
    price: '₹59,999',
    desc: '3 Days · Up to 36 Hours · 25 Reels · 45 Portraits · 2 Mobile Creators'
  }
];


export const INITIAL_PORTFOLIO = [
  {
    id: 'proj-1',
    title: 'College Fest 2026 — Neon Echoes',
    category: 'Events',
    categorySlug: 'events',
    date: '2026-02-18',
    location: 'Bangalore Campus Arena',
    services: 'On-Spot Event Coverage & Viral Reels',
    reelsCount: 5,
    portraitsCount: 18,
    image: '/assets/hero-cinematic.jpg',
    videoUrl: 'https://res.cloudinary.com/u1j7rkcf/video/upload/v1790658701/IMG_4890.mp4',
    featured: true,
    client: 'Youth Fest Committee',
    highlight: '5 reels edited on location and posted before the closing concert ended.'
  },
  {
    id: 'proj-2',
    title: 'Ananya & Rohan — Sunset Vows',
    category: 'Weddings',
    categorySlug: 'weddings',
    date: '2026-01-24',
    location: 'Heritage Palace Grounds',
    services: 'Haldi & Wedding Instant Reels',
    reelsCount: 10,
    portraitsCount: 24,
    image: '/assets/hero-cinematic.jpg',
    videoUrl: 'https://res.cloudinary.com/u1j7rkcf/video/upload/v1790658378/IMG_4889.mp4',
    featured: true,
    client: 'Private Couple',
    highlight: 'Wedding reel crossed 250k views on Instagram within 48 hours.'
  },
  {
    id: 'proj-3',
    title: 'Kaviar Luxe Cafe — Brand Launch',
    category: 'Business',
    categorySlug: 'business',
    date: '2026-02-05',
    location: 'Indiranagar Urban Hub',
    services: 'Commercial Promo Reels & Food Portraits',
    reelsCount: 3,
    portraitsCount: 12,
    image: '/assets/hero-cinematic.jpg',
    videoUrl: 'https://res.cloudinary.com/u1j7rkcf/video/upload/v1790659458/IMG_4891.mp4',
    featured: true,
    client: 'Kaviar Hospitality',
    highlight: 'Hook-driven promotional reel generated a 3x table booking surge on launch week.'
  },
  {
    id: 'proj-4',
    title: 'DJ Astral — Sonic Pulse Tour',
    category: 'Instant Reels',
    categorySlug: 'instant-reels',
    date: '2026-02-28',
    location: 'Skydeck Open Air',
    services: 'Rapid Turnaround Stage Reels',
    reelsCount: 4,
    portraitsCount: 8,
    image: '/assets/hero-cinematic.jpg',
    videoUrl: 'https://res.cloudinary.com/u1j7rkcf/video/upload/v1790659525/IMG_4990.mp4',
    featured: true,
    client: 'Astral Media',
    highlight: 'Delivered 2 live stage drops while DJ was still performing set 2.'
  },
  {
    id: 'proj-5',
    title: 'Varun & Priya — Candid Haldi Splashes',
    category: 'Weddings',
    categorySlug: 'weddings',
    date: '2026-02-12',
    location: 'Greenwood Villa',
    services: 'Haldi Slow-Mo & Family Reels',
    reelsCount: 6,
    portraitsCount: 15,
    image: 'https://res.cloudinary.com/u1j7rkcf/video/upload/v1791134062/lv_0_20260930212233.jpg',
    videoUrl: 'https://res.cloudinary.com/u1j7rkcf/video/upload/v1791134062/lv_0_20260930212233.mp4',
    featured: true,
    client: 'Sharma Family',
    highlight: 'High frame-rate flower bursts with rich cinematic color treatment.'
  },
  {
    id: 'proj-6',
    title: 'Urban Style — Streetwear & Creator Drop',
    category: 'Creators',
    categorySlug: 'creators',
    date: '2026-01-15',
    location: 'Metro Rooftop',
    services: 'Fashion Lookbook Reels',
    reelsCount: 3,
    portraitsCount: 20,
    image: 'https://res.cloudinary.com/u1j7rkcf/video/upload/v1791134033/IMG_5368.MOV.jpg',
    videoUrl: 'https://res.cloudinary.com/u1j7rkcf/video/upload/v1791134033/IMG_5368.MOV.mp4',
    featured: true,
    client: 'Pulse Activewear',
    highlight: 'Paced quick transitions perfectly matched to trending audio.'
  }
];

export const INITIAL_EVENTS = [
  {
    id: 'evt-college-fest-2026',
    title: 'National College Fest 2026 — Official Media Slot',
    date: '2026-03-20',
    location: 'Bangalore Central Arena',
    type: 'College Event',
    description: 'Vela Shootz is the official on-spot reel creator for the largest student cultural festival. Reserve an exclusive creator slot for your band or dance team.',
    banner: '/assets/hero-cinematic.jpg',
    availableSlots: 6,
    startingPrice: 1499,
    category: 'College',
    bookingDeadline: '2026-03-18',
    isUpcoming: true
  },
  {
    id: 'evt-neon-nights-dj',
    title: 'Neon Beats Open Air DJ Festival',
    date: '2026-04-05',
    location: 'Lakeside Amphitheatre',
    type: 'Concert / DJ Night',
    description: 'Get your group entrance, VIP moments, and crowd energy captured by our mobile-first crew for an instant Instagram reel ready by midnight.',
    banner: '/assets/hero-cinematic.jpg',
    availableSlots: 4,
    startingPrice: 999,
    category: 'Concert',
    bookingDeadline: '2026-04-02',
    isUpcoming: true
  },
  {
    id: 'evt-wedding-soiree',
    title: 'Royal Heritage Wedding Showcase',
    date: '2026-04-18',
    location: 'Grand Ballroom, Whitefield',
    type: 'Wedding Showcase',
    description: 'Live demonstrations of our same-day wedding reel workflow and specialized portrait sessions.',
    banner: '/assets/hero-cinematic.jpg',
    availableSlots: 8,
    startingPrice: 4999,
    category: 'Wedding',
    bookingDeadline: '2026-04-15',
    isUpcoming: true
  }
];

export const INITIAL_PROMOTIONS = [
  {
    id: 'promo-fest-2026',
    title: 'FESTIVAL SPECIAL: ₹500 OFF',
    category: 'Festival Offer',
    discount: '₹500 OFF',
    originalPrice: 1999,
    finalPrice: 1499,
    targetPackageId: 'pkg-half-day',
    validUntil: '2026-04-30T23:59:59',
    description: 'Celebrate your event with our Most Popular Half-Day reel package at an exclusive festive pricing.',
    terms: 'Valid on bookings completed before April 30. Applicable to on-spot events within city limits.',
    badge: 'LIMITED TIME',
    active: true
  },
  {
    id: 'promo-college-fest',
    title: 'COLLEGE CREATOR PASS',
    category: 'College Event Offer',
    discount: 'FREE +1 EXTRA REEL',
    originalPrice: 1998,
    finalPrice: 1299,
    targetPackageId: 'pkg-quick-reels',
    validUntil: '2026-05-15T23:59:59',
    description: 'Book Quick Reels for your college fest or club event and receive an additional edited reel absolutely free.',
    terms: 'Valid student ID must be presented during shoot.',
    badge: 'STUDENT PASS',
    active: true
  },
  {
    id: 'promo-wedding-early',
    title: 'WEDDING EARLY BIRD: ₹3,000 OFF',
    category: 'Wedding Offer',
    discount: '₹3,000 OFF',
    originalPrice: 14999,
    finalPrice: 11999,
    targetPackageId: 'pkg-wedding-essentials',
    validUntil: '2026-05-31T23:59:59',
    description: 'Reserve your 2026 wedding dates 30+ days in advance and unlock flat ₹3,000 savings on Wedding Essentials.',
    terms: 'Requires advance deposit. Non-transferable.',
    badge: 'EARLY BIRD',
    active: true
  }
];

export const INITIAL_TESTIMONIALS = [
  {
    id: 't-1',
    customerName: 'Kalyan Janjirala',
    event: 'Founder, Thoduga',
    role: 'Founder',
    company: 'Thoduga',
    review: 'Vela Shootz are super friendly, high-energy reels makers who truly know how to capture genuine moments. Their on-spot workflow and prompt delivery exceeded our expectations. Extremely happy with their service!',
    rating: 5,
    date: '2026-02-18',
    instagram: '@kalyan_thoduga'
  },
  {
    id: 't-2',
    customerName: 'Ravindar Singh',
    event: 'Founder, Sarvatatva',
    role: 'Founder',
    company: 'Sarvatatva',
    review: 'Truly exceptional service with a premium cinematic feel. Their mobile iPhone setup captured crisp, vibrant shots and the lightning-fast delivery sparked instant buzz across our social channels.',
    rating: 5,
    date: '2026-02-10',
    instagram: '@sarvatatva'
  },
  {
    id: 't-3',
    customerName: 'Ganesh Thummala',
    event: 'Founder, Genshark',
    role: 'Founder',
    company: 'Genshark',
    review: 'Flawless execution! They covered our product demo and brand moments without intrusive equipment. We received razor-sharp 4K 9:16 reels ready to broadcast on the same day. Highly recommended.',
    rating: 5,
    date: '2026-01-28',
    instagram: '@genshark.ai'
  }
];

export const INITIAL_FAQS = [
  {
    question: 'How fast will I receive my reels?',
    answer: 'Turnaround depends on your package: Quick Reels (₹1,299) are delivered the same day! Half Day (₹1,999) is delivered within 24–48 hours, Promotions (₹2,999) within 24 hours, and Full Marriage includes same-day priority reels during the wedding with remaining content delivered according to the agreed schedule.'
  },
  {
    question: 'How does booking and payment work?',
    answer: 'A 50% advance payment is required to reserve and block your date and slot. The remaining 50% balance is payable according to the agreed delivery/payment schedule. A date is only considered reserved once the advance payment is received, and the advance is non-refundable.'
  },
  {
    question: 'Can I request extra reels or shooting time?',
    answer: 'Yes! Quick Reels supports +1 Extra Hour + 1 Extra Reel for ₹699; Half Day supports additional reels at ₹399 each; Promotions supports additional campaign reels at ₹699 each. Additional editing does not automatically extend shooting time unless booked separately.'
  },
  {
    question: 'What is your revision policy?',
    answer: 'Each included reel comes with 1 minor revision (small clip replacement, text correction, audio adjustment, or small timing adjustment). Completely new concepts, re-edits, new scripts, or new footage are treated as additional work.'
  },
  {
    question: 'Is raw footage included?',
    answer: 'Raw footage is not included in any standard package. Raw footage can only be provided if separately agreed and priced before delivery.'
  },
  {
    question: 'Do you shoot on cameras or mobile?',
    answer: 'Vela Shootz follows an iPhone-first cinematic production workflow. We shoot exclusively on latest-generation iPhone Pro models in 4K HDR ProRes with professional gimbals and studio-grade wireless audio — built specifically for 9:16 vertical social reels.'
  },
  {
    question: 'What does "1 Function" mean for Wedding Essentials?',
    answer: 'One function means one separately scheduled event (e.g. Haldi = 1 function, Sangeet = 1 function, or Wedding Ceremony = 1 function). Wedding Essentials (₹14,999) covers ONE function up to 8 hours. Multiple functions require a custom quote or the 3-day Full Marriage package (₹59,999).'
  },
  {
    question: 'Can I reschedule my booking?',
    answer: 'Rescheduling is subject to team and slot availability with advance notice. For weddings, rescheduling terms are stricter because multiple creators and dates are blocked.'
  }
];

export const INITIAL_BOOKINGS = [
  {
    id: 'b-1',
    bookingReference: 'VS-2026-00124',
    customerName: 'Vikram Mehta',
    phone: '+91 98765 43210',
    email: 'vikram@mehta.dev',
    packageId: 'pkg-half-day',
    packageName: 'Half Day',
    eventType: 'Birthday Party',
    date: '2026-03-15',
    startTime: '05:00 PM',
    duration: '4 Hours',
    location: 'The Palm Grove, Indiranagar',
    requirements: 'Focus on surprise entry, cake cutting, and golden hour portrait shots.',
    instagram: '@vikram_m',
    status: 'Team Assigned', // Confirmed, Payment Received, Scheduled, Team Assigned, Shoot Completed, Editing, Reels Ready, Delivered, Completed
    paymentStatus: 'Advance Received', // Advance Received, Full Paid, Pending
    totalAmount: 1499,
    assignedTo: 'Aryan (Lead Shooter)',
    createdAt: '2026-03-01T10:30:00Z',
    reelsReadyUrl: ''
  },
  {
    id: 'b-2',
    bookingReference: 'VS-2026-00125',
    customerName: 'Pooja Hegde',
    phone: '+91 98123 45678',
    email: 'pooja@hegde.me',
    packageId: 'pkg-wedding-essentials',
    packageName: 'Wedding Essentials',
    eventType: 'Wedding & Reception',
    date: '2026-03-22',
    startTime: '10:00 AM',
    duration: '2 Days',
    location: 'Royal Palace Convention Centre',
    requirements: '10 cinematic reels covering Haldi ceremony and marriage rituals.',
    instagram: '@pooja_h',
    status: 'Confirmed',
    paymentStatus: 'Advance Received',
    totalAmount: 12999,
    assignedTo: 'Pending Assignment',
    createdAt: '2026-03-02T14:15:00Z',
    reelsReadyUrl: ''
  }
];

export const INITIAL_ENQUIRIES = [
  {
    id: 'enq-1',
    name: 'Tanya Sen',
    phone: '+91 99887 76655',
    email: 'tanya@zenithbrands.com',
    eventType: 'Product Launch & Creator Meetup',
    eventDate: '2026-04-10',
    location: 'Koramangala, Bangalore',
    expectedCoverage: 'Full Day (8 Hours)',
    requiredReels: '6 Reels',
    requiredPortraits: '30 Portraits',
    budgetRange: '₹15,000 - ₹25,000',
    specialRequirements: 'Need 2 creators to capture both guest arrival and stage product unveil simultaneously.',
    status: 'New', // New, Contacted, Follow-up, Quoted, Confirmed, Lost, Completed
    notes: 'Initial inquiry received via Custom Business package flow.',
    createdAt: '2026-03-04T09:45:00Z'
  }
];

export const TIME_SLOTS = [
  '10:00 AM',
  '11:30 AM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM',
  '06:30 PM',
  '08:00 PM'
];
