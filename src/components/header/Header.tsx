import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <>
      <header className="border-b-2 border-[#F0F5F0] bg-[#FAFCFA] py-1 sm:py-2 lg:py-3">
        <div className="container mx-auto grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-2 sm:gap-3 sm:px-4 lg:grid-cols-3 lg:gap-0 lg:px-0">
          {/* Logo and Title */}
          <Link href="/" className="min-w-0 lg:col-start-1">
            <div className="flex items-center justify-start gap-1.5 sm:gap-2">
              <Image src="/logo-icon.png" alt="Logo" width={40} height={40} loading="eager" className="h-9 w-9 shrink-0 rounded-xl bg-[#05893E] p-2 sm:h-10 sm:w-10 sm:p-2.5 lg:h-12 lg:w-12 lg:p-3" />

              <div className="min-w-0">
                <h2 className="text-lg font-bold text-black sm:text-xl lg:text-2xl">বাজার দর</h2>

                <p className="text-[10px] text-[#1D271F] sm:text-[11px] lg:text-xs">{date}</p>
              </div>
            </div>
          </Link>

          {/* Right Buttons */}
          <div className="flex items-center justify-end gap-1 sm:gap-2 lg:col-start-3 lg:gap-3">
            <button className="btn btn-ghost btn-sm rounded-md p-2 text-[11px] font-bold text-neutral-700 transition-colors hover:text-[#05893E] sm:p-3 sm:text-xs lg:p-5 lg:text-[14px]">সাইন ইন</button>

            <button className="btn btn-sm rounded-md border-none bg-[#05893E] p-2 text-[11px] font-medium text-white transition-colors hover:bg-[#04612c] sm:p-3 sm:text-xs lg:p-5 lg:text-[14px]">সাইন আপ</button>
          </div>
        </div>
      </header>

      <NavLink />
    </>
  );
};

export default Header;
