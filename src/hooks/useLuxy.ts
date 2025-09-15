"use client";

import { useEffect } from "react";

// Define a minimal Luxy interface
interface Luxy {
  init?: (options?: {
    wrapper?: string;
    targets?: string;
    wrapperSpeed?: number;
  }) => void;
  destroy?: () => void;
  scrollTo?: (y: number) => void;
}

export default function useLuxy() {
  useEffect(() => {
    let luxyInstance: Luxy | null = null;

    (async () => {
      if (typeof window !== "undefined") {
        const luxyModule = (await import("luxy.js")).default as Luxy;
        luxyModule.init?.({
          wrapper: "#luxy",
          targets: ".luxy-el",
          wrapperSpeed: 0.08,
        });
        luxyInstance = luxyModule;
        // Attach to window so you can use it in index.tsx
        (window as typeof window & { luxy?: Luxy }).luxy = luxyModule;
      }
    })();

    return () => {
      luxyInstance?.destroy?.();
    };
  }, []);
}
