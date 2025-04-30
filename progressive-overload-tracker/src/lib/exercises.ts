// Types
export type Exercise = {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
};

const STORAGE_KEY = 'exercises';

// Helper functions
const getStoredExercises = (): Exercise[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const setStoredExercises = (exercises: Exercise[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(exercises));
};

// Main functions
export async function getExercises(userId?: string): Promise<Exercise[]> {
  const exercises = getStoredExercises();
  return userId ? exercises.filter(ex => ex.user_id === userId) : exercises;
}

export async function createExercise(name: string, userId: string): Promise<Exercise> {
  const exercises = getStoredExercises();
  
  const newExercise: Exercise = {
    id: Date.now().toString(),
    name,
    user_id: userId,
    created_at: new Date().toISOString(),
  };
  
  exercises.push(newExercise);
  setStoredExercises(exercises);
  
  return newExercise;
}

export async function deleteExercise(exerciseId: string): Promise<boolean> {
  const exercises = getStoredExercises();
  const filtered = exercises.filter(ex => ex.id !== exerciseId);
  setStoredExercises(filtered);
  return true;
}

// Alias for backward compatibility
export const addExercise = createExercise; 