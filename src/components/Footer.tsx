const Footer = () => {
  return (
    <footer className="border-t border-[#E1E8E1] bg-[#FAFCFA]">
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 py-4 text-center sm:gap-3 sm:py-6 lg:flex-row lg:gap-4 lg:py-8 lg:text-left">
        <p className="text-xs text-[#1D271F] sm:text-sm lg:text-[16px]">বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>

        <p className="text-xs text-[#1D271F] sm:text-sm lg:text-[16px]">সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
    </footer>
  );
};

export default Footer;
