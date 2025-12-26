"use client";

import React from "react";
import { TrendingUp } from "lucide-react";

interface StockData {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  category: string;
  percentLoss: number;
  isWatchlist: boolean;
  startDate: number;
  duration: number;
  signal: string;
  volume?: string;
  month: number;
}

interface StockTooltipProps {
  visible: boolean;
  x: number;
  y: number;
  stock: StockData | null;
  monthName: string;
}

const thaiMonths = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
];

export default function StockTooltip({ visible, x, y, stock, monthName }: StockTooltipProps) {
  if (!visible || !stock) return null;

  const priceChange = (stock.price * stock.changePercent) / 100;
  const isPositive = stock.changePercent >= 0;
  const trendColor = isPositive ? 'text-green-600' : 'text-red-600';
  const trendSign = isPositive ? '+' : '';

  const signalColor =
    stock.signal === 'BUY' ? 'text-green-500' :
    stock.signal === 'SELL' ? 'text-red-500' :
    'text-yellow-500';

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        left: `${x + 15}px`,
        top: `${y + 15}px`,
      }}
    >
      <div className="bg-white border-2 border-gray-300 rounded-xl shadow-2xl p-4 min-w-75 max-w-90">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center justify-center rounded-lg bg-[#247AE0] px-2 py-0.5 mb-3 w-20">
              <span className="text-xs font-medium text-white">
                {thaiMonths[stock.month]}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{stock.category}</p>
            <h3 className="text-2xl font-bold text-gray-900">{stock.symbol}</h3>
          </div>
          
        </div>

        {/* Price */}
        <div className=" flex flex-row justify-between mb-2">
          <p className="text-xl font-bold text-[#247AE0]">
            USD {stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <div className={`flex items-center gap-1 text-lg font-semibold ${trendColor}`}>
            <TrendingUp className="w-4 h-4" />
            <span>
              {trendSign}{priceChange.toFixed(2)}
            </span>
            <span className="text-sm">
              ({trendSign}{stock.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        <div className="flex flex-row justify-between">
          {/* Signal */}
          <div className="flex flex-row items-center gap-1">
            <p className="text-xs text-gray-500">Signal</p>
            <p className={`text-base font-bold ${signalColor}`}>
              {stock.signal}
            </p>
          </div>
          {/* Recommended Days */}
          <div className="flex flex-row items-center gap-1">
            <p className="text-xs text-gray-500">จำนวนวันที่แนะนำ (วัน)</p>
            <p className="text-base font-semibold text-[#247AE0]">{stock.duration}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
