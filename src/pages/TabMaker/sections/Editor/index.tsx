import { useEffect } from "react";
import clsx from "clsx";
import useCoreEditorStore from "@contexts/coreEditor/store";
import useTabStaveStore from "@contexts/tabStave/store";
import useDetectElementInView from "@hooks/useDetectElementInView";
import useEditor from "./hooks/useEditor";

const Editor = () => {
  const { tabStaves } = useTabStaveStore();
  const { editorRef, selectedNote } = useCoreEditorStore();
  const { handleKeyDown, handleNoteClick, handleScrollOnOutOfView } = useEditor();

  useEffect(() => {
    editorRef.current?.focus();
  }, []);

  useDetectElementInView({
    containerRef: editorRef,
    selector: `[data-stave="${selectedNote.stave}"][data-line="${selectedNote.line}"][data-note="${selectedNote.note}"]`,
    onOutOfView: handleScrollOnOutOfView,
  });

  return (
    <section
      ref={editorRef}
      tabIndex={0}
      className="border-r overflow-auto border-gray-300 dark:border-gray-700 p-4 pb-10 bg-white dark:bg-gray-900 h-full focus:outline-0 min-h-0 flex-1 scroll-smooth"
      onKeyDown={handleKeyDown}
    >
      <div className="w-max min-w-full h-max flex flex-col gap-6 font-mono text-sm">
        {tabStaves.map((stave, staveIdx) => (
          <div key={staveIdx}>
            {stave.value.map((line, lineIdx) => {
              const isSelectedLine = selectedNote.line === lineIdx && selectedNote.stave === staveIdx;
              return (
                <div key={lineIdx} className={clsx("flex", isSelectedLine && "bg-gray-300/30")}>
                  {line.map((note, noteIdx) => {
                    const isSelectedColumn = selectedNote.note === noteIdx && selectedNote.stave === staveIdx;
                    return (
                      <div
                        key={`${staveIdx}-${lineIdx}-${noteIdx}`}
                        data-stave={staveIdx}
                        data-line={lineIdx}
                        data-note={noteIdx}
                        className={isSelectedColumn ? "bg-gray-300/30" : ""}
                        onClick={() => handleNoteClick(staveIdx, lineIdx, noteIdx)}
                      >
                        <span
                          className={clsx(
                            "cursor-pointer inline-flex justify-center items-center w-[1ch]",
                            note.length > 1 && "scale-85"
                          )}
                        >
                          {note}
                        </span>
                      </div>
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
