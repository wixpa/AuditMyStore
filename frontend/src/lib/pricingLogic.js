/**
 * Pricing Logic Module
 * Central configuration for all pricing tiers, limits, and helpers.
 * Easy to adjust pricing, limits, and conditions later.
 */

export const YEARLY_DISCOUNT = 0.2; // 20% off for yearly

export const PRICING_TIERS = [
   {
      id: "starter",
      name: "Starter",
      tagline: "Try it out",
      monthlyPrice: 0,
      yearlyPrice: 0,
      period: "forever",
      description: "Perfect for trying out your first store audit",
      features: [
         "1 free audit per month",
         "Home Page audit only",
         "Basic CRO insights",
         "AI-powered analysis",
         "Email report delivery",
      ],
      limits: {
         auditsPerMonth: 1,
         pagesPerAudit: 1,
         historicalReports: 0,
         prioritySupport: false,
         whiteLabel: false,
      },
      cta: "Start Free Audit",
      ctaVariant: "outline",
      highlighted: false,
      badge: null,
   },
   {
      id: "growth",
      name: "Growth",
      tagline: "Most popular",
      monthlyPrice: 29,
      yearlyPrice: Math.round(29 * 12 * (1 - YEARLY_DISCOUNT)),
      period: "/month",
      description: "For growing stores that need regular optimization",
      features: [
         "10 audits per month",
         "All 4 page types",
         "Advanced CRO + SEO insights",
         "AI-powered analysis",
         "Priority email support",
         "Historical report access",
         "Export to PDF",
      ],
      limits: {
         auditsPerMonth: 10,
         pagesPerAudit: 4,
         historicalReports: 30,
         prioritySupport: true,
         whiteLabel: false,
      },
      cta: "Get Started",
      ctaVariant: "primary",
      highlighted: true,
      badge: "Most Popular",
   },
   {
      id: "agency",
      name: "Agency",
      tagline: "For teams",
      monthlyPrice: 79,
      yearlyPrice: Math.round(79 * 12 * (1 - YEARLY_DISCOUNT)),
      period: "/month",
      description: "For agencies managing multiple client stores",
      features: [
         "Unlimited audits",
         "All 4 page types",
         "Full CRO + SEO + UX insights",
         "AI-powered analysis",
         "Priority Slack/email support",
         "Unlimited report history",
         "Export to PDF & CSV",
         "White-label reports",
         "Team member access",
      ],
      limits: {
         auditsPerMonth: -1, // unlimited
         pagesPerAudit: 4,
         historicalReports: -1, // unlimited
         prioritySupport: true,
         whiteLabel: true,
      },
      cta: "Contact Sales",
      ctaVariant: "outline",
      highlighted: false,
      badge: "Best Value",
   },
];

/**
 * Get a pricing tier by its id
 * @param {string} id
 * @returns {object|undefined}
 */
export function getTierById(id) {
   return PRICING_TIERS.find((t) => t.id === id);
}

/**
 * Get the display price based on billing period
 * @param {object} tier
 * @param {boolean} yearly
 * @returns {number}
 */
export function getDisplayPrice(tier, yearly = false) {
   if (tier.monthlyPrice === 0) return 0;
   if (yearly) return Math.round(tier.yearlyPrice / 12);
   return tier.monthlyPrice;
}

/**
 * Check if a user can run another audit based on their tier and current usage
 * @param {object} tier
 * @param {number} currentUsage - audits used this month
 * @returns {{ allowed: boolean, reason: string }}
 */
export function canRunAudit(tier, currentUsage = 0) {
   if (tier.limits.auditsPerMonth === -1)
      return { allowed: true, reason: "Unlimited audits" };
   if (currentUsage < tier.limits.auditsPerMonth)
      return { allowed: true, reason: `${tier.limits.auditsPerMonth - currentUsage} audits remaining` };
   return {
      allowed: false,
      reason: `Monthly limit reached (${tier.limits.auditsPerMonth} audits). Upgrade for more.`,
   };
}

/**
 * Check if a feature is available for a given tier
 * @param {string} tierId
 * @param {string} feature - key from limits object
 * @returns {boolean}
 */
export function getFeatureAccess(tierId, feature) {
   const tier = getTierById(tierId);
   if (!tier) return false;
   const value = tier.limits[feature];
   if (typeof value === "boolean") return value;
   if (typeof value === "number") return value !== 0;
   return false;
}
