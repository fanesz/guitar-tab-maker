import { useState, useEffect, RefObject } from "react";

export function useIsChildFocused<T extends HTMLElement>(containerRef: RefObject<T>, selector: string) {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const checkFocus = () => {
      const active = document.activeElement;
      if (!containerRef.current) return setIsFocused(false);

      const matches = Array.from(containerRef.current.querySelectorAll(selector));
      const isMatch = matches.some((el) => el.contains(active));

      const containerMatch = containerRef.current.matches(selector) && containerRef.current === active;

      setIsFocused(isMatch || containerMatch);
    };

    document.addEventListener("focusin", checkFocus);
    document.addEventListener("focusout", checkFocus);

    return () => {
      document.removeEventListener("focusin", checkFocus);
      document.removeEventListener("focusout", checkFocus);
    };
  }, [containerRef, selector]);

  return isFocused;
}
