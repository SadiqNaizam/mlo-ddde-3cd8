import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar as CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const DestinationSearchBar: React.FC = () => {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const navigate = useNavigate();

  console.log("DestinationSearchBar loaded");

  const handleSearch = () => {
    console.log("Searching for:", {
      destination,
      from: date?.from ? format(date.from, "yyyy-MM-dd") : "N/A",
      to: date?.to ? format(date.to, "yyyy-MM-dd") : "N/A",
    });
    // In a real app, you would pass these as query params
    // e.g., navigate(`/packages-listing?destination=${destination}&from=${...}`);
    navigate("/packages-listing");
  };

  return (
    <div className="p-4 bg-background/80 backdrop-blur-sm rounded-xl shadow-2xl border">
      <div className="flex flex-col md:flex-row items-center gap-4">
        {/* Destination Input */}
        <div className="relative w-full md:flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Where are you going?"
            className="pl-10 h-12 text-base"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        {/* Date Range Picker */}
        <div className="w-full md:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full md:w-[300px] h-12 justify-start text-left font-normal text-base",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-5 w-5" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick your dates</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Button */}
        <Button onClick={handleSearch} className="w-full md:w-auto h-12 text-base px-6">
          <Search className="mr-2 h-5 w-5" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default DestinationSearchBar;