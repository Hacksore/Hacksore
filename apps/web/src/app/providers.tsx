"use client";

import { Analytics } from "@vercel/analytics/react";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="p-4 flex-1">{children}</div>
      <Analytics />
    </>
  );
}

export default Providers;
