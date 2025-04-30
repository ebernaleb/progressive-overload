import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Spinner } from './spinner';

interface AuthLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function AuthLayout({ children, requireAuth = false }: AuthLayoutProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (requireAuth && !user) {
        // Redirect to login if authentication is required but user is not logged in
        router.push('/login');
      } else if (!requireAuth && user) {
        // Redirect to dashboard if user is already logged in and tries to access auth pages
        router.push('/dashboard');
      }
    }
  }, [user, isLoading, requireAuth, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  // Only render children if:
  // 1. Auth is required and user is logged in
  // 2. Auth is not required and user is not logged in
  if ((requireAuth && user) || (!requireAuth && !user)) {
    return <>{children}</>;
  }

  // Return null while redirecting
  return null;
} 