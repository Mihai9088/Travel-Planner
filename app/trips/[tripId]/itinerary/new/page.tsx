import NewLocationClient from '@/components/new-location';

const NewLocation = async ({ params }: { params: { tripId: string } }) => {
  const { tripId } = params;

  return <NewLocationClient tripId={tripId} />;
};

export default NewLocation;
