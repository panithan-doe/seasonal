"use client";

import React, { useMemo, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from "lucide-react";
import StockTooltip from "./StockTooltip";

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

// Type สำหรับ Gantt Bar (บางหุ้นจะถูก split ถ้าหุ้นคาบเกี่ยวเดือน)
interface GanttBarData {
  id: string;
  name: string;
  start: number;
  duration: number;
  percent: string;
  color: string;
  isContinuation: boolean; // true ถ้าเป็นส่วนที่ต่อจากเดือนก่อน
  hasNext: boolean; // true ถ้ายังมีส่วนต่อในเดือนถัดไป
  originalStock: StockData; // เก็บข้อมูลหุ้นต้นฉบับ
}

interface StockDashboardProps {
  stocks: any[]; // รับ Array ของหุ้นเข้ามา
  selectedQuarter: number; // รับไตรมาสที่เลือกจาก parent (1-4)
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

// Helper: คำนวณจำนวนวันในเดือน
const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper: ตรวจสอบว่าหุ้นคาบเกี่ยวเดือนหรือไม่
const isStockSpanningMonths = (stock: StockData, year: number): boolean => {
  const daysInMonth = getDaysInMonth(year, stock.month);
  return (stock.startDate + stock.duration - 1) > daysInMonth;
};

// Helper: คำนวณว่าหุ้นจบที่เดือนไหน (รองรับการคาบเกี่ยวหลายเดือน/ข้ามไตรมาส)
const getStockEndMonth = (stock: StockData, year: number): number => {
  let month = stock.month;
  let day = stock.startDate;
  let remainingDays = stock.duration;

  while (remainingDays > 0) {
    const daysInCurrentMonth = getDaysInMonth(year, month);
    const daysAvailableInMonth = daysInCurrentMonth - day + 1;

    if (remainingDays <= daysAvailableInMonth) {
      // หุ้นจบในเดือนนี้
      return month;
    }

    // ย้ายไปเดือนถัดไป
    remainingDays -= daysAvailableInMonth;
    month++;
    day = 1; // เริ่มจากวันที่ 1 ของเดือนถัดไป
  }

  return month;
};


export default function StockDashboard({ stocks, selectedQuarter }: StockDashboardProps) {

    // คำนวณเดือนเริ่มต้นจาก selectedQuarter
    // Q1 = เดือน 0 (มกราคม), Q2 = เดือน 3 (เมษายน), Q3 = เดือน 6 (กรกฎาคม), Q4 = เดือน 9 (ตุลาคม)
    const getInitialMonth = (quarter: number) => (quarter - 1) * 3;

    const [currentDate, setCurrentDate] = useState(new Date(2025, getInitialMonth(selectedQuarter), 1));

    // Tooltip state
    // 🔧 DEV: เปลี่ยน visible: false, stock: null เมื่อต้องการปิด tooltip
    const [tooltip, setTooltip] = useState<{
        visible: boolean;
        x: number;
        y: number;
        stock: StockData | null;
    }>({
        visible: false,
        x: 0,
        y: 0,
        stock: null
    });

    // อัพเดท currentDate เมื่อ selectedQuarter เปลี่ยน
    useEffect(() => {
        const newMonth = getInitialMonth(selectedQuarter);
        setCurrentDate(new Date(2025, newMonth, 1));
    }, [selectedQuarter]);

    const currentMonthIndex = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Logic คำนวณขอบเขตไตรมาส
    const currentQuarter = Math.floor(currentMonthIndex / 3);
    const startMonthOfQuarter = currentQuarter * 3;       // เช่น Q3 = 6 (กรกฎาคม)
    const endMonthOfQuarter = startMonthOfQuarter + 2;    // เช่น Q3 = 8 (กันยายน)

    // สร้าง sortedList เฉพาะหุ้นในไตรมาสปัจจุบัน เรียงตาม timeline
    // รองรับหุ้นที่คาบเกี่ยวเข้ามาในไตรมาสนี้ด้วย
    const sortedList = useMemo(() => {
        return [...stocks]
            .filter(stock => {
                // คำนวณเดือนที่หุ้นจบ
                const endMonth = getStockEndMonth(stock, currentYear);
                // เช็คว่าหุ้นมีส่วนที่อยู่ในไตรมาสนี้หรือไม่
                // (เริ่มก่อนหรือในไตรมาส และจบในหรือหลังไตรมาส)
                return endMonth >= startMonthOfQuarter && stock.month <= endMonthOfQuarter;
            })
            .sort((a, b) => {
                // เรียงตามเดือนก่อน
                if (a.month !== b.month) return a.month - b.month;
                // ถ้าเดือนเดียวกัน เรียงตามวันที่
                if (a.startDate !== b.startDate) return a.startDate - b.startDate;
                // ถ้าวันเดียวกัน เรียงตาม symbol
                return a.symbol.localeCompare(b.symbol);
            });
    }, [stocks, startMonthOfQuarter, endMonthOfQuarter, currentYear]);

    // สร้าง index mapping จาก sortedList
    const stockIndexMap = useMemo(() => {
        const map: Record<string, number> = {};
        sortedList.forEach((stock, index) => {
            map[stock.symbol] = index;
        });
        return map;
    }, [sortedList]);

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

    // Tooltip handlers
    const handleMouseEnter = (stock: StockData, e: React.MouseEvent) => {
        setTooltip({
            visible: true,
            x: e.clientX,
            y: e.clientY,
            stock
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (tooltip.visible) {
            setTooltip(prev => ({
                ...prev,
                x: e.clientX,
                y: e.clientY
            }));
        }
    };

    const handleMouseLeave = () => {
        setTooltip({
            visible: false,
            x: 0,
            y: 0,
            stock: null
        });
    };

    const hasPrevMonth = currentMonthIndex > startMonthOfQuarter;
    const hasNextMonth = currentMonthIndex < endMonthOfQuarter;

    // ชื่อเดือนที่จะแสดงที่ปุ่ม
    const prevMonthName = hasPrevMonth ? thaiMonths[currentMonthIndex - 1] : "";
    const nextMonthName = hasNextMonth ? thaiMonths[currentMonthIndex + 1] : "";

    // Filter หุ้นที่จะแสดงในเดือนปัจจุบัน
    // รองรับหุ้นที่คาบเกี่ยวหลายเดือน/ข้ามไตรมาส
    const monthlyStocks = useMemo(() => {
        return stocks.filter(stock => {
            // คำนวณเดือนที่หุ้นจบ
            const endMonth = getStockEndMonth(stock, currentYear);
            // เช็คว่าเดือนปัจจุบันอยู่ในช่วงของหุ้นหรือไม่
            return currentMonthIndex >= stock.month && currentMonthIndex <= endMonth;
        });
    }, [stocks, currentMonthIndex, currentYear]);

  // แปลงข้อมูลสำหรับ Gantt Chart
  const ganttData = useMemo(() => {
    const currentMonthStocksMap = new Map<string, StockData>();
    monthlyStocks.forEach(stock => {
      currentMonthStocksMap.set(stock.symbol, stock);
    });

    // สร้าง rows ตามจำนวนหุ้นทั้งหมดใน sortedList
    return sortedList.map((sortedStock, index): GanttBarData | null => {
      const stock = currentMonthStocksMap.get(sortedStock.symbol);

      // ถ้าหุ้นนี้ไม่มีในเดือนปัจจุบัน → return null (ปล่อยว่าง)
      if (!stock) {
        return null;
      }

      // หุ้นมีในเดือนนี้ → คำนวณ bar data
      const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonthIndex);
      const endMonth = getStockEndMonth(stock, currentYear);

      let start = stock.startDate;
      let duration = stock.duration;
      let isContinuation = false;
      let hasNext = false;

      // ตรวจสอบว่าหุ้นนี้เริ่มในเดือนปัจจุบันหรือไม่
      const isStartingThisMonth = stock.month === currentMonthIndex;

      if (isStartingThisMonth) {
        // หุ้นเริ่มในเดือนนี้
        const endDate = stock.startDate + stock.duration - 1;

        if (endDate > daysInCurrentMonth) {
          // คาบเกี่ยวไปเดือนถัดไป - ตัดให้แสดงแค่ถึงสิ้นเดือน
          duration = daysInCurrentMonth - stock.startDate + 1;
          hasNext = true;
        }
      } else {
        // หุ้นเริ่มจากเดือนก่อนหน้า - แสดงเฉพาะส่วนที่ต่อมาในเดือนนี้
        isContinuation = true;
        start = 1; // เริ่มต้นที่วันที่ 1 ของเดือนนี้

        // คำนวณว่าใช้ไปกี่วันแล้วในทุกเดือนก่อนหน้า
        let daysUsed = 0;
        let m = stock.month;
        let d = stock.startDate;

        while (m < currentMonthIndex) {
          const daysInMonth = getDaysInMonth(currentYear, m);
          daysUsed += daysInMonth - d + 1;
          m++;
          d = 1; // เดือนถัดไปเริ่มจากวันที่ 1
        }

        // คำนวณว่าเหลืออีกกี่วันที่ต้องแสดงในเดือนปัจจุบัน
        const remainingDays = stock.duration - daysUsed;
        duration = Math.min(remainingDays, daysInCurrentMonth);

        // เช็คว่ายังมีต่อในเดือนถัดไปหรือไม่
        if (remainingDays > daysInCurrentMonth) {
          hasNext = true;
        }
      }

      return {
        id: `${stock.symbol}-${stockIndexMap[stock.symbol]}`,
        name: stock.symbol,
        start,
        duration,
        percent: stock.changePercent > 0 ? `+${stock.changePercent}%` : `${stock.changePercent}%`,
        color: "bg-[#1f40af]",
        isContinuation,
        hasNext,
        originalStock: stock
      };
    });
  }, [sortedList, monthlyStocks, currentMonthIndex, currentYear, stockIndexMap]); 

  // แปลงข้อมูลสำหรับ Table ด้านล่าง
  // แสดงเฉพาะหุ้นที่เริ่มในเดือนนี้เท่านั้น (ไม่รวมหุ้นที่ต่อมาจากเดือนก่อน)
  const dashboardTableData = useMemo(() => {
    return monthlyStocks
      .filter(stock => stock.month === currentMonthIndex)
      .map((stock) => {
        const isPositive = stock.changePercent >= 0;

        const dateString = `${stock.startDate} ${thaiMonthsShort[currentMonthIndex]} ${currentYear + 543}`;

        let signalColor = "text-yellow-500";
        if (stock.signal === "BUY") signalColor = "text-green-500";
        if (stock.signal === "SELL") signalColor = "text-red-500";

        // ตรวจสอบว่าหุ้นคาบเกี่ยวเดือนหรือไม่
        const isSpanning = isStockSpanningMonths(stock, currentYear);
        const daysInMonth = getDaysInMonth(currentYear, stock.month);

        return {
          symbol: stock.symbol,
          date: dateString,
          days: stock.duration, // แสดงจำนวนวันรวมทั้งหมด
          daysDisplay: isSpanning
            ? `${stock.duration} (${daysInMonth - stock.startDate + 1}→${stock.duration - (daysInMonth - stock.startDate + 1)})`
            : stock.duration, // ถ้าคาบเกี่ยว แสดงว่าแบ่งเป็น 2 เดือน
          price: stock.price,
          change: isPositive ? `+${stock.changePercent}%` : `${stock.changePercent}%`,
          signal: stock.signal,
          vol: stock.volume || "N/A",
          cat: stock.category,
          signalColor: signalColor,
          isPositive: isPositive
        };
      });
  }, [monthlyStocks, currentMonthIndex, currentYear]);

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
        
        {/* เพิ่ม: แสดงข้อความเมื่อไม่มีข้อมูลในเดือนนั้น */}
        {monthlyStocks.length === 0 ? (
            <div className="p-10 text-center text-gray-400">
                ไม่มีข้อมูลหุ้นแนะนำในเดือน{thaiMonths[currentMonthIndex]}
            </div>
        ) : (
            <div className="min-w-200">
                {/* Header: แสดงตัวเลขวันที่ตามจำนวนวันจริง */}
                {(() => {
                    const daysInMonth = getDaysInMonth(currentYear, currentMonthIndex);
                    return (
                        <div className="grid border-b" style={{ gridTemplateColumns: `repeat(${daysInMonth}, minmax(0, 1fr))` }}>
                            {Array.from({ length: daysInMonth }, (_, i) => (
                                <div key={i} className={`text-[10px] md:text-xs text-center py-2 border-r ${i + 1 === daysInMonth ? 'bg-orange-400 text-white' : 'text-gray-500'}`}>
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    );
                })()}

                <div className="relative py-4 space-y-3 px-1">
                {/* Background Grid */}
                <div className="absolute inset-0 pointer-events-none" style={{ top: '1rem', bottom: '1rem' }}>
                    {/* Grid ตาราง */}
                    {ganttData.map((_, rowIndex) => {
                        const daysInMonth = getDaysInMonth(currentYear, currentMonthIndex);
                        return (
                            <div
                                key={`grid-row-${rowIndex}`}
                                className="flex h-8 mb-3"
                            >
                                {Array.from({ length: daysInMonth }, (_, colIndex) => (
                                    <div
                                        key={`grid-${rowIndex}-${colIndex}`}
                                        className="flex-1 border-r border-b border-gray-200"
                                        style={{ minWidth: `${100 / daysInMonth}%` }}
                                    />
                                ))}
                            </div>
                        );
                    })}
                </div>

                {/* Gantt Bars (ด้านหน้า) */}
                {ganttData.map((item, index) => {
                    const daysInMonth = getDaysInMonth(currentYear, currentMonthIndex);

                    // ถ้า item เป็น null → แสดง empty row
                    if (!item) {
                        return (
                            <div
                                key={`empty-${index}`}
                                className="relative h-8 z-10"
                            >
                                {/* Empty placeholder */}
                            </div>
                        );
                    }

                    // item มีข้อมูล → แสดง bar ตามปกติ
                    return (
                        <div
                            key={item.id}
                            className="relative h-8 z-10 flex items-center"
                            style={{
                                marginLeft: `${((item.start - 1) / daysInMonth) * 100}%`,
                                width: `${(item.duration / daysInMonth) * 100}%`
                            }}
                        >
                            <div
                                className={`${item.color} text-white text-[10px] md:text-xs font-semibold w-full h-full rounded flex items-center justify-between shadow-sm overflow-hidden px-2 cursor-pointer hover:opacity-90 transition-opacity`}
                                onMouseEnter={(e) => handleMouseEnter(item.originalStock, e)}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                            >
                                {/* แสดง Arrow Left ถ้าต่อมาจากเดือนก่อน */}
                                {item.isContinuation && (
                                    <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 shrink-0 opacity-80" />
                                )}

                                {/* ข้อความกลาง */}
                                <span className="whitespace-nowrap px-1 flex-1 text-center">
                                    {item.originalStock.duration}วัน / {item.name} ({item.percent})
                                </span>

                                {/* แสดง Arrow Right ถ้ายังมีต่อในเดือนถัดไป */}
                                {item.hasNext && (
                                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 shrink-0 opacity-80" />
                                )}
                            </div>
                        </div>
                    );
                })}
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
                                <td className="py-4 font-medium text-gray-900">{stock.daysDisplay}</td>
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
                   <span></span>
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

      {/* Tooltip */}
      <StockTooltip
        visible={tooltip.visible}
        x={tooltip.x}
        y={tooltip.y}
        stock={tooltip.stock}
        monthName={thaiMonths[currentMonthIndex]}
      />
    </div>
  );
}