"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { lockScroll, unlockScroll, forceUnlockScroll } from "@/lib/scroll-lock";

type FullPageLoadingContextType = {
  isActive: boolean;
  setActive: (v: boolean) => void;
};

const FullPageLoadingContext = createContext<FullPageLoadingContextType | null>(null);

export function FullPageLoadingProvider({ children }: { children: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return () => {
      forceUnlockScroll();
    };
  }, [isActive]);

  return (
    <FullPageLoadingContext.Provider value={{ isActive, setActive: setIsActive }}>
      {children}
    </FullPageLoadingContext.Provider>
  );
}

export function useFullPageLoading() {
  const ctx = useContext(FullPageLoadingContext);
  if (!ctx) return { isActive: false, setActive: () => { } };
  return ctx;
}
