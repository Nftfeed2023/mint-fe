import { useCallback, useEffect, useState } from "react"
import { PageResponse } from "~/dto/@common"
import { Leaderboard } from "~/dto/point.dto"
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import useCustomToast from "~/hooks/@global/useCustomToast";
import pointService from "~/services/point.service";


export const useLeaderboard = () => {

  const toast = useCustomToast();
  const { account } = useConnectWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [keySearch, setKeySearch] = useState("");
  const [isRegisted, setIsRegisted] = useState(false);

  const [yourRank, setYourRank] = useState<Leaderboard>(null)

  const [response, setResponse] = useState<PageResponse<Leaderboard>>({
    data: [],
    total: 0
  });


  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, total } = await pointService.leaderboard({
        pageIndex: 1,
        pageSize: 10,
        keySearch: keySearch ? keySearch.toLowerCase() : ''
      });

      setResponse({
        data,
        total
      })
    } catch (error) {

    }
    setIsLoading(false);

  }, [keySearch]);

  const loadYourRank = useCallback(async () => {
    setIsLoading(true);
    try {

      if (account) {
        const { data, } = await pointService.leaderboard({
          pageIndex: 1,
          pageSize: 10,
          keySearch: account.toLowerCase()
        });
        if (data.length) {
          setYourRank(data[0])
        }
      }
    } catch (error) {

    }
    setIsLoading(false);
  }, [account])

  const registerWl = useCallback(async (isFirst: boolean) => {
    setIsLoading(true);
    try {

      if (account) {
        const rs = await pointService.registerWl({
          evmAddress: account
        });
        if (rs) {
          setIsRegisted(rs.status === 1)
          if (!isFirst) {
            toast.success({
              title: "Success",
              description: "Verify Successfull"
            })
          }
        }
      }
    } catch (error) {
      if (!isFirst) {
        toast.handleError(error);
      }
    }
    setIsLoading(false);
  }, [account, toast])


  useEffect(() => { loadData() }, [loadData])

  useEffect(() => {
    loadYourRank();
  }, [loadYourRank])

  return {
    yourRank,
    isLoading,
    keySearch,
    setKeySearch,
    ...response,
    registerWl,
    isRegisted,
  }
}
