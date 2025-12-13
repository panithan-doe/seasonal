import { seasonalStocks } from "@/lib/mockData";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import StockChart from "@/components/StockChart";

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function StockDetail({ params }: PageProps) {
  // ดึงค่า symbol จาก URL
  const { id } = await params;
  const symbol = id;

  const stock = seasonalStocks.find(
    (s) => s.symbol === decodeURIComponent(symbol)
  );

  // ถ้าหา stock ไม่เจอ แสดงหน้า 404
  if (!stock) {
    return notFound();
  }
  // console.log("Stock detail for symbol:", symbol, stock);

  const priceChange = (stock.price * stock.changePercent) / 100;

  return (
    <main>
      <Header />

      <div className="min-h-screen bg-gray-50 py-6 px-10 xl:px-30">        
        
        {/* Header Section */}
        <div className="pb-6 mb-2">
          <h1 className="text-5xl font-bold text-gray-900">{stock.symbol}</h1>
          <p className="text-xl text-gray-500 mt-2 font-semibold">{stock.name}</p>
        </div>

        <div className="mb-4">
          <h1 className="text-[#4285F4] font-extrabold text-xl">ภาพรวมหุ้น</h1>
        </div>
        {/* Price Section */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex flex-col md:justify-between md:flex-row md:items-start">
            
            {/* Right box */}
            <div className="flex flex-col items-start md:flex-row md:items-start">
              {/* ราคาหุ้นปัจจุบัน */}
              <div className="md:pr-8 md:border-r">
                <p className="text-gray-500 text-sm">ราคาหุ้นปัจจุบัน</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stock.price.toFixed(2)}
                </p>
              </div>
              {/* เปลี่ยนแปลงวันนี้ */}
              <div className="md:pl-8">
                <p className="text-gray-500 text-sm">เปลี่ยนแปลงวันนี้</p>
                <p
                  className={`text-2xl font-bold mt-1 mr-1 ${
                    stock.changePercent >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {priceChange.toFixed(2)} ({stock.changePercent >= 0 ? "+" : ""}{stock.changePercent}%)
                </p>
               
              </div>
            </div>
            {/* Left box (วันที่) */}
            <div className="flex flex-col items-start md:flex-col md:items-start text-gray-500">
              {/* TODO: Change to real date */}
              <p>
                30 กันยายน 2568
              </p>
              <p>
                อัพเดตเวลา 08:00 น.
              </p>
            </div>

          </div>        
        </div>

        
        <StockChart />

        
      </div>
    </main>
  );
}
