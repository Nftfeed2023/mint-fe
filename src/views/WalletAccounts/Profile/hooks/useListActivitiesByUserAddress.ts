import { useQuery } from '@tanstack/react-query'
import { IActivityItem } from '~/dto'
import NFTMarketPlaceServices from '~/services/nft.marketplace.services'

const useListActivitiesByUserAddress = (variables) => {
  const results = useQuery<{
    data: Array<IActivityItem>
    total: number
  }>(['marketUserActivities', variables], () =>
    NFTMarketPlaceServices.marketUserActivities(variables),
  )
  return {
    ...results,
    data: results?.data?.data ?? [],
    total: results?.data?.total,
  }
}

export default useListActivitiesByUserAddress
