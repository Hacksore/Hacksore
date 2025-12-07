import { ReactSkinview3d } from "react-skinview3d";

export const MinecraftSkin = ({ width, height }: { width: number; height: number }) => {
  return (
    <div className="flex">
      <div className="">
        <ReactSkinview3d
          width={width}
          height={height}
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
