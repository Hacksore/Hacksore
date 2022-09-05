import { Avatar } from "./avatar";
import { Story } from "@storybook/react";
import React from "react";

const Template: Story<any> = (args: any) => {
  return <Avatar url="https://cdn.discordapp.com/avatars/378293909610037252/a_33a14e24ffcb2c1a2601c2240d402bd6.gif" />
};

export const Default = Template.bind({});

const meta = {
  title: "Avatar", 
}

export default meta;