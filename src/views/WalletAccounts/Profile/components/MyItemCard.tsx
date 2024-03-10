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
  useDisclosure,
} from '@chakra-ui/react'
import { FC } from 'react'

import { ReactComponent as VerifyIcon } from '~/assets/svgs/components/verify.svg'
import { ReactComponent as TokenIcon } from '~/assets/svgs/demo/token-icon.svg'
import SellModal from '~/container/SellNFTModal/SellNFTModal'
import SendNFTModal from '~/container/SendNFTModal/SendNFTModal'

interface ICard {
  address: string
  createdBy: number
  createdDate: string
  description: string
  id: string
  image: string
  name: string
  symbol: string
  tokenId: number
  updatedBy: null
  updatedDate: string
  isVerify?: boolean
  askId: number
  refetch?: () => void
}

const Card: FC<ICard> = ({
  image,
  address,
  name,
  description,
  symbol,
  tokenId,
  askId,
  isVerify = false,
  refetch,
}) => {
  const {
    isOpen: isOpenSellModal,
    onOpen: onOpenSellModal,
    onClose: onCloseSellModal,
  } = useDisclosure()

  const {
    isOpen: isOpenSendModal,
    onOpen: onOpenSendModal,
    onClose: onCloseSendModal,
  } = useDisclosure()

  return (
    <Center>
      <Box h="full" w={'full'} bg="white" rounded="10px" overflow={'hidden'}>
        <Image
          h={'177px'}
          w={'full'}
          src={image || '/assets/images/demo/banner-2.png'}
          objectFit={'cover'}
          borderRadius="8px"
        />

        <Box mt="4px" mb="12px" py="8px" px="12px">
          <Stack justifyContent="space-between" h="100%" align={'start'}>
            <Box>
              <HStack alignItems="flex-start">
                <Text
                  fontSize="12px"
                  lineHeight="24px"
                  letterSpacing="-0.5px"
                  fontWeight="400"
                  color="#5F6774"
                >
                  {symbol}
                </Text>
                {isVerify && <Icon as={VerifyIcon} />}
              </HStack>

              <Text
                fontWeight="600"
                fontSize="15px"
                lineHeight="18px"
                color="black.1d"
                noOfLines={2}
              >
                #{tokenId} - {name}
              </Text>
            </Box>

            <Box marginTop="auto" w="100%">
              <HStack w="100%" mt="14px">
                <Box flex={1}>
                  <Button
                    w="100%"
                    bg="white !important"
                    borderRadius="6px"
                    fontWeight="600"
                    fontSize="13px"
                    lineHeight="20px"
                    h="auto"
                    py="5px"
                    color="black.1d"
                    border="1.5px solid #DFE6F1"
                    onClick={onOpenSendModal}
                  >
                    Send
                  </Button>
                </Box>

                <Box flex={1}>
                  <Button
                    w="100%"
                    bg="yellow.primary !important"
                    borderRadius="6px"
                    fontWeight="600"
                    fontSize="13px"
                    lineHeight="20px"
                    h="auto"
                    py="5px"
                    color="black.1d"
                    border="1.5px solid"
                    borderColor="yellow.primary"
                    onClick={onOpenSellModal}
                    disabled={!isVerify}
                  >
                    Sell
                  </Button>
                </Box>
              </HStack>
            </Box>
          </Stack>
        </Box>
      </Box>

      <SellModal
        isOpen={isOpenSellModal}
        onClose={onCloseSellModal}
        refetch={refetch}
        data={{
          askId,
          image,
          address,
          name,
          description,
          symbol,
          tokenId,
        }}
      />

      <SendNFTModal
        isOpen={isOpenSendModal}
        onClose={onCloseSendModal}
        refetch={refetch}
        data={{
          askId,
          image,
          address,
          name,
          description,

          tokenId,
        }}
      />
    </Center>
  )
}

export default Card
