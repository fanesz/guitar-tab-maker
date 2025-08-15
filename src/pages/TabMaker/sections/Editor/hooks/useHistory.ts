import { useEffect } from "react";
import _ from "lodash";
import { HistoryAction } from "@consts/actions";
import useCoreEditorStore from "@contexts/coreEditor/store";
import useHistoryStore from "@contexts/history/store";
import useTabStaveStore from "@contexts/tabStave/store";
import useDebouncer from "@hooks/useDebouncer";

const useHistory = () => {
  const { tabStaves } = useTabStaveStore();
  const { selectedNote } = useCoreEditorStore();
  const { past, present, prevAction, setHistory } = useHistoryStore();

  const debouncedValue = useDebouncer(tabStaves, 500);

  useEffect(() => {
    if (present.tabStaves.length === 0) {
      setHistory({
        present: {
          tabStaves,
          selectedNote,
        },
      });
      return;
    }
  }, []);

  useEffect(() => {
    if (debouncedValue && prevAction !== HistoryAction.UNDO && prevAction !== HistoryAction.REDO) {
      setHistory({
        past: [...past, present],
        present: {
          tabStaves: debouncedValue,
          selectedNote,
        },
        future: [],
      });
    }
  }, [debouncedValue]);

  return {};
};

export default useHistory;
