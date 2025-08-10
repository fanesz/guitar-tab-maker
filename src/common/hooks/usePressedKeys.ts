import { useCallback } from "react";

interface UsePressedKeysReturn {
  isOnlyPressed: (e: React.KeyboardEvent, key: string) => boolean;
  isPressed: (e: React.KeyboardEvent, key: string) => boolean;
  getModifierKeys: (e: React.KeyboardEvent) => string[];
}

const usePressedKeys = (): UsePressedKeysReturn => {
  const isOnlyPressed = useCallback((e: React.KeyboardEvent, key: string): boolean => {
    // Check if the pressed key matches the target key
    if (e.key !== key) return false;

    // Check if any modifier keys are pressed
    const hasModifiers = e.ctrlKey || e.altKey || e.shiftKey || e.metaKey;

    return !hasModifiers;
  }, []);

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
    isPressed,
    getModifierKeys,
  };
};

export default usePressedKeys;
