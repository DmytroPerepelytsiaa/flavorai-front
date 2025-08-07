import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RecipeDifficulty } from '../types/recipes.type';
import { recipeSchema } from '../schemas';

type RecipeFormData = {
  title: string;
  description: string;
  instructions: string;
  prepTime: number;
  difficulty: RecipeDifficulty;
  ingredients: string;
};

function CreateRecipePage() {
  const { register, handleSubmit, formState: { errors } } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: { ingredients: '', instructions: '' } 
  });

  const onSubmit = (data: RecipeFormData) => {
    const recipeToSend = data;

    console.log('Recipe to send:', recipeToSend);
  };

  return (
    <div className="max-w-xl mx-auto p-5 pt-20">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-8 w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Recipe</h1>

        <div className='mb-4'>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            {...register('title', { required: 'Title is required' })}
            className="w-full border border-slate-300 outline-slate-400 px-3 py-2 rounded"
          />
          {errors.title && (
            <p className="text-red-600 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className='mb-4'>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            rows={3}
            className="w-full border border-slate-300 outline-slate-400 px-3 py-2 rounded resize-none"
          />
          {errors.description && (
            <p className="text-red-600 mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className='mb-4'>
          <label className="block mb-1 font-semibold">Instructions</label>
          <textarea
            {...register('instructions', { required: 'Instructions are required' })}
            rows={4}
            placeholder="How to prepare the recipe"
            className="w-full border border-slate-300 outline-slate-400 px-3 py-2 rounded resize-none"
          />
          {errors.instructions && (
            <p className="text-red-600 mt-1">{errors.instructions.message}</p>
          )}
        </div>

        <div className='mb-4'>
          <label className="block mb-1 font-semibold">Preparation Time (minutes)</label>
          <input
            type="number"
            {...register('prepTime', {
              required: 'Preparation time is required',
              min: { value: 1, message: 'Must be at least 1 minute' },
              valueAsNumber: true,
            })}
            className="w-full border border-slate-300 outline-slate-400 px-3 py-2 rounded"
          />
          {errors.prepTime && (
            <p className="text-red-600 mt-1">{errors.prepTime.message}</p>
          )}
        </div>

        <div className='mb-4'>
          <label className="block mb-1 font-semibold">Difficulty</label>
          <select
            {...register('difficulty', { required: 'Difficulty is required' })}
            className="w-full border border-slate-300 outline-slate-400 px-3 py-2 rounded"
            defaultValue=""
          >
            <option value="" disabled>
              Select difficulty
            </option>
            <option value={RecipeDifficulty.Easy}>Easy</option>
            <option value={RecipeDifficulty.Medium}>Medium</option>
            <option value={RecipeDifficulty.Hard}>Hard</option>
          </select>
          {errors.difficulty && (
            <p className="text-red-600 mt-1">{errors.difficulty.message}</p>
          )}
        </div>

        <div className='mb-4'>
          <label className="block mb-1 font-semibold">Ingredients (separate with commas or new lines)</label>
          <textarea
            {...register('ingredients', { required: 'Ingredients are required' })}
            rows={4}
            className="w-full border border-slate-300 outline-slate-400 px-3 py-2 rounded resize-none"
            placeholder="e.g. Flour, Eggs, Milk"
          />
          {errors.ingredients && (
            <p className="text-red-600 mt-1">{errors.ingredients.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600 cursor-pointer transition-colors duration-300"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
}

export default CreateRecipePage;
