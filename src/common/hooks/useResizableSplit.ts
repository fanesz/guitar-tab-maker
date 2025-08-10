import { useState, useRef, useEffect } from "react";

export default function useResizableSplit(initialLeft = 50, minLeft = 20, maxLeft = 80, offsetLeft = 0) {
  const [leftPercent, setLeftPercent] = useState(initialLeft);
  const isResizing = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    document.body.style.userSelect = "none";
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    const containerWidth = window.innerWidth - offsetLeft;
    let newWidth = ((e.clientX - offsetLeft) / containerWidth) * 100;
    if (newWidth < minLeft) newWidth = minLeft;
    if (newWidth > maxLeft) newWidth = maxLeft;
    setLeftPercent(newWidth);
  };

  const handleMouseUp = () => {
    if (isResizing.current) {
      isResizing.current = false;
      document.body.style.userSelect = "";
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return { leftPercent, rightPercent: 100 - leftPercent, handleMouseDown };
}
