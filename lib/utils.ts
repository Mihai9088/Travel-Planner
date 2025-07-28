import { Trip } from '@/app/generated/prisma';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pluralize(word: string, count: number) {
  return `${count} ${word}${count === 1 ? '' : 's'}`;
}

export function getSortedTrips(trips: Trip[]): Trip[] {
  return [...trips].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );
}

export function getUpcomingTrips(trips: Trip[]): Trip[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return trips.filter((trip) => new Date(trip.startDate) >= today);
}

export function getTripDurationInDays(startDate: Date, endDate: Date): number {
  const msInDay = 1000 * 60 * 60 * 24;
  return Math.round((endDate.getTime() - startDate.getTime()) / msInDay);
}
