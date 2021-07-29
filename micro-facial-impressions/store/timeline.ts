import { atom, PrimitiveAtom } from "jotai";

export function atomWithMessage<Value>(
  initialValue: Value
): PrimitiveAtom<Value> {
  const baseAtom = atom(initialValue);

  baseAtom.onMount = (setAtom) => {
    const listener = (event: any) => {
      if (event.data.type === "micro-facial") {
        setAtom((prev) => [
          ...prev,
          { image: event.data.frame, date: new Date() },
        ]);
      }
    };
    window.addEventListener("message", listener, false);
    return () => {
      window.removeEventListener("message", listener);
    };
  };

  return baseAtom;
}
