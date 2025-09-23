import * as React from 'react';
import { cn } from '../utils/cn';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'tfe-focus-ring w-full rounded-md border border-theme-strong bg-transparent px-3 py-2 text-sm text-theme-primary placeholder:text-[color:var(--color-text-soft)]',
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';


