// VELA SHOOTZ SEED DATA
// Configured according to Master Prompt Section 66 & Specifications

export const INITIAL_PACKAGES = [
  // ON-SPOT REELS
  {
    id: 'pkg-quick-reels',
    category: 'on-spot',
    categoryName: 'On-Spot Reels',
    name: 'Quick Reels',
    price: 999,
    isCustom: false,
    badge: 'QUICK START',
    featured: false,
    coverageHours: 2,
    reelsCount: 2,
    portraitsCount: 0,
    description: 'Perfect for quick gatherings, personal moments, and casual events that need immediate reel delivery.',
    includes: [
      '2 Hours Coverage',
      '2 Polished Reels',
      'On-location shooting',
      'Professionally edited reels',
      'iPhone 16 Pro 4K HDR capture',
      'Same-day delivery turnaround'
    ],
    extraAddons: [
      { id: 'extra-hour-reel', name: '+1 Extra Hour & +1 Extra Reel', price: 550 }
    ],
    cta: 'BOOK QUICK REELS'
  },
  {
    id: 'pkg-half-day',
    category: 'on-spot',
    categoryName: 'On-Spot Reels',
    name: 'Half Day',
    price: 1499,
    isCustom: false,
    badge: 'MOST POPULAR',
    featured: true,
    coverageHours: 4,
    reelsCount: 3,
    portraitsCount: 5,
    description: 'Our signature package for celebrations, parties, and vibrant events wanting comprehensive on-spot coverage.',
    includes: [
      '4 Hours Coverage',
      '3 High-Energy Reels',
      '5 Specialized iPhone Portraits',
      'On-location mobile production',
      'Trending audio curation',
      'Color graded for social platforms'
    ],
    extraAddons: [
      { id: 'extra-reel', name: 'Extra Reel', price: 299 }
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
    description: "Tell us what you're planning and we'll build the package around your event.",
    includes: [
      'Birthdays & Anniversaries',
      'Engagements & Naming ceremonies',
      'Family functions & Celebrations',
      'Custom hours & deliverables',
      'Dedicated mobile cinematographer',
      'Family group portraits & highlight reel'
    ],
    cta: "LET'S HAVE A TALK"
  },

  // BUSINESS
  {
    id: 'pkg-promotions',
    category: 'business',
    categoryName: 'Business',
    name: 'Promotions',
    price: 2499,
    isCustom: false,
    badge: 'GROWTH',
    featured: true,
    coverageHours: 3,
    reelsCount: 3,
    portraitsCount: 10,
    description: 'High-conversion, social-first reels tailored for brands, cafes, retail, and business promos.',
    includes: [
      '3 Promotional Reels',
      'On-location shooting',
      'Product & ambiance highlight shots',
      'Hook-driven narrative editing',
      'Commercial-safe audio & sound design',
      'Ready-to-upload delivery within 24 hours'
    ],
    extraAddons: [
      { id: 'extra-biz-reel', name: 'Additional Campaign Reel', price: 699 }
    ],
    cta: 'BOOK PROMOTION PACKAGE'
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
    description: 'Every business has different content requirements. Let’s build a package around yours.',
    includes: [
      'Brand campaigns & Product launches',
      'Corporate summits & Business events',
      'Social media content retainers',
      'Promotional ad videos',
      'Multi-angle mobile crew',
      'Dedicated creative direction'
    ],
    cta: "LET'S HAVE A TALK"
  },

  // WEDDINGS
  {
    id: 'pkg-wedding-essentials',
    category: 'weddings',
    categoryName: 'Weddings',
    name: 'Wedding Essentials',
    price: 12999,
    isCustom: false,
    badge: 'ESSENTIAL',
    featured: false,
    coverageHours: 16,
    reelsCount: 10,
    portraitsCount: 20,
    description: 'Capturing candid wedding bliss without intrusion — instant reels delivered while the celebration is live.',
    includes: [
      'Haldi + Marriage OR 2 Days Coverage',
      '10 Dynamic Wedding Reels',
      '20 Specialized Cinematic Portraits',
      'On-location mobile cinematography',
      'Fast-turnaround same-day edits',
      'Share-ready private cloud gallery'
    ],
    extraAddons: [
      { id: 'extra-wedding-day', name: 'Additional Function Day', price: 4999 }
    ],
    cta: 'BOOK WEDDING COVERAGE'
  },
  {
    id: 'pkg-full-marriage',
    category: 'weddings',
    categoryName: 'Weddings',
    name: 'Full Marriage',
    price: 59999,
    isCustom: false,
    badge: 'COMPLETE WEDDING',
    featured: true,
    coverageHours: 36,
    reelsCount: 25,
    portraitsCount: 45,
    description: 'The ultimate royal coverage for 3-day luxury celebrations. Complete instant reel mastery.',
    includes: [
      '3 Full Days Coverage (Mehendi, Sangeet, Wedding, Reception)',
      '25 Cinematic Vertical Reels',
      '45 Specialized High-Res Portraits',
      '2 Dedicated Mobile Creators with Gimbals & Wireless Audio',
      'Priority live-editing station on-site',
      'VIP reel delivery for immediate guest posting'
    ],
    extraAddons: [
      { id: 'drone-aerial', name: 'Aerial 4K Reel Teasers', price: 7500 }
    ],
    cta: 'BOOK FULL WEDDING'
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
    description: 'Suitable for destination weddings, multi-city celebrations, and tailored deliverables.',
    includes: [
      'Additional days & functions',
      'Additional reels & specialized portraits',
      'Multi-creator production crew',
      'Customized music & editing aesthetics',
      'Full destination travel readiness',
      'VIP direct creative director access'
    ],
    cta: "LET'S HAVE A TALK"
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
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-party-crowd-raising-their-hands-in-a-concert-40898-large.mp4',
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
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-smiling-and-looking-at-each-other-42790-large.mp4',
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
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-barista-pouring-milk-into-coffee-cup-42410-large.mp4',
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
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dj-mixing-music-in-a-party-40899-large.mp4',
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
    image: '/assets/hero-cinematic.jpg',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-throwing-colorful-powder-in-the-air-40879-large.mp4',
    featured: false,
    client: 'Sharma Family',
    highlight: 'High frame-rate 4K 60fps flower petal bursts with antique color treatment.'
  },
  {
    id: 'proj-6',
    title: 'Urban Fitwear — Streetwear Drop 04',
    category: 'Creators',
    categorySlug: 'creators',
    date: '2026-01-15',
    location: 'Metro Rooftop',
    services: 'Fashion Lookbook Reels',
    reelsCount: 3,
    portraitsCount: 20,
    image: '/assets/hero-cinematic.jpg',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-posing-for-the-camera-in-a-fashion-photoshoot-42407-large.mp4',
    featured: false,
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
    originalPrice: 1499,
    finalPrice: 999,
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
    originalPrice: 1298,
    finalPrice: 999,
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
    originalPrice: 12999,
    finalPrice: 9999,
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
  },
  {
    id: 't-4',
    customerName: 'Aditya & Sneha',
    event: 'Wedding Reception',
    review: 'We had our first cinematic wedding reel posted to Instagram while our reception dinner was still going on! The guests were stunned. No waiting for 3 months.',
    rating: 5,
    date: '2026-01-20',
    instagram: '@aditya_sneha_vows'
  },
  {
    id: 't-5',
    customerName: 'Rohit Verma',
    event: 'College Fest President',
    review: 'Vela Shootz moved with our energy. The iPhone setup meant they were in the center of the mosh pit without bulky cameras getting in the way. Viral edits delivered same night.',
    rating: 5,
    date: '2026-02-14',
    instagram: '@rohit_festhead'
  },
  {
    id: 't-6',
    customerName: 'Meera Nambiar',
    event: 'Cafe Brand Launch',
    review: 'Super crisp 4K quality, beautiful antique warm grading, and they understood exactly how Reels algorithm hooks work. Our booking tables were packed.',
    rating: 5,
    date: '2026-02-02',
    instagram: '@kaviar_blr'
  }
];

export const INITIAL_FAQS = [
  {
    question: 'How fast will I receive my reels?',
    answer: 'Speed is our primary promise! For On-Spot Quick Reels and Half-Day packages, content is edited and delivered the same day — often within 2 to 4 hours of shooting so you can post while the excitement is still fresh. Wedding essentials are delivered within 24–48 hours.'
  },
  {
    question: 'Do you shoot on cameras?',
    answer: 'Vela Shootz deliberately follows an iPhone-only mobile-first production workflow. We shoot exclusively on latest-generation iPhone Pro models in 4K HDR ProRes with professional gimbals, specialized optical accessories, and studio-grade wireless audio. This allows us to be fast, agile, unobtrusive, and craft content tailored natively for 9:16 mobile screens.'
  },
  {
    question: 'Can I request extra reels or hours?',
    answer: 'Yes! You can add extra hours or additional reels directly when selecting your package or during booking. Quick Reels supports +1 Hour & +1 Reel for ₹550; Half Day supports extra reels at ₹299 each.'
  },
  {
    question: 'Can I customize a package?',
    answer: "Absolutely. For Family Events, Brand Campaigns, and Multi-Day Weddings, click 'Let's Have A Talk' to submit your event specifics, and we will build a custom deliverables package tailored to your exact budget and timeline."
  },
  {
    question: 'Do you travel for shoots?',
    answer: 'Yes, we travel for weddings, corporate summits, and college festivals. Travel and accommodation are arranged transparently based on your destination.'
  },
  {
    question: 'Can I book a specific time slot?',
    answer: 'Yes, our slot booking system lets you pick an exact available morning, afternoon, or evening time window. Once confirmed, that slot is locked exclusively for your event.'
  },
  {
    question: 'Can I reschedule my booking?',
    answer: 'Yes, rescheduling is permitted up to 48 hours before your shoot time subject to date and slot availability.'
  },
  {
    question: 'Do you cover weddings?',
    answer: 'Yes! We offer dedicated Wedding Essentials (Haldi + Marriage / 2 Days, 10 Reels, 20 Portraits) and Full Marriage 3-Day luxury coverage designed specifically for viral, emotional, high-speed wedding storytelling.'
  },
  {
    question: 'Can businesses book recurring content?',
    answer: 'Yes, we offer monthly retainer packages for businesses, restaurants, cafes, and creators requiring consistent weekly reels and promotional media.'
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
