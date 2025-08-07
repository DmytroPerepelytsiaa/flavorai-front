import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';

function Layout() {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <header className='h-16 flex items-center justify-between px-10 text-slate-850 shadow-md fixed w-full bg-amber-50'>
        <Link className='hover:text-amber-700 duration-300 transition-colors' to='/'>FlavorAI</Link>
        <nav>
          <ul className='flex space-x-4'>
            <li>
              <NavLink to='/recipes' className={({ isActive }) => isActive ? 'text-slate-950 font-bold' : 'hover:text-amber-700 transition-colors duration-300'}>Recipes</NavLink>
            </li>
            <li>
              <NavLink to='/your-recipes' className={({ isActive }) => isActive ? 'text-slate-950 font-bold' : 'hover:text-amber-700 transition-colors duration-300'}>Your Recipe</NavLink>
            </li>
            <li>
              <NavLink to='/create-recipe' className={({ isActive }) => isActive ? 'text-slate-950 font-bold' : 'hover:text-amber-700 transition-colors duration-300'}>Create Recipe</NavLink>
            </li>
          </ul>
        </nav>
        <button onClick={logOut} className='cursor-pointer hover:text-amber-700'>Log Out</button>
      </header>
      <main className='bg-orange-100 h-screen'>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;