"use client";

import { useState } from "react";
import Link from "next/link";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";
import { FiChevronDown } from "react-icons/fi";

export interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  categoryNameBn: string;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const units: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const CategoryProducts = ({ products }: { products: IProduct[] }) => {
  const [sortBy, setSortBy] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "low") return a.today - b.today;
    if (sortBy === "high") return b.today - a.today;
    return 0;
  });

  return (
    <div>
      {/* <div className="mb-3 flex w-full items-center justify-end gap-2 rounded-xl border border-[#E1E8E1] bg-[#FAFCFA] p-3 sm:p-3.5 lg:p-4">
        <span className="shrink-0 text-xs sm:text-sm">সাজান</span>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="min-w-0 max-w-full rounded-lg border border-[#E1E8E1] bg-white px-2 py-2 text-xs sm:px-3 sm:text-sm">
          <option value="default">ডিফল্ট</option>
          <option value="low">দাম: কম থেকে বেশি</option>
          <option value="high">দাম: বেশি থেকে কম</option>
        </select>
      </div> */}
      <div className="mb-3 flex w-full items-center justify-end gap-2 rounded-xl border border-[#E1E8E1] bg-[#FAFCFA] p-3 sm:p-3.5 lg:p-4">
        <span className="shrink-0 text-xs sm:text-sm">সাজান</span>

        <div className="relative">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="min-w-0 max-w-full appearance-none rounded-lg border border-[#E1E8E1] bg-white py-2 pl-3 pr-9 text-xs sm:text-sm">
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>

          <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm" />
        </div>
      </div>

      <p className="ml-2 mt-4 mb-2 text-xs text-gray-500 sm:mt-5 sm:text-sm lg:mt-6">মোট {products.length.toLocaleString("bn-BD")} টি পণ্য দেখানো হচ্ছে</p>

      {/* Product List */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-3 lg:gap-4">
        {sortedProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="min-w-0 rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-3 sm:p-4 lg:p-5 transition-colors hover:border-[#05893E]">
            <div className="mb-3 flex items-center gap-2 sm:gap-3 lg:mb-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-xl sm:h-11 sm:w-11 sm:text-2xl lg:h-12 lg:w-12">{product.image}</span>

              <div className="min-w-0">
                <h2 className="text-sm font-bold sm:text-base">{product.nameBn}</h2>

                <p className="text-xs text-gray-500">প্রতি {units[product.unit] ?? product.unit}</p>
              </div>
            </div>

            <p className="text-xs">আজকের দাম</p>

            <div className="flex flex-wrap items-end justify-between gap-2 lg:flex-nowrap">
              <p className="text-[16px] font-bold sm:text-lg lg:text-xl">{product.today.toLocaleString("bn-BD")} টাকা</p>

              {product.change.dir === "up" ? (
                <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#D03739] sm:text-sm lg:text-base">
                  <FaCaretUp className="text-base sm:text-lg lg:text-xl" />
                  {product.change.pct.toLocaleString("bn-BD")}%
                </span>
              ) : product.change.dir === "down" ? (
                <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#1A9951] sm:text-sm lg:text-base">
                  <FaCaretDown className="-translate-y-0.5 text-base sm:text-lg lg:text-xl" />
                  {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                </span>
              ) : (
                <span className="text-xs font-semibold text-black sm:text-sm lg:text-base">-০.০%</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
