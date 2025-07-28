'use client';
import { Location, Trip } from '@/app/generated/prisma';
import Image from 'next/image';
import React, { useState } from 'react';
import { Calendar, MapPin, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Tabs, TabsList } from '@radix-ui/react-tabs';
import { TabsContent, TabsTrigger } from './ui/tabs';
import { getTripDurationInDays } from '@/lib/utils';
import Map from './map';
import SortableItinerary from './sortable-itinerary';

type TripDetailClientProps = {
  trip: TripWithLocations;
};

export type TripWithLocations = Trip & { locations: Location[] };

const TripDetail = ({ trip }: TripDetailClientProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {trip.imageUrl && (
        <div className="w-full h-72 md:h-96 overflow-hidden rounded-xl shadow-lg relative">
          <Image src={trip.imageUrl} alt={trip.title} fill priority className="object-cover" />
        </div>
      )}

      <div className="bg-white p-6 shadow rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">{trip.title}</h1>

          <div className=" mt-2 flex items-center text-gray-500">
            <Calendar className="h-5 w-5 mr-2" />
            <span className="text-lg">
              {' '}
              {trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href={`/trips/${trip.id}/itinerary/new`}>
            <Button>
              <Plus className="mr-2 h-5 w-5" /> Add Location
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 shadow rounded-lg">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 ">
            <TabsTrigger className="text-lg" value="overview">
              Overview
            </TabsTrigger>
            <TabsTrigger className="text-lg" value="itinerary">
              Itinerary
            </TabsTrigger>
            <TabsTrigger className="text-lg" value="map">
              Map
            </TabsTrigger>
          </TabsList>

          <TabsContent className="space-y-6" value="overview">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Trip Summary</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-6 w-6 mr-3 text-gray-500" />
                    <div>
                      <p className="font-medium text-gray-700">Dates</p>
                      <p className="text-sm text-gray-500">
                        {trip.startDate.toLocaleDateString()} - {trip.endDate.toLocaleDateString()}
                        <br />
                        {getTripDurationInDays(trip.startDate, trip.endDate)} day(s)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 mr-3 text-gray-500" />
                    <div>
                      <p>Destinations</p>
                      <p>
                        {trip.locations.length}{' '}
                        {trip.locations.length === 1 ? 'destination' : 'destinations'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-72 rounded-lg overflow-hidden shadow">
                <Map itineraries={trip.locations} />
              </div>
              {trip.locations.length === 0 && (
                <div className="text-center p-4">
                  <p>Add locations to your trip</p>
                  <Link href={`/trips/${trip.id}/itinerary/new`}>
                    <Button>
                      <Plus className="mr-2 h-5 w-5" /> Add Location
                    </Button>
                  </Link>
                </div>
              )}

              <div>
                <p className="text-gray-600 leading-relaxed">{trip.description}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="itinerary" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold"> Full Itinerary</h2>
            </div>

            {trip.locations.length === 0 ? (
              <div className="text-center p-4">
                <p>Add locations to see them on the itinerary.</p>
                <Link href={`/trips/${trip.id}/itinerary/new`}>
                  <Button>
                    {' '}
                    <Plus className="mr-2 h-5 w-5" /> Add Location
                  </Button>
                </Link>
              </div>
            ) : (
              <SortableItinerary locations={trip.locations} tripId={trip.id} />
            )}
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <div className="h-72 rounded-lg overflow-hidden shadow">
              <Map itineraries={trip.locations} />
            </div>
            {trip.locations.length === 0 && (
              <div className="text-center p-4">
                <p>Add locations to see them on the map.</p>
                <Link href={`/trips/${trip.id}/itinerary/new`}>
                  <Button>
                    {' '}
                    <Plus className="mr-2 h-5 w-5" /> Add Location
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <div className="text-center">
        <Link href={'/trips'}>
          <Button> Back to Trips</Button>
        </Link>
      </div>
    </div>
  );
};

export default TripDetail;
