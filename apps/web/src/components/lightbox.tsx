import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";

const imageSizes = [16, 32, 48, 64, 96, 128, 256, 384];
const deviceSizes = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];

function nextImageUrl(src: string, size: number) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${size}&q=75`;
}

export const CustomLightbox = ({ images }: { images: any[] }) => {
  const [open, setOpen] = useState(false);
  const slides = images.map(({ src, width, height }: any) => ({
    width,
    height,
    src: nextImageUrl(src, width),
    srcSet: imageSizes
      .concat(...deviceSizes)
      .filter(size => size <= width)
      .map(size => ({
        src: nextImageUrl(src, size),
        width: size,
        height: Math.round((height / width) * size),
      })),
  }));

  const firstImage = slides[0];
  return (
    <>
      <Image src={firstImage.src} alt={firstImage.alt} width={firstImage.width} height={firstImage.height} layout="responsive" onClick={() => setOpen(true)} />
      <Lightbox open={open} close={() => setOpen(false)} slides={slides} plugins={[Zoom]} />
    </>
  );
};
