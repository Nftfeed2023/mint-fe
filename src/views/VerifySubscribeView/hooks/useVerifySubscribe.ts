import { useState, useCallback, useEffect } from "react";
import { VerifySubscribeReq } from "~/dto/nft-collection.dto";
import useCustomToast from "~/hooks/@global/useCustomToast";
import nftCollectionService from "~/services/nft-collection.service";



export const useVerifySubscribe = ({ address, email, evmAddress, verifyCode }: VerifySubscribeReq) => {
  const toast = useCustomToast();

  const [isLoading, setIsLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await nftCollectionService.verifySubscribe({
        address, email, evmAddress, verifyCode
      });
      toast.success({
        subTitle: "Verify success"
      });
      setSubscribed(res.subscribed || false)
    } catch (error) {
      toast.handleError(error);
      setSubscribed(false)
    }
    setIsLoading(false);
  }, [address, email, evmAddress, verifyCode]);


  useEffect(() => { loadData() }, [loadData]);

  return {
    isLoading,
    subscribed
  }
}
