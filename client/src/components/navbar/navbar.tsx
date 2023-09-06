'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container">
        <a className="navbar-brand" href="#">
          SyntaxSaga
        </a>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link
              href="/"
              className={`nav-link${pathname === '/' ? ' active' : ''}`}
            >
              Home
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              href="/login"
              className={`nav-link${pathname === '/login' ? ' active' : ''}`}
            >
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link
              href="/register"
              className={`nav-link${pathname === '/register' ? ' active' : ''}`}
            >
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
