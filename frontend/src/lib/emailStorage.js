/**
 * Email Storage & Validation Module
 * Uses localStorage to persist collected emails (comma-separated).
 */

const STORAGE_KEY = "auditmystore_emails";

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
export function validateEmail(email) {
   if (!email || typeof email !== "string") return false;
   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return re.test(email.trim());
}

/**
 * Get all stored emails as an array
 * @returns {string[]}
 */
export function getEmails() {
   try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      return raw
         .split(",")
         .map((e) => e.trim())
         .filter(Boolean);
   } catch {
      return [];
   }
}

/**
 * Save an email to localStorage (deduplicates)
 * @param {string} email
 * @returns {{ success: boolean, message: string }}
 */
export function saveEmail(email) {
   const trimmed = email?.trim().toLowerCase();
   if (!trimmed) return { success: false, message: "Email is required." };
   if (!validateEmail(trimmed))
      return { success: false, message: "Invalid email format." };

   try {
      const existing = getEmails();
      if (existing.includes(trimmed)) {
         return { success: true, message: "Email already saved." };
      }
      existing.push(trimmed);
      localStorage.setItem(STORAGE_KEY, existing.join(","));
      return { success: true, message: "Email saved successfully." };
   } catch {
      return { success: false, message: "Failed to save email." };
   }
}
