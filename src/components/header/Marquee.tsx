import Link from "next/link";
import { FaCaretUp, FaCaretDown } from "react-icons/fa6";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

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

const Marquee = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products", {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
  }

  const data: IProduct[] = await res.json();

  const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  return (
    <div className="border-y border-[#E1E8E1] bg-[#FAFCFA]">
      <MarqueeText className="text-black" direction="right" duration={20}>
        {data.map((item) => (
          <Link key={item.id} href={`/products/${item.id}`}>
            <div className="inline-flex items-center gap-2 border-r border-[#F0F5F0] px-4 py-1.5 text-[14px] whitespace-nowrap">
              <span>{item.image}</span>

              <span className="font-medium">{item.nameBn}</span>

              <span>
                {item.today.toLocaleString("bn-BD")} টাকা/{units[item.unit] ?? item.unit}
              </span>
              {item.change.dir === "up" ? (
                <span className="inline-flex items-center gap-1 font-semibold text-[#D03739]">
                  <FaCaretUp className="text-2xl" />
                  {item.change.pct.toLocaleString("bn-BD")}%
                </span>
              ) : item.change.dir === "down" ? (
                <span className="inline-flex items-center gap-1 font-semibold text-[#1A9951]">
                  <FaCaretDown className="text-2xl -translate-y-0.5" />
                  {Math.abs(item.change.pct).toLocaleString("bn-BD")}%
                </span>
              ) : (
                <span className="font-semibold text-black">০.০%</span>
              )}
            </div>
          </Link>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
