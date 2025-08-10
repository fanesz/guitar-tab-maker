import { useEffect, useRef } from "react";
import clsx from "clsx";
import useCoreEditorStore from "@contexts/coreEditor/store";
import useTabStaveStore from "@contexts/tabStave/store";
import useEditor from "./hooks/useEditor";

const Editor = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { tabStaves } = useTabStaveStore();
  const { selectedNote } = useCoreEditorStore();

  const { handleKeyDown, handleNoteClick } = useEditor();

  useEffect(() => sectionRef.current?.focus(), []);

  return (
    <section
      ref={sectionRef}
      tabIndex={0}
      className="border-r overflow-auto border-gray-300 dark:border-gray-700 p-4 bg-white dark:bg-gray-900 h-full focus:outline-0 min-h-0 flex-1"
      onKeyDown={handleKeyDown}
    >
      <div className="w-max min-w-full flex flex-col gap-6 font-mono text-sm">
        {tabStaves.map((stave, staveIdx) => (
          <div key={staveIdx}>
            {stave.value.map((line, lineIdx) => {
              const isSelectedLine = selectedNote.line === lineIdx && selectedNote.stave === staveIdx;
              return (
                <div key={lineIdx} className={clsx("flex", isSelectedLine && "bg-gray-300/30")}>
                  {line.map((note, noteIdx) => {
                    const isSelectedColumn = selectedNote.note === noteIdx && selectedNote.stave === staveIdx;
                    return (
                      <span
                        key={noteIdx}
                        className={clsx(
                          "cursor-pointer inline-flex justify-center items-center",
                          "w-[1ch]",
                          note.length > 1 && "scale-85",
                          isSelectedColumn && "bg-gray-300/30"
                        )}
                        onClick={() => handleNoteClick(staveIdx, lineIdx, noteIdx)}
                      >
                        {note}
                      </span>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Editor;
