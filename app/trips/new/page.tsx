'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { createTrip } from '@/lib/actions/create-trip';
import { UploadButton } from '@/lib/upload-thing';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { useState, useTransition } from 'react';

const NewTrip = () => {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card>
        <CardHeader>New trip</CardHeader>
        <CardContent>
          <form
            className="space-y-6"
            action={(FormData: FormData) => {
              startTransition(() => createTrip(FormData));
            }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                className={cn(
                  'w-full border border-gray-300 px-3 py-2',
                  'rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                )}
                placeholder="Trip title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                className={cn(
                  'w-full border border-gray-300 px-3 py-2',
                  'rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                )}
                placeholder="Trip description"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {' '}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  className={cn(
                    'w-full border border-gray-300 px-3 py-2',
                    'rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  )}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  className={cn(
                    'w-full border border-gray-300 px-3 py-2',
                    'rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  )}
                />
              </div>
            </div>
            <div>
              <label>Trip Image</label>
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="Trip Preview"
                  className="w-full mb-4 rounded-md max-h-48 object-cover"
                  width={300}
                  height={300}
                  fill
                />
              )}
              <UploadButton
                endpoint={'imageUploader'}
                onClientUploadComplete={(res) => {
                  if (res && res[0].ufsUrl) {
                    setImageUrl(res[0].ufsUrl);
                  }
                }}
                onUploadError={(error: Error) => {
                  console.log('Upload failed:', error);
                }}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Creating...' : 'Create trip'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewTrip;
