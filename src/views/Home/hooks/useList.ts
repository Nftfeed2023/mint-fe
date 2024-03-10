import { useQuery } from '@tanstack/react-query'
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
      type: ESosialType;
      link: string
      logo: string
    },
  ]
}

const useList = (variables: {
  pageSize: number
  pageIndex: number
  order: 'newest'
}) => {
  const results = useQuery<{
    data: Array<IItemList>
    total: number
  }>(['nft-list-services', variables], NFTMarketPlaceServices.list)
  return { ...results, data: results?.data ?? [] }
}

export default useList
