import { ArrowKeys } from "@consts/keyboardKeys";
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
export const moveSelectedNote = (
  keys: string,
  tabStaves: TabStave[],
  selectedNote: SelectedNote
): Partial<SelectedNote> => {
  const { stave, line, note } = selectedNote;
  const maxLineIdx = tabStaves[stave].value.length - 1;

  switch (keys) {
    case ArrowKeys.Right:
      return { note: note + 1 };
    case ArrowKeys.Left:
      return { note: Math.max(0, note - 1) };
    case ArrowKeys.Up:
      if (line === 0 && stave > 0) {
        const targetStaveValue = tabStaves[stave - 1].value;
        const targetStaveLine = targetStaveValue[line].length - 1;
        return { stave: stave - 1, line: maxLineIdx, note: Math.min(targetStaveLine, note) };
      }
      return { line: Math.max(0, line - 1) };
    case ArrowKeys.Down:
      if (line === maxLineIdx && stave < tabStaves.length - 1) {
        const targetStaveValue = tabStaves[stave + 1].value;
        const targetStaveLine = targetStaveValue[0].length - 1;
        return { stave: stave + 1, line: 0, note: Math.min(targetStaveLine, note) };
      }
      return { line: Math.min(maxLineIdx, line + 1) };
    default:
      return {};
  }
};
