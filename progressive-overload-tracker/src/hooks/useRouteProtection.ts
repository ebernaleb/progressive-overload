import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-provider';

export function useRouteProtection(isProtected: boolean = false) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Don't do anything while loading
    if (loading) return;

    if (isProtected && !user) {
      // Store the current path for redirect after login
      sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
      router.push('/login');
    }
  }, [user, loading, isProtected, router]);

  // Return loading state so components can show loading indicator
  return { loading, isAuthenticated: !!user };
} 