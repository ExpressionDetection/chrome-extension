import React, { useRef, useEffect } from "react";
import { atom, useAtom } from "jotai";

import { atomWithListener, TOGGLE_LISTENER } from "../store/timeline";
import { Box, Button, Image, Text } from "../components/system";
import { TimelineHeader, TimelineItem } from "../components/timeline";
import Card from "../components/Card";
import { useRouter } from "next/dist/client/router";

const framesAtom = atom([]);

export default function FrameSelection() {
  const [frames, set] = useAtom(framesAtom);
  const router = useRouter();
  useEffect(() => {
    const listener = (event) => {
      console.log("frame-selection listener", event);
      set(event.data.frames);
    };
    // const listenerParent = (event) => {
    //   console.log("frame-selection parent", event);
    // };
    window.addEventListener("message", listener, false);
    // window.parent.addEventListener("message", listenerParent, false);
    // window.postMessage({ type: "expression-detection.GetPossibleFrames" }, "*");
    window.parent.postMessage(
      { type: "expression-detection.GetPossibleFrames" },
      "*"
    );
    return () => {
      window.removeEventListener("message", listener);
      //   window.parent.removeEventListener("message", listenerParent);
    };
  }, [set]);

  const selectFrameIndex = (index: number) => {
    window.parent.postMessage(
      { type: "expression-detection.SelectVideoIndex", index },
      "*"
    );
    router.push("/timeline");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      flex="1"
      p="lg"
      height="100%"
      width="100%"
    >
      <Text styling="bold" fontSize="lg" mb="lg">Select a video frame:</Text>
      {frames.map((frame) => (
        <Card border={false} css={{
          '&:hover': {
            opacity: .7
          },
        }}>
          <Button styling="base" display="flex" flex="1" width="100%" flexDirection="column" alignItems="flex-start" onClick={() => selectFrameIndex(frame.index)}>
            <Text styling="bold" fontSize="md">{`Video ${frame.index}`}</Text>
            <Image
              key={`frame-${frame.index}`}
              src={frame.frame}
              width={1}
              display="flex"
              flex={1}
              borderRadius="16px"
            />
          </Button>
        </Card>
      ))}
    </Box>
  );
}
