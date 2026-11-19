import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  Calendar,
  Car,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Cog,
  Cpu,
  Crosshair,
  Factory,
  FileText,
  Gauge,
  Hammer,
  HardHat,
  Layers,
  Mail,
  MapPin,
  Menu,
  Package,
  Phone,
  Plane,
  Search,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  User,
  Utensils,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteDefaults, type SiteRecord } from "@/mock/site-data";
import { readSiteContent, subscribeToSiteContent } from "@/lib/site-storage";

type PageKey =
  "home" | "about" | "products" | "services" | "gallery" | "blogs" | "careers" | "contact";

const navItems = [
  ["Home", "/"],
  ["About", "/about"],
  ["Products", "/products"],
  ["Services", "/services"],
  ["Gallery", "/gallery"],
  ["Careers", "/careers"],
  ["Blogs", "/blogs"],
  ["Contact", "/contact"],
] as const;

export function useSiteData() {
  const [content, setContent] = useState(readSiteContent);
  useEffect(() => {
    const update = () => setContent(readSiteContent());
    update();
    return subscribeToSiteContent(update);
  }, []);
  return content;
}

// -------------------------------------------------------------
// Interactive Modals
// -------------------------------------------------------------

function QuoteModal({
  isOpen,
  onClose,
  defaultProduct = "",
}: {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    product: defaultProduct,
    message: "",
  });

  useEffect(() => {
    if (defaultProduct) {
      setFormData((prev) => ({ ...prev, product: defaultProduct }));
    }
  }, [defaultProduct]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto border border-border bg-background p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
          aria-label="Close quote modal"
        >
          <X size={20} />
        </button>

        <div className="mb-6">
          <span className="text-[10px] font-bold tracking-[0.2em] text-accent">
            GLOBAL CNC · DIRECT ENQUIRY
          </span>
          <h2 className="mt-1 font-display text-2xl font-bold text-foreground">
            Request an Engineering Quotation
          </h2>
          <p className="mt-2 text-xs text-muted-foreground">
            Share your machine specifications or component drawings. Our engineering sales team will
            respond within 24 hours.
          </p>
        </div>

        {submitted ? (
          <div className="border border-green-200 bg-green-50 p-6 text-center text-green-900">
            <Check className="mx-auto mb-2 text-green-600" size={32} />
            <h3 className="font-display text-lg font-bold">Quote Request Received!</h3>
            <p className="mt-2 text-xs text-green-800">
              Thank you, <strong>{formData.name || "Customer"}</strong>. Your enquiry for{" "}
              <strong>{formData.product || "Precision Machining"}</strong> has been registered. Our
              technical director <strong>Shailesh Bhor</strong> or sales lead will contact you
              shortly.
            </p>
            <p className="mt-3 text-[11px] text-green-700">
              For urgent requests, call directly: <strong>+91 80876 96166</strong>
            </p>
            <Button
              className="mt-5 rounded-none bg-primary text-primary-foreground hover:bg-accent"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
            >
              Close
            </Button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-xs font-semibold">
                Your Full Name *
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Deshmukh"
                  className="h-10 border border-input bg-background px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent"
                />
              </label>
              <label className="grid gap-1.5 text-xs font-semibold">
                Work Email *
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                  className="h-10 border border-input bg-background px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-xs font-semibold">
                Contact Phone *
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="h-10 border border-input bg-background px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent"
                />
              </label>
              <label className="grid gap-1.5 text-xs font-semibold">
                Company / Organization
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Company name"
                  className="h-10 border border-input bg-background px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent"
                />
              </label>
            </div>

            <label className="grid gap-1.5 text-xs font-semibold">
              Machine / Product Category of Interest
              <input
                type="text"
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                placeholder="e.g. Vertical Machining Centre / SPM / Precision Parts"
                className="h-10 border border-input bg-background px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent"
              />
            </label>

            <label className="grid gap-1.5 text-xs font-semibold">
              Project Details & Technical Requirements *
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Mention component dimensions, material, annual production volumes, cycle time requirements or drawing attachments..."
                className="border border-input bg-background p-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent"
              />
            </label>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-muted-foreground">
                Bhosari, Pune · ISO Standards Assured
              </span>
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={onClose} className="rounded-none">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="btn-industrial-gradient rounded-none px-6 font-semibold"
                >
                  Submit Quote Request
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onEnquire,
}: {
  product: SiteRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onEnquire: (productName: string) => void;
}) {
  if (!isOpen || !product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-border bg-background p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
          aria-label="Close product details"
        >
          <X size={20} />
        </button>

        <div className="relative aspect-[16/9] w-full overflow-hidden bg-primary/10">
          <img
            src={product.image || "/images/global-cnc-machining.png"}
            alt={product.name}
            className="size-full object-cover"
          />
          <span className="absolute left-4 top-4 bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
            {product.category || "Precision Product"}
          </span>
        </div>

        <div className="mt-6">
          <h2 className="font-display text-2xl font-bold text-foreground">{product.name}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {product.specifications && (
            <div className="mt-6 border-t border-border pt-4">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-accent">
                Technical Specifications
              </h3>
              <div className="mt-2 rounded bg-steel-soft p-3 text-xs leading-6 text-foreground">
                {product.specifications}
              </div>
            </div>
          )}

          {product.applications && (
            <div className="mt-4 border-t border-border pt-4">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-industrial-amber">
                Industry Applications & Target Uses
              </h3>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">{product.applications}</p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
            <div className="text-xs text-muted-foreground">
              Manufacturer: <strong>Global CNC Pvt. Ltd. (Pune, India)</strong>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose} className="rounded-none">
                Close
              </Button>
              <Button
                onClick={() => {
                  onClose();
                  onEnquire(product.name);
                }}
                className="btn-industrial-gradient rounded-none px-5"
              >
                Request Quotation <ArrowRight size={15} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogDetailModal({
  blog,
  isOpen,
  onClose,
}: {
  blog: SiteRecord | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen || !blog) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-border bg-background p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
          aria-label="Close article modal"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 text-xs font-semibold text-accent">
          <span className="bg-primary/10 px-2.5 py-1 text-primary">
            {blog.category || "Manufacturing Insights"}
          </span>
          <span>{blog.date}</span>
          {blog.readTime && <span>· {blog.readTime}</span>}
        </div>

        <h2 className="mt-4 font-display text-2xl font-bold text-foreground">{blog.title}</h2>
        {blog.author && (
          <p className="mt-1 text-xs text-muted-foreground">
            By <strong>{blog.author}</strong> · Global CNC Engineering Insights
          </p>
        )}

        <div className="mt-5 border-t border-border pt-4">
          <p className="text-sm font-medium leading-relaxed text-foreground">{blog.description}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {blog.content ||
              "In industrial precision engineering, adherence to micro-tolerances, optimized cutting speeds, and comprehensive preventive maintenance schedules are pivotal. Global CNC continues to drive engineering innovation across India's machine shop ecosystem."}
          </p>
        </div>

        <div className="mt-6 flex justify-end border-t border-border pt-4">
          <Button onClick={onClose} className="rounded-none bg-primary text-primary-foreground">
            Close Article
          </Button>
        </div>
      </div>
    </div>
  );
}

function CareerApplyModal({
  job,
  isOpen,
  onClose,
}: {
  job: SiteRecord | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [applicant, setApplicant] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    message: "",
  });

  if (!isOpen || !job) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto border border-border bg-background p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
          aria-label="Close application modal"
        >
          <X size={20} />
        </button>

        <span className="text-[10px] font-bold tracking-[0.2em] text-accent">
          CAREERS AT GLOBAL CNC
        </span>
        <h2 className="mt-1 font-display text-xl font-bold text-foreground">Apply: {job.title}</h2>
        <p className="text-xs text-muted-foreground">
          {job.department} · {job.location} · {job.type}
        </p>

        {submitted ? (
          <div className="mt-6 border border-green-200 bg-green-50 p-6 text-center text-green-900">
            <Check className="mx-auto mb-2 text-green-600" size={28} />
            <h3 className="font-display font-bold">Application Received!</h3>
            <p className="mt-2 text-xs text-green-800">
              Thank you, <strong>{applicant.name}</strong>. Your profile for the{" "}
              <strong>{job.title}</strong> opening has been submitted to HR at Global CNC Pvt. Ltd.
            </p>
            <Button
              className="mt-4 rounded-none bg-primary text-primary-foreground"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
            >
              Done
            </Button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="mt-5 space-y-4"
          >
            <label className="grid gap-1.5 text-xs font-semibold">
              Full Name *
              <input
                required
                type="text"
                value={applicant.name}
                onChange={(e) => setApplicant({ ...applicant, name: e.target.value })}
                className="h-10 border border-input bg-background px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-xs font-semibold">
                Email *
                <input
                  required
                  type="email"
                  value={applicant.email}
                  onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                  className="h-10 border border-input bg-background px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent"
                />
              </label>
              <label className="grid gap-1.5 text-xs font-semibold">
                Phone *
                <input
                  required
                  type="tel"
                  value={applicant.phone}
                  onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                  className="h-10 border border-input bg-background px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent"
                />
              </label>
            </div>
            <label className="grid gap-1.5 text-xs font-semibold">
              Total Relevant Experience
              <input
                type="text"
                placeholder="e.g. 4 Years in CNC Machine Tool Programming"
                value={applicant.experience}
                onChange={(e) => setApplicant({ ...applicant, experience: e.target.value })}
                className="h-10 border border-input bg-background px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent"
              />
            </label>
            <label className="grid gap-1.5 text-xs font-semibold">
              Brief Cover Note
              <textarea
                rows={3}
                placeholder="Key technical skills, current CTC / notice period..."
                value={applicant.message}
                onChange={(e) => setApplicant({ ...applicant, message: e.target.value })}
                className="border border-input bg-background p-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent"
              />
            </label>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={onClose} className="rounded-none">
                Cancel
              </Button>
              <Button type="submit" className="btn-industrial-gradient rounded-none px-6">
                Submit Application
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Header & Navigation
// -------------------------------------------------------------

export function Header({
  content,
  onOpenQuote,
}: {
  content: ReturnType<typeof useSiteData>;
  onOpenQuote?: () => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const contact = content.contact[0] ?? siteDefaults.contact[0]!;
  const settings = content.settings[0] ?? siteDefaults.settings[0]!;
  const light = isScrolled || isOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        light
          ? "border-b border-border bg-background/95 text-foreground shadow-md backdrop-blur-md"
          : "border-b border-white/10 bg-primary/80 text-primary-foreground backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="Global CNC Pvt. Ltd.">
          <span
            className={`flex size-11 items-center justify-center transition-all ${
              light
                ? "bg-accent text-accent-foreground shadow-sm"
                : "bg-industrial-amber text-primary"
            }`}
          >
            <Cog size={26} className="animate-spin-slow" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold tracking-tight">
              {settings.siteName || "Global CNC Pvt. Ltd."}
            </span>
            <span
              className={`block text-[9px] font-semibold uppercase tracking-[0.2em] ${
                light ? "text-muted-foreground" : "text-primary-foreground/75"
              }`}
            >
              Precision Engineering · Pune
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main Navigation">
          {navItems.map(([label, to]) => (
            <Link
              key={to}
              to={to}
              activeProps={{ className: "text-industrial-amber font-bold" }}
              className={`text-[13px] font-semibold tracking-wide transition-colors hover:text-industrial-amber ${
                light ? "text-foreground/90" : "text-primary-foreground/90"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA & Phone */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${contact.phone?.replaceAll(" ", "")}`}
            className={`flex items-center gap-2 text-xs font-semibold transition-colors hover:text-industrial-amber ${
              light ? "text-foreground" : "text-primary-foreground"
            }`}
          >
            <Phone size={14} className="text-industrial-amber" />
            <span>{contact.phone || "+91 80876 96166"}</span>
          </a>
          <Button
            type="button"
            onClick={onOpenQuote}
            size="sm"
            className="btn-industrial-gradient rounded-none px-5 py-2 text-xs font-bold uppercase tracking-wider"
          >
            Request Quote <ArrowUpRight size={14} className="ml-1" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            type="button"
            onClick={onOpenQuote}
            size="sm"
            className="btn-industrial-gradient rounded-none px-3 text-xs"
          >
            Quote
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen(!isOpen)}
            className={light ? "text-foreground" : "text-primary-foreground"}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="border-t border-border bg-background px-5 py-6 text-foreground shadow-xl lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2" aria-label="Mobile Navigation">
            {navItems.map(([label, to]) => (
              <Link
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                activeProps={{ className: "text-accent font-bold pl-2 border-l-2 border-accent" }}
                className="py-2.5 text-sm font-semibold text-foreground/80 transition-all hover:pl-2 hover:text-accent"
              >
                {label}
              </Link>
            ))}
            <div className="mt-4 border-t border-border pt-4">
              <a
                href={`tel:${contact.phone?.replaceAll(" ", "")}`}
                className="flex items-center gap-2 text-xs font-semibold text-foreground"
              >
                <Phone size={14} className="text-industrial-amber" />
                {contact.phone}
              </a>
              <Button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenQuote?.();
                }}
                className="btn-industrial-gradient mt-3 w-full rounded-none"
              >
                Request Quotation <ArrowRight size={15} />
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

// -------------------------------------------------------------
// Footer
// -------------------------------------------------------------

export function Footer({ content }: { content: ReturnType<typeof useSiteData> }) {
  const contact = content.contact[0] ?? siteDefaults.contact[0]!;
  const settings = content.settings[0] ?? siteDefaults.settings[0]!;

  return (
    <footer className="border-t border-primary/20 bg-primary text-primary-foreground">
      {/* Upper Footer Grid */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Col 1: Brand & Mission */}
        <div>
          <Link to="/" className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center bg-industrial-amber text-primary">
              <Cog size={22} />
            </span>
            <span className="font-display text-lg font-bold">
              {settings.siteName || "Global CNC Pvt. Ltd."}
            </span>
          </Link>
          <p className="mt-4 text-xs leading-6 text-primary-foreground/75">
            {settings.footerNote ||
              "Specializing in the manufacturing of Special Purpose Machines (SPMs), CNC Machines, VMC Machines, CNC Components, and Precision Machine Parts in Pune, Maharashtra."}
          </p>
          <div className="mt-5 space-y-2 text-xs text-primary-foreground/70">
            <p className="flex items-center gap-2">
              <Award size={15} className="text-industrial-amber" />
              <span>ISO 9001:2015 Compliant Quality Assurance</span>
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck size={15} className="text-industrial-amber" />
              <span>Sub-5 Micron Micro-Precision Standard</span>
            </p>
          </div>
        </div>

        {/* Col 2: Products & Machines */}
        <div>
          <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-industrial-amber">
            Products & Machines
          </h3>
          <ul className="mt-4 space-y-2.5 text-xs text-primary-foreground/75">
            {content.products.slice(0, 6).map((prod) => (
              <li key={prod.name}>
                <Link to="/products" className="transition-colors hover:text-industrial-amber">
                  {prod.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Engineering Services */}
        <div>
          <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-industrial-amber">
            Our Services
          </h3>
          <ul className="mt-4 space-y-2.5 text-xs text-primary-foreground/75">
            {content.services.slice(0, 6).map((srv) => (
              <li key={srv.name}>
                <Link to="/services" className="transition-colors hover:text-industrial-amber">
                  {srv.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact & Factory Location */}
        <div>
          <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-industrial-amber">
            Works & Headquarters
          </h3>
          <address className="mt-4 space-y-3 text-xs not-italic leading-5 text-primary-foreground/75">
            <p className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-industrial-amber" />
              <span>{contact.address}</span>
            </p>
            <p className="flex items-center gap-2.5">
              <Phone size={15} className="shrink-0 text-industrial-amber" />
              <a
                href={`tel:${contact.phone?.replaceAll(" ", "")}`}
                className="hover:text-industrial-amber"
              >
                {contact.phone}
              </a>
            </p>
            <p className="flex items-center gap-2.5">
              <Mail size={15} className="shrink-0 text-industrial-amber" />
              <a href={`mailto:${contact.email}`} className="break-all hover:text-industrial-amber">
                {contact.email}
              </a>
            </p>
            <p className="flex items-center gap-2.5">
              <Clock size={15} className="shrink-0 text-industrial-amber" />
              <span>{contact.hours || "Mon - Sat: 9:00 AM - 6:00 PM"}</span>
            </p>
          </address>
        </div>
      </div>

      {/* Bottom Bar with Admin Login */}
      <div className="border-t border-primary-foreground/10 bg-slate-950 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-xs text-primary-foreground/50 sm:flex-row sm:px-6 lg:px-8">
          <div>
            © {new Date().getFullYear()} {settings.siteName || "Global CNC Pvt. Ltd."}. All rights
            reserved. Pune, Maharashtra, India.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/contact" className="hover:text-industrial-amber">
              Enquiry
            </Link>
            <Link to="/about" className="hover:text-industrial-amber">
              About
            </Link>
            {/* Mandatory Admin Login link */}
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 font-semibold text-industrial-amber hover:underline"
            >
              <User size={13} /> Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// -------------------------------------------------------------
// Layout Frame
// -------------------------------------------------------------

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const content = useSiteData();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState("");

  const handleOpenQuote = (productName?: string) => {
    setQuoteProduct(productName || "");
    setQuoteOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header content={content} onOpenQuote={() => handleOpenQuote()} />
      {children}
      <Footer content={content} />
      <QuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        defaultProduct={quoteProduct}
      />
    </div>
  );
}

// -------------------------------------------------------------
// Reusable UI Pieces
// -------------------------------------------------------------

export function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] ${
        light ? "text-industrial-amber" : "text-accent"
      }`}
    >
      <span className="h-px w-6 bg-current" />
      {children}
    </p>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  light = false,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <Eyebrow light={light}>{eyebrow}</Eyebrow>}
      <h2
        className={`mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-[40px] lg:leading-tight ${
          light ? "text-primary-foreground" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-sm leading-relaxed md:text-base ${
            light ? "text-primary-foreground/75" : "text-muted-foreground"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// HOME PAGE COMPONENT
// -------------------------------------------------------------

export function HomePage() {
  const data = useSiteData();
  const hero = data.hero[0] ?? siteDefaults.hero[0]!;
  const about = data.about[0] ?? siteDefaults.about[0]!;
  const contact = data.contact[0] ?? siteDefaults.contact[0]!;

  const [activeQuoteModal, setActiveQuoteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<SiteRecord | null>(null);
  const [quoteItem, setQuoteItem] = useState("");

  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleOpenQuote = (name?: string) => {
    setQuoteItem(name || "");
    setActiveQuoteModal(true);
  };

  return (
    <SiteFrame>
      <main>
        {/* HERO BANNER SECTION */}
        <section className="relative flex min-h-[750px] items-center overflow-hidden bg-primary pt-24 text-primary-foreground lg:min-h-[850px]">
          {/* Background Industrial Factory Images */}
          <img
            src={hero.image || "/images/global-cnc-facility-hero.png"}
            alt="Global CNC industrial manufacturing plant and precision machining facility"
            className="absolute inset-0 size-full object-cover object-center"
            fetchPriority="high"
          />
          {/* Deep Navy/Blue Engineering Overlays */}
          <div className="absolute inset-0 bg-[#0F172A]/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-[#1E3A8A]/50" />
          <div className="industrial-grid absolute inset-0 opacity-25" />

          {/* Animated Floating Shapes (pure CSS, no libraries) */}
          <div className="pointer-events-none absolute left-10 top-28 size-32 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm animate-float-slow" />
          <div className="pointer-events-none absolute right-16 top-40 size-48 rounded-full border border-industrial-amber/20 bg-industrial-amber/5 backdrop-blur-sm animate-float-reverse" />
          <div className="pointer-events-none absolute bottom-24 right-1/4 size-24 border border-white/10 rotate-45 animate-float-slow" />

          {/* Hero Content */}
          <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_.8fr] lg:items-center lg:px-8">
            <div className="max-w-3xl">
              <Eyebrow light>
                {hero.eyebrow || "PRECISION ENGINEERING FOR MODERN MANUFACTURING"}
              </Eyebrow>
              <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[62px] lg:leading-[1.12]">
                {hero.title || "Precision Engineering for Modern Manufacturing"}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
                {hero.description ||
                  "Manufacturing High-Quality CNC Machines, VMC Machines, Special Purpose Machines, and Precision Components for Industries Across India."}
              </p>

              {/* Action Buttons */}
              <div className="mt-9 flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="btn-industrial-gradient h-13 rounded-none px-7 font-bold text-sm tracking-wide"
                >
                  <Link to="/products">
                    {hero.buttonLabel || "Explore Products"}{" "}
                    <ArrowRight size={17} className="ml-2" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-13 rounded-none border-primary-foreground/30 bg-transparent px-7 font-bold text-sm text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  <Link to="/contact">
                    {hero.secondaryButtonLabel || "Contact Us"}{" "}
                    <ArrowUpRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="mt-12 flex flex-wrap items-center gap-6 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/75">
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-industrial-amber" /> Sub-5 Micron Precision
                </span>
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-industrial-amber" /> Custom SPM Design
                </span>
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-industrial-amber" /> Pan-India On-Site Support
                </span>
              </div>
            </div>

            {/* Hero Side Technical Card */}
            <div className="hidden lg:block">
              <div className="border border-white/15 bg-white/5 p-8 backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-industrial-amber">
                    FACILITY HEADQUARTERS
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-green-400">
                    <span className="size-2 rounded-full bg-green-400 animate-pulse" /> Production
                    Active
                  </span>
                </div>
                <div className="mt-5 space-y-4 text-xs text-primary-foreground/80">
                  <div>
                    <span className="block font-semibold text-white">Location</span>
                    <span>Gera's Imperium Gateway, Bhosari, Pune</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-white">Core Competence</span>
                    <span>SPMs, 4 & 5-Axis VMCs, Slant Bed Turning & Batch Machining</span>
                  </div>
                  <div>
                    <span className="block font-semibold text-white">Director & Founder</span>
                    <span>Shailesh Bhor · 20+ Years Industrial Experience</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => handleOpenQuote("Custom SPM Inquiry")}
                    className="w-full bg-industrial-amber py-2.5 text-center text-xs font-bold uppercase tracking-wider text-primary transition-all hover:bg-white"
                  >
                    Discuss Machine Blueprint
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="absolute inset-x-0 bottom-0 z-10 border-t border-primary-foreground/15 bg-primary/90">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 text-[10px] font-semibold tracking-wider text-primary-foreground/70 sm:px-6 lg:px-8">
              <span>BHOSARI · PUNE · MAHARASHTRA</span>
              <a
                href="#stats"
                className="flex items-center gap-1.5 transition-colors hover:text-industrial-amber"
              >
                SCROLL TO DISCOVER <ArrowDown size={13} />
              </a>
              <span>MAKE IN INDIA · ISO 9001:2015</span>
            </div>
          </div>
        </section>

        {/* COMPANY STATISTICS SECTION */}
        <section id="stats" className="border-b border-border bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
              {data.statistics.map((stat, i) => (
                <div key={stat.label || i} className={`pt-4 md:pt-0 ${i > 0 ? "md:pl-8" : ""}`}>
                  <div className="font-display text-4xl font-extrabold tracking-tight text-accent lg:text-5xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm font-bold text-foreground">{stat.label}</div>
                  {stat.description && (
                    <div className="mt-1 text-xs text-muted-foreground line-clamp-2">
                      {stat.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT COMPANY OVERVIEW */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
            <div className="relative">
              <div className="overflow-hidden border border-border bg-steel shadow-xl">
                <img
                  src="/images/global-cnc-machining.png"
                  alt="Precision Machining at Global CNC Pune"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 max-w-xs border border-industrial-amber bg-primary p-6 text-primary-foreground shadow-2xl sm:right-6">
                <div className="font-display text-3xl font-extrabold text-industrial-amber">
                  20+ Years
                </div>
                <div className="mt-1 text-xs font-medium text-primary-foreground/80">
                  Delivering high-rigidity CNC machine tools and precision components across India.
                </div>
              </div>
            </div>

            <div>
              <SectionTitle
                eyebrow="ABOUT GLOBAL CNC PVT. LTD."
                title={about.title || "Engineering Excellence & Industrial Innovation Since 2004"}
                subtitle={about.description}
              />

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="border-l-2 border-accent pl-4">
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-accent">
                    Our Mission
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {about.mission}
                  </p>
                </div>
                <div className="border-l-2 border-industrial-amber pl-4">
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-industrial-amber">
                    Our Vision
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {about.vision}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button asChild className="btn-industrial-gradient rounded-none px-6">
                  <Link to="/about">
                    Read Our Full Story <ArrowRight size={15} className="ml-2" />
                  </Link>
                </Button>
                <button
                  type="button"
                  onClick={() => handleOpenQuote()}
                  className="text-xs font-bold text-accent hover:underline"
                >
                  Request Technical Consultation →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US SECTION */}
        <section className="bg-primary py-20 text-primary-foreground lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionTitle
                eyebrow="THE GLOBAL CNC ADVANTAGE"
                title="Why Leading Manufacturers Partner With Us"
                subtitle="Delivering engineering precision, competitive Indian pricing, and dedicated post-commissioning support."
                light
              />
              <Button
                asChild
                variant="outline"
                className="rounded-none border-white/20 bg-transparent text-white hover:bg-white hover:text-primary"
              >
                <Link to="/about">
                  Explore Capabilities <ArrowRight size={15} className="ml-2" />
                </Link>
              </Button>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data["why-choose-us"].map((item, idx) => {
                const icons = [Crosshair, HardHat, Gauge, Award, ShieldCheck, Check, Clock];
                const IconComponent = icons[idx % icons.length]!;
                return (
                  <div
                    key={item.title || idx}
                    className="group border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-industrial-amber/60 hover:bg-white/10"
                  >
                    <div className="flex size-12 items-center justify-center bg-industrial-amber/10 text-industrial-amber transition-colors group-hover:bg-industrial-amber group-hover:text-primary">
                      <IconComponent size={24} />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-primary-foreground/70">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* FEATURED MACHINES SECTION */}
        <section className="bg-steel-soft py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionTitle
                eyebrow="FLAGSHIP INDUSTRIAL EQUIPMENT"
                title="Featured Machines & Systems"
                subtitle="High-rigidity CNC Turning Centers, Multi-Axis VMCs, and Specialized Indexing Machines."
              />
              <Button
                asChild
                variant="outline"
                className="rounded-none border-primary/20 bg-background"
              >
                <Link to="/products">
                  View All Products <ArrowRight size={15} className="ml-2" />
                </Link>
              </Button>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {data.machines.slice(0, 4).map((machine, i) => (
                <div
                  key={machine.name || i}
                  className="group flex flex-col justify-between border border-border bg-background transition-all duration-300 hover:border-accent hover:shadow-lg"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-primary/10">
                      <img
                        src={machine.image || "/images/global-cnc-facility-hero.png"}
                        alt={machine.name}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className="absolute bottom-2 right-2 bg-primary px-2 py-1 text-[10px] font-bold text-white">
                        0{i + 1}
                      </span>
                    </div>
                    <div className="p-5">
                      {machine.model && (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                          {machine.model}
                        </span>
                      )}
                      <h3 className="mt-1 font-display text-base font-bold text-foreground">
                        {machine.name}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                        {machine.description}
                      </p>
                      {machine.specs && (
                        <div className="mt-3 rounded bg-steel-soft p-2 text-[11px] font-medium text-foreground">
                          {machine.specs}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="border-t border-border p-5 pt-3">
                    <button
                      type="button"
                      onClick={() => handleOpenQuote(machine.name)}
                      className="inline-flex items-center text-xs font-bold text-accent hover:text-industrial-amber transition-colors"
                    >
                      Request Quote & Specs <ArrowRight size={14} className="ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OUR PRODUCTS (CATEGORIES PREVIEW) */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionTitle
                eyebrow="CATALOGUE & CUSTOM BUILDS"
                title="Our Core Product Lines"
                subtitle="From high-speed VMC centres to precision turned components and automated robotic cells."
              />
              <Button asChild className="btn-industrial-gradient rounded-none px-6">
                <Link to="/products">
                  Explore Full Catalogue <ArrowRight size={15} className="ml-2" />
                </Link>
              </Button>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.products.slice(0, 6).map((product, i) => (
                <div
                  key={product.name || i}
                  className="group flex flex-col justify-between border border-border bg-white transition-all duration-300 hover:border-accent hover:shadow-xl"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={product.image || "/images/global-cnc-machining.png"}
                        alt={product.name}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className="absolute left-3 top-3 bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        {product.category || "CNC Machinery"}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="font-display text-lg font-bold text-foreground">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                        {product.description}
                      </p>
                      {product.applications && (
                        <div className="mt-3 text-[11px] text-muted-foreground">
                          <strong className="text-foreground">Applications:</strong>{" "}
                          <span className="line-clamp-1">{product.applications}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-border p-6 pt-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className="text-xs font-bold text-accent hover:underline"
                    >
                      View Full Details
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenQuote(product.name)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-industrial-amber hover:text-foreground"
                    >
                      Enquire <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MANUFACTURING PROCESS SECTION */}
        <section className="border-y border-border bg-steel-soft py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="SYSTEMATIC INDUSTRIAL WORKFLOW"
              title="Our Precision Manufacturing Process"
              subtitle="Every custom machine and component is engineered through a disciplined 5-stage quality process."
              center
            />

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {[
                {
                  step: "01",
                  title: "Engineering Review",
                  desc: "Comprehensive 2D drawing review, GD&T analysis, material grade selection, and cycle time targets.",
                },
                {
                  step: "02",
                  title: "3D CAD/CAM Design",
                  desc: "SolidWorks & Siemens NX 3D kinematics, FEA stress modeling, toolpath collision simulations.",
                },
                {
                  step: "03",
                  title: "Precision Machining",
                  desc: "Milling, turning, and grinding on multi-axis CNCs with temperature-regulated flood cooling.",
                },
                {
                  step: "04",
                  title: "CMM Metrology & Run-Off",
                  desc: "Zeiss 3D CMM inspection, Renishaw laser pitch calibration, and 100% wet test run-off.",
                },
                {
                  step: "05",
                  title: "Turnkey Commissioning",
                  desc: "On-site installation, precision leveling, operator handover, and lifetime AMC support.",
                },
              ].map((stage) => (
                <div
                  key={stage.step}
                  className="relative border border-border bg-background p-6 transition-all hover:border-accent hover:shadow-md"
                >
                  <span className="font-display text-3xl font-extrabold text-accent">
                    {stage.step}
                  </span>
                  <h3 className="mt-3 font-display text-base font-bold text-foreground">
                    {stage.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{stage.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QUALITY ASSURANCE & METROLOGY */}
        <section className="bg-primary py-20 text-primary-foreground lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
            <div>
              <Eyebrow light>UNCOMPROMISING PRECISION</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                Quality Assurance Under 5 Microns
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-primary-foreground/80">
                At Global CNC Pvt. Ltd., accuracy is measured in single-digit microns. Our
                climate-regulated metrology lab features top-tier measuring instruments to guarantee
                zero-defect dispatches to tier-1 aerospace, defense, and automotive partners.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Zeiss 3D Coordinate Measuring Machine (CMM) dimensional verification",
                  "Renishaw Laser Interferometer linear pitch & angular pitch error compensation",
                  "Optical surface roughness testers (Ra down to 0.2 microns)",
                  "Mill test material certificates (MTC) and complete chemical traceability",
                  "100% pre-dispatch dry & wet run-off validation with customer witness sign-off",
                ].map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 text-xs leading-relaxed text-primary-foreground/90"
                  >
                    <Check size={16} className="mt-0.5 shrink-0 text-industrial-amber" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button
                  onClick={() => handleOpenQuote("Quality & CMM Audit")}
                  className="btn-industrial-gradient rounded-none px-6"
                >
                  Request Sample Inspection Report
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden border border-white/15 bg-white/5 p-4 backdrop-blur">
                <img
                  src="/images/global-cnc-machining.png"
                  alt="Quality Assurance Metrology Lab Global CNC Pune"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-4 border border-industrial-amber bg-industrial-amber px-6 py-4 text-primary font-bold shadow-xl">
                <span className="block text-2xl font-extrabold">&lt; 0.005 mm</span>
                <span className="block text-xs uppercase tracking-wider">
                  Repeatability Guaranteed
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* INDUSTRIES WE SERVE */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionTitle
                eyebrow="SECTORS POWERED BY GLOBAL CNC"
                title="Industries We Proudly Serve"
                subtitle="Engineered solutions built for the demanding tolerances of high-stakes industrial environments."
              />
              <Link to="/contact" className="text-xs font-bold text-accent hover:underline">
                Explore Industry Custom Solutions →
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {data.industries.slice(0, 10).map((ind, i) => {
                const iconMap: Record<string, React.ElementType> = {
                  Automobile: Car,
                  Defense: Shield,
                  Aerospace: Plane,
                  Medical: Activity,
                  "Heavy Engineering": Hammer,
                  Automation: Cpu,
                  "Plastic Industry": Layers,
                  Electrical: Zap,
                  Packaging: Package,
                  "Food Industry": Utensils,
                };
                const IndIcon = iconMap[ind.name] || Factory;

                return (
                  <div
                    key={ind.name || i}
                    className="group border border-border bg-white p-5 transition-all duration-300 hover:border-accent hover:bg-primary hover:text-primary-foreground hover:shadow-lg"
                  >
                    <div className="flex size-10 items-center justify-center bg-steel-soft text-accent transition-colors group-hover:bg-industrial-amber group-hover:text-primary">
                      <IndIcon size={20} />
                    </div>
                    <span className="mt-4 block text-[10px] font-bold text-muted-foreground group-hover:text-industrial-amber">
                      0{i + 1}
                    </span>
                    <h3 className="mt-1 font-display text-sm font-bold">{ind.name}</h3>
                    <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground group-hover:text-primary-foreground/75 line-clamp-3">
                      {ind.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CLIENTS & TIER-1 ECOSYSTEM */}
        <section className="border-t border-border bg-steel-soft py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                INDUSTRIAL CLIENT NETWORK
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-foreground">
                Trusted by India's Premier Manufacturing Leaders
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {data.clients.map((client, i) => (
                <div
                  key={client.name || i}
                  className="flex flex-col items-center justify-center border border-border bg-background p-6 text-center transition-all hover:border-accent hover:shadow-sm"
                >
                  <Building2 size={24} className="text-industrial-amber" />
                  <span className="mt-3 font-display text-sm font-bold text-foreground">
                    {client.name}
                  </span>
                  <span className="mt-1 text-[11px] text-muted-foreground">
                    {client.industry || client.badge || "Industrial Leader"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="CLIENT VOICES"
              title="What Plant Heads & Directors Say"
              subtitle="Hear from engineering leaders across India who rely on Global CNC machinery and machining services."
              center
            />

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.testimonials.slice(0, 6).map((test, i) => (
                <div
                  key={test.name || i}
                  className="flex flex-col justify-between border border-border bg-white p-7 shadow-sm transition-all hover:border-accent hover:shadow-md"
                >
                  <div>
                    <div className="flex text-industrial-amber">
                      {[...Array(5)].map((_, starIdx) => (
                        <Star key={starIdx} size={15} fill="currentColor" />
                      ))}
                    </div>
                    <p className="mt-4 text-xs italic leading-relaxed text-foreground/80">
                      "{test.quote}"
                    </p>
                  </div>
                  <div className="mt-6 border-t border-border pt-4">
                    <h4 className="font-display text-sm font-bold text-foreground">{test.name}</h4>
                    <p className="text-[11px] text-accent font-medium">
                      {test.role || "Engineering Lead"}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {test.company} {test.location && `· ${test.location}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LATEST BLOGS & ARTICLES */}
        <section className="border-t border-border bg-steel-soft py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionTitle
                eyebrow="TECHNICAL KNOWLEDGE BASE"
                title="Latest CNC & Manufacturing Insights"
                subtitle="Practical engineering articles on cycle times, GD&T, 5-axis tooling, and machine maintenance."
              />
              <Button
                asChild
                variant="outline"
                className="rounded-none border-primary/20 bg-background"
              >
                <Link to="/blogs">
                  View All Articles <ArrowRight size={15} className="ml-2" />
                </Link>
              </Button>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.blogs.slice(0, 3).map((blog, i) => (
                <article
                  key={blog.title || i}
                  className="group flex flex-col justify-between border border-border bg-background transition-all hover:border-accent hover:shadow-lg"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                      <img
                        src={
                          blog.image ||
                          (i % 2 === 0
                            ? "/images/global-cnc-machining.png"
                            : "/images/global-cnc-facility-hero.png")
                        }
                        alt={blog.title}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className="absolute bottom-2 left-2 bg-industrial-amber px-2.5 py-1 text-[10px] font-bold text-primary">
                        {blog.category || "CNC Tech"}
                      </span>
                    </div>
                    <div className="p-6">
                      <span className="text-[11px] text-muted-foreground">{blog.date}</span>
                      <h3 className="mt-2 font-display text-base font-bold text-foreground group-hover:text-accent">
                        {blog.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                        {blog.description}
                      </p>
                    </div>
                  </div>
                  <div className="border-t border-border p-6 pt-3">
                    <Link
                      to="/blogs"
                      className="inline-flex items-center text-xs font-bold text-accent hover:text-industrial-amber"
                    >
                      Read Full Article <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS (10 QUESTIONS) */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="COMMONLY ASKED QUESTIONS"
              title="Frequently Asked Questions"
              subtitle="Everything you need to know about our machines, custom SPM design, tolerances, and service support."
              center
            />

            <div className="mt-12 space-y-3">
              {data.faqs.slice(0, 10).map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={faq.question || idx}
                    className="border border-border bg-white transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between p-5 text-left font-display text-sm font-bold text-foreground hover:text-accent"
                    >
                      <span className="pr-4">{faq.question}</span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-accent transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="border-t border-border/60 bg-steel-soft p-5 text-xs leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* HOMEPAGE INQUIRY FORM */}
        <section className="border-t border-border bg-steel-soft py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <Eyebrow>GET IN TOUCH DIRECTLY</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl text-foreground">
                Discuss Your Engineering Challenge
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Whether you need a custom high-throughput Special Purpose Machine, a multi-axis VMC,
                or scheduled batch manufacturing of high-precision components, our Pune engineering
                team is ready to assist.
              </p>

              <div className="mt-8 space-y-5 text-xs text-foreground">
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center bg-primary text-industrial-amber">
                    <User size={18} />
                  </div>
                  <div>
                    <span className="font-bold">Contact Person</span>
                    <p className="text-muted-foreground">
                      {contact.client || "Shailesh Bhor"} (Managing Director)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center bg-primary text-industrial-amber">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="font-bold">Telephone Hotline</span>
                    <p className="text-muted-foreground">{contact.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center bg-primary text-industrial-amber">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="font-bold">Official Email</span>
                    <p className="text-muted-foreground">{contact.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center bg-primary text-industrial-amber">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="font-bold">Plant Location</span>
                    <p className="text-muted-foreground">{contact.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Form */}
            <div className="border border-border bg-background p-6 shadow-xl sm:p-8">
              <h3 className="font-display text-xl font-bold text-foreground">
                Send Direct Enquiry
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Fill in the details below. Our technical department will respond promptly.
              </p>

              {contactSubmitted ? (
                <div className="mt-6 border border-green-200 bg-green-50 p-6 text-center text-green-900">
                  <Check className="mx-auto mb-2 text-green-600" size={32} />
                  <h4 className="font-display font-bold">Enquiry Registered!</h4>
                  <p className="mt-2 text-xs text-green-800">
                    Thank you. Your message has been received. Our team at Bhosari, Pune will review
                    your requirement and get back to you immediately.
                  </p>
                  <Button
                    onClick={() => setContactSubmitted(false)}
                    className="mt-4 rounded-none bg-primary text-primary-foreground"
                  >
                    Send Another Note
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setContactSubmitted(true);
                  }}
                  className="mt-6 space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-1.5 text-xs font-semibold">
                      Your Name *
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        className="h-10 border border-input bg-background px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent"
                      />
                    </label>
                    <label className="grid gap-1.5 text-xs font-semibold">
                      Email Address *
                      <input
                        required
                        type="email"
                        placeholder="name@domain.com"
                        className="h-10 border border-input bg-background px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent"
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-1.5 text-xs font-semibold">
                      Phone Number *
                      <input
                        required
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="h-10 border border-input bg-background px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent"
                      />
                    </label>
                    <label className="grid gap-1.5 text-xs font-semibold">
                      Company Name
                      <input
                        type="text"
                        placeholder="Industrial Firm Ltd."
                        className="h-10 border border-input bg-background px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent"
                      />
                    </label>
                  </div>

                  <label className="grid gap-1.5 text-xs font-semibold">
                    Describe Your Requirement *
                    <textarea
                      required
                      rows={4}
                      placeholder="Give details about part drawings, machine type, batch quantities or required delivery schedule..."
                      className="border border-input bg-background p-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent"
                    />
                  </label>

                  <Button
                    type="submit"
                    className="btn-industrial-gradient h-11 w-full rounded-none font-bold"
                  >
                    Submit Enquiry <ArrowRight size={16} className="ml-2" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION BANNER */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row lg:px-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-industrial-amber">
                READY TO ELEVATE YOUR MACHINING PRODUCTIVITY?
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
                Partner with Pune's Premier Machine Tool Manufacturer
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => handleOpenQuote()}
                className="btn-industrial-gradient rounded-none px-6 font-bold"
              >
                Request Quotation
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-none border-white/30 text-white hover:bg-white hover:text-primary"
              >
                <Link to="/contact">Contact Team</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Interactive Modals */}
      <QuoteModal
        isOpen={activeQuoteModal}
        onClose={() => setActiveQuoteModal(false)}
        defaultProduct={quoteItem}
      />
      <ProductDetailModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        onEnquire={(name) => handleOpenQuote(name)}
      />
    </SiteFrame>
  );
}

// -------------------------------------------------------------
// ABOUT US PAGE COMPONENT
// -------------------------------------------------------------

export function AboutPage() {
  const data = useSiteData();
  const about = data.about[0] ?? siteDefaults.about[0]!;
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <SiteFrame>
      <main className="pt-20">
        {/* Banner */}
        <section className="relative flex min-h-[360px] items-end overflow-hidden bg-primary pb-12 pt-20 text-primary-foreground">
          <img
            src="/images/global-cnc-facility-hero.png"
            alt="Global CNC Plant Bhosari Pune"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0F172A]/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#1E3A8A]/50" />
          <div className="industrial-grid absolute inset-0 opacity-20" />

          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Eyebrow light>ABOUT GLOBAL CNC PVT. LTD.</Eyebrow>
            <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
              Engineering Mastery & Precision Craftsmanship
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/80">
              Headquartered at Gera's Imperium Gateway in Bhosari, Pune, we design and build
              high-performance CNC, VMC, and Special Purpose Machines for India's core manufacturing
              sectors.
            </p>
          </div>
        </section>

        {/* Company Introduction */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
            <div>
              <SectionTitle
                eyebrow="OUR IDENTITY"
                title="Building Machines That Shape Indian Industry"
                subtitle={about.description}
              />

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="border-t-2 border-accent pt-4">
                  <h3 className="font-display font-bold text-foreground">Our Mission</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {about.mission}
                  </p>
                </div>
                <div className="border-t-2 border-industrial-amber pt-4">
                  <h3 className="font-display font-bold text-foreground">Our Vision</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {about.vision}
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-border pt-6">
                <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                  Core Values
                </span>
                <p className="mt-2 font-display text-lg font-bold text-foreground">
                  {about.values ||
                    "Uncompromising Precision · Engineering Integrity · Innovation · Customer Trust"}
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/global-cnc-machining.png"
                alt="Precision Machined Parts Global CNC"
                className="aspect-[4/3] w-full object-cover shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 border border-accent bg-primary p-6 text-white shadow-xl sm:left-6">
                <span className="block font-display text-2xl font-bold text-industrial-amber">
                  Bhosari, Pune
                </span>
                <span className="block text-xs text-white/80">
                  Strategic hub in Maharashtra's primary industrial automotive corridor.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Director Message */}
        <section className="border-y border-border bg-steel-soft py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="border-l-4 border-industrial-amber bg-background p-8 shadow-sm md:p-12">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                DIRECTOR'S STATEMENT
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-foreground md:text-3xl">
                A Message from Shailesh Bhor
              </h2>
              <blockquote className="mt-6 text-sm italic leading-relaxed text-foreground/80 md:text-base">
                "
                {about.directorMessage ||
                  "At Global CNC Pvt. Ltd., precision is more than just a measurement—it is the foundation of industrial trust. Every machine we design and every component we machine reflects our dedication to empowering Indian industry with world-class engineering capabilities. Under Make in India, we take pride in delivering machines that compete with the finest international brands while offering rapid, reliable domestic service and genuine partnership."}
                "
              </blockquote>
              <div className="mt-8 flex items-center gap-4 border-t border-border pt-4">
                <div className="flex size-12 items-center justify-center bg-primary text-industrial-amber font-display font-bold">
                  SB
                </div>
                <div>
                  <h4 className="font-display font-bold text-foreground">
                    {about.directorName || "Shailesh Bhor"}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {about.directorTitle || "Managing Director & Founder, Global CNC Pvt. Ltd."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Timeline / Our Journey */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="TWO DECADES OF DEDICATION"
              title="Our Journey & Milestones"
              subtitle="From precision job work to manufacturing multi-axis Special Purpose Machines and automation cells."
              center
            />

            <div className="mt-16 grid gap-6 md:grid-cols-5">
              {[
                {
                  year: "2004",
                  title: "Founding in Pune",
                  desc: "Started with precision job turning and custom toolholding for local tier-1 automotive suppliers.",
                },
                {
                  year: "2009",
                  title: "SPM Manufacturing Division",
                  desc: "Launched dedicated design and build division for multi-station rotary indexing special purpose machines.",
                },
                {
                  year: "2015",
                  title: "High-Speed VMC Induction",
                  desc: "Inducted rigid vertical machining centres and expanded into aerospace and defense prototyping.",
                },
                {
                  year: "2020",
                  title: "5-Axis & CMM Lab Upgrade",
                  desc: "Commissioned climate-controlled metrology lab with Zeiss CMM and Renishaw laser calibration.",
                },
                {
                  year: "Present",
                  title: "Imperium Gateway Works",
                  desc: "Consolidated state-of-the-art facility at Gera's Imperium Gateway, Bhosari with full turnkey support.",
                },
              ].map((milestone) => (
                <div
                  key={milestone.year}
                  className="border-t-2 border-accent bg-white p-6 shadow-sm"
                >
                  <span className="font-display text-2xl font-extrabold text-industrial-amber">
                    {milestone.year}
                  </span>
                  <h3 className="mt-2 font-display text-sm font-bold text-foreground">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {milestone.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Infrastructure & Manufacturing Facility */}
        <section className="bg-primary py-20 text-primary-foreground lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="FACILITY INFRASTRUCTURE"
              title="Inside Our Bhosari Manufacturing Works"
              subtitle="Modern bays configured for machine assembly, testing, inspection, and dispatch."
              light
              center
            />

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Machine Shop",
                  desc: "Equipped with high-rigidity CNC slant-bed turning centers, heavy milling setups, and horizontal borers.",
                },
                {
                  title: "SPM Assembly Line",
                  desc: "Dedicated clean bays for mechanical alignment, hydraulic power pack integration, and pneumatic testing.",
                },
                {
                  title: "Quality & CMM Lab",
                  desc: "Temperature-regulated 20°C metrology inspection center equipped with 3D CMM and laser pitch error tools.",
                },
                {
                  title: "Electrical & PLC Wing",
                  desc: "Control panel fabrication, Fanuc and Siemens controller wiring, and safety interlock validation.",
                },
                {
                  title: "Packaging & Dispatch Bay",
                  desc: "Heavy gantry cranes, anti-corrosive vacuum packaging, and dedicated dispatch logistics across India.",
                },
                {
                  title: "R&D & CAD/CAM Studio",
                  desc: "In-house design workstation network utilizing SolidWorks, Siemens NX, and Mastercam simulation suites.",
                },
              ].map((infra, idx) => (
                <div
                  key={infra.title}
                  className="border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-industrial-amber">
                    BAYS 0{idx + 1}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-white">{infra.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-primary-foreground/75">
                    {infra.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-steel-soft py-16">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row lg:px-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">
                Plan a Technical Audit of Our Facility
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                We welcome client engineering teams to review our machines and quality lab in
                person.
              </p>
            </div>
            <Button
              onClick={() => setQuoteOpen(true)}
              className="btn-industrial-gradient rounded-none px-6"
            >
              Schedule a Visit or Consultation
            </Button>
          </div>
        </section>
      </main>

      <QuoteModal isOpen={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </SiteFrame>
  );
}

// -------------------------------------------------------------
// PRODUCTS PAGE COMPONENT
// -------------------------------------------------------------

export function ProductsPage() {
  const data = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModalProduct, setActiveModalProduct] = useState<SiteRecord | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState("");

  const categories = [
    "All",
    "CNC Machines",
    "VMC Machines",
    "Special Purpose Machines",
    "CNC Parts",
    "Machine Components",
    "Industrial Automation Products",
  ];

  const filtered = data.products.filter((p) => {
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      (p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.applications && p.applications.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleEnquire = (productName: string) => {
    setQuoteProduct(productName);
    setQuoteOpen(true);
  };

  return (
    <SiteFrame>
      <main className="pt-20">
        {/* Banner */}
        <section className="relative flex min-h-[360px] items-end overflow-hidden bg-primary pb-12 pt-20 text-primary-foreground">
          <img
            src="/images/global-cnc-machining.png"
            alt="CNC and VMC Machine Products Global CNC"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0F172A]/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#1E3A8A]/50" />
          <div className="industrial-grid absolute inset-0 opacity-20" />

          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Eyebrow light>PRODUCT PORTFOLIO</Eyebrow>
            <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
              High-Rigidity CNC & VMC Machinery
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/80">
              Explore our lineup of standard and custom CNC turning centers, vertical machining
              centers, Special Purpose Machines, and precision components.
            </p>
          </div>
        </section>

        {/* Filter & Search Bar */}
        <section className="sticky top-20 z-30 border-b border-border bg-background/95 py-4 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "bg-steel-soft text-foreground/80 hover:bg-steel"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search size={15} className="absolute left-3 top-2.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 w-full border border-input bg-background pl-9 pr-3 text-xs outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </section>

        {/* Product Cards Grid */}
        <section className="bg-steel-soft py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">
                Showing {filtered.length} product{filtered.length === 1 ? "" : "s"}
              </span>
              {(selectedCategory !== "All" || searchTerm) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchTerm("");
                  }}
                  className="text-xs text-accent hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((prod, idx) => (
                <div
                  key={prod.name || idx}
                  className="group flex flex-col justify-between border border-border bg-background transition-all hover:border-accent hover:shadow-xl"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                      <img
                        src={prod.image || "/images/global-cnc-facility-hero.png"}
                        alt={prod.name}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className="absolute left-3 top-3 bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        {prod.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <h3 className="font-display text-lg font-bold text-foreground">
                        {prod.name}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                        {prod.description}
                      </p>

                      {prod.specifications && (
                        <div className="mt-4 rounded bg-steel-soft p-3 text-[11px] font-medium text-foreground">
                          <strong className="text-accent">Key Specs:</strong>{" "}
                          <span className="line-clamp-2">{prod.specifications}</span>
                        </div>
                      )}

                      {prod.applications && (
                        <p className="mt-3 text-[11px] text-muted-foreground">
                          <strong className="text-foreground">Applications:</strong>{" "}
                          <span className="line-clamp-2">{prod.applications}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-border p-6 pt-3">
                    <button
                      type="button"
                      onClick={() => setActiveModalProduct(prod)}
                      className="text-xs font-bold text-accent hover:underline"
                    >
                      Specifications & Details
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEnquire(prod.name)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-industrial-amber hover:text-foreground"
                    >
                      Request Quote <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="border border-border bg-background p-12 text-center">
                <p className="text-sm text-muted-foreground">
                  No products matched your criteria. Contact us for custom machinery designs.
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchTerm("");
                  }}
                  className="mt-4 rounded-none bg-primary text-primary-foreground"
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <ProductDetailModal
        product={activeModalProduct}
        isOpen={Boolean(activeModalProduct)}
        onClose={() => setActiveModalProduct(null)}
        onEnquire={(name) => handleEnquire(name)}
      />
      <QuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        defaultProduct={quoteProduct}
      />
    </SiteFrame>
  );
}

// -------------------------------------------------------------
// SERVICES PAGE COMPONENT
// -------------------------------------------------------------

export function ServicesPage() {
  const data = useSiteData();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleEnquire = (name: string) => {
    setSelectedService(name);
    setQuoteOpen(true);
  };

  return (
    <SiteFrame>
      <main className="pt-20">
        {/* Banner */}
        <section className="relative flex min-h-[360px] items-end overflow-hidden bg-primary pb-12 pt-20 text-primary-foreground">
          <img
            src="/images/global-cnc-facility-hero.png"
            alt="Engineering Services Global CNC"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0F172A]/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#1E3A8A]/50" />
          <div className="industrial-grid absolute inset-0 opacity-20" />

          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Eyebrow light>LIFECYCLE ENGINEERING SERVICES</Eyebrow>
            <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
              From Blueprint Design to Annual Maintenance
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/80">
              End-to-end manufacturing, custom SPM design, laser calibration, retrofitting, and
              on-site repair support based in Pune, India.
            </p>
          </div>
        </section>

        {/* The 8 Services Cards Grid */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="FULL SPECTRUM ENGINEERING"
              title="Our Core Engineering Services"
              subtitle="Trusted industrial solutions crafted to minimize machine downtime and enhance shop floor productivity."
            />

            <div className="mt-14 grid gap-8 md:grid-cols-2">
              {data.services.map((srv, idx) => (
                <div
                  key={srv.name || idx}
                  className="group flex flex-col justify-between border border-border bg-white p-8 transition-all hover:border-accent hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-border pb-4">
                      <span className="font-display text-2xl font-extrabold text-industrial-amber">
                        0{idx + 1}
                      </span>
                      <span className="bg-steel-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent">
                        {srv.category || "Industrial Service"}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-xl font-bold text-foreground">
                      {srv.name}
                    </h3>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      {srv.description}
                    </p>

                    {srv.capabilities && (
                      <div className="mt-4 rounded bg-steel-soft p-3 text-[11px] text-foreground">
                        <strong className="text-accent">Key Capabilities:</strong>{" "}
                        {srv.capabilities}
                      </div>
                    )}

                    {srv.leadTime && (
                      <div className="mt-3 text-[11px] text-muted-foreground">
                        <Clock size={12} className="inline mr-1 text-industrial-amber" />
                        <strong>Typical Lead Time:</strong> {srv.leadTime}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 border-t border-border pt-4">
                    <Button
                      onClick={() => handleEnquire(srv.name)}
                      className="btn-industrial-gradient w-full rounded-none text-xs font-bold"
                    >
                      Enquire for {srv.name} <ArrowRight size={14} className="ml-2" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Consultation Methodology */}
        <section className="bg-steel-soft py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="TECHNICAL PROCESS"
              title="How We Execute Machine Projects"
              subtitle="Clear milestones from preliminary feasibility analysis to on-site production sign-off."
            />

            <div className="mt-12 grid gap-6 sm:grid-cols-4">
              {[
                {
                  step: "Stage 1",
                  title: "Site & Process Audit",
                  text: "We study your cycle time constraints, tooling layout, and machine floor footprint.",
                },
                {
                  step: "Stage 2",
                  title: "Preliminary Proposal",
                  text: "Engineering concept 3D simulation with guaranteed cycle times and commercial proposal.",
                },
                {
                  step: "Stage 3",
                  title: "Manufacturing & Run-Off",
                  text: "Precision fabrication, assembly, CMM metrology, and trial component run-off.",
                },
                {
                  step: "Stage 4",
                  title: "Site Commissioning",
                  text: "Turnkey installation, laser alignment, and comprehensive operator training.",
                },
              ].map((item) => (
                <div key={item.step} className="border border-border bg-background p-6">
                  <span className="text-xs font-bold text-accent">{item.step}</span>
                  <h3 className="mt-2 font-display text-base font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <QuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        defaultProduct={selectedService}
      />
    </SiteFrame>
  );
}

// -------------------------------------------------------------
// GALLERY PAGE COMPONENT (WITH CUSTOM REACT LIGHTBOX)
// -------------------------------------------------------------

export function GalleryPage() {
  const data = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ["All", "Factory Images", "Machines", "Workshop", "Production", "Events"];

  const filtered = data.gallery.filter((item) => {
    return selectedCategory === "All" || item.category === selectedCategory;
  });

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeLightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev + filtered.length - 1) % filtered.length : null,
        );
      }
      if (e.key === "ArrowRight") {
        setActiveLightboxIndex((prev) => (prev !== null ? (prev + 1) % filtered.length : null));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, filtered.length]);

  return (
    <SiteFrame>
      <main className="pt-20">
        {/* Banner */}
        <section className="relative flex min-h-[360px] items-end overflow-hidden bg-primary pb-12 pt-20 text-primary-foreground">
          <img
            src="/images/global-cnc-facility-hero.png"
            alt="Gallery Global CNC Pune"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0F172A]/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#1E3A8A]/50" />
          <div className="industrial-grid absolute inset-0 opacity-20" />

          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Eyebrow light>VISUAL PORTFOLIO</Eyebrow>
            <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
              Inside Our Facility & Production
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/80">
              A high-resolution glimpse into our CNC machine shops, SPM assembly lines, metrology
              lab, and client showcase events in Bhosari, Pune.
            </p>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="sticky top-20 z-30 border-b border-border bg-background/95 py-4 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "bg-steel-soft text-foreground/80 hover:bg-steel"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {filtered.length} Image{filtered.length === 1 ? "" : "s"}
            </span>
          </div>
        </section>

        {/* Responsive Grid */}
        <section className="bg-background py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {filtered.map((item, idx) => (
                <button
                  key={`${item.name}-${idx}`}
                  type="button"
                  onClick={() => setActiveLightboxIndex(idx)}
                  className="group relative aspect-[4/3] w-full overflow-hidden border border-border bg-primary text-left focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <img
                    src={item.image || "/images/global-cnc-machining.png"}
                    alt={item.name}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-industrial-amber">
                      {item.category}
                    </span>
                    <h3 className="mt-1 font-display text-sm font-bold sm:text-base">
                      {item.name}
                    </h3>
                  </div>
                  <span className="absolute right-3 top-3 flex size-8 items-center justify-center bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <ArrowUpRight size={16} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* CUSTOM REACT LIGHTBOX (NO EXTERNAL LIBRARY) */}
      {activeLightboxIndex !== null && filtered[activeLightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={() => setActiveLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute right-5 top-5 text-white/80 hover:text-white"
            aria-label="Close Lightbox"
          >
            <X size={28} />
          </button>

          {/* Previous button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveLightboxIndex((activeLightboxIndex + filtered.length - 1) % filtered.length);
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 p-3 text-white hover:bg-white hover:text-black md:left-6 transition-colors"
            aria-label="Previous Image"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Lightbox Figure */}
          <figure
            className="max-h-[85vh] max-w-4xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[activeLightboxIndex]?.image}
              alt={filtered[activeLightboxIndex]?.name}
              className="max-h-[72vh] w-auto max-w-full object-contain mx-auto shadow-2xl"
            />
            <figcaption className="mt-4 text-white">
              <span className="inline-block bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-foreground mb-1">
                {filtered[activeLightboxIndex]?.category}
              </span>
              <h3 className="font-display text-lg font-bold">
                {filtered[activeLightboxIndex]?.name}
              </h3>
              {filtered[activeLightboxIndex]?.description && (
                <p className="mt-1 text-xs text-white/70 max-w-xl mx-auto">
                  {filtered[activeLightboxIndex]?.description}
                </p>
              )}
            </figcaption>
          </figure>

          {/* Next button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveLightboxIndex((activeLightboxIndex + 1) % filtered.length);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 p-3 text-white hover:bg-white hover:text-black md:right-6 transition-colors"
            aria-label="Next Image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </SiteFrame>
  );
}

// -------------------------------------------------------------
// CAREERS PAGE COMPONENT
// -------------------------------------------------------------

export function CareersPage() {
  const data = useSiteData();
  const [selectedJob, setSelectedJob] = useState<SiteRecord | null>(null);

  return (
    <SiteFrame>
      <main className="pt-20">
        {/* Banner */}
        <section className="relative flex min-h-[360px] items-end overflow-hidden bg-primary pb-12 pt-20 text-primary-foreground">
          <img
            src="/images/global-cnc-facility-hero.png"
            alt="Careers at Global CNC Pune"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0F172A]/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#1E3A8A]/50" />
          <div className="industrial-grid absolute inset-0 opacity-20" />

          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Eyebrow light>CAREERS AT GLOBAL CNC</Eyebrow>
            <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
              Build the Next Generation of Machine Tools
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/80">
              Join our engineering and manufacturing team in Bhosari, Pune. We are looking for
              passionate CNC programmers, mechanical SPM designers, and service engineers.
            </p>
          </div>
        </section>

        {/* Current Openings & Benefits */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.2fr_.8fr] lg:px-8">
            {/* Openings */}
            <div>
              <SectionTitle
                eyebrow="CURRENT OPENINGS"
                title="Explore Active Job Opportunities"
                subtitle="Work on cutting-edge 5-axis machining, rotary SPM design, and aerospace quality standards."
              />

              <div className="mt-10 space-y-6">
                {data.careers.map((job, idx) => (
                  <div
                    key={job.title || idx}
                    className="border border-border bg-white p-6 shadow-sm transition-all hover:border-accent"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-lg font-bold text-foreground">
                          {job.title}
                        </h3>
                        <div className="mt-1 flex flex-wrap gap-2 text-xs font-medium text-accent">
                          <span>{job.department}</span>
                          <span>·</span>
                          <span>{job.location}</span>
                          <span>·</span>
                          <span>{job.type}</span>
                          {job.experience && (
                            <>
                              <span>·</span>
                              <span className="text-muted-foreground">{job.experience}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <Button
                        onClick={() => setSelectedJob(job)}
                        className="btn-industrial-gradient rounded-none px-4 py-2 text-xs font-bold"
                      >
                        Apply Now <ArrowRight size={14} className="ml-1" />
                      </Button>
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                      {job.description}
                    </p>

                    {job.requirements && (
                      <div className="mt-3 rounded bg-steel-soft p-3 text-[11px] text-foreground">
                        <strong>Requirements:</strong> {job.requirements}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits & Culture */}
            <div>
              <div className="border border-border bg-steel-soft p-8">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                  BENEFITS & CULTURE
                </span>
                <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
                  Why Work at Global CNC?
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  We invest in our engineers, operators, and technicians with safety, continuous
                  learning, and competitive rewards.
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    {
                      title: "Competitive Salary & Statutory PF/ESIC",
                      desc: "Timely compensation, health coverage, and annual festive bonuses.",
                    },
                    {
                      title: "Cutting-Edge CAD/CAM Training",
                      desc: "Regular upskilling in Siemens NX, Mastercam, and 5-axis toolpath programming.",
                    },
                    {
                      title: "Clean & Safe Shop Floor",
                      desc: "5S certified, temperature-controlled, well-ventilated bays with full PPE provided.",
                    },
                    {
                      title: "Subsidized Canteen & Transport",
                      desc: "Hygienic on-site canteen and close connectivity to Bhosari Metro Station.",
                    },
                    {
                      title: "Innovation Culture",
                      desc: "Direct mentorship under Managing Director Shailesh Bhor on breakthrough SPM builds.",
                    },
                  ].map((ben) => (
                    <div key={ben.title} className="flex items-start gap-3 text-xs">
                      <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                      <div>
                        <strong className="block text-foreground">{ben.title}</strong>
                        <span className="text-muted-foreground">{ben.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-border pt-6">
                  <p className="text-xs text-muted-foreground">
                    Don't see a matching position? Send your resume directly to:{" "}
                    <a
                      href="mailto:deventerprises1016@gmail.com?subject=Spontaneous Career Application - Global CNC"
                      className="font-bold text-accent hover:underline"
                    >
                      deventerprises1016@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <CareerApplyModal
        job={selectedJob}
        isOpen={Boolean(selectedJob)}
        onClose={() => setSelectedJob(null)}
      />
    </SiteFrame>
  );
}

// -------------------------------------------------------------
// BLOGS PAGE COMPONENT
// -------------------------------------------------------------

export function BlogsPage() {
  const data = useSiteData();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeBlog, setActiveBlog] = useState<SiteRecord | null>(null);

  const categories = [
    "All",
    "Industrial Articles",
    "Manufacturing Tips",
    "Latest CNC Technologies",
    "Machine Maintenance",
  ];

  const filtered = data.blogs.filter((b) => {
    const matchesCat = selectedCategory === "All" || b.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      (b.title && b.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (b.description && b.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <SiteFrame>
      <main className="pt-20">
        {/* Banner */}
        <section className="relative flex min-h-[360px] items-end overflow-hidden bg-primary pb-12 pt-20 text-primary-foreground">
          <img
            src="/images/global-cnc-machining.png"
            alt="Manufacturing Knowledge Base Global CNC"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0F172A]/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#1E3A8A]/50" />
          <div className="industrial-grid absolute inset-0 opacity-20" />

          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Eyebrow light>INDUSTRY INSIGHTS & ENGINEERING BLOGS</Eyebrow>
            <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
              Machining Intelligence for Engineers
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/80">
              Technical articles, cycle time optimizations, spindle maintenance best practices, and
              5-axis programming strategies from the shop floor.
            </p>
          </div>
        </section>

        {/* Filter and Search Bar */}
        <section className="sticky top-20 z-30 border-b border-border bg-background/95 py-4 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "bg-steel-soft text-foreground/80 hover:bg-steel"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search size={15} className="absolute left-3 top-2.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 w-full border border-input bg-background pl-9 pr-3 text-xs outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="bg-steel-soft py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((blog, idx) => (
                <article
                  key={blog.title || idx}
                  className="group flex flex-col justify-between border border-border bg-background transition-all hover:border-accent hover:shadow-xl"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                      <img
                        src={
                          blog.image ||
                          (idx % 2 === 0
                            ? "/images/global-cnc-facility-hero.png"
                            : "/images/global-cnc-machining.png")
                        }
                        alt={blog.title}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className="absolute bottom-2 left-2 bg-industrial-amber px-2.5 py-1 text-[10px] font-bold text-primary">
                        {blog.category || "Manufacturing"}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                        <Calendar size={12} />
                        <span>{blog.date}</span>
                        {blog.readTime && <span>· {blog.readTime}</span>}
                      </div>

                      <h3 className="mt-2 font-display text-base font-bold text-foreground group-hover:text-accent">
                        {blog.title}
                      </h3>

                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                        {blog.description}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-border p-6 pt-3">
                    <button
                      type="button"
                      onClick={() => setActiveBlog(blog)}
                      className="inline-flex items-center text-xs font-bold text-accent hover:text-industrial-amber"
                    >
                      Read Full Article <ArrowRight size={14} className="ml-1" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="border border-border bg-background p-12 text-center">
                <p className="text-sm text-muted-foreground">No articles matched your search.</p>
                <Button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchTerm("");
                  }}
                  className="mt-4 rounded-none bg-primary text-primary-foreground"
                >
                  Reset
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <BlogDetailModal
        blog={activeBlog}
        isOpen={Boolean(activeBlog)}
        onClose={() => setActiveBlog(null)}
      />
    </SiteFrame>
  );
}

// -------------------------------------------------------------
// CONTACT PAGE COMPONENT
// -------------------------------------------------------------

export function ContactPage() {
  const data = useSiteData();
  const contact = data.contact[0] ?? siteDefaults.contact[0]!;
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  return (
    <SiteFrame>
      <main className="pt-20">
        {/* Banner */}
        <section className="relative flex min-h-[360px] items-end overflow-hidden bg-primary pb-12 pt-20 text-primary-foreground">
          <img
            src="/images/global-cnc-facility-hero.png"
            alt="Contact Global CNC Bhosari Pune"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0F172A]/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] to-[#1E3A8A]/50" />
          <div className="industrial-grid absolute inset-0 opacity-20" />

          <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <Eyebrow light>GET IN TOUCH</Eyebrow>
            <h1 className="mt-3 font-display text-4xl font-extrabold sm:text-5xl">
              Contact Our Engineering Department
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/80">
              Visit our manufacturing facility in Bhosari, Pune, call our hotline, or send us your
              drawing attachments for immediate technical analysis.
            </p>
          </div>
        </section>

        {/* Contact Info & Inquiry Form */}
        <section className="bg-steel-soft py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
            {/* Left: Contact Info */}
            <div>
              <SectionTitle
                eyebrow="DIRECT ACCESS"
                title="Global CNC Pvt. Ltd."
                subtitle="We are located at Gera's Imperium Gateway in the heart of Pune's premier automotive and engineering cluster."
              />

              <div className="mt-8 space-y-6">
                <div className="border-l-4 border-accent bg-white p-6 shadow-sm">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    MANAGING DIRECTOR
                  </span>
                  <p className="mt-1 font-display text-lg font-bold text-foreground">
                    {contact.client || "Shailesh Bhor"}
                  </p>
                  <p className="text-xs text-accent">Global CNC Pvt. Ltd.</p>
                </div>

                <div className="space-y-4 text-xs text-foreground">
                  <a
                    href={`tel:${contact.phone?.replaceAll(" ", "")}`}
                    className="flex items-center gap-4 border border-border bg-white p-4 transition-all hover:border-accent"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center bg-primary text-industrial-amber">
                      <Phone size={20} />
                    </span>
                    <div>
                      <span className="block font-bold text-muted-foreground">
                        DIRECT PHONE / WHATSAPP
                      </span>
                      <span className="font-display text-sm font-bold text-foreground">
                        {contact.phone}
                      </span>
                    </div>
                  </a>

                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-4 border border-border bg-white p-4 transition-all hover:border-accent"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center bg-primary text-industrial-amber">
                      <Mail size={20} />
                    </span>
                    <div>
                      <span className="block font-bold text-muted-foreground">EMAIL ADDRESS</span>
                      <span className="font-display text-sm font-bold break-all text-foreground">
                        {contact.email}
                      </span>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 border border-border bg-white p-4">
                    <span className="flex size-11 shrink-0 items-center justify-center bg-primary text-industrial-amber">
                      <MapPin size={20} />
                    </span>
                    <div>
                      <span className="block font-bold text-muted-foreground">
                        FACTORY & OFFICE ADDRESS
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-foreground">
                        {contact.address}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 border border-border bg-white p-4">
                    <span className="flex size-11 shrink-0 items-center justify-center bg-primary text-industrial-amber">
                      <Clock size={20} />
                    </span>
                    <div>
                      <span className="block font-bold text-muted-foreground">WORKING HOURS</span>
                      <span className="mt-1 block text-xs text-foreground">
                        {contact.hours || "Mon - Sat: 9:00 AM - 6:00 PM"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Mock Inquiry Form */}
            <div className="border border-border bg-background p-8 shadow-xl">
              <h3 className="font-display text-2xl font-bold text-foreground">Send an Enquiry</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Please complete the form below. Our technical sales head will reach out to schedule
                a consultation.
              </p>

              {submitted ? (
                <div className="mt-8 border border-green-200 bg-green-50 p-8 text-center text-green-900">
                  <Check className="mx-auto mb-3 text-green-600" size={36} />
                  <h4 className="font-display text-lg font-bold">
                    Enquiry Successfully Dispatched!
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-green-800">
                    Thank you, <strong>{formData.name}</strong>. Your enquiry has been received at
                    Global CNC Pvt. Ltd. We have noted your details for{" "}
                    <strong>{formData.company || "your organization"}</strong> and will reply to{" "}
                    <strong>{formData.email}</strong> promptly.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
                    }}
                    className="mt-6 rounded-none bg-primary text-primary-foreground"
                  >
                    Submit Another Message
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="mt-6 space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-1.5 text-xs font-semibold">
                      Full Name *
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="h-11 border border-input bg-background px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent"
                      />
                    </label>
                    <label className="grid gap-1.5 text-xs font-semibold">
                      Business Email *
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="h-11 border border-input bg-background px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent"
                      />
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-1.5 text-xs font-semibold">
                      Phone Number *
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 80876 96166"
                        className="h-11 border border-input bg-background px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent"
                      />
                    </label>
                    <label className="grid gap-1.5 text-xs font-semibold">
                      Company / Organization
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company name"
                        className="h-11 border border-input bg-background px-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent"
                      />
                    </label>
                  </div>

                  <label className="grid gap-1.5 text-xs font-semibold">
                    Requirement Message & Technical Specifications *
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify machine models, parts to machine, tolerances, monthly production volumes..."
                      className="border border-input bg-background p-3 text-sm font-normal outline-none focus:ring-2 focus:ring-accent"
                    />
                  </label>

                  <Button
                    type="submit"
                    className="btn-industrial-gradient h-12 w-full rounded-none font-bold tracking-wide"
                  >
                    Send Inquiry to Global CNC <ArrowRight size={16} className="ml-2" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* GOOGLE MAP PLACEHOLDER */}
        <section className="border-t border-border bg-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                GEOGRAPHIC LOCATION
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-foreground">
                Find Our Facility in Bhosari, Pune
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Conveniently located at Gera's Imperium Gateway on Old Mumbai Road, directly
                opposite Bhosari Metro Station.
              </p>
            </div>

            {/* Stylized Industrial Map Card Placeholder */}
            <div className="mt-8 overflow-hidden border border-border bg-slate-900 text-white shadow-xl">
              <div className="relative flex min-h-[380px] flex-col items-center justify-center p-8 text-center industrial-grid">
                <div className="relative z-10 max-w-md border border-white/20 bg-primary/95 p-8 shadow-2xl backdrop-blur-md">
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-industrial-amber text-primary">
                    <MapPin size={28} />
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-white">
                    Global CNC Pvt. Ltd.
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/80">
                    Gera's Imperium Gateway, C442, Old Mumbai Road, Near Bhosari Metro Station,
                    Bhosari, Pune, Maharashtra 411034
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-3 text-[11px] text-industrial-amber">
                    <span>Coordinates: 18.6275° N, 73.8340° E</span>
                  </div>
                  <div className="mt-6">
                    <a
                      href="https://maps.google.com/?q=Gera's+Imperium+Gateway+Bhosari+Pune"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-industrial-amber px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary hover:bg-white transition-colors"
                    >
                      Open in Google Maps <ArrowUpRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}

// -------------------------------------------------------------
// Route Wrappers (TanStack Router targets)
// -------------------------------------------------------------

export function HomeRoutePage() {
  return <HomePage />;
}

export function ContentRoutePage({ page }: { page: Exclude<PageKey, "home"> }) {
  if (page === "about") return <AboutPage />;
  if (page === "products") return <ProductsPage />;
  if (page === "services") return <ServicesPage />;
  if (page === "gallery") return <GalleryPage />;
  if (page === "careers") return <CareersPage />;
  if (page === "blogs") return <BlogsPage />;
  if (page === "contact") return <ContactPage />;
  return <HomePage />;
}
