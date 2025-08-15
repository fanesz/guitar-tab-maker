// on tab pressed at textarea field
// will replace it with spaces
export const replaceTabWithSpaces = (target: HTMLTextAreaElement, totalSpaces: number = 4) => {
  const spaces = " ".repeat(totalSpaces < 1 ? 1 : totalSpaces);
  const start = target.selectionStart;
  const end = target.selectionEnd;
  return target.value.substring(0, start) + spaces + target.value.substring(end);
};
