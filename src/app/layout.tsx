import type {Metadata} from 'next';
import { Inter } from 'next/font/google'; // Changed to Inter as Geist caused issues, common practice
import './globals.css';
import { cn } from "@/lib/utils";

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans', // Use standard variable name
});

export const metadata: Metadata = {
  title: 'AgentChat Chrome',
  description: 'AI Agent Chat Chrome Extension',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <main className="flex items-center justify-center min-h-screen p-4"> {/* Added main tag and centering */}
          {children}
        </main>
      </body>
    </html>
  );
}
