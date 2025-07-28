'use server';
import { prisma } from '@/lib/prisma';

export async function getTripsByUser(userId: string) {
  return await prisma.trip.findMany({
    where: { userId },
  });
}

export async function getTripById(tripId: string, userId: string) {
  if (!tripId || !userId) return null;

  return await prisma.trip.findFirst({
    where: {
      id: tripId,
      userId: userId,
    },
    include: {
      locations: true,
    },
  });
}
