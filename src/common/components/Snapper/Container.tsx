import { useEffect, useRef } from "react";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container = (props: Props) => {
  const { children, className } = props;

  const mainRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <main ref={mainRef} className={clsx("h-screen overflow-y-auto snap-y snap-mandatory", className)}>
      {children}
    </main>
  );
};

export default Container;
