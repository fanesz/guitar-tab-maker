import { SelectedNote } from "@contexts/coreEditor/type";
import { TabStave } from "@contexts/tabStave/type";
import { ScrollDirection, ScrollPosition } from "@utils/componentRef";

// on navigation key pressed
// will move the selected note by return updated state
export const moveSelectedNoteByNavKey = (
  keys: string,
  tabStaves: TabStave[],
  selectedNote: SelectedNote
): [Partial<SelectedNote>, [ScrollDirection, ScrollPosition] | null] => {
  const currentStave = tabStaves[selectedNote.stave];
  const currentLineNote = currentStave.value[selectedNote.line];
  switch (keys) {
    case "Home":
      if (selectedNote.note > 0) {
        return [{ note: 0 }, ["x", "start"]];
      }
      break;
    case "End":
      if (selectedNote.note < currentLineNote.length - 1) {
        return [{ note: currentLineNote.length - 1 }, ["x", "end"]];
      }
      break;
    case "PageUp":
      if (selectedNote.stave > 0) {
        return [{ stave: selectedNote.stave - 1 }, null];
      }
      return [{}, ["y", "start"]];
    case "PageDown":
      if (selectedNote.stave < tabStaves.length - 1) {
        return [{ stave: selectedNote.stave + 1 }, null];
      }
      return [{}, ["y", "end"]];
  }

  return [{}, null];
};

// on ctrl + navigation key pressed
// will move the selected note by return updated state
export const moveSelectedNoteByCtrlNavKey = (
  keys: string,
  tabStaves: TabStave[],
  selectedNote: SelectedNote
): [Partial<SelectedNote>, [ScrollDirection, ScrollPosition] | null] => {
  const currentStave = tabStaves[selectedNote.stave];
  const currentLineNote = currentStave.value[selectedNote.line];
  switch (keys) {
    case "Home":
      if (selectedNote.note > 0) {
        return [{ stave: 0, line: 0, note: 0 }, ["both", "start"]];
      }
      break;
    case "End":
      if (selectedNote.note < currentLineNote.length - 1) {
        const lastStave = tabStaves[tabStaves.length - 1].value;
        return [
          {
            stave: tabStaves.length - 1,
            line: lastStave.length - 1,
            note: lastStave[lastStave.length - 1].length - 1,
          },
          ["both", "end"],
        ];
      }
      break;
  }

  return [{}, null];
};
