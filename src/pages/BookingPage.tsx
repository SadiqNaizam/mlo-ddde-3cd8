import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, CreditCard, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


// Validation schema using Zod
const bookingFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  cardName: z.string().min(2, { message: "Name on card is required." }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Card number must be 16 digits." }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Expiry date must be in MM/YY format." }),
  cvc: z.string().regex(/^\d{3,4}$/, { message: "CVC must be 3 or 4 digits." }),
  terms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions.",
  }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const BookingPage = () => {
  console.log('BookingPage loaded');
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve state from navigation or use default values
  const tripDetails = location.state || {
    totalCost: 1850,
    numTravelers: '2',
    numDays: 7,
    hotelBudget: 150,
    includeFlights: true,
  };

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
      terms: false,
    },
  });

  function onSubmit(data: BookingFormValues) {
    console.log("Booking submitted:", data);
    toast.success("Booking Confirmed!", {
      description: "Your trip to Incredible India is booked. Confirmation sent to your email.",
      duration: 5000,
    });
    // Redirect to homepage after successful booking
    setTimeout(() => navigate('/'), 5000);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container py-24 md:py-32">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Complete Your Booking</h1>
            <p className="mt-4 text-lg text-muted-foreground">You're just one step away from your adventure.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Traveler Information</CardTitle>
                    <CardDescription>Please provide the primary contact's details.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField control={form.control} name="fullName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="John Doe" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}/>
                    <FormField control={form.control} name="email" render={({ field }) => (
                       <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                           <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input type="email" placeholder="you@example.com" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}/>
                     <FormField control={form.control} name="phone" render={({ field }) => (
                       <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                           <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="(123) 456-7890" className="pl-10" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}/>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                    <CardDescription>All transactions are secure and encrypted.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <FormField control={form.control} name="cardName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name on Card</FormLabel>
                          <FormControl><Input placeholder="John M Doe" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}/>
                      <FormField control={form.control} name="cardNumber" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input placeholder="•••• •••• •••• ••••" className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}/>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="expiryDate" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}/>
                        <FormField control={form.control} name="cvc" render={({ field }) => (
                           <FormItem>
                            <FormLabel>CVC</FormLabel>
                            <FormControl><Input placeholder="•••" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}/>
                      </div>
                  </CardContent>
                </Card>

                 <FormField control={form.control} name="terms" render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Accept terms and conditions</FormLabel>
                      <FormDescription>
                        You agree to our Terms of Service and Privacy Policy.
                      </FormDescription>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}/>
                
                <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Processing...' : `Confirm & Book for $${tripDetails.totalCost.toLocaleString()}`}
                </Button>
              </form>
            </Form>
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Trip Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 {!location.state && (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Using Default Itinerary</AlertTitle>
                    <AlertDescription>
                      Plan your custom trip with our estimator for a personalized booking.
                    </AlertDescription>
                  </Alert>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Travelers</span>
                  <span>{tripDetails.numTravelers} Adult{parseInt(tripDetails.numTravelers) > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span>{tripDetails.numDays} Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hotel Budget</span>
                  <span>${tripDetails.hotelBudget} / night</span>
                </div>
                 <div className="flex justify-between">
                  <span className="text-muted-foreground">Flights</span>
                  <span className={tripDetails.includeFlights ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {tripDetails.includeFlights ? 'Included' : 'Not Included'}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Total Cost</span>
                  <span className="text-2xl font-bold text-primary">${tripDetails.totalCost.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;