export interface TabStave {
  tuning: string[];
  value: string[][];
  chord: string;
  comment: string;
}

export interface TabStaveDataState {
  tabStaves: TabStave[];
}

export interface TabStaveFunctionState {
  setTabStaves: (value: TabStave[]) => void;
}

export interface TabStaveState extends TabStaveDataState, TabStaveFunctionState {}
