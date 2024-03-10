import { Flex, Text } from '@chakra-ui/react'

const EmptyTable = () => {
  return (
    <Flex
      bg="white"
      py="30px"
      flex={1}
      justifyContent="center"
      alignItems="center"
    >
      <Text
        color="#C8C8C8"
        fontSize="18px"
        lineHeight="21px"
        textAlign="center"
      >
        No record
      </Text>
    </Flex>
  )
}

export default EmptyTable
