import StockCard from "@/components/StockCard";
import NewsTable from "@/components/NewsTable";
import Header from "@/components/Header";
import QuarterHeader from "@/components/QuarterHeader";
import { seasonalStocks } from "@/lib/mockData";
import { marketNews } from "@/lib/mockData";
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';


export default function Home() {
  
  // Display only 6 stocks
  const displayedStocks = seasonalStocks.slice(0, 6);

  return (
    <main>
      {/* Header */}
      <Header />

      <QuarterHeader />

      {/* Body */}
      <div className="min-h-screen bg-gray-50 p-6 md:p-12">
        {/* Seasonal Section */}
        <section className="max-w-7xl mx-auto mb-16">
          <div className="flex justify-start items-end text-[#247AE0]">
            <h2 className="text-2xl font-bold mr-1">แนะนำหุ้น</h2>
            <span className="text-md pb-0.5">({displayedStocks.length})</span>
          </div>

          <Link 
            href="/seasonstock" 
            className="group flex items-center justify-end text-sm font-semibold text-[#247AE0] hover:text-blue-700 transition-colors mb-4"
          >
            ดูทั้งหมด ({seasonalStocks.length})
            <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedStocks.map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
          </div>
        </section>

        {/* News Section */}
        <section className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-[#247AE0] mb-4">
            ข่าวสารหุ้น
          </h2>
          <NewsTable news={marketNews} />
        </section>
      </div>
    </main>
  );
}
