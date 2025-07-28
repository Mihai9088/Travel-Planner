'use client';

import { cn } from '@/lib/utils';
import { FieldError } from 'react-hook-form';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

export function FormField({ label, error, ...props }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        {...props}
        className={cn(
          'w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2',
          error ? 'border-red-500 ring-red-200' : 'border-gray-300 focus:ring-blue-500'
        )}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
}
