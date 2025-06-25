import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PackageCard from '@/components/PackageCard';

// shadcn/ui Components
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

// Icons
import { Filter } from 'lucide-react';

// Placeholder data for travel packages
const packages = [
  {
    id: 1,
    title: 'Golden Triangle Delight',
    price: 25000,
    imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop',
    highlights: ['Delhi Sightseeing', 'Agra - Taj Mahal', 'Jaipur Forts', '4 Star Hotels'],
  },
  {
    id: 2,
    title: 'Kerala Backwater Bliss',
    price: 35000,
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1935&auto=format&fit=crop',
    highlights: ['Houseboat Stay', 'Munnar Tea Gardens', 'Kochi Culture', 'All Meals Included'],
  },
  {
    id: 3,
    title: 'Himalayan Adventure',
    price: 45000,
    imageUrl: 'https://images.unsplash.com/photo-1616182583852-a72a1534354c?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Trekking in Ladakh', 'Monastery Visits', 'Camping Under Stars', 'Expert Guides'],
  },
  {
    id: 4,
    title: 'Regal Rajasthan',
    price: 42000,
    imageUrl: 'https://images.unsplash.com/photo-1599661046223-e06f760db6a5?q=80&w=2070&auto=format&fit=crop',
    highlights: ['Udaipur Lake City', 'Jodhpur Blue City', 'Desert Safari', 'Palace Stays'],
  },
  {
    id: 5,
    title: 'Goan Beach Paradise',
    price: 22000,
    imageUrl: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1974&auto=format&fit=crop',
    highlights: ['North Goa Beaches', 'South Goa Relaxation', 'Water Sports', 'Nightlife'],
  },
  {
    id: 6,
    title: 'Spiritual Varanasi',
    price: 18000,
    imageUrl: 'https://images.unsplash.com/photo-1561361522-35a392b9d0e2?q=80&w=1974&auto=format&fit=crop',
    highlights: ['Ganges River Aarti', 'Boat Tour', 'Temple Visits', 'Cultural Immersion'],
  },
];

const PackagesListingPage = () => {
  console.log('PackagesListingPage loaded');
  const [priceRange, setPriceRange] = useState([5000, 50000]);

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Header />
      <main className="flex-grow container pt-24 md:pt-28 pb-12">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Packages</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="mt-6 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Explore Our Packages</h1>
            <p className="mt-4 text-lg text-muted-foreground">Find the perfect journey curated just for you.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mt-10">
          {/* Filters Sidebar */}
          <aside className="lg:w-1/4">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Filter size={20} /> Filter & Sort</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="sort-by">Sort by</Label>
                  <Select defaultValue="relevance">
                    <SelectTrigger id="sort-by" className="w-full mt-1">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="price-asc">Price: Low to High</SelectItem>
                      <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div>
                    <div className="flex justify-between items-center">
                        <Label htmlFor="price-range">Price Range</Label>
                        <span className="text-sm font-medium">₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}</span>
                    </div>
                    <Slider
                        id="price-range"
                        min={10000}
                        max={80000}
                        step={1000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="mt-2"
                    />
                </div>
                <Separator />
                <div>
                  <Label>Trip Type</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="type-adventure" />
                      <Label htmlFor="type-adventure" className="font-normal">Adventure</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="type-cultural" />
                      <Label htmlFor="type-cultural" className="font-normal">Cultural</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="type-relax" />
                      <Label htmlFor="type-relax" className="font-normal">Relaxation</Label>
                    </div>
                  </div>
                </div>
                <Separator />
                <Button className="w-full">Apply Filters</Button>
              </CardContent>
            </Card>
          </aside>

          {/* Packages Grid */}
          <section className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {packages.map((pkg) => (
                 <Link to="/booking" key={pkg.id}>
                    <PackageCard
                    title={pkg.title}
                    price={pkg.price}
                    imageUrl={pkg.imageUrl}
                    highlights={pkg.highlights}
                    />
                </Link>
              ))}
            </div>
            {/* Pagination */}
            <nav className="mt-12 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </nav>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PackagesListingPage;