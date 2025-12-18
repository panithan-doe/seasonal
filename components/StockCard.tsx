"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Star, TrendingUp } from 'lucide-react'
import { percent } from 'framer-motion';
import { useToast } from '@/context/ToastContext';

interface StockProps {
  stock: {
    symbol: string;
    name: string;
    price: number;
    changePercent: number;
    category?: string;
    percentLoss: number;
    isWatchlist: boolean;    
  };
}

const StockCard = ({ stock }: StockProps) => {
  
  const [isWatchlist, setIsWatchlist] = useState(stock.isWatchlist)

  const isPositive = stock.changePercent >= 0;  // green for POSITIVE, red for NEGATIVE
  const trendColor = isPositive ? 'text-green-600' : 'text-red-600';
  const trendSign = isPositive ? '+' : '';
  const isWatchlistColor = isWatchlist ? 'text-[#ecc353]' : 'text-gray-300';
  const priceChange = (stock.price * stock.changePercent) / 100;
  const growthPeriod = "กรกฏาคม-กันยายน"; // TODO: Need to change
  const { showToast } = useToast();

  // const lossColor = stock.percentLoss <= 5 ? 'text-green-600' : 'text-yellow-600';


  const handleToggleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault(); // ป้องกันไม่ให้ลิงก์ทำงาน
    e.stopPropagation(); // ป้องกันไม่ให้เหตุการณ์ฟองสบู่ขึ้นไปยังองค์ประกอบพาเรนต์
    
    const newState = !isWatchlist;
    setIsWatchlist(newState);

    if (newState) {
      showToast(`${stock.symbol} ถูกเพิ่มใน Watchlist`, "success");
    } else {
      showToast(`${stock.symbol} ถูกลบออกจาก Watchlist`, "error");
    }

  }


  return (
    <Link href={`/stock/${stock.symbol}`} className="block h-full">
      <div className="
        h-full 
        p-5 
        bg-white 
        border border-gray-200 
        rounded-xl 
        shadow-sm 
        hover:shadow-md 
        hover:border-blue-300 
        transition-all 
        duration-200 
        flex flex-col 
        justify-between
      ">
        
        {/* Header */ }
        <div className="flex flex-col items-start mb-4">
          <h4 className='text-xs text-gray-400'>{stock.category}</h4>
          <div className='flex justify-between w-full items-center mb-2'>
            <h3 className="text-lg font-bold text-gray-900">{stock.symbol}</h3>
            
            <button
              onClick={handleToggleWatchlist}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none z-10"            >
              <Star
                className={isWatchlistColor}
                fill="currentColor"
                strokeWidth={0.1}
              />
            </button>

          </div>
        </div>

        {/* Body */}
        <div className='flex flex-col items-start'>
          <div className='flex justify-between w-full items-center mb-6'>
            
            {/* Price */}
            <div className='flex flex-col gap-2'>
              <h4 className="text-xs font-extrabold text-gray-400">ราคาปัจจุบัน</h4>
              <span className="text-2xl font-bold text-gray-900">
                THB{stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* Change & Loss */}
            <div className='flex flex-col items-end gap-2'>
              <h4 className="text-xs font-extrabold text-gray-400">เปลี่ยนแปลงจากวันที่แนะนำ</h4>
              <div className={`flex items-center mt-1 gap-1 text-sm font-semibold ${trendColor}`}>
                <TrendingUp/>
                <span>
                  {trendSign}{priceChange.toFixed(2)}
                </span>
                <span>
                  ({trendSign}{stock.changePercent.toFixed(2)}%)
                </span>
              </div>

              {/* Percent Loss */}
              
              {/* <div className={`flex items-center rounded-4xl gap-1 text-sm 
                ${stock.percentLoss <= 5 ? 'bg-green-100 p-0.5 px-3 text-green-500' : 'bg-yellow-100 p-0.5 px-3 text-yellow-500'}`
              }>
                <span>
                  loss {stock.percentLoss}%
                </span>
              </div> */}


            </div>
          </div>

          {/* month period growth */}
          <div>
            <h4 className="text-xs font-extrabold text-gray-400">เติบโตได้ดีในช่วง</h4>
            <h4 className="text-xs font-extrabold text-gray-400">{growthPeriod}</h4>        {/* Need to change*/}
          </div>

          {/* Button */}
          <div className='flex justify-end w-full'>
            <button className='flex items-center mt-2 px-4 py-1 bg-[#1f40af] rounded-lg hover:bg-blue-600 transition cursor-pointer '>
              <span className="text-xs font-medium text-white">ดูรายละเอียด</span>
            </button>
          </div>
        
          
          
        </div>
      </div>
    </Link>
  );
};

export default StockCard;