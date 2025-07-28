import { TripForm } from '@/components/trip-form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function NewTripPage() {
  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card>
        <CardHeader>New Trip</CardHeader>
        <CardContent>
          <TripForm />
        </CardContent>
      </Card>
    </div>
  );
}
