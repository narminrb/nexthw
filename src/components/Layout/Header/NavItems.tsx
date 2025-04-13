"use client";
import Link from "next/link";
import React, { FC } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { NavbarItemsProps } from "@/global";

const NavItems: FC<NavbarItemsProps> = ({ navItems }) => {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
        {navItems &&
          navItems.map((item: any, index: number) => (
            <li key={index}>
              <Link
                className={clsx(
                  "md:p-4 py-3 px-0 block",
                  pathname === item.url ? "bg-amber-100 rounded-xl" : ""
                )}
                href={item.url}
              >
                {item.name}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default NavItems;