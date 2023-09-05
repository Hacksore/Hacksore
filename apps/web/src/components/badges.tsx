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
    <div className="flex sm:flex-row flex-col py-6 gap-2">
      <p>published packages on</p>
      <div className="flex flex-wrap gap-2">
        <SiGithub size={32} />
        <SiNpm size={32} />
        <SiDocker size={32} />
        <SiGooglechrome size={32} />
        <SiVisualstudiocode size={32} />
        <SiRust size={32} />
        <SiPython size={32} />
        <SiGo size={32} />
      </div>
    </div>
  );
};
