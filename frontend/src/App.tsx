import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './pages/Layout';
import Welcome from './pages/Welcome';
import List from './pages/List';
import Add from './pages/Add';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Welcome />
      },
      {
        path: "list",
        element: <List />
      },
      {
        path: "add",
        element: <Add />
      }
    ]
  }
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
}

export default App
