export interface Integration {
  id: string;
  name: string;
  category: 'ai' | 'development' | 'analytics' | 'productivity' | 'communication';
  description: string;
  icon: string;
  pricing: 'free' | 'paid' | 'freemium';
  apiAvailable: boolean;
  costTracking: boolean;
  connected: boolean;
}

export const INTEGRATIONS: Integration[] = [
  {
    id: 'claude',
    name: 'Claude API',
    category: 'ai',
    description: 'Anthropic Claude for AI conversations and code generation',
    icon: '🤖',
    pricing: 'paid',
    apiAvailable: true,
    costTracking: true,
    connected: false
  },
  {
    id: 'cursor',
    name: 'Cursor',
    category: 'ai',
    description: 'AI-first code editor with GPT-4 integration',
    icon: '⚡',
    pricing: 'freemium',
    apiAvailable: false,
    costTracking: true,
    connected: false
  },
  {
    id: 'openai',
    name: 'OpenAI API',
    category: 'ai',
    description: 'GPT-4, GPT-3.5, DALL-E, and Whisper APIs',
    icon: '🧠',
    pricing: 'paid',
    apiAvailable: true,
    costTracking: true,
    connected: false
  },
  {
    id: 'bolt',
    name: 'Bolt.new',
    category: 'ai',
    description: 'Full-stack web app generator by StackBlitz',
    icon: '⚙️',
    pricing: 'freemium',
    apiAvailable: false,
    costTracking: true,
    connected: false
  },
  {
    id: 'v0',
    name: 'Vercel v0',
    category: 'ai',
    description: 'AI-powered UI component generator',
    icon: '🎨',
    pricing: 'freemium',
    apiAvailable: false,
    costTracking: true,
    connected: false
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    category: 'ai',
    description: 'AI pair programmer by GitHub',
    icon: '👨‍💻',
    pricing: 'paid',
    apiAvailable: false,
    costTracking: true,
    connected: false
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    category: 'ai',
    description: 'AI image generation for design assets',
    icon: '🎭',
    pricing: 'paid',
    apiAvailable: false,
    costTracking: true,
    connected: false
  },
  {
    id: 'replicate',
    name: 'Replicate',
    category: 'ai',
    description: 'Run AI models via API',
    icon: '🔄',
    pricing: 'paid',
    apiAvailable: true,
    costTracking: true,
    connected: false
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'development',
    description: 'Repository management and version control',
    icon: '🐙',
    pricing: 'freemium',
    apiAvailable: true,
    costTracking: false,
    connected: false
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'development',
    description: 'Deployment and hosting platform',
    icon: '▲',
    pricing: 'freemium',
    apiAvailable: true,
    costTracking: true,
    connected: false
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'development',
    description: 'Open source Firebase alternative',
    icon: '⚡',
    pricing: 'freemium',
    apiAvailable: true,
    costTracking: true,
    connected: true
  },
  {
    id: 'stripe',
    name: 'Stripe',
    category: 'analytics',
    description: 'Payment processing and revenue tracking',
    icon: '💳',
    pricing: 'free',
    apiAvailable: true,
    costTracking: false,
    connected: false
  },
  {
    id: 'plausible',
    name: 'Plausible',
    category: 'analytics',
    description: 'Privacy-friendly web analytics',
    icon: '📊',
    pricing: 'paid',
    apiAvailable: true,
    costTracking: true,
    connected: false
  },
  {
    id: 'posthog',
    name: 'PostHog',
    category: 'analytics',
    description: 'Product analytics and feature flags',
    icon: '📈',
    pricing: 'freemium',
    apiAvailable: true,
    costTracking: true,
    connected: false
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    category: 'analytics',
    description: 'Web traffic and user behavior tracking',
    icon: '📉',
    pricing: 'free',
    apiAvailable: true,
    costTracking: false,
    connected: false
  },
  {
    id: 'notion',
    name: 'Notion',
    category: 'productivity',
    description: 'Workspace for notes and documentation',
    icon: '📝',
    pricing: 'freemium',
    apiAvailable: true,
    costTracking: false,
    connected: false
  },
  {
    id: 'linear',
    name: 'Linear',
    category: 'productivity',
    description: 'Issue tracking and project management',
    icon: '📋',
    pricing: 'paid',
    apiAvailable: true,
    costTracking: false,
    connected: false
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'productivity',
    description: 'Design and prototyping tool',
    icon: '🎨',
    pricing: 'freemium',
    apiAvailable: true,
    costTracking: false,
    connected: false
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'communication',
    description: 'Team communication and notifications',
    icon: '💬',
    pricing: 'freemium',
    apiAvailable: true,
    costTracking: false,
    connected: false
  },
  {
    id: 'discord',
    name: 'Discord',
    category: 'communication',
    description: 'Community and team chat',
    icon: '🎮',
    pricing: 'freemium',
    apiAvailable: true,
    costTracking: false,
    connected: false
  },
  {
    id: 'resend',
    name: 'Resend',
    category: 'communication',
    description: 'Email API for developers',
    icon: '📧',
    pricing: 'freemium',
    apiAvailable: true,
    costTracking: true,
    connected: false
  }
];

export const getCategoryLabel = (category: Integration['category']): string => {
  const labels: Record<Integration['category'], string> = {
    ai: 'AI Tools',
    development: 'Development',
    analytics: 'Analytics',
    productivity: 'Productivity',
    communication: 'Communication'
  };
  return labels[category];
};

export const getIntegrationsByCategory = (category: Integration['category']) => {
  return INTEGRATIONS.filter(i => i.category === category);
};

export const getConnectedIntegrations = () => {
  return INTEGRATIONS.filter(i => i.connected);
};

export const getCostTrackingIntegrations = () => {
  return INTEGRATIONS.filter(i => i.costTracking);
};
