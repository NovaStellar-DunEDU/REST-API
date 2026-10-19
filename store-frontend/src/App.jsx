import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Catalog from './pages/Catalog.jsx';
import Management from './pages/Management.jsx';

export default function App() {
  return (
    <>
      <header className="topbar">
        <h1>Book Store</h1>
        <nav>
          <NavLink to="/catalog">Catalog</NavLink>
          <NavLink to="/management">Management</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/catalog" replace />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/management" element={<Management />} />
          <Route path="*" element={<Navigate to="/catalog" replace />} />
        </Routes>
      </main>
    </>
  );
}
