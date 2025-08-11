import { createRef } from "react";
import { create } from "zustand";
import { CoreEditorDataState, CoreEditorState, SelectedNote } from "./type";

const initialValue: CoreEditorDataState = {
  editorRef: createRef<HTMLDivElement>(),
  selectedNote: {
    stave: 0,
    line: 0,
    note: 0,
  },
};

const useCoreEditorStore = create<CoreEditorState>((set) => ({
  editorRef: initialValue.editorRef,
  selectedNote: initialValue.selectedNote,
  setSelectedNote: (note: SelectedNote) => set({ selectedNote: note }),
  updateSelectedNote: (updatedNote: Partial<SelectedNote>) =>
    set((state) => ({
      selectedNote: { ...state.selectedNote, ...updatedNote },
    })),
}));

export default useCoreEditorStore;
