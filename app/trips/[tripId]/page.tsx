import { auth } from '@/auth';
import TripDetail from '@/components/trip-detail';
import { getTripById } from '@/lib/actions/get-trips';
import React from 'react';

const pageDetail = async ({ params }: { params: { tripId: string } }) => {
  const { tripId } = params;

  const session = await auth();

  if (!session?.user?.id) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-sx">
        Please sign in.
      </div>
    );
  }

  const trip = await getTripById(tripId, session.user.id);

  if (!trip) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-sx">
        Trip not found.
      </div>
    );
  }

  return <TripDetail trip={trip} />;
};

export default pageDetail;
