import { useQuery } from '@tanstack/react-query'

import NFTMarketPlaceServices from '~/services/nft.marketplace.services'

interface IItemList {
  address: string
  name: string
  image: string
}

const useListSearch = () => {
  const results = useQuery<Array<IItemList>>(
    ['useListSearch'],
    NFTMarketPlaceServices.listSearch,
  )
  return {
    ...results,
    data: results?.data ?? [],
  }
}

export default useListSearch
