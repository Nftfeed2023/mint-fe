import { useQuery } from '@tanstack/react-query'
import { ESosialType } from '~/common/enums'
import NFTMarketPlaceServices from '~/services/nft.marketplace.services'

interface IItemTrending {
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

const useListTrending = () => {
  const results = useQuery<Array<IItemTrending>>(
    ['listTrending'],
    NFTMarketPlaceServices.listTrending,
  )
  return { ...results, data: results?.data ?? [] }
}

export default useListTrending
