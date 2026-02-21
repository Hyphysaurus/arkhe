export interface Lesson {
  id: string;
  title: string;
  greekTitle: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  concepts: string[];
  codeExample?: string;
  vibePrompt?: string;
  tryIt?: string;
}

export interface LearningModule {
  id: string;
  title: string;
  greekConcept: string;
  icon: string;
  description: string;
  lessons: Lesson[];
}

export const glossary = [
  {
    term: 'Vibe Coding',
    greek: 'Ῥυθμός Κώδικα',
    definition: 'Describing what you want in natural language, letting AI translate your intent into code. Focus on the "what" not the "how".',
    example: '"Make it shimmer like obsidian glass" → AI generates the CSS/animations'
  },
  {
    term: 'Prompt Engineering',
    greek: 'Τέχνη Λόγου',
    definition: 'The art of crafting effective instructions for AI. Clear context + specific intent = better results.',
    example: '"Add a dark mode toggle" vs "Create a theme switcher with glass morphism effects that persists to localStorage"'
  },
  {
    term: 'Context Window',
    greek: 'Παράθυρον Μνήμης',
    definition: 'The amount of information AI can "remember" in a conversation. Like short-term memory.',
    example: 'AI remembers earlier decisions in the chat, but not from yesterday'
  },
  {
    term: 'Iteration',
    greek: 'Ἐπανάληψις',
    definition: 'Refining through multiple passes. Start rough, polish progressively.',
    example: '"Make it better" → "Add glass effects" → "Reduce opacity to 0.1" → "Add subtle shimmer"'
  },
  {
    term: 'Component',
    greek: 'Μέρος',
    definition: 'A reusable piece of UI. Building blocks of modern apps.',
    example: 'ProjectCard, ThemeSwitcher, ProgressRing'
  },
  {
    term: 'State',
    greek: 'Κατάστασις',
    definition: 'Data that changes over time. The "memory" of your app.',
    example: 'Theme preference, selected project, search query'
  },
  {
    term: 'Hook',
    greek: 'Ἄγκιστρον',
    definition: 'React functions that let you "hook into" features like state and lifecycle.',
    example: 'useState, useEffect, useContext'
  },
  {
    term: 'Props',
    greek: 'Ἰδιότητες',
    definition: 'Properties passed to components. How parents communicate with children.',
    example: '<ProjectCard title="ARKHE" status="active" />'
  }
];

