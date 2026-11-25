export interface ProjectMetric {
  k: string;
  v: string;
}

export interface ProjectDeep {
  label: string;
  detail: string;
}

export interface ProjectItem {
  id: string;
  num: string;
  badges: string[];
  category: string;
  title: string;
  summary: string;
  role: string;
  platform: string;
  timeline: string;
  figma: string | null;
  prototypeUrl?: string | null;
  image: string;
  metrics: ProjectMetric[];
  deep: ProjectDeep[];
}

export interface PillarItem {
  num: string;
  title: string;
  body: string;
}

export interface CompetencyItem {
  num: string;
  title: string;
  body: string;
  tags: string[];
}

export interface ExperienceItem {
  period: string;
  title: string;
  org: string;
  location?: string;
  workMode?: string;
  body: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  linkedinUrl: string;
}

export interface ToolCategory {
  category: string;
  items: string[];
}

export interface SocialLink {
  name: string;
  handle: string;
  url: string;
  icon: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  image?: string;
  placeholderNote?: string;
}

export const EMAIL = "sawantvinay289@gmail.com";

export const RESUME_PDF_URL = "/assets/aistudio/Vinay_Sawant_Resume__2026__6626c98a.pdf";

export const SOCIALS: SocialLink[] = [
  {
    name: "LinkedIn",
    handle: "sawantvinay",
    url: "https://www.linkedin.com/in/sawantvinay/",
    icon: "linkedin"
  },
  {
    name: "GitHub",
    handle: "VinayDevloper",
    url: "https://github.com/VinayDevloper",
    icon: "github"
  },
  {
    name: "X (Twitter)",
    handle: "@vinaysawant9067",
    url: "https://x.com/vinaysawant9067",
    icon: "x"
  },
  {
    name: "YouTube",
    handle: "@vinaysawant",
    url: "https://youtube.com/@vinaysawant",
    icon: "youtube"
  }
];

export const IMAGES = {
  portrait: "/images/portrait_clean_transparent.png",
  portraitFallback: "/images/portrait_studio.jpg",
  portraitStudio: "/images/portrait_studio.jpg",
  portraitLight: "/images/portrait_animated_transparent.webp",
  portraitLightFallback: "/images/portrait_animated_transparent.png"
};

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" }
];

