import { useEffect, useState } from "react";
import useWindowSize from "@hooks/useWindowSize";

const Debugger = () => {
  const [currentSize, setCurrentSize] = useState("xs");

  const { xs, sm, md, lg, xl, xxl, xxxl } = useWindowSize();

  useEffect(() => {
    if (xxxl) {
      setCurrentSize("xxxl");
    } else if (xxl) {
      setCurrentSize("xxl");
    } else if (xl) {
      setCurrentSize("xl");
    } else if (lg) {
      setCurrentSize("lg");
    } else if (md) {
      setCurrentSize("md");
    } else if (sm) {
      setCurrentSize("sm");
    } else if (xs) {
      setCurrentSize("xs");
    }
  }, [xs, sm, md, lg, xl, xxl, xxxl]);

  return (
    <div className="absolute max-w-[5vw] w-fit h-[2.5vh] bottom-0 right-0 px-[0.5vw] text-[0.7vw] bg-white">
      Screen: {currentSize}
    </div>
  );
};

export default Debugger;
