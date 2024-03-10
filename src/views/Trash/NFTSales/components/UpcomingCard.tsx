import { Box, Image, Center, Text, HStack, Spacer } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import BNBIcon from '~/components/Icons/BNB'

import {
  AuditTag,
  DateTag,
  KYCTag,
  StatusTag,
  TopTrending,
  TopVotingTag,
} from './Tag'

const UpcomingCard = ({ isClosed = false }) => {
  const { t } = useTranslation(
    'src/views/NFTSales/components/UpcomingCard.lang.json',
  )
  const navigate = useNavigate()
  return (
    <Center
      cursor="pointer"
      role="group"
      bg={{
        base: 'grey.light',
        lg: 'white',
      }}
      border={{
        base: '1px solid #DFE6F1',
        lg: 'none',
      }}
      borderRadius="12px"
      onClick={() => {
        navigate('/nft-sales/all-projects/1')
      }}
    >
      <Box
        w={'full'}
        bg="white"
        rounded="12px"
        overflow={'hidden'}
        transition="all 250ms"
        border="1px solid transparent"
        _groupHover={{
          border: '1px solid #DFE6F1',
          filter:
            'drop-shadow(0px -4px 10px rgba(0, 0, 0, 0.1)) drop-shadow(0px 3px 10px rgba(0, 0, 0, 0.1))',
        }}
      >
        <Box position="relative">
          <Image
            h={'273px'}
            maxH="273px"
            overflow="hidden"
            w={'full'}
            src={'/assets/images/demo/upcoming-demo.png'}
            objectFit={'cover'}
            _groupHover={{
              transform: 'scale(1.1)',
            }}
            borderRadius="6px"
          />
        </Box>

        <Box p="24px">
          <HStack spacing={'10px'}>
            <Box flex={1}>
              <Text
                fontSize="24px"
                lineHeight="28px"
                fontWeight="700"
                color="black.1d"
              >
                Hesman Legend
              </Text>
            </Box>
            {isClosed ? <StatusTag /> : <DateTag />}
          </HStack>
          {isClosed ? (
            <HStack mt="12px">
              <AuditTag /> <TopTrending />
            </HStack>
          ) : (
            <HStack mt="12px">
              <KYCTag /> <TopVotingTag />
            </HStack>
          )}
          <HStack mt="24px">
            <Text
              fontSize="16px"
              lineHeight="19px"
              fontWeight="400"
              color="rgba(31, 34, 40, 0.89)"
            >
              {t('pool_allocation')}
            </Text>
            <Spacer />
            <Text
              fontSize="16px"
              lineHeight="19px"
              fontWeight="600"
              color="blue.neutral"
            >
              (TBA) NFTs
            </Text>
          </HStack>
          <HStack mt="12px">
            <Text
              fontSize="16px"
              lineHeight="19px"
              fontWeight="400"
              color="rgba(31, 34, 40, 0.89)"
            >
              {t('deposit')}
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
                BUSD
              </Text>
            </HStack>
          </HStack>
        </Box>
      </Box>
    </Center>
  )
}

export default UpcomingCard
