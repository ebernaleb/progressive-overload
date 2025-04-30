import { z } from 'zod';

export const AddExerciseSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be at most 50 characters'),
  category: z.string().min(2, 'Category must be at least 2 characters').max(30, 'Category must be at most 30 characters'),
  description: z.string().max(200, 'Description must be at most 200 characters').optional(),
});

export type AddExerciseFormValues = z.infer<typeof AddExerciseSchema>; 