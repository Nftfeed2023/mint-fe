import { useCallback, useEffect, useState } from "react"
import { PageResponse } from "~/dto/@common"
import { NftCollectionDto } from "~/dto/nft-project.dto"
import managerService from "~/services/manager.service";



export const useManagerCollections = ({ managerAddress }) => {

  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<PageResponse<NftCollectionDto>>({
    data: [],
    total: 0
  });

  const loadData = useCallback(async (pageIndex: number, keyword: string) => {
    setIsLoading(true)
    try {
      if (managerAddress) {
        const res = await managerService.listCollectionByManager({
          managerAddress,
          ...(keyword && { keyword }),
          pageIndex,
          pageSize: 20,
        }).catch(_ => ({
          data: [] as NftCollectionDto[],
          total: 0
        }))

        setResponse(res);
      }
    } catch (error) {

    }
    setIsLoading(false)
  }, [managerAddress]);


  // useEffect(() => { loadData() }, [loadData])

  return {
    isLoading,
    ...response,
    loadData,
  }
}
