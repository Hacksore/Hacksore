import Lightbox from "yet-another-react-lightbox";
import zoomPlugin from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
// TODO: figure out migration to next/image
import Image from "next/legacy/image";
import { useState } from "react";

const imageSizes = [16, 32, 48, 64, 96, 128, 256, 384];
const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

function nextImageUrl(src: any, size: any) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${size}&q=75`;
}

export const CustomLightbox = ({ images }: { images: any[] }) => {
  const [open, setOpen] = useState(false);
  const firstImage = images[0];

  const slides = images.map(({ src, width, height, alt }: any) => ({
    width,
    height,
    src: nextImageUrl(src, width),
    alt,
    srcSet: imageSizes
      .concat(...deviceSizes)
      .filter(size => size <= width)
      .map(size => ({
        src: nextImageUrl(src, size),
        width: size,
        height: Math.round((height / width) * size),
      })),
  }));

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
      <Lightbox open={open} close={() => setOpen(false)} slides={slides} plugins={[zoomPlugin]} />
    </>
  );
};
