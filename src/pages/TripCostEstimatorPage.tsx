import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TripCostEstimatorTool from '@/components/TripCostEstimatorTool';

/**
 * TripCostEstimatorPage
 * 
 * A key feature page with a dynamic and interactive tool. Users can use toggles,
 * sliders, and selectors to add or remove services (e.g., flight class, hotel
 * star rating, guided tours), with the total estimated cost updating instantly
 * via animated counters.
 */
const TripCostEstimatorPage: React.FC = () => {
  console.log('TripCostEstimatorPage loaded');

  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      {/* The Header is fixed and will stay at the top */}
      <Header />

      {/* Main content area that holds the estimator tool */}
      <main className="flex-1">
        {/* A subtle background pattern for visual appeal, fitting the elegant design goal */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* Container to center the TripCostEstimatorTool vertically and horizontally */}
        <div className="container relative z-10 flex items-center justify-center px-4 pt-32 pb-16 sm:pt-32 sm:pb-24">
          <TripCostEstimatorTool />
        </div>
      </main>

      {/* The Footer is at the bottom of the page */}
      <Footer />
    </div>
  );
};

export default TripCostEstimatorPage;