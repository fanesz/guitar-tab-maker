import { NavigationKeys } from "@consts/keyboardKeys";
import { SelectedNote } from "@contexts/coreEditor/type";
import { TabStave } from "@contexts/tabStave/type";

// on navigation key pressed
// will move the selected note by return updated state
export const moveSelectedNoteByNavKey = (
  keys: string,
  tabStaves: TabStave[],
  selectedNote: SelectedNote
): Partial<SelectedNote> => {
  const { stave, line, note } = selectedNote;
  const currentStave = tabStaves[stave];
  const currentLineNote = currentStave.value[line];

  switch (keys) {
    case NavigationKeys.Home:
      if (note > 0) {
        return { note: 0 };
      }
      break;
    case NavigationKeys.End:
      if (note < currentLineNote.length - 1) {
        return { note: currentLineNote.length - 1 };
      }
      break;
    case NavigationKeys.PageUp:
      if (stave > 0) {
        const newStaveValue = tabStaves[stave - 1].value;
        if (newStaveValue[line].length <= note) {
          return {
            stave: stave - 1,
            note: newStaveValue[line].length - 1,
          };
        }
        return { stave: stave - 1 };
      }
      break;
    case NavigationKeys.PageDown:
      if (stave < tabStaves.length - 1) {
        const newStaveValue = tabStaves[stave + 1].value;
        if (newStaveValue[line].length <= note) {
          return {
            stave: stave + 1,
            note: newStaveValue[line].length - 1,
          };
        }
        return { stave: stave + 1 };
      }
      break;
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
  const { stave, line, note } = selectedNote;

  const currentStave = tabStaves[stave];
  const currentLineNote = currentStave.value[line];

  switch (keys) {
    case NavigationKeys.Home:
      if (note > 0 || stave > 0 || line > 0) {
        return { stave: 0, line: 0, note: 0 };
      }
      break;
    case NavigationKeys.End:
      if (note < currentLineNote.length - 1 || stave < tabStaves.length - 1 || line < currentLineNote.length - 1) {
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
