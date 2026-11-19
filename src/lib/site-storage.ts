import { adminCredentials, siteDefaults, type SiteRecord } from "@/mock/site-data";

const contentKey = "global-cnc-site-content-v1";
const sessionKey = "global-cnc-admin-session-v1";
const changeEvent = "global-cnc-content-changed";

export type SiteContent = Record<string, SiteRecord[]>;

export function readSiteContent(): SiteContent {
  if (typeof window === "undefined") return siteDefaults;
  try {
    const saved = window.localStorage.getItem(contentKey);
    if (!saved) return siteDefaults;
    const parsed: unknown = JSON.parse(saved);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return siteDefaults;
    return { ...siteDefaults, ...(parsed as SiteContent) };
  } catch {
    return siteDefaults;
  }
}

export function writeSiteCollection(section: string, records: SiteRecord[]) {
  const next = { ...readSiteContent(), [section]: records };
  window.localStorage.setItem(contentKey, JSON.stringify(next));
  window.dispatchEvent(new Event(changeEvent));
}

export function resetSiteContentToDefaults() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(contentKey);
    window.dispatchEvent(new Event(changeEvent));
  }
}

export function subscribeToSiteContent(listener: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(changeEvent, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(changeEvent, listener);
    window.removeEventListener("storage", listener);
  };
}

export function signInAdmin(username: string, password: string) {
  if (username !== adminCredentials.username || password !== adminCredentials.password)
    return false;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(sessionKey, "signed-in");
  }
  return true;
}

export function isAdminSignedIn() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(sessionKey) === "signed-in";
}

export function signOutAdmin() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(sessionKey);
  }
}
