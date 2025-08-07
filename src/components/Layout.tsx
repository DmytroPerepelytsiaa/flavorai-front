import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <header>Заголовок и меню</header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;