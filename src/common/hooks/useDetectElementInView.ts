import { useEffect } from "react";
import { Direction } from "@commonTypes/editor";

interface Props {
  containerRef: React.RefObject<HTMLElement>;
  selector: string;
  onOutOfView: (direction: Direction[], element: Element) => void;
}

export default function useDetectElementInView(props: Props) {
  const { containerRef, selector, onOutOfView } = props;

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const el = container.querySelector(selector);
    if (!el) return;

    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    const directions = [] as Direction[];

    if (elRect.top < containerRect.top) {
      directions.push("top");
    }
    if (elRect.bottom > containerRect.bottom) {
      directions.push("bottom");
    }
    if (elRect.left < containerRect.left) {
      directions.push("left");
    }
    if (elRect.right > containerRect.right) {
      directions.push("right");
    }

    if (directions.length > 0) {
      onOutOfView?.(directions, el);
    }
  }, [containerRef, selector, onOutOfView]);
}
