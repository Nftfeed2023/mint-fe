import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Image,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { ReactComponent as TokenIcon } from '~/assets/svgs/demo/token-icon.svg'
import { ReactComponent as VerifyIcon } from '~/assets/svgs/components/verify.svg'

const ItemCardMobile = ({ isSold = false }) => {
  return (
    <Box>
      <Image
        h={'180px'}
        w={'full'}
        src={'/assets/images/demo/collection-monkey.png'}
        objectFit={'cover'}
        borderRadius="10px"
      />
      <Text
        fontSize="12px"
        lineHeight="18px"
        color="secondary"
        fontWeight="600"
        mt="10px"
      >
        CALIMOVE LOREM IPSUM DOL
      </Text>
      {/* <HStack alignItems="center">
        <Heading
          fontSize={{
            base: '10px',
            md: '15px',
          }}
          color="black.1d"
          lineHeight="18px"
          letterSpacing="-0.5px"
          fontWeight="400"
        >
          Created by CryptoPunk
        </Heading>
        <Icon as={VerifyIcon} w="10px" h="10px" />
      </HStack> */}
      <HStack w="100%">
        <HStack>
          <Icon as={TokenIcon} />
          <Text
            color="secondary"
            fontSize="12px"
            lineHeight="18px"
            fontWeight="600"
          >
            200
          </Text>
        </HStack>
        <Spacer />
        {/* {!isSold && (
            <Button
              bg="yellow.primary !important"
              borderRadius="6px"
              fontWeight="600"
              fontSize="13px"
              lineHeight="20px"
              h="auto"
              py="5px"
              color="black.1d"
            >
              Buy
            </Button>
          )} */}
      </HStack>
    </Box>
  )
}

export default ItemCardMobile
