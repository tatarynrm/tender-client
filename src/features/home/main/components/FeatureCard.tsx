import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
}

const FeatureCard = ({ title, description, image }: FeatureCardProps) => {
  return (
    <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 flex flex-col items-center text-center overflow-hidden group hover:shadow-[0_0_40px_rgba(56,189,248,0.3)] hover:-translate-y-1 transition-all">
      <div className="overflow-hidden rounded-xl w-full h-48 mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-xl opacity-90"
        />
      </div>
      <h3 className="text-xl font-semibold text-teal-300 mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default FeatureCard;
