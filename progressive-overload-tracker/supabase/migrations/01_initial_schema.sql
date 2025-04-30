-- Create tables with RLS enabled
-- For a Progressive Overload Tracker application

-- Create exercises table
CREATE TABLE public.exercises (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX exercises_user_id_idx ON public.exercises (user_id);

-- Create workouts table
CREATE TABLE public.workouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES public.exercises(id) ON DELETE CASCADE,
    weight NUMERIC NULL,
    reps INTEGER NULL,
    sets INTEGER NULL,
    notes TEXT NULL,
    performed_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes for faster queries
CREATE INDEX workouts_user_id_idx ON public.workouts (user_id);
CREATE INDEX workouts_exercise_id_idx ON public.workouts (exercise_id);

-- Enable Row Level Security
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;

-- Create policies for exercises table
-- Allow users to view only their own exercises
CREATE POLICY exercises_select_policy ON public.exercises
    FOR SELECT USING (auth.uid() = user_id);

-- Allow users to create exercises but only for themselves
CREATE POLICY exercises_insert_policy ON public.exercises
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to update only their own exercises
CREATE POLICY exercises_update_policy ON public.exercises
    FOR UPDATE USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Allow users to delete only their own exercises
CREATE POLICY exercises_delete_policy ON public.exercises
    FOR DELETE USING (auth.uid() = user_id);

-- Create policies for workouts table
-- Allow users to view only their own workouts
CREATE POLICY workouts_select_policy ON public.workouts
    FOR SELECT USING (auth.uid() = user_id);

-- Allow users to create workouts but only for themselves
CREATE POLICY workouts_insert_policy ON public.workouts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to update only their own workouts
CREATE POLICY workouts_update_policy ON public.workouts
    FOR UPDATE USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Allow users to delete only their own workouts
CREATE POLICY workouts_delete_policy ON public.workouts
    FOR DELETE USING (auth.uid() = user_id); 