export const MARQUEE_ITEMS = [
  "UX Research",
  "Design Systems",
  "Figma Auto-Layout",
  "WCAG 2.2 AA",
  "Tailwind Tokens",
  "Developer Handoff",
  "Mobile · SaaS · Consumer"
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "healthapp",
    num: "01",
    badges: ["UX CASE STUDY", "Ayurveda & Wellness", "Solo Designer"],
    category: "Mobile & Consumer Healthcare",
    title: "Swasthyasaathi — Turning 2,000+ Years of Ayurveda into Everyday Wellness",
    summary:
      "Built a modern health app that unites modern wellness with simple, familiar Ayurvedic guidance. Delivers clear, personalized, symptom-based routines, yoga, and food advice in users' own language.",
    role: "UX / UI Designer (solo)",
    platform: "Mobile Health App (Concept)",
    timeline: "Self-initiated UX Case Study",
    figma:
      "https://www.figma.com/design/nkF1GwcqesYjIYWyJRVH2B/healthApp-casestudy?node-id=0-1&t=NTDB48DYdRQGsYQI-1",
    image: "/assets/aistudio/image_1de3f0dc.png",
    metrics: [
      {
        k: "-50%",
        v: "Reduced User Effort — cuts multiple Google searches down to one guided flow"
      },
      {
        k: "3 Competitors",
        v: "Deep teardown of AyuRythm (2.9/5), Practo (4.5/5), and Ada Health (4.6/5)"
      },
      {
        k: "50+ UI",
        v: "Reusable design system components with cultural motifs & Hindi/English typography"
      }
    ],
    deep: [
      {
        label: "Design Rationale",
        detail:
          "Paired traditional Indian cultural elements (Lotus, Mandala, Indian tricolour warmth) with a fast icon-first symptom input instead of cluttered 3D models."
      },
      {
        label: "Problem Solved",
        detail:
          "Unified fragmented Google searches, YouTube videos, and family remedies into a single symptom → yoga → food → doctor safety flow."
      },
      {
        label: "UX Interview Insight",
        detail:
          "“Suggest logical reason for particular disease... when we give user clarity about the scenario that automatically builds user trust.”"
      }
    ]
  },
  {
    id: "smts",
    num: "02",
    badges: ["ENTERPRISE WMS", "FSMA 204 UX", "Design Systems"],
    category: "Enterprise SaaS & Supply Chain (WMS / MES)",
    title: "SMTS Warehouse — Enterprise WMS, Manufacturing & Lot Traceability UX",
    summary:
      "Redesigning a complex legacy warehouse setup into a fast, structured desktop workspace unifying dock logistics, roasting operations, QA holds, and end-to-end lot traceability.",
    role: "Product Designer (UX Architecture, Workflows & Design System)",
    platform: "Desktop Web App (1280px+)",
    timeline: "B2B Enterprise SaaS · WMS & MES",
    figma: null,
    prototypeUrl: "https://ai.studio/apps/958a6fa2-a01d-4c8a-aca8-4d5b8bb2fafd?fullscreenApplet=true",
    image: "/assets/aistudio/image_e849d11f.png",
    metrics: [
      {
        k: "9 Modules",
        v: "Unified navigation linking Logistics, Purchasing, MES, QA, Sales, Traceability & Governance"
      },
      {
        k: "FSMA 204",
        v: "Designed around farm-to-retail lot genealogy and GS1 SSCC-18 barcode workflows"
      },
      {
        k: "Guardrails",
        v: "Blind cycle counting, List-vs-Floor price checks & inline non-blocking validations"
      }
    ],
    deep: [
      {
        label: "Core Design Principle",
        detail:
          "Would warehouse staff trust and efficiently use this workspace every shift? Workflows were mapped across 6 operational roles before designing screens."
      },
      {
        label: "Workflow Friction Addressed",
        detail:
          "Solved modal dropdown clipping in Pallet Putaway, cycle count bias, below-floor pricing errors, and exposed margin lines on customer invoices."
      },
      {
        label: "System-Wide Consistency",
        detail:
          "Standardized one top-right primary CTA per active tab (#00619A Operational Blue), tabular numerals across lot/bin ledgers, and readable audit summaries."
      }
    ]
  },
  {
    id: "dholo",
    num: "03",
    badges: ["CONSUMER MOBILE", "iOS HIG", "Live Tracking"],
    category: "Consumer Mobile & Design Systems",
    title: "Dholo: Laundry & Ironing Service for Urban Residences — Tap. Wash. Repeat.",
    summary:
      "Connecting hostel, PG, and apartment residents in Tier 1 & 2 cities with trusted laundry providers. Features 5-step design thinking, itemized bucket calculator, hi-fi iOS screens, and Apple HIG compliance.",
    role: "Solo Product Designer",
    platform: "iOS Mobile App & UI Kit",
    timeline: "Product Design · iOS HIG",
    figma: null,
    image: "/assets/aistudio/image_9481c10c.png",
    metrics: [
      {
        k: "11 Screens",
        v: "End-to-end service journey from discovery to real-time tracking"
      },
      {
        k: "3-Step",
        v: "Express checkout from load estimation to driver booking"
      },
      {
        k: "Live ETA",
        v: "Real-time order progress timeline with driver chat (Liam 4.9★)"
      }
    ],
    deep: [
      {
        label: "Design Rationale",
        detail:
          "Hostel students and young professionals face opaque pricing and unscheduled pickups — requiring upfront pricing and scheduling clarity."
      },
      {
        label: "Problem Solved",
        detail:
          "Eliminated price anxiety with an interactive load calculator and live driver GPS status tracking."
      },
      {
        label: "User Validation",
        detail:
          "“Knowing exactly when my clothes will be picked up without calling the shopkeeper saves 20 minutes every week.”"
      }
    ]
  },
  {
    id: "spotify",
    num: "04",
    badges: ["FIGMA UI PRACTICE", "Component Replication", "Dark Mode"],
    category: "Mobile & Community UI Architecture",
    title: "Spotify App Clone — Figma UI Replication, Components & Color Tokens",
    summary:
      "A hands-on Figma UI practice study replicating Spotify's dark-mode mobile screens, reusable component variants, icon sizing, and color palette — learned from mentor Saurabh Saini.",
    role: "Figma UI Practice",
    platform: "iOS Mobile App · Figma",
    timeline: "Figma Skill Practice",
    figma:
      "https://www.figma.com/design/AUQlmiif5LkwxiPKjNhCnI/Spotify-App-Clone-UI-Design--Community-?node-id=1-2&t=KezqwunEA5dSyfJX-1",
    image: "/assets/aistudio/image_20cc059c.png",
    metrics: [
      {
        k: "4 Screens",
        v: "Pixel-accurate replication of Splash, Home, Search, and Album/Track views in Figma"
      },
      {
        k: "Color System",
        v: "Structured dark-mode surfaces (#181414), Spotify green (#1ED760), and genre card accents"
      },
      {
        k: "Components",
        v: "64px & 44px icon scales, status bars, pill buttons, and reusable bottom tab bar variants"
      }
    ],
    deep: [
      {
        label: "Why This Practice",
        detail:
          "Built purely to master Figma fundamentals—Auto-Layout, component structuring, icon consistency, and color palettes—under mentorship from Saurabh Saini."
      },
      {
        label: "Key Figma Skills Learned",
        detail:
          "Organized reusable UI components, dark-surface contrast hierarchy, and unified icon grids alongside album cover asset management."
      },
      {
        label: "Mentorship Credit",
        detail:
          "“Learned component hierarchy, spacing discipline, and Figma file hygiene directly from Saurabh Saini.”"
      }
    ]
  }
];

