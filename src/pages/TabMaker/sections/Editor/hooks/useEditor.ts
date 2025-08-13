import { Direction } from "@commonTypes/editor";
import {
  ArrowKeys,
  arrowKeys,
  deletionKeys,
  ModifierKeys,
  NavigationKeys,
  navigationKeys,
  noteKeys,
} from "@consts/keyboardKeys";
import useCoreEditorStore from "@contexts/coreEditor/store";
import useTabStaveStore from "@contexts/tabStave/store";
import { TabStave } from "@contexts/tabStave/type";
import usePressedKeys from "@hooks/usePressedKeys";
import { appendBlankNote, moveSelectedNote, moveSelectedNoteByCtrl } from "../useCases/onArrowPressed";
import { clearNoteAndBar, shiftStaveBar } from "../useCases/onDeletionKeyPressed";
import { moveSelectedNoteByCtrlNavKey, moveSelectedNoteByNavKey } from "../useCases/onNavigationKeyPressed";
import { writeNote } from "../useCases/onNoteWordPressed";
import { writeBarLine } from "../useCases/onOtherSymbolKeyPressed";

interface UseEditorReturn {
  updateFocussedStave: (stave: TabStave) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
  handleNoteClick: (staveIdx: number, lineIdx: number, noteIdx: number) => void;
  handleScrollOnOutOfView: (directions: Direction[], el: Element) => void;
}
const useEditor = (): UseEditorReturn => {
  const { tabStaves, setTabStaves } = useTabStaveStore();
  const { selectedNote, updateSelectedNote } = useCoreEditorStore();
  const { isPressed, isOnlyPressed, isOnlyPressedKeys, isOnlyPressedWithModifier } = usePressedKeys();

  const currentStave = tabStaves[selectedNote.stave];
  const currentLine = currentStave.value[selectedNote.line];

  const updateFocussedStave = (updatedStave: TabStave) => {
    setTabStaves(tabStaves.map((stave, idx) => (idx === selectedNote.stave ? updatedStave : stave)));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    // keys: →
    if (isOnlyPressed(e, ArrowKeys.Right)) {
      e.preventDefault();
      if (currentLine.length === selectedNote.note + 1) {
        const updatedStave = appendBlankNote(currentStave);
        updateFocussedStave(updatedStave);
      }
    }

    // keys: 0-9, x
    if (isOnlyPressedKeys(e, noteKeys)) {
      e.preventDefault();
      let updatedStave = writeNote(currentStave, selectedNote, e.key);
      if (currentLine.length - 1 < selectedNote.note + 1) {
        updatedStave = appendBlankNote(updatedStave);
      }
      updateFocussedStave(updatedStave);
      updateSelectedNote({ note: selectedNote.note + 1 });
    }

    // keys: |
    if (isPressed(e, "|")) {
      e.preventDefault();
      const updatedStave = writeBarLine(currentStave, selectedNote);
      const appendedStave = appendBlankNote(updatedStave);
      updateFocussedStave(appendedStave);
      updateSelectedNote({ note: selectedNote.note + 1 });
    }

    // keys: backspace, del
    if (isOnlyPressedKeys(e, deletionKeys)) {
      e.preventDefault();
      const isLastFocussed = selectedNote.note === currentLine.length - 1;
      if (isLastFocussed && currentLine[selectedNote.note] === "-") {
        const updatedStave = shiftStaveBar(currentStave);
        updateFocussedStave(updatedStave);

        const updatedCurrentLine = updatedStave.value[selectedNote.line];
        updateSelectedNote({ note: updatedCurrentLine.length - 1 });
      } else {
        const updatedStave = clearNoteAndBar(e.key, currentStave, selectedNote);
        updateFocussedStave(updatedStave);
      }
    }

    // keys: → ↑ ↓ ←
    if (isOnlyPressedKeys(e, arrowKeys)) {
      e.preventDefault();
      const updatedSelectedNote = moveSelectedNote(e.key, tabStaves, selectedNote);
      updateSelectedNote(updatedSelectedNote);
    }

    // keys: ctrl + [→ ↑ ↓ ←]
    if (isOnlyPressedWithModifier(e, ModifierKeys.Control, arrowKeys)) {
      e.preventDefault();
      const updatedSelectedNote = moveSelectedNoteByCtrl(e.key, tabStaves, selectedNote);
      updateSelectedNote(updatedSelectedNote);
    }

    // keys: Home, End, PageUp, PageDown
    if (isOnlyPressedKeys(e, navigationKeys)) {
      e.preventDefault();
      const updatedSelectedNote = moveSelectedNoteByNavKey(e.key, tabStaves, selectedNote);
      updateSelectedNote(updatedSelectedNote);
    }

    // keys: ctrl+Home, ctrl+End
    if (isOnlyPressedWithModifier(e, ModifierKeys.Control, [NavigationKeys.Home, NavigationKeys.End])) {
      e.preventDefault();
      const updatedSelectedNote = moveSelectedNoteByCtrlNavKey(e.key, tabStaves, selectedNote);
      updateSelectedNote(updatedSelectedNote);
    }
  };

  const handleNoteClick = (staveIdx: number, lineIdx: number, noteIdx: number) => {
    updateSelectedNote({ stave: staveIdx, line: lineIdx, note: noteIdx });
  };

  const handleScrollOnOutOfView = (directions: Direction[], el: Element) => {
    const isHorizontal = directions.includes("left") || directions.includes("right");
    const isVertical = directions.includes("top") || directions.includes("bottom");

    el.scrollIntoView({
      behavior: "smooth",
      block: isVertical ? "center" : "nearest",
      inline: isHorizontal ? "center" : "nearest",
    });
  };

  return {
    updateFocussedStave,
    handleKeyDown,
    handleNoteClick,
    handleScrollOnOutOfView,
  };
};

export default useEditor;
