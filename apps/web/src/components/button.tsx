export const Button = ({ children, ariaLabel, ...props }: { ariaLabel: string; children: JSX.Element | string }) => (
  <button
    aria-label={ariaLabel}
    className="uppercase min-w-[44px] h-[42px] text-center bg-[#20262D] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
    {...props}
  >
    {children}
  </button>
);
