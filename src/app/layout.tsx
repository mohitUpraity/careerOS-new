import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import AppShell from '@/components/shell/AppShell';

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
      <body className="antialiased">
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
