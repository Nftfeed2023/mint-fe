import {
  Box,
  Grid,
  GridItem,
  HStack,
  Spacer,
  Text,
  VStack,
  Image,
  Input,
} from '@chakra-ui/react'

import BNBIcon from '~/components/Icons/BNB'

import PrimaryButton from '~/components/PrimaryButton'
import ButtonInfoNFT from '../ButtonInfoNFT'

const NFTCardSingle = () => {
  return (
    <Box>
      <Grid templateColumns="repeat(2, 1fr)" gap={5}>
        <GridItem
          colSpan={{ base: 2, lg: 1 }}
          bg="grey.light"
          w="100%"
          borderWidth="1px"
          borderStyle="solid"
          borderColor="#DFE6F1"
          borderRadius="10px"
          order={{
            base: 2,
            lg: 1,
          }}
        >
          <VStack
            w="100%"
            h="100%"
            alignItems="flex-start"
            justifyContent="space-between"
            p={{
              base: '12px',
              lg: '24px',
            }}
          >
            <Text
              fontSize="24px"
              lineHeight="28px"
              fontWeight="700"
              color="black"
              textTransform="capitalize"
            >
              Diamond box
            </Text>
            <Box w="100%">
              <HStack w="100%">
                <Text
                  fontSize="16px"
                  lineHeight="19px"
                  fontWeight="400"
                  color="rgba(31, 34, 40, 0.89)"
                >
                  Price
                </Text>
                <Spacer />
                <HStack>
                  <BNBIcon />
                  <Text
                    fontSize="16px"
                    lineHeight="19px"
                    fontWeight="600"
                    color="blue.neutral"
                  >
                    500 BUSD
                  </Text>
                </HStack>
              </HStack>
              <HStack w="100%" mt="12px">
                <Text
                  fontSize="16px"
                  lineHeight="19px"
                  fontWeight="400"
                  color="rgba(31, 34, 40, 0.89)"
                >
                  Your Bought/ Allocation
                </Text>
                <Spacer />
                <Text
                  fontSize="16px"
                  lineHeight="19px"
                  fontWeight="600"
                  color="grey.c8"
                >
                  <Text as="span" color="blue.neutral">
                    3
                  </Text>
                  /10
                </Text>
              </HStack>
            </Box>

            <Box w="100%">
              <Box mt="8px" w="100%">
                <Text
                  fontSize="16px"
                  lineHeight="19px"
                  fontWeight="400"
                  color="rgba(31, 34, 40, 0.89)"
                >
                  enter_amount
                </Text>
                <Input mt="6px" />
              </Box>

              <PrimaryButton mt="8px">Approve</PrimaryButton>
            </Box>
          </VStack>
        </GridItem>
        <GridItem
          order={{
            base: 1,
            lg: 2,
          }}
          colSpan={{
            base: 2,
            lg: 1,
          }}
        >
          <Box position="relative">
            <Image
              h={'273px'}
              maxH="284px"
              overflow="hidden"
              w={'full'}
              src={'/assets/images/demo/nft-demo.png'}
              objectFit={'cover'}
              _groupHover={{
                transform: 'scale(1.1)',
              }}
              borderRadius="6px"
            />
            <Box
              position={'absolute'}
              right="0px"
              top="10px"
              transition="all 250ms"
              zIndex="5"
            >
              <ButtonInfoNFT />
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  )
}

export default NFTCardSingle
