import Link from "next/link";
import { notFound } from "next/navigation";
import { FaCaretDown, FaCaretUp, FaChevronRight } from "react-icons/fa6";

interface IMarket {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface IProduct {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: IMarket[];
}

const units: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const ProductDetailsPage = async ({ params }: { params: Promise<{ productsId: string }> }) => {
  const { productsId } = await params;

  const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${productsId}`);

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.status}`);
  }

  const product: IProduct = await res.json();

  const unit = units[product.unit] ?? product.unit;

  const formatPrice = (price: number) =>
    price.toLocaleString("bn-BD", {
      maximumFractionDigits: 2,
    });

  const formatPriceList = (price: number) => Math.round(price).toLocaleString("bn-BD");

  const priceDifference = Math.abs(product.today - product.yesterday);

  const minPrice = Math.min(...product.markets.map((market) => market.min));

  const maxPrice = Math.max(...product.markets.map((market) => market.max));

  const avgPrice = product.markets.reduce((total, market) => total + (market.min + market.max) / 2, 0) / product.markets.length;

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <section className="mx-auto w-full max-w-5xl py-4 sm:py-6 lg:py-8">
      {/* Breadcrumb */}
      <div className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-[#1D271F] sm:mb-5 sm:gap-2 sm:text-sm lg:mb-6">
        <Link href="/" className="hover:text-[#05893E]">
          হোম
        </Link>

        <FaChevronRight className="shrink-0 text-[10px] text-gray-500 sm:text-xs" />

        <Link href={`/category/${product.category}`} className="hover:text-[#05893E]">
          {product.categoryNameBn}
        </Link>

        <FaChevronRight className="shrink-0 text-[10px] text-gray-500 sm:text-xs" />

        <span className="font-medium">{product.nameBn}</span>
      </div>

      {/* Product Summary */}
      <div className="mb-4 flex flex-col gap-3 rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-3 sm:mb-5 sm:gap-4 sm:p-4 lg:gap-5 lg:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-2xl sm:h-14 sm:w-14 sm:text-3xl lg:h-16 lg:w-16 lg:text-4xl">{product.image}</span>

          <div className="min-w-0">
            <h1 className="text-lg font-bold text-[#1D271F] sm:text-xl lg:text-2xl">{product.nameBn}</h1>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              প্রতি {unit} · {product.categoryNameBn}
            </p>

            <p className="mt-2 text-xs text-[#1D271F] sm:text-sm">{isUp ? `গতকালের তুলনায় আজ দাম বেড়েছে ${formatPrice(priceDifference)} টাকা` : isDown ? `গতকালের তুলনায় আজ দাম কমেছে ${formatPrice(priceDifference)} টাকা` : "গতকালের তুলনায় আজ দাম অপরিবর্তিত"}</p>
          </div>
        </div>

        {/* Today's Price */}
        <div className="flex min-w-28 flex-col items-center justify-center rounded-xl bg-[#F0F5F0] p-3 sm:p-4">
          <p className="text-xs text-gray-500">আজকের দাম</p>

          <h2 className="mt-1 text-2xl font-bold text-[#1D271F] sm:text-3xl">{formatPrice(product.today)}</h2>
          <p className="text-xs text-gray-500">টাকা / {unit}</p>

          {product.change.dir === "up" ? (
            <span className="inline-flex items-center gap-1 font-semibold text-[#D03739]">
              <FaCaretUp className="text-base sm:text-xl lg:text-2xl" />
              {product.change.pct.toLocaleString("bn-BD")}%
            </span>
          ) : product.change.dir === "down" ? (
            <span className="inline-flex items-center gap-1 font-semibold text-[#1A9951]">
              <FaCaretDown className="-translate-y-0.5 text-base sm:text-xl lg:text-2xl" />
              {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
            </span>
          ) : (
            <span className="font-semibold text-black">- ০.০%</span>
          )}
        </div>
      </div>

      {/* Price Summary and Market Table */}
      <div className="rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-3 sm:p-4 lg:p-5">
        <h2 className="mb-3 text-base font-bold text-[#1D271F] sm:mb-4 sm:text-lg">দামের সারসংক্ষেপ</h2>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
          <div className="rounded-xl border border-[#E1E8E1] p-3 sm:p-4">
            <p className="text-xs text-gray-500 sm:text-sm">সর্বনিম্ন দাম</p>

            <p className="mt-1 text-xl font-bold text-[#1A9951] sm:text-2xl">{formatPrice(minPrice)} টাকা</p>

            <p className="mt-1 text-xs text-[#1D271F]">সবচেয়ে কম দামের বাজার</p>
          </div>

          <div className="rounded-xl border border-[#E1E8E1] p-3 sm:p-4">
            <p className="text-xs text-gray-500 sm:text-sm">সর্বাধিক দাম</p>

            <p className="mt-1 text-xl font-bold text-[#D03739] sm:text-2xl">{formatPrice(maxPrice)} টাকা</p>

            <p className="mt-1 text-xs text-[#1D271F]">সবচেয়ে বেশি দামের বাজার</p>
          </div>

          <div className="rounded-xl border border-[#E1E8E1] p-3 sm:p-4">
            <p className="text-xs text-gray-500 sm:text-sm">গড় দাম</p>

            <p className="mt-1 text-xl font-bold text-[#05893E] sm:text-2xl">{formatPriceList(avgPrice)} টাকা</p>

            <p className="mt-1 text-xs text-[#1D271F]">প্রতি {unit}-এর হিসাবে</p>
          </div>
        </div>

        {/* Market Prices */}
        <h2 className="mb-3 mt-5 text-base font-bold text-[#1D271F] sm:mb-4 sm:mt-6 sm:text-lg lg:mt-7">বাজারভিত্তিক আজকের দাম</h2>

        <div className="overflow-x-auto rounded-xl border border-[#E1E8E1]">
          <table className="w-full min-w-150 border-collapse text-left text-xs sm:text-sm">
            <thead className="bg-[#FAFCFA] text-gray-500">
              <tr>
                <th className="px-3 py-2 font-medium sm:px-4 sm:py-3">বাজার</th>

                <th className="px-3 py-2 font-medium sm:px-4 sm:py-3">বিভাগ</th>

                <th className="px-3 py-2 text-right font-medium sm:px-4 sm:py-3">সর্বনিম্ন</th>

                <th className="px-3 py-2 text-right font-medium sm:px-4 sm:py-3">সর্বাধিক</th>

                <th className="px-3 py-2 text-right font-medium sm:px-4 sm:py-3">গড়</th>
              </tr>
            </thead>

            <tbody>
              {product.markets.map((market, index) => {
                const average = (market.min + market.max) / 2;

                return (
                  <tr key={`${market.market}-${index}`} className={`border-t border-[#E1E8E1] ${index % 2 === 0 ? "bg-[#FAFCFA]" : "bg-[#F0F5F0]"}`}>
                    <td className="px-3 py-2 sm:px-4 sm:py-3">{market.market}</td>

                    <td className="px-3 py-2 sm:px-4 sm:py-3">{market.division}</td>

                    <td className="px-3 py-2 text-right sm:px-4 sm:py-3">{formatPrice(market.min)} টাকা</td>

                    <td className="px-3 py-2 text-right sm:px-4 sm:py-3">{formatPrice(market.max)} টাকা</td>

                    <td className="px-3 py-2 text-right font-semibold sm:px-4 sm:py-3">{formatPrice(average)} টাকা</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
