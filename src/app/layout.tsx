import type { Metadata } from 'next';
import './globals.css';
import SidebarNav from '@/components/shell/SidebarNav';
import TopCommandBar from '@/components/shell/TopCommandBar';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'CareerOS — Personal Career Operating System',
  description: 'AI-driven career operating system for telemetry, opportunity intelligence, resume tailoring, and interview simulation.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-surface text-on-surface antialiased">
        <AuthProvider>
          {/* Left Persistent Navigation Rail (240px) */}
          <SidebarNav />

          {/* Top Command Bar & Utility Header (56px) */}
          <TopCommandBar />

          {/* Main Content Area */}
          <div className="pl-60 pt-14 min-h-screen bg-[#f8f9ff]">
            <main className="max-w-7xl mx-auto p-6 lg:p-8">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
