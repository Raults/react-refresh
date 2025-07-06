"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

type PageTransitionContextType = {
  isTransitioning: boolean;
  navigateWithTransition: (href: string) => void;
};

const PageTransitionContext = createContext<PageTransitionContextType | null>(null);

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigateWithTransition = (href: string) => {
    if (href === pathname) return; // don't animate if same route
    setIsTransitioning(true);
    setTimeout(() => {
      router.push(href);
    }, 600); // match fade duration
  };

  // This effect runs on every route change (via pathname)
  useEffect(() => {
    if (isTransitioning) {
      // Wait until next paint to ensure fade in starts smoothly
      requestAnimationFrame(() => {
        setIsTransitioning(false);
      });
    }
  }, [pathname]);

  return (
    <PageTransitionContext.Provider value={{ isTransitioning, navigateWithTransition }}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export function usePageTransition(): PageTransitionContextType {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within a PageTransitionProvider");
  }
  return context;
}
