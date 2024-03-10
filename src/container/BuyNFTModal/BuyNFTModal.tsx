import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  HStack,
  Image,
  VStack,
  Icon,
  Box,
  Divider,
} from '@chakra-ui/react'

import { useCallback } from 'react'

import { ReactComponent as VerifyIcon } from '~/assets/svgs/components/verify.svg'

import PrimaryButton from '~/components/PrimaryButton'
import { useMarketCollection } from '~/hooks/market/useMarketCollection'

interface IItemInCollection {
  name: string
  image: string
  description: string
  id: string
  createdDate: string
  updatedDate: string
  createdBy: null
  updatedBy: null
  version: number
  askId?: number
  address: string
  tokenId: number
  seller: string
  price: number
  exactPrice: string
  status: string
  collectionName?: string
  symbol?: string
  attributes?: [
    {
      traitType: string
      value: string
    },
  ]
}

const BuyNFTModal = ({
  data,
  isOpen,
  onClose,
  refresh,
}: {
  data?: IItemInCollection
  isOpen: boolean
  onClose?: () => void
  refresh?: () => void
}) => {
  const { address, tokenId } = data

  const { askSale, isLoading } = useMarketCollection({ collection: address })

  const onClickBuy = useCallback(async () => {
    const results = await askSale(data.askId, data.exactPrice)
    if (refresh) {
      refresh()
    }
    if (results) {
      onClose()
    }
  }, [askSale, data.askId, data.exactPrice, onClose, refresh])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW="729px" mx="20px">
          <ModalHeader
            fontSize="18px"
            fontWeight="500"
            letterSpacing="-0.5px"
            lineHeight="21px"
            px={{
              base: '10px',
              lg: '20px',
            }}
            py="12px"
          >
            Buy NTF
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody
            px={{
              base: '20px',
              lg: '40px',
            }}
            py="30px"
          >
            <Text
              mt="10px"
              fontSize="18px"
              fontWeight="600"
              letterSpacing="-0.5px"
              lineHeight="20px"
              color="blue.neutral"
              textTransform="uppercase"
            >
              FIXED PRICE
            </Text>
            <HStack marginTop="10px">
              <Image src="/assets/images/demo/busd.svg" />
              <Text
                fontSize="20px"
                lineHeight="20px"
                color="blue.darker"
                fontWeight="600"
              >
                {data?.price}
              </Text>
            </HStack>

            <Text
              mt="20px"
              fontWeight="500"
              fontSize="16px"
              lineHeight="24px"
              color="black.light"
            >
              Listing is FREE! When the sale succeeds, the following fees will
              be charged.
            </Text>

            <HStack mt="10px">
              <Text
                fontWeight="400"
                fontSize="15px"
                lineHeight="18px"
                color="black.light"
                w="141px"
                letterSpacing="-0.5px"
              >
                Transaction Fee
              </Text>
              <Text
                fontWeight="400"
                fontSize="15px"
                lineHeight="18px"
                color="black.light"
              >
                2%
              </Text>
            </HStack>

            <HStack mt="10px">
              <Text
                fontWeight="400"
                fontSize="15px"
                lineHeight="18px"
                color="black.light"
                w="141px"
                letterSpacing="-0.5px"
              >
                Listing/ Cancel/ Fee
              </Text>
              <Text
                fontWeight="500"
                fontSize="15px"
                lineHeight="18px"
                color="blue.neutral"
              >
                FREE
              </Text>
            </HStack>

            <HStack alignItems="flex-start" mt="40px">
              <Image
                w="100px"
                h="100px"
                src={data?.image}
                fallbackSrc="/assets/images/empty-item.png"
                objectFit={'contain'}
                borderRadius="10px"
                background="white"
                filter="drop-shadow(-3px 3px 8px rgba(0, 0, 0, 0.06)) drop-shadow(3px 3px 8px rgba(0, 0, 0, 0.06))"
              />
              <VStack alignItems="flex-start">
                <HStack alignItems="center">
                  <Text
                    fontSize="15px"
                    lineHeight="18px"
                    letterSpacing="-0.5px"
                    color="grey.66"
                  >
                    {data?.collectionName}
                  </Text>
                  <Icon as={VerifyIcon} />
                </HStack>

                <Text
                  mt="12px"
                  fontSize="18px"
                  lineHeight="21px"
                  fontWeight="600"
                  color="black.1d"
                  letterSpacing="-0.5px"
                >
                  {data?.name} #{data?.tokenId}
                </Text>
              </VStack>
            </HStack>
          </ModalBody>

          <ModalFooter w="100%" mt="30px">
            <HStack
              flex={1}
              w="100%"
              spacing={{
                base: 0,
                lg: '20px',
              }}
            >
              <Box flex={1} display={{ base: 'none', lg: 'block' }}>
                <Button
                  w="100%"
                  fontSize="20px"
                  lineHeight="23px"
                  color="black.1d"
                  letterSpacing="-0.5px"
                  fontWeight="500"
                  borderRadius="12px"
                  border="2px solid #DFE6F1"
                  onClick={onClose}
                  py="9px"
                  h="auto"
                  bg="white !important"
                >
                  Cancel
                </Button>
              </Box>

              <Box flex={1}>
                <PrimaryButton
                  w="100%"
                  fontSize="20px"
                  lineHeight="23px"
                  bg="yellow.primary"
                  letterSpacing="-0.5px"
                  fontWeight="500"
                  borderRadius="12px"
                  border="2px solid yellow.primary"
                  onClick={onClickBuy}
                  isLoading={isLoading}
                  py="9px"
                  h="auto"
                  color="black.1d"
                // disabled={!price}
                >
                  Confirm
                </PrimaryButton>
              </Box>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default BuyNFTModal
