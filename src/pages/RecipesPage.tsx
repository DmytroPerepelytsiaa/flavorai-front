import { useEffect, useState } from 'react';
import api from '../api/api';
import type { ErrorResponse, Recipe } from '../types';
import RecipeCard from '../components/RecipeCard';

interface RecipesPageProps {
  userRecipes: boolean;
}

function RecipesPage({ userRecipes }: RecipesPageProps) {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchFilter, setSearchFilter] = useState<string>('');
  
  useEffect(() => {
    const getRecipes = async () => {
      try {
        const recipes = await api.get(userRecipes ? '/recipes/my' : '/recipes').then(res => res.data);
        setRecipes(recipes);
      } catch (error) {
        setErrorMessage((error as ErrorResponse).response?.data?.message || 'An error occurred while fetching recipes');
      }
    };

    getRecipes();
  }, [userRecipes]);

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className='py-20 px-10'>
      <input
        onChange={(e) => setSearchFilter(e.target.value)}
        type="text"
        placeholder="Search recipes..."
        className="w-full border border-slate-300 bg-white outline-slate-400 px-3 py-2 rounded mb-10 max-w-[600px] mx-auto block"
      />
      <ul className='flex flex-col gap-5 items-center'>
        {filteredRecipes.map((recipe, index) => <RecipeCard key={recipe.id} recipe={recipe} index={index}></RecipeCard>)}
      </ul>
      {errorMessage && (
        <p className="text-red-500 text-2xl mt-2 text-center font-medium">{errorMessage}</p>
      )}
    </div>
  );
};

export default RecipesPage;
