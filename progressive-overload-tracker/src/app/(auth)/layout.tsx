import { AuthLayout } from '@/components/ui/auth-layout';
import { Toaster } from 'react-hot-toast';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthLayout requireAuth>
      <div className="flex min-h-screen">
        <nav className="w-64 bg-white border-r border-gray-200 p-4">
          {/* Add navigation items here */}
        </nav>
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
      <Toaster />
    </AuthLayout>
  );
} 