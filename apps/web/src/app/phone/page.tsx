import { Metadata } from "next";
import { Phone } from "./phone-client";

export const metadata: Metadata = {
  title: "iPhone GOATED loadout",
  description: "The absolutely most goated phone loadout in the world",
};

export default function Keybaord() {
  return (
    <div>
      <Phone />
    </div>
  );
}
