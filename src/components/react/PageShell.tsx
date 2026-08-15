import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import type { ReactNode } from 'react';
import Footer from '@/components/react/Footer';
import Header from '@/components/react/Header';
import { ToastProvider } from '@/components/react/ToastProvider';

interface PageShellProps {
  children: ReactNode;
}

const PageShell = ({ children }: PageShellProps) => {
  return (
    <ToastProvider>
      <SpeedInsights />
      <Analytics />
      <Header />
      {children}
      <Footer />
    </ToastProvider>
  );
};

export default PageShell;
