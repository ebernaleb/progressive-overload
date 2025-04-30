import { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/context/auth-provider';
import Sidebar from '@/components/Sidebar';
import { Toaster } from '@/components/ui/custom-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Progressive Overload Tracker',
  description: 'Track your workouts and progress with Progressive Overload Tracker',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Sidebar />
          <main className="min-h-screen bg-gray-50">
          {children}
          </main>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
