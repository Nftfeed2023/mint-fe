import { memo, useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from 'use-query-params'
import { usePagination } from '@ajna/pagination'
import {
  Box,
  Stack,
  SimpleGrid,
  HStack,
  InputGroup,
  Input,
  InputRightElement,
  Icon,
  Flex,
  Text,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import PaginationComponent from '~/components/Pagination'

import Select from '~/components/Select'
import MyLoader from '~/components/Loader'
import { ReactComponent as SearchIcon } from '~/assets/svgs/search.svg'
import { ReactComponent as EmptyBoxIcon } from '~/assets/svgs/empty-box.svg'

import OnSaleCard from './OnSaleCard'
import useListOrderByUserAddress from '../hooks/useListOrderByUserAddress'
import { useConnectWallet } from '~/hooks/@global/useConnectWallet'

const ORDERS = {
  data: {
    newest: 'newest',
    oldest: 'oldest',
    highest_total_volume: 'highest_total_volume',
    lowest_total_volume: 'lowest_total_volume',
  },
  ids: ['newest', 'oldest', 'highest_total_volume', 'lowest_total_volume'],
}

const OnSales = () => {
  const { t } = useTranslation('src/views/Profile/components/OnSales.lang.json')
  const [totalPage, setTotalPage] = useState(0)
  const [valueSearch, setValueSearch] = useState('')
  const { account } = useConnectWallet();
  const [{ order, tabIndex }, setQuery] = useQueryParams({
    order: withDefault(StringParam, ORDERS.ids[0]),
    tabIndex: withDefault(NumberParam, 0),
  })

  const { pages, pagesCount, currentPage, setCurrentPage, pageSize } =
    usePagination({
      total: totalPage,
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

  const { data, isLoading, refetch, total } = useListOrderByUserAddress({
    pageSize,
    pageIndex: currentPage,
    account: account,
    valueSearch,
  })

  useEffect(() => {
    setTotalPage(total)
  }, [total])

  const onRefetch = useCallback(() => {
    refetch()
  }, [refetch])

  useEffect(() => {
    refetch()
  }, [tabIndex, order])

  const handlePageChange = useCallback(
    (nextPage: number): void => {
      setCurrentPage(nextPage)
    },
    [setCurrentPage],
  )

  return (
    <Box>
      <HStack
        display={{
          base: 'none',
          lg: 'flex',
        }}
      >
        <Box w="212px">
          <Select
            placeholder={t('select_option')}
            options={ORDERS.ids.map((item) => ({
              label: t(ORDERS.data[item]),
              value: ORDERS.data[item],
            }))}
            onChange={(selected) => setQuery({ order: selected.value })}
            value={{
              label: t(ORDERS.data[order]),
              value: ORDERS.data[order],
            }}
          />
        </Box>
        <Box w="413px">
          <InputGroup>
            <Input
              _focus={{
                boxShadow: 'none',
              }}
              bg="white"
              placeholder="Search by NFT name, token ID or contract address"
              borderRadius="10px"
              fontSize="15px"
              color="grey.77"
              letterSpacing="-0.5px"
              onChange={(e) => setValueSearch(e.target.value)}
            />
            <InputRightElement
              pointerEvents="none"
              children={<Icon as={SearchIcon} color="gray.300" />}
            />
          </InputGroup>
        </Box>
      </HStack>
      {isLoading ? (
        <>
          <SimpleGrid
            mt="30px"
            columns={{
              base: 2,
              lg: 4,
            }}
            spacing="16px"
          >
            {[1, 2, 3, 4].map((key) => (
              <MyLoader key={key} />
            ))}
          </SimpleGrid>
        </>
      ) : data.length > 0 ? (
        <SimpleGrid
          mt="30px"
          columns={{
            base: 2,
            lg: 3,
            xxl: 4,
            '3xl': 5,
          }}
          spacing="16px"
        >
          {data.map((card) => {
            return <OnSaleCard key={card.id} {...card} onRefetch={onRefetch} />
          })}
        </SimpleGrid>
      ) : (
        <Flex
          flex={1}
          justify="center"
          align="center"
          flexDir="column"
          my="100px"
        >
          <Icon as={EmptyBoxIcon} w="147px" h="162px" />
          <Text
            color="grey.97"
            fontSize="15px"
            fontWeight="400"
            lineHeight="18px"
            letterSpacing="-0.5px"
            mt="26px"
          >
            You have no item on sale
          </Text>
        </Flex>
      )}
      {total > 0 && (
        <Stack justify="center" mt="100px">
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

export default memo(OnSales)
