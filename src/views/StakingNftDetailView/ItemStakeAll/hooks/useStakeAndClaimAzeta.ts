import { useCallback, useEffect, useState } from "react"
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import useCustomToast from "~/hooks/@global/useCustomToast";
import stakeService from "~/services/stake.service";


export const useStakeAndClaimAzeta = () => {


  const [isLoading, setIsLoading] = useState(false);

  const toast = useCustomToast();
  const { account: evmAddress } = useConnectWallet();
  const [stakeInfo, setStakeInfo] = useState({
    amoutClaimed: 0, pending: 0, qtyStaked: 0
  })


  const loadData = useCallback(async () => {
    try {
      const { amoutClaimed, pending, qtyStaked } = await stakeService.pendingRewardAzetaSatkeNft({
        evmAddress
      });
      setStakeInfo({
        amoutClaimed, pending, qtyStaked
      })
    } catch (error) {

    }
  }, [evmAddress]);


  const claim = useCallback(async () => {
    setIsLoading(true);
    try {
      const { txHash } = await stakeService.claimAzeta({
        evmAddress
      });

      await loadData();
      toast.success({
        title: "DONE",
        description: txHash
      })
    } catch (error) {
      toast.handleError(error);
    }
    setIsLoading(false);
  }, [evmAddress]);





  useEffect(() => { loadData() }, [loadData])

  return {
    ...stakeInfo,
    isLoading,
    claim
  }
}

