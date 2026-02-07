import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}
      {...props}
    >
      {children}
    </div>
  );
}
