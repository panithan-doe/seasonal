"use client";

import Link from 'next/link';
import { TrendingUp } from 'lucide-react'
import { percent } from 'framer-motion';
import WatchlistButton from './WatchlistButton';

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

  const isPositive = stock.changePercent >= 0;  // green for POSITIVE, red for NEGATIVE
  const trendColor = isPositive ? 'text-green-600' : 'text-red-600';
  const trendSign = isPositive ? '+' : '';
  const priceChange = (stock.price * stock.changePercent) / 100;
  const growthPeriod = "กรกฏาคม-กันยายน"; // TODO: Need to change

  // const lossColor = stock.percentLoss <= 5 ? 'text-green-600' : 'text-yellow-600';


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
         <div className="flex flex-row justify-between items-start mb-3">
          <div>
            
            <div className='flex items-center justify-center rounded-lg bg-[#247AE0] mb-5 w-20'>
              <span className='text-sm font-medium text-white px-4 py-1'>
                กันยายน  {/* TODO: Change this */}
              </span>
            </div>

            <h4 className='text-sm text-gray-500 font-semibold mb-4'>{stock.category}</h4>
            <h3 className="text-3xl font-bold text-gray-900">{stock.symbol}</h3>
          </div>

          <WatchlistButton
            symbol={stock.symbol}
            initialIsWatchlist={stock.isWatchlist}
          />
        </div>



        {/* Body */}
        <div className='flex flex-col items-start'>
          <div className='flex justify-between w-full items-center mb-3'>
            
            {/* Price */}
            <div className='flex flex-col gap-2'>
              <h4 className="text-sm text-gray-500 font-semibold">ราคาปัจจุบัน</h4>
              <span className="text-xl font-bold text-[#247AE0]">
                USD {stock.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>

            {/* Change & Loss */}
            <div className='flex flex-col items-end gap-2'>
              <h4 className="text-sm text-gray-500 font-semibold">เปลี่ยนแปลงจากวันที่แนะนำ</h4>
              <div className={`flex items-center mt-1 gap-1 text-xl font-semibold ${trendColor}`}>
                <TrendingUp/>
                <span>
                  {trendSign}{priceChange.toFixed(2)}
                </span>
                <span className='text-sm'>
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

          <div className='flex flex-row w-full justify-between items-end'>
            {/* เติบโตได้ดีในช่วง */}
            <div>
              <h4 className="text-sm text-gray-500 font-semibold">เติบโตได้ดีในช่วง</h4>
              <h4 className="text-sm text-[#247AE0] font-semibold">{growthPeriod}</h4>        {/* Need to change*/}
            </div>

            {/* Button */}
            <div>
              <button className='flex items-center mt-2 px-3 py-2 bg-[#247AE0] rounded-lg hover:bg-blue-600 transition cursor-pointer '>
                <span className="text-sm font-medium text-white px-5">ดูรายละเอียด</span>
              </button>
            </div>
          </div>
          
          
          
        </div>
      </div>
    </Link>
  );
};

export default StockCard;