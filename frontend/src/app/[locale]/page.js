import { FeaturedProperties } from "@/components/FeaturedProperties";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/header/Header";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { WhyUs } from "@/components/WhyUs";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });

  return { title: t("hero.title") };
}

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
      <Footer />
    </>
  );
}
