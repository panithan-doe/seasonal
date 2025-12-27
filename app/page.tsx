"use client"

import StockCard from "@/components/StockCard";
import NewsTable from "@/components/NewsTable";
import Header from "@/components/Header";
import QuarterHeader from "@/components/QuarterHeader";
import { seasonalStocks } from "@/lib/mockData";
// import { marketNews } from "@/lib/mockData";
// import Link from 'next/link';
import { ArrowRight, LayoutGrid, BarChart2, Search, ChevronDown } from 'lucide-react';
import { useState, useCallback } from 'react';
import FilterDropdown from "@/components/FilterDropdown";
import RecommendGridView from "@/components/RecommendGridView"
import StockDashboard from "@/components/StockDashboard"
import { useRouter, useSearchParams, usePathname } from "next/navigation";




export default function Home() {

  // Hook call (สำหรับใช้ search params เมื่อกดปุ่ม toggle page จาก recommend -> dashboard ไม่ให้เปลี่ยนหน้าเมื่อ refresh)
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ตัวอย่าง URL: localhost:3000/?view=chart
  const viewMode = searchParams.get("view") === "chart" ? "chart" : "card";


  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleViewChange = (mode: "card" | "chart") => {
    // router.push จะเปลี่ยน URL โดยไม่ Reload หน้า (scroll: false คือไม่ให้เด้งขึ้นบนสุด)
    router.push(`${pathname}?${createQueryString("view", mode)}`, { scroll: false });
  };

  // Quarter selection state
  const [selectedQuarter, setSelectedQuarter] = useState(
    Math.floor(new Date().getMonth() / 3) + 1   // Current Quarter
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");

  const categories = ["All", ...Array.from(new Set(seasonalStocks.map(s => s.category || "Other")))];
  const countries = ["All", "ไทย", "อเมริกา"]; // TODO: Change this later

  // Filter stocks by selected quarter สำหรับ RecommendGridView (card view)
  // แสดงแค่หุ้นที่เริ่มในไตรมาส (ไม่รวมหุ้นที่คาบเกี่ยวเข้ามา)
  const displayedStocksForCards = (() => {
    const startMonth = (selectedQuarter - 1) * 3; // Q1=0-2, Q2=3-5, Q3=6-8, Q4=9-11
    const endMonth = startMonth + 2;

    return seasonalStocks
      .filter(stock => stock.month >= startMonth && stock.month <= endMonth)
      .slice(0, 6); // แสดงแค่ 6 ตัวแรก
  })();

  return (
    <main>
      {/* Header */}
      <Header />

      <QuarterHeader
        selectedQuarter={selectedQuarter}
        onQuarterChange={setSelectedQuarter}
      />

      

      {/* Body */}
      <div className="min-h-screen bg-gray-50 p-6 md:p-12">
        

        <section className="max-w-10/12 mx-auto mb-16">

          {/* Header Section */}
          <div className="flex flex-col">
            <div className="flex justify-start items-end text-[#247AE0] mb-6">
              <h2 className="text-2xl font-bold mr-1">แนะนำหุ้น</h2>
              <span className="text-md pb-0.5">({displayedStocksForCards.length})</span>
            </div>


            <div className="flex flex-row items-center justify-between mb-6">

              
              
              <div className="flex flex-cols md:flex-row">
                
                {/* Toggle switch button */}
                <div className="bg-gray-200 p-1 rounded-lg flex items-center shadow-inner">
                  <button
                    onClick={() => handleViewChange("card")}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === "card"
                        ? "bg-white text-[#247AE0] shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleViewChange("chart")}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === "chart"
                        ? "bg-[#247AE0] text-white shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <BarChart2 className="w-5 h-5" />
                  </button>
                </div>

                {/* TODO: Change this to current date */}
                {/* <div>
                  30 กันยายน 
                </div> */}

              </div>



              {/* Search & Filter */}
              <div className="flex gap-2 md:w-auto justify-end">
                {/* <div className="relative w-full md:w-60">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="ค้นหา..."
                    className="pl-10 pr-4 py-2 w-full text-gray-500 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div> */}
                
                < FilterDropdown
                  options={categories}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  placeholder="หมวดธุรกิจ"
                />

                <FilterDropdown
                  options={countries}
                  value={selectedCountry}
                  onChange={setSelectedCountry}
                  placeholder="เลือกประเทศ"
                />
              </div>
            
            </div>
          </div>

          
        {/* สลับหน้า Recommend : Dashboard */}
        {viewMode === "card" ? (
            <RecommendGridView stocks={displayedStocksForCards} />
        ) : (
            <StockDashboard stocks={seasonalStocks} selectedQuarter={selectedQuarter} />
        )}

        
        
        </section>

        
      </div>
    </main>
  );
}
