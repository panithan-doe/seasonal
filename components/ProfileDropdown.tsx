"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { UserCircle, Star, Settings, LogOut } from "lucide-react";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="ml-2 relative group" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none rounded-full p-1 hover:bg-gray-100 transition"
      >
        <UserCircle
          className={`w-9 h-9 transition ${
            isOpen ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
          
          <div className="flex justify-center px-4 py-2 border-b border-gray-100 mb-1">
            <p className="text-sm font-semibold text-gray-400">User Name</p>
          </div>


          {/* <Link
            href="/watchlist"
            className="flex justify-center  gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Star size={16} /> Watchlist
          </Link>

          <div className="h-px bg-gray-100 my-1" />
          
          <Link
            href="/settings"
            className="flex justify-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Settings size={16} /> การตั้งค่า
          </Link>

          <div className="h-px bg-gray-100 my-1" /> */}

          <button
            className="w-full flex justify-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
            onClick={() => {
              setIsOpen(false);
              console.log("Logging out...");
            }}
          >
            <LogOut size={16} /> ลงชื่อออก
          </button>
        </div>
      )}
    </div>
  );
}