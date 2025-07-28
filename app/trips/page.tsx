import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { getTripsByUser } from '@/lib/actions/get-trips';
import { pluralize } from '@/lib/utils';
import { getSortedTrips, getUpcomingTrips } from '@/lib/utils';

const page = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-sx">
        Please sign in to view your trips.
      </div>
    );
  }

  const trips = getSortedTrips(await getTripsByUser(session.user.id));
  const upcomingTrips = getUpcomingTrips(trips);

  return (
    <div className="space-y-6 container px-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Link href="/trips/new">
          <Button className="cursor-pointer">New Trip</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome back {session.user?.name}</CardTitle>
          <CardContent>
            {trips.length === 0 ? (
              <p>No trips yet</p>
            ) : (
              <div className="flex gap-4">
                <p>You have {pluralize('trip', trips.length)}</p>
                {upcomingTrips.length > 0 && (
                  <p>You have {pluralize('upcoming trip', upcomingTrips.length)}</p>
                )}
              </div>
            )}
          </CardContent>
        </CardHeader>
      </Card>
      <div>
        <h2 className="text-xl font-semibold mb-4">Your recent trips</h2>
        {trips.length === 0 ? (
          <CardContent className="flex flex-col  items-center justify-center py-8">
            <h3 className="text-xl font-medium mb-2">No trips yet</h3>
            <p className="mb-4 text-center max-w-md">Start planning your next trip</p>
            <Link href="/trips/new">
              <Button className="cursor-pointer">Create trip</Button>
            </Link>
          </CardContent>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trips.slice(0, 6).map((trip, key) => (
              <Link href={`/trips/${trip.id}`} key={key}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="line-clamp-1 pb-2">{trip.title}</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="line-clamp-2 mb-2 text-sm">{trip.description}</p>
                    <div className="text-xs">
                      {' '}
                      {new Date(trip.startDate).toLocaleDateString()} -{' '}
                      {new Date(trip.endDate).toLocaleDateString()}{' '}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
