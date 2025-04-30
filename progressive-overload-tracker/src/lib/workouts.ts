import { Exercise } from './exercises';

// Types
export type WorkoutExercise = {
  id: string;
  workout_id: string;
  exercise_id: string;
  sets: number;
  reps: number;
  weight: number;
  created_at: string;
};

export type Workout = {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
  date?: string;
  exerciseName?: string;
  weight?: number;
  reps?: number;
  sets?: number;
  notes?: string;
};

const WORKOUTS_KEY = 'workouts';
const WORKOUT_EXERCISES_KEY = 'workout_exercises';

// Helper functions
const getStoredWorkouts = (): Workout[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(WORKOUTS_KEY);
  return stored ? JSON.parse(stored) : [];
};

const setStoredWorkouts = (workouts: Workout[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(WORKOUTS_KEY, JSON.stringify(workouts));
};

const getStoredWorkoutExercises = (): WorkoutExercise[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(WORKOUT_EXERCISES_KEY);
  return stored ? JSON.parse(stored) : [];
};

const setStoredWorkoutExercises = (exercises: WorkoutExercise[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(WORKOUT_EXERCISES_KEY, JSON.stringify(exercises));
};

// Main functions
export async function getWorkouts(userId?: string): Promise<Workout[]> {
  const workouts = getStoredWorkouts();
  return userId ? workouts.filter(w => w.user_id === userId) : workouts;
}

export async function getWorkoutExercises(workoutId: string): Promise<WorkoutExercise[]> {
  const exercises = getStoredWorkoutExercises();
  return exercises.filter(e => e.workout_id === workoutId);
}

export async function createWorkout(userId: string, name: string, date?: string): Promise<Workout> {
  const workouts = getStoredWorkouts();
  
  const newWorkout: Workout = {
    id: Date.now().toString(),
    user_id: userId,
    name,
    created_at: new Date().toISOString(),
    date: date || new Date().toISOString().split('T')[0]
  };
  
  workouts.push(newWorkout);
  setStoredWorkouts(workouts);
  
  return newWorkout;
}

export async function createWorkoutExercise(
  workoutId: string,
  exerciseId: string,
  sets: number,
  reps: number,
  weight: number
): Promise<WorkoutExercise> {
  const exercises = getStoredWorkoutExercises();
  
  const newExercise: WorkoutExercise = {
    id: Date.now().toString(),
    workout_id: workoutId,
    exercise_id: exerciseId,
    sets,
    reps,
    weight,
    created_at: new Date().toISOString(),
  };
  
  exercises.push(newExercise);
  setStoredWorkoutExercises(exercises);
  
  return newExercise;
}

export async function deleteWorkoutExercise(exerciseId: string): Promise<boolean> {
  const exercises = getStoredWorkoutExercises();
  const filtered = exercises.filter(e => e.id !== exerciseId);
  setStoredWorkoutExercises(filtered);
  return true;
}

export async function deleteWorkout(workoutId: string): Promise<boolean> {
  const workouts = getStoredWorkouts();
  const filtered = workouts.filter(w => w.id !== workoutId);
  setStoredWorkouts(filtered);
  
  // Also delete associated workout exercises
  const exercises = getStoredWorkoutExercises();
  const filteredExercises = exercises.filter(e => e.workout_id !== workoutId);
  setStoredWorkoutExercises(filteredExercises);
  
  return true;
}

export async function deleteWorkoutsByDate(date: string): Promise<boolean> {
  const workouts = getStoredWorkouts();
  const workoutsToDelete = workouts.filter(w => w.date === date);
  const workoutIds = workoutsToDelete.map(w => w.id);
  
  // Remove workouts for this date
  const filteredWorkouts = workouts.filter(w => w.date !== date);
  setStoredWorkouts(filteredWorkouts);
  
  // Remove associated workout exercises
  const exercises = getStoredWorkoutExercises();
  const filteredExercises = exercises.filter(e => !workoutIds.includes(e.workout_id));
  setStoredWorkoutExercises(filteredExercises);
  
  return true;
}

// Alias for backward compatibility
export const addWorkout = createWorkout; 