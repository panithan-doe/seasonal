"use client";

import { useState } from "react";

// Mock data
// TODO: ใช้ข้อมูลจริง
const marketStats = {
  latestPrice: "999",
  marketCap: "2.5 ล้านบาท",
  volume: "10.2 ล้านบาท",
  pe: "~221-223x",
  pbv: "~0.79-0.80x",
};

const financialStats = {
  revenue: "~512 ล้านบาท",
  netProfit: "450 ล้านบาท",
  eps: "~2.15 บาท",
};

export default function StockChart() {
  const [timeRange, setTimeRange] = useState("1D");
  const ranges = ["1D", "1W", "1M", "1Y"];

  return (
    <div className="flex flex-col gap-6 mt-8">
      {/* Duration filter button */}
      <div className="flex items-center gap-2">
        {ranges.map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
              timeRange === range
                ? "bg-orange-500 text-white shadow-md"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
        {/* Stock Chart */}
        <div className="w-full lg:flex-1 h-110 bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center justify-center relative">
          <p className="text-gray-400 font-medium ">
            Chart for {timeRange}
          </p>
        </div>

        {/* Stock Details */}
        <div className="w-full lg:w-[350px] flex flex-col gap-4">
          {/* Top Box */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h3 className="text-gray-900 font-bold mb-2 pb-2">
              ข้อมูลตลาดหุ้น
            </h3>
            <div className="flex flex-col gap-3">
              <RowItem label="ราคาหุ้นปัจจุบัน (THB)" value={marketStats.latestPrice} />
              <RowItem label="Market Cap (THB)" value={marketStats.marketCap} />
              <RowItem label="Volume" value={marketStats.volume} />
              <RowItem label="P/E" value={marketStats.pe} />
              <RowItem label="P/BV" value={marketStats.pbv} />
            </div>
          </div>

          {/* Bottom Box */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h3 className="text-gray-900 font-bold mb-2 pb-2">
              ผลการดำเนินงานล่าสุด
            </h3>
            <div className="flex flex-col gap-3">
              <RowItem label="รายได้รวม" value={financialStats.revenue} />
              <RowItem label="กำไรสุทธิ" value={financialStats.netProfit} />
              <RowItem label="กำไรต่อหุ้น" value={financialStats.eps} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// Helper for rows details
function RowItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}