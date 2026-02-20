import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../hooks/useSupabase";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      console.error("Supabase client not initialized. Check your environment variables.");
      setLoading(false);
      return;
    }

    // Race condition: If Supabase takes too long, force load
    const timeout = setTimeout(() => {
      console.warn("Auth check timed out. Forcing app load.");
      setLoading(false);
    }, 3000);

    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      clearTimeout(timeout);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch(err => {
      clearTimeout(timeout);
      console.error("Auth check failed:", err);
      setLoading(false);
    });

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGithub = async () => {
    if (!supabase) {
      alert("SaaS Engine Offline: Missing Database Connection");
      return;
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) console.error("Error signing in:", error.message);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error signing out:", error.message);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signInWithGithub, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
