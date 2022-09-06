import { Presence } from "../../web/components/presence/presence";
import React from "react";
import { Box } from "@mui/material";

const MOCK_ACTIVITIES = [
  { name: "Custom Status", state: "aeg", type: "CUSTOM" },
  {
    details: "Show Me A Sign (with MKLA)",
    name: "Spotify",
    state: "Ship Wrek; MKLA",
    type: "LISTENING",
  },
  {
    details: "Editing package.json",
    name: "Visual Studio Code",
    state: "Workspace: Hacksore",
    type: "PLAYING",
  },
];

export const Default = () => {
  return (
    <Box sx={{ width: 200, background: "lightblue", p: 1 }}>
      <Presence activities={[]}>
        <div>Hover me for presence</div>
      </Presence>
    </Box>
  );
};

export const GameAndMusic = () => {
  return (
    <Box sx={{ width: 200, background: "lightblue", p: 1 }}>
      <Presence activities={MOCK_ACTIVITIES}>
        <div>Hover me for presence</div>
      </Presence>
    </Box>
  );
};

export const All = () => {
  return (
    <Box sx={{ width: 200, background: "lightblue", p: 1 }}>
      <Presence
        activities={[
          { name: "Custom Status", state: "aeg", type: "CUSTOM" },
          {
            details: "Show Me A Sign (with MKLA)",
            name: "League Of Legends",
            type: "PLAYING",
          },
          {
            details: "Show Me A Sign (with MKLA)",
            name: "Spotify",
            state: "Ship Wrek; MKLA",
            type: "LISTENING",
          },
          {
            details: "Editing package.json",
            name: "Visual Studio Code",
            state: "Workspace: Hacksore",
            type: "PLAYING",
          },
        ]}
      >
        <div>Hover me for presence</div>
      </Presence>
    </Box>
  );
};

const meta = {
  title: "Presence",
};

export default meta;
