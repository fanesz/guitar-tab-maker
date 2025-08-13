import { SelectedNote } from "@contexts/coreEditor/type";
import { TabStave } from "@contexts/tabStave/type";

// on | key pressed
// will write a bar line to current focussed note
export const writeBarLine = (currentStave: TabStave, selectedNote: SelectedNote): TabStave => {
  return {
    ...currentStave,
    value: currentStave.value.map((lineArr) => {
      return lineArr.map((n, noteIdx) => {
        if (noteIdx === selectedNote.note) return "|";
        return n;
      });
    }),
  };
};
