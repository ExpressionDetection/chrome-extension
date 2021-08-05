import { memo, useMemo } from "react";
import Card from "../Card";
import { Line } from "../Graph";
import { Box, Text } from "../system";
import { colors, Label } from "../system/theme/colors";

interface Props {
  dataset: any;
}

const getColorFromLabel = (label: Label) => {
  return colors[label];
}

const Summary: React.FC<Props> = ({ dataset }) => {


  const data = useMemo(() => {
    const tempMap = new Map();
    for (const { payload: { prediction: { aggregatedResult: { labels, probabilities } } } } of dataset) {
      labels.forEach((label: Label, index: number) => {
        tempMap.set(label, {
          label,
          data: [...tempMap.get(label)?.data ?? [], probabilities[index]],
          backgroundColor: getColorFromLabel(label),
          borderColor: getColorFromLabel(label)
        })
      })
    }
    return Array.from(tempMap.values());
  }, [dataset])

  return (
    <Box
      m="md"
      display="flex"
      flex="1"
      height="100%"
      flexDirection="column"
      alignItems="center"
    >
      <Card border={false}>
        <Box
          display="flex"
          flex="1"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          width="100%"
          p="md"
        >
          <Text styling="bold" size="h3">
            Session Summary
          </Text>
          <Line datasets={data} />
        </Box>
      </Card>
    </Box>
  );
};

export default memo(Summary);
