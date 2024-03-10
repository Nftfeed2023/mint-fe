import {
  Box,
  Image,
  Center,
  Text,
  HStack,
  Spacer,
  Input,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import MaxInput from '~/components/MaxInput'

import PrimaryButton from '~/components/PrimaryButton'

import ButtonInfoNFT from './ButtonInfoNFT'

const NFTCard = ({ isClosed = false }) => {
  const { t } = useTranslation('')
  return (
    <Center
      cursor="pointer"
      onClick={() => {}}
      role="group"
      bg="grey.light"
      borderRadius="12px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="grey.light_blue"
      p="8px"
      _groupHover={{
        // border: '1px solid #DFE6F1',
        filter:
          'drop-shadow(0px -4px 10px rgba(0, 0, 0, 0.1)) drop-shadow(0px 3px 10px rgba(0, 0, 0, 0.1))',
      }}
    >
      <Box
        w={'full'}
        rounded="12px"
        overflow={'hidden'}
        transition="all 250ms"
        border="1px solid transparent"
      >
        <Box position="relative" overflow="hidden" borderRadius="6px">
          <Image
            h={'273px'}
            maxH="273px"
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
            display="none"
            position={'absolute'}
            right="0px"
            top="10px"
            transition="all 250ms"
            _groupHover={{
              display: 'block',
            }}
            zIndex="5"
          >
            <ButtonInfoNFT />
          </Box>
        </Box>

        <Box mt="12px">
          <Text
            fontSize="18px"
            lineHeight="21px"
            fontWeight="700"
            color="black.1d"
            textAlign="center"
          >
            Hesman Legend
          </Text>

          <HStack mt="12px">
            <Text
              fontSize="16px"
              lineHeight="19px"
              fontWeight="400"
              color="rgba(31, 34, 40, 0.89)"
            >
              {t('price')}
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
          <HStack mt="8px">
            <Text
              fontSize="16px"
              lineHeight="19px"
              fontWeight="400"
              color="rgba(31, 34, 40, 0.89)"
            >
              {t('your_deposited_allocation')}
            </Text>
            <Spacer />
            <Text
              fontSize="16px"
              lineHeight="19px"
              fontWeight="600"
              color="blue.neutral"
            >
              BUSD
            </Text>
          </HStack>

          <Box mt="8px">
            <Text>{t('enter_amount')}</Text>
            <MaxInput />
          </Box>

          <PrimaryButton mt="8px">Approve</PrimaryButton>
        </Box>
      </Box>
    </Center>
  )
}

export default NFTCard
