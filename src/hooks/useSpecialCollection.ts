import { useState, useCallback, useEffect } from "react";
import { NftCollection } from "~/dto/nft-project.dto";
import nftCollectionService from "~/services/nft-collection.service";
import { EHomeListTag, EListNftFilterStatus } from "~/dto/nft-collection.dto"




export interface IListCollectionProps {
  pageSize: number,
  chainId: number
  environment: number
}


export const useSpecialCollection = ({ pageSize = 10, chainId, }: IListCollectionProps) => {

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<NftCollection[]>([]);
  const [total, setTotal] = useState(0);
  const [filterStatus, setFilterStatus] = useState<EListNftFilterStatus>(EListNftFilterStatus.ALL);

  const loadData = useCallback(async (pageIndex?: number) => {
    setIsLoading(true);
    try {
      const res = await nftCollectionService.listSpecial({
        pageIndex: pageIndex || 1,
        pageSize,
        filterStatus,
        ...(chainId && { chainId }),
      });
      setData(res.data);
      setTotal(res.total);
      setIsLoading(false);
    } catch (error) {
      setData([]);
      setTotal(0);
      setIsLoading(false);
    }

  }, [chainId, filterStatus, pageSize]);

  useEffect(() => { loadData() }, [loadData]);


  return {
    isLoading,
    data,
    total,
    filterStatus,
    setFilterStatus,
    loadData,
  }

}
