import { memo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Text } from "../system";

const data = {
  labels: ["Neutral", "Happy", "Sad", "Disgusted"],
  legend: {
    display: false,
  },
  datasets: [
    {
      label: "My First Dataset",
      data: [25, 50, 15, 10],
      backgroundColor: ["#1EE449", "#57BFFA", "#801CFF", "#FFBA33"],
      hoverOffset: 4,
      spacing: 4,
      radius: 60,
      borderRadius: 8,
      cutout: "80%",
    },
  ],
};

const DoughnutGraph = ({ title }) => {
  return (
    <Box
      display="flex"
      flex="1"
      flexDirection="column"
      width="100%"
      alignItems="center"
      justifyContent="center"
      height="100%"
      position="relative"
      zIndex="0"
    >
      <Text styling="regular" fontSize="h3" color="text.default" my={1}>
        {title}
      </Text>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        top="calc(50% - 10px)"
      >
        <Box
          display="flex"
          flexDirection="row"
          width="100%"
          alignItems="center"
          justifyContent="space-around"
        >
          <img src="/accuracy.svg" color="black" width={12} height={12} />
          <Text styling="bold" fontSize="sm" color="text.default" my={1}>
            55%
          </Text>
        </Box>
        <Text styling="bold" fontSize="sm" color="text.default" my={1}>
          Happy
        </Text>
      </Box>
      <Doughnut
        width={60}
        height={60}
        data={data}
        options={{
          layout: {
            padding: 0,
          },
          plugins: {
            padding: 0,
            legend: {
              display: false,
            },
          },
        }}
      />
    </Box>
  );
};

export default memo(DoughnutGraph);
