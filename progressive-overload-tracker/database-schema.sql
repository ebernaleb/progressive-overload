-- Create the exercises table
CREATE TABLE IF NOT EXISTS exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create the workouts table
CREATE TABLE IF NOT EXISTS workouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_id UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
  weight NUMERIC NOT NULL,
  reps INTEGER NOT NULL,
  sets INTEGER NOT NULL,
  notes TEXT,
  performed_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE workouts ENABLE ROW LEVEL SECURITY;

-- Create policy for exercises table - Users can only CRUD their own exercises
CREATE POLICY "Users can CRUD their own exercises"
  ON exercises
  USING (auth.uid() = user_id);

-- Create policy for workouts table - Users can only CRUD their own workouts
CREATE POLICY "Users can CRUD their own workouts"
  ON workouts
  USING (auth.uid() = user_id);

-- Create indexes for improved performance
CREATE INDEX IF NOT EXISTS exercises_user_id_idx ON exercises (user_id);
CREATE INDEX IF NOT EXISTS workouts_user_id_idx ON workouts (user_id);
CREATE INDEX IF NOT EXISTS workouts_exercise_id_idx ON workouts (exercise_id);
CREATE INDEX IF NOT EXISTS workouts_performed_at_idx ON workouts (performed_at); 