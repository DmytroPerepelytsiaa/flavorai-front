import z from 'zod';
import { RecipeDifficulty } from '../types';

export const recipeSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters').max(90, 'Title must be at most 90 characters'),
  description: z.string().max(360, 'Description must be at most 360 characters'),
  instructions: z.string().min(2, 'Instructions must be at least 2 characters').max(360, 'Instructions must be at most 360 characters'),
  prepTime: z
    .number('Should be a number')
    .min(1, 'Must be at least 1 minute')
    .max(9999, 'Must be at most 9999 minutes'),
  difficulty: z.enum(RecipeDifficulty, 'Difficulty must be one of Easy, Medium, or Hard'),
  ingredients: z.string().min(2, 'Ingredients must be at least 2 characters').max(360, 'Ingredients must be at most 360 characters'),
});

export type RecipeFormData = z.infer<typeof recipeSchema>;