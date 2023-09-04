"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../theme";
import { Analytics } from "@vercel/analytics/react";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="p-4 flex-1">{children}</div>
      </ThemeProvider>
      <Analytics />
    </>
  );
}

export default Providers;
