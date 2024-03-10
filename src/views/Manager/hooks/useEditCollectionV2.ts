import { useCallback, useState } from "react"
import { configEnv } from "~/@config";

import { EditCollectionReq } from "~/dto/nft-collection.dto";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import useCustomToast from "~/hooks/@global/useCustomToast";
import managerService from "~/services/manager.service";


const { customSMC, CONNECTORS } = configEnv();

export const useEditCollectionV2 = () => {

  const [isLoading, setIsLoading] = useState(false);
  const toast = useCustomToast();



  const update = useCallback(async (nftCollection: EditCollectionReq, funcRunOk?: () => void) => {
    setIsLoading(true);
    try {
      await managerService.editCollection({
        ...nftCollection,
      });
      toast.success({
        subTitle: 'Update collection success',
        description: ``,
      })
      if (funcRunOk) {
        funcRunOk();
      }
    } catch (error) {
      console.log(`-------------------`);
      console.log(error);
      console.log(`-------------------`);
      toast.handleError(error)
    }

    setIsLoading(false);
  }, [toast]);


  return {
    isLoading,
    update
  }
}
