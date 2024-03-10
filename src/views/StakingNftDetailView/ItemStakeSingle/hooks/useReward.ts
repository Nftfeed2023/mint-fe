import { BigNumber, Contract } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react"
import { configEnv } from "~/@config";
import { ERC721Template__factory, ERC721Template } from "~/abi";
import { StakeNftAutoApy } from "~/abi/StakeNftAutoApy";
import { StakeNftAutoApy__factory } from "~/abi/factories/StakeNftAutoApy__factory";
import { formatAmountToken } from "~/common/block-chain.helper";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";


const { customSMC } = configEnv();


export const useReward = (props: {
  addressNft: string,
  addressApy: string
}) => {

  const { addressNft, addressApy } = props;
  const { account, chainId, provider } = useConnectWallet();

  const [pendingReward, setPendingReward] = useState('0');

  const nftInfo = useMemo(() => {
    if (chainId) {
      const data = {
        nftAddress: customSMC[chainId] ? customSMC[chainId][addressNft] : "",
        nftApy: customSMC[chainId] ? customSMC[chainId][addressApy] : "",
      }
      return data;
    }
    return {
      nftAddress: "",
      nftApy: "",
    }
  }, [addressApy, addressNft, chainId])

  const loadReward = useCallback(async () => {
    try {
      // const { STAKE_NFT_AUTO_APY } = customSMC[chainId];

      const poolCt = new Contract(nftInfo.nftApy, StakeNftAutoApy__factory.abi, provider) as StakeNftAutoApy;
      const pending = await poolCt.pendingReward(account).catch(_ => BigNumber.from(0));
      setPendingReward(formatAmountToken(pending));
    } catch (error) {

    }
  }, [account, nftInfo.nftApy, provider]);


  useEffect(() => {
    loadReward();
    // const intervalId = setInterval(() => {
    //   loadReward();
    // }, 10000);

    // return () => {
    //   clearInterval(intervalId);
    // };
  }, [loadReward]);


  return {
    pendingReward,
    loadReward,
  }

}
