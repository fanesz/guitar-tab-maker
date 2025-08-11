export type ScrollDirection = "x" | "y";
export type ScrollPosition = "start" | "center" | "end";

export const scrollComponent = (
  ref: React.RefObject<HTMLElement>,
  direction: ScrollDirection = "x",
  position: ScrollPosition = "end"
) => {
  const el = ref.current;
  if (!el) return;

  if (direction === "x") {
    if (position === "end") {
      el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    } else if (position === "start") {
      el.scrollTo({ left: 0, behavior: "smooth" });
    }
  } else if (direction === "y") {
    if (position === "end") {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    } else if (position === "start") {
      el.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
};
