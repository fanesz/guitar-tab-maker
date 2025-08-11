import { SelectedNote } from "@contexts/coreEditor/type";
import { TabStave } from "@contexts/tabStave/type";

// on ArrowRight pressed at the end of the line
// will append a new blank note
export const appendBlankNote = (currentStave: TabStave): TabStave => {
  return {
    ...currentStave,
    value: currentStave.value.map((line) => [...line, "-"]),
  };
};

// on any arrow key pressed
// will move the selected note by return updated state
export const moveSelectedNote = (keys: string, selectedNote: SelectedNote): Partial<SelectedNote> => {
  const { line, note } = selectedNote;
  const maxLineIdx = 5;
  switch (keys) {
    case "ArrowRight":
      return { line, note: note + 1 };
    case "ArrowLeft":
      return { line, note: Math.max(0, note - 1) };
    case "ArrowUp":
      if (line === 0) {
        return { stave: selectedNote.stave - 1, line: 5, note };
      }
      return { line: Math.max(0, line - 1), note };
    case "ArrowDown":
      if (line === maxLineIdx) {
        return { stave: selectedNote.stave + 1, line: 0, note };
      }
      return { line: Math.min(maxLineIdx, line + 1), note };
    default:
      return {};
  }
};
