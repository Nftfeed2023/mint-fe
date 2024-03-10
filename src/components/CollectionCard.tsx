import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  HStack,
  Icon,
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { ReactComponent as VerifyIcon } from '~/assets/svgs/components/verify.svg'
import { ReactComponent as HeartIcon } from '~/assets/svgs/heart.svg'
import { ReactComponent as FullHeartIcon } from '~/assets/svgs/FullHeart.svg'
import { ESosialType } from '~/common/enums'
import { MAIN_ROUTERS } from "~/routes/routes"


interface ICollectionCard {
  id: string
  createdDate: string
  updatedDate: string
  createdBy: string
  updatedBy: string
  address: string
  symbol: string
  name: string
  image: string
  status: number
  iframe: string
  description: string
  projectLogo?: string
  banner?: string
  creator?: string
  creatorFeePercent?: number
  sosials: [
    {
      type: ESosialType
      link: string
      logo: string
    },
  ]
}

const CollectionCardInfo = ({ symbol = '', name = '' }) => {
  const { t } = useTranslation('src/components/CollectionCard.lang.json')
  return (
    <Box
      mt={{ base: '35px', md: '4px' }}
      mb="12px"
      ml={{
        base: '10px',
        md: 0,
      }}
      mr="10px"
    >
      <Stack
        spacing={1}
        align={{
          base: 'start',
          md: 'center',
        }}
      >
        <HStack alignItems="flex-start" px="10px" py="20px">
          <Text
            fontSize={{
              base: '12px',
              md: '15px',
            }}
            color="black.1d"
            lineHeight="18px"
            letterSpacing="-0.5px"
            fontWeight="600"
            noOfLines={2}
          >
            {name} - {symbol}
          </Text>
          <Icon as={VerifyIcon} />
        </HStack>

        {/* <Text
          fontWeight="400"
          fontSize={{
            base: '10px',
            md: '13px',
          }}
          lineHeight="15.5px"
          color="grey.66"
        >
          {t('created_by')}{' '}
          <Text fontWeight="500" color="black.light" as="span">
            CryptoPunk
          </Text>
        </Text> */}
      </Stack>
    </Box>
  )
}

const CollectionCard: FC<ICollectionCard> = ({
  image,
  name,
  id,
  symbol,
  address,
  projectLogo,
}) => {
  const navigation = useNavigate()
  const [isLiked, setIsLiked] = useState(false)

  return (
    <Center
      minW="217px"
      onClick={() => {
        navigation(`${MAIN_ROUTERS.MARKET_PLACE_ROUTER}/${address}`)
      }}
      cursor="pointer"
      border={{
        base: '1px solid #DFE6F1',
        lg: 'none',
      }}
      rounded="10px"
      role="group"
      h="full"
      overflow="hidden"
    >
      <Box
        transition="all 250ms ease-in"
        border="1px solid transparent"
        _groupHover={{
          border: '1px solid #DFE6F1',
          filter:
            'drop-shadow(0px -4px 10px rgba(0, 0, 0, 0.1)) drop-shadow(0px 3px 10px rgba(0, 0, 0, 0.1))',
        }}
        w="full"
        h="full"
        bg="white"
        rounded="10px"
        overflow="hidden"
      >
        <Box position="relative">
          <Image
            h="full"
            w="full"
            maxH={{
              base: '130px',
              '2xl': '200px',
            }}
            transition="all 250ms ease-in"
            overflow="hidden"
            src={image}
            fallbackSrc="/assets/images/empty-item.png"
            objectFit="contain"
            _groupHover={{
              lg: {
                transform: 'scale(1.1)',
              },
            }}
          />
          {/* <Box
            display="none"
            position={'absolute'}
            right="10px"
            top="10px"
            transition="all 450ms ease-in"
            _groupHover={{
              display: 'block',
            }}
            zIndex="5"
          >
            <Box
              w="24px"
              h="24px"
              bgColor="white"
              borderRadius="30px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              boxShadow="0px 0px 12px rgba(0, 0, 0, 0.5)"
              onClick={(e) => {
                e?.stopPropagation()
              }}
            >
              <Icon
                as={isLiked ? FullHeartIcon : HeartIcon}
                w="20px"
                h="20px"
                onClick={(e) => {
                  e?.stopPropagation()
                  setIsLiked((currenState) => !currenState)
                }}
              />
            </Box>
          </Box> */}
        </Box>

        <Flex
          justify={{
            base: 'flex-start',
            md: 'center',
          }}
          align={{
            base: 'start',
            md: 'center',
          }}
          flexDirection={{
            base: 'row',
            md: 'column',
          }}
          mt={-6}
          bg={{
            base: '#F7F9FA',
            lg: 'white',
          }}
        >
          <Avatar
            ml={{
              base: '10px',
              md: 0,
            }}
            w="48px"
            h="48px"
            src={projectLogo}
          />
          <CollectionCardInfo name={name} symbol={symbol} />
        </Flex>
      </Box>
    </Center>
  )
}

export default CollectionCard
