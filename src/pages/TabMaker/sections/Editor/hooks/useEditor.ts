import { ArrowKeys, arrowKeys, navigationKeys, noteKeys } from "@consts/keyboardKeys";
import useCoreEditorStore from "@contexts/coreEditor/store";
import useTabStaveStore from "@contexts/tabStave/store";
import { TabStave } from "@contexts/tabStave/type";
import usePressedKeys from "@hooks/usePressedKeys";
import { scrollComponent } from "@utils/componentRef";
import { appendBlankNote, moveSelectedNote } from "../useCases/onArrowPressed";
import { moveSelectedNoteByNavKey } from "../useCases/onNavigationKeyPressed";
import { writeNote } from "../useCases/onNoteWordPressed";

interface UseEditorReturn {
  updateFocussedStave: (stave: TabStave) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
  handleNoteClick: (staveIdx: number, lineIdx: number, noteIdx: number) => void;
}
const useEditor = (): UseEditorReturn => {
  const { tabStaves, setTabStaves } = useTabStaveStore();
  const { editorRef, selectedNote, updateSelectedNote } = useCoreEditorStore();
  const { isOnlyPressed, isOnlyPressedKeys } = usePressedKeys();

  const currentStave = tabStaves[selectedNote.stave];

  const updateFocussedStave = (updatedStave: TabStave) => {
    setTabStaves(tabStaves.map((stave, idx) => (idx === selectedNote.stave ? updatedStave : stave)));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    // keys: →
    if (isOnlyPressed(e, ArrowKeys.Right)) {
      if (currentStave.value[selectedNote.line].length === selectedNote.note + 1) {
        const updatedValue = appendBlankNote(currentStave);
        updateFocussedStave(updatedValue);
        scrollComponent(editorRef, "x");
      }
    }

    // keys: 0-9, x
    if (isOnlyPressedKeys(e, noteKeys)) {
      e.preventDefault();
      const updatedStave = writeNote(currentStave, selectedNote, e.key);
      updateFocussedStave(updatedStave);
    }

    // keys: → ↑ ↓ ←
    if (isOnlyPressedKeys(e, arrowKeys)) {
      e.preventDefault();
      const updatedSelectedNote = moveSelectedNote(e.key, selectedNote);
      updateSelectedNote(updatedSelectedNote);
    }

    // keys: Home, End, PageUp, PageDown
    if (isOnlyPressedKeys(e, navigationKeys)) {
      e.preventDefault();
      const [updatedSelectedNote, scrollTarget] = moveSelectedNoteByNavKey(e.key, tabStaves, selectedNote);
      updateSelectedNote(updatedSelectedNote);
      if (scrollTarget) scrollComponent(editorRef, ...scrollTarget);
    }
  };

  const handleNoteClick = (staveIdx: number, lineIdx: number, noteIdx: number) => {
    updateSelectedNote({ stave: staveIdx, line: lineIdx, note: noteIdx });
  };

  return {
    updateFocussedStave,
    handleKeyDown,
    handleNoteClick,
  };
};

export default useEditor;
