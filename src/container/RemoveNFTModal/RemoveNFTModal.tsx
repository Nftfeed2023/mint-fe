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
  askId: number
  address: string
  tokenId: number
  seller: string
  price: number
  exactPrice: string
  status: string
  collectionName: string
  attributes?: [
    {
      traitType: string
      value: string
    },
  ]
}

const RemoveNFTModal = ({
  data,
  isOpen,
  onClose,
  refetch,
}: {
  data?: IItemInCollection
  isOpen: boolean
  onClose?: () => void
  refetch?: () => void
}) => {
  const { address } = data
  const { askCancelListing, isLoading } = useMarketCollection({
    collection: address,
  })

  const onPressRemove = useCallback(async () => {
    const result = await askCancelListing(data.askId)

    if (result) {
      refetch?.()
      onClose()
    }
  }, [askCancelListing, data.askId, onClose, refetch])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW="504px" mx="20px">
          <ModalHeader fontSize="18px" fontWeight="500" letterSpacing="-0.5px">
            Remove from market
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <Text
              mt="20px"
              fontWeight="400"
              fontSize="16px"
              lineHeight="26px"
              color="black.1d"
            >
              Are you sure to remove this NFT from market?
            </Text>

            <HStack alignItems="flex-start" mt="16px">
              <Image
                w="100px"
                h="100px"
                src={data?.image}
                fallbackSrc="/assets/images/empty-item.png"
                objectFit={'cover'}
                borderRadius="10px"
                bg="white"
                filter="drop-shadow(-3px 3px 8px rgba(0, 0, 0, 0.06)) drop-shadow(3px 3px 8px rgba(0, 0, 0, 0.06))"
              />
              <VStack alignItems="flex-start">
                <HStack alignItems="center">
                  <Text
                    fontSize="15px"
                    lineHeight="18px"
                    letterSpacing="-0.5px"
                    color="grey.66"
                    fontWeight="500"
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
            <Text
              mt="16px"
              fontSize="13px"
              lineHeight="26px"
              color="grey.66"
              fontWeight="400"
              fontStyle="italic"
            >
              This action need to be approved in your wallet
            </Text>
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
              <Box
                flex={1}
                display={{
                  base: 'none',
                  lg: 'block',
                }}
              >
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
                  onClick={onPressRemove}
                  py="9px"
                  h="auto"
                  color="black.1d"
                  isLoading={isLoading}
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

export default RemoveNFTModal
