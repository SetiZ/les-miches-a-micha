import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const ContainerBox = ({ children }: LayoutProps) => {
  return (
    <div
      className="w-full max-w-[1440px] p-4 rounded-2xl border border-white/30"
      style={{
        backdropFilter: 'blur(7px)',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
      }}
    >
      {children}
    </div>
  );
};

export default ContainerBox;
