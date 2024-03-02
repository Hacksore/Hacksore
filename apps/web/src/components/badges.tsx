"use client";
import {
  SiNpm,
  SiDocker,
  SiPython,
  SiVisualstudiocode,
  SiGooglechrome,
  SiGithub,
  SiHomebrew,
  SiGo,
  SiRust,
} from "@icons-pack/react-simple-icons";

export const Badges = () => {
  return (
    <div className="flex sm:flex-row flex-col py-6 gap-2">
      <p>published packages on</p>
      <div className="flex flex-wrap gap-2">
        <SiGithub size={32} title="github" />
        <SiNpm size={32} title="npm" />
        <SiDocker size={32} title="docker" />
        <SiGooglechrome size={32} title="google web store" />
        <SiVisualstudiocode size={32} title="visual studio code" />
        <SiRust size={32} title="rust" />
        <SiPython size={32} title="python" />
        <SiHomebrew size={32} title="homebrew" />
        <SiGo size={32} title="golang" />
      </div>
    </div>
  );
};
