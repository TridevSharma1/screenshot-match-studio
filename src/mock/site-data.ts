import mockProducts from "./products.js";
import mockServices from "./services.js";
import mockMachines from "./machines.js";
import mockGallery from "./gallery.js";
import mockTestimonials from "./testimonials.js";
import mockClients from "./clients.js";
import mockTeam from "./team.js";
import mockBlogs from "./blogs.js";
import mockCareers from "./careers.js";
import mockIndustries from "./industries.js";
import mockFaqs from "./faqs.js";
import mockStatistics from "./statistics.js";
import mockWhyChooseUs from "./whyChooseUs.js";
import mockContact from "./contact.js";
import mockHero from "./hero.js";
import mockAbout from "./about.js";
import mockSettings from "./settings.js";

export type SiteRecord = Record<string, string>;

export const siteDefaults: Record<string, SiteRecord[]> = {
  hero: mockHero as unknown as SiteRecord[],
  about: mockAbout as unknown as SiteRecord[],
  products: mockProducts as unknown as SiteRecord[],
  services: mockServices as unknown as SiteRecord[],
  machines: mockMachines as unknown as SiteRecord[],
  gallery: mockGallery as unknown as SiteRecord[],
  testimonials: mockTestimonials as unknown as SiteRecord[],
  clients: mockClients as unknown as SiteRecord[],
  team: mockTeam as unknown as SiteRecord[],
  blogs: mockBlogs as unknown as SiteRecord[],
  careers: mockCareers as unknown as SiteRecord[],
  industries: mockIndustries as unknown as SiteRecord[],
  faqs: mockFaqs as unknown as SiteRecord[],
  statistics: mockStatistics as unknown as SiteRecord[],
  "why-choose-us": mockWhyChooseUs as unknown as SiteRecord[],
  contact: mockContact as unknown as SiteRecord[],
  settings: mockSettings as unknown as SiteRecord[],
};

export const adminCredentials = {
  username: "admin",
  password: "admin123",
};

export const adminModules = [
  ["dashboard", "Dashboard Overview"],
  ["hero", "Hero Banner"],
  ["about", "About Company"],
  ["products", "Products"],
  ["services", "Services"],
  ["machines", "Featured Machines"],
  ["industries", "Industries Served"],
  ["gallery", "Gallery"],
  ["clients", "Clients"],
  ["testimonials", "Testimonials"],
  ["careers", "Careers"],
  ["blogs", "Blogs"],
  ["faqs", "FAQs"],
  ["statistics", "Company Statistics"],
  ["why-choose-us", "Why Choose Us"],
  ["contact", "Contact Information"],
  ["settings", "Website Settings"],
] as const;
