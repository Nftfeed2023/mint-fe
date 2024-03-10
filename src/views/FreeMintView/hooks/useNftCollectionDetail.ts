import { useCallback, useEffect, useState } from "react";
import { IQuest, NftCollection } from "~/dto/nft-project.dto";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import useCustomToast from "~/hooks/@global/useCustomToast";
import zealyConnector from "~/services/@global/zealy.connector";
import nftCollectionService from "~/services/nft-collection.service";





export const useNftCollectionDetail = ({ address, chainId }) => {

  const [isLoading, setIsLoading] = useState(false);
  const toast = useCustomToast();
  const { account } = useConnectWallet();

  const [collection, setCollection] = useState<NftCollection>()

  const loadData = useCallback(async () => {
    try {
      if (address && chainId) {
        const res = await nftCollectionService.detail({ address, chainId });

        const { quests = [] } = res;

        const loadQuestAction = async () => {
          try {
            const resUserInfo = await zealyConnector.getUserInfoByWalletAddress({ ethAddress: account });
            const userId = resUserInfo.id || "";
            const resQuest = await Promise.all(
              quests.map(q =>
                zealyConnector.claimedQuests({
                  questId: q.id,
                  userId
                }).then(v => ({ ...q, ...v })).catch(_ => ({ ...q, claimed: false }))
              )
            )

            return resQuest;
          } catch (error) {
            console.log({ error });

            return quests.map(v => ({ ...v, claimed: false }))
          }
        }

        const newDataQuest = await loadQuestAction();

        setCollection({
          ...res,
          quests: newDataQuest
        });
      }

    } catch (error) {
      console.log({ error });

    }

  }, [account, address, chainId]);


  useEffect(() => { loadData() }, [loadData]);

  return {
    collection,
  }
}
