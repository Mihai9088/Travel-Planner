'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <section className="container mx-auto px-6 py-20 text-center space-y-10">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Your Next Adventure Starts Here 🌍
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Plan, organize and visualize your dream trips with ease. Discover the world one trip at a
          time.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/trips">
            <Button size="lg">View My Trips</Button>
          </Link>
          <Link href="/trips/new">
            <Button size="lg" variant="outline">
              Create a Trip
            </Button>
          </Link>
        </div>
        <div className="mt-10">
          <Image
            src="/images/travel.jpg"
            alt="Travel"
            width={800}
            height={500}
            className="mx-auto rounded-xl shadow-lg"
          />
        </div>
      </section>

      <section className="bg-white py-16 px-6">
        <div className="container mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-600">🗺️ Interactive Maps</h3>
            <p className="text-gray-600">
              Visualize all your trip locations on a 3D globe or Google Maps.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-600">📆 Itinerary Builder</h3>
            <p className="text-gray-600">
              Organize your trips by adding destinations and dates seamlessly.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-600">🌍 Travel Stats</h3>
            <p className="text-gray-600">
              Track how many countries you’ve visited and revisit your memories.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-blue-100 py-16 text-center px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to explore the world?</h2>
        <p className="text-gray-600 mb-8">
          Start building your next trip and capture every memory.
        </p>
        <Link href="/trips/new">
          <Button size="lg">Plan Your Trip</Button>
        </Link>
      </section>
    </div>
  );
}
