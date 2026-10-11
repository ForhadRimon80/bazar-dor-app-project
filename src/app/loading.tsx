const Loading = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-[#F0F5F0] px-4">
      {/* Loading Spinner */}
      <div className="relative flex items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-[#D6EBDD] border-t-[#05893E]" />

        <div className="absolute h-3 w-3 rounded-full bg-[#05893E]" />
      </div>

      {/* Loading Text */}
      <h2 className="mt-6 text-lg font-bold text-[#1D271F]">লোড হচ্ছে...</h2>

      <p className="mt-2 text-center text-sm text-gray-500">অনুগ্রহ করে একটু অপেক্ষা করুন</p>
    </div>
  );
};

export default Loading;
