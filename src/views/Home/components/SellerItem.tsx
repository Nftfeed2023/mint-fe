import { Box, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react'
import { ReactComponent as CardIcon } from '~/assets/svgs/card.svg'

const SellerItem = () => {
  return (
    <Box bg="white" px="23px" py="15px" borderRadius="20px">
      <HStack>
        <Image src="/assets/images/demo/seller.png" w="70px" h="70px" />
        <VStack alignItems="flex-start" spacing="10px">
          {/* <Text
            fontWeight="600"
            fontSize="15px"
            lineHeight="18px"
            letterSpacing="-0.5px"
            color="black.1d"
          >
            CryptoPunk
          </Text> */}

          <HStack>
            <Icon as={CardIcon} w="20px" h="20px" />
            <Text
              color="black.light"
              fontWeight="500"
              fontSize="13px"
              lineHeight="15px"
            >
              100 transactions
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  )
}

export default SellerItem
