import * as React from 'react';

export function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-theme-muted">{label}</span>
      {children}
    </label>
  );
}


