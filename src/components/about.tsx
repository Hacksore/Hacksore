import { ReactSkinview3d } from "react-skinview3d";
import { useTexturesLoaded } from "../hooks/use-textures-loaded";

export const About = () => {
  const areTexturesLoaded = useTexturesLoaded(["/img/Hacksore.png", "/img/cape-2011.png"]);

  return (
    <div className="flex flex-col text-center items-center gap-2">
      <div className="flex flex-col items-center gap-2">
        <p className="bg-linear-to-tl via-red-400 from-indigo-400 to-yellow-400 text-transparent bg-clip-text font-bold text-4xl sm:text-7xl">
          Sean Boult
        </p>
      </div>

      <p>Full Stack Developer Who Likes React</p>

      <div className="w-[200px] h-[200px] relative">
        {!areTexturesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-gray-600 border-t-white rounded-full animate-spin" />
          </div>
        )}
        <ReactSkinview3d
          width={200}
          height={200}
          skinUrl="/img/Hacksore.png"
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