export const PILLARS: PillarItem[] = [
  {
    num: "01",
    title: "Research-First",
    body: "Grounding every layout in quantitative data and root-cause clarity rather than surface decoration. 78 survey responses shaped HealthApp before a single frame was drawn."
  },
  {
    num: "02",
    title: "User-Centered Problem Solving",
    body: "Mapping complex behavioral journeys, user intent, and cognitive ergonomics to remove operational friction and build effortless, calm daily workflows."
  },
  {
    num: "03",
    title: "Iterative Prototyping & Craft",
    body: "Refining interaction fidelity through hands-on testing, motion choreography, and high-precision UI components that withstand real-world user testing."
  }
];

export const COMPETENCIES: CompetencyItem[] = [
  {
    num: "01",
    title: "User Research & Behavioral Insights",
    body: "Synthesizing quantitative surveys, cohort interviews, and task-completion friction data into actionable product requirements before designing.",
    tags: [
      "Quantitative Surveys",
      "Persona Synthesis",
      "Cognitive Friction Analysis"
    ]
  },
  {
    num: "02",
    title: "Design Systems Architecture",
    body: "Structuring scalable Figma component libraries, responsive token sets, and auto-layout variants that keep product surfaces coherent across screens.",
    tags: ["Auto-Layout 5.0", "Design Tokens", "Component Variants"]
  },
  {
    num: "03",
    title: "Interaction & Micro-Animations",
    body: "Designing fluid gesture responses, state transitions, and responsive micro-interactions that communicate system state and delight users without lag.",
    tags: ["Micro-Interactions", "Motion Choreography", "State Feedback"]
  },
  {
    num: "04",
    title: "Cross-Functional Handoff & Specs",
    body: "Documenting complete state matrices — empty states, loading skeletons, partial failures, and responsive constraints for frictionless engineering collaboration.",
    tags: ["State Matrices", "Redlines & Specs", "Developer Alignment"]
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    period: "Oct 2026 — Present",
    title: "Tech Support Executive",
    org: "Softmate Systems LLP",
    location: "Collector Office, Sindhudurg",
    workMode: "On-site",
    body: "Providing on-site technical support at the Sindhudurg Collector Office—resolving day-to-day software issues for government end users, monitoring project systems, and coordinating issue resolution with the engineering team."
  },
  {
    period: "Dec 2025 — Present",
    title: "Product Designer",
    org: "SiliconMount Tech Services",
    location: "Pune, Maharashtra",
    workMode: "Remote",
    body: "Leading end-to-end UX and UI design remotely across enterprise web and mobile products—building tokenized Figma component libraries, conducting usability research, and partnering closely with Pune-based developers from architecture through handoff."
  },
  {
    period: "Nov 2022 — July 2026",
    title: "B.Tech — Information Technology",
    org: "Raigad, Maharashtra, India",
    body: "Solid foundation in computer science, systems architecture, and frontend engineering — enabling design decisions deeply grounded in how real software is built."
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "vijaykumar-mehtre",
    quote:
      "Vinay brings rare product architecture clarity to complex engineering systems. From redesigning our MyBOQ estimation workspace to crafting Construction ERP and QR Asset workflows, he translates dense operational requirements into intuitive interfaces our developers ship rapidly.",
    name: "Vijaykumar Mehtre",
    role: "Director · SiliconMount Tech Services",
    company: "SiliconMount Tech Services Pvt. Ltd.",
    avatar: "/assets/aistudio/image_ae6951d5.png",
    linkedinUrl: "https://www.linkedin.com/in/vijaykumarmehtre/"
  },
  {
    id: "prathamesh-jadhav",
    quote:
      "Working with Vinay’s designs as a full-stack developer is genuinely effortless. He builds Figma systems grounded in real frontend and API constraints—clean component hierarchy, consistent tokens, and well-thought-out edge states that make handoff fast and unambiguous.",
    name: "Prathamesh Jadhav",
    role: "Full Stack Developer",
    company: "React · Next.js · Laravel",
    avatar: "/assets/aistudio/image_c69bcf43.png",
    linkedinUrl: "https://www.linkedin.com/in/prathamesh0009m/"
  },
  {
    id: "manasi-bhangale",
    quote:
      "Collaborating with Vinay on the Warehouse project was a standout experience. He broke down intricate warehouse logistics, lot traceability, and multi-role operator workflows into a calm, structured desktop workspace that felt intuitive from the very first sprint.",
    name: "Manasi Bhangale",
    role: "Software Developer · Warehouse Project",
    company: "WMS & Traceability Collaboration",
    avatar: "/assets/aistudio/image_bd906ee1.png",
    linkedinUrl: "https://www.linkedin.com/in/manasi-bhangale-5878662b3/"
  },
  {
    id: "praveen-kushwaha",
    quote:
      "Vinay pairs strong computer science fundamentals with thoughtful UX discipline. He doesn’t stop at polished visuals—he maps complete user journeys, role-based access flows, and system edge cases so enterprise applications scale cleanly without usability friction.",
    name: "Praveen Kumar Kushwaha",
    role: "Systems Engineer · Tata Consultancy Services (TCS)",
    company: "Tata Consultancy Services",
    avatar: "/assets/aistudio/image_0b54fbc6.png",
    linkedinUrl: "https://www.linkedin.com/in/praveenk9414/"
  },
  {
    id: "sanjog-magar",
    quote:
      "Turning Vinay’s mobile designs into production screens as a Flutter developer is always smooth. His spacing precision, reusable component variants, and clear user flow documentation translate directly into clean widget trees and responsive app experiences.",
    name: "Sanjog Magar",
    role: "Flutter Developer",
    company: "Cross-Platform Mobile Apps",
    avatar: "/assets/aistudio/image_d70d64f6.png",
    linkedinUrl: "https://www.linkedin.com/in/sanjog-magar-222785308/"
  }
];

