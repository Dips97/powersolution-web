import type { Post, Category, SiteConfig } from "./types";

export const siteConfig: SiteConfig = {
  name: "Power Solution",
  tagline: "Digital Transform Enthusiast",
  title: "Senior Power Platform & AI Consultant",
  url: "https://powersolution.dev",
  author: "Dipak Shaw",
  bio: "Senior Power Platform & AI Consultant with 7+ years designing enterprise-grade solutions across Oil & Gas, Healthcare, and Theme Parks. Specialises in blending Microsoft Power Platform with Azure OpenAI, Copilot Studio, and Gen AI tooling to automate operations and surface intelligent insights. 280+ solutions delivered. Trusted by ADNOC Drilling, Johnson & Johnson, and Miral Experiences.",
  email: "support@powersolution.dev",
  location: "Abu Dhabi, UAE",
  social: {
      linkedin: "https://www.linkedin.com/in/dip26",
    twitter: "https://x.com/heydipak26",
  },
};

export const mockCategories: Category[] = [
  { id: 1, name: "Power Platform", slug: "power-platform", description: "Power Apps, Power Automate, Power BI and the full Microsoft Power Platform ecosystem.", postCount: 22, icon: "AppWindow", accentColor: "#007aff" },
  { id: 2, name: "SharePoint & M365", slug: "sharepoint", description: "Modern SharePoint development, SPFx web parts, Teams apps and Microsoft 365 solutions.", postCount: 8, icon: "Layers", accentColor: "#bf5af2" },
  { id: 3, name: "Microsoft Azure", slug: "azure", description: "Azure services, serverless functions, Logic Apps and cloud-native development.", postCount: 5, icon: "Cloud", accentColor: "#5ac8fa" },
  { id: 4, name: "Artificial Intelligence", slug: "artificial-intelligence", description: "OpenAI, Anthropic Claude, Google Gemini, Azure AI and generative AI development.", postCount: 6, icon: "BrainCircuit", accentColor: "#5856d6" },
  { id: 5, name: "How-To Guides", slug: "how-to", description: "Step-by-step tutorials and practical guides for everyday developer challenges.", postCount: 12, icon: "BookOpen", accentColor: "#34c759" },
  { id: 6, name: "Productivity", slug: "productivity", description: "Microsoft 365 governance, Teams integrations, and workplace efficiency strategies.", postCount: 5, icon: "Sparkles", accentColor: "#ff9f0a" },
];

const author = { name: "Dipak Shaw", avatar: "https://picsum.photos/seed/dipak/40/40" };

