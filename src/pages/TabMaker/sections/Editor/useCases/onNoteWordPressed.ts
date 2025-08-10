import { SelectedNote } from "@contexts/coreEditor/type";
import { TabStave } from "@contexts/tabStave/type";

export const writeNote = (stave: TabStave, selectedNote: SelectedNote, noteKey: string): TabStave => {
  const { line, note } = selectedNote;
  const numberCharset = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

  const updatedValue = stave.value.map((lineArr, lineIdx) => {
    if (lineIdx !== line) return [...lineArr];

    return lineArr.map((n, noteIdx) => {
      if (noteIdx !== note) return n;

      if (n === "-") return noteKey;
      if (n.length < 2 && numberCharset.has(n)) return n + noteKey;
      return n;
    });
  });

  return { ...stave, value: updatedValue };
};
