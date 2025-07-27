import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const page = async () => {
  const session = await auth();
  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen  text-gray-700 text-sx">
        Please sign in to view your trips.
      </div>
    );
  }
  return (
    <div className="space-y-6 container px-4 py-8">
      <div>
        <h1>Dashboard</h1>
        <Link href={'/trips/new'}></Link>
        <Button>New Trip</Button>
      </div>
    </div>
  );
};

export default page;
