import { useRouter } from "next/dist/client/router";
import { Box, Button, Text } from "../components/system";

const StartPage = () => {
  const router = useRouter();
  return (
    <Box
      display="flex"
      flex="1"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bg="primary.default"
      height="100vh"
      p="lg"
    >
      <Text styling="bold" fontSize="lg" color="primary.contrast">
        Start Sentiment Analysis
      </Text>
      <Button
        justifyContent="center"
        alignItems="center"
        styling="base"
        bg="white"
        width="130px"
        height="130px"
        borderRadius="65px"
        my="lg"
        onClick={() => router.push("/frame-selection")}
      >
        <img src="/start.svg" />
      </Button>
      <Text styling="light" fontSize="md" color="primary.contrast">
        Gather and store information of this call and usefull data from the best
        AI Models in the market
      </Text>
    </Box>
  );
};

export default StartPage;
