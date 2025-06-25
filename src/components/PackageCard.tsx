import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CheckCircle } from 'lucide-react';

interface PackageCardProps {
  imageUrl: string;
  title: string;
  price: number;
  highlights: string[];
}

const PackageCard: React.FC<PackageCardProps> = ({ imageUrl, title, price, highlights }) => {
  console.log('PackageCard loaded for:', title);

  return (
    <Card className="group relative w-full max-w-sm overflow-hidden rounded-xl shadow-md transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
      <div className="relative">
        <AspectRatio ratio={4 / 3}>
          <img 
            src={imageUrl || 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop'} 
            alt={`View of ${title}`} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
          />
        </AspectRatio>
        
        {/* Hover Overlay with Highlights */}
        <div className="absolute inset-0 flex flex-col justify-center bg-black bg-opacity-0 p-6 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:bg-opacity-60 group-hover:opacity-100">
          <h3 className="mb-3 text-lg font-semibold text-white">Package Includes:</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            {highlights.slice(0, 4).map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4 flex-shrink-0 text-green-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Base Content (visible when not hovered) */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 transition-opacity duration-300 group-hover:opacity-0">
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">{title}</h2>
        </div>
      </div>
      
      <CardContent className="flex items-center justify-between bg-white p-4">
        <span className="text-md font-semibold text-gray-600">Starting from</span>
        <p className="text-2xl font-bold text-slate-800">
          ₹{price.toLocaleString('en-IN')}
        </p>
      </CardContent>
    </Card>
  );
};

export default PackageCard;