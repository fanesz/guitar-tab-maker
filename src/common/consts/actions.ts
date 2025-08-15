export enum HistoryAction {
  UNDO = "undo",
  REDO = "redo",
  IDLE = "idle",
  WRITE = "write",
}

export const historyAction = [HistoryAction.UNDO, HistoryAction.REDO, HistoryAction.IDLE, HistoryAction.WRITE];
