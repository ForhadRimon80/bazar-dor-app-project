"use client";

import { useState } from "react";
import Link from "next/link";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

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
      <div className="mb-3 flex w-full items-center gap-2 justify-end rounded-xl border border-[#E1E8E1] bg-[#FAFCFA] p-4">
        <span className="text-sm">সাজান</span>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-lg border border-[#E1E8E1] bg-white px-3 py-2 text-sm">
          <option value="default">ডিফল্ট</option>
          <option value="low">দাম: কম থেকে বেশি</option>
          <option value="high">দাম: বেশি থেকে কম</option>
        </select>
      </div>
      <p className="ml-2 mt-6 mb-2 text-sm text-gray-500">মোট {products.length.toLocaleString("bn-BD")} টি পণ্য দেখানো হচ্ছে</p>

      {/*Product List */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-5 transition-colors hover:border-[#05893E]">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0F5F0] text-2xl">{product.image}</span>
              <div>
                <h2 className="font-bold">{product.nameBn}</h2>
                <p className="text-xs text-gray-500">প্রতি {units[product.unit] ?? product.unit}</p>
              </div>
            </div>

            <p className="text-xs">আজকের দাম</p>

            <div className="flex items-end justify-between">
              <p className="text-xl font-bold">{product.today.toLocaleString("bn-BD")} টাকা</p>

              <span className={`inline-flex items-center gap-1 rounded-full bg-[#F0F5F0] px-2 py-1 text-xs font-semibold ${product.change.dir === "up" ? "text-[#D03739]" : product.change.dir === "down" ? "text-[#1A9951]" : "text-black"}`}>
                {product.change.dir === "up" && <FaCaretUp />}
                {product.change.dir === "down" && <FaCaretDown />}
                {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
