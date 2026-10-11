import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import UserInfo from "../UserInfo";

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
          <UserInfo />
        </div>
      </header>

      <NavLink />
    </>
  );
};

export default Header;
