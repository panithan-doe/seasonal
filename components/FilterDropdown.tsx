"use client";

import { useState, useRef, useEffect } from "react";
import { Triangle } from "lucide-react";

interface CustomDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function FilterDropdown({
  options,
  value,
  onChange,
  placeholder = "Select",
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ฟังก์ชันสำหรับปิด Dropdown เมื่อคลิกที่อื่นนอกพื้นที่
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const displayValue = value === "All" ? placeholder : value;

  return (
    <div className="relative w-full md:w-48" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
          isOpen ? "ring-2 ring-blue-500 border-blue-500" : ""
        }`}
      >
        <span className="truncate">{displayValue}</span>
        <Triangle
          fill="gray"
          stroke="none"
          style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(180deg)' }}
          className="transition-transform duration-200 ml-2 shrink-0"
          size={10}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden py-2">
          <div className="max-h-64 overflow-y-auto">
            {options.map((option) => {
               
               let displayName = option;
               if (option === "All") {
                 displayName = placeholder.includes("หมวด") ? "ทุกหมวดหมู่" : "ทุกประเทศ";
               }
               
               const isSelected = option === value;

               return (
                <div
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className={`px-4 py-3 text-sm text-center cursor-pointer transition-colors
                    ${isSelected ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-50"}
                  `}
                >
                  {displayName}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
}