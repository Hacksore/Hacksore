// make a react component that will render a video of the passed in src
export const Video = ({ src }: { src: string }) => {
  return <video controls={false} autoPlay={true} loop src={src} />;
};
