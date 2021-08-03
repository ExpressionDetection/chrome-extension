import format from "date-fns/format";
import Card from "../Card";
import DoughnutGraph from "../DoughnutGraph";
import { Box, Image, Text } from "../system";

const Impression = (payload: any) => {
  const image = payload.image
  const date = payload.date
  const models = payload.prediction.models;
  const modelsAggregatedResult = payload.prediction.aggregatedResult;

  return (
    <Box
      m="md"
      display="flex"
      flex="1"
      flexDirection="column"
      alignItems="center"
    >
      <Card>
        <Box display="flex" flex="1" flexDirection="column" p="16px">
          <Image
            src={image}
            width={1}
            display="flex"
            flex={1}
            borderRadius="16px"
          />
          <Box
            flex="1"
            display="grid"
            width="100%"
            gridTemplateColumns="1fr 1fr"
            gridTemplateRows="auto"
          >
            {models.map((model: any) => <DoughnutGraph title={model.name} model={model} key={model.name} />)}
            <br />
            <DoughnutGraph title={modelsAggregatedResult.name} model={modelsAggregatedResult} key={modelsAggregatedResult.name} />
          </Box>
        </Box>
      </Card>
      <Box
        display="flex"
        width="100%"
        mt="xs"
        flexDirection="row"
        alignItems="flex-start"
        justifyContent="flex-end"
      >
        <Text styling="light" fontSize="sm" color="text.light">
          {format(date, "HH:mm a")}
        </Text>
      </Box>
    </Box>
  );
};

export default Impression;
