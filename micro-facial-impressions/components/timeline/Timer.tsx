import { useEffect } from "react";
import { atom, useAtom } from "jotai";
import { Text } from "../system";
import { useRef } from "react";

const countAtom = atom(0);

const Timer = ({ isActive }) => {
  const [timer, set] = useAtom(countAtom);
  const refInterval = useRef();
  useEffect(() => {
    if (isActive && !refInterval.current) {
      refInterval.current = setInterval(() => {
        set((prev) => ++prev);
      }, 1000);
    } else if (!isActive && refInterval.current) {
      clearInterval(refInterval.current);
      refInterval.current = undefined;
    }
    return () => clearInterval(refInterval.current);
  }, [set, isActive]);
  return <Text styling="light">{new Date(timer * 1000).toISOString().substr(11, 8)}</Text>;
};

export default Timer;
