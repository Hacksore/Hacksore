"use client";
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

export const Badges = () => {
  return (
    <div className="flex py-6 gap-4">
      <p>published packages on</p>
      <SiGithub size={32} />
      <SiNpm size={32} />
      <SiDocker size={32} />
      <SiGooglechrome size={32} />
      <SiVisualstudiocode size={32} />
      <SiRust size={32} />
      <SiPython size={32} />
      <SiGo size={32} />
    </div>
  );
};
