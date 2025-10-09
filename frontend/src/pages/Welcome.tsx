import { NavLink } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export default function Welcome() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 opacity-60"></div>
      
      {/* Hero content */}
      <div className="text-center space-y-12 relative z-10">
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-7xl md:text-8xl font-extrabold tracking-tight" 
                style={{ 
                  color: '#1a2037',
                  background: 'linear-gradient(135deg, #1a2037 0%, #2d3748 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
              Expense Tracker
            </h1>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#e4d7bc' }}></div>
          </div>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl font-medium leading-relaxed" style={{ color: '#4a5568' }}>
              Take control of your finances with our beautifully designed expense tracking application
            </p>
            <p className="text-lg leading-relaxed opacity-80" style={{ color: '#6b7280' }}>
              Monitor spending, categorize expenses, and gain valuable insights into your financial habits
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-12 justify-center items-center pt-8">
          <Button 
            asChild 
            size="lg" 
            className="min-w-[240px] h-16 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" 
            style={{ backgroundColor: '#1a2037', color: '#e4d7bc' }}
          >
            <NavLink to="/list">
              View Expenses
            </NavLink>
          </Button>
          
          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="min-w-[240px] h-16 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 bg-white/80 backdrop-blur-sm" 
            style={{ 
              borderColor: '#1a2037', 
              color: '#1a2037',
              borderWidth: '2px'
            }}
          >
            <NavLink to="/add" style={{ color: '#1a2037' }}>
              Add Expense
            </NavLink>
          </Button>
        </div>
      </div>
    </div>
  );
}