import React from 'react';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa6';


interface IProduct {
  id: string;
  image: string;
  nameBn: string;
  today: number;
  unit: string;
  change: {
    dir: string;
    pct: number;
  };
}


  const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

const AllProducts = async () => {

    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
    const data: IProduct[] = await res.json();
    

    return (
      <section className="mt-12 mb-20">
        {/* Section Title */}
        <div className="mb-4 fixeditems-center gap-2">
          <h1 className="text-[23px] font-bold text-[#1D271F]">সব পণ্য</h1>
          <p className="text-[15px] text-[#6b806f]">মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((product) => (
            <div key={product.id} className="rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-5">
              {/* Product Icon and Name */}
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-2xl">{product.image}</span>

                <div>
                  <h2 className="text-lg font-bold text-[#1D271F]">{product.nameBn}</h2>

                  <p className="text-sm text-[#1D271F]">প্রতি {units[product.unit] ?? product.unit}</p>
                </div>
              </div>

              {/* Price and Percentage */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="mb-1 text-sm text-[#1D271F]">আজকের দাম</p>

                  <p className="text-xl font-bold text-[#1D271F]">{product.today.toLocaleString("bn-BD")} টাকা</p>
                </div>

                {/* <span className="inline-flex items-center gap-1 rounded-full bg-[#F0F5F0] px-3 py-1 text-sm font-semibold text-[#D03739]">
                        <FaCaretUp />
                        {product.change.pct.toLocaleString("bn-BD")}%
                      </span> */}
                {product.change.dir === "up" ? (
                  <span className="inline-flex items-center gap-1 font-semibold text-[#D03739]">
                    <FaCaretUp className="text-2xl" />
                    {product.change.pct.toLocaleString("bn-BD")}%
                  </span>
                ) : product.change.dir === "down" ? (
                  <span className="inline-flex items-center gap-1 font-semibold text-[#1A9951]">
                    <FaCaretDown className="text-2xl -translate-y-0.5" />
                    {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                  </span>
                ) : (
                  <span className="font-semibold text-black">০.০%</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    );
};

export default AllProducts;