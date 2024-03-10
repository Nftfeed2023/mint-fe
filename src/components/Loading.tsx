import { Flex, Spinner } from '@chakra-ui/react'

const Loading = () => {
  return (
    <Flex flex={1} justifyContent="center" alignItems="center">
      <Spinner color="yellow.primary" size="lg" />
    </Flex>
  )
}

export default Loading
