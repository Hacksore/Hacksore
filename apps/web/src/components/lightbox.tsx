import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
// TODO: figure out migation to next/image
import Image from "next/legacy/image";
import { useState } from "react";

export const CustomLightbox = ({ images }: { images: any[] }) => {
  const [open, setOpen] = useState(false);
  const firstImage = images[0];

  return (
    <>
      <Image
        src={firstImage.src}
        alt={firstImage.alt}
        width={firstImage.width}
        height={firstImage.height}
        layout="responsive"
        onClick={() => setOpen(true)}
      />
      <Lightbox open={open} close={() => setOpen(false)} slides={images} />
    </>
  );
};
