import { Boxes, Layout, Sparkles } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: Boxes,
    title: "Component Library",
    description: "Explore our growing collection of reusable components.",
  },
  {
    icon: Layout,
    title: "Layouts",
    description: "Test different layout configurations and patterns.",
  },
  {
    icon: Sparkles,
    title: "Animations",
    description: "Implement smooth animations and transitions.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Explore Our Features
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-900 mx-auto" />
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
