import React, { useRef, useEffect, useState } from "react";
import { atom, useAtom } from "jotai";

const debounce = require('lodash/debounce')
import { atomWithListener, TOGGLE_LISTENER } from "../store/timeline";
import { Box, Button } from "../components/system";
import { TimelineHeader, TimelineItem } from "../components/timeline";

const timelineAtom = atomWithListener([
  // {
  //   type: "summary",
  //   payload: {
  //     date: new Date(),
  //     image:
  //       "https://static.remove.bg/remove-bg-web/8be32deab801c5299982a503e82b025fee233bd0/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg",
  //   },
  // },
]);

const active = atom(true);

export default function CustomizedTimeline() {
  const [isActive, setActive] = useAtom(active);
  const [timeline, setTimeline] = useAtom(timelineAtom);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const listRef = useRef<HTMLDivElement>();
  const mounted = useRef(false);
  const sessionLastIndex = useRef(0);

  useEffect(() => {
    window.parent.postMessage(
      { type: "expression-detection.StartSession" },
      "*"
    );
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      behavior: "smooth",
      top: listRef.current?.scrollHeight,
    })
  }

  useEffect(() => {
    if (isAtBottom) {
      setTimeout(() => {
        scrollToBottom();
      }, 50);
    }

    console.log("inside scrolled")
    const onScroll = debounce(() => {
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= listRef.current?.scrollHeight
      console.log('at the bottom', bottom);
      setIsAtBottom(bottom)
    }, 100, {
      trailing: true,
      leading: false
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [timeline, isAtBottom, setIsAtBottom]);

  useEffect(() => {
    if (!isActive) {
      // Display recording overview if timeline no longer active
      setTimeline((prev) => {
        return [
          ...prev,
          {
            type: "summary",
            payload: {
              dataset: timeline.slice(sessionLastIndex.current).filter(i => i.type === "impression")
            },
          },
        ];
      });
      sessionLastIndex.current = timeline.length;
    }
    if (mounted.current) {
      setTimeline(TOGGLE_LISTENER);
      window.parent.postMessage(
        { type: isActive ? "expression-detection.StartSession" : "expression-detection.StopSession" },
        "*"
      );
    }
    mounted.current = true;
  }, [isActive]);

  return (
    <>
      <TimelineHeader
        isActive={isActive}
        toggleSession={() => setActive((prev) => !prev)}
      />
      <Box
        ref={listRef}
        display="flex"
        flexDirection="column"
        flex="1"
        p="sm"
        height="100%"
        width="100%"
        position="relative"
      >
        {timeline.map((item: any, index: number) => (
          <TimelineItem {...item} key={index} />
        ))}
        {!isAtBottom && <Button bg="background.card" onClick={scrollToBottom} width="40px" height="40px" borderRadius="20px" styling="base" display="flex" position="fixed" bottom="16px" right="16px" justifyContent="center" alignItems="center" boxShadow="default">
          <img src="/arrow-down.svg" color="black" width={16} height={16} />
        </Button>}
      </Box>
    </>
  );
}
