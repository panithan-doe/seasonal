"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, Home, TrendingUp, Newspaper, Star, PieChart, Settings, HelpCircle } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  // กำหนดเมนูต่างๆ
  const menuItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Seasonal Stock", href: "/seasonstock", icon: PieChart },
    { name: "ข่าว", href: "/news", icon: Newspaper },
    { name: "Watchlist", href: "/watchlist", icon: Star },
    { name: "คู่มือ", href: "/handbook", icon: Star },
  ];

  // const bottomItems = [
  //   { name: "ตั้งค่า", href: "/settings", icon: Settings },
  //   { name: "ช่วยเหลือ", href: "/help", icon: HelpCircle },
  // ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-60 bg-black/40"
      />

      <div className="fixed top-0 left-0 z-70 h-full w-64 bg-white shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Image
              src="/logos/KIdeaSLogo.png"
              alt="Logo"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            <span className="text-lg font-bold text-gray-800">KIdeaS</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:bg-gray-100 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors ${
                  isActive
                    ? "text-[#247AE0] font-medium border-l-4"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* ส่วนล่าง */}
        {/* <div className="p-4 border-t border-gray-100 space-y-1">
          {bottomItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-center text-gray-400">
              © 2025 KIdeaS
            </p>
          </div>
        </div> */}
      </div>
    </>
  );
}