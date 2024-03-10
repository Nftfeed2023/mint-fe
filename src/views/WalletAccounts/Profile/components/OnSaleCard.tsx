import {
  Box,
  Center,
  Image,
  Text,
  Stack,
  HStack,
  Icon,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { FC } from 'react'

import { ReactComponent as VerifyIcon } from '~/assets/svgs/components/verify.svg'

import PrimaryButton from '~/components/PrimaryButton'
import ChangePriceNFTModal from '~/container/ChangePriceNFTModal/ChangePriceNFTModal'
import RemoveNFTModal from '~/container/RemoveNFTModal/RemoveNFTModal'
import { formatMoney } from '~/utils'

interface IOnSaleCard {
  onRefetch?: () => void
  address: string
  askId: number
  collectionName: string
  createdBy?: null
  createdDate: string
  description: string
  exactPrice: string
  id: string
  image: string
  name: string
  price: number
  seller: string
  status: string
  symbol: string
  tokenId: number
  updatedBy?: null
  updatedDate: string
  version?: number
}

const OnSaleCard: FC<IOnSaleCard> = ({
  onRefetch,
  address,
  askId,
  collectionName,
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
  symbol,
  tokenId,
  updatedBy,
  updatedDate,
  version,
}) => {
  const {
    isOpen: isOpenChangePriceNFTModal,
    onOpen: onOpenChangePriceNFTModal,
    onClose: onCloseChangePriceNFTModal,
  } = useDisclosure()

  const {
    isOpen: isOpenRemoveNFTModal,
    onOpen: onOpenRemoveNFTModal,
    onClose: onCloseRemoveNFTModal,
  } = useDisclosure()

  return (
    <Center>
      <Box w={'full'} bg="white" rounded="10px" overflow={'hidden'}>
        <Image
          h={'177px'}
          w={'full'}
          src={image}
          fallbackSrc="/assets/images/empty-item.png"
          objectFit={'cover'}
        />

        <Box mt="4px" mb="12px" py="8px" px="12px">
          <Stack spacing={0} align={'start'}>
            <HStack alignItems="flex-start">
              <Text
                fontSize="12px"
                lineHeight="24px"
                letterSpacing="-0.5px"
                fontWeight="400"
                color="#5F6774"
              >
                {name}
              </Text>
              <Icon as={VerifyIcon} />
            </HStack>

            <Box>
              <Text
                fontWeight="600"
                fontSize="15px"
                lineHeight="18px"
                color="black.1d"
                noOfLines={2}
                mt="10px"
              >
                #{tokenId} - {collectionName}
              </Text>
            </Box>

            <Box>
              <HStack mt="10px">
                <Image src="/assets/images/demo/busd.svg" w="16px" h="16px" />
                <Text
                  color="blue.darkest"
                  fontSize="15px"
                  lineHeight="20px"
                  fontWeight="600"
                >
                  {formatMoney(`${price}`)}
                </Text>
              </HStack>
            </Box>

            <Box w="100%">
              <Stack
                flexDirection={{
                  base: 'column',
                  lg: 'row',
                }}
                w="100%"
                mt="14px"
                spacing={0}
              >
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
                    onClick={onOpenRemoveNFTModal}
                  >
                    Remove
                  </Button>
                </Box>

                <Box flex={1}>
                  <PrimaryButton
                    ml={{ base: 0, lg: '5px' }}
                    mt={{
                      base: '5px',
                      lg: 0,
                    }}
                    w="100%"
                    bg="yellow.primary !important"
                    borderRadius="6px"
                    fontWeight="600"
                    fontSize="13px"
                    lineHeight="20px"
                    h="auto"
                    py="5px"
                    color="black.1d"
                    onClick={onOpenChangePriceNFTModal}
                  >
                    Change price
                  </PrimaryButton>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>

      <ChangePriceNFTModal
        isOpen={isOpenChangePriceNFTModal}
        onClose={onCloseChangePriceNFTModal}
        refetch={onRefetch}
        data={{
          address,
          askId,
          collectionName,
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
        }}
      />

      <RemoveNFTModal
        isOpen={isOpenRemoveNFTModal}
        onClose={onCloseRemoveNFTModal}
        refetch={onRefetch}
        data={{
          address,
          askId,
          collectionName,
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
        }}
      />
    </Center>
  )
}

export default OnSaleCard
