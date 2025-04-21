import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion"; // You'll need to install framer-motion

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative group"
    >
      <div
        className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-900/20
                    rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"
      />

      <div
        className="relative bg-black/40 backdrop-blur-sm border border-red-900/20
                    rounded-xl p-6 h-full transform group-hover:-translate-y-2
                    transition-all duration-300"
      >
        {/* Decorative elements */}
        <div
          className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br
                      from-red-600 to-red-900 rounded-full blur-2xl opacity-20
                      group-hover:opacity-40 transition-opacity duration-300"
        />

        {/* Icon container */}
        <div className="relative w-12 h-12 mb-4">
          <div className="absolute inset-0 bg-red-600/20 rounded-lg blur-sm" />
          <div
            className="relative bg-gradient-to-br from-red-600 to-red-800
                        rounded-lg p-3 transform group-hover:scale-110
                        transition-transform duration-300"
          >
            <Icon className="w-full h-full text-white" />
          </div>
        </div>

        {/* Content */}
        <h3
          className="text-xl font-semibold text-white mb-2
                     relative group-hover:text-red-500 transition-colors duration-300"
        >
          {title}
        </h3>

        <p
          className="text-gray-400 relative z-10 group-hover:text-gray-300
                    transition-colors duration-300"
        >
          {description}
        </p>

        {/* Hover line effect */}
        <div
          className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r
                      from-red-600 to-red-900 group-hover:w-full
                      transition-all duration-500"
        />
      </div>
    </motion.div>
  );
}
