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
  
  console.log('Layout component: Received loader data:', loaderData);
  
  // Ensure we have valid data structure
  const safeLoaderData = {
    users: loaderData?.users || [],
    currentUser: loaderData?.currentUser || null
  };
  
  console.log('Layout component: Safe loader data:', safeLoaderData);

  return (
    <LayoutContext.Provider value={safeLoaderData}>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <Outlet context={{ currentUser: safeLoaderData.currentUser }} />
          </div>
        </div>
      </div>
    </LayoutContext.Provider>
  );
}