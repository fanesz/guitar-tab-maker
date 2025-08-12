import { DeletionKeys } from "@consts/keyboardKeys";
import { SelectedNote } from "@contexts/coreEditor/type";
import { TabStave } from "@contexts/tabStave/type";

// on backspace or del pressed
// will clear a note or a bar from the current stave
export const clearNoteAndBar = (keys: string, currentStave: TabStave, selectedNote: SelectedNote): TabStave => {
  const { line, note } = selectedNote;
  let updatedValue: TabStave["value"];

  switch (keys) {
    case DeletionKeys.Backspace:
      updatedValue = currentStave.value.map((lineArr, lineIdx) => {
        if (lineIdx === line) {
          return lineArr.map((n, noteIdx) => {
            if (noteIdx === note) return "-";
            return n;
          });
        }
        return [...lineArr];
      });
      break;

    case DeletionKeys.Delete:
      updatedValue = currentStave.value.map((lineArr) => {
        return lineArr.map((n, noteIdx) => {
          if (noteIdx === note) return "-";
          return n;
        });
      });
      break;

    default:
      updatedValue = currentStave.value;
  }

  return { ...currentStave, value: updatedValue };
};

// on backspace or del pressed at the end of the stave
// will shift the bar by one
export const shiftStaveBar = (currentStave: TabStave): TabStave => {
  const updatedValue = [...currentStave.value];

  updatedValue.map((lineArr) => lineArr.pop());

  return { ...currentStave, value: updatedValue };
};
