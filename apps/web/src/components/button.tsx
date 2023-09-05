export const Button = ({ children, ...props }: { children: JSX.Element | string }) => (
  <button className="uppercase h-[42px] text-center bg-[#20262D] hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" {...props}>
    {children}
  </button>
);
