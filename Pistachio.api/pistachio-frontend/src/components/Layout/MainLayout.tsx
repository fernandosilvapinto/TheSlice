// src/components/Layout/MainLayout.tsx
import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <nav className="container mx-auto flex justify-between p-4">
          <div className="text-lg font-bold text-green-700">Pistachio</div>
          <ul className="flex gap-4">
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/users">Usuários</Link></li>
            <li><Link to="/services">Serviços</Link></li>
            <li><Link to="/payments">Pagamentos</Link></li>
            <li><Link to="/schedulings">Agendamentos</Link></li>
            <li><Link to="/roles">Roles</Link></li>
            <li><button>Logout</button></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
