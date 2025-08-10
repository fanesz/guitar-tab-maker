import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";
import useSection from "@hooks/useSection";

interface Props {
  id: string;
  children: React.ReactNode;
  className?: string;
  isCentered?: boolean;
  primaryColor?: "white" | "black";
}

const Section = (props: Props) => {
  const { id, children, className, isCentered = true, primaryColor = "white" } = props;

  const { onSectionChange } = useSection();
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const sectionRef = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (inView) {
      onSectionChange(id);
      timeoutRef.current = setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 2000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [inView]);

  return (
    <section
      id={id}
      ref={(node) => {
        ref(node);
        sectionRef.current = node;
      }}
      className={clsx(
        "w-full h-screen snap-start",
        isCentered && "flex justify-center items-center",
        primaryColor === "white" ? "bg-white text-black" : "bg-black text-white",
        className
      )}
    >
      {children}
    </section>
  );
};

export default Section;
