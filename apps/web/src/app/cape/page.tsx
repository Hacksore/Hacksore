import { Metadata } from "next";
import { Cape } from "./cape.client";

const META_INFO = {
  title: "Hacksore's Minecraft Capes",
  description: "Yes I have a 2011 Minecraft cape and it's not for sale",
};

export const metadata: Metadata = {
  title: META_INFO.title,
  description: META_INFO.description,
  openGraph: {
    title: META_INFO.title,
    description: META_INFO.description,
    type: "website",
  },
  twitter: {
    title: META_INFO.title,
    description: META_INFO.description,
    card: "summary_large_image",
  },
};

export default function Keybaord() {
  return (
    <div>
      <Cape />
    </div>
  );
}
