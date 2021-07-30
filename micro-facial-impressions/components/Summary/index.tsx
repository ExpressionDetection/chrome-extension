import Card from "../Card";
import { Line } from "../Graph";
import { Box, Text } from "../system";

interface Props {
  image: string;
  date: Date;
}

const Summary: React.FC<Props> = ({ image, date }) => {
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
          <Line />
        </Box>
      </Card>
    </Box>
  );
};

export default Summary;
