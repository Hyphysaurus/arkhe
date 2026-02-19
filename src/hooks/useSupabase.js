import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export function useSupabaseData(userId) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({ projects: [], profile: null });

    useEffect(() => {
        if (!supabase || !userId) {
            setLoading(false);
            return;
        }

        async function fetchData() {
            try {
                // Fetch Profile
                let { data: profile, error: profileError } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', userId)
                    .single();

                if (profileError && profileError.code === 'PGRST116') {
                    // Profile doesn't exist? Create one via trigger usually, or handle here if manual needed
                    console.log("Profile not found, waiting for trigger or creation...");
                }

                // Fetch Projects with Transactions
                const { data: projects, error: projectsError } = await supabase
                    .from('projects')
                    .select('*, transactions(*)')
                    .eq('user_id', userId)
                    .order('created_at', { ascending: false });

                if (projectsError) throw projectsError;

                // Normalize projects to match App.jsx expectations
                const normalizedProjects = projects.map(p => ({
                    ...p,
                    checklist: [], // TODO: Fetch checklist items
                    transactions: p.transactions || []
                }));

                setData({ profile, projects: normalizedProjects });
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [userId]);

    const logActivity = async (action, xpEarned = 0, projectId = null) => {
        if (!supabase || !userId) return;

        // Fire and forget activity log
        supabase.from('activity_log').insert([{
            user_id: userId,
            action,
            xp_earned: xpEarned,
            project_id: projectId
        }]).then(({ error }) => {
            if (error) console.error("Error logging activity:", error);
        });

        // Update streak
        supabase.rpc('handle_streak').then(({ error }) => {
            if (error) console.error("Error updating streak:", error);
        });
    };

    const addProject = async (project) => {
        if (!supabase || !userId) return;
        const { data, error } = await supabase
            .from('projects')
            .insert([{ ...project, user_id: userId }])
            .select()
            .single();

        if (data) {
            setData(prev => ({
                ...prev,
                projects: [{ ...data, transactions: [], checklist: [] }, ...prev.projects]
            }));
            await logActivity("Created Project", 10, data.id);
        }
        return { data, error };
    };

    const addTransaction = async (projectId, transaction) => {
        if (!supabase || !userId) return;
        const { data, error } = await supabase
            .from('transactions')
            .insert([{ ...transaction, project_id: projectId, user_id: userId }])
            .select()
            .single();

        if (data) {
            setData(prev => ({
                ...prev,
                projects: prev.projects.map(p =>
                    p.id === projectId
                        ? { ...p, transactions: [data, ...p.transactions] }
                        : p
                )
            }));
            const xp = transaction.type === 'Revenue' ? 10 : 5;
            await logActivity(`Logged ${transaction.type}`, xp, projectId);
        }
        return { data, error };
    };

    const updateXp = async (amount) => {
        if (!supabase || !userId) return;
        // Optimization: Optimistic update could happen in App.jsx, here we just sync
        // But since we need the current XP to increment, we might need a stored procedure or fetch-then-update
        // Or just rely on the client state passed in?
        // App.jsx controls the source of truth for "newXp".
        // Let's assume the App passes the NEW TOTAL, or we use an RPC.
        // For now, let's just fetch-add-update to be safe, or assume the client passes the delta?
        // The original code was: const updateXp = async (xp) => ... .update({ xp })
        // So it expects the TOTAL xp.
        // This function is currently a placeholder. Its implementation would likely involve calling updateProfile.
    };

    const updateProfile = async (updates) => {
        if (!supabase || !userId) return;
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', userId)
            .select()
            .single();

        if (data) {
            setData(prev => ({ ...prev, profile: data }));
        }
        return { data, error };
    };

    return { loading, ...data, addProject, addTransaction, updateXp, logActivity, updateProfile };
}
