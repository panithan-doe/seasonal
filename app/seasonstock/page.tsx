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
          <div className="flex justify-start items-end mb-6 text-[#247AE0]">
            <h2 className="text-xl font-bold mr-1">Season Stock</h2>
            <span className="text-sm pb-0.5">({seasonalStocks.length})</span>
          </div>

          {/* <hr className="mb-4"/> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seasonalStocks.map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
          </div>
        </section>

        
      </div>
    </main>
  );
}
