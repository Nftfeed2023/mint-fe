import { Box, } from "@chakra-ui/react";

const BoxLayout = ({ children }) => {

  return (
    <Box
      w="full"
      p={{
        base: "90px 5px",
        lg: "20px",
      }}
    >
      {children}
    </Box>
  )
}

export default BoxLayout;
