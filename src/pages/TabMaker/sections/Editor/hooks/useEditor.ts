import { arrowKeys } from "@consts/keyboardKeys";
import useCoreEditorStore from "@contexts/coreEditor/store";
import useTabStaveStore from "@contexts/tabStave/store";
import { TabStave } from "@contexts/tabStave/type";
import usePressedKeys from "@hooks/usePressedKeys";
import { appendBlankNote, moveSelectedNote } from "../useCases/onArrowPressed";
import { writeNote } from "../useCases/onNoteWordPressed";

interface UseEditorReturn {
  setFocussedStave: (stave: TabStave) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
  handleNoteClick: (staveIdx: number, lineIdx: number, noteIdx: number) => void;
}
const useEditor = (): UseEditorReturn => {
  const { tabStaves, setTabStaves } = useTabStaveStore();
  const { selectedNote, updateSelectedNote } = useCoreEditorStore();
  const { isOnlyPressed, isOnlyPressedKeys, isNoteKey } = usePressedKeys();

  const setFocussedStave = (updatedStave: TabStave) => {
    setTabStaves(tabStaves.map((stave, idx) => (idx === selectedNote.stave ? updatedStave : stave)));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (isOnlyPressed(e, "ArrowRight")) {
      const updatedValue = appendBlankNote(tabStaves[selectedNote.stave], selectedNote);
      setFocussedStave(updatedValue);
    }

    if (isNoteKey(e)) {
      e.preventDefault();
      const updatedStave = writeNote(tabStaves[selectedNote.stave], selectedNote, e.key);
      setFocussedStave(updatedStave);
    }

    if (isOnlyPressedKeys(e, arrowKeys)) {
      const updatedSelectedNote = moveSelectedNote(e.key, selectedNote);
      updateSelectedNote(updatedSelectedNote);
    }
  };

  const handleNoteClick = (staveIdx: number, lineIdx: number, noteIdx: number) => {
    updateSelectedNote({ stave: staveIdx, line: lineIdx, note: noteIdx });
  };

  return {
    setFocussedStave,
    handleKeyDown,
    handleNoteClick,
  };
};

export default useEditor;
