import { useQuery } from '@tanstack/react-query'
import { ESosialType } from '~/common/enums'
import NFTMarketPlaceServices from '~/services/nft.marketplace.services'

interface IItemNewest {
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

const useListNewest = () => {
  const results = useQuery<Array<IItemNewest>>(
    ['listNewest'],
    NFTMarketPlaceServices.listNewest,
  )
  return { ...results, data: results?.data ?? [] }
}

export default useListNewest
