import { notFound } from "next/navigation";
import Header from "@/components/Header";
import StockChart from "@/components/StockChart";
import { getStockData } from "@/lib/services/stock";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function StockDetail({ params }: PageProps) {
  const { id } = await params;
  const symbol = id;

  // ดึงข้อมูลมา (ได้เป็น Object { history, info })
  const dataService = await getStockData(symbol, "1D")

  if (!dataService) return notFound();

  const { history, info } = dataService;


  // Format ข้อมูลกราฟ
  const initialChartData = history
    .filter((d: any) => d.close !== null)
    .map((d: any) => ({
        ...d,
        price: d.close || d.adjClose,
        displayDate: new Date(d.date).toLocaleDateString('th-TH', {
            day: 'numeric',
            month: 'short'
        })
    }));


  const currentPrice = info.regularMarketPrice || 0;
  const change = info.regularMarketChange || 0;
  const changePercent = info.regularMarketChangePercent || 0;
  const stockName = info.longName || info.shortName || symbol;

  // สถานะตลาด และ เวลา (CLOSE || REGULAR)
  const marketState = info.regularMarketTime  
  const lastUpdateDate = info.regularMarketTime 
    ? new Date(info.regularMarketTime).toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })
    : "ไม่ระบุ";
  const lastUpdateTime = info.regularMarketTime
    ? `${new Date(info.regularMarketTime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.`
    : "";
  
  
  const isPositive = change >= 0;
  const trendColor = isPositive ? "text-green-600" : "text-red-600";
  const trendSign = isPositive ? "+" : "";

  return (
    <main>
      <Header />

      <div className="min-h-screen bg-gray-50 py-6 px-10 xl:px-30">

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#247AE0] transition-colors group mb-6"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">ย้อนกลับ</span>
        </Link>

        <div className="pb-6 mb-2 mt-4">
          <h1 className="text-5xl font-bold text-gray-900">{symbol}</h1>
          <p className="text-xl text-gray-500 mt-2 font-semibold">{stockName}</p>
        </div>

        <div className="mb-4">
          <h1 className="text-[#4285F4] font-extrabold text-2xl">ภาพรวมหุ้น</h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex flex-col md:justify-between md:flex-row md:items-start">
            
            <div className="flex flex-col items-start md:flex-row md:items-start">
              <div className="md:pr-8 md:border-r">
                <p className="text-[#4285F4] text-lg font-semibold">ราคาหุ้นปัจจุบัน</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              
              <div className="md:pl-8">
                <p className="text-[#4285F4] text-lg font-semibold">เปลี่ยนแปลงวันนี้</p>
                <div className={`flex items-baseline mt-1 ${trendColor}`}>                  
                  <span className="text-2xl font-bold mr-2">
                      {trendSign}{change.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-2xl font-bold">
                      ({trendSign}{changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 mt-4 md:mt-0">
              <p className="font-semibold text-gray-500">
                อัปเดตล่าสุด
              </p>
              
              <div className="flex flex-row text-sm text-gray-500 mt-1">
                {lastUpdateTime && (
                  <p>
                    {lastUpdateTime}
                  </p>
                )}
                <p className="mx-1">
                  •
                </p>
                <p>
                {lastUpdateDate}
                </p>
              </div>
              
              
            </div>

          </div>        
        </div>


        <StockChart 
          symbol={symbol} 
          initialData={initialChartData}
          stockInfo={info}
        />
        
      </div>
    </main>
  );
}