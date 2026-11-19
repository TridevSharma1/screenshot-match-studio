export type SiteRecord = Record<string, string>;

export const siteDefaults: Record<string, SiteRecord[]> = {
  hero: [
    {
      eyebrow: "ENGINEERED FOR WHAT'S NEXT",
      title: "Precision that moves industry forward.",
      description:
        "Special purpose machines, CNC systems and precision components—designed and built around the way you manufacture.",
      image: "/images/global-cnc-facility-hero.png",
      buttonLabel: "Explore our capabilities",
    },
  ],
  about: [
    {
      title: "Built around the work that matters.",
      description:
        "Global CNC Pvt. Ltd. is a Pune-based engineering and manufacturing partner. From a single precision component to a complete production line, our team turns complex manufacturing needs into reliable, shop-floor-ready solutions.",
      mission:
        "To make advanced manufacturing more precise, practical and dependable for every customer.",
      vision:
        "To be India's most trusted partner for purpose-built manufacturing technology.",
      values: "Precision · Partnership · Progress",
    },
  ],
  products: [
    { name: "CNC Turning Centre", category: "CNC Machines", description: "Production-ready turning solutions designed for consistent accuracy and uptime.", specification: "Configurable chuck and spindle options", applications: "Automotive, general engineering", image: "/images/global-cnc-facility-hero.png" },
    { name: "Vertical Machining Centre", category: "VMC Machines", description: "Rigid multi-axis machining for demanding components and repeatable results.", specification: "Custom workholding and tooling", applications: "Aerospace, automotive, precision parts", image: "/images/global-cnc-machining.png" },
    { name: "Special Purpose Machine", category: "Special Purpose Machines", description: "Purpose-built production equipment designed around your process.", specification: "Engineered to customer cycle-time goals", applications: "Assembly, drilling, tapping, machining", image: "/images/global-cnc-facility-hero.png" },
    { name: "Precision Machined Components", category: "CNC Parts", description: "Close-tolerance parts manufactured with dependable inspection and traceability.", specification: "Material and tolerance to drawing", applications: "Automotive, electrical, heavy engineering", image: "/images/global-cnc-machining.png" },
    { name: "Machine Components", category: "Machine Components", description: "Purpose-made precision components for new equipment and maintenance needs.", specification: "Custom dimensions and finishes", applications: "OEMs, maintenance and machine builders", image: "/images/global-cnc-machining.png" },
    { name: "Industrial Automation Cell", category: "Industrial Automation", description: "Integrated machine tending and handling concepts for more efficient production.", specification: "Configured to existing production lines", applications: "Automotive, packaging, manufacturing", image: "/images/global-cnc-facility-hero.png" },
  ],
  services: [
    { name: "Machine design", description: "Concept development, mechanical design and process planning for equipment built around your requirements." },
    { name: "Custom machine development", description: "From first concept to a commissioned special purpose machine, designed for your production floor." },
    { name: "Precision manufacturing", description: "CNC machining and component manufacturing backed by a focus on repeatability." },
    { name: "Installation & commissioning", description: "On-site installation, process validation and operator handover." },
    { name: "Maintenance & repair", description: "Planned servicing and practical support to keep critical equipment productive." },
    { name: "Machine upgradation", description: "Targeted upgrades that extend the usefulness and capability of existing equipment." },
    { name: "Technical consultation", description: "Experienced input on process improvement, tooling and manufacturing challenges." },
  ],
  machines: [
    { name: "CNC Turning Centre", description: "Versatile precision turning for production applications.", image: "/images/global-cnc-facility-hero.png" },
    { name: "Vertical Machining Centre", description: "Rigid multi-axis machining for complex components.", image: "/images/global-cnc-machining.png" },
    { name: "Custom SPM", description: "A special purpose machine engineered around the customer's process.", image: "/images/global-cnc-facility-hero.png" },
  ],
  industries: [
    { name: "Automotive", description: "Production tooling, machined parts and automation for demanding automotive programs." },
    { name: "Aerospace", description: "Precision manufacturing solutions for complex, close-tolerance applications." },
    { name: "Defence", description: "Engineered equipment and components for specialist manufacturing environments." },
    { name: "Medical", description: "Carefully manufactured precision components for medical equipment and systems." },
    { name: "Heavy engineering", description: "Robust machining and manufacturing support for large-scale industrial operations." },
    { name: "Packaging & food", description: "Production solutions designed for reliable, repeatable throughput." },
    { name: "Plastics & electrical", description: "Purpose-built tooling, machines and parts for specialist production." },
    { name: "Industrial automation", description: "Integrated manufacturing systems to support safer, more productive lines." },
  ],
  gallery: [
    { name: "CNC machine shop", category: "Facility", image: "/images/global-cnc-facility-hero.png" },
    { name: "Precision components", category: "Machining", image: "/images/global-cnc-machining.png" },
    { name: "Production floor", category: "Facility", image: "/images/global-cnc-facility-hero.png" },
    { name: "Machined parts inspection", category: "Quality", image: "/images/global-cnc-machining.png" },
    { name: "Vertical machining centre", category: "Machines", image: "/images/global-cnc-machining.png" },
    { name: "Manufacturing facility", category: "Facility", image: "/images/global-cnc-facility-hero.png" },
  ],
  testimonials: [
    { name: "Manufacturing Partner", company: "Automotive Components", quote: "The team understood our production challenge and delivered a solution that fits the way we work." },
    { name: "Plant Engineering Lead", company: "Heavy Engineering", quote: "A responsive engineering partner with the practical experience to take a project from idea to installation." },
    { name: "Operations Manager", company: "Precision Manufacturing", quote: "Quality, communication and dependable support made a real difference to our production team." },
  ],
  clients: [
    { name: "Automotive & Mobility", industry: "Automotive" },
    { name: "Precision Systems", industry: "Engineering" },
    { name: "Industrial Works", industry: "Manufacturing" },
    { name: "Advanced Components", industry: "Components" },
  ],
  blogs: [
    { title: "What to consider when specifying a special purpose machine", category: "Machine Design", date: "12 Jun 2025", description: "A practical guide to process requirements, cycle times, workholding and long-term maintainability." },
    { title: "Choosing the right machining approach for precision parts", category: "CNC Manufacturing", date: "28 May 2025", description: "How material, geometry and production volume inform a reliable machining strategy." },
    { title: "A practical maintenance checklist for CNC equipment", category: "Maintenance", date: "06 May 2025", description: "Simple maintenance habits that support equipment availability and consistent results." },
  ],
  careers: [
    { title: "CNC Machine Operator", department: "Production", location: "Bhosari, Pune", type: "Full-time", description: "Support precision machining operations and maintain high standards of quality and safety." },
    { title: "Mechanical Design Engineer", department: "Engineering", location: "Bhosari, Pune", type: "Full-time", description: "Develop practical machine concepts and detailed designs for custom manufacturing equipment." },
    { title: "Service Engineer", department: "Customer Support", location: "Pune, Maharashtra", type: "Full-time", description: "Install, commission and service machines at customer sites." },
  ],
  faqs: [
    { question: "What does Global CNC manufacture?", answer: "We design and manufacture special purpose machines, CNC and VMC solutions, precision components and industrial automation systems." },
    { question: "Can you develop a machine for a specific production process?", answer: "Yes. We work with customers to understand the process, define the requirements and develop custom equipment around the application." },
    { question: "Do you supply CNC machined components?", answer: "Yes. We manufacture custom precision components to customer drawings and agreed requirements." },
    { question: "Which industries do you serve?", answer: "Our capabilities support automotive, aerospace, defence, medical, heavy engineering, plastics, electrical, packaging and food manufacturing." },
    { question: "Do you offer machine installation and commissioning?", answer: "Yes. Installation, commissioning and operator handover can be included as part of a machine project." },
    { question: "Can you service or upgrade existing machines?", answer: "We provide maintenance, repair and upgrade support. Contact our team with your machine details and service needs." },
    { question: "Where is Global CNC located?", answer: "Our office is at Gera's Imperium Gateway, Bhosari, Pune, Maharashtra." },
    { question: "How do I request a quotation?", answer: "Use the enquiry form or call us with your drawings, application details and expected quantities." },
    { question: "Do you accept custom drawings?", answer: "Yes. Share your drawing or specifications with our team so we can review your requirements." },
    { question: "What information should I share for a new machine project?", answer: "An application description, target cycle time, part details, production volume and any existing process information are helpful." },
  ],
  statistics: [
    { value: "20+", label: "Years of experience" },
    { value: "500+", label: "Projects delivered" },
    { value: "150+", label: "Machines delivered" },
    { value: "100+", label: "Clients served" },
  ],
  "why-choose-us": [
    { title: "Precision manufacturing", description: "Consistent attention to fit, finish and functional performance." },
    { title: "Experienced engineers", description: "Practical engineering experience from concept through commissioning." },
    { title: "Technology that fits", description: "Modern CNC capability selected around your application and production goals." },
    { title: "Reliable support", description: "A responsive team for installation, service and long-term machine care." },
    { title: "Quality assurance", description: "Inspection-minded processes at every stage of manufacture." },
    { title: "On-time delivery", description: "Thoughtful planning and direct communication from project start to handover." },
  ],
  contact: [
    { company: "Global CNC Pvt. Ltd.", client: "Shailesh Bhor", address: "Gera's Imperium Gateway, C442, Old Mumbai Road, Near Bhosari Metro Station, Bhosari, Pune, Maharashtra 411034", phone: "+91 80876 96166", email: "deventerprises1016@gmail.com", hours: "Monday – Saturday, 9:00 AM – 6:00 PM" },
  ],
  settings: [
    { siteName: "Global CNC", footerNote: "Precision engineering for modern manufacturing.", instagram: "", linkedin: "", facebook: "" },
  ],
};

export const adminCredentials = { username: "admin", password: "admin123" };

export const adminModules = [
  ["hero", "Hero banner"], ["about", "About company"], ["products", "Products"],
  ["services", "Services"], ["machines", "Machines"], ["industries", "Industries"],
  ["gallery", "Gallery"], ["clients", "Clients"], ["testimonials", "Testimonials"],
  ["careers", "Careers"], ["blogs", "Blogs"], ["faqs", "FAQs"],
  ["statistics", "Company statistics"], ["why-choose-us", "Why choose us"],
  ["contact", "Contact information"], ["settings", "Website settings"],
] as const;