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
import { utils } from 'ethers'
import { useCallback, useState } from 'react'

import { ReactComponent as VerifyIcon } from '~/assets/svgs/components/verify.svg'

import PriceInput from '~/components/PriceInput'
import PrimaryButton from '~/components/PrimaryButton'
import { useMarketCollection } from '~/hooks/market/useMarketCollection'
import { formatMoney, formatPrice } from '~/utils'

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

const ChangePriceNFTModal = ({
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
  const { askUpdatePrice, isLoading } = useMarketCollection({
    collection: address,
  })

  const [price, setPrice] = useState('')

  const onPressChangePrice = useCallback(async () => {
    const result = await askUpdatePrice(
      data.askId,
      utils.parseEther(`${price.replace(/\,/g, '')}`),
    )

    if (result) {
      setPrice('')
      refetch?.()
      onClose()
    }
  }, [askUpdatePrice, data.askId, onClose, price, refetch])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW="504px" mx="20px">
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
            Change price
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
            <HStack>
              <Text
                fontSize="15px"
                lineHeight="26px"
                color="black.1d"
                fontWeight="400"
              >
                Current price
              </Text>

              <HStack>
                <Image src="/assets/images/demo/busd.svg" />
                <Text
                  fontSize="20px"
                  lineHeight="20px"
                  color="blue.darker"
                  fontWeight="600"
                >
                  {formatPrice(data?.price)} BUSD
                </Text>
              </HStack>
            </HStack>

            <Text
              mt="20px"
              fontWeight="400"
              fontSize={{
                base: '15px',
              }}
              lineHeight={{
                base: '26px',
              }}
              color="black.1d"
              mb="8px"
            >
              Enter new price
            </Text>

            <PriceInput
              value={formatMoney(price)}
              onChange={(e) => {
                setPrice(e.target.value.replace(/[^0-9.]/g, ''))
              }}
            />

            <HStack alignItems="flex-start" mt="40px">
              <Image
                w="100px"
                h="100px"
                src={data?.image}
                fallbackSrc="/assets/images/empty-item.png"
                objectFit={'cover'}
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

          <ModalFooter
            w="100%"
            mt={{
              base: '0',
              md: '30px',
            }}
          >
            <HStack
              w="100%"
              spacing={{
                base: 0,
                lg: '20px',
              }}
            >
              <Box flex={1} display={{ base: 'none', md: 'block' }}>
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
                  py={{
                    base: '12px',
                    md: '9px',
                  }}
                  h="auto"
                  bg="white !important"
                >
                  Cancel
                </Button>
              </Box>

              <Box flex={1} w="100%">
                <PrimaryButton
                  w="100%"
                  fontSize="20px"
                  lineHeight="23px"
                  bg="yellow.primary"
                  letterSpacing="-0.5px"
                  fontWeight="500"
                  borderRadius="12px"
                  border="2px solid yellow.primary"
                  onClick={onPressChangePrice}
                  py={{
                    base: '12px',
                    md: '9px',
                  }}
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

export default ChangePriceNFTModal
