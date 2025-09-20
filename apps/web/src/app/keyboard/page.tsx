import type { Metadata } from "next";
import { KeyboardMd } from "./keyboard.client";

export const metadata: Metadata = {
  title: "Keyboard",
  description: "My journey to learn the ZSA moonlander keyboard",
};

export default function Keybaord() {
  return (
    <div>
      <KeyboardMd />
    </div>
  );
}
