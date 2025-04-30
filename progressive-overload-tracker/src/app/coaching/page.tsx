'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Check, ChevronRight, Star, Sparkles, Dumbbell, Timer, Trophy } from 'lucide-react';
import { HeroGlassmorphic, GlassmorphicBackground } from '@/components/ui/hero-glassmorphic';

// Counter Component for price animation
const Counter = ({ from, to }: { from: number; to: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;
    
    let startValue = from;
    const endValue = to;
    const duration = 1000;
    const startTime = performance.now();
    
    const updateCounter = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const currentValue = Math.floor(startValue + progress * (endValue - startValue));
      
      if (node) {
        node.textContent = currentValue.toString();
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    requestAnimationFrame(updateCounter);
  }, [from, to]);
  
  return <span ref={nodeRef}>{from}</span>;
};

export default function Coaching() {
  return <CoachingContent />;
}

function CoachingContent() {
  const router = useRouter();
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Beginner',
      monthlyPrice: 49,
      yearlyPrice: 470,
      description: 'Perfect for those just starting their fitness journey',
      image: '/images/beginner-workout.jpg',
      icon: Dumbbell,
      features: [
        'Personalized workout plan',
        'Basic nutrition guidelines',
        'Monthly check-ins',
        'Access to workout library',
        'Email support',
        'Form check videos'
      ],
      bgGradient: 'from-green-400 to-emerald-500',
      borderGradient: 'from-green-200 to-emerald-300',
      buttonGradient: 'from-green-500 to-emerald-600',
      savings: 'Save $118/yr'
    },
    {
      name: 'Amateur',
      monthlyPrice: 99,
      yearlyPrice: 950,
      description: 'For dedicated fitness enthusiasts ready to level up',
      image: '/images/amateur-workout.jpg',
      icon: Timer,
      features: [
        'Everything in Beginner plan',
        'Advanced workout programming',
        'Bi-weekly check-ins',
        'Customized nutrition plan',
        'Priority email support',
        'Weekly progress tracking',
        'Recovery protocols'
      ],
      bgGradient: 'from-blue-400 to-indigo-500',
      borderGradient: 'from-blue-200 to-indigo-300',
      buttonGradient: 'from-blue-500 to-indigo-600',
      isPopular: true,
      savings: 'Save $238/yr'
    },
    {
      name: 'Pro',
      monthlyPrice: 199,
      yearlyPrice: 1910,
      description: 'Elite coaching for serious athletes',
      image: '/images/pro-workout.jpg',
      icon: Trophy,
      features: [
        'Everything in Amateur plan',
        'Elite programming',
        'Weekly 1-on-1 coaching calls',
        'Custom meal plans',
        '24/7 WhatsApp support',
        'Competition prep guidance',
        'Advanced recovery techniques',
        'Performance tracking'
      ],
      bgGradient: 'from-purple-400 to-pink-500',
      borderGradient: 'from-purple-200 to-pink-300',
      buttonGradient: 'from-purple-500 to-pink-600',
      savings: 'Save $478/yr'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <GlassmorphicBackground />
      
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden isolate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
              Expert Coaching for{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-400">
                Every Level
              </span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12">
              Join our expert coaching program and achieve your fitness goals faster than ever. 
              Get personalized guidance, proven workout plans, and continuous support.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Toggle */}
      <div className="flex items-center justify-center space-x-4 mb-12 mt-8">
        <span className={`text-lg ${!isYearly ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
          Monthly
        </span>
        <motion.div
          className="relative"
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`w-16 h-8 rounded-full relative ${
              isYearly ? 'bg-blue-500' : 'bg-gray-300'
            } transition-colors duration-200`}
          >
            <motion.div
              className="w-6 h-6 rounded-full bg-white absolute top-1"
              initial={false}
              animate={{ x: isYearly ? 32 : 4 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </motion.div>
        <span className={`text-lg ${isYearly ? 'text-gray-900 font-semibold' : 'text-gray-500'}`}>
          Yearly
          <span className="ml-2 inline-block px-2 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium">
            Save 20%
          </span>
        </span>
      </div>

      {/* Pricing Plans with enhanced 3D effect */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-2xl overflow-hidden
                ${plan.isPopular ? 'lg:-mt-4 lg:mb-4 lg:scale-105' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ 
                y: -12,
                scale: 1.05,
                rotateY: 5,
                transition: { duration: 0.2 }
              }}
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Enhanced 3D Shadow */}
              <div 
                className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{
                  transform: 'translateZ(-10px)',
                  zIndex: -1
                }}
              />

              {/* Background Gradient with enhanced depth */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${plan.bgGradient} opacity-5`}
                style={{
                  transform: 'translateZ(0)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}
              />
              
              {/* Plan content with enhanced depth */}
              <div className="relative bg-white rounded-2xl" style={{ transform: 'translateZ(20px)' }}>
                {/* Popular Badge with enhanced elevation */}
                {plan.isPopular && (
                  <div 
                    className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-4 rounded-bl-xl z-10"
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 fill-current" />
                      <span className="text-sm font-semibold">MOST POPULAR</span>
                    </div>
                  </div>
                )}

                {/* Plan Image with enhanced depth */}
                <div className="relative h-48 overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center transform transition-transform duration-700 hover:scale-110"
                    style={{ 
                      backgroundImage: `url(${plan.image})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      transform: 'translateZ(10px)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white" style={{ transform: 'translateZ(15px)' }}>
                      <plan.icon className="w-6 h-6 mb-2" />
                      <h3 className="text-2xl font-bold">{plan.name}</h3>
                    </div>
                  </div>
                </div>

                {/* Plan Content with layered depth */}
                <div className="p-6 bg-white relative" style={{ transform: 'translateZ(15px)' }}>
                  {/* Savings Badge */}
                  {isYearly && (
                    <motion.div 
                      className="absolute -top-3 left-6 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      {plan.savings}
                    </motion.div>
                  )}

                  <div className="flex items-baseline mb-4 mt-2">
                    <span className="text-4xl font-bold">$</span>
                    <span className="text-4xl font-bold">
                      <Counter 
                        from={isYearly ? plan.monthlyPrice : plan.yearlyPrice} 
                        to={isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      />
                    </span>
                    <span className="text-gray-500 ml-2">/{isYearly ? 'year' : 'month'}</span>
                  </div>

                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  {/* Features List with enhanced animations */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li 
                        key={feature}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                      >
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.button
                    className={`w-full bg-gradient-to-r ${plan.buttonGradient} 
                      text-white py-4 px-6 rounded-xl font-semibold
                      transition-all duration-200 transform hover:scale-[1.02]
                      flex items-center justify-center group relative overflow-hidden`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10 flex items-center">
                      Get Started
                      <ChevronRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
                  </motion.button>
                </div>

                {/* Enhanced 3D Border Effect */}
                <div 
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${plan.borderGradient} opacity-0 
                    group-hover:opacity-30 transition-all duration-300`}
                  style={{
                    transform: 'translateZ(-5px)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Trust Indicators Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <motion.h2 
          className="text-3xl font-bold mb-12 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose Our Coaching?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Expert Trainers",
              description: "Our coaches have years of experience and professional certifications",
              icon: Trophy
            },
            {
              title: "Personalized Plans",
              description: "Every program is tailored to your specific goals and needs",
              icon: Sparkles
            },
            {
              title: "Proven Results",
              description: "Join thousands of successful clients who achieved their fitness goals",
              icon: Timer
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-blue-100 to-purple-100">
                  <item.icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 