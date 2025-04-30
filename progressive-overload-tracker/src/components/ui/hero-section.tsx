import { motion } from 'framer-motion';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  gradient?: string;
}

export function HeroSection({ 
  title, 
  subtitle,
  gradient = "from-blue-600 via-purple-600 to-pink-600"
}: HeroSectionProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 w-full h-full">
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-10`} />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500 rounded-full blur-3xl opacity-20"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className={`text-4xl md:text-6xl font-bold bg-gradient-to-r ${gradient} text-transparent bg-clip-text mb-6`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {title}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
} 