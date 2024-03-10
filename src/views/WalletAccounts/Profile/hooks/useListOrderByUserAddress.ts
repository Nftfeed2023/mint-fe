import { useQuery } from '@tanstack/react-query'
import { IAskByAcount } from '~/dto'
import NFTMarketPlaceServices from '~/services/nft.marketplace.services'

interface IItemNewest {
  address: string
  askId: number
  collectionName: string
  createdBy: null
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
  updatedBy: null
  updatedDate: string
  version: number
}

const useListOrderByUserAddress = (variables) => {
  const results = useQuery<{
    data: Array<IAskByAcount>
    total: number
  }>(['marketUserOnSales', variables], () =>
    NFTMarketPlaceServices.marketUserOnSales(variables),
  )
  return {
    ...results,
    data: results?.data?.data ?? [],
    total: results?.data?.total,
  }
}

export default useListOrderByUserAddress
