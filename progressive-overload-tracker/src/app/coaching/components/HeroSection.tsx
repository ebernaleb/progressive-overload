"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles } from "lucide-react"

interface ActionProps {
  label: string
  href: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

interface CoachingHeroProps {
  className?: string
  title?: string
  subtitle?: string
  actions?: ActionProps[]
  titleClassName?: string
  subtitleClassName?: string
  actionsClassName?: string
}

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.1,
      duration: 0.8,
      ease: "easeInOut"
    }
  })
}

export default function HeroSection() {
  return (
    <section
      className={cn(
        "relative z-0 flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-background",
      )}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        {/* Animated gradient orbs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-purple-200 via-violet-400 to-indigo-600 blur-3xl"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1.2 }}
          transition={{ 
            duration: 4, 
            delay: 0.5,
            repeat: Infinity, 
            repeatType: "reverse",
            ease: "easeInOut" 
          }}
          className="absolute bottom-1/4 left-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-purple-200 via-violet-400 to-indigo-600 blur-3xl"
        />

        {/* Animated lines */}
        <motion.div
          initial={{ width: "0%", opacity: 0 }}
          animate={{ width: "60%", opacity: 0.5 }}
          transition={{ 
            duration: 2, 
            ease: "easeInOut",
            delay: 0.8
          }}
          className="absolute top-1/3 left-0 h-px bg-primary/60"
        />
        
        <motion.div
          initial={{ width: "0%", opacity: 0 }}
          animate={{ width: "40%", opacity: 0.3 }}
          transition={{ 
            duration: 2, 
            ease: "easeInOut",
            delay: 1.2
          }}
          className="absolute bottom-1/3 right-0 h-px bg-primary/60"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-border bg-background/50 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium">Personalized Coaching</span>
          </motion.div>

          <motion.h1
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-violet-400 to-indigo-600"
          >
            Every Level
          </motion.h1>

          <motion.p
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-xl text-muted-foreground max-w-[800px]"
          >
            Transform your potential with personalized coaching that adapts to your unique journey. Elevate your skills, mindset, and results.
          </motion.p>

          <motion.div 
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <Button
              variant="default"
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white"
              asChild
            >
              <Link href="#pricing">Get Started</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2"
              asChild
            >
              <Link href="#learn-more">Learn More</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Animated floating elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 - 50, 
              y: Math.random() * 100 - 50,
              opacity: 0,
              scale: 0.5
            }}
            animate={{ 
              x: Math.random() * 100 - 50, 
              y: Math.random() * 100 - 50,
              opacity: [0.2, 0.5, 0.2],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 0.5
            }}
            className="absolute w-2 h-2 rounded-full bg-primary/60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </section>
  )
} 