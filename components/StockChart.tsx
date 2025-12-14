"use client";

import { useState, useEffect, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface StockChartProps {
  symbol: string;
}

// Mock stats เดิม (คงไว้ตามคำขอ เพราะ API ปัจจุบันเราดึงแค่กราฟราคา)
const defaultMarketStats = {
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

export default function StockChart({ symbol }: StockChartProps) {
  const [timeRange, setTimeRange] = useState("1D");
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // เพิ่ม State สำหรับเก็บราคาล่าสุดที่ดึงมาจาก API
  const [latestPrice, setLatestPrice] = useState<string>("Loading...");

  const ranges = ["1D", "1W", "1M", "1Y"];

  // ฟังก์ชันดึงข้อมูลกราฟ
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/stock/history?symbol=${symbol}&range=${timeRange}`);
        const data = await res.json();
        
        if (Array.isArray(data) && data.length > 0) {
            // กรองข้อมูลที่อาจจะเป็น null
            const validData = data.filter((d: any) => d.close !== null || d.adjClose !== null);

            const formatted = validData.map((d: any) => ({
                ...d,
                price: d.close || d.adjClose, // ใช้ราคาปิด
                displayDate: new Date(d.date).toLocaleDateString('th-TH', {
                    hour: timeRange === '1D' ? '2-digit' : undefined,
                    minute: timeRange === '1D' ? '2-digit' : undefined,
                    day: 'numeric',
                    month: 'short'
                })
            }));
            
            setChartData(formatted);

            if (formatted.length > 0) {
              const lastItem = formatted[formatted.length - 1];
              setLatestPrice(lastItem.price.toFixed(2));
            }
        }
      } catch (error) {
        console.error("Error fetching chart:", error);
        setLatestPrice("Error");
      } finally {
        setIsLoading(false);
      }
    };

    if (symbol) {
      fetchData();
    }
  }, [symbol, timeRange]);

  // Logic คำนวณสี
  const chartColor = useMemo(() => {
    if (chartData.length < 2) return "#22c55e";
    
    const startPrice = chartData[0].price;
    const endPrice = chartData[chartData.length - 1].price;

    return endPrice >= startPrice ? "#22c55e" : "#ef4444";
  }, [chartData]);

  return (
    <div className="flex flex-col gap-6 mt-8">
      {/* Range filter button */}
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
        <div className="w-full lg:flex-1 h-[450px] bg-white rounded-xl border border-gray-200 shadow-sm p-4 relative min-w-0">
            {isLoading ? (
            <div className="animate-pulse text-gray-400">Loading Chart...</div>
          ) : chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColor} stopOpacity={0.1}/>
                    <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis 
                    dataKey="displayDate" 
                    tick={{ fontSize: 12, fill: '#888' }} 
                    minTickGap={30}
                />
                <YAxis 
                    domain={['auto', 'auto']} 
                    tick={{ fontSize: 12, fill: '#888' }}
                    tickFormatter={(number) => number.toFixed(2)}
                />
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke={chartColor}
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorPrice)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-400 font-medium">No Data Available</p>
          )}
        </div>

        {/* Stock Details */}
        <div className="w-full lg:w-[350px] flex flex-col gap-4">
          {/* Top Box */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h3 className="text-gray-900 font-bold mb-2 pb-2">
              ข้อมูลตลาดหุ้น
            </h3>
            <div className="flex flex-col gap-3">
              <RowItem label="ราคาหุ้นปัจจุบัน (THB)" value={latestPrice} />
              <RowItem label="Market Cap (THB)" value={defaultMarketStats.marketCap} />
              <RowItem label="Volume" value={defaultMarketStats.volume} />
              <RowItem label="P/E" value={defaultMarketStats.pe} />
              <RowItem label="P/BV" value={defaultMarketStats.pbv} />
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

function RowItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-semibold text-gray-900">{value}</span>
    </div>
  );
}