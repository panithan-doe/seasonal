import StockCard from "@/components/StockCard";
import NewsTable from "@/components/NewsTable";
import Header from "@/components/Header";
import { seasonalStocks } from "@/lib/mockData";
import { marketNews } from "@/lib/mockData";

export default function Home() {
  return (
    <main>
      {/* Header */}
      <Header />

      {/* Body */}
      <div className="min-h-screen bg-gray-50 p-6 md:p-12">
        {/* Seasonal Section */}
        <section className="max-w-7xl mx-auto mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#247AE0]">แนะนำหุ้น (6)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seasonalStocks.map((stock) => (
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
