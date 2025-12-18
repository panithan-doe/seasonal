import { seasonalStocks } from "@/lib/mockData";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import StockChart from "@/components/StockChart";
import { getStockData } from "@/lib/services/stock"; 

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function StockDetail({ params }: PageProps) {
  const { id } = await params;
  const symbol = id;

  const stockStaticInfo = seasonalStocks.find(
    (s) => s.symbol === decodeURIComponent(symbol)
  );

  if (!stockStaticInfo) {
    return notFound();
  }

  // ดึงข้อมูลมา (ได้เป็น Object { history, info })
  const serviceData = await getStockData(symbol, "1M");
  
  // เอาเฉพาะ history (Array)
  const historyData = serviceData?.history || []; 

  let displayPrice = stockStaticInfo.price;
  let displayChange = (stockStaticInfo.price * stockStaticInfo.changePercent) / 100;
  let displayChangePercent = stockStaticInfo.changePercent;
  let lastUpdateDate = "ไม่ระบุวันที่";
  let lastUpdateTime = "";


  if (historyData && Array.isArray(historyData) && historyData.length >= 2) {
    // กรองข้อมูลที่เป็น Null ออก
    const validData = historyData.filter((d: any) => d.close !== null || d.adjClose !== null);
    
    if (validData.length >= 2) {
        const latest = validData[validData.length - 1]; 
        const previous = validData[validData.length - 2]; 

        const currentPrice = latest.close || latest.adjClose;
        const prevPrice = previous.close || previous.adjClose;

        displayPrice = currentPrice;
        displayChange = currentPrice - prevPrice;
        displayChangePercent = ((displayChange / prevPrice) * 100);

        const dateObj = new Date(latest.date);
        lastUpdateDate = dateObj.toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        
        lastUpdateTime = `อัปเดตเวลา ${dateObj.toLocaleTimeString('th-TH', {
            hour: '2-digit',
            minute: '2-digit',
        })} น.`;
    }
  }

  const isPositive = displayChange >= 0;
  const trendColor = isPositive ? "text-green-600" : "text-red-600";
  const trendSign = isPositive ? "+" : "";

  return (
    <main>
      <Header />

      <div className="min-h-screen bg-gray-50 py-6 px-10 xl:px-30">        
        
        <div className="pb-6 mb-2">
          <h1 className="text-5xl font-bold text-gray-900">{stockStaticInfo.symbol}</h1>
          <p className="text-xl text-gray-500 mt-2 font-semibold">{stockStaticInfo.name}</p>
        </div>

        <div className="mb-4">
          <h1 className="text-[#4285F4] font-extrabold text-xl">ภาพรวมหุ้น</h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex flex-col md:justify-between md:flex-row md:items-start">
            
            <div className="flex flex-col items-start md:flex-row md:items-start">
              <div className="md:pr-8 md:border-r">
                <p className="text-gray-500 text-sm">ราคาหุ้นปัจจุบัน</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {displayPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
              
              <div className="md:pl-8">
                <p className="text-gray-500 text-sm">เปลี่ยนแปลงวันนี้</p>
                <div className={`flex items-baseline mt-1 ${trendColor}`}>                  
                  <span className="text-2xl font-bold mr-2">
                      {trendSign}{displayChange.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-2xl font-bold">
                      ({trendSign}{displayChangePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end mt-4 md:mt-0">
              <p className="font-bold text-gray-700 text-lg">
                {lastUpdateDate}
              </p>
              {lastUpdateTime && (
                <p className="text-sm text-gray-500 mt-1">
                   {lastUpdateTime}
                </p>
              )}
            </div>

          </div>        
        </div>

        {/* ส่ง historyData (Array) เข้า Chart เพื่อแสดงผล */}
        <StockChart symbol={symbol} initialData={historyData} />
        
      </div>
    </main>
  );
}