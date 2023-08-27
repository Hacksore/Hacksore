"use client";
import { Box, styled } from "@mui/material";
import Link from "next/link";

const StyledBox = styled(Box)(() => ({
  height: 40,
  width: "100%",
  display: "flex",
  "a": {
    textDecoration: "none",
    fontweight: "bold",
  }
}));

export const Header = () => {
  return (
    <StyledBox>
      <div>
        <Link href="/">Home</Link>
      </div>
    </StyledBox>
  );
};
