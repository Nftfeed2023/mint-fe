import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  HStack,
  Icon,
} from '@chakra-ui/react'
import { ReactComponent as VerifyIcon } from '~/assets/svgs/components/verify.svg'

interface ICollectionItem { }

const CollectionItem = ({ }) => {
  return (
    <Center>
      <Box w={'full'} bg="white" rounded="10px" overflow={'hidden'}>
        <Image
          h={'130px'}
          w={'full'}
          src={'/assets/images/demo/banner.png'}
          objectFit={'cover'}
        />
        <Flex justify={'center'} mt={-6}>
          <Avatar size="48px" src="/assets/images/demo/avatar.png" />
        </Flex>

        <Box mt="4px" mb="12px">
          <Stack spacing={1} align={'center'}>
            <HStack alignItems="center">
              <Heading
                fontSize="15px"
                color="black.1d"
                lineHeight="18px"
                letterSpacing="-0.5px"
                fontWeight="600"
              >
                CALIMOVE - Shoe NFTs
              </Heading>
              <Icon as={VerifyIcon} />
            </HStack>

            {/* <Text
              fontWeight="400"
              fontSize="13px"
              lineHeight="15.5px"
              color="grey.66"
            >
              Created by{' '}
              <Text fontWeight="500" color="black.light" as="span">
                CryptoPunk
              </Text>
            </Text> */}
          </Stack>
        </Box>
      </Box>
    </Center>
  )
}

export default CollectionItem
