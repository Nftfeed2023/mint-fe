import { Flex, Icon, Text } from '@chakra-ui/react'
import { ReactComponent as EmptyBoxIcon } from '~/assets/svgs/empty-box.svg'

const EmptyData = (props: { tiltle?: string }) => {
  return (
    <Flex flex={1} justify="center" align="center" flexDir="column" my="100px">
      <Icon as={EmptyBoxIcon} w="147px" h="162px" />
      <Text
        color="grey.97"
        fontSize="15px"
        fontWeight="400"
        lineHeight="18px"
        letterSpacing="-0.5px"
        mt="26px"
      >
        {props.tiltle ? props.tiltle : "You have no item"}
      </Text>
    </Flex>
  )
}

export default EmptyData
