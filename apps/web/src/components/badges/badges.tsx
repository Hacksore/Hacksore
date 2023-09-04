"use client";
import { Box, Tooltip, Typography, styled } from "@mui/material";
import {
  SiNpm,
  SiDocker,
  SiPython,
  SiVisualstudiocode,
  SiGooglechrome,
  SiGithub,
  SiGo,
  SiRust,
} from "@icons-pack/react-simple-icons";
import LanguageIcon from "@mui/icons-material/Language";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  gap: "1rem",
  justifyContent: "center",
  marginTop: "2rem",
  marginBottom: "2rem",
}));

export const Badges = () => {
  return (
    <StyledBox>
      <Typography variant="body1">published packages on</Typography>
      <Tooltip title="Github">
        <SiGithub size={32} />
      </Tooltip>
      <Tooltip title="NPM">
        <SiNpm size={32} />
      </Tooltip>
      <Tooltip title="Docker Hub">
        <SiDocker size={32} />
      </Tooltip>
      <Tooltip title="Chrome Web Store">
        <SiGooglechrome size={32} />
      </Tooltip>
      <Tooltip title="VSCode Extension Marketplace">
        <SiVisualstudiocode size={32} />
      </Tooltip>
      <Tooltip title="Cargo">
        <SiRust size={32} />
      </Tooltip>
      <Tooltip title="PyPI">
        <SiPython size={32} />
      </Tooltip>
      <Tooltip title="Go">
        <SiGo size={32} />
      </Tooltip>
      <Tooltip title="The internet">
        <LanguageIcon sx={{ fontSize: 32 }} />
      </Tooltip>
    </StyledBox>
  );
};
