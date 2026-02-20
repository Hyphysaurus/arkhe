// ─── Ship Checklist Templates ───
export const CHECKLIST_TEMPLATES = [
  { id: "meta", category: "SEO & Meta", label: "Meta title & description set", priority: "high" },
  { id: "og", category: "SEO & Meta", label: "Open Graph / social preview images", priority: "high" },
  { id: "favicon", category: "SEO & Meta", label: "Favicon added", priority: "medium" },
  { id: "sitemap", category: "SEO & Meta", label: "Sitemap.xml generated", priority: "low" },
  { id: "canonical", category: "SEO & Meta", label: "Canonical URLs configured", priority: "low" },
  { id: "analytics", category: "Tracking", label: "Analytics installed (Plausible, GA, etc.)", priority: "high" },
  { id: "error-tracking", category: "Tracking", label: "Error tracking set up (Sentry, etc.)", priority: "medium" },
  { id: "https", category: "Security", label: "HTTPS enabled", priority: "high" },
  { id: "env-vars", category: "Security", label: "API keys in env vars (not hardcoded)", priority: "high" },
  { id: "rate-limit", category: "Security", label: "Rate limiting on API routes", priority: "medium" },
  { id: "auth", category: "Security", label: "Auth / protected routes working", priority: "medium" },
  { id: "cors", category: "Security", label: "CORS properly configured", priority: "medium" },
  { id: "responsive", category: "Performance & UX", label: "Mobile responsive", priority: "high" },
  { id: "loading", category: "Performance & UX", label: "Loading states for async actions", priority: "medium" },
  { id: "error-states", category: "Performance & UX", label: "Error states & empty states handled", priority: "medium" },
  { id: "404", category: "Performance & UX", label: "Custom 404 page", priority: "low" },
  { id: "lighthouse", category: "Performance & UX", label: "Lighthouse score > 90", priority: "low" },
  { id: "a11y", category: "Performance & UX", label: "Basic accessibility (alt tags, focus states)", priority: "medium" },
  { id: "backup", category: "Launch", label: "Database backup strategy", priority: "medium" },
  { id: "domain", category: "Launch", label: "Custom domain connected", priority: "high" },
  { id: "readme", category: "Launch", label: "README / documentation updated", priority: "low" },
  { id: "legal", category: "Launch", label: "Privacy policy / Terms of service", priority: "medium" },
];

export const SERVICE_PRESETS = [
  { name: "Claude API", icon: "⚡", color: "#D4A574" },
  { name: "Cursor", icon: "▊", color: "#00D4AA" },
  { name: "GPT / OpenAI", icon: "◉", color: "#74AA9C" },
  { name: "Vercel", icon: "▲", color: "#ffffff" },
  { name: "Supabase", icon: "⬡", color: "#3ECF8E" },
  { name: "Netlify", icon: "◆", color: "#00C7B7" },
  { name: "Railway", icon: "▣", color: "#B362FF" },
  { name: "Replit", icon: "◈", color: "#F26207" },
  { name: "Cloudflare", icon: "☁", color: "#F6821F" },
  { name: "Firebase", icon: "🔥", color: "#FFCA28" },
  { name: "AWS", icon: "◧", color: "#FF9900" },
  { name: "Render", icon: "◎", color: "#46E3B7" },
  { name: "Stripe", icon: "💳", color: "#635BFF" },
  { name: "Domain", icon: "🌐", color: "#4A9EFF" },
  { name: "Other", icon: "◌", color: "#888888" },
];

export const REVENUE_SOURCES = [
  { name: "Stripe", icon: "💳", color: "#635BFF" },
  { name: "Gumroad", icon: "🛒", color: "#FF90E8" },
  { name: "LemonSqueezy", icon: "🍋", color: "#FFC233" },
  { name: "Ads", icon: "📢", color: "#4CAF50" },
  { name: "Sponsorship", icon: "🤝", color: "#FF9800" },
  { name: "Affiliate", icon: "🔗", color: "#9C27B0" },
  { name: "Direct Sale", icon: "💵", color: "#2E7D32" },
  { name: "Other", icon: "◌", color: "#888888" },
];

