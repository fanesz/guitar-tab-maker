import useResizableSplit from "@hooks/useResizableSplit";

interface Props {
  left: React.ReactNode;
  right: React.ReactNode;
  initial?: number;
  min?: number;
  max?: number;
  offset?: number;
}
const ResizableSplit = (props: Props) => {
  const { left, right, initial = 50, min = 20, max = 80, offset = 0 } = props;
  const { leftPercent, rightPercent, handleMouseDown } = useResizableSplit(initial, min, max, offset);

  return (
    <div className="flex flex-1">
      <div style={{ width: `${leftPercent}vw` }}>{left}</div>
      <div
        className="w-1 bg-gray-400 dark:bg-gray-600 cursor-col-resize hover:bg-gray-500 dark:hover:bg-gray-500"
        onMouseDown={handleMouseDown}
      />
      <div style={{ width: `${rightPercent}vw` }}>{right}</div>
    </div>
  );
};

export default ResizableSplit;
