import { seasonalStocks } from "@/lib/mockData";
import { notFound } from "next/navigation";
import Header from "@/components/Header";

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


  // ถ้าหาไม่เจอ แสดงหน้า 404
  if (!stock) {
    return notFound();
  }

  return (
    <main>
      <Header />
      <div className="min-h-screen bg-gray-50 p-6 md:p-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
          {/* Header Section */}
          <div className="border-b pb-6 mb-6">
            <h1 className="text-4xl font-bold text-gray-900">{stock.symbol}</h1>
            <p className="text-xl text-gray-500 mt-2">{stock.name}</p>
            <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {stock.category}
            </span>
          </div>

          {/* Price Section */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="text-gray-500 text-sm">ราคาล่าสุด</p>
              <p className="text-5xl font-bold text-gray-900 mt-1">
                {stock.price.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">การเปลี่ยนแปลง</p>
              <p
                className={`text-2xl font-bold mt-2 ${
                  stock.changePercent >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {stock.changePercent >= 0 ? "+" : ""}
                {stock.changePercent}%
              </p>
            </div>
          </div>

          {/* ... ใส่กราฟหรือข้อมูลอื่นๆ ตรงนี้ ... */}
        </div>
      </div>
    </main>
  );
}
