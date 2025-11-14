// Mock data for the tutorial demonstration

export const mockWebsite = {
  name: "BOB'S BURGERS",
  phone: "(435) 555-1234",
  address: "123 main st moab",
  hours: "Mon-Fri 9am-5pm Sat 10-3",
  description: "BEST BURGERS IN TOWN! Family owned since 1995. We use LOCAL INGREDIENTS and make everything FRESH DAILY!!!",
  images: [
    { url: "/placeholder-burger1.jpg", alt: "Burger" },
    { url: "/placeholder-exterior.jpg", alt: "Restaurant exterior" },
    { url: "/placeholder-interior.jpg", alt: "Dining room" }
  ]
};

export const rawScrapedData = {
  name: "BOB'S BURGERS",
  phone: "(435) 555-1234",
  address: "123 main st moab",
  hours: "Mon-Fri 9am-5pm Sat 10-3",
  description: "BEST BURGERS IN TOWN! Family owned since 1995. We use LOCAL INGREDIENTS and make everything FRESH DAILY!!!",
  latitude: null,
  longitude: null,
  images: [
    { url: "/placeholder-burger1.jpg" },
    { url: "/placeholder-exterior.jpg" },
    { url: "/placeholder-interior.jpg" }
  ]
};

export const cleanedData = {
  name: "Bob's Burgers",
  phone: "435-555-1234",
  address: "123 Main St, Moab, UT 84532",
  formatted_address: "123 Main St, Moab, UT 84532",
  hours: {
    monday: { open: "09:00", close: "17:00" },
    tuesday: { open: "09:00", close: "17:00" },
    wednesday: { open: "09:00", close: "17:00" },
    thursday: { open: "09:00", close: "17:00" },
    friday: { open: "09:00", close: "17:00" },
    saturday: { open: "10:00", close: "15:00" },
    sunday: { closed: true }
  },
  description: "Bob's Burgers is a family-owned restaurant in Moab, Utah, serving American comfort food since 1995. Known for their fresh, locally-sourced burgers and welcoming atmosphere, they've become a local favorite for both residents and tourists.",
  ai_enhanced: true,
  dining_cuisine: ["American", "Burgers"],
  dining_features: ["Family-friendly", "Casual", "Local ingredients"],
  latitude: 38.5733,
  longitude: -109.5498,
  map_url: "https://maps.google.com/?q=38.5733,-109.5498",
  images: [
    {
      url: "/placeholder-burger1.jpg",
      type: "content",
      validated: true,
      classification: "food"
    },
    {
      url: "/placeholder-exterior.jpg",
      type: "header",
      validated: true,
      classification: "exterior"
    },
    {
      url: "/placeholder-interior.jpg",
      type: "content",
      validated: true,
      classification: "interior"
    }
  ],
  quality_score: 98
};

export const fields = [
  { name: "name", label: "Business Name", color: "#9333ea" },
  { name: "address", label: "Address", color: "#3b82f6" },
  { name: "hours", label: "Hours", color: "#10b981" },
  { name: "phone", label: "Phone", color: "#f59e0b" },
  { name: "images", label: "Images", color: "#ef4444" }
];

export const pipelineStages = [
  {
    id: 1,
    name: "HTML Archive",
    icon: "📦",
    description: "Save raw HTML",
    tooltip: "Store the original webpage HTML for legal compliance and audit purposes - like keeping receipts."
  },
  {
    id: 2,
    name: "ID Generation",
    icon: "🔑",
    description: "Create unique ID",
    tooltip: "Generate a unique identifier for each record to prevent duplicates - like a fingerprint for data."
  },
  {
    id: 3,
    name: "HTML Decode",
    icon: "🔓",
    description: "Decode characters",
    tooltip: "Convert encoded HTML characters (&amp; becomes &) back to readable text."
  },
  {
    id: 4,
    name: "Content Clean",
    icon: "🧹",
    description: "Remove malicious code",
    tooltip: "Strip out scripts, malicious code, and unnecessary HTML to keep only the clean content."
  },
  {
    id: 5,
    name: "Media Classify",
    icon: "🖼️",
    description: "Categorize images",
    tooltip: "Automatically label images as header, food, interior, exterior, etc. for better organization."
  },
  {
    id: 6,
    name: "Phone Extract",
    icon: "📞",
    description: "Parse phone numbers",
    tooltip: "Find and extract phone numbers from text, handling various formats and extensions."
  },
  {
    id: 7,
    name: "Validation",
    icon: "✅",
    description: "Check required fields",
    tooltip: "Verify all required information is present and correctly formatted before saving."
  },
  {
    id: 8,
    name: "Storage",
    icon: "💾",
    description: "Save to database",
    tooltip: "Store the clean, validated data in the production database for use in applications."
  }
];
