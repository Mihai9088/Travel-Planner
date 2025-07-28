'use client';
import { Trip } from '@/app/generated/prisma';
import Image from 'next/image';
import React, { useState } from 'react';
import { Calendar, Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Tabs, TabsList } from '@radix-ui/react-tabs';
import { TabsContent, TabsTrigger } from './ui/tabs';
import { getTripDurationInDays } from '@/lib/utils';

type TripDetailClientProps = {
  trip: Trip;
};

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
          <TabsList className="mb-6">
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

          <TabsContent className="sace-y-6" value="overview">
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
                  <div className="flex itema-start"></div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TripDetail;