export const mockPosts: Post[] = [
  { id: 1, slug: "power-apps-database-error-handling", title: "How to Handle Database Errors in Power Apps", excerpt: "Learn how to catch and display database errors in Power Apps Canvas App using IfError, Errors, App.OnError, and Notify functions for a robust user experience.", category: "Power Platform", categorySlug: "power-platform", tags: ["Canvas Apps", "Dataverse", "Error Handling", "Power Fx"], author, date: "2026-03-12", readTime: 8, coverImage: "https://picsum.photos/seed/power-apps-database-error-handling/800/450", featured: true },
  { id: 2, slug: "claude-power-platform-autonomous", title: "How Anthropic Claude Turns Power Platform into an Autonomous Dev Machine", excerpt: "Claude does not just help you build Power Platform solutions — it builds them for you. Moves the cursor, clicks buttons, writes formulas, and assembles flows autonomously.", category: "Artificial Intelligence", categorySlug: "artificial-intelligence", tags: ["Anthropic", "Claude", "Automation", "Power Platform"], author, date: "2026-03-07", readTime: 10, coverImage: "https://picsum.photos/seed/claude-power-platform/800/450", featured: false },
  { id: 3, slug: "openai-gpt4o-azure-integration", title: "Integrating OpenAI GPT-4o with Azure API Management", excerpt: "A practical guide to exposing OpenAI GPT-4o through Azure API Management — rate limiting, auth, monitoring, and connecting to your Power Platform apps.", category: "Microsoft Azure", categorySlug: "azure", tags: ["OpenAI", "Azure", "API Management", "GPT-4o"], author, date: "2026-02-28", readTime: 12, coverImage: "https://picsum.photos/seed/openai-azure/800/450", featured: false },
  { id: 4, slug: "sharepoint-json-column-formatting", title: "Advanced SharePoint Column Formatting with JSON", excerpt: "Transform plain SharePoint lists into rich, interactive experiences using column formatting JSON. Learn conditional styling, icons, and progress bars.", category: "SharePoint & M365", categorySlug: "sharepoint", tags: ["SharePoint", "JSON Formatting", "Modern UI"], author, date: "2026-01-28", readTime: 12, coverImage: "https://picsum.photos/seed/sharepoint-json/800/450", featured: false },
  { id: 5, slug: "google-gemini-api-nodejs", title: "Getting Started with Google Gemini API in Node.js", excerpt: "Build your first Gemini-powered app with the Google AI SDK — from API setup and streaming responses to building a document summariser with Gemini 1.5 Pro.", category: "Artificial Intelligence", categorySlug: "artificial-intelligence", tags: ["Google Gemini", "Node.js", "Generative AI"], author, date: "2026-01-20", readTime: 9, coverImage: "https://picsum.photos/seed/gemini-nodejs/800/450", featured: false },
  { id: 6, slug: "power-automate-approval-workflow", title: "Building Multi-Stage Approval Workflows in Power Automate", excerpt: "Design and implement robust multi-stage approval processes using Power Automate cloud flows with parallel branching, reminders, and escalation logic.", category: "Power Platform", categorySlug: "power-platform", tags: ["Cloud Flows", "Approvals", "Microsoft 365"], author, date: "2026-01-15", readTime: 9, coverImage: "https://picsum.photos/seed/power-automate-approval/800/450", featured: false },
  { id: 7, slug: "azure-functions-power-automate", title: "Calling Azure Functions from Power Automate with Custom Connectors", excerpt: "Extend Power Automate beyond its built-in connectors by building a custom connector that securely calls Azure Function APIs with AAD authentication.", category: "Microsoft Azure", categorySlug: "azure", tags: ["Azure Functions", "Custom Connectors", "AAD"], author, date: "2025-12-30", readTime: 11, coverImage: "https://picsum.photos/seed/azure-functions/800/450", featured: false },
  { id: 8, slug: "copilot-studio-custom-agent", title: "Building a Custom AI Agent with Microsoft Copilot Studio", excerpt: "Step-by-step guide to creating a fully functional AI agent in Copilot Studio — from knowledge sources and topics to deploying across Teams and SharePoint.", category: "Artificial Intelligence", categorySlug: "artificial-intelligence", tags: ["Copilot Studio", "AI", "Teams"], author, date: "2025-12-20", readTime: 15, coverImage: "https://picsum.photos/seed/copilot-studio/800/450", featured: false },
  { id: 9, slug: "spfx-webpart-react-hooks", title: "Building SPFx Web Parts with React Hooks and PnP Controls", excerpt: "Modernize your SPFx development by replacing class components with React hooks, and leverage PnPjs and PnP Reusable Controls for faster builds.", category: "SharePoint & M365", categorySlug: "sharepoint", tags: ["SPFx", "React Hooks", "PnP Controls", "TypeScript"], author, date: "2025-11-10", readTime: 13, coverImage: "https://picsum.photos/seed/spfx-webpart/800/450", featured: false },
  { id: 10, slug: "power-apps-delegation-guide", title: "Mastering Delegation in Power Apps: The Definitive Guide", excerpt: "Delegation warnings slowing you down? Understand why delegation matters, which functions are delegable, and patterns to work around the 2000-record limit.", category: "How-To Guides", categorySlug: "how-to", tags: ["Delegation", "Dataverse", "Performance", "Power Fx"], author, date: "2025-10-25", readTime: 11, coverImage: "https://picsum.photos/seed/delegation-powerapps/800/450", featured: false },
];

export const featuredPost = mockPosts.find((p) => p.featured)!;
export const latestPosts = mockPosts.filter((p) => !p.featured);
