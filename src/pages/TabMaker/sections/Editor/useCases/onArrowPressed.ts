import { ArrowKeys, WhitespaceKeys } from "@consts/keyboardKeys";
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

// on any arrow key pressed with ctrl
// will move the selected note per bar by return updated state
export const moveSelectedNoteByCtrl = (
  keys: string,
  tabStaves: TabStave[],
  selectedNote: SelectedNote
): Partial<SelectedNote> => {
  const { stave, line, note } = selectedNote;
  const maxLineIdx = tabStaves[stave].value.length - 1;
  const currentStaveValue = tabStaves[stave].value;
  const currentStaveLine = currentStaveValue[line];

  const isEndOfLine = note === currentStaveLine.length - 1;
  const isEndOfStave = stave === tabStaves.length - 1;

  switch (keys) {
    case ArrowKeys.Right:
    case WhitespaceKeys.Tab:
      if (isEndOfLine) break;

      for (let i = note; i < currentStaveLine.length; i++) {
        if (currentStaveLine[i] !== "|") {
          if (i < currentStaveLine.length - 1) continue;
          return { note: i };
        }
        if (i > note + 1) {
          return { note: i - 1 };
        } else if (i === note + 1) {
          return { note: i + 1 };
        }
      }

      return {};

    case ArrowKeys.Left:
      if (note === 0) break;

      for (let i = note - 1; i >= 0; i--) {
        if (currentStaveLine[i] !== "|") {
          if (i > 0) continue;
          return { note: 0 };
        }
        if (i < note - 1) {
          return { note: i + 1 };
        } else if (i === note - 1) {
          return { note: i - 1 };
        }
      }

      return {};
    case ArrowKeys.Up:
      if (stave === 0 && line === 0) break;

      if (line > 0) {
        return { line: 0 };
      }

      if (tabStaves[stave - 1].value[line].length <= note) {
        return {
          stave: stave - 1,
          line: maxLineIdx,
          note: tabStaves[stave - 1].value[line].length - 1,
        };
      }

      return { stave: stave - 1, line: maxLineIdx };
    case ArrowKeys.Down:
      if (isEndOfStave && line === maxLineIdx) break;

      if (line < maxLineIdx) {
        return { line: maxLineIdx };
      }

      if (tabStaves[stave + 1].value[0].length <= note) {
        return {
          stave: stave + 1,
          line: 0,
          note: tabStaves[stave + 1].value[line].length - 1,
        };
      }

      return { stave: stave + 1, line: 0 };
  }

  return {};
};
