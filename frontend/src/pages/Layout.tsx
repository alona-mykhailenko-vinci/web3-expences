import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}