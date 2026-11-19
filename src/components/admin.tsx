import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpRight,
  Briefcase,
  Building2,
  Check,
  ChevronLeft,
  ChevronRight,
  Cog,
  FileText,
  HelpCircle,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Package,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Search,
  Sparkles,
  Star,
  Trash2,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { adminModules, type SiteRecord } from "@/mock/site-data";
import {
  isAdminSignedIn,
  readSiteContent,
  resetSiteContentToDefaults,
  signInAdmin,
  signOutAdmin,
  writeSiteCollection,
} from "@/lib/site-storage";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    if (isAdminSignedIn()) {
      void navigate({ to: "/admin/dashboard" });
    }
  }, [navigate]);

  if (!ready) return <div className="min-h-screen bg-primary" />;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (signInAdmin(username, password)) {
      void navigate({ to: "/admin/dashboard" });
    } else {
      setError("Invalid credentials. Please use admin / admin123");
    }
  };

  return (
    <main className="flex min-h-screen bg-primary text-primary-foreground">
      {/* Left Industrial Art Panel */}
      <aside className="industrial-grid relative hidden w-1/2 flex-col justify-between overflow-hidden border-r border-primary-foreground/10 p-12 lg:flex">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center bg-industrial-amber text-primary">
            <Cog size={24} />
          </span>
          <span className="font-display text-xl font-bold tracking-tight">
            Global CNC Pvt. Ltd.
          </span>
        </Link>

        <div className="relative z-10 max-w-lg">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-industrial-amber">
            INDUSTRIAL CONTROL PANEL
          </span>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight text-white lg:text-5xl">
            Precision Management for World-Class Engineering.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/75">
            Administer products, special purpose machinery specifications, client portfolios,
            technical blogs, and company information with instant live updates.
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-primary-foreground/50 border-t border-primary-foreground/10 pt-4">
          <span>BHOSARI, PUNE · MAHARASHTRA</span>
          <span>LOCAL SECURE SESSION</span>
        </div>
      </aside>

      {/* Right Login Form */}
      <section className="flex flex-1 items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-primary-foreground/70 hover:text-industrial-amber"
          >
            <ArrowLeft size={15} /> Back to Website
          </Link>

          <div className="mt-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-industrial-amber">
              SECURE ADMIN ACCESS
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-white">Administrator Login</h2>
            <p className="mt-2 text-xs text-primary-foreground/60">
              Sign in to manage Global CNC website content and machinery listings.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <label className="grid gap-1.5 text-xs font-semibold text-primary-foreground/90">
              Username
              <Input
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-11 border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-accent"
              />
            </label>

            <label className="grid gap-1.5 text-xs font-semibold text-primary-foreground/90">
              Password
              <Input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/30 focus:border-accent"
              />
            </label>

            {error && (
              <p
                role="alert"
                className="border border-red-500/30 bg-red-950/40 p-3 text-xs text-red-300"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="h-12 w-full rounded-none bg-industrial-amber font-bold uppercase tracking-wider text-primary hover:bg-white"
            >
              Sign In to Dashboard <ChevronRight size={17} className="ml-1" />
            </Button>
          </form>

          <div className="mt-8 border-t border-primary-foreground/15 pt-5 text-xs text-primary-foreground/50">
            <p className="font-semibold text-primary-foreground/70">Demo Credentials:</p>
            <p className="mt-1">
              Username: <strong className="text-industrial-amber">admin</strong>
            </p>
            <p>
              Password: <strong className="text-industrial-amber">admin123</strong>
            </p>
            <p className="mt-3 text-[11px] text-primary-foreground/40">
              All modifications persist to browser LocalStorage without external database
              dependencies.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

// -------------------------------------------------------------
// Admin Dashboard
// -------------------------------------------------------------

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [isReady, setIsReady] = useState(false);
  const [section, setSection] = useState<string>("dashboard");
  const [records, setRecords] = useState<SiteRecord[]>([]);
  const [editing, setEditing] = useState<number | null>(null);
  const [draft, setDraft] = useState<SiteRecord>({});
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Protect route
  useEffect(() => {
    if (!isAdminSignedIn()) {
      void navigate({ to: "/admin" });
    } else {
      setIsReady(true);
    }
  }, [navigate]);

  // Load section records
  useEffect(() => {
    if (isReady && section !== "dashboard") {
      setRecords(readSiteContent()[section] ?? []);
      setCurrentPage(1);
      setEditing(null);
    }
  }, [section, isReady]);

  if (!isReady) return <div className="min-h-screen bg-steel-soft" />;

  const siteData = readSiteContent();
  const currentModuleName = adminModules.find(([key]) => key === section)?.[1] ?? "Content";

  // Compute field names for current collection
  const fields =
    records[0] && Object.keys(records[0]).length > 0
      ? Object.keys(records[0])
      : (defaultFields[section] ?? ["name", "description"]);

  // Filter records
  const filtered = records
    .map((record, index) => ({ record, index }))
    .filter(({ record }) =>
      Object.values(record).join(" ").toLowerCase().includes(search.toLowerCase()),
    );

  // Pagination slice
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const startNew = () => {
    setDraft(Object.fromEntries(fields.map((key) => [key, ""])));
    setEditing(-1);
  };

  const startEdit = (index: number) => {
    setDraft({ ...records[index] });
    setEditing(index);
  };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = [...records];
    if (editing === -1) {
      updated.unshift(draft);
    } else if (editing !== null) {
      updated[editing] = draft;
    }
    writeSiteCollection(section, updated);
    setRecords(updated);
    setEditing(null);
    setNotice(`${currentModuleName} saved successfully. Changes are live instantly!`);
    window.setTimeout(() => setNotice(""), 3500);
  };

  const remove = (index: number) => {
    if (
      window.confirm(
        `Are you sure you want to delete this ${currentModuleName.toLowerCase()} entry?`,
      )
    ) {
      const updated = records.filter((_, i) => i !== index);
      writeSiteCollection(section, updated);
      setRecords(updated);
      setNotice(`Entry deleted from ${currentModuleName}.`);
      window.setTimeout(() => setNotice(""), 3500);
    }
  };

  const handleResetDefaults = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all website content back to factory demo defaults? Any local customizations will be restored.",
      )
    ) {
      resetSiteContentToDefaults();
      if (section !== "dashboard") {
        setRecords(readSiteContent()[section] ?? []);
      }
      setNotice("Website content has been reset to factory defaults.");
      window.setTimeout(() => setNotice(""), 3500);
    }
  };

  const logout = () => {
    signOutAdmin();
    void navigate({ to: "/admin" });
  };

  return (
    <div className="min-h-screen bg-steel-soft text-foreground">
      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[280px] flex-col bg-primary text-primary-foreground shadow-2xl transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-20 items-center justify-between border-b border-primary-foreground/15 px-6">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center bg-industrial-amber text-primary">
              <Cog size={20} />
            </span>
            <div>
              <span className="block font-display font-bold tracking-tight">Global CNC</span>
              <span className="block text-[9px] font-semibold tracking-widest text-primary-foreground/60">
                ADMIN CONSOLE
              </span>
            </div>
          </Link>
          <button
            type="button"
            className="lg:hidden text-primary-foreground/70 hover:text-white"
            onClick={() => setMenuOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation list */}
        <nav aria-label="Admin Sections" className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {adminModules.map(([key, name]) => {
            const isActive = section === key;
            return (
              <button
                type="button"
                key={key}
                onClick={() => {
                  setSection(key);
                  setEditing(null);
                  setSearch("");
                  setMenuOpen(false);
                }}
                className={`flex w-full items-center justify-between px-3.5 py-2.5 text-left text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-industrial-amber font-bold text-primary shadow-sm"
                    : "text-primary-foreground/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>{name}</span>
                {isActive && <ChevronRight size={14} />}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-primary-foreground/15 p-4 space-y-1">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 text-xs text-primary-foreground/70 hover:text-white transition-colors"
          >
            <ArrowUpRight size={15} /> View Live Website
          </Link>
          <button
            type="button"
            onClick={handleResetDefaults}
            className="flex w-full items-center gap-2 px-3 py-2 text-xs text-primary-foreground/70 hover:text-industrial-amber transition-colors"
          >
            <RefreshCw size={14} /> Reset Demo Defaults
          </button>
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-2 px-3 py-2 text-xs text-red-300 hover:text-red-200 transition-colors"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="min-h-screen lg:pl-[280px]">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={18} />
            </Button>
            <div className="text-xs text-muted-foreground">
              <span>Admin Console</span> <span className="px-1.5">/</span>
              <strong className="text-foreground">{currentModuleName}</strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
            >
              Public Site <ArrowUpRight size={13} />
            </Link>
            <span className="border-l border-border pl-3 text-xs text-muted-foreground">
              User: <strong>admin</strong>
            </span>
          </div>
        </header>

        {/* Dashboard Workspace */}
        <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
          {/* Status notification toast */}
          {notice && (
            <div
              role="status"
              className="mb-6 flex items-center justify-between border border-green-300 bg-green-50 px-4 py-3 text-xs font-medium text-green-900 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Check size={16} className="text-green-600 shrink-0" />
                <span>{notice}</span>
              </div>
              <button
                type="button"
                onClick={() => setNotice("")}
                className="text-green-700 hover:text-green-900"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* SECTION: DASHBOARD OVERVIEW */}
          {section === "dashboard" ? (
            <div>
              <div className="mb-8">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                  SYSTEM OVERVIEW
                </span>
                <h1 className="mt-1 font-display text-3xl font-extrabold text-foreground">
                  Global CNC Control Centre
                </h1>
                <p className="mt-1 text-xs text-muted-foreground">
                  Monitor website collections, update machinery specifications, and control site
                  parameters.
                </p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {[
                  {
                    label: "Products Listed",
                    count: siteData.products?.length || 0,
                    icon: Package,
                    key: "products",
                  },
                  {
                    label: "Engineering Services",
                    count: siteData.services?.length || 0,
                    icon: Wrench,
                    key: "services",
                  },
                  {
                    label: "Featured Machines",
                    count: siteData.machines?.length || 0,
                    icon: Cog,
                    key: "machines",
                  },
                  {
                    label: "Gallery Photographs",
                    count: siteData.gallery?.length || 0,
                    icon: ImageIcon,
                    key: "gallery",
                  },
                  {
                    label: "Career Openings",
                    count: siteData.careers?.length || 0,
                    icon: Briefcase,
                    key: "careers",
                  },
                  {
                    label: "Client Testimonials",
                    count: siteData.testimonials?.length || 0,
                    icon: MessageSquare,
                    key: "testimonials",
                  },
                  {
                    label: "Technical Articles",
                    count: siteData.blogs?.length || 0,
                    icon: FileText,
                    key: "blogs",
                  },
                  {
                    label: "Industries Served",
                    count: siteData.industries?.length || 0,
                    icon: Building2,
                    key: "industries",
                  },
                  {
                    label: "Client Logos",
                    count: siteData.clients?.length || 0,
                    icon: Users,
                    key: "clients",
                  },
                  {
                    label: "FAQs Configured",
                    count: siteData.faqs?.length || 0,
                    icon: HelpCircle,
                    key: "faqs",
                  },
                  {
                    label: "Statistics Counters",
                    count: siteData.statistics?.length || 0,
                    icon: Sparkles,
                    key: "statistics",
                  },
                  {
                    label: "Why Choose Us Reasons",
                    count: siteData["why-choose-us"]?.length || 0,
                    icon: Star,
                    key: "why-choose-us",
                  },
                ].map((kpi) => {
                  const Icon = kpi.icon;
                  return (
                    <button
                      type="button"
                      key={kpi.label}
                      onClick={() => setSection(kpi.key)}
                      className="group flex flex-col justify-between border border-border bg-background p-5 text-left transition-all hover:border-accent hover:shadow-md"
                    >
                      <div className="flex items-center justify-between text-muted-foreground group-hover:text-accent">
                        <span className="text-xs font-semibold">{kpi.label}</span>
                        <Icon size={18} />
                      </div>
                      <div className="mt-4 font-display text-3xl font-extrabold text-foreground group-hover:text-accent">
                        {kpi.count}
                      </div>
                      <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                        Manage Collection →
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Architecture & Live Sync Note */}
              <div className="mt-10 border border-border bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center bg-accent text-accent-foreground">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-foreground">
                      Reactive LocalStorage Architecture (No Backend / No DB Required)
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      All additions, modifications, and deletions made in this admin console are
                      saved directly to the browser's persistent LocalStorage and broadcast via DOM
                      events. Any updates appear instantly on the public frontend without needing
                      backend servers, external APIs, or page reloads.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Button
                        onClick={() => setSection("products")}
                        className="btn-industrial-gradient rounded-none text-xs"
                      >
                        Manage Products
                      </Button>
                      <Button
                        onClick={() => setSection("services")}
                        variant="outline"
                        className="rounded-none text-xs"
                      >
                        Manage Services
                      </Button>
                      <Button
                        onClick={() => setSection("contact")}
                        variant="outline"
                        className="rounded-none text-xs"
                      >
                        Update Contact Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* SECTION: COLLECTION CRUD VIEW */
            <div>
              {/* Header */}
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                    CONTENT MANAGEMENT
                  </span>
                  <h1 className="mt-1 font-display text-2xl font-bold sm:text-3xl text-foreground">
                    {currentModuleName}
                  </h1>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Add, edit, or remove entries in this module. Updates save immediately.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={startNew}
                    className="btn-industrial-gradient rounded-none px-4 text-xs font-bold"
                  >
                    <Plus size={16} className="mr-1.5" />
                    Add {singularNames[section] ?? "Entry"}
                  </Button>
                </div>
              </div>

              {/* Edit / Add Modal or Card */}
              {editing !== null && (
                <form
                  onSubmit={save}
                  className="mb-8 border-2 border-accent bg-background p-6 shadow-xl"
                >
                  <div className="mb-6 flex items-center justify-between border-b border-border pb-3">
                    <h2 className="font-display text-lg font-bold text-foreground">
                      {editing === -1
                        ? `Create New ${singularNames[section] ?? "Entry"}`
                        : `Edit ${singularNames[section] ?? "Entry"}`}
                    </h2>
                    <button
                      type="button"
                      onClick={() => setEditing(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {fields.map((field) => {
                      const isLongText = [
                        "description",
                        "specifications",
                        "applications",
                        "quote",
                        "answer",
                        "address",
                        "mission",
                        "vision",
                        "values",
                        "directorMessage",
                        "footerNote",
                        "content",
                        "requirements",
                      ].includes(field);

                      return (
                        <label
                          key={field}
                          className={`grid gap-1.5 text-xs font-semibold capitalize ${
                            isLongText ? "sm:col-span-2" : ""
                          }`}
                        >
                          {field.replaceAll(/([A-Z])/g, " $1")}
                          {isLongText ? (
                            <textarea
                              rows={4}
                              value={draft[field] ?? ""}
                              onChange={(e) => setDraft({ ...draft, [field]: e.target.value })}
                              className="border border-input bg-background p-3 text-xs font-normal outline-none focus:ring-2 focus:ring-accent"
                            />
                          ) : (
                            <Input
                              required={
                                field === "name" || field === "title" || field === "question"
                              }
                              value={draft[field] ?? ""}
                              onChange={(e) => setDraft({ ...draft, [field]: e.target.value })}
                              className="h-10 text-xs"
                            />
                          )}
                        </label>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setEditing(null)}
                      className="rounded-none text-xs"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="btn-industrial-gradient rounded-none px-6 text-xs font-bold"
                    >
                      <Save size={15} className="mr-1.5" /> Save Entry
                    </Button>
                  </div>
                </form>
              )}

              {/* Search & Records Count */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="relative w-full max-w-sm">
                  <Search size={14} className="absolute left-3 top-2.5 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder={`Search ${currentModuleName.toLowerCase()}...`}
                    className="h-9 pl-9 text-xs"
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {filtered.length} total entr{filtered.length === 1 ? "y" : "ies"}
                </span>
              </div>

              {/* Table of Records */}
              <div className="border border-border bg-background shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] text-left text-xs">
                    <thead className="border-b border-border bg-steel-soft">
                      <tr>
                        {fields.slice(0, 4).map((f) => (
                          <th
                            key={f}
                            className="px-5 py-3 font-bold uppercase tracking-wider text-muted-foreground"
                          >
                            {f.replaceAll(/([A-Z])/g, " $1")}
                          </th>
                        ))}
                        <th className="px-5 py-3 text-right font-bold uppercase tracking-wider text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {paginated.map(({ record, index }) => (
                        <tr
                          key={`${index}-${record.name || record.title || record.question || "row"}`}
                          className="hover:bg-steel-soft/40 transition-colors"
                        >
                          {fields.slice(0, 4).map((f) => (
                            <td key={f} className="max-w-[260px] px-5 py-3.5 align-top">
                              <span className="line-clamp-2 text-foreground">
                                {record[f] || <span className="text-muted-foreground">—</span>}
                              </span>
                            </td>
                          ))}
                          <td className="px-5 py-3.5 align-top text-right">
                            <div className="inline-flex items-center gap-1">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => startEdit(index)}
                                aria-label="Edit entry"
                                className="size-8 text-foreground hover:text-accent"
                              >
                                <Pencil size={15} />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => remove(index)}
                                aria-label="Delete entry"
                                className="size-8 text-red-600 hover:text-red-700"
                              >
                                <Trash2 size={15} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {filtered.length === 0 && (
                        <tr>
                          <td
                            colSpan={Math.min(fields.length, 4) + 1}
                            className="p-12 text-center text-xs text-muted-foreground"
                          >
                            {search
                              ? "No matching entries found."
                              : "No records found in this section. Click 'Add Entry' to create one."}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between border-t border-border px-5 py-3 text-xs text-muted-foreground">
                    <span>
                      Page {currentPage} of {totalPages}
                    </span>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage <= 1}
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        className="h-8 rounded-none px-2"
                      >
                        <ChevronLeft size={14} /> Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage >= totalPages}
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        className="h-8 rounded-none px-2"
                      >
                        Next <ChevronRight size={14} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const defaultFields: Record<string, string[]> = {
  hero: ["eyebrow", "title", "description", "image", "buttonLabel", "secondaryButtonLabel"],
  about: [
    "title",
    "description",
    "mission",
    "vision",
    "values",
    "directorMessage",
    "directorName",
    "directorTitle",
  ],
  products: ["name", "category", "description", "specifications", "applications", "image"],
  services: ["name", "category", "description", "capabilities", "leadTime"],
  machines: ["name", "model", "description", "specs", "image"],
  industries: ["name", "description", "components"],
  gallery: ["name", "category", "description", "image"],
  clients: ["name", "industry", "location", "badge"],
  testimonials: ["name", "role", "company", "quote", "location", "rating"],
  careers: ["title", "department", "location", "type", "experience", "description", "requirements"],
  blogs: ["title", "category", "date", "author", "readTime", "description", "content"],
  faqs: ["question", "answer"],
  statistics: ["value", "label", "description"],
  "why-choose-us": ["title", "description"],
  contact: [
    "company",
    "client",
    "designation",
    "address",
    "phone",
    "email",
    "hours",
    "nearestLandmark",
  ],
  settings: [
    "siteName",
    "tagline",
    "footerNote",
    "phone",
    "email",
    "address",
    "linkedin",
    "facebook",
    "youtube",
  ],
};

const singularNames: Record<string, string> = {
  products: "Product",
  services: "Service",
  machines: "Machine",
  industries: "Industry",
  gallery: "Photo",
  clients: "Client",
  testimonials: "Testimonial",
  careers: "Job Opening",
  blogs: "Article",
  faqs: "FAQ Question",
  statistics: "Statistic",
  "why-choose-us": "Advantage",
  contact: "Contact Info",
  settings: "Setting",
  hero: "Hero Slide",
  about: "About Info",
};
