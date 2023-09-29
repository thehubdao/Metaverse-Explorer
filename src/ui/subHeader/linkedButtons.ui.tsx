"use client"

import Link from "next/link";

interface OptionProps {
  name: string;
  route: string;
  isActive: boolean;
}

export default function LinkedButton({ name, route, isActive }: OptionProps) {

  return (
    <Link key={name} href={`/${route}`}>
    {/* Oval Button */}
    <div className={`${isActive ? 'shadow-hollow-8 dark:shadow-dm-hollow-8' : 'shadow-relief-16 hover:shadow-relief-12 dark:shadow-dm-relief-16 dark:hover:shadow-dm-relief-12'} px-8 py-3 flex items-center justify-center rounded-xl cursor-pointer transition ease-in-out duration-300`}>
      <div className="font-bold text-lm-text dark:text-nm-fill text-xs md:text-base uppercase">
        {name}
      </div>
    </div>
  </Link>
  )
}