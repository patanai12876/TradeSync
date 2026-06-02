'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const divRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Remove animation class
    if (divRef.current) {
      divRef.current.classList.remove('animate-slide-in-up');
    }

    // Re-trigger animation
    timeoutRef.current = setTimeout(() => {
      if (divRef.current) {
        divRef.current.classList.add('animate-slide-in-up');
      }
    }, 10);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pathname]);

  return (
    <div ref={divRef} className="animate-slide-in-up">
      {children}
    </div>
  );
}
