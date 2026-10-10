import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <section className="mt-7">
      <div className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-gray-200 bg-[#FAFCFA] px-6 py-1 md:grid-cols-2">
        {/* Left Side */}
        <div>
          <p className="mb-3 inline-block rounded-full bg-[#E4F4E9] px-3 py-1 text-xs font-medium text-[#05893E]">{date}</p>

          <h1 className="mb-4 text-2xl font-bold text-[#1D271F] md:text-3xl">আজকের বাজারের দাম এক নজরে</h1>

          <p className="mb-6 max-w-lg text-sm leading-6 text-gray-500">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>

          <Link href="/products" className="btn flex w-fit mx-auto md:mx-0 border-none font-medium rounded-lg bg-[#05893E] px-6 text-white hover:bg-[#04612c]">
            সব পণ্য দেখুন
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center md:justify-end">
          <Image src="/bazar-hero.png" width={300} height={250} alt="Bazar Banner Image" className="h-auto w-48 object-contain md:w-76" priority />
        </div>
      </div>
    </section>
  );
};

export default Banner;
