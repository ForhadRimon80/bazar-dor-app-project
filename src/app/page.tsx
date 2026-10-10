import Banner from "@/components/homePage/Banner";
import PriceFalling from "@/components/homePage/PriceFalling";
import PriceRising from "@/components/homePage/PriceRising";


export default function Home() {
  return (
    <div>
      <Banner />
      <PriceRising />
      <PriceFalling />
    </div>
  );
}
