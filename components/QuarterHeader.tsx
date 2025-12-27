"use client";

import { CalendarDays } from 'lucide-react';

interface QuarterHeaderProps {
  selectedQuarter?: number | null;
  onQuarterChange?: (quarter: number) => void;
}

export default function QuarterHeader({ selectedQuarter = null, onQuarterChange }: QuarterHeaderProps) {

  const quarters = [
    { id: 1, label: "ไตรมาส 1", period: "ม.ค. - มี.ค." },
    { id: 2, label: "ไตรมาส 2", period: "เม.ย. - มิ.ย." },
    { id: 3, label: "ไตรมาส 3", period: "ก.ค. - ก.ย." },
    { id: 4, label: "ไตรมาส 4", period: "ต.ค. - ธ.ค." },
  ];
  
  return (
    <header className="relative top-0 z-40 w-full h-auto min-h-[20px] bg-linear-to-r from-[#247AE0] to-[#ffffff80] shadow-sm overflow-hidden">
      <img
        src="/images/quarter-pattern.png"
        alt=""
        className="absolute left-0 inset-y-0 h-full w-auto object-cover pointer-events-none opacity-80"
      />

      <img
        src="/images/quarter-vector.png"
        alt=""
        className="absolute right-0 inset-y-0 h-full w-auto object-cover pointer-events-none opacity-80"
      />

      <div className="relative z-10 container mx-auto px-4 h-full">
        <div className="flex items-center justify-evenly gap-6 overflow-x-auto py-2 no-scrollbar">
          
          {quarters.map((q) => {
            const isActive = selectedQuarter === q.id;

            return (
              <button
                key={q.id}
                onClick={() => onQuarterChange?.(q.id)}
                className={`
                  flex items-center gap-3 px-4 py-2 rounded-3xl transition-all duration-300 min-w-20 max-w-40 flex-1 cursor-pointer
                  ${isActive 
                    ? "bg-[#3869c6] ring-1 ring-white/40 shadow-lg backdrop-blur-sm"
                    : "bg-white/30 hover:bg-white/10 hover:opacity-100"
                  }
                `}
              >
                {/* Icon */}
                <CalendarDays 
                  className={`w-8 h-8 text-white"}`} 
                  strokeWidth={1.5}
                />
                
                {/* Text Group */}
                <div className="flex flex-col items-start">
                  <span className="text-lg font-bold text-white leading-tight">
                    {q.label}
                  </span>
                  <span className="text-sm font-medium text-white/90">
                    {q.period}
                  </span>
                </div>
              </button>
            );
          })}

        </div>
      </div>
    </header>
  );
}