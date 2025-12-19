"use client";

import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// นิยาม Type ให้ตรงกับ Mock Data ของคุณ
interface StockData {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  category: string;
  percentLoss: number;
  isWatchlist: boolean;
  startDate: number; // รับเป็นตัวเลขวันที่ (เช่น 12)
  duration: number;  // รับเป็นจำนวนวัน (เช่น 10)
  signal: string;    // 'BUY', 'SELL', 'HOLD'
  volume?: string;
  month: number; 
}

interface StockDashboardProps {
  stocks: any[]; // รับ Array ของหุ้นเข้ามา
}

const thaiMonths = [
  "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
  "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
];

// Helper: ชื่อย่อเดือนไทย (สำหรับใช้ใน Table)
const thaiMonthsShort = [
    "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.",
    "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."
];


export default function StockDashboard({ stocks }: StockDashboardProps) {

    // เริ่มวันที่ 1 เดือน 8 (กันยายน) ปี 2025
    const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 1));

    const currentMonthIndex = currentDate.getMonth(); 
    const currentYear = currentDate.getFullYear();

    // Logic คำนวณขอบเขตไตรมาส
    const currentQuarter = Math.floor(currentMonthIndex / 3);
    const startMonthOfQuarter = currentQuarter * 3;       // เช่น Q3 = 6 (กรกฎาคม)
    const endMonthOfQuarter = startMonthOfQuarter + 2;    // เช่น Q3 = 8 (กันยายน)

    const handlePrevMonth = () => {
        if (currentMonthIndex > startMonthOfQuarter) {
            setCurrentDate(new Date(currentYear, currentMonthIndex - 1, 1));
        }
    };

    const handleNextMonth = () => {
        if (currentMonthIndex < endMonthOfQuarter) {
            setCurrentDate(new Date(currentYear, currentMonthIndex + 1, 1));
        }
    };

    const hasPrevMonth = currentMonthIndex > startMonthOfQuarter;
    const hasNextMonth = currentMonthIndex < endMonthOfQuarter;

    // ชื่อเดือนที่จะแสดงที่ปุ่ม
    const prevMonthName = hasPrevMonth ? thaiMonths[currentMonthIndex - 1] : "";
    const nextMonthName = hasNextMonth ? thaiMonths[currentMonthIndex + 1] : "";

    const monthlyStocks = useMemo(() => {
        return stocks.filter(stock => stock.month === currentMonthIndex);
    }, [stocks, currentMonthIndex]);

  // 1. แปลงข้อมูลสำหรับ Gantt Chart
  const ganttData = useMemo(() => {
    return monthlyStocks.map((stock, index) => ({
      id: index,
      name: stock.symbol,
      start: stock.startDate,
      duration: stock.duration,
      percent: stock.changePercent > 0 ? `+${stock.changePercent}%` : `${stock.changePercent}%`,
      color: "bg-[#247AE0]" // สีเดิมที่คุณต้องการ
    }));
  }, [stocks]); 

  // 2. แปลงข้อมูลสำหรับ Table ด้านล่าง
  const dashboardTableData = useMemo(() => {
    return monthlyStocks.map((stock) => {
      const isPositive = stock.changePercent >= 0;
      
      // ทำให้วันที่ในตารางเปลี่ยนตามเดือนที่เลือกใน Header
      // เช่น "12 ก.ย. 2568"
      const dateString = `${stock.startDate} ${thaiMonthsShort[currentMonthIndex]} ${currentYear + 543}`; 

      let signalColor = "text-yellow-500";
      if (stock.signal === "BUY") signalColor = "text-green-500";
      if (stock.signal === "SELL") signalColor = "text-red-500";

      return {
        symbol: stock.symbol,
        date: dateString,
        days: stock.duration,
        price: stock.price,
        change: isPositive ? `+${stock.changePercent}%` : `${stock.changePercent}%`,
        signal: stock.signal,
        vol: stock.volume || "N/A", 
        cat: stock.category,
        signalColor: signalColor,
        isPositive: isPositive 
      };
    });
  }, [monthlyStocks, currentMonthIndex, currentYear]); // เพิ่ม dependency เพื่อให้ตารางอัปเดตเมื่อเปลี่ยนเดือน

  return (
    <div className="w-full pb-12 mt-6"> 
      
      {/* Month Navigation */}
      {/* แก้ไขส่วนนี้: ผูก onClick และแสดงชื่อเดือนตาม logic */}
      <div className="flex justify-between items-center text-gray-400 text-sm mb-2 h-6 select-none">
        <div 
            onClick={handlePrevMonth}
            className={`flex items-center cursor-pointer hover:text-[#247AE0] transition-colors ${!hasPrevMonth ? "invisible" : ""}`}
        >
            <ChevronLeft className="w-4 h-4" /> {prevMonthName}
        </div>
        <div 
            onClick={handleNextMonth}
            className={`flex items-center cursor-pointer hover:text-[#247AE0] transition-colors ${!hasNextMonth ? "invisible" : ""}`}
        >
            {nextMonthName} <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Gantt Chart Header */}
      {/* แก้ไขส่วนนี้: แสดงชื่อเดือนปัจจุบันและปี พ.ศ. */}
      <div className="bg-[#5a8cd8] text-white py-2 text-center font-bold rounded-t-lg transition-all">
        {thaiMonths[currentMonthIndex]} {currentYear + 543}
      </div>

      {/* Gantt Area */}
      <div className="bg-white rounded-b-lg shadow-sm border border-gray-200 overflow-x-auto mb-8">
        
        {/* ✅ เพิ่ม: แสดงข้อความเมื่อไม่มีข้อมูลในเดือนนั้น */}
        {monthlyStocks.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
                ไม่มีข้อมูลหุ้นแนะนำในเดือน{thaiMonths[currentMonthIndex]}
            </div>
        ) : (
            <div className="min-w-[800px]">
                <div className="grid grid-cols-30 border-b" style={{ gridTemplateColumns: 'repeat(30, minmax(0, 1fr))' }}>
                {Array.from({ length: 30 }, (_, i) => (
                    <div key={i} className={`text-[10px] md:text-xs text-center py-2 border-r ${i + 1 === 30 ? 'bg-orange-400 text-white' : 'text-gray-500'}`}>
                    {i + 1}
                    </div>
                ))}
                </div>

                <div className="relative py-4 space-y-3 px-1">
                {ganttData.map((item) => (
                    <div 
                        key={item.id} 
                        className="relative h-8 z-10 flex items-center"
                        style={{
                            marginLeft: `${((item.start - 1) / 30) * 100}%`,
                            width: `${(item.duration / 30) * 100}%`
                        }}
                    >
                        <div className={`${item.color} text-white text-[10px] md:text-xs font-semibold w-full h-full rounded flex items-center justify-center shadow-sm whitespace-nowrap overflow-hidden px-2`}>
                            {item.duration}วัน / {item.name} ({item.percent})
                        </div>
                    </div>
                ))}
                </div>
            </div>
        )}
      </div>

      {/* Bottom Layout: Table & Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Table Section */}
        <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-gray-500 font-semibold border-b">
                        <tr>
                            <th className="py-3 pl-2 text-[#247AE0]">หุ้น</th>
                            <th className="py-3 text-[#247AE0]">วันที่ประกาศ</th>
                            <th className="py-3 text-[#247AE0]">วันแนะนำ<br/><span className="text-[10px] text-gray-400">(จำนวนวัน)</span></th>
                            <th className="py-3 text-[#247AE0]">ราคา</th>
                            <th className="py-3 text-[#247AE0]">เปลี่ยนแปลง</th>
                            <th className="py-3 text-[#247AE0]">สัญญาณ</th>
                            <th className="py-3 text-[#247AE0]">ปริมาณ</th>
                            <th className="py-3 text-[#247AE0]">หมวดหมู่</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {dashboardTableData.map((stock, i) => (
                            <tr key={i} className="hover:bg-gray-50">
                                <td className="py-4 pl-2 font-semibold text-[#247AE0]">{stock.symbol}</td>
                                {/* ใช้วันที่แบบ Dynamic จาก state */}
                                <td className="py-4 font-medium text-gray-900">{stock.date}</td>
                                <td className="py-4 font-medium text-gray-900">{stock.days}</td>
                                <td className="py-4 font-medium text-gray-900">{stock.price.toFixed(2)}</td>
                                <td className={`py-4 font-medium ${stock.isPositive ? 'text-green-500' : 'text-red-500'}`}>{stock.change}</td>
                                <td className={`py-4 font-bold ${stock.signalColor}`}>{stock.signal}</td>
                                <td className="py-4 font-medium text-gray-900">{stock.vol}</td>
                                <td className="py-4 font-medium text-gray-900">{stock.cat}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Donut Chart Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center">
             <div className="relative w-48 h-48">
                <div className="w-full h-full rounded-full" 
                    style={{ 
                        background: `conic-gradient(
                            #2563EB 0% 40%, 
                            #60A5FA 40% 65%, 
                            #93C5FD 65% 85%, 
                            #1E40AF 85% 100%
                        )`
                    }}>
                </div>
                <div className="absolute inset-0 m-auto w-24 h-24 bg-white rounded-full flex items-center justify-center flex-col">
                   <span className="text-gray-500 font-semibold text-sm">Portfolio</span>
                   <span className="text-[#247AE0] font-bold text-lg">View</span>
                </div>
             </div>

             <div className="flex flex-wrap gap-3 mt-8 justify-center text-xs text-gray-700">
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#1E40AF]"></span> เทคโนโลยี</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#2563EB]"></span> พลังงาน</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#60A5FA]"></span> โรงแรม</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#93C5FD]"></span> ธนาคาร</div>
             </div>
        </div>
      </div>
    </div>
  );
}