import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <>
      <header className="border-b-2 border-[#F0F5F0] py-3 bg-[#FAFCFA]">
        <div className="container mx-auto grid grid-cols-3 items-center">
          {/* Center Logo and Title */}
          <Link href="/">
            <div className="col-start-1 flex items-center justify-start gap-2">
              <Image src="/logo-icon.png" alt="Logo" width={40} height={40} loading="eager" className="h-12 w-12 p-3 bg-[#05893E] rounded-xl" />

              <div>
                <h2 className="text-2xl font-bold text-black">বাজার দর</h2>
                <p className="text-xs text-[#1D271F]">{date}</p>
              </div>
            </div>
          </Link>

          {/* Right Buttons */}
          <div className="col-start-3 flex items-center justify-end gap-3">
            <button className="btn btn-ghost btn-sm font-bold text-[14px] p-5 rounded-md text-neutral-700 transition-colors hover:text-[#05893E]">সাইন ইন</button>

            <button className="btn btn-sm border-none font-medium text-[14px] p-5 rounded-md bg-[#05893E] text-white transition-colors hover:bg-[#04612c]">সাইন আপ</button>
          </div>
        </div>
      </header>
      <NavLink />
    </>
  );
};

export default Header;
