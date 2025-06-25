import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  const infoLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  ];

  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-2">
             <Link to="/" className="flex items-center gap-2 mb-2 w-fit">
              <MapPin className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Incredible India Planner</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your seamless journey to the heart of India begins here.
            </p>
          </div>

          <div className="md:mx-auto">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              {infoLinks.map((link) => (
                <Link key={link.name} to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:ml-auto">
             <h3 className="font-semibold mb-4">Connect With Us</h3>
             <div className="flex gap-4">
               {socialLinks.map((social) => (
                  <Link key={social.name} to={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                    <social.icon className="h-6 w-6" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
               ))}
             </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Incredible India Planner. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;