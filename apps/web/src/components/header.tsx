"use client";
import Link from "next/link";
import { FaHome, FaHammer } from "react-icons/fa";

export const Header = () => {
  return (
    <div className="flex justify-between">
      <div>
        <Link href="/" className="flex items-center">
          <FaHome /> <span className="ml-2">Home</span>
        </Link>
      </div>
      <div className="pb-4 flex gap-1.5 sm:gap-4">
        <Link style={{ textDecoration: "none" }} href="/uses" className="flex items-center">
          <FaHammer />
          <span className="ml-2">Uses</span>
        </Link>
      </div>
    </div>
  );
};
