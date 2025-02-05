export const Button = ({ children, ariaLabel, ...props }: { ariaLabel: string; children: JSX.Element | string }) => (
  <button
    aria-label={ariaLabel}
    className="uppercase min-w-[44px] h-[44px] text-center flex items-center justify-center bg-[#20262D] hover:bg-blue-600 text-white font-bold py-1 px-2 rounded"
    {...props}
  >
    {children}
  </button>
);
