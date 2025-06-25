import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OfferBanner from '@/components/OfferBanner';
import PackageCard from '@/components/PackageCard';

const featuredPackages = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop',
    title: 'Golden Triangle Getaway',
    price: 45000,
    highlights: ['5 Nights / 6 Days', 'Flights Included', 'Guided Tours in Delhi, Agra, Jaipur', '4-Star Hotel Stays'],
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=1932&auto=format&fit=crop',
    title: 'Kerala Backwaters Escape',
    price: 38000,
    highlights: ['4 Nights / 5 Days', 'Houseboat Stay', 'Spice Plantation Visit', 'Kathakali Performance'],
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1588225578943-34a4577884a4?q=80&w=2070&auto=format&fit=crop',
    title: 'Himalayan Adventure: Leh-Ladakh',
    price: 62000,
    highlights: ['7 Nights / 8 Days', 'Mountain Biking', 'Pangong Lake Visit', 'Monastery Tours'],
  },
];

const OffersPage = () => {
  console.log('OffersPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <main className="flex-grow pt-16">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Section for the main offer banner */}
          <section className="mb-12">
            <OfferBanner
              title="Monsoon Magic Deals"
              description="Experience the lush beauty of India this rainy season. Get up to 30% off on select packages and create unforgettable memories."
              ctaText="Explore Deals"
              ctaLink="#featured-offers"
            />
          </section>

          {/* Section for displaying featured package cards */}
          <section id="featured-offers">
            <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
              Featured Offers
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPackages.map((pkg) => (
                <div key={pkg.title} className="flex justify-center">
                   <PackageCard
                    imageUrl={pkg.imageUrl}
                    title={pkg.title}
                    price={pkg.price}
                    highlights={pkg.highlights}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OffersPage;