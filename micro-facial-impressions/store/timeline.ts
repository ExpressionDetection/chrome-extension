import { atom, PrimitiveAtom } from "jotai";

const b64toBlob = (b64Data: string, contentType = "", sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

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
