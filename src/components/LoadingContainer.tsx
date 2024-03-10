import { Box, Spinner } from "@chakra-ui/react";

const LoadingContainer = ({ isLoading, children }) => {
  return (
    <Box position="relative" >
      {isLoading && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          // backgroundColor="rgba(0, 0, 0, 0.5)"
          backgroundColor="transparent"
          zIndex="9999"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner color="red" size="xl" position="absolute" top="10%" left="50%" transform="translate(-50%, -50%)" />
        </Box>
      )}
      {children}
    </Box>
  );
};

export default LoadingContainer;
