import { Presence } from "./presence";
import { Story } from "@storybook/react";
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

const Template: Story<any> = (args: any) => {
  return (
    <Box sx={{ width: 200, background: "lightblue", p: 1 }}>
      <Presence activities={MOCK_ACTIVITIES}>
        <div>Hover me for presence</div>
      </Presence>
    </Box>
  );
};

export const Default = Template.bind({});

const meta = {
  title: "Presence",
};

export default meta;
