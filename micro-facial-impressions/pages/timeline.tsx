import React, { useRef, useEffect, useMemo } from "react";
import { atom, useAtom } from "jotai";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
} from "react-virtualized";
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
  // {
  //   type: "impression",
  //   payload: {
  //     date: new Date(),
  //     image:
  //       "https://static.remove.bg/remove-bg-web/8be32deab801c5299982a503e82b025fee233bd0/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg",
  //   },
  // },
  // {
  //   type: "impression",
  //   payload: {
  //     date: new Date(),
  //     image:
  //       "https://static.remove.bg/remove-bg-web/8be32deab801c5299982a503e82b025fee233bd0/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg",
  //   },
  // },
  // {
  //   type: "impression",
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
      setTimeline((prev) => [
        ...prev,
        {
          type: "summary",
          payload: {},
        },
      ]);
    }
    if (mounted.current) {
      setTimeline(TOGGLE_LISTENER);
    }
    mounted.current = true;
  }, [isActive]);

  useEffect(() => {
    // console.log(listRef);
    if (listRef.current) {
      setTimeout(() => {
      console.log(listRef.current);
      // listRef.current.scrollToIndex(timeline.length);
      // listRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 50);
    }
  }, [timeline]);
  // console.log("timeline ===============+>", timeline);
  const cache = useMemo(
    () =>
      new CellMeasurerCache({
        fixedWidth: true,
        minHeight: 300,
      }),
    []
  );
  return (
    <>
      <TimelineHeader
        isActive={isActive}
        toggleSession={() => setActive((prev) => !prev)}
      />
      <Box
        // ref={listRef}
        display="flex"
        flexDirection="column"
        flex="1"
        p="sm"
        height="100vh"
        width="100%"
      >
        <AutoSizer>
          {({ width, height }) => (
            <List
              ref={listRef}
              height={height}
              width={width}
              deferredMeasurementCache={cache}
              rowCount={timeline.length}
              rowHeight={cache.rowHeight}
              overscanRowCount={3}
              // scrollToIndex={timeline.length - 1}
              rowRenderer={({ key, index, style, parent }) => {
                const item = timeline[index];
                // console.log(style);
                return (
                  <CellMeasurer
                    key={key}
                    cache={cache}
                    parent={parent}
                    columnIndex={0}
                    rowIndex={index}
                  >
                    {(props) => (
                      <TimelineItem
                        key={index}
                        {...item}
                        {...style}
                        {...props}
                      />
                    )}
                  </CellMeasurer>
                );
              }}
            />
          )}
        </AutoSizer>
        {/* {timeline.map((item: any, index: number) => (
          <TimelineItem {...item} key={index} />
        ))} */}
      </Box>
    </>
  );
}
