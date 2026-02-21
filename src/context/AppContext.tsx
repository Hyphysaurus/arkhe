import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DEMO_PROJECTS, DEMO_PROFILE, XP_ACTIONS, ACHIEVEMENTS, getLevel } from '../data/constants';

interface Cost {
  id: string;
  service: string;
  amount: number;
  date: string;
  note: string;
}

interface Revenue {
  id: string;
  source: string;
  amount: number;
  date: string;
  note: string;
}

interface CodeReview {
  id: string;
  code: string;
  score: number;
  summary: string;
  issues: Array<{ type: string; message: string; severity: string }>;
  strengths: string[];
  fixes: string[];
  date: string;
}

interface Project {
  id: string;
  name: string;
  emoji: string;
  status: string;
  budget: number;
  createdAt: string;
  checklist: Record<string, boolean>;
  costs: Cost[];
  revenues: Revenue[];
  codeReviews: CodeReview[];
}

interface Profile {
  xp: number;
  streak_days: number;
  monthly_budget: number;
  achievements: string[];
}

interface Toast {
  id: string;
  type: 'xp' | 'achievement';
  message: string;
  xp?: number;
  achievement?: any;
}

interface AppContextType {
  projects: Project[];
  profile: Profile;
  toasts: Toast[];
  addXP: (action: string) => void;
  unlockAchievement: (key: string) => void;
  createProject: (name: string, emoji: string, budget: number) => string;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addCost: (projectId: string, cost: Omit<Cost, 'id'>) => void;
  deleteCost: (projectId: string, costId: string) => void;
  addRevenue: (projectId: string, revenue: Omit<Revenue, 'id'>) => void;
  deleteRevenue: (projectId: string, revenueId: string) => void;
  addCodeReview: (projectId: string, review: Omit<CodeReview, 'id' | 'date'>) => void;
  updateChecklist: (projectId: string, itemId: string, checked: boolean) => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(DEMO_PROJECTS);
  const [profile, setProfile] = useState<Profile>(DEMO_PROFILE);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addXP = (action: string) => {
    const xpData = XP_ACTIONS[action as keyof typeof XP_ACTIONS];
    if (!xpData) return;

    const oldLevel = getLevel(profile.xp);
    const newXP = profile.xp + xpData.xp;
    const newLevel = getLevel(newXP);

    setProfile(prev => ({ ...prev, xp: newXP }));

    const toastId = `xp-${Date.now()}`;
    setToasts(prev => [...prev, {
      id: toastId,
      type: 'xp',
      message: xpData.label,
      xp: xpData.xp
    }]);

    setTimeout(() => dismissToast(toastId), 3000);

    if (newLevel.level > oldLevel.level) {
      const levelToastId = `level-${Date.now()}`;
      setToasts(prev => [...prev, {
        id: levelToastId,
        type: 'achievement',
        message: `Level Up! ${newLevel.title}`,
        achievement: { icon: '⬆️', color: newLevel.color }
      }]);
      setTimeout(() => dismissToast(levelToastId), 4000);
    }
  };

  const unlockAchievement = (key: string) => {
    if (profile.achievements.includes(key)) return;

    const achievement = ACHIEVEMENTS.find(a => a.key === key);
    if (!achievement) return;

    setProfile(prev => ({
      ...prev,
      achievements: [...prev.achievements, key]
    }));

    const toastId = `ach-${Date.now()}`;
    setToasts(prev => [...prev, {
      id: toastId,
      type: 'achievement',
      message: achievement.title,
      achievement
    }]);

    setTimeout(() => dismissToast(toastId), 4000);
  };

