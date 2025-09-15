"use client";

import { useEffect } from "react";

export default function useLuxy() {
  useEffect(() => {
    let luxyInstance: any;

    (async () => {
      if (typeof window !== "undefined") {
        const luxy = (await import("luxy.js")).default;
        luxy.init({
          wrapper: "#luxy",
          targets: ".luxy-el",
          wrapperSpeed: 0.08,
        });
        luxyInstance = luxy;
      }
    })();

    return () => {
      if (luxyInstance) {
        luxyInstance.destroy();
      }
    };
  }, []);
}
