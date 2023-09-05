import './globals.css';
import type { Metadata } from 'next';

import NavBar from '@components/navbar';

export const metadata: Metadata = {
  title: 'SyntaxSaga',
  description: 'An assessment application',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <main>
          <NavBar />
          <section>{children}</section>
        </main>
      </body>
    </html>
  );
}
