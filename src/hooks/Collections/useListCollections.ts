import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { ESosialType } from '~/common/enums'
import NFTMarketPlaceServices from '~/services/nft.marketplace.services'

interface IItemList {
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
  sosials: [
    {
      type: ESosialType
      link: string
      logo: string
    },
  ]
}

const useListCollections = (variables: {
  pageSize: number
  pageIndex: number
  order: string
}) => {
  const results = useQuery<{
    data: Array<IItemList>
    total: number
  }>(['useListCollections', variables], () =>
    NFTMarketPlaceServices.list(variables),
  )

  return {
    ...results,
    data: results?.data?.data ?? [],
    total: results?.data?.total ?? 0,
  }
}

export default useListCollections
