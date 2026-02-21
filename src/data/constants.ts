export const CHECKLIST_TEMPLATES = [
  { id: 'meta', category: 'SEO & Meta', label: 'Meta tags & title', priority: 'high' },
  { id: 'og', category: 'SEO & Meta', label: 'Open Graph tags', priority: 'medium' },
  { id: 'favicon', category: 'SEO & Meta', label: 'Favicon & app icons', priority: 'low' },
  { id: 'sitemap', category: 'SEO & Meta', label: 'Sitemap.xml', priority: 'low' },

  { id: 'analytics', category: 'Tracking', label: 'Analytics setup', priority: 'medium' },
  { id: 'error-tracking', category: 'Tracking', label: 'Error tracking', priority: 'medium' },
  { id: 'rate-limit', category: 'Tracking', label: 'Rate limiting', priority: 'high' },

  { id: 'https', category: 'Security', label: 'HTTPS enabled', priority: 'high' },
  { id: 'env-vars', category: 'Security', label: 'Env vars secured', priority: 'high' },
  { id: 'cors', category: 'Security', label: 'CORS configured', priority: 'medium' },
  { id: 'auth', category: 'Security', label: 'Auth implemented', priority: 'high' },

  { id: 'responsive', category: 'Performance & UX', label: 'Mobile responsive', priority: 'high' },
  { id: 'loading', category: 'Performance & UX', label: 'Loading states', priority: 'medium' },
  { id: 'error-states', category: 'Performance & UX', label: 'Error states', priority: 'medium' },
  { id: 'a11y', category: 'Performance & UX', label: 'Accessibility basics', priority: 'medium' },
  { id: 'images', category: 'Performance & UX', label: 'Image optimization', priority: 'low' },

  { id: 'domain', category: 'Launch', label: 'Custom domain', priority: 'medium' },
  { id: 'backup', category: 'Launch', label: 'Backup strategy', priority: 'low' },
  { id: 'docs', category: 'Launch', label: 'Documentation', priority: 'low' },
  { id: 'legal', category: 'Launch', label: 'Privacy/Terms', priority: 'medium' },
  { id: 'monitoring', category: 'Launch', label: 'Uptime monitoring', priority: 'medium' },
  { id: 'social', category: 'Launch', label: 'Social presence', priority: 'low' }
];

export const SERVICE_PRESETS = [
  { name: 'Claude API', icon: '🤖', color: '#D97757' },
  { name: 'Cursor', icon: '💻', color: '#7C3AED' },
  { name: 'Vercel', icon: '▲', color: '#000000' },
  { name: 'Supabase', icon: '⚡', color: '#3ECF8E' },
  { name: 'OpenAI', icon: '🧠', color: '#10A37F' },
  { name: 'Domain', icon: '🌐', color: '#0EA5E9' },
  { name: 'Email Service', icon: '📧', color: '#EAB308' },
  { name: 'Storage', icon: '💾', color: '#8B5CF6' },
  { name: 'CDN', icon: '🚀', color: '#EC4899' },
  { name: 'Analytics', icon: '📊', color: '#06B6D4' },
  { name: 'Monitoring', icon: '👀', color: '#F59E0B' },
  { name: 'Design Tools', icon: '🎨', color: '#EF4444' },
  { name: 'Marketing', icon: '📣', color: '#84CC16' },
  { name: 'Misc', icon: '🔧', color: '#64748B' },
  { name: 'Other', icon: '📦', color: '#6366F1' }
];

export const REVENUE_SOURCES = [
  { name: 'Stripe', icon: '💳', color: '#635BFF' },
  { name: 'PayPal', icon: '🔷', color: '#00457C' },
  { name: 'Gumroad', icon: '🛒', color: '#FF90E8' },
  { name: 'Ads', icon: '📱', color: '#4285F4' },
  { name: 'Sponsorship', icon: '🤝', color: '#00D4FF' },
  { name: 'Consulting', icon: '💼', color: '#8B5CF6' },
  { name: 'License', icon: '📜', color: '#10B981' },
  { name: 'Other', icon: '💰', color: '#F59E0B' }
];

export const PROJECT_STATUSES = [
  { key: 'building', label: '🔨 Building', color: '#FFD166' },
  { key: 'testing', label: '🧪 Testing', color: '#B362FF' },
  { key: 'shipped', label: '🚀 Shipped', color: '#00FFB2' },
  { key: 'earning', label: '💰 Earning', color: '#4ADE80' },
  { key: 'archived', label: '💀 Archived', color: '#64748B' }
];

export const XP_ACTIONS = {
  checklist_item: { xp: 10, label: 'Checklist item completed' },
  cost_logged: { xp: 5, label: 'Cost logged' },
  revenue_logged: { xp: 10, label: 'Revenue logged' },
  code_review: { xp: 20, label: 'Code reviewed' },
  clean_code_bonus: { xp: 15, label: 'Clean code bonus' },
  project_shipped: { xp: 100, label: 'Project shipped' },
  first_revenue: { xp: 50, label: 'First revenue' },
  project_created: { xp: 10, label: 'Project created' }
};

