import { useWeb3React } from "@web3-react/core"
import dayjs from "dayjs";
import { Contract } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { configEnv } from "~/@config";
import { getExplorer } from "~/@web3-config/evm";
import { ERC721, ERC721__factory, StakeMultipleERC721, StakeMultipleERC721__factory } from "~/abi";

import { formatAmountToken, parseAmountToken } from "~/common/block-chain.helper";

import { useNftByUser } from "./useNftByUser";
import useCustomToast from "~/hooks/@global/useCustomToast";

const { customSMC } = configEnv();


export const useStakeErc721 = ({ nftAddress }) => {
  const { provider, account, chainId } = useWeb3React();

  const toast = useCustomToast()
  const { tokenIds, loadData: loadDataNftUser } = useNftByUser({ nftAddress });
  const { STAKE_MULTIPLE_ERC721: poolAddress } = customSMC[chainId] || { STAKE_MULTIPLE_ERC721: "" };

  const [isApprovedForAll, setIsApprovedForAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [poolInfo, setPoolInfo] = useState({
    totalStaked: 0,
    rewardPerSecond: '0',
    startTime: "",
    endTime: ""
  })


  const loadPoolInfo = useCallback(async () => {
    try {

      const poolCt = new Contract(
        poolAddress,
        StakeMultipleERC721__factory.abi,
        provider
      ) as StakeMultipleERC721;


      const [
        totalStaked,
        {
          rewardPerSecond,
          daysLocked,
          startTime,
          endTime
        }
      ] = await Promise.all([
        poolCt.qtyStaked(nftAddress).then(v => v.toNumber()),
        poolCt.poolInfos(nftAddress).then(({
          rewardPerSecond,
          daysLocked,
          startTime,
          endTime
        }) => {
          return {
            rewardPerSecond: formatAmountToken(rewardPerSecond),
            daysLocked: daysLocked.toNumber(),
            startTime: startTime.toNumber(),
            endTime: endTime.toNumber(),
          }
        })
      ]);
      setPoolInfo({
        totalStaked,
        rewardPerSecond,
        startTime: dayjs(new Date(startTime * 1000).toUTCDate()).format("YYYY-MM-DD HH:mm"),
        endTime: dayjs(new Date(endTime * 1000).toUTCDate()).format("YYYY-MM-DD HH:mm"),
      })

    } catch (error) {

    }
  }, [nftAddress, poolAddress, provider]);


  useEffect(() => { loadPoolInfo() }, [loadPoolInfo]);

  const loadAllowance = useCallback(async () => {
    try {

      const tokenERC721Ct = new Contract(
        nftAddress,
        ERC721__factory.abi,
        provider
      ) as ERC721;
      // const signer = provider.getSigner()
      const allowance = await tokenERC721Ct.isApprovedForAll(account, poolAddress)
      setIsApprovedForAll(allowance);

    } catch (error) {

    }
  }, [account, nftAddress, poolAddress, provider]);


  useEffect(() => { loadAllowance() }, [loadAllowance]);



  const approve = useCallback(async () => {
    try {

      const tokenERC721Ct = new Contract(
        nftAddress,
        ERC721__factory.abi,
        provider
      ) as ERC721;
      const signer = provider.getSigner()

      const { transactionHash } = await (
        await tokenERC721Ct.connect(signer)
          .setApprovalForAll(poolAddress, true)
      ).wait();

      const txLink = `${getExplorer(chainId)}/tx/${transactionHash}`.trim();
      console.log('--------link TX-----------');
      console.log(txLink);
      console.log('-------------------');
      toast.success({
        subTitle: "txLink"
      });
      loadAllowance();
    } catch (error) {
      toast.handleError(error);
    }
  }, [chainId, loadAllowance, nftAddress, poolAddress, provider])



  const stakes = useCallback(async () => {
    setIsLoading(true);
    try {

      const poolCt = new Contract(
        poolAddress,
        StakeMultipleERC721__factory.abi,
        provider
      ) as StakeMultipleERC721;
      const signer = provider.getSigner()
      const { transactionHash } = await (
        await poolCt.connect(signer)
          .stakes(nftAddress, tokenIds)
      ).wait();

      const txLink = `${getExplorer(chainId)}/tx/${transactionHash}`.trim();
      loadDataNftUser();
      toast.success({
        description: txLink
      });

    } catch (error) {
      toast.handleError(error);
    }
    setIsLoading(false);
  }, [chainId, loadDataNftUser, nftAddress, poolAddress, provider, tokenIds])


  return {
    chainId,
    isLoading,
    tokenIds,
    isApprovedForAll,
    poolInfo,
    apr: parseAmountToken(poolInfo.rewardPerSecond).mul(86400).mul(365).div(parseAmountToken("0.0007")).mul(100),
    approve,
    stakes
  }
}
