import {
  Box,
  Center,
  Image,
  Text,
  Stack,
  HStack,
  Icon,
  Spacer,
  Button,
} from '@chakra-ui/react'

import { ReactComponent as VerifyIcon } from '~/assets/svgs/components/verify.svg'
import { ReactComponent as TokenIcon } from '~/assets/svgs/demo/token-icon.svg'

interface ICard {}

const Card = ({}) => {
  return (
    <Center>
      <Box w={'full'} bg="white" rounded="10px" overflow={'hidden'}>
        <Image
          h={'177px'}
          w={'full'}
          src={'/assets/images/demo/banner-2.png'}
          objectFit={'cover'}
        />

        <Box mt="4px" mb="12px" py="8px" px="12px">
          <Stack spacing={1} align={'start'}>
            <HStack alignItems="center">
              <Text
                fontSize="12px"
                lineHeight="24px"
                letterSpacing="-0.5px"
                fontWeight="400"
                color="#5F6774"
              >
                CALIMOVE - Shoe NFTs
              </Text>
              <Icon as={VerifyIcon} />
            </HStack>

            <Text
              fontWeight="600"
              fontSize="15px"
              lineHeight="18px"
              color="black.1d"
            >
              #1234 - CALIMOVE to the moon
            </Text>
            <HStack w="100%">
              <HStack>
                <Icon as={TokenIcon} />
                <Text
                  color="blue.darkest"
                  fontSize="15px"
                  lineHeight="20px"
                  fontWeight="600"
                >
                  200
                </Text>
              </HStack>
              <Spacer />
            </HStack>
          </Stack>
        </Box>
      </Box>
    </Center>
  )
}

export default Card
