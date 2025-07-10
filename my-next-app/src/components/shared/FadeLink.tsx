// components/FadeLink.tsx
"use client";

import Link from "next/link";
import { usePageTransition } from "@/context/PageTransitionContext";
import { useRouter } from "next/navigation";

type FadeLinkProps = {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function FadeLink({ href, children, className }: FadeLinkProps) {
  const { navigateWithTransition } = usePageTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateWithTransition(href);
  };

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      scroll={false} // optional, keeps scroll position
    >
      {children}
    </Link>
  );
}