export const TOOLS: ToolCategory[] = [
  {
    category: "Design",
    items: [
      "Figma",
      "Auto-Layout 5.0",
      "Component Variants",
      "Variables & Semantic Tokens"
    ]
  },
  {
    category: "Research",
    items: [
      "Quantitative Surveys",
      "NotebookLM",
      "Sentiment Clustering",
      "Usability Feedback Loops"
    ]
  },
  {
    category: "Prototyping & Validation",
    items: [
      "Interactive Prototypes",
      "Component States",
      "User Flow Mapping",
      "Usability Testing"
    ]
  },
  {
    category: "Frontend Feasibility",
    items: [
      "HTML / CSS",
      "Tailwind CSS",
      "React Component Logic",
      "REST API Alignment"
    ]
  },
  {
    category: "Accessibility",
    items: [
      "WCAG 2.2 AA",
      "Devanagari Typography",
      "Color-blind Safe States",
      "48px Touch Targets"
    ]
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "tutedude-uiux",
    title: "UI/UX Design Course Completion",
    issuer: "Tutedude",
    date: "May 2025",
    credentialId: "TD-VINA-UI-1345",
    image: "/assets/aistudio/image_29022cc1.png"
  },
  {
    id: "microsoft-genai",
    title: "Career Essentials in Generative AI",
    issuer: "Microsoft & LinkedIn Learning",
    date: "Jul 2024",
    credentialId: "ea163027...369f",
    image: "/assets/aistudio/image_32e2992f.png"
  },
  {
    id: "google-ux-placeholder",
    title: "UX Research & Accessibility Foundations",
    issuer: "Interaction Design / Coursera",
    date: "2025",
    placeholderNote: "Placeholder Credential · Replace with uploaded certificate anytime"
  }
];
