import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './pages/Layout';
import Welcome from './pages/Welcome';
import Expenses, { loader as expensesLoader } from './pages/Expenses';
import Transactions, { loader as transactionsLoader } from './pages/Transactions';
import ExpenseDetails, { loader as expenseDetailLoader } from './pages/ExpenseDetails';
import NewTransfer, { loader as newTransferLoader } from './pages/NewTransfer';
import NewExpense, { loader as newExpenseLoader } from './pages/NewExpense';
import { ApolloProvider } from '@apollo/client/react';
import client from './lib/graphql-client';

const router = createBrowserRouter([
    {
      Component: Layout,
      id: "layout",

      children: [
        { index: true, Component: Welcome },
        {
          path: 'expenses',
          Component: Expenses,
          loader: expensesLoader,
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
     <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );

}

export default App;
