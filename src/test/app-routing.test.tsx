import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import {
  readSiteContent,
  writeSiteCollection,
  signInAdmin,
  isAdminSignedIn,
  signOutAdmin,
  resetSiteContentToDefaults,
} from "@/lib/site-storage";

describe("App routing", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

  const routesToTest = [
    "/",
    "/about",
    "/products",
    "/services",
    "/gallery",
    "/careers",
    "/blogs",
    "/contact",
    "/admin",
    "/admin/dashboard",
  ];

  routesToTest.forEach((path) => {
    it(`matches a page for route "${path}"`, () => {
      const matches = router.matchRoutes(path);
      expect(matches.length).toBeGreaterThan(0);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    });
  });
});

describe("Local Storage Content & Auth Management", () => {
  it("loads default mock data with required sections", () => {
    const data = readSiteContent();
    expect(data.products).toBeDefined();
    expect(data.services).toBeDefined();
    expect(data.machines).toBeDefined();
    expect(data.gallery).toBeDefined();
    expect(data.testimonials).toBeDefined();
    expect(data.clients).toBeDefined();
    expect(data.careers).toBeDefined();
    expect(data.blogs).toBeDefined();
    expect(data.faqs).toBeDefined();
    expect(data.statistics).toBeDefined();
    expect(data["why-choose-us"]).toBeDefined();
    expect(data.contact).toBeDefined();
    expect(data.settings).toBeDefined();

    // Verify minimum counts
    expect(data.products.length).toBeGreaterThanOrEqual(6);
    expect(data.services.length).toBeGreaterThanOrEqual(8);
    expect(data.faqs.length).toBeGreaterThanOrEqual(10);
    expect(data.testimonials.length).toBeGreaterThanOrEqual(5);
  });

  it("handles writeSiteCollection updates", () => {
    const initial = readSiteContent();
    const testItem = { name: "Test Custom CNC SPM", description: "Automated test item" };
    writeSiteCollection("products", [testItem, ...initial.products]);

    const updated = readSiteContent();
    expect(updated.products[0]?.name).toBe("Test Custom CNC SPM");

    // Clean up
    resetSiteContentToDefaults();
  });

  it("authenticates admin credentials properly", () => {
    signOutAdmin();
    expect(isAdminSignedIn()).toBe(false);

    // Invalid credentials
    expect(signInAdmin("wrong", "credentials")).toBe(false);
    expect(isAdminSignedIn()).toBe(false);

    // Valid credentials (admin / admin123)
    expect(signInAdmin("admin", "admin123")).toBe(true);
    expect(isAdminSignedIn()).toBe(true);

    // Sign out
    signOutAdmin();
    expect(isAdminSignedIn()).toBe(false);
  });
});
