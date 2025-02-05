import { twMerge } from "tailwind-merge";

export const Button = ({
  children,
  ariaLabel,
  className,
  ...props
}: {
  ariaLabel: string;
  children: JSX.Element | string;
  className?: string;
}) => (
  <button
    aria-label={ariaLabel}
    className={twMerge(
      "uppercase min-w-[44px] h-[44px] text-center flex items-center justify-center bg-[#20262D] hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-lg",
      className
    )}
    {...props}
  >
    {children}
  </button>
);