export const PROJECT_STATUSES = [
  { key: "building", label: "Building", icon: "🔨", color: "#FFD166" },
  { key: "testing", label: "Testing", icon: "🧪", color: "#B362FF" },
  { key: "shipped", label: "Shipped", icon: "🚀", color: "#00FFB2" },
  { key: "earning", label: "Earning", icon: "💰", color: "#4ADE80" },
  { key: "archived", label: "Archived", icon: "💀", color: "#666666" },
];

export const XP_ACTIONS = {
  CHECKLIST_ITEM: { xp: 10, label: "Checklist item completed" },
  COST_LOGGED: { xp: 5, label: "Cost logged" },
  REVENUE_LOGGED: { xp: 10, label: "Revenue logged" },
  CODE_REVIEW: { xp: 20, label: "Code review completed" },
  CODE_REVIEW_BONUS: { xp: 15, label: "Clean code bonus (8+)" },
  PROJECT_SHIPPED: { xp: 100, label: "Project shipped!" },
  FIRST_REVENUE: { xp: 50, label: "First revenue!" },
  PROJECT_CREATED: { xp: 10, label: "New project started" },
};

export const XP_LEVELS = [
  { level: 1, xp: 0, title: "Newbie", icon: "🌱" },
  { level: 2, xp: 100, title: "Builder", icon: "🔨" },
  { level: 3, xp: 300, title: "Shipper", icon: "📦" },
  { level: 4, xp: 600, title: "Hustler", icon: "⚡" },
  { level: 5, xp: 1000, title: "Indie Hacker", icon: "🚀" },
  { level: 6, xp: 1800, title: "Serial Shipper", icon: "🔥" },
  { level: 7, xp: 3000, title: "Vibe Lord", icon: "👑" },
];

export const ACHIEVEMENTS = [
  { key: "first_ship", icon: "🚀", title: "First Ship", desc: "Ship your first project (100% checklist)", color: "#00FFB2" },
  { key: "clean_code", icon: "✨", title: "Clean Code", desc: "Get a 9+ code review score", color: "#B362FF" },
  { key: "profit_mode", icon: "💰", title: "Profit Mode", desc: "Revenue exceeds costs on a project", color: "#4ADE80" },
  { key: "budget_hawk", icon: "🦅", title: "Budget Hawk", desc: "Stay under monthly budget", color: "#FFD166" },
  { key: "speed_demon", icon: "⚡", title: "Speed Demon", desc: "Ship a project within 7 days", color: "#FF6B6B" },
  { key: "diversified", icon: "📊", title: "Diversified", desc: "Have 5+ projects", color: "#4A9EFF" },
  { key: "penny_pincher", icon: "🪙", title: "Penny Pincher", desc: "Complete a project for under $10", color: "#F6821F" },
  { key: "streak_3", icon: "🔥", title: "On Fire", desc: "3-day activity streak", color: "#FF6B6B" },
  { key: "streak_7", icon: "🔥", title: "Streak Week", desc: "7-day activity streak", color: "#FF9800" },
  { key: "streak_30", icon: "👑", title: "Streak Lord", desc: "30-day activity streak", color: "#FFD700" },
  { key: "reviewer", icon: "🔍", title: "Code Critic", desc: "Complete 10 code reviews", color: "#00D4AA" },
  { key: "big_spender", icon: "💸", title: "Investor", desc: "Spend $500+ across all projects", color: "#B362FF" },
];

export function getLevel(xp) {
  let current = XP_LEVELS[0];
  for (const level of XP_LEVELS) {
    if (xp >= level.xp) current = level;
    else break;
  }
  return current;
}

export function getNextLevel(xp) {
  for (const level of XP_LEVELS) {
    if (xp < level.xp) return level;
  }
  return null;
}

export function getLevelProgress(xp) {
  const current = getLevel(xp);
  const next = getNextLevel(xp);
  if (!next) return 100;
  const range = next.xp - current.xp;
  const progress = xp - current.xp;
  return Math.round((progress / range) * 100);
}
