import { useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import useDarkMode from "@hooks/useDarkMode";
import { IoMoon, IoSunny } from "react-icons/io5";
import { sizes } from "./style";

interface DarkModeToggleProps {
  value?: boolean;
  onChange?: () => void;
  size?: "sm" | "md" | "lg";
}

function DarkModeToggleButton(props: DarkModeToggleProps) {
  const { theme, toggleTheme } = useDarkMode();
  const { value = theme === "dark", onChange = toggleTheme, size = "sm" } = props;
  const [focused, setFocused] = useState(false);

  const currentSize = sizes[size] || sizes.md;
  const translatePx = currentSize.containerWidth - currentSize.knobSize - currentSize.padding * 2;

  const knobLeft = currentSize.padding;
  const knobTop = (currentSize.containerHeight - currentSize.knobSize) / 2;

  return (
    <button
      onClick={onChange}
      aria-label="Toggle dark mode"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className={clsx(
        "relative inline-flex items-center justify-center rounded-full transition-all duration-500 ease-in-out transform active:scale-95 focus:outline-none shadow-lg hover:shadow-xl",
        currentSize.width,
        currentSize.height,
        value ? "bg-gradient-to-r from-purple-600 to-indigo-600" : "bg-gradient-to-r from-amber-400 to-orange-500"
      )}
    >
      {/* Smooth fade focus ring */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{ opacity: focused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          boxShadow: `0 0 0 2px ${value ? "rgba(192,132,252,0.5)" : "rgba(252,211,77,0.5)"}`,
        }}
      />

      {/* Background Glow */}
      <div
        className={clsx(
          "absolute inset-0 rounded-full blur-md opacity-60 transition-all duration-500",
          value ? "bg-gradient-to-r from-purple-600 to-indigo-600" : "bg-gradient-to-r from-amber-400 to-orange-500"
        )}
      />

      {/* Knob */}
      <motion.div
        className={clsx(
          "absolute rounded-full shadow-lg flex items-center justify-center bg-white",
          currentSize.circle
        )}
        style={{ left: knobLeft, top: knobTop }}
        animate={{ x: value ? translatePx : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {/* Moon */}
        <motion.div
          animate={{ rotate: value ? 0 : 180, opacity: value ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center"
        >
          <IoMoon size={currentSize.icon} className="text-purple-600" />
        </motion.div>

        {/* Sun */}
        <motion.div
          animate={{ rotate: value ? 180 : 0, opacity: value ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center absolute"
        >
          <IoSunny size={currentSize.icon} className="text-orange-500" />
        </motion.div>
      </motion.div>

      {/* Moon sparks */}
      {value && (
        <>
          <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full animate-pulse" />
          <div className="absolute top-3 left-4 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-300" />
          <div className="absolute bottom-2 left-3 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-700" />
        </>
      )}

      {/* Sun rays */}
      {!value && (
        <>
          <div className="absolute top-0 left-1/2 w-0.5 h-1 bg-white rounded-full transform -translate-x-1/2 animate-pulse" />
          <div className="absolute bottom-0 left-1/2 w-0.5 h-1 bg-white rounded-full transform -translate-x-1/2 animate-pulse delay-200" />
          <div className="absolute top-1/2 left-0 w-1 h-0.5 bg-white rounded-full transform -translate-y-1/2 animate-pulse delay-400" />
          <div className="absolute top-1/2 right-0 w-1 h-0.5 bg-white rounded-full transform -translate-y-1/2 animate-pulse delay-600" />
        </>
      )}
    </button>
  );
}

export default DarkModeToggleButton;
