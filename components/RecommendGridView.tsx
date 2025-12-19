"use client";

import React from "react";
import StockCard from "@/components/StockCard";
import NewsTable from "@/components/NewsTable";
import QuarterHeader from "@/components/QuarterHeader";
import { seasonalStocks, marketNews } from "@/lib/mockData";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function StockGridView() {
  const displayedStocks = seasonalStocks.slice(0, 6);

  return (
    <div>
      <section className="max-w-7xl mx-auto mb-16">
        <div className="flex items-center justify-end text-sm font-semibold mb-4">
          <Link 
            href="/seasonstock" 
            className="flex items-center text-sm font-semibold rounded-full border pl-3 pr-1 py-1 text-[#247AE0]  hover:bg-[#247AE0]/5 transition mb-4"
          >
            แสดงทั้งหมด
            <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedStocks.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-[#247AE0] mb-4">
          ข่าวสารหุ้น
        </h2>
        <NewsTable news={marketNews} />
      </section>
    </div>
  );
}