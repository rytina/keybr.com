import { type KeyId, KeyModifier } from "@keybr/keyboard";
import { LayoutBuilder } from "@keybr/keyboard-io";
import { Field, FieldList, TextField } from "@keybr/widget";
import { useRef, useState } from "react";
import { useCustomLayout } from "./context.tsx";
import { type LiveInputData, LiveInputInfo } from "./LiveInputInfo.tsx";

export function LiveImport({
  onChange,
}: {
  readonly onChange: (id: KeyId) => void;
}) {
  const { layout, setLayout } = useCustomLayout();
  const [inputData, setInputData] = useState<LiveInputData | null>(null);
  const ref = useRef<{
    code: string;
    shift: boolean;
    alt: boolean;
    ctrl: boolean;
    tab: boolean;
  } | null>(null);
  return (
    <FieldList>
      <Field>Live import:</Field>
      <Field>
        <TextField
          size={6}
          value={String.fromCodePoint(inputData?.codePoint ?? 0x0020)}
          onKeyDown={(event) => {
            const { code } = event;
            if (code === "Tab") {
              event.preventDefault();
            }
            if (LayoutBuilder.isKey(code)) {
              const shift = event.getModifierState("Shift");
              const alt =
                event.getModifierState("Alt") ||
                event.getModifierState("AltGraph");
              const ctrl = event.getModifierState("Control");
              const tab = event.getModifierState("Tab");
              ref.current = { code, shift, alt, ctrl, tab };
            } else {
              ref.current = null;
            }
          }}
          onKeyUp={(event) => {}}
          onInput={(event) => {
            const lastKey = ref.current;
            if (
              lastKey != null &&
              event.inputType === "insertText" &&
              event.data
            ) {
              const { code, shift, alt, ctrl, tab } = lastKey;
              const modifier = KeyModifier.from(shift, alt, ctrl, tab);
              const codePoint = event.data.codePointAt(0) ?? 0x0000;
              setLayout(layout.setOne(code, modifier, codePoint));
              setInputData({ key: code, codePoint, modifier });
              onChange?.(code);
            }
          }}
        />
      </Field>
      <Field>{inputData && <LiveInputInfo inputData={inputData} />}</Field>
    </FieldList>
  );
}
