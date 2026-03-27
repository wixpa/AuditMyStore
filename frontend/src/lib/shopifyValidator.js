/**
 * Shopify Store Validator
 * 
 * Detects Shopify stores by checking for Shopify signatures in the HTML.
 * Every Shopify store (even on custom domains like avojoy.org) has
 * Shopify-specific code in its HTML source — e.g. cdn.shopify.com scripts,
 * Shopify.theme, meta tags with shopify, etc.
 * 
 * Strategy:
 * 1. If URL contains .myshopify.com → instant pass (always Shopify)
 * 2. Otherwise → fetch HTML via CORS proxy, scan for Shopify fingerprints
 * 3. If CORS proxy fails → let user proceed (don't block, we can't verify)
 */

/**
 * Normalize a URL string — add protocol if missing
 */
export function normalizeUrl(url) {
   let u = url.trim();
   if (!/^https?:\/\//i.test(u)) u = "https://" + u;
   // Remove trailing slash for consistency
   return u.replace(/\/+$/, "");
}

/**
 * Shopify fingerprints found in HTML source of every Shopify store.
 * Weighted by reliability — stronger signals get higher weight.
 */
const SHOPIFY_SIGNALS = [
   { pattern: "cdn.shopify.com", weight: 3 },
   { pattern: "Shopify.theme", weight: 3 },
   { pattern: "Shopify.routes", weight: 3 },
   { pattern: "myshopify.com", weight: 2 },
   { pattern: "shopify-section", weight: 2 },
   { pattern: "shopify-features", weight: 2 },
   { pattern: "shopify-payment-button", weight: 2 },
   { pattern: "shopify-digital-wallet", weight: 2 },
   { pattern: '"shopify"', weight: 1 },
   { pattern: "Shopify.shop", weight: 2 },
   { pattern: "Shopify.currency", weight: 2 },
   { pattern: "Shopify.locale", weight: 2 },
   { pattern: "shopify_pay", weight: 2 },
   { pattern: "data-shopify", weight: 2 },
   { pattern: "checkout.shopify.com", weight: 3 },
];

// Minimum total weight needed to confirm Shopify
const SHOPIFY_THRESHOLD = 3;

/**
 * Fetch HTML through a CORS proxy and check for Shopify signatures
 */
async function checkHtmlForShopify(url) {
   const proxyUrls = [
      `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
      `https://corsproxy.io/?${encodeURIComponent(url)}`,
   ];

   for (const proxyUrl of proxyUrls) {
      try {
         const controller = new AbortController();
         const timeout = setTimeout(() => controller.abort(), 8000);

         const resp = await fetch(proxyUrl, {
            signal: controller.signal,
         });
         clearTimeout(timeout);

         if (!resp.ok) continue;

         const html = await resp.text();
         const htmlLower = html.toLowerCase();

         // Calculate total weight of matched signals
         let totalWeight = 0;
         const matchedSignals = [];

         for (const signal of SHOPIFY_SIGNALS) {
            if (htmlLower.includes(signal.pattern.toLowerCase())) {
               totalWeight += signal.weight;
               matchedSignals.push(signal.pattern);
            }
         }

         return {
            isShopify: totalWeight >= SHOPIFY_THRESHOLD,
            totalWeight,
            matchedSignals,
            method: totalWeight >= SHOPIFY_THRESHOLD
               ? "html-verified"
               : "not-detected",
         };
      } catch {
         // This proxy failed, try next one
         continue;
      }
   }

   // All proxies failed — we CANNOT verify, don't block the user
   return {
      isShopify: true, // Assume true — let user proceed
      totalWeight: 0,
      matchedSignals: [],
      method: "proxy-unavailable", // We couldn't check, but won't block
   };
}

/**
 * Main validation function.
 * 
 * @param {string} rawUrl - The store URL to validate
 * @returns {Promise<{ isShopify: boolean, method: string }>}
 */
export async function validateShopifyStore(rawUrl) {
   const url = normalizeUrl(rawUrl);

   // Quick check: .myshopify.com domains are always Shopify
   if (/\.myshopify\.com/i.test(url)) {
      return { isShopify: true, method: "myshopify-domain" };
   }

   // Deep check: fetch HTML and look for Shopify fingerprints
   return await checkHtmlForShopify(url);
}

/**
 * Extract the "store origin" (scheme + host) from any URL-like input.
 * Example: https://example.com/cart -> https://example.com
 */
export function extractStoreOrigin(rawUrl) {
   const normalized = normalizeUrl(rawUrl || "");
   try {
      const u = new URL(normalized);
      return u.origin;
   } catch {
      // Best-effort fallback (rare)
      const host = normalized.replace(/^https?:\/\//i, "").split("/")[0];
      return `https://${host}`;
   }
}
