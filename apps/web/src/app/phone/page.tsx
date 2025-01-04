import { Metadata } from "next";
import { Phone } from "./phone.client";

const META_INFO = {
  title: "iPhone GOATED loadout",
  description: "The absolutely most goated phone loadout in the world",
};

export const metadata: Metadata = {
  title: META_INFO.title,
  description: META_INFO.description,
  openGraph: {
    title: META_INFO.title,
    description: META_INFO.description,
    images: ["/img/goated-iphone.png"],
    type: "website",
  },
  twitter: {
    title: META_INFO.title,
    description: META_INFO.description,
    images: ["/img/goated-iphone.png"],
    card: "summary_large_image",
  },
};

export default function Keybaord() {
  return (
    <div>
      <Phone />
    </div>
  );
}
