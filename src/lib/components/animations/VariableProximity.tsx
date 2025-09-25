// File neutralized to remove legacy animation code and references.
// This stub preserves a simple, accessible default export so imports
// pointing at this path won't break the build.

"use client";

import React from "react";

export interface ProximityStubProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
}

export default function ProximityStub({ label, className, style, ...rest }: ProximityStubProps) {
  return (
    <span className={className} style={style} {...rest}>
      {label}
    </span>
  );
}
