import { SelectedNote } from "@contexts/coreEditor/type";
import { TabStave } from "@contexts/tabStave/type";

// on backspace pressed
// will delete a note from the current stave
export const deleteNote = (currentStave: TabStave, selectedNote: SelectedNote): TabStave => {
  const { line, note } = selectedNote;

  const updatedValue = currentStave.value.map((lineArr, lineIdx) => {
    if (lineIdx !== line) return [...lineArr];

    return lineArr.map((n, noteIdx) => {
      if (noteIdx !== note) return n;
      return "-";
    });
  });

  return { ...currentStave, value: updatedValue };
};

// on del pressed
// will delete a bar from the current stave
export const deleteBar = (currentStave: TabStave, selectedNote: SelectedNote): TabStave => {
  const { note } = selectedNote;

  const updatedValue = currentStave.value.map((lineArr) => {
    return lineArr.map((n, noteIdx) => {
      if (noteIdx !== note) return n;
      return "-";
    });
  });

  return { ...currentStave, value: updatedValue };
};
