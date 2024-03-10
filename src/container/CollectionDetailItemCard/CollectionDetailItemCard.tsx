import { FC, useMemo, useState } from 'react'
import {
  Box,
  Center,
  Image,
  Text,
  Stack,
  HStack,
  Icon,
  Spacer,
  IconButton,
  Checkbox,
} from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import useWindowSize from '~/hooks/useWindowSize'
import PrimaryButton from '~/components/PrimaryButton'

import { EMarketAskStatus } from '~/common/enums/EMarketAskStatus'
import { formatMoney } from '~/utils'

import { ReactComponent as VerifyIcon } from '~/assets/svgs/components/verify.svg'
import { ReactComponent as HeartIcon } from '~/assets/svgs/haft-heart.svg'
import { ReactComponent as FullHeartIcon } from '~/assets/svgs/FullHeart.svg'
import { ReactComponent as SoldIcon } from '~/assets/svgs/sold.svg'

import CollectionDetailItemCardMobile from './CollectionDetailItemCard.mobile'
import BuyNFTModal from '../BuyNFTModal/BuyNFTModal'
import { MAIN_ROUTERS } from "~/routes/routes"

interface ICollectionDetailItemCard {
  address: string
  askId: string
  createdBy: null
  createdDate: string
  description: string
  exactPrice: string
  id: string
  image: string
  symbol: string
  name: string
  price: string
  seller: string
  status: string
  tokenId: string
  updatedBy: null
  updatedDate: string
  version: string
  collectionName?: string
  onSelect?: () => void
  isSelected: boolean
  isShowSelected?: boolean
}

const CollectionDetailItemCard: FC<ICollectionDetailItemCard & any> = ({
  address,
  askId,
  createdBy,
  createdDate,
  description,
  exactPrice,
  id,
  image,
  name,
  price,
  seller,
  symbol,
  status,
  tokenId,
  updatedBy,
  updatedDate,
  version,
  collectionName,
  onSelect,
  isSelected,
  isShowSelected,
}) => {
  const navigation = useNavigate()
  const { width } = useWindowSize()
  const { collectionAddress } = useParams()
  const [isLiked, setIsLiked] = useState(false)
  const [isVisibleBuyNFTModal, setIsVisibleBuyNFTModal] = useState(false)
  const item = useMemo(
    () => ({
      address,
      askId,
      createdBy,
      createdDate,
      description,
      exactPrice,
      id,
      image,
      name,
      price,
      seller,
      status,
      tokenId,
      symbol,
      updatedBy,
      updatedDate,
      version,
    }),
    [
      address,
      askId,
      createdBy,
      createdDate,
      description,
      exactPrice,
      id,
      image,
      name,
      price,
      seller,
      status,
      tokenId,
      symbol,
      updatedBy,
      updatedDate,
      version,
    ],
  )

  const isSold = status === EMarketAskStatus.SOLD

  if (width < 992) {
    return (
      <CollectionDetailItemCardMobile
        {...item}
        onSelect={onSelect}
        isSelected={isSelected}
      />
    )
  }

  return (
    <Center
      cursor="pointer"
      onClick={() => {
        navigation(`${MAIN_ROUTERS.MARKET_PLACE_ROUTER}/${collectionAddress}/${askId}`)
      }}
      role="group"
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
            h="full"
            maxH={{
              base: '177px',
              '2xl': '250px',
            }}
            overflow="hidden"
            w={'full'}
            src={image}
            fallbackSrc="/assets/images/empty-item.png"
            objectFit={'contain'}
            _groupHover={{
              transform: 'scale(1.1)',
            }}
          />
          {isSold && (
            <Box
              position={'absolute'}
              h={'177px'}
              w={'full'}
              top={0}
              _groupHover={{
                transform: 'scale(1.1)',
              }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              bg="linear-gradient(0deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7))"
            >
              <Icon as={SoldIcon} w="100px" h="90px" />
            </Box>
          )}
          {/* <Box
            display="none"
            position={'absolute'}
            right="10px"
            top="10px"
            transition="all 250ms"
            _groupHover={{
              display: isSold ? 'none' : 'flex',
            }}
            zIndex="5"
            borderRadius="40px"
            boxShadow="0px 0px 12px rgba(0, 0, 0, 0.3)"
            w="24px"
            h="24px"
            justifyContent="center"
            alignItems="center"
            onClick={(e) => {
              e?.stopPropagation()
            }}
          >
            <IconButton
              as={isLiked ? FullHeartIcon : HeartIcon}
              aria-label=""
              size="18px"
              w="18px"
              h="18px"
              bg="white !important"
              borderRadius="40px"
              onClick={(e) => {
                e?.stopPropagation()
                setIsLiked((currenState) => !currenState)
              }}
            />
          </Box> */}

          <Box
            display={isShowSelected ? 'flex' : 'none'}
            position={'absolute'}
            left="10px"
            top="10px"
            transition="all 250ms"
            _groupHover={{
              display: isSold ? 'none' : 'flex',
            }}
            zIndex="5"
            borderRadius="40px"
            boxShadow="0px 0px 12px rgba(0, 0, 0, 0.3)"
            w="24px"
            h="24px"
            justifyContent="center"
            alignItems="center"
            onClick={(e) => {
              e.stopPropagation()
              onSelect?.(item)
            }}
          >
            <Checkbox
              pointerEvents="none"
              borderColor="white"
              sx={{
                '[data-checked]': {
                  borderColor: 'yellow.primary !important',
                  backgroundColor: 'yellow.primary !important',
                },
              }}
              isChecked={isSelected}
              aria-label=""
              // bg="white !important"
              borderRadius="40px"
            />
          </Box>
        </Box>

        <Box mt="4px" mb="12px" py="8px" px="12px">
          <Stack spacing={1} align={'start'}>
            <HStack alignItems="center">
              <Text
                fontSize="12px"
                lineHeight="24px"
                letterSpacing="-0.5px"
                fontWeight="400"
                color="#5F6774"
              >
                {collectionName}
              </Text>
              <Icon as={VerifyIcon} />
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
            <HStack w="100%">
              <HStack>
                <Image src="/assets/images/demo/busd.svg" />
                <Text
                  color="blue.darkest"
                  fontSize="15px"
                  lineHeight="20px"
                  fontWeight="600"
                >
                  {formatMoney(`${price}`)}
                </Text>
              </HStack>
              <Spacer />
              {!isSold && !isShowSelected && (
                <Box>
                  <PrimaryButton
                    bg="yellow.primary !important"
                    borderRadius="6px"
                    fontWeight="600"
                    fontSize="13px"
                    lineHeight="20px"
                    h="auto"
                    py="5px"
                    color="black.1d"
                    onClick={(e) => {
                      e?.stopPropagation()
                      setIsVisibleBuyNFTModal(true)
                    }}
                  >
                    Buy
                  </PrimaryButton>
                </Box>
              )}
            </HStack>
          </Stack>
        </Box>
      </Box>
      <BuyNFTModal
        data={{
          address,
          askId,
          createdBy,
          createdDate,
          description,
          exactPrice,
          id,
          image,
          name,
          price,
          seller,
          symbol,
          status,
          tokenId,
          updatedBy,
          updatedDate,
          version,
          collectionName,
        }}
        isOpen={isVisibleBuyNFTModal}
        onClose={() => setIsVisibleBuyNFTModal(false)}
        refresh={() => { }}
      />
    </Center>
  )
}

export default CollectionDetailItemCard
