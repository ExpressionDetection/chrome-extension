import { Box, Button, Text } from "../system";
import Timer from "./Timer";

const TimelineHeader = ({ toggleSession, isActive }) => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      bg="white"
      height="40px"
      width="100%"
      zIndex="999"
      boxShadow="0px 2px 10px rgba(0, 0, 0, 0.08)"
    >
      <Box
        display="flex"
        px="md"
        flex="1"
        width="100%"
        height="100%"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        position="relative"
      >
        <Box
          display="flex"
          flex="1"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Box
            width="10px"
            bg={isActive ? "red" : "gray"}
            height="10px"
            borderRadius="5px"
            mr="sm"
          />
          <Timer isActive={isActive} />
        </Box>
        <Text styling="semi-bold" position="absolute" left="calc(50% - 50px)">
          Timeline
        </Text>
        <Box
          display="flex"
          flex="1"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Text styling="light">{isActive ? "Stop" : "Start"} Session</Text>
          <Button styling="base" p="sm" onClick={toggleSession}>
            {isActive ? (
              <img src="/pause.svg" color="black" />
            ) : (
              <img src="/start.svg" color="black" height="10px" />
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TimelineHeader;
