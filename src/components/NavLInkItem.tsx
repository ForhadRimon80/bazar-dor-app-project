"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface INavLinkItem {
  slug: string;
  title: string;
  icon: string;
}

const NavLInkItem = ({ slug, title, icon }: INavLinkItem) => {
  const pathname = usePathname();

  const href = `/${slug}`;
  const isActive = pathname === href;

  return (
    <Link href={href} className={`font-normal text-[15px] inline-flex items-center gap-1 rounded-[10px] pl-3 pr-3.5 pt-2 pb-1.5 transition-colors ${isActive ? "bg-[#05893E] text-white" : "text-black hover:bg-gray-200"}`}>
      <span>{icon}</span>
      <span>{title}</span>
    </Link>
  );
};

export default NavLInkItem;