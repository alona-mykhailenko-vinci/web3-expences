import { NavLink } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export default function Welcome() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center py-12">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-foreground mb-4">
            Expense Tracker
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Take control of your finances with our intuitive expense tracking application. 
            Monitor your spending, categorize expenses, and gain insights into your financial habits.
          </p>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Start by viewing your current expenses or adding a new one to get started.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button asChild size="lg" className="min-w-[180px]" style={{ backgroundColor: '#1a2037', color: '#e4d7bc' }}>
            <NavLink to="/list">
              View Expenses
            </NavLink>
          </Button>
          
          <Button asChild variant="outline" size="lg" className="min-w-[180px]" style={{ borderColor: '#1a2037', color: '#1a2037' }}>
            <NavLink to="/add" style={{ color: '#1a2037' }}>
              Add Expense
            </NavLink>
          </Button>
        </div>
      </div>
    </div>
  );
}