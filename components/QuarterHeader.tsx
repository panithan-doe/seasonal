"use client";

import Image from "next/image";

export default function QuarterHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow-sm ">
        <Image
          src="/images/mock-quarter.png"
          alt="Header Mockup"
          width={1440} 
          height={80}
          className="w-full h-auto object-cover block"
          priority 
        />
    </header>
  );
}