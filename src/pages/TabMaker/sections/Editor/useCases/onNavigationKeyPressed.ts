import { SelectedNote } from "@contexts/coreEditor/type";
import { TabStave } from "@contexts/tabStave/type";

// on navigation key pressed
// will move the selected note by return updated state
export const moveSelectedNoteByNavKey = (
  keys: string,
  tabStaves: TabStave[],
  selectedNote: SelectedNote
): Partial<SelectedNote> => {
  const currentStave = tabStaves[selectedNote.stave];
  const currentLineNote = currentStave.value[selectedNote.line];
  switch (keys) {
    case "Home":
      if (selectedNote.note > 0) {
        return { note: 0 };
      }
      break;
    case "End":
      if (selectedNote.note < currentLineNote.length - 1) {
        return { note: currentLineNote.length - 1 };
      }
      break;
    case "PageUp":
      if (selectedNote.stave > 0) {
        return { stave: selectedNote.stave - 1 };
      }
      return {};
    case "PageDown":
      if (selectedNote.stave < tabStaves.length - 1) {
        return { stave: selectedNote.stave + 1 };
      }
      return {};
  }

  return {};
};

// on ctrl + navigation key pressed
// will move the selected note by return updated state
export const moveSelectedNoteByCtrlNavKey = (
  keys: string,
  tabStaves: TabStave[],
  selectedNote: SelectedNote
): Partial<SelectedNote> => {
  const currentStave = tabStaves[selectedNote.stave];
  const currentLineNote = currentStave.value[selectedNote.line];
  switch (keys) {
    case "Home":
      if (selectedNote.note > 0) {
        return { stave: 0, line: 0, note: 0 };
      }
      break;
    case "End":
      if (selectedNote.note < currentLineNote.length - 1) {
        const lastStave = tabStaves[tabStaves.length - 1].value;
        return {
          stave: tabStaves.length - 1,
          line: lastStave.length - 1,
          note: lastStave[lastStave.length - 1].length - 1,
        };
      }
      break;
  }

  return {};
};
