import { useState, useCallback, useEffect } from "react";
import { NftCollection, NftCollectionSearch } from "~/dto/nft-project.dto";
import nftCollectionService from "~/services/nft-collection.service";



export const useCollectionSearch = () => {

  const [data, setData] = useState<NftCollectionSearch[]>([])

  const loadData = useCallback(async () => {

    try {
      const res = await nftCollectionService.listSearch();
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
