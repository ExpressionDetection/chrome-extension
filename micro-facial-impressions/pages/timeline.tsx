import React, { useEffect } from "react";
import { useAtom } from "jotai";
import { atomWithMessage } from "../store/timeline";
import Card from "../components/Card";
import { Box } from "../components/system";

const timelineAtom = atomWithMessage([
  {
    date: new Date(),
    image:
      "https://static.remove.bg/remove-bg-web/8be32deab801c5299982a503e82b025fee233bd0/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg",
  },
  {
    date: new Date(),
    image:
      "https://static.remove.bg/remove-bg-web/8be32deab801c5299982a503e82b025fee233bd0/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg",
  },
  {
    date: new Date(),
    image:
      "https://static.remove.bg/remove-bg-web/8be32deab801c5299982a503e82b025fee233bd0/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg",
  },
]);

export default function CustomizedTimeline() {
  const [timeline, set] = useAtom(timelineAtom);
  useEffect(() => {
    console.log("useEffect loaded");
    // setInterval(() => {
    //   parent.postMessage("react", "*");
    // }, 5000);
    //@ts-ignore
    // eslint-disable-next-line
    // window.addEventListener("message", (message) => {
    //   console.log("HEY ==========>", message);
    // });
  }, []);

  return (
    <Box display="flex" flexDirection="column" flex="1" p='sm' height="100%" width="100%">
      {timeline.map((item: any) => (
        <Card {...item} />
        // <TimelineItem>
        //   <TimelineOppositeContent>
        //     <Typography variant="body2" color="textSecondary">
        //       {format(item.date, "HH:mm a")}
        //     </Typography>
        //   </TimelineOppositeContent>
        //   <TimelineSeparator>
        //     <TimelineDot color="grey">
        //       <SentimentDissatisfiedTwoToneIcon color="primary" />
        //     </TimelineDot>
        //     <TimelineConnector />
        //   </TimelineSeparator>
        //   <TimelineContent>
        //     <ImageCardWithActions image={item.image} />
        //   </TimelineContent>
        // </TimelineItem>
      ))}
    </Box>
  );
}
