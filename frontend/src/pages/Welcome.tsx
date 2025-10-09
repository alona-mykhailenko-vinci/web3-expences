import { NavLink } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="min-h-[calc(100vh-80px)] grid place-items-center px-2 py-6 bg-white">
      <div className="max-w-sm px-0 sm:px-2">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-900">
            Welcome to the Expense Tracker
          </h1>
          
          <p className="text-base text-gray-600 text-center mb-8">
            This is the Welcome page - Introduction text to our expense tracking app will go here.
          </p>
          
          <div className="flex flex-row gap-4 justify-center items-center">
            <NavLink
              to="/list"
              className="inline-flex items-center justify-center px-6 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors duration-200 no-underline"
            >
              View Expenses
            </NavLink>
            
            <NavLink
              to="/add"
              className="inline-flex items-center justify-center px-6 py-2 border-2 border-black text-black font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 no-underline"
            >
              Add Expense
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}