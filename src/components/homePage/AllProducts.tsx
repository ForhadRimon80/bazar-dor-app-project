import Link from "next/link";
import { FaCaretDown, FaCaretUp } from "react-icons/fa6";

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
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const data: IProduct[] = await res.json();

  return (
    <section className="mt-9 mx-2 mb-10 sm:mb-14 lg:mt-12 lg:mb-20" id="all-products">
      {/* Section Title */}
      <div className="mb-3 sm:mb-4">
        <h1 className="text-xl font-bold text-[#1D271F] sm:text-xl lg:text-[23px]">সব পণ্য</h1>

        <p className="text-xs text-[#6b806f] sm:text-sm lg:text-[15px]">মোট {data.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে</p>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-3 lg:gap-4">
        {data.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="min-w-0">
            <div className="rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-3 sm:p-4 lg:p-5">
              {/* Product Icon and Name */}
              <div className="mb-3 flex items-center gap-2 sm:gap-3 lg:mb-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-xl sm:h-11 sm:w-11 sm:text-2xl lg:h-13 lg:w-13">{product.image}</span>

                <div className="min-w-0">
                  <h2 className="text-base font-bold text-[#1D271F] sm:text-lg">{product.nameBn}</h2>

                  <p className="text-xs text-[#1D271F] sm:text-sm">প্রতি {units[product.unit] ?? product.unit}</p>
                </div>
              </div>

              {/* Price and Percentage */}
              <div className="flex flex-wrap items-end justify-between gap-2 lg:flex-nowrap">
                <div>
                  <p className="mb-1 text-xs text-[#1D271F] sm:text-sm">আজকের দাম</p>

                  <p className="text-lg font-bold text-[#1D271F] sm:text-lg lg:text-xl">{product.today.toLocaleString("bn-BD")} টাকা</p>
                </div>

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
                  <span className="text-xs font-semibold text-black sm:text-sm lg:text-base">০.০%</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AllProducts;
