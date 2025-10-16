import { Outlet, useLoaderData } from 'react-router-dom';
import { createContext, useContext } from 'react';
import NavBar from '../../components/NavBar';
import type { LoaderData } from './loader';

// Create a context for the loader data
const LayoutContext = createContext<LoaderData | null>(null);

// Custom hook to use the layout context
export function useLayoutData() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayoutData must be used within a Layout component');
  }
  return context;
}

export default function Layout() {
  const loaderData = useLoaderData() as LoaderData;

  return (
    <LayoutContext.Provider value={loaderData}>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </div>
      </div>
    </LayoutContext.Provider>
  );
}