/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const CAPE_BASE_URL = "https://capes.me";
const CAPE_API_URL = `${CAPE_BASE_URL}/api`;

export interface CapeResponse {
  username: string;
  uuid: string;
  capes: Cape[];
}

export interface Cape {
  type: string;
  removed: boolean;
}

// Image generation
export default async function Image() {
  const roboto = await readFile(join(process.cwd(), "public/font/Roboto-Bold.ttf"));

  const mineconCape = await readFile(join(process.cwd(), "public/img/cape.png"));

  const capeSrc = Uint8Array.from(mineconCape).buffer;
  const capes: CapeResponse = await fetch(`${CAPE_API_URL}/user/Hacksore`).then(res => res.json());

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          position: "relative",
          background: "black",
          color: "white",
          width: "100%",
          height: "100%",
          display: "flex",
        }}
        tw="px-8 pl-16 py-4 gap-8"
      >
        <div tw="flex flex-col">
          <h1 tw="text-5xl">Hacksore's Capes</h1>
          <div tw="flex flex-col">
            {capes.capes.map((cape, index) => {
              const capeUrl = `${CAPE_BASE_URL}/images/capes/${cape.type}.png`;
              // eslint-disable-next-line @next/next/no-img-element
              // TODO: when faav fixes this enable
              // return <img className="flex" width={80} height={128} src={capeUrl} alt={cape.type} key={index} />
              return (
                <div tw="text-2xl py-2" key={index}>
                  {cape.type}
                </div>
              );
            })}
          </div>
        </div>

        {/* @ts-ignore */}
        <img style={{ top: 100, right: -300 }} width={240} height={384} src={capeSrc} />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: roboto,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
