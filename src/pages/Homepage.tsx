import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DestinationSearchBar from '@/components/DestinationSearchBar';
import PackageCard from '@/components/PackageCard';

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

// Placeholder data for featured packages
const featuredPackages = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop',
    title: 'The Golden Triangle',
    price: 45000,
    highlights: ['Visit Taj Mahal', 'Explore Amber Fort', 'Rickshaw ride in Delhi', '5-Star Hotels'],
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?q=80&w=1932&auto=format&fit=crop',
    title: 'Kerala Backwater Bliss',
    price: 60000,
    highlights: ['Houseboat Stay', 'Kathakali Performance', 'Spice Plantation Tour', 'Beach Resorts'],
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1617347454431-145444523714?q=80&w=2070&auto=format&fit=crop',
    title: 'Royal Rajasthan Tour',
    price: 75000,
    highlights: ['Jodhpur & Udaipur Forts', 'Desert Safari', 'Cultural Evenings', 'Heritage Hotels'],
  },
];

const Homepage = () => {
  console.log('Homepage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative h-[calc(100vh-4rem)] min-h-[500px] md:h-[650px] w-full flex items-center justify-center text-white">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1925&auto=format&fit=crop"
              alt="Beautiful landscape of India"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-2xl"
            >
              Explore the Soul of India
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 max-w-2xl text-lg md:text-xl text-white/90 drop-shadow-lg"
            >
              From majestic mountains to serene backwaters, your unforgettable journey begins here.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 w-full max-w-4xl"
            >
              <DestinationSearchBar />
            </motion.div>
          </div>
        </section>

        {/* Featured Packages Section */}
        <section className="py-16 md:py-24 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center">Featured Travel Packages</h2>
            <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground">
              Handpicked journeys to India's most iconic destinations, designed for an unforgettable experience.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPackages.map((pkg) => (
                <PackageCard key={pkg.title} {...pkg} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Button asChild size="lg">
                <Link to="/packages-listing">View All Packages</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Special Offers Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Card className="overflow-hidden shadow-lg md:grid md:grid-cols-2 items-center">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold">Limited Time Offers</h2>
                <p className="mt-4 text-muted-foreground">
                  Don't miss out on our exclusive deals. Get amazing discounts on flights, hotels, and holiday packages.
                </p>
                <Button asChild size="lg" className="mt-6">
                  <Link to="/offers">Discover Deals</Link>
                </Button>
              </div>
              <div className="h-64 md:h-full">
                <img src="https://images.unsplash.com/photo-1596701062353-73335198a27a?q=80&w=1964&auto=format&fit=crop" alt="Offer background" className="h-full w-full object-cover" />
              </div>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Trip Cost Estimator CTA Section */}
        <section className="py-16 md:py-24 text-center bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold">Plan Your Own Adventure</h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
              Use our real-time cost estimator to build a personalized trip that perfectly fits your budget and travel style.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link to="/trip-cost-estimator">Create Your Custom Trip</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;