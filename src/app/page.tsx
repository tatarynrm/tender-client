import { AboutSection } from "@/features/home/main/components/AboutSection.tsx";
import CTASection from "@/features/home/main/components/CTASection";
import FeaturesSection from "@/features/home/main/components/FeaturesSection";
import HeroSection from "@/features/home/main/components/HeroSection";
import Footer from "@/shared/components/Footer/Footer";
import Logo from "@/shared/components/Logo/Logo";
import { getProfile } from "@/shared/server/getProfile";

import { Metadata } from "next";
import React from "react";

const features = [
  {
    title: "Прозорі тендери 📑",
    description:
      "Усі тендери доступні онлайн. Беріть участь у чесних торгах і знаходьте найвигідніші умови співпраці.",
    image:
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "Особистий кабінет перевізника 🚛",
    description:
      "Керуйте автопарком, відстежуйте тендери, документи та замовлення в реальному часі.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "Аналітика і звіти 📊",
    description:
      "Відстежуйте ваші ставки, виграші та прибутковість — приймайте стратегічні рішення.",
    image:
      "https://static.tildacdn.com/tild3531-6361-4862-b332-373230313339/frame_1.png",
  },
  {
    title: "Документообіг онлайн 🗂️",
    description:
      "Всі контракти, рахунки та документи у вашому кабінеті. Швидко, зручно, безпечно.",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "Мультиплатформність 🌍",
    description:
      "Платформа адаптована для будь-якого пристрою — комп’ютера, планшета чи смартфона.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "AI-Інтеграції 🤖",
    description:
      "Підказки, автоматичні пропозиції цін і аналіз конкурентів за допомогою AI.",
    image:
      "https://d3373sevsv1jc.cloudfront.net/uploads/communities_production/article_block/1899/DA16A3C90F5A47569303568433490D8F.jpg",
  },
];

export const metadata: Metadata = {
  title: "Сучасний світ перевезень",
  description: "Сучасна логістична платформа для логістичних компаній",
};
export default async function HomePage() {
  const profile = await getProfile();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-teal-900 scrollbar-thin overflow-y-auto">
      {/* Логотип у верхньому лівому куті */}
      <div className="flex w-full">
        <Logo />
      </div>

      <HeroSection profile={profile ?? undefined} />
      <FeaturesSection features={features} />
      <CTASection />
      <AboutSection />
      <Footer />
    </div>
  );
}
