import { create } from "zustand";
import { CoreEditorDataState, CoreEditorState, SelectedNote } from "./type";

const initialValue: CoreEditorDataState = {
  selectedNote: {
    stave: 0,
    line: 0,
    note: 0,
  },
};

const useCoreEditorStore = create<CoreEditorState>((set) => ({
  selectedNote: initialValue.selectedNote,
  setSelectedNote: (note: SelectedNote) => set({ selectedNote: note }),
  updateSelectedNote: (updatedNote: Partial<SelectedNote>) =>
    set((state) => ({
      selectedNote: { ...state.selectedNote, ...updatedNote },
    })),
}));

export default useCoreEditorStore;