  const createProject = (name: string, emoji: string, budget: number): string => {
    const id = `proj-${Date.now()}`;
    const newProject: Project = {
      id,
      name,
      emoji,
      status: 'building',
      budget,
      createdAt: new Date().toISOString().split('T')[0],
      checklist: {},
      costs: [],
      revenues: [],
      codeReviews: []
    };

    setProjects(prev => [newProject, ...prev]);
    addXP('project_created');

    return id;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));

    if (updates.status === 'shipped') {
      const project = projects.find(p => p.id === id);
      if (project && project.status !== 'shipped') {
        addXP('project_shipped');
      }
    }
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const addCost = (projectId: string, cost: Omit<Cost, 'id'>) => {
    const id = `cost-${Date.now()}`;
    setProjects(prev => prev.map(p =>
      p.id === projectId ? { ...p, costs: [...p.costs, { ...cost, id }] } : p
    ));
    addXP('cost_logged');
  };

  const deleteCost = (projectId: string, costId: string) => {
    setProjects(prev => prev.map(p =>
      p.id === projectId ? { ...p, costs: p.costs.filter(c => c.id !== costId) } : p
    ));
  };

  const addRevenue = (projectId: string, revenue: Omit<Revenue, 'id'>) => {
    const id = `rev-${Date.now()}`;
    const project = projects.find(p => p.id === projectId);

    setProjects(prev => prev.map(p =>
      p.id === projectId ? { ...p, revenues: [...p.revenues, { ...revenue, id }] } : p
    ));

    addXP('revenue_logged');

    if (project && project.revenues.length === 0) {
      addXP('first_revenue');
    }
  };

  const deleteRevenue = (projectId: string, revenueId: string) => {
    setProjects(prev => prev.map(p =>
      p.id === projectId ? { ...p, revenues: p.revenues.filter(r => r.id !== revenueId) } : p
    ));
  };

  const addCodeReview = (projectId: string, review: Omit<CodeReview, 'id' | 'date'>) => {
    const id = `review-${Date.now()}`;
    setProjects(prev => prev.map(p =>
      p.id === projectId ? { ...p, codeReviews: [{ ...review, id, date: new Date().toISOString() }, ...p.codeReviews] } : p
    ));

    addXP('code_review');

    if (review.score >= 8) {
      addXP('clean_code_bonus');
    }

    if (review.score >= 9) {
      unlockAchievement('clean_code');
    }
  };

  const updateChecklist = (projectId: string, itemId: string, checked: boolean) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;

      const newChecklist = { ...p.checklist, [itemId]: checked };
      const totalItems = 22;
      const completedItems = Object.values(newChecklist).filter(Boolean).length;

      if (checked) {
        addXP('checklist_item');
      }

      if (completedItems === totalItems && checked) {
        unlockAchievement('first_ship');
      }

      return { ...p, checklist: newChecklist };
    }));
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    const checkAchievements = () => {
      if (projects.length >= 5) {
        unlockAchievement('diversified');
      }

      const totalReviews = projects.reduce((sum, p) => sum + p.codeReviews.length, 0);
      if (totalReviews >= 10) {
        unlockAchievement('code_critic');
      }

      const totalSpend = projects.reduce((sum, p) =>
        sum + p.costs.reduce((s, c) => s + c.amount, 0), 0
      );
      if (totalSpend >= 500) {
        unlockAchievement('investor');
      }

      projects.forEach(p => {
        const totalCost = p.costs.reduce((sum, c) => sum + c.amount, 0);
        const totalRevenue = p.revenues.reduce((sum, r) => sum + r.amount, 0);

        if (totalRevenue > totalCost && totalRevenue > 0) {
          unlockAchievement('profit_mode');
        }

        if (p.budget > 0 && totalCost <= p.budget && totalCost > 0) {
          unlockAchievement('budget_hawk');
        }

        if (totalCost < 10 && totalCost > 0) {
          unlockAchievement('penny_pincher');
        }
      });

      if (profile.streak_days >= 30) {
        unlockAchievement('streak_30');
      } else if (profile.streak_days >= 7) {
        unlockAchievement('streak_7');
      } else if (profile.streak_days >= 3) {
        unlockAchievement('streak_3');
      }
    };

    checkAchievements();
  }, [projects, profile.streak_days]);

  return (
    <AppContext.Provider value={{
      projects,
      profile,
      toasts,
      addXP,
      unlockAchievement,
      createProject,
      updateProject,
      deleteProject,
      addCost,
      deleteCost,
      addRevenue,
      deleteRevenue,
      addCodeReview,
      updateChecklist,
      dismissToast
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
