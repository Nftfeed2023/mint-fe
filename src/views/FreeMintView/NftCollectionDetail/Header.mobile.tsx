import { Box, HStack, Text } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

const HeaderMobile = () => {
  const navigate = useNavigate()
  return (
    <Box
      position="fixed"
      top={0}
      zIndex={10}
      w="100%"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.05)"
      display={{
        base: 'flex',
        lg: 'none',
      }}
      left={0}
      right={0}
      bg="white"
    >
      <Box h="30px" pl="20px" bg="white" />
      <Box h="50px" bg="white">
        <HStack
          onClick={() => {
            navigate(-1)
          }}
          w="100%"
          h="100%"
          alignItems="center"
        >
          <ArrowBackIcon w="24px" h="24px" />
          <Text
            fontSize="16px"
            lineHeight="22px"
            color="black"
            fontWeight="600"
          >
            Collection
          </Text>
        </HStack>
      </Box>
    </Box>
  )
}

export default HeaderMobile
