import { KeyModifier } from "@keybr/keyboard";

export function ModifierInfo({ modifier }: { readonly modifier: KeyModifier }) {
  switch (modifier) {
    case KeyModifier.None:
      return <span>Default</span>;
    case KeyModifier.Shift:
      return <span>Shift</span>;
    case KeyModifier.Alt:
      return <span>AltGr</span>;
    case KeyModifier.ShiftAlt:
      return <span>Shift AltGr</span>;
    case KeyModifier.Ctrl:
      return <span>Ctrl</span>;
    case KeyModifier.Tab:
      return <span>Tab</span>;
  }
  return null;
}
