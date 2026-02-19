
-- Activity Log Table
CREATE TABLE IF NOT EXISTS public.activity_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
    action TEXT NOT NULL,
    xp_earned INTEGER DEFAULT 0,
    project_id UUID REFERENCES public.projects ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can insert their own activity." ON public.activity_log FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their own activity." ON public.activity_log FOR SELECT USING (auth.uid() = user_id);

-- Streak Maintenance Function
CREATE OR REPLACE FUNCTION public.handle_streak()
RETURNS void AS $$
DECLARE
    last_act DATE;
    current_streak INTEGER;
    today DATE := CURRENT_DATE;
BEGIN
    -- Get current user's streak info
    SELECT last_activity, ship_streak INTO last_act, current_streak
    FROM public.profiles
    WHERE id = auth.uid();

    -- If no profile (shouldn't happen), exit
    IF NOT FOUND THEN
        RETURN;
    END IF;

    -- If last activity was today, do nothing
    IF last_act = today THEN
        RETURN;
    END IF;

    -- If last activity was yesterday, increment streak
    IF last_act = today - 1 THEN
        UPDATE public.profiles
        SET ship_streak = ship_streak + 1,
            last_activity = today
        WHERE id = auth.uid();
    ELSE
        -- Streak broken or first activity, reset to 1
        UPDATE public.profiles
        SET ship_streak = 1,
            last_activity = today
        WHERE id = auth.uid();
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
