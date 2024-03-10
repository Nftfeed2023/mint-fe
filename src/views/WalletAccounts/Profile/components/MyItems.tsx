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
  Text,
  Flex,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import PaginationComponent from '~/components/Pagination'

import { ReactComponent as SearchIcon } from '~/assets/svgs/search.svg'
import { ReactComponent as EmptyBoxIcon } from '~/assets/svgs/empty-box.svg'
import MyItemCard from './MyItemCard'
import useListNFTByUserAddress from '../hooks/useListNFTByUserAddress'
import { useWeb3React } from '@web3-react/core'
import { useCallback, useEffect, useState } from 'react'
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from 'use-query-params'

import Select from '~/components/Select'
import MyLoader from '~/components/Loader'
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

const MyItems = (props) => {
  const { t } = useTranslation('src/views/Profile/components/MyItems.lang.json')
  const [pageIndex, setPageIndex] = useState(1)
  const [valueSearch, setValueSearch] = useState('')
  const { account } = useConnectWallet();
  const [{ order, tabIndex }, setQuery] = useQueryParams({
    order: withDefault(StringParam, ORDERS.ids[0]),
    tabIndex: withDefault(NumberParam, 0),
  })

  const { data, isLoading, refetch, total } = useListNFTByUserAddress({
    pageSize: 10,
    pageIndex,
    account: account,
    valueSearch,
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

  const handlePageChange = useCallback(
    (nextPage: number): void => {
      // -> request new data using the page number
      setCurrentPage(nextPage)
      setPageIndex(nextPage)
    },
    [setCurrentPage],
  )

  useEffect(() => {
    refetch()
  }, [tabIndex, order])

  return (
    <Box>
      <HStack
        w="100%"
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
        <Box w="320px">
          <InputGroup>
            <Input
              bg="white"
              placeholder="Search by name or token ID"
              borderRadius="10px"
              onChange={(e) => setValueSearch(e.target.value)}
              _focus={{
                boxShadow: 'none',
              }}
            />
            <InputRightElement
              pointerEvents="none"
              children={<Icon as={SearchIcon} color="gray.300" />}
            />
          </InputGroup>
        </Box>
      </HStack>
      {isLoading ? (
        <SimpleGrid
          mt={{
            base: 0,
            lg: '30px',
          }}
          columns={{
            base: 2,
            lg: 4,
          }}
          spacing={{
            base: '14px',
            lg: '16px',
          }}
        >
          {[1, 2, 3, 4].map((key) => {
            return <MyLoader key={key} />
          })}
        </SimpleGrid>
      ) : data.length > 0 ? (
        <SimpleGrid
          mt={{
            base: 0,
            lg: '30px',
          }}
          columns={{
            base: 2,
            lg: 3,
            xxl: 4,
            '3xl': 5,
          }}
          spacing={{
            base: '14px',
            lg: '16px',
          }}
        >
          {data.map((card) => {
            return <MyItemCard key={card?.id} {...card} refetch={refetch} />
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
            You have no item
          </Text>
        </Flex>
      )}
      {total > 0 && (
        <Stack justify="center" w="100%" overflow="hidden" mt="100px">
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

export default MyItems
