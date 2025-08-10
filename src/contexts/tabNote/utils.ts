export const appendBlankNote = (tabNoteValue: string[][]) => {
  return tabNoteValue.map((line) => [...line, "-"]);
};
