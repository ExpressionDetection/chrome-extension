import format from "date-fns/format";
import Card from "../Card";
import DoughnutGraph from "../DoughnutGraph";
import { Box, Button, Image, Text } from "../system";

const Impression = ({ image, date }) => {
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
            <DoughnutGraph title="Model 1" key="model 2" />
            <DoughnutGraph title="Model 2" key="model 1" />
            <DoughnutGraph title="Model 3" key="model 3" />
            <DoughnutGraph title="Model 4" key="model 4" />
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text styling="semi-bold" fontSize="sm" color="text.light">
              Was this impression useful?
            </Text>
            <Box>
              <Button styling="secondary" outline mx="4px">
                yes
              </Button>
              <Button styling="terciary" outline>
                no
              </Button>
            </Box>
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
