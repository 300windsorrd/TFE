"use client";
import * as React from 'react';

export function Dialog({ open, onOpenChange, children }: { open: boolean; onOpenChange: (v: boolean) => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-theme-overlay" onClick={() => onOpenChange(false)}>
      <div className="max-h-[90vh] w-[90vw] max-w-2xl overflow-auto rounded-md bg-theme-surface-strong text-theme-primary p-4" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

