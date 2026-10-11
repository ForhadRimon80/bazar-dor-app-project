import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default function NotFound() {
  return (
    <main className="flex min-h-[85vh] items-center justify-center bg-[#F0F5F0] px-4 py-12">
      <div className="w-full max-w-2xl text-center">
        {/* Error Code */}
        <h1 className="text-[120px] leading-none font-extrabold tracking-tight text-[#05893E] sm:text-[180px] md:text-[220px]">404</h1>

        {/* Decorative Divider */}
        <div className="my-6 flex items-center justify-center gap-3">
          <div className="h-px w-20 bg-[#05893E]/30" />
          <div className="h-2 w-2 rounded-full bg-[#05893E]" />
          <div className="h-px w-20 bg-[#05893E]/30" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#1D271F] sm:text-4xl">Page Not Found</h2>

        {/* Description */}
        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#61656B] sm:text-base">দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি। পেজটি সরানো হয়েছে অথবা লিংকটি ভুল হতে পারে।</p>

        {/* Back Home Button */}
        <Link href="/" className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-[#05893E] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-900/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#04612C] hover:shadow-xl">
          <FaArrowLeft className="text-sm" />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}