import { HistoryAction } from "@consts/actions";
import { SelectedNote } from "@contexts/coreEditor/type";
import { TabStave } from "@contexts/tabStave/type";

export interface HistoryItem {
  tabStaves: TabStave[];
  selectedNote: SelectedNote;
}

export interface HistoryDataState {
  past: HistoryItem[];
  present: HistoryItem;
  future: HistoryItem[];
  prevAction: HistoryAction;
}

export interface HistoryDataFunctionState {
  setHistory: (history: Partial<HistoryDataState>) => void;
  undo: (callback?: (value: HistoryDataState["present"]) => void) => void;
  redo: (callback?: (value: HistoryDataState["present"]) => void) => void;
  setPrevAction: (action: HistoryAction) => void;
}

export interface HistoryState extends HistoryDataState, HistoryDataFunctionState {}
