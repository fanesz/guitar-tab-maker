import useCoreEditorStore from "@contexts/coreEditor/store";
import useTabStaveStore from "@contexts/tabStave/store";

const Preview = () => {
  const { tabStaves } = useTabStaveStore();
  const { selectedNote } = useCoreEditorStore();

  const currentStave = tabStaves[selectedNote.stave];

  return (
    <section className="p-4 bg-gray-50 dark:bg-gray-900 overflow-auto h-full">
      <div className="bg-gray-200 dark:bg-gray-700 h-full w-full rounded justify-center text-[0.6rem] font-mono">
        <span>
          {currentStave.value.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </span>
      </div>
    </section>
  );
};

export default Preview;
