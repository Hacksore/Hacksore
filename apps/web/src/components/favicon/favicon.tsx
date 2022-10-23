// import { Box } from "@mui/material";
// import dynamic from "next/dynamic";
// import { useEffect, useRef } from "react";
// import { SkinViewer } from "skinview3d";

// const Skinview3d = dynamic(() => import("react-skinview3d"), { ssr: false });

// export const Favicon = () => {
//   const ref = useRef<SkinViewer>();
//   const headRef = useRef<HTMLHeadElement>();

//   function changeFavicon(src: string) {
//     if (!headRef.current) {
//       return;
//     }

//     const link = document.createElement("link");
//     const oldLink = document.getElementById("dynamic-favicon");
//     link.id = "dynamic-favicon";
//     link.rel = "shortcut icon";
//     link.href = src;
//     if (oldLink) {
//       headRef.current.removeChild(oldLink);
//     }
//     headRef.current.appendChild(link);
//   }


//   // setup render
//   useEffect(() => {
//     headRef.current = document.getElementsByTagName("head")[0];

//     const renderFavicon = () => {
//       const iconUrl = ref?.current?.canvas.toDataURL("image/png");
  
//       if (iconUrl) {
//         changeFavicon(iconUrl);
//       }
//     };

//     // render loop
//     setInterval(() => renderFavicon(), 4000);
//   }, []);

//   const handleReady = (viewer: SkinViewer) => {
//     ref.current = viewer;

//     viewer.controls.autoRotate = true;
//     viewer.controls.enablePan = false;
//     viewer.controls.enableZoom = false;
//     viewer.controls.enableRotate = false;

//     // move the camera position
//     viewer.camera.position.x = 0;
//     viewer.camera.position.y = 0; 
//     viewer.camera.position.z = 50; 

//     viewer.playerObject.skin.body.visible = false;
//     viewer.playerObject.skin.rightArm.visible = false;
//     viewer.playerObject.skin.leftArm.visible = false;
//     viewer.playerObject.skin.leftLeg.visible = false;
//     viewer.playerObject.skin.rightLeg.visible = false;
//   };

//   return (
//     <Box>
//       <Skinview3d
//         skinUrl="/img/skin.png"
//         height="64"
//         width="64"
//         options={{
//           preserveDrawingBuffer: true,
//         }}
//         onReady={handleReady}
//       />
//     </Box>
//   );
// };

export {}