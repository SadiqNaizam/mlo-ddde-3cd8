import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plane, BedDouble, Users, CalendarDays, Palmtree, Mountain, Ship } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';

const activities = [
  { id: 'cityTour', label: 'City Tour', icon: Palmtree, cost: 50 },
  { id: 'safari', label: 'Wildlife Safari', icon: Ship, cost: 150 },
  { id: 'trekking', label: 'Mountain Trekking', icon: Mountain, cost: 120 },
];

const BASE_FLIGHT_COST = 450; // Per person

const TripCostEstimatorTool: React.FC = () => {
  console.log('TripCostEstimatorTool loaded');
  const navigate = useNavigate();

  const [includeFlights, setIncludeFlights] = useState(true);
  const [numTravelers, setNumTravelers] = useState('2');
  const [numDays, setNumDays] = useState([7]);
  const [hotelBudget, setHotelBudget] = useState([150]);
  const [selectedActivities, setSelectedActivities] = useState<Record<string, boolean>>({
    cityTour: true,
  });
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const calculateCost = () => {
      const travelers = parseInt(numTravelers, 10);
      const days = numDays[0];
      const hotelRate = hotelBudget[0];

      // 1. Flight Cost
      const flightCost = includeFlights ? travelers * BASE_FLIGHT_COST : 0;

      // 2. Hotel Cost
      const hotelCost = days * hotelRate;

      // 3. Activities Cost
      const activitiesCost = activities.reduce((acc, activity) => {
        if (selectedActivities[activity.id]) {
          return acc + activity.cost * travelers;
        }
        return acc;
      }, 0);
      
      const newTotalCost = flightCost + hotelCost + activitiesCost;
      setTotalCost(newTotalCost);
    };

    calculateCost();
  }, [includeFlights, numTravelers, numDays, hotelBudget, selectedActivities]);

  const handleActivityChange = (activityId: string) => {
    setSelectedActivities(prev => ({
      ...prev,
      [activityId]: !prev[activityId],
    }));
  };

  const handleBookNow = () => {
    // In a real app, we'd pass this state to the booking page
    navigate('/booking', {
      state: {
        totalCost,
        numTravelers,
        numDays: numDays[0],
        hotelBudget: hotelBudget[0],
        includeFlights,
        selectedActivities,
      },
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold">Plan Your Custom Trip</CardTitle>
        <CardDescription>Adjust the options below to get a real-time cost estimate.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-6">
        {/* Controls Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column 1 */}
            <div className="space-y-8">
              {/* Flights */}
              <div className="flex items-center justify-between">
                <Label htmlFor="include-flights" className="flex items-center gap-2 text-lg"><Plane size={20} /> Include Flights</Label>
                <Switch id="include-flights" checked={includeFlights} onCheckedChange={setIncludeFlights} />
              </div>
              {/* Travelers */}
              <div>
                <Label htmlFor="num-travelers" className="flex items-center gap-2 text-lg mb-2"><Users size={20} /> Travelers</Label>
                <Select value={numTravelers} onValueChange={setNumTravelers}>
                  <SelectTrigger id="num-travelers" className="w-full">
                    <SelectValue placeholder="Select number of travelers" />
                  </SelectTrigger>
                  <SelectContent>
                    {[...Array(8)].map((_, i) => (
                      <SelectItem key={i + 1} value={`${i + 1}`}>{i + 1} Traveler{i > 0 ? 's' : ''}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
               {/* Activities */}
              <div>
                <Label className="flex items-center gap-2 text-lg mb-4"><Palmtree size={20} /> Activities</Label>
                <div className="space-y-3">
                  {activities.map((activity) => (
                     <div key={activity.id} className="flex items-center space-x-2">
                        <Checkbox id={activity.id} checked={!!selectedActivities[activity.id]} onClick={() => handleActivityChange(activity.id)} />
                        <Label htmlFor={activity.id} className="font-normal flex items-center gap-2">
                            <activity.icon size={16} className="text-muted-foreground" />
                            {activity.label}
                        </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-8">
              {/* Duration */}
              <div>
                <Label htmlFor="duration-slider" className="flex items-center justify-between text-lg mb-2">
                  <span className="flex items-center gap-2"><CalendarDays size={20} /> Duration</span>
                  <span className="font-bold">{numDays[0]} Days</span>
                </Label>
                <Slider id="duration-slider" min={3} max={21} step={1} value={numDays} onValueChange={setNumDays} />
              </div>

              {/* Hotel Budget */}
              <div>
                <Label htmlFor="hotel-slider" className="flex items-center justify-between text-lg mb-2">
                  <span className="flex items-center gap-2"><BedDouble size={20} /> Hotel Budget/Night</span>
                  <span className="font-bold">${hotelBudget[0]}</span>
                </Label>
                <Slider id="hotel-slider" min={50} max={500} step={10} value={hotelBudget} onValueChange={setHotelBudget} />
              </div>
            </div>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="flex flex-col sm:flex-row items-center justify-between p-6 bg-gray-50/50">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <p className="text-sm text-muted-foreground">Estimated Trip Cost</p>
          <p className="text-4xl font-extrabold text-primary">
            $<AnimatedCounter value={totalCost} />
          </p>
        </div>
        <Button size="lg" className="w-full sm:w-auto" onClick={handleBookNow}>
          Book This Trip
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TripCostEstimatorTool;