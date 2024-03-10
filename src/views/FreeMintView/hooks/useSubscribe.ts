import { useState, useCallback, useEffect } from "react";
import { NftCollection } from "~/dto/nft-project.dto";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import useCustomToast from "~/hooks/@global/useCustomToast";
import nftCollectionService from "~/services/nft-collection.service";



export const useSubscribe = ({ address }) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useCustomToast();
  const { account } = useConnectWallet();

  const [subscribed, setSubscribed] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const res = await nftCollectionService.checkSubscribe({
        address,
        evmAddress: account
      });

      setSubscribed(res.subscribed || false)
    } catch (error) {
      setSubscribed(false)
    }

  }, [account, address]);


  useEffect(() => { loadData() }, [loadData]);


  const registerSubscribe = useCallback(async (email: string) => {
    setIsLoading(true)
    try {
      const res = await nftCollectionService.subscribe({
        address,
        evmAddress: account,
        email
      });

      setSubscribed(res.subscribed || false);
      toast.show({
        subTitle: res.message,
        type: res.subscribed ? "success" : "info"
      })
    } catch (error) {
      toast.handleError(error)
      setSubscribed(false)
    }

    setIsLoading(false)
  }, [account, address, toast]);

  return {
    isLoading,
    // subscribed,
    subscribed: true,
    registerSubscribe
  }
}
