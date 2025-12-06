import { ReactSkinview3d } from "react-skinview3d";

export const About = ({ hideTagline = false }: { hideTagline?: boolean }) => {
  return (
    <div className="flex flex-col text-center items-center gap-2">
      <div className="flex flex-col items-center gap-2">
        <p className="bg-linear-to-tl via-red-400 from-indigo-400 to-yellow-400 text-transparent bg-clip-text font-bold text-4xl sm:text-7xl">
          Sean Boult
        </p>
      </div>

      {!hideTagline && <p>Full Stack Developer Who Likes React</p>}

      <div className="w-[200px] h-[200px]">
        <ReactSkinview3d
          width={200}
          height={200}
          skinUrl="https://minotar.net/skin/Hacksore"
          capeUrl="/img/cape-2011.png"
          onReady={({ viewer }) => {
            viewer.controls.enableZoom = false;
            viewer.autoRotate = true;
          }}
        />
      </div>
    </div>
  );
};
