import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

interface PricingCardProps {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  bgGradient: string;
  borderGradient: string;
  buttonGradient: string;
  isPopular?: boolean;
  savings?: string;
  icon: any;
  imagePath: string;
  isYearly: boolean;
}

export function PricingCard({
  name,
  monthlyPrice,
  yearlyPrice,
  description,
  features,
  bgGradient,
  borderGradient,
  buttonGradient,
  isPopular,
  savings,
  icon: Icon,
  imagePath,
  isYearly
}: PricingCardProps) {
  const price = isYearly ? yearlyPrice : monthlyPrice;
  
  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden backdrop-blur-sm
        ${isPopular ? 'lg:-mt-4 lg:mb-4 lg:scale-105' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -12,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${bgGradient} opacity-10`} />
      
      {/* Border Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${borderGradient} opacity-20 border-2 rounded-2xl`} />

      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            Most Popular
          </span>
        </div>
      )}

      {/* Content */}
      <div className="relative p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-3 rounded-xl bg-gradient-to-r ${buttonGradient} bg-opacity-10`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{name}</h3>
        </div>

        {/* Image */}
        <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
          <Image
            src={imagePath}
            alt={`${name} plan`}
            fill
            className="object-cover transform hover:scale-110 transition-transform duration-500"
            priority
          />
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>

        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900 dark:text-white">
              ${price}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              /{isYearly ? 'year' : 'month'}
            </span>
          </div>
          {isYearly && savings && (
            <span className="text-sm text-green-600 dark:text-green-400 mt-2 block">
              {savings}
            </span>
          )}
        </div>

        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${buttonGradient} flex items-center justify-center`}>
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
            </div>
          ))}
        </div>

        <Button
          asChild
          className={`w-full bg-gradient-to-r ${buttonGradient} text-white hover:opacity-90 transition-opacity`}
        >
          <Link href="/coaching/purchase">
            Get Started
          </Link>
        </Button>
      </div>
    </motion.div>
  );
} 