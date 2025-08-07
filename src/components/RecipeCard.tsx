import { RECIPE_IMAGES_MOCKS } from '../constants';
import type { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  index: number;
}

function RecipeCard({ recipe, index }: RecipeCardProps) {
  const imageUrl = RECIPE_IMAGES_MOCKS[index % RECIPE_IMAGES_MOCKS.length];

  return (
    <div className="flex justify-between gap-8 border border-slate-300 rounded-lg h-64 p-5 pl-10 hover:scale-[1.01] transition-transform duration-500 cursor-pointer bg-white max-w-[1200px] w-full">
      <div className="overflow-hidden">
        <h2 className="text-[30px] truncate max-w-[600px] font-semibold">{recipe.title}</h2>
        <span className="font-medium truncate text-base block text-slate-700">{recipe.ingredients}</span>
        <span className='font-medium truncate text-sm block mb-4'>Recipe from user: {recipe.userEmail}</span>
        <p className="font-medium base text-slate-700">
          <span className='font-medium text-[22px] text-black'>Description: </span>
          {recipe.description}
        </p>
        <p className="font-medium text-base text-slate-700">
          <span className='font-medium text-[22px] text-black'>Instructions: </span>
          {recipe.instructions}
        </p>
      </div>
      <img src={imageUrl} className="hidden md:block w-[216px] h-[216px] object-cover rounded-md" />
    </div>
  );
};

export default RecipeCard;