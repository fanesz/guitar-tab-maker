import React, { useLayoutEffect, useRef, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

interface Props {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
}

const AutoResizeTextarea = (props: Props) => {
  const { value, onChange, className = "" } = props;
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "0px";
    const newHeight = el.scrollHeight;
    setHeight(newHeight);
  }, [value]);

  const base =
    "w-full resize-none overflow-hidden pb-1 text-base leading-6 shadow-sm focus:outline-none focus:ring-0 h-[2.5rem] whitespace-nowrap overflow-x-hidden";

  return (
    <motion.textarea
      ref={ref}
      value={value}
      onChange={onChange}
      className={clsx(base, className)}
      style={{ height }}
      animate={{ height }}
      transition={{ type: "spring", stiffness: 300, damping: 50, mass: 0.3 }}
    />
  );
};

export default AutoResizeTextarea;
