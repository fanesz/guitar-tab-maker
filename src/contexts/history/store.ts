import _ from "lodash";
import { create } from "zustand";
import { HistoryAction } from "@consts/actions";
import { HistoryDataState, HistoryState } from "./type";

const initialValue: HistoryDataState = {
  future: [],
  past: [],
  present: {
    tabStaves: [],
    selectedNote: {
      stave: 0,
      line: 0,
      note: 0,
    },
  },
  prevAction: HistoryAction.IDLE,
};

const useHistoryStore = create<HistoryState>((set, get) => ({
  future: initialValue.future,
  past: initialValue.past,
  present: initialValue.present,
  prevAction: initialValue.prevAction,

  setHistory: (history: Partial<HistoryDataState>) => {
    const current = get();
    if (_.isEqual({ past: current.past, present: current.present, future: current.future }, history)) {
      return;
    }
    set({ ...current, ...history, prevAction: HistoryAction.WRITE });
  },
  undo: (callback?: (value: HistoryDataState["present"]) => void) =>
    set((state) => {
      const { past, present, future } = state;
      if (past.length === 0) return state;

      const newPresent = past[past.length - 1];
      callback?.(newPresent);

      return {
        past: past.slice(0, -1),
        present: newPresent,
        future: [present, ...future],
        prevAction: HistoryAction.UNDO,
      };
    }),
  redo: (callback?: (value: HistoryDataState["present"]) => void) =>
    set((state) => {
      const { past, present, future } = state;
      if (future.length === 0) return state;

      const newPresent = future[0];
      callback?.(newPresent);

      return {
        past: [...past, present],
        present: newPresent,
        future: future.slice(1),
        prevAction: HistoryAction.REDO,
      };
    }),
  setPrevAction: (action: HistoryAction) => set((state) => ({ ...state, prevAction: action })),
}));

export default useHistoryStore;
