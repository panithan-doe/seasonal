"use client"

import { useState, useRef, useEffect, } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
// ลบ X ออกจาก import เพราะไม่ใช้แล้ว
import { Menu, Search, Bell, Moon, Sun } from 'lucide-react'; 
import ProfileDropdown from '@/components/ProfileDropdown';
import Sidebar from '@/components/SideBar';

export default function Header() {
  
  // Theme toggle state
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const spring = { type: "spring" as const, stiffness: 700, damping: 30 };

  // Profile dropdown state
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // ✅ 1. เพิ่ม Ref สำหรับ Search bar เพื่อใช้เช็คการกดข้างนอก
  const searchRef = useRef<HTMLDivElement>(null);

  { /* Handle click outside */ }
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Logic เดิมของ Profile Dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      
      // ✅ 2. เพิ่ม Logic สำหรับ Search: ถ้าคลิกนอกพื้นที่ Search ให้ปิด
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);


  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 bg-white border-b border-gray-200 shadow-sm">
        
        {/* Left Section: Menu & Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 transition">
            <Menu className="w-6 h-6" />
          </button>

          <Link href='/' className="flex items-center">
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
          </Link>
        </div>

        {/* ✅ Middle Section: Search Bar (ปรับแก้) */}
        {/* ใช้ flex-1 เพื่อกินพื้นที่ว่าง และ justify-end เพื่อดันไปขวาสุด */}
        <div className="flex flex-1 justify-end items-center mr-2" ref={searchRef}>
          
          {isSearchOpen ? (
            // 🟢 สถานะ OPEN: Input Bar
            // กำหนด max-w เพื่อไม่ให้ยาวเกินไปจนชน Logo ฝั่งซ้าย
            <div className="relative w-full max-w-[200px] md:max-w-md text-gray-500 focus-within:text-blue-600">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5" />
              </div>
              <input
                autoFocus
                type="text"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholder="ค้นหา..."
              />
              {/* ❌ ลบปุ่ม X ออกแล้ว ตามต้องการ */}
            </div>
          ) : (
            // 🔴 สถานะ CLOSED: ปุ่มแว่นขยาย
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-500 rounded-full hover:bg-gray-100 transition"
            >
              <Search className="w-6 h-6" />
            </button>
          )}

        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-2 sm:gap-3">

          <div
            className={`relative flex h-8 w-16 cursor-pointer items-center rounded-full p-1 transition-colors duration-300 ${
              isDarkMode ? "bg-gray-600" : "bg-gray-300"
            }`}
            onClick={toggleTheme}
          >
            <div className="absolute right-2 text-white"><Moon size={14} /></div>
            <div className="absolute left-2 text-white"><Sun size={14} /></div>

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

          <button className="relative p-2 text-gray-500 rounded-full hover:bg-gray-100 transition">
            <Bell className="w-6 h-6" />
            <span className="hidden absolute top-1.5 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <ProfileDropdown />

        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    
    </>
  );
}