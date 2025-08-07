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

  return (
    <div className='pt-20 px-10'>
      <ul className='flex flex-col gap-5 items-center'>
        {recipes.map((recipe, index) => <RecipeCard key={recipe.id} recipe={recipe} index={index}></RecipeCard>)}
      </ul>
      {errorMessage && (
        <p className="text-red-500 text-2xl mt-2 text-center font-medium">{errorMessage}</p>
      )}
    </div>
  );
};

export default RecipesPage;
