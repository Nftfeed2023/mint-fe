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
} from '@chakra-ui/react'
import { useCallback, useState } from 'react'

import { ReactComponent as VerifyIcon } from '~/assets/svgs/components/verify.svg'

import AddressInput from '~/components/AddressInput'
import PrimaryButton from '~/components/PrimaryButton'
import { useMarketCollection } from '~/hooks/market/useMarketCollection'

interface IItemInCollection {
  name?: string
  image?: string
  description?: string
  id?: string
  createdDate?: string
  updatedDate?: string
  createdBy?: null
  updatedBy?: null
  version?: number
  askId?: number
  address?: string
  tokenId?: number
  seller?: string
  price?: number
  exactPrice?: string
  status?: string
  collectionName?: string
  attributes?: [
    {
      traitType: string
      value: string
    },
  ]
}

const SendNFTModal = ({
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
  const { sendNft, isLoading } = useMarketCollection({
    collection: address,
  })

  const [addressInput, setAddressInput] = useState('')

  const onPressSend = useCallback(async () => {
    const result = await sendNft(data.tokenId, addressInput)

    if (result) {
      refetch?.()
      onClose()
    }
  }, [addressInput, data.tokenId, onClose, refetch, sendNft])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="729px" mx="20px">
          <ModalHeader fontSize="18px" fontWeight="500" letterSpacing="-0.5px">
            Send
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text
              mt="20px"
              fontWeight="400"
              fontSize="18px"
              lineHeight="20px"
              color="grey.66"
              mb="8px"
            >
              Send to
            </Text>

            <AddressInput
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
            />

            <HStack alignItems="flex-start" mt="40px">
              <Image
                w="100px"
                h="100px"
                src={data?.image}
                fallbackSrc="/assets/images/empty-item.png"
                objectFit={'cover'}
                borderRadius="10px"
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
                    {data?.name}
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
                  {data?.collectionName} #{data?.tokenId}
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
              You won’t be able to take back the NFT after the transaction.
            </Text>
          </ModalBody>

          <ModalFooter w="100%" mt="30px">
            <HStack flex={1} w="100%">
              <Box flex={1}>
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
                  onClick={onPressSend}
                  isLoading={isLoading}
                  py="9px"
                  h="auto"
                  color="black.1d"
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

export default SendNFTModal
