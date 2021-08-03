import { atom, PrimitiveAtom } from "jotai";
import { v4 as uuidv4 } from 'uuid';
import { socket, connectSocketSession } from "../socketio";

export const TOGGLE_LISTENER = Symbol();

export function atomWithListener<Value>(
  initialValue: Value
): PrimitiveAtom<Value> {
  // This map caches temporarily frames in the client side
  let framesMap = new Map();
  const isListening = atom(true);
  const valueAtom = atom(initialValue);

  const frameListener = (event: any, set: any) => {
    if (!socket.connected) return;
    if (event.data.type === "expression-detection.SendFrame") {
      const uuid = uuidv4();
      framesMap.set(uuid, event.data.frame)
      socket.emit("predictionRequest", {
        payload: {
          uuid,
          frame: event.data.frame,
        },
        to: socket.userID
      });
    }
  };

  const predictionListener = (data: any, set: any) => {
    if (!socket.connected) return;
    const frame = framesMap.get(data.uuid)
    set((prev: any) => [
      ...prev,
      {
        type: "impression",
        payload: { 
          image: frame, 
          prediction: {
            models: data.models,
            aggregatedResult: data.aggregatedResult,
          },
          date: new Date() 
        },
      },
    ]);
    framesMap.delete(data.uuid)
  };

  let frameListenerWrapper: (event: any) => void;
  let predictionListenerWrapper: (data: any) => void;

  const baseAtom = atom(
    (get) => get(valueAtom),
    (get, set, update: any | typeof TOGGLE_LISTENER) => {
      if (update === TOGGLE_LISTENER) {
        if (get(isListening)) {
          console.log(
            "REMOVING EVENT LISTENER AND SOCKETIO LISTNER ==============>",
            get(isListening),
            frameListenerWrapper
          );
          window.removeEventListener("message", frameListenerWrapper, false);
          socket.off("predictionResponse");
          // socket.disconnect();
        } else {
          window.addEventListener("message", frameListenerWrapper, false);
          socket.on("predictionResponse", predictionListenerWrapper);
          // connectSocketSession();
        }
        // Clear any lingering images from our cache
        framesMap = new Map();
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
    // Catching frames and sending to inference
    frameListenerWrapper = (event) => frameListener(event, setAtom);
    window.addEventListener("message", frameListenerWrapper, false);

    // Catching predictions from inference requests
    predictionListenerWrapper = (data) => predictionListener(data, setAtom);
    socket.on("predictionResponse", predictionListenerWrapper);

    connectSocketSession();

    return () => {
      window.removeEventListener("message", frameListenerWrapper);
      socket.disconnect();
    };
  };

  return baseAtom;
}
