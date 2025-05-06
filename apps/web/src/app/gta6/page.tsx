export default function GTA6Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-12 p-4 -mt-16">
      <h1 className="text-[min(12vw,10rem)] font-bold leading-none text-center">GTA 6</h1>
      <a 
        href="https://www.youtube.com/watch?v=VQRLujxTm3c"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg bg-red-600 px-10 py-5 text-3xl font-semibold text-white transition-all hover:bg-red-700 active:scale-95"
      >
        Click here to watch
      </a>
    </div>
  );
} 