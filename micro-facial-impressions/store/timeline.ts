import { atom, PrimitiveAtom } from "jotai";

export const TOGGLE_LISTENER = Symbol();

export function atomWithListener<Value>(
  initialValue: Value
): PrimitiveAtom<Value> {
  const isListening = atom(true);
  const valueAtom = atom(initialValue);

  const listener = (event: any, set) => {
    if (event.data.type === "micro-facial") {
      set((prev) => [
        ...prev,
        {
          type: "impression",
          payload: { image: event.data.frame, date: new Date() },
        },
      ]);
    }
  };
  let listenerWrapper: (event: any) => void;

  const baseAtom = atom(
    (get) => get(valueAtom),
    (get, set, update: any | typeof TOGGLE_LISTENER) => {
      if (update === TOGGLE_LISTENER) {
        console.log(
          "REMOVING EVENT LISTENER ==============>",
          get(isListening),
          listenerWrapper
        );
        if (get(isListening)) {
          window.removeEventListener("message", listenerWrapper, false);
        } else {
          window.addEventListener("message", listenerWrapper, false);
        }
        set(isListening, (prev) => !prev);
      } else {
        set(
          valueAtom,
          typeof update === "function"
            ? (update as (prev: Value) => Value)(get(valueAtom))
            : update
        );
      }
    }
  );

  baseAtom.onMount = (setAtom) => {
    listenerWrapper = (event) => listener(event, setAtom);
    window.addEventListener("message", listenerWrapper, false);
    return () => {
      window.removeEventListener("message", listenerWrapper);
    };
  };

  return baseAtom;
}
