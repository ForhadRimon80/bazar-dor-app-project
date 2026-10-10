import Link from "next/link";
import { FaCaretUp } from "react-icons/fa6";

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

const PriceRising = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const data: IProduct[] = await res.json();

  const pricerising = data.filter((product) => product.change.dir === "up");

  const sortedProducts = pricerising.sort((a, b) => b.change.pct - a.change.pct);

  return (
    <section className="mx-2 mt-9 lg:mt-12">
      {/* Section Title */}
      <div className="mb-3 flex items-center gap-2 sm:mb-4">
        <FaCaretUp className="text-xl text-[#D03739] sm:text-2xl" />

        <h1 className="text-xl font-bold text-[#1D271F] sm:text-xl lg:text-[23px]">আজ দাম বেড়েছে</h1>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-3 lg:gap-4">
        {sortedProducts.slice(0, 6).map((product) => (
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

                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#F0F5F0] px-2 py-1 text-xs font-semibold text-[#D03739] sm:px-3 sm:text-sm lg:text-base">
                  <FaCaretUp className="text-base sm:text-lg lg:text-xl" />
                  {product.change.pct.toLocaleString("bn-BD")}%
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PriceRising;
