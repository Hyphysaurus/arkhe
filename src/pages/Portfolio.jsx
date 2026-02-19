import { useOutletContext } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

export default function Portfolio() {
    const { projects } = useOutletContext();

    const getPredictiveData = (project) => {
        const costs = project.transactions.filter(t => t.type === 'Cost');
        if (costs.length < 2) return { status: 'stable', message: 'Gathering data...' };

        const totalSpent = costs.reduce((sum, t) => Number(sum) + Number(t.amount), 0);
        const dayDiff = (new Date() - new Date(project.created_at)) / (1000 * 60 * 60 * 24) || 1; // Use created_at
        const burnRate = totalSpent / dayDiff;

        if (burnRate === 0) return { status: 'stable', message: 'Zero burn' };

        const daysRemaining = (project.monthly_budget - totalSpent) / burnRate;

        if (daysRemaining < 0) return { status: 'critical', message: 'Budget Exceeded' };
        if (daysRemaining < 7) return { status: 'warning', message: `Budget hit in ${Math.round(daysRemaining)} days` };
        return { status: 'healthy', message: 'On track' };
    };

    return (
        <div className="animate-fade-up stagger-2">
            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Full Portfolio</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '30px' }}>
                {projects.map(project => (
                    <ProjectCard
                        key={project.id}
                        project={{ ...project, prediction: getPredictiveData(project) }}
                    />
                ))}
            </div>
        </div>
    );
}
