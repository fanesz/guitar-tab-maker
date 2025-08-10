import { useState } from "react";
import useTabNoteStore from "@contexts/tabNote/store";
import { appendBlankNote } from "@contexts/tabNote/utils";
import usePressedKeys from "@hooks/usePressedKeys";

const Editor = () => {
  const { tabNoteValue, setTabNote } = useTabNoteStore();
  const { isOnlyPressed } = usePressedKeys();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isOnlyPressed(e, "ArrowRight")) {
      setTabNote(appendBlankNote(tabNoteValue));
    }

    if (isOnlyPressed(e, "Enter")) {
      e.preventDefault();
    }
  };

  const [selectedNote, setSelectedNote] = useState<[number, number] | null>(null);

  const handleNoteClick = (lineIdx: number, noteIdx: number) => {
    setSelectedNote([lineIdx, noteIdx]);
  };

  return (
    <div className="h-full">
      <section
        tabIndex={0}
        className="border-r border-gray-300 dark:border-gray-700 p-4 font-mono text-sm bg-white dark:bg-gray-900 overflow-auto h-full"
        onKeyDown={handleKeyDown}
      >
        {tabNoteValue.map((line, lineIdx) => (
          <div key={lineIdx} className="font-mono">
            {line.map((note, noteIdx) => {
              const isSelected = selectedNote && selectedNote[0] === lineIdx && selectedNote[1] === noteIdx;

              return (
                <span
                  key={noteIdx}
                  onClick={() => handleNoteClick(lineIdx, noteIdx)}
                  className={`font-mono cursor-pointer ${isSelected ? "bg-red-500 text-white" : ""}`}
                >
                  {note}
                </span>
              );
            })}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Editor;
