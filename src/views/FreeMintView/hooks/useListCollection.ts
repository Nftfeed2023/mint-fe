import { useState, useCallback, useEffect } from "react";
import { NftCollection } from "~/dto/nft-project.dto";
import nftCollectionService from "~/services/nft-collection.service";
import { EHomeListTag, EListNftFilterStatus } from "~/dto/nft-collection.dto"




export interface IListCollectionProps {
  pageSize: number,
  listTag: EHomeListTag,
  chainId: number
  environment: number
}


export const useListCollection = ({ pageSize = 10, listTag, chainId, environment }: IListCollectionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<NftCollection[]>([]);
  const [total, setTotal] = useState(0);
  const [filterStatus, setFilterStatus] = useState<EListNftFilterStatus>(EListNftFilterStatus.ALL);
  const [evn, setEvn] = useState(environment);

  useEffect(() => {
    setEvn(environment)
  }, [environment])

  const loadData = useCallback(async (pageIndex?: number) => {
    setIsLoading(true);
    try {
      if (listTag === EHomeListTag.Popular) {
        const res = await nftCollectionService.listPopular({
          pageIndex: pageIndex || 1,
          pageSize,
          filterStatus,
          ...(chainId && { chainId }),
        });
        setData(res.data);
        setTotal(res.total);
      }
      if (listTag === EHomeListTag.FreeMint) {
        const res = await nftCollectionService.listFreeMint({
          pageIndex: pageIndex || 1,
          pageSize,
          filterStatus,
          environment: evn ? true : false,
          ...(chainId && { chainId }),
        });
        setData(res.data);
        setTotal(res.total);
      }
      if (listTag === EHomeListTag.OnSale) {
        const res = await nftCollectionService.listOnSale({
          pageIndex: pageIndex || 1,
          pageSize,
          filterStatus,
          environment: evn ? true : false,
          ...(chainId && { chainId }),
        });
        setData(res.data);
        setTotal(res.total);
      }
      setIsLoading(false);
    } catch (error) {
      setData([]);
      setTotal(0);
      setIsLoading(false);
    }

  }, [chainId, evn, filterStatus, listTag, pageSize]);

  useEffect(() => { loadData() }, [loadData]);


  return {
    isLoading,
    data,
    total,
    filterStatus,
    setFilterStatus,
    loadData,
    evn,
    setEvn,
  }

}
