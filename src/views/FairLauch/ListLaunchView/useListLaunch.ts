import { useCallback, useState } from "react"

import { ILauchPool } from "~/dto/ILauchPool";
import useCustomToast from "~/hooks/@global/useCustomToast";
import fairlaunchTokenService from "~/services/fairlaunch.token.service";


export const useListLaunch = () => {

  const toast = useCustomToast();
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [listLaunch, setListLaunch] = useState<ILauchPool[]>([]);

  const loadListLaunch = useCallback(async (pageIndex: number, managerAddress?: string) => {
    setIsLoading(true);
    try {

      const rs = await fairlaunchTokenService.list({
        pageIndex,
        pageSize: 48,
        ...(managerAddress && { managerAddress }),
      });

      setListLaunch(rs.data);
      setTotal(rs.total);
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
    listLaunch,
    total,
    loadListLaunch,
  }
}
