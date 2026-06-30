import { NavLink, Outlet } from 'react-router-dom';

export function AppLayout() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <NavLink to="/" className="brand-mark">
            头条新闻
          </NavLink>
          <nav className="site-nav" aria-label="主导航">
            <NavLink to="/" className="site-nav__link">
              首页
            </NavLink>
            <a href="#headlines" className="site-nav__link">
              焦点
            </a>
            <a href="#categories" className="site-nav__link">
              分类
            </a>
          </nav>
        </div>
      </header>
      <main className="site-main">
        <Outlet />
      </main>
    </div>
  );
}
