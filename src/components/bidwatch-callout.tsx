import { FaArrowRight } from "react-icons/fa";

export const BidwatchCallout = () => {
  return (
    <a
      href="https://bidwatch.app"
      target="_blank"
      rel="noopener noreferrer"
      className="bidwatch-callout group relative isolate mx-auto mb-8 flex max-w-[calc(100%-2rem)] items-center justify-between gap-3 overflow-hidden rounded-full border border-(--color-card-border) bg-(--color-card-bg) px-3 py-2.5 text-white backdrop-blur transition duration-300 hover:border-white/35 focus:outline-none focus:ring-2 focus:ring-[#FFD166] focus:ring-offset-2 focus:ring-offset-[#03060a] sm:max-w-2xl sm:px-4"
    >
      <span className="absolute inset-0.5 z-0 rounded-full bg-[#080b12]/75" />
      <span className="relative z-10 flex min-w-0 items-center gap-3">
        <span className="shrink-0 rounded-full bg-(--color-primary) px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-[0.14em] text-white shadow-[0_0_24px_rgba(37,99,235,0.32)] ring-1 ring-white/20 transition duration-300 group-hover:ring-white/60">
          New
        </span>
        <span className="min-w-0 text-left">
          <span className="block truncate text-sm font-black sm:text-base">
            bidwatch.app is live
          </span>
          <span className="block truncate text-xs font-medium text-gray-400 sm:text-sm">
            Search live eBay auctions ending soon
          </span>
        </span>
      </span>
      <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-[#080b12] shadow-[0_0_18px_rgba(255,255,255,0.38)]">
        <FaArrowRight aria-hidden="true" className="size-3.5" />
      </span>
    </a>
  );
};
