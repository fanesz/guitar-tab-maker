import { arrowKeys } from "@consts/keyboardKeys";
import useCoreEditorStore from "@contexts/coreEditor/store";
import useTabStaveStore from "@contexts/tabStave/store";
import { TabStave } from "@contexts/tabStave/type";
import usePressedKeys from "@hooks/usePressedKeys";
import { scrollComponent } from "@utils/componentRef";
import { appendBlankNote, moveSelectedNote } from "../useCases/onArrowPressed";
import { writeNote } from "../useCases/onNoteWordPressed";

interface UseEditorReturn {
  setFocussedStave: (stave: TabStave) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
  handleNoteClick: (staveIdx: number, lineIdx: number, noteIdx: number) => void;
}
const useEditor = (): UseEditorReturn => {
  const { tabStaves, setTabStaves } = useTabStaveStore();
  const { editorRef, selectedNote, updateSelectedNote } = useCoreEditorStore();
  const { isOnlyPressed, isOnlyPressedKeys, isNoteKey } = usePressedKeys();

  const currentStave = tabStaves[selectedNote.stave];

  const setFocussedStave = (updatedStave: TabStave) => {
    setTabStaves(tabStaves.map((stave, idx) => (idx === selectedNote.stave ? updatedStave : stave)));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (isOnlyPressed(e, "ArrowRight")) {
      if (currentStave.value[selectedNote.line].length === selectedNote.note + 1) {
        const updatedValue = appendBlankNote(currentStave);
        setFocussedStave(updatedValue);
        scrollComponent(editorRef, "x");
      }
    }

    if (isNoteKey(e)) {
      e.preventDefault();
      const updatedStave = writeNote(currentStave, selectedNote, e.key);
      setFocussedStave(updatedStave);
    }

    if (isOnlyPressedKeys(e, arrowKeys)) {
      e.preventDefault();
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
