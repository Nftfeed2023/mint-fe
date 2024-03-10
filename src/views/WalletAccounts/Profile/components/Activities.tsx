import { useCallback, useEffect, useState } from 'react'
import { usePagination } from '@ajna/pagination'
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
  HStack,
  Icon,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

import { ETransactionType } from '~/common/enums'
import PaginationComponent from '~/components/Pagination'
import useWindowSize from '~/hooks/useWindowSize'
import { formatAddress, pipeAmount } from '~/utils'
import { ReactComponent as CopyIcon } from '~/assets/svgs/copy.svg'

import useListActivitiesByUserAddress from '../hooks/useListActivitiesByUserAddress'
import ActivityItemMobile from './ActivityItem.mobile'
import WrapperCopy from '~/components/WrapperCopy'
import { NumberParam, useQueryParams, withDefault } from 'use-query-params'
import Loading from '~/components/Loading'
import EmptyTable from '~/components/EmptyTable'
import { useConnectWallet } from '~/hooks/@global/useConnectWallet'

const TransactionType = ({ type = ETransactionType.AskListing }) => {
  let color = '#1F9254'
  let text = 'Listing'

  switch (type) {
    case ETransactionType.AskCancelListing:
      color = '#A30D11'
      text = 'Cancel'
      break
    case ETransactionType.AskUpdatePrice:
      color = '#CD6200'
      text = 'Update price'
      break

    case ETransactionType.AskSale:
      color = '#0052CD'
      text = 'Sale'
      break
    case 'BidCreated':
      color = '#1F9254'
      text = 'Created'
      break

    case ETransactionType.BidCreated:
      color = '#1F9254'
      text = 'Bid created'
      break

    case ETransactionType.BidCanceled:
      color = '#A30D11'
      text = 'Bid cancel'
      break

    case ETransactionType.BidAccepted:
      color = '#0052CD'
      text = 'Bid Accepted'
      break

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

const ActivityCollection = (props) => {
  const { t } = useTranslation()
  const { width } = useWindowSize()
  const { account } = useConnectWallet();
  const [pageIndex, setPageIndex] = useState(1)
  const [{ tabIndex }] = useQueryParams({
    tabIndex: withDefault(NumberParam, 0),
  })

  const { data, total, isLoading, refetch } = useListActivitiesByUserAddress({
    pageSize: 10,
    pageIndex,
    account,
  })

  const { pages, pagesCount, currentPage, setCurrentPage } = usePagination({
    total,
    limits: {
      outer: 2,
      inner: 2,
    },
    initialState: {
      pageSize: 10,
      isDisabled: false,
      currentPage: 1,
    },
  })

  useEffect(() => {
    refetch()
  }, [tabIndex])

  const handlePageChange = useCallback(
    (nextPage: number): void => {
      // -> request new data using the page number
      setCurrentPage(nextPage)
      console.log('request new data with ->', nextPage)
    },
    [setCurrentPage],
  )

  if (isLoading) {
    return <Loading />
  }

  if (width < 992) {
    return (
      <Box borderRadius="8px">
        {data.map((item, index) => {
          return <ActivityItemMobile key={item?.id} index={index} {...item} />
        })}
        <Stack justify="center">
          <Box>
            <PaginationComponent
              pagesCount={pagesCount}
              currentPage={currentPage}
              isDisabled={false}
              onPageChange={handlePageChange}
              pages={pages}
            />
          </Box>
        </Stack>
      </Box>
    )
  }

  return (
    <Box>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr
              bg="#F3F6F9"
              borderTopLeftRadius="6px"
              borderTopRightRadius="6px"
            >
              <THCustom>{t('image')}</THCustom>
              <THCustom>{t('name')}</THCustom>
              <THCustom>{t('transaction_id')}</THCustom>
              <THCustom>{t('transaction_type')}</THCustom>
              <THCustom>{t('time')}</THCustom>
              <THCustom>{t('amount')}</THCustom>
              <THCustom>{t('buyer')}</THCustom>
              <THCustom>{t('seller')}</THCustom>
            </Tr>
          </Thead>
          {data?.length > 0 && (
            <Tbody>
              {data.map(
                (
                  {
                    id,
                    image,
                    name,
                    tokenId,
                    transactionHash,
                    transactionType,
                    price,
                    from,
                    to,
                    updatedDate,
                  },
                  index,
                ) => {
                  return (
                    <Tr key={id} bg={!(index % 2) ? '#FFFFFF' : '#F7F9FA'}>
                      <Td py="42px">
                        <Image
                          h="50px"
                          w="50px"
                          maxH="50px"
                          src={image}
                          objectFit={'cover'}
                        />
                      </Td>
                      <Td>
                        <Text
                          color="black.light"
                          letterSpacing="-0.5px"
                          lineHeight="24px"
                          fontWeight="500"
                          fontSize="14px"
                          noOfLines={2}
                        >
                          {name}
                        </Text>
                        <Text
                          fontSize="14px"
                          color="black.light"
                          letterSpacing="-0.5px"
                          lineHeight="24px"
                          fontWeight="500"
                        >
                          #{tokenId}
                        </Text>
                      </Td>
                      <Td
                        fontSize="14px"
                        color="black.light"
                        letterSpacing="-0.5px"
                        lineHeight="24px"
                        fontWeight="500"
                      >
                        {formatAddress(transactionHash)}
                      </Td>
                      <Td>
                        <TransactionType type={transactionType} />
                      </Td>

                      <Td
                        fontSize="14px"
                        color="black.light"
                        letterSpacing="-0.5px"
                        lineHeight="24px"
                        fontWeight="500"
                      >
                        {dayjs(updatedDate).format('YYYY/MM/DD hh:mm:ss')}
                      </Td>
                      <Td>
                        <Text
                          color="black.light"
                          letterSpacing="-0.5px"
                          lineHeight="24px"
                          fontWeight="600"
                          fontSize="14px"
                          textAlign="right"
                        >
                          <HStack py="20px">
                            <Image src="/assets/images/demo/busd.svg" />
                            <Text>{pipeAmount(price)}</Text>
                          </HStack>
                        </Text>
                      </Td>
                      <Td>
                        <HStack alignItems="center">
                          <Text
                            fontSize="14px"
                            color="black.light"
                            letterSpacing="-0.5px"
                            lineHeight="24px"
                            fontWeight="500"
                          >
                            {formatAddress(from || '')}
                          </Text>
                          {from && (
                            <WrapperCopy copyText={from}>
                              <Icon as={CopyIcon} />
                            </WrapperCopy>
                          )}
                        </HStack>
                      </Td>
                      <Td
                        fontSize="14px"
                        color="black.light"
                        letterSpacing="-0.5px"
                        lineHeight="24px"
                        fontWeight="500"
                      >
                        <HStack>
                          <Text
                            fontSize="14px"
                            color="black.light"
                            letterSpacing="-0.5px"
                            lineHeight="24px"
                            fontWeight="500"
                          >
                            {formatAddress(to || '')}
                          </Text>
                          {to && (
                            <WrapperCopy copyText={to}>
                              <Icon as={CopyIcon} />
                            </WrapperCopy>
                          )}
                        </HStack>
                      </Td>
                    </Tr>
                  )
                },
              )}
            </Tbody>
          )}
        </Table>
        {!data?.length && <EmptyTable />}
      </TableContainer>
      {total > 0 && (
        <Stack justify="center">
          <Box>
            <PaginationComponent
              pagesCount={pagesCount}
              currentPage={currentPage}
              isDisabled={false}
              onPageChange={handlePageChange}
              pages={pages}
            />
          </Box>
        </Stack>
      )}
    </Box>
  )
}

export default ActivityCollection
