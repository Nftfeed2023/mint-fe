
import { useCallback, useEffect, useState } from "react";
import { HistoryCampaignDTO } from "~/dto/history.campaign";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import useCustomToast from "~/hooks/@global/useCustomToast";
import campaignService from "~/services/campaign.service";

export const useHistoryCampaign = () => {

  const { account, chainId, provider, userInfo } = useConnectWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [historyCampaign, setHistoryCampaign] = useState<HistoryCampaignDTO[]>([]);
  const toast = useCustomToast();

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {

      if (account && userInfo) {
        const rs = await campaignService.historyCampaign({ id: userInfo.id });
        setHistoryCampaign([
          ...rs,
        ])
      }

    } catch (error) {
      console.log(`------------------- `);
      console.log(error);
      console.log(`------------------- `);
      toast.handleError(error);
    }
    setIsLoading(false);
  }, [account, userInfo])

  useEffect(() => {
    loadData();
  }, [loadData])

  return {
    historyCampaign,
  }
}
