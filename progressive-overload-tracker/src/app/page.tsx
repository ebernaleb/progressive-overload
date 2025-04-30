'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-provider';
import { useState, useEffect } from 'react';
import { GlassmorphicBackground } from '@/components/ui/hero-glassmorphic';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleGetStarted = () => {
    if (isClient) {
      if (user) {
        // If user is logged in, go to dashboard
        router.push('/dashboard');
      } else {
        // Store the intended destination
        sessionStorage.setItem('redirectAfterLogin', '/dashboard');
        // If user is not logged in, go to login page
        router.push('/login');
      }
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <GlassmorphicBackground />
      
      {/* Header is now handled by the Sidebar component in layout.tsx */}
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500 filter blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-indigo-600 filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-purple-600 filter blur-3xl"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Track Your <span className="text-blue-300">Strength Progress</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl md:text-2xl text-blue-100 mb-10">
            Log your workouts and visualize your growth over time with our intuitive tracking tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium rounded-full bg-white text-blue-800 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white shadow-lg transform transition-transform hover:scale-105"
            >
              Get Started
            </button>
            <Link
              href="/coaching"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium rounded-full bg-transparent text-white border-2 border-white/30 backdrop-blur-sm hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white transform transition-transform hover:scale-105"
            >
              Explore Coaching
            </Link>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold tracking-wide text-blue-600 uppercase">Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything you need to reach your goals
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Our platform is designed to help you track, analyze, and improve your fitness journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="relative group h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative p-8 bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
                <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Track Workouts</h3>
                <p className="text-gray-600 flex-grow">
                  Log your exercises, weights, reps, and sets to keep a detailed training history. Never lose track of your progress again.
                </p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="relative group h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative p-8 bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
                <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">View Progress</h3>
                <p className="text-gray-600 flex-grow">
                  Visualize your strength gains over time with interactive charts and graphs. See your growth in real-time.
                </p>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="relative group h-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative p-8 bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
                <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Stay Motivated</h3>
                <p className="text-gray-600 flex-grow">
                  See your improvements and stay motivated to keep pushing for new personal records. Celebrate your achievements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonial/CTA Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 rounded-3xl overflow-hidden shadow-xl">
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:p-20">
              <div className="lg:w-0 lg:flex-1">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Ready to start your fitness journey?
                </h2>
                <p className="mt-4 max-w-3xl text-lg text-blue-100">
                  Join thousands of users who are already tracking their progress and achieving their fitness goals.
                </p>
              </div>
              <div className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
                <div className="sm:flex">
                  <div className="mt-4 sm:mt-0 sm:ml-3">
                    <Link
                      href="/register"
                      className="block w-full rounded-lg px-5 py-3 bg-white text-blue-800 font-medium text-center hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800 shadow-lg transform transition-transform hover:scale-105"
                    >
                      Create Free Account
                    </Link>
                  </div>
                </div>
                <p className="mt-3 text-sm text-blue-200 text-center sm:text-left">
                  No credit card required. Start for free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start">
              <h3 className="text-xl font-bold text-blue-600">Progressive Overload Tracker</h3>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-center text-base text-gray-500">
                &copy; {new Date().getFullYear()} Progressive Overload Tracker. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
