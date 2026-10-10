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

  const href = `/category/${slug}`;
  const isActive = pathname === href;

  return (
    <Link href={href} className={`inline-flex shrink-0 items-center gap-0.5 whitespace-nowrap rounded-[10px] pl-2 pr-2.5 pt-1.5 pb-1 text-xs font-normal transition-colors sm:gap-1 sm:pl-2.5 sm:pr-3 sm:pt-2 sm:pb-1.5 sm:text-sm lg:pl-3 lg:pr-3.5 lg:text-[15px] ${isActive ? "bg-[#05893E] text-white" : "text-black hover:bg-gray-200"}`}>
      <span>{icon}</span>
      <span>{title}</span>
    </Link>
  );
};

export default NavLInkItem;
