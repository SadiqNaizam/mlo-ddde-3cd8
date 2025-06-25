import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MapPin, User, Menu } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Packages', href: '/packages-listing' },
    { name: 'Offers', href: '/offers' },
    { name: 'Trip Cost Estimator', href: '/trip-cost-estimator' },
  ];

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary' : 'text-muted-foreground'
    }`;

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg hidden sm:inline-block">Incredible India Planner</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.href} className={navLinkClasses}>
              {link.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">User Account</span>
          </Button>
          
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="grid gap-4 py-6">
                  <Link to="/" className="flex items-center gap-2 mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">Incredible India Planner</span>
                  </Link>
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.href}
                      className={({ isActive }) =>
                        `flex w-full items-center py-2 text-lg font-semibold ${isActive ? 'text-primary' : ''}`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;