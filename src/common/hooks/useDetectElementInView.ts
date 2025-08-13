import { useEffect } from "react";
import { Direction } from "@commonTypes/editor";

interface Props {
  containerRef: React.RefObject<HTMLElement>;
  selector: string;
  onOutOfView: (direction: Direction, element: Element) => void;
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

    let direction = "" as Direction;

    if (elRect.top < containerRect.top) {
      direction = "top";
    } else if (elRect.bottom > containerRect.bottom) {
      direction = "bottom";
    } else if (elRect.left < containerRect.left) {
      direction = "left";
    } else if (elRect.right > containerRect.right) {
      direction = "right";
    }

    if (direction) {
      onOutOfView?.(direction, el);
    }
  }, [containerRef, selector, onOutOfView]);
}
