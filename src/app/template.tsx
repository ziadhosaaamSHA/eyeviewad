'use client';
import { useEffect } from 'react';
import { animatePageIn } from '@/lib/animations';

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    animatePageIn();
  }, []);

  return <>{children}</>;
}
