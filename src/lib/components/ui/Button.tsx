import * as React from 'react';
import { cn } from '../utils/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline';
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', disabled, ...props }, ref) => {
    const base = 'tfe-focus-ring inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
    const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
      primary: 'bg-[color:var(--color-brandRed)] text-[color:var(--color-button-primary-text)] hover:brightness-95',
      secondary: 'bg-white text-black hover:bg-neutral-100',
      outline: 'border border-[color:var(--color-button-outline-border)] text-theme-primary hover:bg-[color:var(--color-button-outline-hover)]'
    };
    return (
      <button ref={ref} className={cn(base, variants[variant], className)} disabled={disabled} {...props} />
    );
  }
);
Button.displayName = 'Button';


