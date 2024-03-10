import { useEffect, useState } from "react"
import { listPoolData } from "./listPoolData";






export interface IStakeNftPool {
  nftAddress: string;
  name: string;
  image: string;
  chainId: number;
}

export const useListPool = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [keySearch, setKeySearch] = useState(null);
  const [data, setData] = useState<IStakeNftPool[]>(listPoolData);

  useEffect(() => {
    if (keySearch) {
      const newPool = listPoolData.filter(i => i.name.toLowerCase().includes(keySearch.toLowerCase()) || i.nftAddress.toLowerCase() === keySearch.toLowerCase());
      setData(newPool);
    } else {
      setData(listPoolData);
    }
  }, [keySearch])

  return {
    keySearch,
    setKeySearch,
    isLoading,
    data
  }
}
