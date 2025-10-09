import { NavLink } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Expense Tracker
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Take control of your finances with our intuitive expense tracking application. 
            Monitor your spending, categorize expenses, and gain insights into your financial habits.
          </p>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Start by viewing your current expenses or adding a new one to get started.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <NavLink
            to="/list"
            className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200 no-underline min-w-[180px]"
          >
            View Expenses
          </NavLink>
          
          <NavLink
            to="/add"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold text-lg rounded-lg hover:bg-blue-600 hover:text-white hover:shadow-lg transform hover:scale-105 transition-all duration-200 no-underline min-w-[180px]"
          >
            Add Expense
          </NavLink>
        </div>
      </div>
    </div>
  );
}