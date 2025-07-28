'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { tripSchema, TripFormData } from '@/lib/schemas/form-schema';
import { FormField } from '@/components/ui/form-input';
import { Button } from '@/components/ui/button';
import { useTransition, useState } from 'react';
import { createTrip } from '@/lib/actions/create-trip';
import Image from 'next/image';
import { UploadButton } from '@/lib/upload-thing';
import { useRouter } from 'next/navigation';

export function TripForm() {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TripFormData>({
    resolver: zodResolver(tripSchema),
  });

  const onSubmit = (data: TripFormData) => {
    if (imageUrl) {
      data.imageUrl = imageUrl;
    }

    startTransition(async () => {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const redirectPath = await createTrip(formData);
      if (redirectPath) router.push(redirectPath);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField label="Title" {...register('title')} error={errors.title} />
      <FormField label="Description" {...register('description')} error={errors.description} />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="Start Date"
          type="date"
          {...register('startDate')}
          error={errors.startDate}
        />
        <FormField label="End Date" type="date" {...register('endDate')} error={errors.endDate} />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Trip Image</label>
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Trip preview"
            width={300}
            height={300}
            className="w-full h-64 mb-4 rounded-md object-cover"
          />
        )}
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            if (res && res[0].ufsUrl) setImageUrl(res[0].ufsUrl);
          }}
          onUploadError={(err) => console.error(err)}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Trip'}
      </Button>
    </form>
  );
}
