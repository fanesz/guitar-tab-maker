import { useState, useEffect } from "react";

interface HookReturn {
  windowWidth: number;
  windowHeight: number;
  underXs: boolean;
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  xxl: boolean;
  xxxl: boolean;
  isMobile: boolean;
}
const useWindowSize = (): HookReturn => {
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const windowWidth = windowSize[0];
  const windowHeight = windowSize[1];

  const isMobile = windowWidth < 640;

  return {
    windowWidth,
    windowHeight,
    underXs: windowWidth < 320,
    xs: windowWidth >= 450,
    sm: windowWidth >= 640,
    md: windowWidth >= 768,
    lg: windowWidth >= 1024,
    xl: windowWidth >= 1280,
    xxl: windowWidth >= 1536,
    xxxl: windowWidth >= 1792,
    isMobile,
  };
};

export default useWindowSize;
