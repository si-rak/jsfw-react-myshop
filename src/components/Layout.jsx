import { useState } from 'react';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { useLocation, Outlet } from 'react-router-dom';

function Layout({ toggleTheme, theme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-color)',
        color: 'var(--text-color)',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      <SiteHeader
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        toggleTheme={toggleTheme}
        theme={theme}
      />

      <main
        style={{
          flex: '1 0 auto',
          paddingTop: '80px',
          paddingBottom: '2rem',
          display: 'flex',
        }}
      >
        {isHomePage ? (
          <Outlet />
        ) : (
          <div className="pageContainer">
            <Outlet />
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

export default Layout;
