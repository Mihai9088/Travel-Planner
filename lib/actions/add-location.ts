'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

async function geocodeAddress(address: string) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY!;
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`
  );

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error('Location not found');
  }

  const { lat, lng } = data.results[0].geometry.location;
  return { lat, lng };
}

export async function addLocation(formData: FormData, tripId: string): Promise<string | null> {
  const session = await auth();
  if (!session) return 'Not authenticated';

  const address = formData.get('address')?.toString();
  if (!address) return 'Missing address';

  try {
    const { lat, lng } = await geocodeAddress(address);

    const count = await prisma.location.count({ where: { tripId } });

    await prisma.location.create({
      data: {
        locationTitle: address,
        lat,
        lng,
        tripId,
        order: count,
      },
    });

    return null;
  } catch (error) {
    console.error(error);
    return 'Could not geocode address. Please try again.';
  }
}
