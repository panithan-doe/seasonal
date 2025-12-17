"use client";

import { useState, useMemo } from "react"
import StockCard from "@/components/StockCard";
import Header from "@/components/Header";
import QuarterHeader from "@/components/QuarterHeader";
import { seasonalStocks } from "@/lib/mockData";
import {Filter, Search, Triangle} from 'lucide-react';
import FilterDropdown from '@/components/FilterDropdown';


export default function SeasonStock() {

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");

  // const categories = ["All", ...Array.from(new Set(seasonalStocks.map(s => s.category || "Other")))];
  const categories = ["All", ...Array.from(new Set(seasonalStocks.map(s => s.category || "Other")))];
  const [showWatchlistOnly, setShowWatchlistOnly] = useState(true);

  const countries = ["All", "ไทย", "อเมริกา"]; // TODO: Change this later

  const filteredStocks = useMemo(() => {
    return seasonalStocks.filter((stock) => {
      
      const isInWatchlist = stock.isWatchlist === true;
      
      // กรองตามชื่อหรือ symbol
      const matchesSearch = 
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase());      // กรองตามหมวดหมู่
      
      // กรองตามหมวดหมู่
      const matchesCategory = 
        selectedCategory === "All" || stock.category === selectedCategory;

      // กรองตามประเทศ (ถ้าใน data ยังไม่มี field country ให้ข้ามไปก่อน หรือใส่ logic เพิ่ม)
      const matchesCountry = 
        selectedCountry === "All" || (stock as any).country === selectedCountry;

      return isInWatchlist && matchesSearch && matchesCategory && matchesCountry;
    });
  }, [searchQuery, selectedCategory, selectedCountry]);


  return (
    <main>
      <Header />

      <QuarterHeader />
      

      <div className="min-h-screen bg-gray-50 p-6 md:p-12">
        <section className="max-w-7xl mx-auto mb-16">
          
          {/* Header */}
          <div className="flex justify-start items-end text-[#247AE0] mb-4">
            <h2 className="text-xl font-bold mr-1">Watchlist</h2>
            <span className="text-sm pb-0.5">({filteredStocks.length})</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            
            {/* Search Bar */}
            <div className="relative w-full md:w-72">
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
            </div>

            {/* Filter Group */}
            {/* <div className="flex gap-2 w-full md:w-auto justify-end"> 
              
              <FilterDropdown
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
            </div> */}

          </div>


          {/* Grid Stocks */}
          {filteredStocks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStocks.map((stock) => (
                <StockCard key={stock.symbol} stock={stock} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500">ไม่พบหุ้นที่คุณค้นหา</p>
              {/* <button 
                  onClick={() => {setSearchQuery(""); setSelectedCategory("All"); setSelectedCountry("All");}}
                  className="mt-2 text-blue-600 text-sm hover:underline"
              >
                  ล้างตัวกรอง
              </button> */}
            </div>
          )}

        </section>
      </div>
    </main>
  );
}
