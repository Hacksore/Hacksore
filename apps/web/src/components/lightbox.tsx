"use client";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// TODO: don't use the legacy image but figure out how to make
import Image from "next/legacy/image";
import { useState } from "react";

export const CustomLightbox = ({ images }: { images: any[] }) => {
  const [open, setOpen] = useState(false);
  const firstImage = images[0];

  return (
    <>
      <Image src={firstImage} alt="Testing" layout="responsive" onClick={() => setOpen(true)} />

      <Lightbox open={open} close={() => setOpen(false)} slides={images} />
    </>
  );
};
