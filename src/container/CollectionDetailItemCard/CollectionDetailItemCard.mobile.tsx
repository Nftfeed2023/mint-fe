import {
  Box,
  Button,
  Checkbox,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { ReactComponent as BNBIcon } from '~/assets/svgs/bnb.svg'
import { ReactComponent as VerifyIcon } from '~/assets/svgs/components/verify.svg'
import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { EMarketAskStatus } from '~/common/enums/EMarketAskStatus'
import { formatMoney } from '~/utils'

import { ReactComponent as HeartIcon } from '~/assets/svgs/haft-heart.svg'
import { ReactComponent as FullHeartIcon } from '~/assets/svgs/FullHeart.svg'
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
  onSelect?: any
  isSelected?: boolean
}

const CollectionDetailItemCardMobile: FC<ICollectionDetailItemCard> = ({
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
  updatedBy,
  updatedDate,
  version,
  onSelect,
  isSelected,
}) => {
  const item = {
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
    updatedBy,
    updatedDate,
    version,
  }
  const navigation = useNavigate()
  const isSold = status === EMarketAskStatus.SOLD
  const [isLiked, setIsLiked] = useState(false)
  return (
    <Box>
      <Box position="relative">
        <Image
          h={'180px'}
          w={'full'}
          src={image}
          fallbackSrc="/assets/images/empty-item.png"
          objectFit={'contain'}
          borderRadius="10px"
          onClick={() => {
            navigation(`${MAIN_ROUTERS.MARKET_PLACE_ROUTER}/${address}/${askId}`)
          }}
          zIndex={1}
        />
        {/* <Box
          display="flex"
          position={'absolute'}
          right="10px"
          top="10px"
          transition="all 250ms"
          _groupHover={{
            display: isSold ? 'none' : 'flex',
          }}
          zIndex={10}
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
        </Box>

        <Box
          display="flex"
          position={'absolute'}
          left="10px"
          top="10px"
          transition="all 250ms"
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
        </Box> */}
      </Box>
      <Text
        fontSize="12px"
        lineHeight="18px"
        color="secondary"
        fontWeight="600"
        mt="10px"
        noOfLines={2}
      >
        {name}
      </Text>
      <HStack alignItems="center" my="3px">
        <Text
          fontSize={{
            base: '10px',
            lg: '15px',
          }}
          color="black.1d"
          lineHeight="12px"
          letterSpacing="-0.5px"
          fontWeight="400"
        >
          Created by {''}
        </Text>
        <Icon as={VerifyIcon} w="10px" h="10px" />
      </HStack>
      <HStack w="100%">
        <HStack>
          <Image src="/assets/images/demo/busd.svg" w="18px" h="18px" />
          <Text
            color="secondary"
            fontSize="12px"
            lineHeight="18px"
            fontWeight="600"
          >
            {formatMoney(`${price}`)}
          </Text>
        </HStack>
        <Spacer />
        {!isSold && (
          <Button
            bg="yellow.primary !important"
            borderRadius="6px"
            fontWeight="600"
            fontSize="13px"
            lineHeight="20px"
            h="auto"
            py="5px"
            color="black.1d"
          >
            Buy
          </Button>
        )}
      </HStack>
    </Box>
  )
}

export default CollectionDetailItemCardMobile
