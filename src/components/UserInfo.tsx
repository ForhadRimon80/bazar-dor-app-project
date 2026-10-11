"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { toast } from "@heroui/react";
import { FaUser, FaArrowRightFromBracket, FaChevronDown, FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

const UserInfo = () => {
  const { data: session, isPending } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const user = session?.user;

  // Handle Sign Out
  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.danger(<span className="font-bold text-red-600">Sign Out Failed</span>, {
        indicator: <FaCircleXmark className="text-red-600" />,
        description: error.message,
      });
      return;
    }
    setIsOpen(false);
    toast.success(<span className="font-bold text-green-600">Signed Out Successfully</span>, {
      indicator: <FaCircleCheck className="text-green-600" />,
      description: "You have successfully signed out.",
    });
    router.push("/");
    router.refresh();
  };

  // Show a placeholder while the session is being fetched
  if (isPending) {
    return <div className="h-9 w-28 lg:col-start-3 lg:justify-self-end" />;
  }

  // User Not Signed In
  if (!user) {
    return (
      <div className="flex items-center justify-end gap-1 sm:gap-2 lg:col-start-3 lg:gap-3">
        <Link href="/signin">
          <button className="btn btn-ghost btn-sm rounded-md p-2 text-[11px] font-bold text-neutral-700 transition-colors hover:text-[#05893E] sm:p-3 sm:text-xs lg:p-5 lg:text-[14px]">সাইন ইন</button>
        </Link>

        <Link href="/signup">
          <button className="btn btn-sm rounded-md border-none bg-[#05893E] p-2 text-[11px] font-medium text-white transition-colors hover:bg-[#04612c] sm:p-3 sm:text-xs lg:p-5 lg:text-[14px]">সাইন আপ</button>
        </Link>
      </div>
    );
  }

  // User Signed In
  return (
    <div className="relative flex items-center justify-end lg:col-start-3">
      {/* User Button */}
      <button type="button" onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} aria-label="প্রোফাইল মেনু" className="flex items-center gap-2 rounded-lg px-2 py-1 transition-colors hover:bg-gray-100">
        {/* User Image */}
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gray-100">
          {user.image ? (
            <Image src={user.image} alt={user.name} fill sizes="36px" unoptimized className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <FaUser className="text-gray-500" />
            </div>
          )}
        </div>

        {/* User Name */}
        <span className="hidden max-w-28 truncate text-sm font-medium text-[#1D271F] sm:block">{user.name}</span>

        <FaChevronDown className="size-2 text-gray-500" />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-60 rounded-2xl border border-[#E1E8E1] bg-[#FAFCFA] p-4 shadow-lg">
          {/* User Details */}
          <div>
            <p className="truncate text-sm font-semibold text-[#1D271F]">{user.name}</p>

            <p className="mt-1 truncate text-xs text-gray-500">{user.email}</p>
          </div>

          {/* Dropdown Links */}
          <div className="mt-4 flex flex-col gap-3">
            <Link href="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-sm text-[#1D271F] transition-colors hover:text-[#05893E]">
              <FaUser className="size-3.5 text-[#5B7893]" />
              আমার প্রোফাইল
            </Link>

            <button type="button" onClick={handleSignOut} className="flex items-center gap-2 text-left text-sm text-red-600 transition-colors hover:text-red-700">
              <FaArrowRightFromBracket className="size-3.5" />
              সাইন আউট
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
