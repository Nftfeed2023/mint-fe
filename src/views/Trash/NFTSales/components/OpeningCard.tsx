import { Box, Grid, GridItem, HStack, Text, Image } from '@chakra-ui/react'
import BNBIcon from '~/components/Icons/BNB'

import DiscordIcon from '~/components/Icons/Discord'
import GlobalIcon from '~/components/Icons/Global'
import TwitterIcon from '~/components/Icons/Twitter'
import PrimaryButton from '~/components/PrimaryButton'

import { AuditTag, TopTrending, TopVotingTag } from './Tag'

const OpeningCard = () => {
  return (
    <Box>
      <Grid
        templateColumns="repeat(2, 1fr)"
        gap={4}
        bg="#FFFFFF"
        borderRadius="24px"
        p={{
          base: '0',
          lg: '24px',
        }}
      >
        <GridItem
          colSpan={{
            base: 2,
            lg: 1,
          }}
          order={{
            base: 2,
            lg: 1,
          }}
        >
          <Text
            fontWeight="600"
            fontSize="42px"
            lineHeight="49px"
            textAlign="justify"
            color="black.1d"
          >
            Hesman Legend
          </Text>
          <HStack mt="12px">
            <DiscordIcon />
            <TwitterIcon />
            <GlobalIcon />
          </HStack>
          <HStack mt="12px">
            <AuditTag />
            <TopVotingTag />
            <TopTrending />
          </HStack>

          <HStack mt="42px">
            <Text
              fontSize="14px"
              lineHeight="21px"
              color="black.light"
              fontWeight="400"
              textAlign="justify"
              w="140px"
            >
              From (UTC):
            </Text>
            <Text
              fontSize="14px"
              lineHeight="21px"
              color="black.light"
              fontWeight="600"
              textAlign="justify"
            >
              2020/06/06 10:00:00
            </Text>
          </HStack>
          <HStack mt="4px">
            <Text
              fontSize="14px"
              lineHeight="21px"
              color="black.light"
              fontWeight="400"
              textAlign="justify"
              w="140px"
            >
              From (UTC):
            </Text>
            <Text
              fontSize="14px"
              lineHeight="21px"
              color="black.light"
              fontWeight="600"
              textAlign="justify"
            >
              2020/06/06 10:00:00
            </Text>
          </HStack>

          <HStack mt="42px">
            <Text
              fontSize="14px"
              lineHeight="21px"
              color="black.light"
              fontWeight="400"
              textAlign="justify"
              w="140px"
            >
              Total items:
            </Text>
            <Text
              fontSize="14px"
              lineHeight="21px"
              color="blue.neutral"
              fontWeight="600"
              textAlign="justify"
            >
              100 NFTs
            </Text>
          </HStack>
          <HStack mt="4px">
            <Text
              fontSize="14px"
              lineHeight="21px"
              color="black.light"
              fontWeight="400"
              textAlign="justify"
              w="140px"
            >
              Deposit:
            </Text>
            <HStack>
              <BNBIcon />
              <Text
                fontSize="14px"
                lineHeight="21px"
                color="blue.neutral"
                fontWeight="600"
                textAlign="justify"
              >
                BUSD
              </Text>
            </HStack>
          </HStack>

          <PrimaryButton mt="42px">Go to buy</PrimaryButton>
        </GridItem>
        <GridItem
          colSpan={{
            base: 2,
            lg: 1,
          }}
          order={{
            base: 1,
            lg: 2,
          }}
        >
          <Image
            src="/assets/images/demo/opening-section-demo.png"
            maxH="408px"
            maxW="408px"
            w="100%"
          />
        </GridItem>
      </Grid>
    </Box>
  )
}

export default OpeningCard
