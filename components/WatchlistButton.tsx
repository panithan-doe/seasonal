"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useToast } from "@/context/ToastContext";

interface WatchlistButtonProps {
  symbol: string;
  initialIsWatchlist?: boolean;
  size?: number;
}

export default function WatchlistButton({
  symbol,
  initialIsWatchlist = false,
  size = 24
}: WatchlistButtonProps) {
  const [isWatchlist, setIsWatchlist] = useState(initialIsWatchlist);
  const { showToast } = useToast();

  const isWatchlistColor = isWatchlist ? "text-[#ecc353]" : "text-gray-300";

  const handleToggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newState = !isWatchlist;
    setIsWatchlist(newState);

    if (newState) {
      showToast(`${symbol} ถูกเพิ่มใน Watchlist`, "success");
    } else {
      showToast(`${symbol} ถูกลบออกจาก Watchlist`, "error");
    }
  };

  return (
    <button
      onClick={handleToggleWatchlist}
      className="p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none z-10"
    >
      <Star
        className={isWatchlistColor}
        fill="currentColor"
        strokeWidth={0.1}
        size={size}
      />
    </button>
  );
}