export const XP_LEVELS = [
  { level: 1, title: 'Newbie', xp: 0, color: '#94A3B8' },
  { level: 2, title: 'Builder', xp: 100, color: '#60A5FA' },
  { level: 3, title: 'Shipper', xp: 300, color: '#A78BFA' },
  { level: 4, title: 'Hustler', xp: 600, color: '#F472B6' },
  { level: 5, title: 'Indie Hacker', xp: 1000, color: '#FBBF24' },
  { level: 6, title: 'Serial Shipper', xp: 1800, color: '#34D399' },
  { level: 7, title: 'Vibe Lord', xp: 3000, color: '#00FFB2' }
];

export const ACHIEVEMENTS = [
  { key: 'first_ship', icon: '🚀', title: 'First Ship', desc: 'Complete 100% checklist', color: '#00FFB2' },
  { key: 'clean_code', icon: '✨', title: 'Clean Code', desc: 'Get 9+ review score', color: '#60A5FA' },
  { key: 'profit_mode', icon: '💰', title: 'Profit Mode', desc: 'Revenue exceeds costs', color: '#4ADE80' },
  { key: 'budget_hawk', icon: '🦅', title: 'Budget Hawk', desc: 'Stay under budget', color: '#FBBF24' },
  { key: 'speed_demon', icon: '⚡', title: 'Speed Demon', desc: 'Ship in 7 days', color: '#FFD166' },
  { key: 'diversified', icon: '📊', title: 'Diversified', desc: 'Create 5+ projects', color: '#B362FF' },
  { key: 'penny_pincher', icon: '🪙', title: 'Penny Pincher', desc: 'Project under $10', color: '#34D399' },
  { key: 'streak_3', icon: '🔥', title: 'On Fire', desc: '3-day streak', color: '#FF6B6B' },
  { key: 'streak_7', icon: '🔥', title: 'Streak Week', desc: '7-day streak', color: '#F97316' },
  { key: 'streak_30', icon: '👑', title: 'Streak Lord', desc: '30-day streak', color: '#FFD700' },
  { key: 'code_critic', icon: '🔍', title: 'Code Critic', desc: '10 code reviews', color: '#A78BFA' },
  { key: 'investor', icon: '💸', title: 'Investor', desc: '$500+ total spend', color: '#EC4899' }
];

export function getLevel(xp: number) {
  for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= XP_LEVELS[i].xp) {
      return XP_LEVELS[i];
    }
  }
  return XP_LEVELS[0];
}

export function getNextLevel(xp: number) {
  const current = getLevel(xp);
  const currentIndex = XP_LEVELS.findIndex(l => l.level === current.level);
  return currentIndex < XP_LEVELS.length - 1 ? XP_LEVELS[currentIndex + 1] : null;
}

export function getLevelProgress(xp: number) {
  const current = getLevel(xp);
  const next = getNextLevel(xp);
  if (!next) return 100;
  const range = next.xp - current.xp;
  const progress = xp - current.xp;
  return Math.min(100, Math.round((progress / range) * 100));
}

export const DEMO_PROJECTS = [
  {
    id: 'demo-1',
    name: 'SaaS Landing Page',
    emoji: '🚀',
    status: 'shipped',
    budget: 50,
    createdAt: '2025-01-15',
    checklist: {
      meta: true, og: true, favicon: true, https: true, responsive: true,
      analytics: true, domain: true, 'env-vars': true, loading: true,
      'error-states': true, a11y: true, legal: true
    },
    costs: [
      { id: 'c1', service: 'Claude API', amount: 12.40, date: '2025-01-18', note: 'Initial build' },
      { id: 'c2', service: 'Vercel', amount: 0, date: '2025-01-18', note: 'Free tier' },
      { id: 'c3', service: 'Domain', amount: 12, date: '2025-01-20', note: 'coolsite.dev' }
    ],
    revenues: [
      { id: 'r1', source: 'Stripe', amount: 49, date: '2025-02-01', note: 'First customer!' },
      { id: 'r2', source: 'Stripe', amount: 49, date: '2025-02-15', note: 'Second sub' }
    ],
    codeReviews: []
  },
  {
    id: 'demo-2',
    name: 'AI Chatbot Widget',
    emoji: '🤖',
    status: 'building',
    budget: 100,
    createdAt: '2025-02-01',
    checklist: { https: true, 'env-vars': true, responsive: true, 'rate-limit': true },
    costs: [
      { id: 'c5', service: 'Claude API', amount: 24.80, date: '2025-02-10', note: 'Heavy API usage' },
      { id: 'c6', service: 'Cursor', amount: 20, date: '2025-02-01', note: 'Monthly sub' }
    ],
    revenues: [],
    codeReviews: []
  }
];

export const DEMO_PROFILE = {
  xp: 285,
  streak_days: 4,
  monthly_budget: 150,
  achievements: ['streak_3']
};

export const PROJECT_EMOJIS = ['🚀', '🤖', '💻', '⚡', '🎨', '🔥', '💎', '🌟', '🎯', '🏆', '🌈', '✨'];
