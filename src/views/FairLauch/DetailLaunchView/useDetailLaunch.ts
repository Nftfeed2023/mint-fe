import { useCallback, useState } from "react"

import { ILauchPool } from "~/dto/ILauchPool";
import useCustomToast from "~/hooks/@global/useCustomToast";
import fairlaunchTokenService from "~/services/fairlaunch.token.service";


export const useDetailLaunch = () => {

  const toast = useCustomToast();
  const [isLoading, setIsLoading] = useState(false);
  const [detailLaunch, setDetailLaunch] = useState<ILauchPool>(null);

  const loadDetailLaunch = useCallback(async (chainId?: string, presaleAddress?: string) => {
    setIsLoading(true);
    try {

      const rs = await fairlaunchTokenService.detail({
        presaleAddress,
        chainId,
      });
      setDetailLaunch(rs);
      setIsLoading(false);

    } catch (error) {
      console.log(`-------------------`);
      console.log(error);
      console.log(`-------------------`);
      setIsLoading(false);
    }
  }, [])

  return {
    isLoading,
    detailLaunch,
    loadDetailLaunch,
  }
}
