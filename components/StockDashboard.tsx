"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock Data
const ganttData = [
  { id: 1, name: "CPAXT", start: 1, duration: 18, percent: "+0.90%", color: "bg-blue-800" },
  { id: 2, name: "CENTEL", start: 10, duration: 20, percent: "+0.30%", color: "bg-blue-900" },
  { id: 3, name: "KBANK", start: 6, duration: 20, percent: "+0.51%", color: "bg-blue-800" },
  { id: 4, name: "PTT", start: 11, duration: 12, percent: "+0.80%", color: "bg-blue-700" },
  { id: 5, name: "BANPU", start: 12, duration: 9, percent: "+0.50%", color: "bg-blue-800" },
];

const dashboardTableData = [
  { symbol: "CPAXT", date: "2 ก.ย. 2025", days: 18, price: 221.10, change: "+0.90%", signal: "Buy", vol: "6.6M", cat: "ค้าปลีก", signalColor: "text-green-500" },
  { symbol: "CENTEL", date: "10 ก.ย. 2025", days: 20, price: 183.30, change: "+0.30%", signal: "Sell", vol: "5.7M", cat: "ท่องเที่ยว", signalColor: "text-red-500" },
  { symbol: "KBANK", date: "6 ก.ย. 2025", days: 20, price: 167.30, change: "+0.51%", signal: "Hold", vol: "8.3M", cat: "การเงิน", signalColor: "text-yellow-500" },
  { symbol: "ERW", date: "11 ก.ย. 2025", days: 8, price: 112.60, change: "+0.90%", signal: "Buy", vol: "15.8M", cat: "ท่องเที่ยว", signalColor: "text-green-500" },
  { symbol: "PTT", date: "11 ก.ย. 2025", days: 12, price: 109.50, change: "+0.80%", signal: "Buy", vol: "45.2M", cat: "พลังงาน", signalColor: "text-green-500" },
  { symbol: "BANPU", date: "12 ก.ย. 2025", days: 9, price: 95.25, change: "+0.50%", signal: "Hold", vol: "32.1M", cat: "พลังงาน", signalColor: "text-yellow-500" },
];

export default function StockDashboard() {
  return (
    
    <div className="w-full pb-12 mt-6"> 
      
      {/* Month Navigation */}
      <div className="flex justify-between items-center text-gray-400 text-sm mb-2">
        <div className="flex items-center cursor-pointer hover:text-[#247AE0]">
            <ChevronLeft className="w-4 h-4" /> สิงหาคม
        </div>
        <div className="flex items-center cursor-pointer hover:text-[#247AE0]">
            ตุลาคม <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* Gantt Chart Header */}
      <div className="bg-[#5a8cd8] text-white py-2 text-center font-bold rounded-t-lg">
        {/* TODO: Change this */}
        กันยายน
      </div>

      {/* Gantt Calendar Grid */}
      <div className="bg-white rounded-b-lg shadow-sm border border-gray-200 overflow-x-auto mb-8">
        <div className="min-w-200">
            <div className="grid grid-cols-30 border-b">
            {/* TODO: เปลี่ยนจำนวน col ให้ตรงกับจำนวนวันจริงของเดือนนั้น (fixed 30 for now) */}
            {Array.from({ length: 30 }, (_, i) => (
                <div key={i} className={`text-xs text-center py-2 border-r ${i + 1 === 30 ? 'bg-orange-400 text-white' : 'text-gray-500'}`}>
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
                    <div className={`${item.color} text-white text-xs font-semibold w-full h-full rounded flex items-center justify-center shadow-sm whitespace-nowrap overflow-hidden px-2`}>
                        {item.duration} / {item.name} ({item.percent})
                    </div>
                </div>
            ))}
            </div>
        </div>
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
                            <th className="py-3 text-[#247AE0]">ราคา↑↓</th>
                            <th className="py-3 text-[#247AE0]">เปลี่ยนแปลง↑↓</th>
                            <th className="py-3 text-[#247AE0]">สัญญาณ</th>
                            <th className="py-3 text-[#247AE0]">ปริมาณ↑↓</th>
                            <th className="py-3 text-[#247AE0]">หมวดหมู่</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {dashboardTableData.map((stock, i) => (
                            <tr key={i} className="hover:bg-gray-50">
                                <td className="py-4 pl-2 font-semibold text-[#247AE0]">{stock.symbol}</td>
                                <td className="py-4 font-medium text-gray-900">{stock.date}</td>
                                <td className="py-4 font-medium text-gray-900">{stock.days}</td>
                                <td className="py-4 font-medium text-gray-900">{stock.price.toFixed(2)}</td>
                                <td className="py-4 font-medium text-green-500">{stock.change}</td>
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
                <div className="absolute inset-0 m-auto w-24 h-24 bg-white rounded-full"></div>
                
                <div className="absolute top-0 right-[-20px] text-xs font-bold text-gray-600">+0.90%</div>
                <div className="absolute top-[20px] left-[-20px] text-xs font-bold text-gray-600">+0.51%</div>
                <div className="absolute bottom-[40px] left-[-20px] text-xs font-bold text-gray-600">+0.60%</div>
                <div className="absolute bottom-[40px] right-[-20px] text-xs font-bold text-gray-600">+0.65%</div>
             </div>

             <div className="flex flex-wrap gap-3 mt-8 justify-center text-xs text-gray-700">
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#1E40AF]"></span> ค้าปลีก</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#2563EB]"></span> พลังงาน</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#60A5FA]"></span> โรงแรม</div>
                <div className="flex items-center gap-1"><span className="w-3 h-3 bg-[#93C5FD]"></span> ธนาคาร</div>
             </div>
        </div>
      </div>
    </div>
  );
}