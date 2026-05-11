import { FeaturedProperties } from "@/components/FeaturedProperties";
import { Header } from "@/components/header/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { WhyUs } from "@/components/WhyUs";

export default function Home() {
  return (
    <>
      <Header />
      <div>
        <Hero />
        <FeaturedProperties />
        <Stats />
        <WhyUs />
      </div>
    </>
  );
}
