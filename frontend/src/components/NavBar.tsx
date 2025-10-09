import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="w-full bg-gray-400 shadow-md">
      <div className="flex justify-center items-center py-4 px-6 space-x-8">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `text-gray-800 no-underline px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive 
                ? 'bg-gray-600 text-white font-semibold' 
                : 'hover:bg-gray-500 hover:text-white'
            }`
          }
        >
          Home
        </NavLink>
        
        <NavLink 
          to="/list" 
          className={({ isActive }) => 
            `text-gray-800 no-underline px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive 
                ? 'bg-gray-600 text-white font-semibold' 
                : 'hover:bg-gray-500 hover:text-white'
            }`
          }
        >
          List
        </NavLink>
        
        <NavLink 
          to="/add" 
          className={({ isActive }) => 
            `text-gray-800 no-underline px-4 py-2 rounded-md transition-colors duration-200 ${
              isActive 
                ? 'bg-gray-600 text-white font-semibold' 
                : 'hover:bg-gray-500 hover:text-white'
            }`
          }
        >
          Add
        </NavLink>
      </div>
    </nav>
  );
}