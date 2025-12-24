import { twMerge } from "tailwind-merge";

export const Button = ({
  children,
  ariaLabel,
  className,
  href,
  target,
  rel,
  ...props
}: {
  ariaLabel: string;
  children: JSX.Element | string;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
} & (
  | React.ButtonHTMLAttributes<HTMLButtonElement>
  | React.AnchorHTMLAttributes<HTMLAnchorElement>
)) => {
  const baseClassName = twMerge(
    "uppercase min-w-[44px] h-[44px] text-center flex items-center justify-center bg-[#20262D] hover:bg-blue-600 text-white font-bold py-1 px-2 rounded-lg",
    className,
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={baseClassName}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      aria-label={ariaLabel}
      className={baseClassName}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};
