export type ScrollDirection = "x" | "y" | "both";
export type ScrollPosition = "start" | "center" | "end";

export const scrollComponent = (
  ref: React.RefObject<HTMLElement>,
  direction: ScrollDirection = "x",
  position: ScrollPosition = "end"
) => {
  const el = ref.current;
  if (!el) return;

  let left = el.scrollLeft;
  let top = el.scrollTop;

  if (direction === "x" || direction === "both") {
    left = position === "end" ? el.scrollWidth : 0;
  }
  if (direction === "y" || direction === "both") {
    top = position === "end" ? el.scrollHeight : 0;
  }

  el.scrollTo({ left, top, behavior: "smooth" });
};
