import { NavLink, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

export default function NavBar() {
  const location = useLocation();

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-md shadow-xl border-b border-white/10" 
         style={{backgroundColor: '#06141B'}}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-center">
        <NavigationMenu className="text-white">
          <NavigationMenuList className="flex space-x-8">
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={`px-6 py-3 rounded-lg transition-all duration-300 hover:bg-white/10 ${location.pathname === '/' ? 'font-bold underline underline-offset-4' : ''}`}
                style={{
                  color: '#CCD0CF',
                  backgroundColor: 'transparent'
                }}
              >
                <NavLink to="/">
                  Welcome
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={`px-6 py-3 rounded-lg transition-all duration-300 hover:bg-white/10 ${location.pathname === '/expenses/new' ? 'font-bold underline underline-offset-4' : ''}`}
                style={{
                  color: '#CCD0CF',
                  backgroundColor: 'transparent'
                }}
              >
                <NavLink to="/expenses/new">
                  New Expense
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={`px-6 py-3 rounded-lg transition-all duration-300 hover:bg-white/10 ${location.pathname === '/list' ? 'font-bold underline underline-offset-4' : ''}`}
                style={{
                  color: '#CCD0CF',
                  backgroundColor: 'transparent'
                }}
              >
                <NavLink to="/list">
                  Expense List
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={`px-6 py-3 rounded-lg transition-all duration-300 hover:bg-white/10 ${location.pathname === '/transactions' ? 'font-bold underline underline-offset-4' : ''}`}
                style={{
                  color: '#CCD0CF',
                  backgroundColor: 'transparent'
                }}
              >
                <NavLink to="/transactions">
                  All Transactions
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={`px-6 py-3 rounded-lg transition-all duration-300 hover:bg-white/10 ${location.pathname === '/transfers/new' ? 'font-bold underline underline-offset-4' : ''}`}
                style={{
                  color: '#CCD0CF',
                  backgroundColor: 'transparent'
                }}
              >
                <NavLink to="/transfers/new">
                  New Transfer
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}