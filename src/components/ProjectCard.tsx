import { Link } from 'react-router-dom';
import { ProgressRing } from './ui/ProgressRing';
import { PROJECT_STATUSES, CHECKLIST_TEMPLATES } from '../data/constants';

interface Project {
  id: string;
  name: string;
  emoji: string;
  status: string;
  budget: number;
  checklist: Record<string, boolean>;
  costs: Array<{ amount: number }>;
  revenues: Array<{ amount: number }>;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const status = PROJECT_STATUSES.find(s => s.key === project.status);
  const completedItems = Object.values(project.checklist).filter(Boolean).length;
  const totalItems = CHECKLIST_TEMPLATES.length;
  const progress = (completedItems / totalItems) * 100;

  const totalCost = project.costs.reduce((sum, c) => sum + c.amount, 0);
  const totalRevenue = project.revenues.reduce((sum, r) => sum + r.amount, 0);

  return (
    <Link
      to={`/project/${project.id}`}
      className="block group"
    >
      <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-5 hover:border-cyan-500/50 transition-all hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1">
        <div className="flex items-start gap-4">
          <div className="text-4xl">{project.emoji}</div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white mb-2 truncate">{project.name}</h3>
            {status && (
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                style={{ backgroundColor: `${status.color}20`, color: status.color }}
              >
                {status.label}
              </span>
            )}
            <div className="flex items-center gap-3 text-sm">
              <span className="text-red-400">-${totalCost.toFixed(0)}</span>
              <span className="text-slate-600">|</span>
              <span className="text-green-400">+${totalRevenue.toFixed(0)}</span>
            </div>
          </div>
          <ProgressRing progress={progress} size={60} strokeWidth={4} />
        </div>
      </div>
    </Link>
  );
}
