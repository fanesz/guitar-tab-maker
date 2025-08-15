import { Direction } from "@commonTypes/editor";
import { HistoryAction } from "@consts/actions";
import {
  ArrowKeys,
  arrowKeys,
  deletionKeys,
  ModifierKeys,
  NavigationKeys,
  navigationKeys,
  noteKeys,
  WhitespaceKeys,
} from "@consts/keyboardKeys";
import useCoreEditorStore from "@contexts/coreEditor/store";
import useHistoryStore from "@contexts/history/store";
import useTabStaveStore from "@contexts/tabStave/store";
import { TabStave } from "@contexts/tabStave/type";
import usePressedKeys from "@hooks/usePressedKeys";
import { appendBlankNote, moveSelectedNote, moveSelectedNoteByCtrl } from "../useCases/onArrowPressed";
import { clearNoteAndBar, removeBlankNote, shiftStaveBar } from "../useCases/onDeletionKeyPressed";
import { moveSelectedNoteByCtrlNavKey, moveSelectedNoteByNavKey } from "../useCases/onNavigationKeyPressed";
import { insertBlankNote, writeNote } from "../useCases/onNoteWordPressed";
import { writeBarLine } from "../useCases/onOtherSymbolKeyPressed";
import useHistory from "./useHistory";

interface UseEditorReturn {
  updateFocussedStave: (stave: TabStave) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
  handleTextareaKeyDown: (e: React.KeyboardEvent<HTMLElement>) => void;
  handleNoteClick: (staveIdx: number, lineIdx: number, noteIdx: number) => void;
  handleScrollOnOutOfView: (directions: Direction[], el: Element) => void;
}
const useEditor = (): UseEditorReturn => {
  const { tabStaves, setTabStaves } = useTabStaveStore();
  const { selectedNote, updateSelectedNote, setSelectedNote } = useCoreEditorStore();
  const { undo, redo, setPrevAction } = useHistoryStore();
  const { isPressed, isOnlyPressedKeys, isOnlyPressedWithModifier } = usePressedKeys();

  useHistory();

  const currentStave = tabStaves[selectedNote.stave];
  const currentLine = currentStave.value[selectedNote.line];
  const isEndOfLine = currentLine.length === selectedNote.note + 1;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
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

    // keys: space
    if (isOnlyPressedKeys(e, [WhitespaceKeys.Space])) {
      e.preventDefault();

      const updatedStave = insertBlankNote(currentStave, selectedNote);
      updateFocussedStave(updatedStave);
      updateSelectedNote({ note: selectedNote.note + 1 });
    }

    // keys: backspace, del
    if (isOnlyPressedKeys(e, deletionKeys)) {
      e.preventDefault();
      const isAllBlank = currentStave.value.every((lineArr) => lineArr[selectedNote.note] === "-");

      if (isAllBlank) {
        const updatedStave = removeBlankNote(currentStave, selectedNote);
        updateFocussedStave(updatedStave);
        if (isEndOfLine) {
          const updatedStave = shiftStaveBar(currentStave);
          updateFocussedStave(updatedStave);

          const updatedCurrentLine = updatedStave.value[selectedNote.line];
          updateSelectedNote({ note: updatedCurrentLine.length - 1 });
        }
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

      if (isPressed(e, ArrowKeys.Right) && isEndOfLine) {
        const updatedStave = appendBlankNote(tabStaves[selectedNote.stave]);
        setTabStaves(tabStaves.map((stave, idx) => (idx === selectedNote.stave ? updatedStave : stave)));
      }
    }

    // keys: ctrl + [→ ↑ ↓ ←] | aliases: tab
    if (isOnlyPressedWithModifier(e, ModifierKeys.Control, arrowKeys) || isOnlyPressedKeys(e, [WhitespaceKeys.Tab])) {
      e.preventDefault();
      const updatedSelectedNote = moveSelectedNoteByCtrl(e.key, tabStaves, selectedNote);

      if (isPressed(e, ArrowKeys.Right) && isEndOfLine) {
        const updatedStave = appendBlankNote(tabStaves[selectedNote.stave], 5);
        setTabStaves(tabStaves.map((stave, idx) => (idx === selectedNote.stave ? updatedStave : stave)));
      }
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

    // keys: ctrl+z, ctrl+y
    if (isOnlyPressedWithModifier(e, ModifierKeys.Control, ["z", "y"])) {
      e.preventDefault();
      if (e.key === "z") {
        undo((value) => {
          if (!value || value?.tabStaves?.length === 0) return;
          setTabStaves(value.tabStaves);
          setSelectedNote(value.selectedNote);
        });
      } else if (e.key === "y") {
        redo((value) => {
          if (!value || value?.tabStaves?.length === 0) return;
          setTabStaves(value.tabStaves);
          setSelectedNote(value.selectedNote);
        });
      }
    }
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const updateFocussedStave = (updatedStave: TabStave) => {
    setTabStaves(tabStaves.map((stave, idx) => (idx === selectedNote.stave ? updatedStave : stave)));
    setPrevAction(HistoryAction.WRITE);
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
    handleTextareaKeyDown,
    handleNoteClick,
    handleScrollOnOutOfView,
  };
};

export default useEditor;
