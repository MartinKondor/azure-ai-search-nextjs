import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Azure AI Search with Next.js',
  description: 'Azure AI Search with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <footer className="bg-secondary py-4 text-center text-sm text-muted-foreground bottom-0 w-full">
          <p>
            &copy; {new Date().getFullYear()} Made by{' '}
            <a
              href="https://martinkondor.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Martin Kondor
            </a>
            , an AI and full-stack developer
          </p>
        </footer>
      </body>
    </html>
  );
}
