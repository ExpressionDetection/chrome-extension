import { useRouter } from "next/dist/client/router";
import { Box, Button } from "../components/system";

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
    >
      <Button
        justifyContent="center"
        alignItems="center"
        styling="base"
        bg="white"
        width="130px"
        height="130px"
        borderRadius="65px"
        onClick={() => router.push("/timeline")}
      >
        <img src="/start.svg" />
      </Button>
    </Box>
  );
};

export default StartPage;
