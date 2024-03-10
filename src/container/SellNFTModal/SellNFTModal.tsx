import { useCallback, useState } from 'react'
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
import { useWeb3React } from '@web3-react/core'
import { utils } from 'ethers'

import { ReactComponent as VerifyIcon } from '~/assets/svgs/components/verify.svg'
import ConnectWalletButton from '~/components/ConnectWalletButton'
import PriceInput from '~/components/PriceInput'
import PrimaryButton from '~/components/PrimaryButton'
import { useMarketCollection } from '~/hooks/market/useMarketCollection'
import { formatMoney } from '~/utils'
import { useConnectWallet } from '~/hooks/@global/useConnectWallet'

interface IItemInCollection {
  name: string
  image: string
  description: string

  askId?: number
  address: string
  tokenId: number

  collectionName?: string
  symbol?: string
  attributes?: [
    {
      traitType: string
      value: string
    },
  ]
}

const SellNFTModal = ({
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
  const { address, tokenId } = data
  const { account } = useConnectWallet();
  const { isApproveCollection, approveCollection, isLoading, askListing } =
    useMarketCollection({ collection: address })

  const [price, setPrice] = useState('')

  const onClickClose = useCallback(() => {
    if (isLoading) return

    onClose()
  }, [onClose, isLoading])

  const onClickApproveCollection = useCallback(async () => {
    await approveCollection()
  }, [approveCollection])

  const onClickAskListing = useCallback(async () => {
    const results = await askListing(
      tokenId,
      utils.parseEther(`${price.replace(/\,/g, '')}`),
    )
    if (results) {
      refetch()
      onClose()
    }
  }, [askListing, onClose, price, refetch, tokenId])

  const renderBtnSell = useCallback(() => {
    if (!account) {
      return <ConnectWalletButton />
    }
    if (!isApproveCollection) {
      return (
        <PrimaryButton
          w="100%"
          fontSize="20px"
          lineHeight="23px"
          bg="yellow.primary"
          letterSpacing="-0.5px"
          fontWeight="500"
          borderRadius="12px"
          border="2px solid yellow.primary"
          onClick={onClickApproveCollection}
          isLoading={isLoading}
          py="9px"
          h="auto"
          color="black.1d"
        >
          Aprrove NFT
        </PrimaryButton>
      )
    }
    return (
      <PrimaryButton
        w="100%"
        fontSize="20px"
        lineHeight="23px"
        bg="yellow.primary"
        letterSpacing="-0.5px"
        fontWeight="500"
        borderRadius="12px"
        border="2px solid yellow.primary"
        onClick={onClickAskListing}
        isLoading={isLoading}
        py="9px"
        h="auto"
        color="black.1d"
      >
        Sell
      </PrimaryButton>
    )
  }, [
    account,
    isApproveCollection,
    isLoading,
    onClickApproveCollection,
    onClickAskListing,
  ])



  return (
    <>
      <Modal isOpen={isOpen} onClose={onClickClose} isCentered>
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
            Sell NTF
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
              fontWeight="400"
              fontSize="18px"
              lineHeight="20px"
              color="grey.66"
              letterSpacing="-0.5px"
            >
              Sell method
            </Text>
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

            <Text
              mt="20px"
              fontWeight="400"
              fontSize="18px"
              lineHeight="20px"
              color="grey.66"
              mb="8px"
              letterSpacing="-0.5px"
            >
              Price
            </Text>

            <PriceInput
              value={formatMoney(price)}
              onChange={(e) => {
                setPrice(e.target.value.replace(/[^0-9.]/g, ''))
              }}
            />

            <Text
              mt="26px"
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
                  onClick={onClickClose}
                  py="9px"
                  h="auto"
                  bg="white !important"
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </Box>

              <Box flex={1}>{renderBtnSell()}</Box>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SellNFTModal
