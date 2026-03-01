export type CardStyle = "menu-item" | "polaroid-snap" | "price-tag" | "glass-plate" | "chalkboard" | "bold-poster" | "receipt-fold";
export type HeroStyle = "fullscreen-appetite" | "warm-comfort" | "street-energy" | "minimal-fresh" | "bold-neon" | "rustic-handmade";
export type ProductGrid = "2-col-hero" | "3-col-standard" | "4-col-dense" | "list-menu" | "masonry-feast" | "magazine-spread";
export type CardHover = "lift-shadow" | "warm-glow" | "bounce" | "slide-reveal" | "shake-fun";
export type PageEntrance = "fade-up" | "stagger-pop" | "slide-in" | "zoom-appetite";
export type AnimSpeed = "instant" | "snappy" | "smooth" | "slow-savor";
export type BackgroundTexture = "none" | "grain" | "dots" | "diagonal-lines" | "smoke" | "confetti";

export type FoodTheme = {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  bestFor: string;
  colors: {
    background: string;
    surface: string;
    surfaceHover: string;
    primary: string;
    primaryForeground: string;
    accent: string;
    highlight: string;
    border: string;
    text: string;
    textMuted: string;
  };
  fonts: {
    display: string;
    body: string;
  };
  layout: {
    productGrid: ProductGrid;
    heroStyle: HeroStyle;
    cardStyle: CardStyle;
    borderRadius: string;
    spacing: "tight" | "balanced" | "generous";
  };
  animation: {
    cardHover: CardHover;
    pageEntrance: PageEntrance;
    speed: AnimSpeed;
  };
  decorative: {
    backgroundTexture: BackgroundTexture;
    accentElements: string;
  };
};

