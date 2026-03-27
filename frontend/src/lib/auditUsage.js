/**
 * Audit usage tracking (client-side, localStorage).
 *
 * Requirements implemented:
 * - Anonymous users can run only 1 audit total (Home Page), after which they must sign up.
 * - Logged-in users can run up to MAX_LOGGED_IN_AUDITS audits total.
 */

const ANON_AUDIT_USED_KEY = "auditmystore_anon_audit_used_v1";
const ANON_SESSION_KEY = "auditmystore_anon_session_v1";
const USER_USAGE_KEY = "auditmystore_user_audit_usage_v1";

export const MAX_LOGGED_IN_AUDITS = 5;

function safeParse(raw, fallback) {
   try {
      return raw ? JSON.parse(raw) : fallback;
   } catch {
      return fallback;
   }
}

function getUserUsageMap() {
   return safeParse(localStorage.getItem(USER_USAGE_KEY), {});
}

function saveUserUsageMap(map) {
   localStorage.setItem(USER_USAGE_KEY, JSON.stringify(map));
}

// ─────────────────────────────────────────────────────────────────────────────
// Anonymous usage
// ─────────────────────────────────────────────────────────────────────────────
export function getAnonAuditUsed() {
   return localStorage.getItem(ANON_AUDIT_USED_KEY) === "true";
}

export function markAnonAuditUsed() {
   localStorage.setItem(ANON_AUDIT_USED_KEY, "true");
}

/**
 * Stores the email + store origin for the current anonymous flow.
 * Used to ensure anonymous "email-first" is completed before showing the dashboard.
 */
export function setAnonAuditSession({ email, storeOrigin }) {
   const payload = {
      email: (email || "").trim().toLowerCase(),
      storeOrigin: storeOrigin || "",
      createdAt: new Date().toISOString(),
   };
   localStorage.setItem(ANON_SESSION_KEY, JSON.stringify(payload));
}

export function getAnonAuditSession() {
   return safeParse(localStorage.getItem(ANON_SESSION_KEY), null);
}

// ─────────────────────────────────────────────────────────────────────────────
// Logged-in usage
// ─────────────────────────────────────────────────────────────────────────────
export function getUserAuditUsedCount(email) {
   const key = (email || "").trim().toLowerCase();
   if (!key) return 0;
   const map = getUserUsageMap();
   return Number(map?.[key]?.used ?? 0);
}

export function getUserAuditRemaining(email, max = MAX_LOGGED_IN_AUDITS) {
   const used = getUserAuditUsedCount(email);
   return Math.max(0, max - used);
}

/**
 * Increments the audit counter for a user. Meant to be called after an audit
 * successfully completes (data rendered).
 */
export function incrementUserAuditUsedCount(email, max = MAX_LOGGED_IN_AUDITS) {
   const key = (email || "").trim().toLowerCase();
   if (!key) return 0;
   const map = getUserUsageMap();
   const nextUsed = Math.min(
      max + 999999, // allow increment beyond max to avoid edge race, while still useful
      Number(map?.[key]?.used ?? 0) + 1,
   );
   map[key] = { ...(map?.[key] ?? {}), used: nextUsed, updatedAt: new Date().toISOString() };
   saveUserUsageMap(map);
   return nextUsed;
}

