export enum RecipeDifficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  difficulty: RecipeDifficulty;
  ingredients: string;
  instructions: string;
  createdAt: Date;
  updatedAt: Date;
}