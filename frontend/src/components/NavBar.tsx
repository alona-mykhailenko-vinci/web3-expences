import { NavLink, useLocation } from 'react-router';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

export default function NavBar() {
  const location = useLocation();

  return (
    <div className="text-white w-lvw p-4 flex flex-row shadow-lg justify-center" style={{backgroundColor: '#1a2037'}}>
      <NavigationMenu className="text-white">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={location.pathname === '/' ? 'font-bold px-8 underline' : 'px-8'}
              style={{
                color: '#e4d7bc',
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
              className={location.pathname === '/add' ? 'font-bold px-8 underline' : 'px-8'}
              style={{
                color: '#e4d7bc',
                backgroundColor: 'transparent'
              }}
            >
              <NavLink to="/add">
                Add Expense
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={location.pathname === '/list' ? 'font-bold px-8 underline' : 'px-8'}
              style={{
                color: '#e4d7bc',
                backgroundColor: 'transparent'
              }}
            >
              <NavLink to="/list">
                Expense List
              </NavLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}