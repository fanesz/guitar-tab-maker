export interface SelectedNote {
  stave: number;
  line: number;
  note: number;
}

export interface CoreEditorDataState {
  selectedNote: SelectedNote;
}

export interface CoreEditorFunctionState {
  setSelectedNote: (note: SelectedNote) => void;
  updateSelectedNote: (updatedNote: Partial<SelectedNote>) => void;
}

export interface CoreEditorState extends CoreEditorDataState, CoreEditorFunctionState {}
