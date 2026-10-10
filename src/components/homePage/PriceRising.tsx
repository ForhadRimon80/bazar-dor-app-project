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
    <section className="mt-12">
      {/* Section Title */}
      <div className="mb-4 flex items-center gap-2">
        <FaCaretUp className="text-2xl text-[#D03739]" />
        <h1 className="text-[23px] font-bold text-[#1D271F]">আজ দাম বেড়েছে</h1>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.slice(0, 6).map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-5">
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

                <span className="inline-flex items-center gap-1 rounded-full bg-[#F0F5F0] px-3 py-1 font-semibold text-[#D03739]">
                  <FaCaretUp className="text-xl" />
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
