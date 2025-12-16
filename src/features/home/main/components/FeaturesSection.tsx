import React from "react";
import FeatureCard from "./FeatureCard";

interface Feature {
  title: string;
  description: string;
  image: string;
}

interface FeaturesSectionProps {
  features: Feature[];
}

const FeaturesSection = ({ features }: FeaturesSectionProps) => {
  return (
    <section className="relative z-10 mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl px-6">
      {features.map((feature, idx) => (
        <FeatureCard key={idx} {...feature} />
      ))}
    </section>
  );
};

export default FeaturesSection;
