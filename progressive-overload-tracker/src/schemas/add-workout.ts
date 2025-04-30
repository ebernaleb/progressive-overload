import { z } from 'zod';

export const WorkoutExerciseSchema = z.object({
  exerciseId: z.string().min(1, 'Exercise is required'),
  exerciseName: z.string().min(1, 'Exercise name is required'),
  sets: z.number().int().min(1, 'Sets must be at least 1'),
  reps: z.number().int().min(1, 'Reps must be at least 1'),
  weight: z.number().min(0, 'Weight must be at least 0'),
});

export const AddWorkoutSchema = z.object({
  date: z.string().min(1, 'Date is required'),
  exercises: z.array(WorkoutExerciseSchema).min(1, 'At least one exercise is required'),
  completed: z.boolean().optional(),
});

export type AddWorkoutFormValues = z.infer<typeof AddWorkoutSchema>; 