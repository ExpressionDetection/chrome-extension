import { memo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Text } from "../system";

const DoughnutGraph = ({ title, model }: any) => {

  const data = {
    labels: model.labels,
    legend: {
      display: false,
    },
    datasets: [
      {
        label: title,
        data: model.probabilities,
        backgroundColor: ["#1EE449", "#57BFFA", "#801CFF"],
        hoverOffset: 4,
        spacing: 4,
        radius: 60,
        borderRadius: 8,
        cutout: "80%",
      },
    ],
  };

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
            {model.probabilities[0]}
          </Text>
        </Box>
        <Text styling="bold" fontSize="sm" color="text.default" my={1}>
          {model.labels[0]}
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
