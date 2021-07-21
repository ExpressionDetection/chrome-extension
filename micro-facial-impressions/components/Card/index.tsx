import { Box, Button, Image, Text } from "../system";
import { format } from "date-fns";

interface Props {
  image: string;
  date: Date;
}

const Card: React.FC<Props> = ({ image, date }) => {
  //   const styles = useStyles();
  return (
    <Box
      display="flex"
      flex="1"
      flexDirection="row"
      alignItems="flex-start"
      justifyContent="flex-start"
      borderRadius="8px"
      boxShadow="0 4px 8px 0 rgba(0,0,0,0.2)"
      m="20px"
      height="300px"
      width="100%"
    >
      <Box bg="secondary.default" width="8px" display="flex" height="100%" borderBottomLeftRadius="8px" borderTopLeftRadius="8px" />
      <Box display="flex" flex="1" flexDirection="column" p="16px">
        <Image src={image} width={1} display="flex" flex={1} borderRadius="16px"/>
        <Text fontSize="h3" color="text.default" my={1}>Title</Text>
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" color="text.light">Was this impression useful?</Text>
          <Box>
            <Button styling="primary" outline mx="4px">yes</Button>
            <Button styling="secondary" outline>no</Button>
          </Box>
        </Box>
        <Text fontSize="sm" color="text.light">{format(date, "HH:mm a")}</Text>
      </Box>
    </Box>
  );
};

export default Card;
