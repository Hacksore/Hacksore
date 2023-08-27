"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "../theme";
import { Analytics } from "@vercel/analytics/react";

import { Box } from "@mui/material";
import { styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  "& .content-wrap": {
    background: theme.palette.background.default,
    padding: 22,
    paddingBottom: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  "& .linkys": {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    marginBottom: "1.5rem",
  },
  "& a": {
    color: theme.palette.primary.contrastText,
    fontWeight: "bold",
  },
}));

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StyledBox>
          <div className="content-wrap">{children}</div>
        </StyledBox>
      </ThemeProvider>
      <Analytics />
    </div>
  );
}

export default Providers;
