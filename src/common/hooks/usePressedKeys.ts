import { useCallback } from "react";
import { ModifierKeys } from "@consts/keyboardKeys";

interface UsePressedKeysReturn {
  isOnlyPressed: (e: React.KeyboardEvent, key: string) => boolean;
  isOnlyPressedKeys: (e: React.KeyboardEvent, keys: string[]) => boolean;
  isPressed: (e: React.KeyboardEvent, key: string) => boolean;
  getModifierKeys: (e: React.KeyboardEvent) => string[];
  isOnlyPressedWithModifier: (e: React.KeyboardEvent, modifierKey: ModifierKeys, keys: string[]) => boolean;
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

  const getModifierKeys = useCallback((e: React.KeyboardEvent): string[] => {
    const modifiers: string[] = [];
    if (e.ctrlKey) modifiers.push("Control");
    if (e.altKey) modifiers.push("Alt");
    if (e.shiftKey) modifiers.push("Shift");
    if (e.metaKey) modifiers.push("Meta");
    return modifiers;
  }, []);

  const isOnlyPressedWithModifier = useCallback(
    (e: React.KeyboardEvent, modifierKey: ModifierKeys, keys: string[]): boolean => {
      const pressedModifiers = getModifierKeys(e);
      return pressedModifiers.length === 1 && pressedModifiers[0] === modifierKey && keys.includes(e.key);
    },
    [getModifierKeys]
  );

  const isPressed = useCallback((e: React.KeyboardEvent, key: string): boolean => {
    return e.key === key;
  }, []);

  return {
    isOnlyPressed,
    isOnlyPressedKeys,
    getModifierKeys,
    isOnlyPressedWithModifier,
    isPressed,
  };
};

export default usePressedKeys;
