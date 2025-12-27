"use client"

import { useState, useRef, useEffect, } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
// ลบ X ออกจาก import เพราะไม่ใช้แล้ว
import { Menu, Search, Bell, Moon, Sun, X } from 'lucide-react'; 
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
  
  const searchRef = useRef<HTMLDivElement>(null);

  { /* Handle click outside */ }
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      
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
      <header className="sticky top-0 z-50 h-20 flex items-center justify-between w-full px-4 bg-white border-b border-gray-200 shadow-sm">
        
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


        <div className="flex flex-1 justify-end items-center mr-2" ref={searchRef}>          
          <div className="flex items-center gap-2">  
            {isSearchOpen && (
              <div className="relative w-full min-w-100 md:w-6"> 
                <input
                  autoFocus
                  type="text"
                  className="block w-full py-1.5 px-4 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                  placeholder="ค้นหา..."
                />
              </div>
            )}

            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              // className={`px-3 py-1.5 text-white rounded-full transition cursor-pointer flex items-center justify-center mr-2
              //   ${isSearchOpen 
              //     ? "bg-gray-400 hover:bg-gray-500" 
              //     : "bg-[#527AFC] hover:bg-[#436bf1]"
              //   }
              // `}
              className={`px-3 py-1.5 text-white rounded-full transition cursor-pointer flex items-center justify-center mr-2
                ${isSearchOpen
                  ? "bg-[#436bf1]"
                  : "bg-[#527AFC] hover:bg-[#436bf1]"
                }
                
              `}
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
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
                // backgroundColor: isDarkMode ? "#527AFC" : "#527AFC" 
                backgroundColor: "#527AFC"

              }}
            >
              {isDarkMode ? <Moon size={12} className="text-white"/> : <Sun size={12} className="text-white"/>}
            </motion.div>
          </div>

          {/* <button className="relative p-2 text-gray-500 rounded-full hover:bg-gray-100 transition">
            <Bell className="w-6 h-6" />
            <span className="hidden absolute top-1.5 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button> */}

          <ProfileDropdown />

        </div>
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    
    </>
  );
}