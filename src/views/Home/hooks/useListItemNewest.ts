import { useQuery } from '@tanstack/react-query'
import NFTMarketPlaceServices from '~/services/nft.marketplace.services'

interface IItemNewest {
  id: string
  createdDate: string
  updatedDate: string
  createdBy: string
  updatedBy: string
  askId: number
  address: string
  tokenId: number
  seller: string
  price: number
  status: string
}

const useListItemNewest = () => {
  const results = useQuery<Array<IItemNewest>>(
    ['listItemNewest'],
    NFTMarketPlaceServices.listItemNewest,
  )
  return { ...results, data: results?.data ?? [] }
}

export default useListItemNewest
