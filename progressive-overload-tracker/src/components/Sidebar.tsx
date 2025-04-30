'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-provider';
import { LogIn, LogOut, User, X } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const hamburger = document.getElementById('hamburger-button');
      
      if (sidebar && hamburger && 
          !sidebar.contains(event.target as Node) && 
          !hamburger.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close sidebar when navigating to a new page
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await signOut();
    setIsOpen(false);
  };

  const handleNavigation = (path: string) => {
    if (path === '/dashboard') {
      if (user) {
        // If user is already logged in, go directly to dashboard
        router.push('/dashboard');
      } else {
        // If not logged in, store the intended destination and redirect to login
        sessionStorage.setItem('redirectAfterLogin', path);
        router.push('/login');
      }
    } else {
      router.push(path);
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button 
        id="hamburger-button"
        className="fixed top-4 left-4 z-50 flex flex-col justify-center items-center w-10 h-10 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
        <span className={`block w-5 h-0.5 bg-current my-1 transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
      </button>

      {/* Overlay */}
      <div 
        className={`fixed inset-0 backdrop-blur-[2px] bg-black/5 z-40 transition-all duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <div 
        id="sidebar"
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <h2 className="text-xl font-bold text-blue-600 mb-6">Progressive Overload</h2>
          
          {/* User status section */}
          <div className="mb-6 p-4 rounded-lg bg-gray-50">
            {loading ? (
              <div className="flex items-center text-gray-500">
                <div className="w-3 h-3 mr-2 rounded-full border-2 border-gray-300 border-t-blue-500 animate-spin"></div>
                Loading...
              </div>
            ) : user ? (
              <div>
                <div className="flex items-center mb-2">
                  <User size={18} className="mr-2 text-blue-600" />
                  <span className="font-medium text-gray-900 truncate">{user.email}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm text-green-600">Logged in</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center text-gray-500">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm">Not logged in</span>
              </div>
            )}
          </div>
          
          <nav className="space-y-4">
            <button onClick={() => handleNavigation('/')} className="block w-full text-left py-2 px-4 rounded-lg hover:bg-blue-50 text-gray-800 hover:text-blue-600 transition-colors">
              Home
            </button>
            <button onClick={() => handleNavigation('/dashboard')} className="block w-full text-left py-2 px-4 rounded-lg hover:bg-blue-50 text-gray-800 hover:text-blue-600 transition-colors">
              Dashboard
            </button>
            <button onClick={() => handleNavigation('/coaching')} className="block w-full text-left py-2 px-4 rounded-lg hover:bg-blue-50 text-gray-800 hover:text-blue-600 transition-colors">
              Coaching
            </button>
          </nav>
          
          {/* Auth buttons at bottom */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            {user ? (
              <button 
                onClick={handleLogout}
                className="flex w-full items-center justify-center py-2 px-4 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </button>
            ) : (
              <button 
                onClick={() => handleNavigation('/login')}
                className="flex w-full items-center justify-center py-2 px-4 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <LogIn size={18} className="mr-2" />
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 