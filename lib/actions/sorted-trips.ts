'use server';

import { prisma } from '@/lib/prisma';

export async function getSortedTripsByUser(userId: string) {
  if (!userId) return [];

  return await prisma.trip.findMany({
    where: { userId },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
