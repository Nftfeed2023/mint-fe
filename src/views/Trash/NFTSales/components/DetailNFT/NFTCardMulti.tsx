import {
  Box,
  Divider,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'

import PrimaryButton from '~/components/PrimaryButton'
import { ReactComponent as InfoIcon } from '~/assets/svgs/info.svg'
import NFTCard from '../NFTCard'

const NFTCardMulti = () => {
  return (
    <Box>
      {/* <HStack
        w="100%"
        justifyContent="space-between"
        spacing={{
          base: '16px',
          xxl: '20px',
        }}
      >

      </HStack> */}

      <SimpleGrid
        columns={{
          base: 2,
          lg: 5,
        }}
        spacing="12px"
      >
        {[
          {
            title: 'Your Allocation',
            amount: 0,
          },
          {
            title: 'Your Deposited',
            amount: 0,
            src: '/assets/images/demo/busd.svg',
          },
          {
            title: 'Pool Total Deposited',
            amount: 100,
            src: '/assets/images/demo/busd.svg',
          },
          {
            title: 'Total NFT Sold',
            amount: 1070,
          },
          {
            title: 'Deposit Fee',
            amount: 0,
          },
        ].map((item) => {
          return (
            <Box
              flex={1}
              bg="#F3F6F9"
              py="15px"
              borderRadius="12px"
              border="1px solid #F3F6F9"
            >
              <VStack>
                <Text
                  fontSize="14px"
                  lineHeight="16px"
                  textTransform="uppercase"
                  color="black.lighter"
                  fontWeight="500"
                  textAlign="center"
                >
                  {item.title}
                </Text>
                <HStack>
                  {item?.src && <Image src={item.src} w="24px" h="24px" />}
                  <Text
                    fontSize="16px"
                    lineHeight="19px"
                    color="blue.darker"
                    fontWeight="600"
                  >
                    {item.amount}
                  </Text>
                </HStack>
              </VStack>
            </Box>
          )
        })}
      </SimpleGrid>
      <Stack
        mt="32px"
        flexDir={{
          base: 'column',
          lg: 'row',
        }}
      >
        <Stack
          flexDir={{
            base: 'column',
            lg: 'row',
          }}
          alignItems="flex-start"
          spacing={{
            base: '16px',
            lg: '0',
          }}
        >
          <Text
            fontSize="24px"
            lineHeight="29px"
            color="#448AFF"
            letterSpacing="-0.5px"
            textTransform="capitalize"
            fontWeight="700"
          >
            Hesman legend NFTs
          </Text>
          <Box>
            <HStack
              ml={{
                lg: '16px',
              }}
              spacing="12px"
            >
              <HStack>
                <PrimaryButton>Whitelist</PrimaryButton>
                <Icon as={InfoIcon} />
              </HStack>
              <Divider orientation="vertical" h="33px" />
              <Box>
                <PrimaryButton disabled>Public</PrimaryButton>
              </Box>
            </HStack>
          </Box>
        </Stack>
        <Spacer />

        <VStack>
          <HStack
            w="100%"
            justifyContent={{
              base: 'space-between',
            }}
          >
            <Text
              fontSize="14px"
              lineHeight="16px"
              fontWeight="400"
              color="black.light"
            >
              From (UTC):
            </Text>
            <Text
              fontSize="14px"
              lineHeight="16px"
              fontWeight="600"
              color="black.light"
            >
              2020/06/06 10:00:00
            </Text>
          </HStack>
          <HStack
            w="100%"
            justifyContent={{
              base: 'space-between',
            }}
          >
            <Text
              fontSize="14px"
              lineHeight="16px"
              fontWeight="400"
              color="black.light"
            >
              To (UTC):
            </Text>
            <Text
              fontSize="14px"
              lineHeight="16px"
              fontWeight="600"
              color="black.light"
            >
              2020/06/06 10:00:20
            </Text>
          </HStack>
        </VStack>
      </Stack>
      <SimpleGrid
        mt="30px"
        columns={{
          base: 1,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        spacing="12px"
      >
        {[1, 2, 3, 4].map((item) => {
          return <NFTCard key={item} />
        })}
      </SimpleGrid>
      {/* <Box mt="24px">
        <NFTCardSingle />
      </Box> */}
    </Box>
  )
}

export default NFTCardMulti
