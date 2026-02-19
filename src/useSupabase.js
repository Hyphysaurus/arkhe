import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export function useSupabaseData(userId) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({ projects: [], profile: null });

    useEffect(() => {
        if (!supabase || !userId) return;

        async function fetchData() {
            const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();
            const { data: projects } = await supabase.from('projects').select('*, transactions(*)').eq('user_id', userId);

            setData({ profile, projects });
            setLoading(false);
        }

        fetchData();
    }, [userId]);

    const addProject = async (project) => {
        if (!supabase) return;
        return await supabase.from('projects').insert([{ ...project, user_id: userId }]);
    };

    const addTransaction = async (transaction) => {
        if (!supabase) return;
        return await supabase.from('transactions').insert([{ ...transaction, user_id: userId }]);
    };

    const updateXp = async (xp) => {
        if (!supabase) return;
        return await supabase.from('profiles').update({ xp }).eq('id', userId);
    };

    return { loading, ...data, addProject, addTransaction, updateXp };
}
