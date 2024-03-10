import { useQuery } from '@tanstack/react-query'
import NFTMarketPlaceServices from '~/services/nft.marketplace.services'

interface IItemNewest {
  askId: number
  address: string
  createdBy: number
  createdDate: string
  description: string
  id: string
  image: string
  name: string
  symbol: string
  tokenId: number
  updatedBy: null
  updatedDate: string
}

const useListNFTByUserAddress = (variables) => {
  const results = useQuery<{
    data: Array<IItemNewest>
    total: number
  }>(['marketUserMyItems', variables], () =>
    NFTMarketPlaceServices.marketUserMyItems(variables),
  )
  return {
    ...results,
    data: results?.data?.data ?? [],
    total: results?.data?.total,
  }
}

export default useListNFTByUserAddress
