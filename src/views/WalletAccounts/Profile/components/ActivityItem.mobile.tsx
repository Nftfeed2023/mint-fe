import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Text,
  Stack,
  Image,
  VStack,
  HStack,
  Spacer,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import { FC } from 'react'
import { IActivityItem } from '~/dto'
import { formatAddress, formatMoney } from '~/utils'

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

const TransactionType = ({ type }: { type: string }) => {
  let color = '#1F9254'
  let text = 'Listing'

  switch (type) {
    case 'AskCancelListing':
      color = '#A30D11'
      text = 'Cancel'
      break
    case 'AskUpdatePrice':
      color = '#CD6200'
      text = 'Change price'
      break
    case 'AskSale':
      color = '#0052CD'
      text = 'Sale'
      break
    case 'BidCreated':
      color = '#1F9254'
      text = 'Created'
      break
    // case 'AskCancelListing':
    //   color = '#1F9254'
    //   text = 'Listing'
    //   break

    default:
      break
  }
  return (
    <Text color={color} fontSize="13px" lineHeight="15px" fontWeight="500">
      {text}
    </Text>
  )
}

const THCustom = ({ children, ...rest }) => {
  return (
    <Th
      fontSize="12px"
      lineHeight="18px"
      letterSpacing="0.03em"
      color="grey.97"
      textTransform="uppercase"
      {...rest}
    >
      {children}
    </Th>
  )
}
const ActivityItem: FC<IActivityItem & { index: number }> = ({
  index,
  name,
  tokenId,
  transactionHash,
  transactionType,
  createdDate,
  from,
  to,
  price,
}) => {
  return (
    <VStack
      alignItems="flex-start"
      w="100%"
      background={index % 2 === 0 ? '#F7F9FA' : 'white'}
      spacing="10px"
      px="16px"
      py="10px"
    >
      <HStack w="100%">
        <Text
          fontWeight="600"
          fontSize="12px"
          lineHeight="18px"
          color="grey.97"
        >
          Name
        </Text>
        <Spacer />
        <Text
          fontSize="14px"
          lineHeight="24px"
          color="black.light"
          fontWeight="500"
        >
          {name} #{tokenId}
        </Text>
      </HStack>
      <HStack w="100%">
        <Text
          fontWeight="600"
          fontSize="12px"
          lineHeight="18px"
          color="grey.97"
        >
          Transaction ID
        </Text>
        <Spacer />
        <Text
          fontSize="14px"
          lineHeight="24px"
          color="black.light"
          fontWeight="500"
        >
          {formatAddress(transactionHash)}
        </Text>
      </HStack>
      <HStack w="100%">
        <Text
          fontWeight="600"
          fontSize="12px"
          lineHeight="18px"
          color="grey.97"
        >
          Transaction type
        </Text>
        <Spacer />
        <Text
          fontSize="14px"
          lineHeight="24px"
          color="black.light"
          fontWeight="500"
        >
          <TransactionType type={transactionType} />
        </Text>
      </HStack>
      <HStack w="100%">
        <Text
          fontWeight="600"
          fontSize="12px"
          lineHeight="18px"
          color="grey.97"
        >
          Time
        </Text>
        <Spacer />
        <Text
          fontSize="14px"
          lineHeight="24px"
          color="black.light"
          fontWeight="500"
        >
          {dayjs(createdDate).format('YYYY/MM/DD hh:mm:ss')}
        </Text>
      </HStack>
      <HStack w="100%">
        <Text
          fontWeight="600"
          fontSize="12px"
          lineHeight="18px"
          color="grey.97"
        >
          Price
        </Text>
        <Spacer />
        <Text
          fontSize="14px"
          lineHeight="24px"
          color="black.light"
          fontWeight="600"
        >
          ${formatMoney(`${price}`)}
        </Text>
      </HStack>
      <HStack w="100%" alignItems="flex-start">
        <Text
          fontWeight="600"
          fontSize="12px"
          lineHeight="18px"
          color="grey.97"
        >
          Buyer
        </Text>
        <Spacer />
        <VStack justifyContent="flex-start">
          {/* <Text
            fontSize="14px"
            lineHeight="24px"
            color="black.light"
            fontWeight="500"
          >
            accountname121
          </Text> */}
          <Text
            fontSize="14px"
            lineHeight="24px"
            color="black.light"
            fontWeight="500"
          >
            {formatAddress(to)}
          </Text>
        </VStack>
      </HStack>
      <HStack w="100%" alignItems="flex-start">
        <Text
          fontWeight="600"
          fontSize="12px"
          lineHeight="18px"
          color="grey.97"
        >
          Seller
        </Text>
        <Spacer />
        <VStack justifyContent="flex-start">
          {/* <Text
            fontSize="14px"
            lineHeight="24px"
            color="black.light"
            fontWeight="500"
          >
            accountname121
          </Text> */}
          <Text
            fontSize="14px"
            lineHeight="24px"
            color="black.light"
            fontWeight="500"
          >
            {formatAddress(from)}
          </Text>
        </VStack>
      </HStack>
    </VStack>
  )
}

export default ActivityItem
