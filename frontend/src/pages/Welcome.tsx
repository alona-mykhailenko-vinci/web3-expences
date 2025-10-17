import { NavLink } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export default function Welcome() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12">
      {/* Hero content */}
      <div className="text-center space-y-12">
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-7xl md:text-8xl font-extrabold tracking-tight" 
                style={{ 
                  color: '#06141B',
                  background: 'linear-gradient(135deg, #06141B 0%, #11212D 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
              Expense Tracker
            </h1>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#e4d7bc' }}></div>
          </div>
          
          <div className="space-y-4 max-w-3xl mx-auto">
                        <p className="text-xl md:text-2xl leading-relaxed" style={{ color: '#11212D' }}>
              Take control of your financial future with our intuitive expense tracking solution. 
              Monitor, categorize, and analyze your spending patterns effortlessly.
            </p>
                        <p className="text-lg mb-8" style={{ color: '#253745' }}>
              Join thousands who have already simplified their expense management and gained valuable insights into their spending habits.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-12 justify-center items-center pt-8">
          <Button 
            asChild 
            size="lg" 
            className="min-w-[240px] h-16 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300" 
            style={{ backgroundColor: '#06141B', color: '#ffffff' }}
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
              borderColor: '#06141B', 
              color: '#06141B',
              borderWidth: '2px'
            }}
          >
            <NavLink to="/add" style={{ color: '#06141B' }}>
              Add Expense
            </NavLink>
          </Button>
        </div>
      </div>
    </div>
  );
}