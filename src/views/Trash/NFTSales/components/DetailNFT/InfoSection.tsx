import { Box, Button, HStack, Stack, Text, Image } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const InfoSection = () => {
  const { t } = useTranslation('src/views/NFTSales/DetailNFT.lang.json')
  return (
    <Stack
      flexDir={{
        base: 'column',
        lg: 'row',
      }}
      spacing={{
        base: '16px',
        lg: '16px',
      }}
    >
      <Box flex={1}>
        <Text
          fontWeight="600"
          fontSize="32px"
          lineHeight="38px"
          color="black.1d"
        >
          Hesman Legend
        </Text>
        <Text
          fontWeight="400"
          fontSize="16px"
          lineHeight="19px"
          color="#666666"
          mt="6px"
        >
          Wandering Nahavi is a community initiative on Solana centered around
          the Nahavi's tale, a civilization situated light years away from
          Earth. Represent the hope of those having lost faith by becoming One
          of The 3808.
        </Text>
      </Box>
      <Box
        display={{
          base: 'flex',
          lg: 'block',
        }}
        flexDir="column"
      >
        <Box
          display={{
            base: 'flex',
            lg: 'block',
          }}
          flexDir="column"
          ml={{
            base: '0',
            lg: '56px',
          }}
        >
          <Button
            order={{
              base: 3,
              lg: 1,
            }}
            mt={{
              base: '16px',
              lg: 0,
            }}
            bg="#F7F9FA !important"
            border="1px solid #DFE6F1"
            borderRadius="12px"
            fontSize="18px"
            lineHeight="21px"
            fontWeight="400"
            color="blue.neutral"
            px="75px"
            py="13px"
            h="auto"
          >
            {t('how_to_join')}
          </Button>
          <HStack
            order={{
              base: 1,
              lg: 2,
            }}
            justifyContent={{
              base: 'space-between',
              lg: 'flex-end',
            }}
            mt="16px"
          >
            <Text
              fontSize="14px"
              lineHeight="21px"
              color="rgba(31, 34, 40, 0.89)"
            >
              {t('total_items')}
            </Text>
            <Text
              fontSize="18px"
              lineHeight="21px"
              fontWeight="600"
              color="blue.neutral"
            >
              1000 NFTs
            </Text>
          </HStack>
          <HStack
            order={{
              base: 2,
              lg: 3,
            }}
            justifyContent={{
              base: 'space-between',
              lg: 'flex-end',
            }}
            mt="9px"
          >
            <Text
              fontSize="14px"
              lineHeight="21px"
              color="rgba(31, 34, 40, 0.89)"
            >
              {t('deposit')}
            </Text>
            <HStack>
              <Image src="/assets/images/demo/busd.svg" w="24px" h="24px" />
              <Text
                fontSize="18px"
                lineHeight="21px"
                fontWeight="600"
                color="blue.neutral"
              >
                BUSD
              </Text>
            </HStack>
          </HStack>
        </Box>
      </Box>
    </Stack>
  )
}

export default InfoSection
