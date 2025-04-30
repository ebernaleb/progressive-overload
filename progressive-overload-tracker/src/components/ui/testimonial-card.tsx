import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  testimonial: string;
  imagePath: string;
  rating: number;
  gradient: string;
}

export function TestimonialCard({
  name,
  role,
  testimonial,
  imagePath,
  rating,
  gradient
}: TestimonialCardProps) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${gradient} opacity-5`} />
      
      {/* Content */}
      <div className="relative p-6">
        {/* Profile Image */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
            <Image
              src={imagePath}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{role}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className={`w-5 h-5 ${
                index < rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Testimonial */}
        <div className="relative">
          <div className="absolute -top-4 -left-2 text-4xl text-gray-200 dark:text-gray-700 opacity-50">
            "
          </div>
          <p className="text-gray-700 dark:text-gray-300 italic relative z-10 pl-4">
            {testimonial}
          </p>
          <div className="absolute -bottom-4 -right-2 text-4xl text-gray-200 dark:text-gray-700 opacity-50">
            "
          </div>
        </div>
      </div>
    </motion.div>
  );
} 