export const foodThemes: FoodTheme[] = [
  {
    id: "sweet-bakery",
    name: "Sweet Bakery",
    emoji: "🎂",
    tagline: "Made with love, served with warmth",
    bestFor: "Cakes, cupcakes, cookies, pastries, desserts, home bakers",
    colors: {
      background: "#FFF8F3",
      surface: "#FFFFFF",
      surfaceHover: "#FEF0E7",
      primary: "#C0636A",
      primaryForeground: "#FFFFFF",
      accent: "#F5D0A9",
      highlight: "#F9A8D4",
      border: "#F0D5C8",
      text: "#3D1F1F",
      textMuted: "#9E6B6B",
    },
    fonts: { display: "Playfair Display", body: "Lato" },
    layout: { productGrid: "masonry-feast", heroStyle: "warm-comfort", cardStyle: "polaroid-snap", borderRadius: "20px", spacing: "generous" },
    animation: { cardHover: "lift-shadow", pageEntrance: "stagger-pop", speed: "slow-savor" },
    decorative: { backgroundTexture: "grain", accentElements: "floating hearts, pastel watercolor blobs in corners, subtle floral borders" },
  },
  {
    id: "street-fiesta",
    name: "Street Food Fiesta",
    emoji: "🌮",
    tagline: "Bold flavors, street vibes",
    bestFor: "Tacos, burgers, wraps, fast food, food trucks, street vendors",
    colors: {
      background: "#1A0A00",
      surface: "#2D1200",
      surfaceHover: "#3D1A00",
      primary: "#FF6B00",
      primaryForeground: "#FFFFFF",
      accent: "#FFD600",
      highlight: "#FF2D55",
      border: "#4D2A00",
      text: "#FFF5E6",
      textMuted: "#B07840",
    },
    fonts: { display: "Bebas Neue", body: "Open Sans" },
    layout: { productGrid: "3-col-standard", heroStyle: "street-energy", cardStyle: "bold-poster", borderRadius: "6px", spacing: "tight" },
    animation: { cardHover: "warm-glow", pageEntrance: "slide-in", speed: "snappy" },
    decorative: { backgroundTexture: "smoke", accentElements: "fire flicker effects on hero, bold diagonal accent stripe, grunge texture overlay on cards" },
  },
  {
    id: "pizzeria",
    name: "Pizzeria",
    emoji: "🍕",
    tagline: "Authentic. Hot. Unforgettable.",
    bestFor: "Pizza, pasta, Italian food, family restaurants, takeout",
    colors: {
      background: "#FDF6EC",
      surface: "#FFFFFF",
      surfaceHover: "#FFF3E0",
      primary: "#C0392B",
      primaryForeground: "#FFFFFF",
      accent: "#E67E22",
      highlight: "#27AE60",
      border: "#E8D5B7",
      text: "#2C1810",
      textMuted: "#8D6E63",
    },
    fonts: { display: "Libre Baskerville", body: "Nunito" },
    layout: { productGrid: "magazine-spread", heroStyle: "fullscreen-appetite", cardStyle: "menu-item", borderRadius: "6px", spacing: "balanced" },
    animation: { cardHover: "lift-shadow", pageEntrance: "fade-up", speed: "smooth" },
    decorative: { backgroundTexture: "diagonal-lines", accentElements: "Italian flag color accents (red/white/green), checkered pattern in hero bg, pizza slice decorative dividers" },
  },
  {
    id: "fresh-healthy",
    name: "Fresh & Healthy",
    emoji: "🥗",
    tagline: "Clean food, clean life",
    bestFor: "Salads, smoothies, juices, organic food, healthy meals, vegan",
    colors: {
      background: "#F0FAF4",
      surface: "#FFFFFF",
      surfaceHover: "#E8F5E9",
      primary: "#2E7D32",
      primaryForeground: "#FFFFFF",
      accent: "#66BB6A",
      highlight: "#FDD835",
      border: "#C8E6C9",
      text: "#1B3A1F",
      textMuted: "#558B5E",
    },
    fonts: { display: "DM Serif Display", body: "DM Sans" },
    layout: { productGrid: "4-col-dense", heroStyle: "minimal-fresh", cardStyle: "glass-plate", borderRadius: "12px", spacing: "generous" },
    animation: { cardHover: "lift-shadow", pageEntrance: "fade-up", speed: "smooth" },
    decorative: { backgroundTexture: "dots", accentElements: "leaf motifs in corners, soft green gradient blobs, calorie/nutrition badge on cards" },
  },
  {
    id: "bbq-grill",
    name: "BBQ & Grill",
    emoji: "🍗",
    tagline: "Low and slow. Worth the wait.",
    bestFor: "Grilled meats, BBQ, wings, ribs, smokehouse, outdoor dining",
    colors: {
      background: "#1C0F0A",
      surface: "#2A1510",
      surfaceHover: "#3D1F15",
      primary: "#D84315",
      primaryForeground: "#FFFFFF",
      accent: "#FF8F00",
      highlight: "#F4511E",
      border: "#4E2020",
      text: "#FFF3E0",
      textMuted: "#A0785A",
    },
    fonts: { display: "Alfa Slab One", body: "Cabin" },
    layout: { productGrid: "2-col-hero", heroStyle: "fullscreen-appetite", cardStyle: "chalkboard", borderRadius: "6px", spacing: "balanced" },
    animation: { cardHover: "warm-glow", pageEntrance: "zoom-appetite", speed: "snappy" },
    decorative: { backgroundTexture: "smoke", accentElements: "flame effects on primary CTA, charcoal texture on hero, ember particles floating up" },
  },
  {
    id: "asian-kitchen",
    name: "Asian Kitchen",
    emoji: "🍱",
    tagline: "Flavors from across Asia",
    bestFor: "Chinese, Japanese, Thai, Indian, sushi, noodles, rice dishes, Asian fusion",
    colors: {
      background: "#0D0D0D",
      surface: "#1A1A1A",
      surfaceHover: "#252525",
      primary: "#E53935",
      primaryForeground: "#FFFFFF",
      accent: "#FFD600",
      highlight: "#FF6D00",
      border: "#333333",
      text: "#F5F5F5",
      textMuted: "#9E9E9E",
    },
    fonts: { display: "Noto Serif", body: "Noto Sans" },
    layout: { productGrid: "3-col-standard", heroStyle: "bold-neon", cardStyle: "price-tag", borderRadius: "0px", spacing: "tight" },
    animation: { cardHover: "slide-reveal", pageEntrance: "stagger-pop", speed: "snappy" },
    decorative: { backgroundTexture: "none", accentElements: "thin red accent lines, lantern-style decorative dividers, subtle red gradient on hero edges" },
  },
  {
    id: "fun-kids",
    name: "Fun Bites",
    emoji: "🧁",
    tagline: "Food that makes you smile",
    bestFor: "Kids meals, fun snacks, ice cream, candy, party food, novelty food",
    colors: {
      background: "#FFFDE7",
      surface: "#FFFFFF",
      surfaceHover: "#FFF9C4",
      primary: "#FF4081",
      primaryForeground: "#FFFFFF",
      accent: "#00BCD4",
      highlight: "#76FF03",
      border: "#FFCCBC",
      text: "#3E2723",
      textMuted: "#795548",
    },
    fonts: { display: "Fredoka One", body: "Nunito" },
    layout: { productGrid: "masonry-feast", heroStyle: "warm-comfort", cardStyle: "polaroid-snap", borderRadius: "9999px", spacing: "generous" },
    animation: { cardHover: "bounce", pageEntrance: "stagger-pop", speed: "snappy" },
    decorative: { backgroundTexture: "confetti", accentElements: "rainbow confetti raining in hero, star burst on CTA button, wiggle animation on product images on hover" },
  },
  {
    id: "home-kitchen",
    name: "Home Kitchen",
    emoji: "🫕",
    tagline: "Just like mama made it",
    bestFor: "Home-cooked meals, stews, soups, traditional food, meal prep, catering",
    colors: {
      background: "#FAF7F0",
      surface: "#FFFFFF",
      surfaceHover: "#F5F0E8",
      primary: "#795548",
      primaryForeground: "#FFFFFF",
      accent: "#A5763E",
      highlight: "#FF8A65",
      border: "#E8DDD0",
      text: "#2C1A0E",
      textMuted: "#8D7260",
    },
    fonts: { display: "Fraunces", body: "Karla" },
    layout: { productGrid: "magazine-spread", heroStyle: "rustic-handmade", cardStyle: "receipt-fold", borderRadius: "12px", spacing: "generous" },
    animation: { cardHover: "lift-shadow", pageEntrance: "fade-up", speed: "slow-savor" },
    decorative: { backgroundTexture: "grain", accentElements: "linen texture background, hand-drawn style borders on cards, vintage stamp on featured items" },
  },
];

export const defaultTheme = foodThemes[0];
