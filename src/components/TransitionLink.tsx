'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { animatePageOut } from '@/lib/animations';

interface TransitionLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function TransitionLink({ href, className, children }: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.location.pathname !== href) {
        animatePageOut(href, router);
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
