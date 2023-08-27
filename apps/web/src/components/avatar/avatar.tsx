"use client";
import { Box, styled } from "@mui/material";

const StyledBox = styled(Box, {
  shouldForwardProp: prop => prop !== "url",
})(({ url }: { url: string }) => ({
  width: 100,
  height: 100,
  clipPath: "url('#circle')",
  backgroundImage: `url(${url})`,
  backgroundSize: "cover",
}));

export const Avatar = ({ url }: { url: string }) => {
  return (
    <StyledBox url={url}>
      <svg>
        <clipPath id="circle" clipPathUnits="objectBoundingBox">
          <path d="M0.5,0 C0.776,0,1,0.224,1,0.5 C1,0.603,0.969,0.7,0.915,0.779 C0.897,0.767,0.876,0.76,0.853,0.76 C0.794,0.76,0.747,0.808,0.747,0.867 C0.747,0.888,0.753,0.908,0.764,0.925 C0.687,0.972,0.597,1,0.5,1 C0.224,1,0,0.776,0,0.5 C0,0.224,0.224,0,0.5,0"></path>
        </clipPath>
      </svg>
    </StyledBox>
  );
};
