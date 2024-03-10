import { useState, useCallback, useEffect } from "react";
import { NftCollection } from "~/dto/nft-project.dto";
import nftCollectionService from "~/services/nft-collection.service";



export const useCollectionTrend = () => {

  const [data, setData] = useState<NftCollection[]>([])

  const loadData = useCallback(async () => {

    try {
      const res = await nftCollectionService.listTrends();
      setData(res);
    } catch (error) {
      setData([]);
    }

  }, []);

  useEffect(() => { loadData() }, [loadData]);


  return {
    data
  }

}
