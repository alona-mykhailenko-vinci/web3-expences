import { useLoaderData, Link } from 'react-router-dom';
import type { LoaderData } from './loader';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ExpensesComponent() {
  const { expenses } = useLoaderData() as LoaderData;

  return (
    <div className="min-h-[calc(100vh-160px)] py-12 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50 opacity-60"></div>
      
      <div className="space-y-8 relative z-10">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#1a2037' }}>
            Expenses
          </h1>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: '#e4d7bc' }}></div>
          <p className="text-lg opacity-70 mt-4" style={{ color: '#6b7280' }}>
            Track and manage all your expenses
          </p>
        </div>

        {/* Expense Counter */}
        {expenses.length > 0 && (
          <div className="flex flex-row justify-between items-center mb-8 p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border border-white/20">
            <h2 className="text-2xl font-semibold flex items-center gap-3" style={{ color: '#1a2037' }}>
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#e4d7bc' }}></span>
              Total Expenses ({expenses.length})
            </h2>
          </div>
        )}

        {/* Expenses Table */}
        <div className="w-full">
          {expenses.length === 0 ? (
            <div className="text-center my-16 p-12 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg">
              <p className="text-xl font-medium mb-4" style={{ color: '#1a2037' }}>
                No expenses yet
              </p>
              <p className="text-lg opacity-70" style={{ color: '#6b7280' }}>
                Add your first expense to get started!
              </p>
            </div>
          ) : (
            <div className="overflow-hidden shadow-2xl rounded-2xl bg-white/90 backdrop-blur-sm border border-white/20">
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2" style={{ borderColor: '#e4d7bc' }}>
                    <TableHead className="text-left py-6 px-6 font-bold text-base" style={{ color: '#1a2037' }}>Date</TableHead>
                    <TableHead className="text-left py-6 px-6 font-bold text-base" style={{ color: '#1a2037' }}>Description</TableHead>
                    <TableHead className="text-left py-6 px-6 font-bold text-base" style={{ color: '#1a2037' }}>Paid By</TableHead>
                    <TableHead className="text-left py-6 px-6 font-bold text-base" style={{ color: '#1a2037' }}>Participants</TableHead>
                    <TableHead className="text-right py-6 px-6 font-bold text-base" style={{ color: '#1a2037' }}>Amount</TableHead>
                    <TableHead className="text-center py-6 px-6 font-bold text-base" style={{ color: '#1a2037' }}>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense, index) => (
                    <TableRow 
                      key={expense.id} 
                      className="hover:bg-white/80 transition-all duration-300 border-b border-gray-100"
                      style={{ 
                        backgroundColor: index % 2 === 0 ? 'transparent' : 'rgba(228, 215, 188, 0.1)'
                      }}
                    >
                      <TableCell className="text-left py-6 px-6 text-sm font-medium" style={{ color: '#6b7280' }}>
                        {new Date(expense.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-left py-6 px-6">
                        <div className="text-base font-semibold" style={{ color: '#1a2037' }} title={expense.description}>
                          {expense.description}
                        </div>
                      </TableCell>
                      <TableCell className="text-left py-6 px-6">
                        <div className="text-sm font-medium" style={{ color: '#1a2037' }}>
                          {expense.payer.name}
                        </div>
                      </TableCell>
                      <TableCell className="text-left py-6 px-6">
                        <div className="text-xs text-gray-500">
                          {expense.participants.map(p => p.name).join(', ')}
                        </div>
                      </TableCell>
                      <TableCell className="text-right py-6 px-6 text-lg font-bold" style={{ color: '#1a2037' }}>
                        ${expense.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-center py-6 px-6">
                        <Link 
                          to={`/expenses/${expense.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                        >
                          View Details
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
