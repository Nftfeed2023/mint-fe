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

const ClaimCard = () => {
  const { t } = useTranslation('')
  return (
    <Center
      cursor="pointer"
      onClick={() => {}}
      role="group"
      p="12px"
      bg="white"
      borderRadius="10px"
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
            src={'/assets/images/demo/refund-card-demo.png'}
            objectFit={'cover'}
            _groupHover={{
              transform: 'scale(1.1)',
            }}
            borderRadius="6px"
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
          >
            500 BUSD
          </Text>
        </HStack>

        <Box mt="8px">
          <PrimaryButton>{t('claim')}</PrimaryButton>
        </Box>
      </Box>
    </Center>
  )
}

export default ClaimCard
