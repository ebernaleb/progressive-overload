-- Create tables for Progressive Overload Tracker
-- Create extensions if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create exercises table
CREATE TABLE IF NOT EXISTS public.exercises (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Other',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, name)
);

-- Create workouts table
CREATE TABLE IF NOT EXISTS public.workouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    exercise_id UUID NOT NULL REFERENCES public.exercises(id) ON DELETE CASCADE,
    weight NUMERIC NOT NULL,
    reps INTEGER NOT NULL,
    sets INTEGER NOT NULL,
    notes TEXT,
    performed_at DATE NOT NULL DEFAULT CURRENT_DATE
);

-- Enable Row Level Security
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workouts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for exercises
CREATE POLICY "Users can view their own exercises" 
    ON public.exercises FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own exercises" 
    ON public.exercises FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own exercises" 
    ON public.exercises FOR UPDATE 
    USING (auth.uid() = user_id) 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own exercises" 
    ON public.exercises FOR DELETE 
    USING (auth.uid() = user_id);

-- Create RLS policies for workouts
CREATE POLICY "Users can view their own workouts" 
    ON public.workouts FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own workouts" 
    ON public.workouts FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workouts" 
    ON public.workouts FOR UPDATE 
    USING (auth.uid() = user_id) 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workouts" 
    ON public.workouts FOR DELETE 
    USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS exercises_user_id_idx ON public.exercises(user_id);
CREATE INDEX IF NOT EXISTS workouts_user_id_idx ON public.workouts(user_id);
CREATE INDEX IF NOT EXISTS workouts_exercise_id_idx ON public.workouts(exercise_id);
CREATE INDEX IF NOT EXISTS workouts_performed_at_idx ON public.workouts(performed_at); 