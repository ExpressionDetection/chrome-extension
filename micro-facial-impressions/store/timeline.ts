import { atom, PrimitiveAtom } from "jotai";
import socket from "../socketio";
import { v4 as uuidv4 } from 'uuid';

let sessionID = localStorage.getItem("sockerioSessionId");
let usernameAlreadySelected = false;

if (sessionID) {
  usernameAlreadySelected = true;
} else {
  sessionID = uuidv4();
}

socket.auth = { sessionID };
socket.connect();

socket.on("session", ({ sessionID, userID }: any) => {
  // attach the session ID to the next reconnection attempts
  socket.auth = { sessionID };
  // store it in the localStorage
  localStorage.setItem("sockerioSessionId", sessionID);
  // save the ID of the user
  socket.userID = userID;
});

socket.on("connect_error", (err: any) => {
  if (err.message === "invalid username") {
    usernameAlreadySelected = false;
  }
});

export const TOGGLE_LISTENER = Symbol();

export function atomWithListener<Value>(
  initialValue: Value
): PrimitiveAtom<Value> {
  const isListening = atom(true);
  const valueAtom = atom(initialValue);

  const listener = (event: any, set: any) => {
    if (event.data.type === "expression-detection.SendFrame") {

      //socket.emit("predictionRequest", {
      //  frame: event.data.frame,
      //});

      //socket.on("predictionResponse", (data: any) => {
        //console.log(data)
        set((prev: any) => [
          ...prev,
          {
            type: "impression",
            payload: { image: event.data.frame, date: new Date() },
          },
        ]);
      //});
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
