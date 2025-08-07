import { useEffect } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import api from '../api/api';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

function Layout() {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {    
    const getUser = async () => {
      await api
        .get(`${baseUrl}/users/me`)
        .catch(() => {
          localStorage.removeItem('token');
          navigate('/login');
        });
    };

    getUser();
  });

  return (
    <>
      <header className='text-[10px] px-5 sm:text-lg sm:px-10 h-16 flex items-center justify-between text-slate-850 shadow-md fixed w-full bg-amber-50'>
        <Link className='hover:text-amber-700 duration-300 transition-colors' to='/'>FlavorAI</Link>
        <nav>
          <ul className='flex space-x-4'>
            <li>
              <NavLink to='/recipes' className={({ isActive }) => isActive ? 'text-slate-950 font-bold' : 'hover:text-amber-700 transition-colors duration-300'}>Recipes</NavLink>
            </li>
            <li>
              <NavLink to='/your-recipes' className={({ isActive }) => isActive ? 'text-slate-950 font-bold' : 'hover:text-amber-700 transition-colors duration-300'}>Your Recipes</NavLink>
            </li>
            <li>
              <NavLink to='/create-recipe' className={({ isActive }) => isActive ? 'text-slate-950 font-bold' : 'hover:text-amber-700 transition-colors duration-300'}>Create Recipe</NavLink>
            </li>
          </ul>
        </nav>
        <button onClick={logOut} className='cursor-pointer hover:text-amber-700'>Log Out</button>
      </header>
      <main className='bg-orange-100 min-h-screen'>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;