import React, { useRef, useEffect } from "react";
import { atom, useAtom } from "jotai";

import { atomWithListener, TOGGLE_LISTENER } from "../store/timeline";
import { Box } from "../components/system";
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
  const listRef = useRef<HTMLDivElement>();
  const mounted = useRef(false);

  useEffect(() => {
    if (!isActive) {
        // Display recording overview if timeline no longer active
        setTimeline((prev) => {        
          return [
            ...prev,
            {
              type: "summary",
              payload: {
                date: new Date(),
                image:
                  "https://static.remove.bg/remove-bg-web/8be32deab801c5299982a503e82b025fee233bd0/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg",
              },
            },
          ]
      
      });
    }
    if (mounted.current) {
      setTimeline(TOGGLE_LISTENER);
    }
    mounted.current = true;
  }, [isActive]);

  useEffect(() => {
    if (listRef.current) {
      setTimeout(() => {
        listRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 50);
    }
  }, [timeline]);

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
      >
        {timeline.map((item: any, index: number) => (
          <TimelineItem {...item} key={index} />
        ))}
      </Box>
    </>
  );
}
