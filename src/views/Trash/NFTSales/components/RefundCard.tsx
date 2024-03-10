import {
  Box,
  Image,
  Center,
  Text,
  HStack,
  Spacer,
  Button,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import PrimaryButton from '~/components/PrimaryButton'

const RefundCard = () => {
  const { t } = useTranslation(
    'src/views/NFTSales/components/RefundCard.lang.json',
  )
  return (
    <Center
      cursor="pointer"
      onClick={() => {}}
      role="group"
      p={{
        base: 0,
        lg: '12px',
      }}
      bg="white"
      borderRadius="10px"
      border="1px solid transparent"
      _groupHover={{
        border: '1px solid #DFE6F1',
        filter:
          'drop-shadow(0px -4px 10px rgba(0, 0, 0, 0.1)) drop-shadow(0px 3px 10px rgba(0, 0, 0, 0.1))',
      }}
    >
      <Box
        w={'full'}
        bg="white"
        rounded="12px"
        overflow={'hidden'}
        transition="all 250ms"
      >
        <Box position="relative">
          <Image
            borderRadius="10px"
            h={'273px'}
            maxH="273px"
            overflow="hidden"
            w={'full'}
            src={'/assets/images/demo/refund-card-demo.png'}
            objectFit={'cover'}
            _groupHover={{
              transform: 'scale(1.1)',
            }}
          />
        </Box>
        <Text
          fontSize="24px"
          lineHeight="28px"
          fontWeight="700"
          color="black"
          mt="24px"
          textTransform="capitalize"
        >
          Diamond box
        </Text>

        <HStack mt="24px">
          <Text
            fontSize="16px"
            lineHeight="19px"
            fontWeight="400"
            color="rgba(31, 34, 40, 0.89)"
          >
            {t('start_date')}
          </Text>
          <Spacer />
          <Text
            fontSize="16px"
            lineHeight="19px"
            fontWeight="600"
            color="blue.neutral"
            textAlign="right"
          >
            2020/05/20 10:00:00 UTC
          </Text>
        </HStack>
        <HStack mt="12px">
          <Text
            fontSize="16px"
            lineHeight="19px"
            fontWeight="400"
            color="rgba(31, 34, 40, 0.89)"
          >
            {t('end_date')}
          </Text>
          <Spacer />
          <Text
            fontSize="16px"
            lineHeight="19px"
            fontWeight="600"
            color="blue.neutral"
            textAlign="right"
          >
            2020/05/20 10:00:00 UTC
          </Text>
        </HStack>
        <HStack mt="12px">
          <Text
            fontSize="16px"
            lineHeight="19px"
            fontWeight="400"
            color="rgba(31, 34, 40, 0.89)"
          >
            {t('your_deposited')}
          </Text>
          <Spacer />
          <Text
            fontSize="16px"
            lineHeight="19px"
            fontWeight="600"
            color="blue.neutral"
            textAlign="right"
          >
            500 BUSD
          </Text>
        </HStack>

        <Box mt="8px">
          <PrimaryButton>{t('refund')}</PrimaryButton>
        </Box>
      </Box>
    </Center>
  )
}

export default RefundCard