export const learningModules: LearningModule[] = [
  {
    id: 'genesis',
    title: 'The Genesis',
    greekConcept: 'Ἀρχή - The Beginning',
    icon: 'Sparkles',
    description: 'Start your vibe coding journey. Learn to think in vibes, not syntax.',
    lessons: [
      {
        id: 'what-is-vibe',
        title: 'What is Vibe Coding?',
        greekTitle: 'Τί ἐστι Ῥυθμός;',
        description: 'Understanding the paradigm shift from traditional coding to AI-assisted development',
        difficulty: 'beginner',
        duration: '5 min',
        concepts: ['Natural language', 'AI collaboration', 'Intent over syntax'],
        vibePrompt: 'Instead of writing CSS, try: "Make this card look like frosted glass with a subtle glow"',
        tryIt: 'Describe a UI element you want to build in plain English. Be specific about the feeling, not the code.'
      },
      {
        id: 'first-prompt',
        title: 'Your First Effective Prompt',
        greekTitle: 'Πρῶτος Λόγος',
        description: 'Learn the anatomy of a good prompt: context, intent, constraints',
        difficulty: 'beginner',
        duration: '10 min',
        concepts: ['Context setting', 'Clear intent', 'Specific outcomes'],
        codeExample: `// ❌ Weak prompt
"Add a button"

// ✅ Strong prompt
"Add a primary action button with obsidian glass effect,
shimmer on hover, and 'Launch' text. Use our theme colors
and make it prominent but tasteful."`,
        tryIt: 'Rewrite this weak prompt: "make it look nice" → Add context about what "it" is and what "nice" means for your use case'
      },
      {
        id: 'iteration-cycle',
        title: 'The Iteration Cycle',
        greekTitle: 'Κύκλος Βελτίωσης',
        description: 'How to refine AI output through progressive enhancement',
        difficulty: 'beginner',
        duration: '8 min',
        concepts: ['Start broad', 'Refine details', 'Test and adjust'],
        vibePrompt: `1. "Create a project dashboard"
2. "Add glass morphism effects"
3. "Make the cards more compact"
4. "Add shimmer to active states"`,
        tryIt: 'Pick any feature in ARKHE and trace back the iteration steps that likely created it'
      }
    ]
  },
  {
    id: 'foundations',
    title: 'Building Blocks',
    greekConcept: 'Θεμέλιοι - Foundations',
    icon: 'Box',
    description: 'Understanding components, state, and the React mental model',
    lessons: [
      {
        id: 'component-thinking',
        title: 'Think in Components',
        greekTitle: 'Σκέψις Μερῶν',
        description: 'Breaking UIs into reusable pieces',
        difficulty: 'beginner',
        duration: '12 min',
        concepts: ['Component hierarchy', 'Reusability', 'Props'],
        codeExample: `// ARKHE uses this pattern everywhere
<ProjectCard
  title="My Project"
  status="active"
  progress={75}
  theme="obsidian"
/>

// The card is a component that receives props
// and renders consistently across the app`,
        tryIt: 'Look at the ARKHE dashboard. Identify 5 components and their props'
      },
      {
        id: 'state-management',
        title: 'Managing State',
        greekTitle: 'Διαχείρισις Καταστάσεως',
        description: 'How data flows and updates in your app',
        difficulty: 'intermediate',
        duration: '15 min',
        concepts: ['useState', 'Context', 'Data flow'],
        codeExample: `// Local state - for one component
const [theme, setTheme] = useState('dark');

// Global state - shared across app
const { projects, updateProject } = useAppContext();

// Vibe prompt approach:
"Add a theme toggle that persists across page refreshes
and updates all components in real-time"`,
        tryIt: 'Toggle ARKHE\'s theme and observe what updates. That\'s state in action!'
      },
      {
        id: 'styling-vibes',
        title: 'Styling with Vibes',
        greekTitle: 'Κόσμησις Ὁράσεως',
        description: 'Describing visual effects in natural language',
        difficulty: 'beginner',
        duration: '10 min',
        concepts: ['Visual vocabulary', 'Design systems', 'Tailwind'],
        vibePrompt: `"Obsidian glass effect" → backdrop-blur + dark transparent bg
"Prismatic shimmer" → gradient animation
"Soft glow" → box-shadow with theme color`,
        tryIt: 'Describe a visual effect you love without using CSS property names'
      }
    ]
  },
  {
    id: 'arkhe-anatomy',
    title: 'ARKHE Anatomy',
    greekConcept: 'Ἀνατομία - Dissection',
    icon: 'Layers',
    description: 'Build ARKHE from scratch, understanding every piece',
    lessons: [
      {
        id: 'landing-page',
        title: 'The Landing Page',
        greekTitle: 'Πύλη Εἰσόδου',
        description: 'How the hero section was built with live stats and glass effects',
        difficulty: 'intermediate',
        duration: '20 min',
        concepts: ['Hero sections', 'Animations', 'Call-to-action'],
        vibePrompt: `"Create a landing page with:
- Greek-inspired branding (ARKHE - Ἀρχή)
- Live stats counter
- Obsidian glass card showcasing features
- Smooth scroll-to-action
- Premium feel without being overdone"`,
        tryIt: 'Examine src/pages/Landing.tsx - identify which parts came from specific prompt phrases'
      },
      {
        id: 'dashboard-magic',
        title: 'Dashboard Design',
        greekTitle: 'Πίναξ Ἐλέγχου',
        description: 'Building the main interface with sidebar navigation and layout',
        difficulty: 'intermediate',
        duration: '25 min',
        concepts: ['Layouts', 'Navigation', 'Responsive design'],
        codeExample: `// Layout pattern used in ARKHE
<DashboardLayout>
  <Sidebar /> {/* Persistent navigation */}
  <MainContent /> {/* Dynamic based on route */}
</DashboardLayout>`,
        tryIt: 'Navigate through ARKHE. Notice how the sidebar persists? That\'s layout composition.'
      },
      {
        id: 'integrations-system',
        title: 'The Integrations Grid',
        greekTitle: 'Σύνδεσμοι Ἐργαλείων',
        description: 'Creating a categorized showcase of tools and services',
        difficulty: 'intermediate',
        duration: '18 min',
        concepts: ['Data structures', 'Filtering', 'Grid layouts'],
        codeExample: `// Data-driven approach
const integrations = [
  {
    name: 'Claude',
    category: 'AI Tools',
    description: 'Advanced AI assistant',
    connected: true
  },
  // ... 20 more
];

// Vibe: "Show integrations in a grid,
// grouped by category, with connection status"`,
        tryIt: 'Check src/data/integrations.ts - see how data structure shapes the UI'
      },
      {
        id: 'theme-system',
        title: 'Theme System Deep Dive',
        greekTitle: 'Σύστημα Θεμάτων',
        description: 'How dark/light/midnight modes work throughout the app',
        difficulty: 'advanced',
        duration: '22 min',
        concepts: ['CSS variables', 'Context API', 'Persistence'],
        codeExample: `// Theme context pattern
const ThemeContext = createContext();

// CSS variables auto-update
:root[data-theme="dark"] {
  --bg-primary: #0a0a0a;
  --glass-effect: rgba(255,255,255,0.05);
}

// Components just use the variables
bg-[var(--bg-primary)]`,
        tryIt: 'Open DevTools, toggle theme, watch CSS variables change in real-time'
      },
      {
        id: 'toast-system',
        title: 'Toast Notifications',
        greekTitle: 'Εἰδοποιήσεις',
        description: 'Building a premium notification system with 5 types',
        difficulty: 'intermediate',
        duration: '15 min',
        concepts: ['Portals', 'Animations', 'State management'],
        vibePrompt: `"Create toast notifications with:
- 5 types: success, error, warning, info, loading
- Shimmer effect on background
- Auto-dismiss after 3 seconds
- Stack multiple toasts
- Smooth entrance/exit animations"`,
        tryIt: 'Trigger different toast types in ARKHE and study the animation timing'
      }
    ]
  },
  {
    id: 'advanced-vibes',
    title: 'Advanced Techniques',
    greekConcept: 'Μαεστρία - Mastery',
    icon: 'Zap',
    description: 'Level up your prompting and architectural thinking',
    lessons: [
      {
        id: 'context-aware',
        title: 'Context-Aware Prompting',
        greekTitle: 'Συνειδητὴ Συνομιλία',
        description: 'Referencing previous work to maintain consistency',
        difficulty: 'advanced',
        duration: '12 min',
        concepts: ['Conversation flow', 'Consistency', 'Refinement'],
        vibePrompt: `"Using the same obsidian glass effect from the ProjectCard,
apply it to the new Settings panel but with 0.03 opacity
instead of 0.05"`,
        tryIt: 'Practice building on previous responses instead of starting from scratch'
      },
      {
        id: 'architectural-thinking',
        title: 'System Design Vibes',
        greekTitle: 'Ἀρχιτεκτονικὴ Ὅρασις',
        description: 'Prompting for scalable, maintainable architecture',
        difficulty: 'advanced',
        duration: '20 min',
        concepts: ['File structure', 'Separation of concerns', 'Scalability'],
        codeExample: `// Instead of: "add a feature"
// Try: "Create a reusable snippet system with:
// - Data layer (src/data/snippets.ts)
// - Context for state (src/context/SnippetContext.tsx)
// - UI components (src/components/snippet/*)
// - Search, tags, and language filtering
// - Follows our existing patterns from integrations"`,
        tryIt: 'Look at ARKHE\'s file structure. See the patterns? That came from architectural prompts.'
      },
      {
        id: 'debugging-with-ai',
        title: 'Debugging Together',
        greekTitle: 'Συνεργατικὴ Ἐπιδιόρθωσις',
        description: 'How to describe problems effectively for AI assistance',
        difficulty: 'intermediate',
        duration: '15 min',
        concepts: ['Error messages', 'Reproduction steps', 'Expected vs actual'],
        vibePrompt: `// ❌ "It's broken"
// ✅ "The theme toggle doesn't persist after refresh.
// I expect: Theme choice saved to localStorage
// Actually: Always resets to dark
// Console shows: No errors
// Steps: Toggle to light → refresh → back to dark"`,
        tryIt: 'Next time something breaks, describe it like you\'re filing a detailed bug report'
      },
      {
        id: 'performance-vibes',
        title: 'Performance Optimization',
        greekTitle: 'Βελτιστοποίησις Ταχύτητος',
        description: 'Asking for fast, efficient implementations',
        difficulty: 'advanced',
        duration: '18 min',
        concepts: ['Lazy loading', 'Memoization', 'Bundle size'],
        vibePrompt: `"Optimize the integrations page:
- Lazy load integration icons
- Memoize filter calculations
- Virtual scroll for 100+ items
- Keep bundle under 50kb"`,
        tryIt: 'Use browser DevTools to measure before/after optimization prompts'
      }
    ]
  },
  {
    id: 'shipping',
    title: 'Shipping to Production',
    greekConcept: 'Ἔκδοσις - Release',
    icon: 'Rocket',
    description: 'Taking your vibe-coded project live',
    lessons: [
      {
        id: 'build-process',
        title: 'Build & Deploy',
        greekTitle: 'Κατασκευὴ καὶ Ἔκδοσις',
        description: 'Understanding the journey from code to production',
        difficulty: 'intermediate',
        duration: '15 min',
        concepts: ['Vite build', 'Environment variables', 'Deployment'],
        vibePrompt: `"Prepare ARKHE for production:
- Run build and fix any errors
- Optimize assets
- Set up environment variables
- Configure for Render/Vercel deployment"`,
        tryIt: 'Run "npm run build" locally and inspect the dist folder'
      },
      {
        id: 'git-workflow',
        title: 'Version Control Vibes',
        greekTitle: 'Ἔλεγχος Ἐκδόσεων',
        description: 'Git commits, branches, and collaboration',
        difficulty: 'beginner',
        duration: '12 min',
        concepts: ['Git basics', 'Commit messages', 'Branching'],
        codeExample: `// Good commit message (like ARKHE's)
"feat: Complete ARKHE rebranding with premium UI

- Add 21 integrations across 5 categories
- Implement obsidian glass effects
- Create interactive landing page
- Fix theme switching"`,
        tryIt: 'Check ARKHE\'s git log - see how changes are documented'
      },
      {
        id: 'iteration-production',
        title: 'Post-Launch Iteration',
        greekTitle: 'Συνεχὴς Βελτίωσις',
        description: 'Gathering feedback and evolving your product',
        difficulty: 'intermediate',
        duration: '10 min',
        concepts: ['User feedback', 'Analytics', 'A/B testing'],
        vibePrompt: `"Add analytics to track:
- Most used integrations
- Time spent on different pages
- Feature adoption rates
- Make it privacy-friendly"`,
        tryIt: 'Think about what metrics would matter for ARKHE users'
      }
    ]
  }
];

export const quickTips = [
  {
    category: 'Prompting',
    tips: [
      'Be specific about visual style: "obsidian glass" vs "transparent"',
      'Reference existing patterns: "like the ProjectCard but..."',
      'Give constraints: "keep it under 3 colors"',
      'Describe the feeling: "premium but not excessive"'
    ]
  },
  {
    category: 'Iteration',
    tips: [
      'Start with rough structure, polish progressively',
      'One change at a time for complex features',
      'Use "refine" rather than "rebuild"',
      'Keep successful patterns, iterate on weak spots'
    ]
  },
  {
    category: 'Learning',
    tips: [
      'Read the generated code - understand the patterns',
      'Experiment in browser DevTools',
      'Break things intentionally to learn',
      'Study apps you admire, describe what you see'
    ]
  },
  {
    category: 'ARKHE Meta',
    tips: [
      'Every feature in ARKHE was vibe-coded',
      'The Greek theme itself came from a prompt',
      'Integrations showcase real vibe-coder workflow',
      'This learning path? Meta-vibe-coded inception! 🤯'
    ]
  }
];
