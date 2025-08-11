import { useCallback } from "react";

interface UsePressedKeysReturn {
  isOnlyPressed: (e: React.KeyboardEvent, key: string) => boolean;
  isOnlyPressedKeys: (e: React.KeyboardEvent, keys: string[]) => boolean;
  isPressed: (e: React.KeyboardEvent, key: string) => boolean;
  getModifierKeys: (e: React.KeyboardEvent) => string[];
}

const usePressedKeys = (): UsePressedKeysReturn => {
  const isOnlyPressed = useCallback((e: React.KeyboardEvent, key: string): boolean => {
    if (e.key !== key) return false;
    const hasModifiers = e.ctrlKey || e.altKey || e.shiftKey || e.metaKey;
    return !hasModifiers;
  }, []);

  const isOnlyPressedKeys = useCallback(
    (e: React.KeyboardEvent, keys: string[]): boolean => {
      return keys.some((key) => isOnlyPressed(e, key));
    },
    [isOnlyPressed]
  );

  const isPressed = useCallback((e: React.KeyboardEvent, key: string): boolean => {
    return e.key === key;
  }, []);

  const getModifierKeys = useCallback((e: React.KeyboardEvent): string[] => {
    const modifiers: string[] = [];
    if (e.ctrlKey) modifiers.push("Control");
    if (e.altKey) modifiers.push("Alt");
    if (e.shiftKey) modifiers.push("Shift");
    if (e.metaKey) modifiers.push("Meta");
    return modifiers;
  }, []);

  return {
    isOnlyPressed,
    isOnlyPressedKeys,
    isPressed,
    getModifierKeys,
  };
};

export default usePressedKeys;
