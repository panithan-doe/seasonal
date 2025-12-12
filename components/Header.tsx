"use client"

import { useState, useRef, useEffect, } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Menu, Search, Bell, UserCircle, Moon, Sun, User, Settings, LogOut} from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';

export default function Header() {
  
  { /* Theme state */ }
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const spring = { type: "spring" as const, stiffness: 700, damping: 30 };

  { /* Profile dropdown state */}
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  { /* Handle click outside */}
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);


  return (

    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 bg-white border-b border-gray-200 shadow-sm">
      
      <div className="flex items-center gap-3">

        {/* Menu button */}
        <button className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 transition">
          <Menu className="w-6 h-6" />
        </button>

        {/* App logo */}
        <div className="flex items-center gap-2 text-black">
          <Image
            src="/logos/KIdeaSLogo.png"
            alt="KIdeaS Logo"
            width={32}
            height={32}
            className="w-10 h-10 object-contain" 
          />
          <span className="text-xl font-bold tracking-tight hidden sm:block">
            KIdeaS
          </span>
        </div>
      </div>

      {/* Search bar: จะถูกซ่อนตอนหน้าจอบีบ */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <div className="relative w-full text-gray-500 focus-within:text-blue-600">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all"
            placeholder="ค้นหา..."
          />
        </div>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* Search icon: จะแสดงตอนหน้าจอขยาย */}
        <button className="p-2 md:hidden text-gray-500 rounded-full hover:bg-gray-100">
          <Search className="w-6 h-6" />
        </button>

        {/* Theme Toggle */}
        <div
          className={`relative flex h-8 w-16 cursor-pointer items-center rounded-full p-1 transition-colors duration-300 ${
            isDarkMode ? "bg-gray-600" : "bg-gray-300"
          }`}
          onClick={toggleTheme}
        >
          {/* Icon LIGHT (ซ้าย), DARK (ขวา) */}
          <div className="absolute right-2 text-white"><Moon size={14} /></div>
          <div className="absolute left-2 text-white"><Sun size={14} /></div>

          {/* ปุ่มวงกลมเลื่อน */}
          <motion.div
            className="z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm"
            layout
            transition={spring}
            animate={{ 
              x: isDarkMode ? 32 : 0,
              backgroundColor: isDarkMode ? "#527AFC" : "#527AFC" 
            }}
          >
             {isDarkMode ? <Moon size={12} className="text-white"/> : <Sun size={12} className="text-white"/>}
          </motion.div>
        </div>

        {/* Noti */}
        <button className="relative p-2 text-gray-500 rounded-full hover:bg-gray-100 transition">
          <Bell className="w-6 h-6" />
          {/* จุดแดง */}
          <span className="hidden absolute top-1.5 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Profile Dropdown */}
        <ProfileDropdown />

      </div>
    </header>
  );
}