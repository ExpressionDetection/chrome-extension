import { Box } from "../system";

const Card: React.FC<{ border?: boolean, css?: any }> = ({ children, border = true, ...rest }) => {
  return (
    <Box
      display="flex"
      flex="1"
      flexDirection="row"
      alignItems="flex-start"
      justifyContent="flex-start"
      bg="background.card"
      borderRadius="16px"
      boxShadow="0px 0px 10px rgba(0, 0, 0, 0.08)"
      height="300px"
      width="100%"
      {...rest}
    >
      {border && (
        <Box
          bg="primary.default"
          width="16px"
          display="flex"
          height="100%"
          borderBottomLeftRadius="16px"
          borderTopLeftRadius="16px"
        />
      )}
      {children}
    </Box>
  );
};

export default Card;
