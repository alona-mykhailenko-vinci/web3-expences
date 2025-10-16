import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './pages/Layout';
import Welcome from './pages/Welcome';
import List from './pages/List';
import Add from './pages/Add';
import Transactions, { loader as transactionsLoader } from './pages/Transactions';
import ExpenseDetails, { loader as expenseDetailLoader } from './pages/ExpenseDetails';
import NewTransfer, { loader as newTransferLoader } from './pages/NewTransfer';
import NewExpense, { loader as newExpenseLoader } from './pages/NewExpense';

const router = createBrowserRouter([
    {
      Component: Layout,
      id: "layout",

      children: [
        { index: true, Component: Welcome },
        {
          path: 'list',
          Component: List,
        },
        {
          path: 'add',
          Component: Add,
        },
        {
          path: 'transactions',
          Component: Transactions,
          loader: transactionsLoader,
        },
        {
          path: 'expenses/:id',
          Component: ExpenseDetails,
          loader: expenseDetailLoader,
        },
        {
          path: 'transfers/new',
          Component: NewTransfer,
          loader: newTransferLoader,
        },
        {
          path: 'expenses/new',
          Component: NewExpense,
          loader: newExpenseLoader,
        }
      ],
    },
  ]);


function App() {
  return (
    <RouterProvider router={router} />
  );

}

export default App;
