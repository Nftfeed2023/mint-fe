import { useState, useCallback, useEffect } from 'react';
import { ICampaign, IQuest } from '~/dto/ICampaign';
import { useConnectWallet } from '~/hooks/@global/useConnectWallet';
import campaignService from '~/services/campaign.service';
import useCustomToast from "~/hooks/@global/useCustomToast";

export const useCampaign = (props: {
  campaignId: string
}) => {

  const { campaignId } = props;
  const toast = useCustomToast();
  const [isLoading, setIsLoading] = useState(false);
  const { account } = useConnectWallet();
  const [quest, setQuest] = useState<IQuest[]>();
  const [campaign, setCampaign] = useState<ICampaign>();

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      if (account && campaignId) {
        const res = await campaignService.campaignDetail({
          campaignId,
          walletAddress: account
        });

        setQuest(res.quest);
        setCampaign(res);
      }

      setIsLoading(false);

    } catch (error) {
      console.log({ error });
      setIsLoading(false);
      setQuest([]);
      setCampaign(null);
    }

  }, [account]);

  const campaignExecute = useCallback(async (questId: string) => {
    setIsLoading(true);
    try {
      const rs = await campaignService.campaignExecute({
        walletAddress: account,
        questId,
      });

      setIsLoading(false);
      toast.show({
        type: rs.data ? "success" : "error",
        title: rs.data ? "Success!" : "Fail!",
        description: rs.data ? "Quest verified" : `Please try again later or contact the project if you have finished the task.`,
      })
      loadData();

    } catch (error) {
      console.log({ error });
      setIsLoading(false);
      toast.handleErrorBlockChain(error);
    }

  }, [account, loadData,]);

  const finishClaim = useCallback(async (campaignId: string, userId: string) => {
    setIsLoading(true);
    try {
      if (campaignId) {
        const rs = await campaignService.finishClaim({
          walletAddress: account,
          campaignId,
          userId,
        });

        setIsLoading(false);
        loadData();
        toast.show({
          type: rs.data ? "success" : "error",
          title: rs.data ? "Success!" : "Fail!",
          description: rs.data ? "Confirm success" : `Please try again later or contact the project if you have finished the quest.`,
        })
      }

    } catch (error) {
      console.log({ error });
      setIsLoading(false);
      toast.handleErrorBlockChain(error);
    }

  }, [account, loadData,]);


  useEffect(() => {
    loadData();
  }, [loadData])

  return {
    isLoading,
    quest,
    campaign,
    loadData,
    campaignExecute,
    finishClaim,
  }
}


