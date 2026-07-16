import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const ContainerBox = ({ children }: LayoutProps) => {
  return (
    <div className="stone-slab p-4 md:p-8 w-full max-w-container-max mx-auto rounded-none">
      {children}
    </div>
  );
};

export default ContainerBox;
