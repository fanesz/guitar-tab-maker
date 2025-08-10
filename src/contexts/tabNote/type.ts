export interface TabNoteDataState {
  tabNoteValue: string[][];
}

export interface TabNoteFunctionState {
  setTabNote: (value: string[][]) => void;
}

export interface TabNoteState extends TabNoteDataState, TabNoteFunctionState {}
