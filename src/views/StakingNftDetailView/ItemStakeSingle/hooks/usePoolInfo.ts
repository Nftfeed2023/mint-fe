import { Contract } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { configEnv } from "~/@config"
import { ERC721Template, ERC721Template__factory } from "~/abi";
import { StakeNftAutoApy } from "~/abi/StakeNftAutoApy";
import { StakeNftAutoApy__factory } from "~/abi/factories/StakeNftAutoApy__factory";
import { formatAmountToken, getPoolApr, parseAmountToken } from "~/common/block-chain.helper";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";



const { customSMC } = configEnv();

export const usePoolInfo = (props: {
  addressNft: string,
  addressApy: string
}) => {

  const { addressNft, addressApy } = props;
  const { account, chainId, provider } = useConnectWallet();

  const [poolInfo, setPoolInfo] = useState({
    totalStaked: 0,
    rewardPerSeconds: '0',
    startTime: 0,
    endTimeBonus: 0
  });

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


  const loadData = useCallback(async () => {

    try {
      // const { SHARKIE_NFT, STAKE_NFT_AUTO_APY } = customSMC[chainId];

      const poolCt = new Contract(nftInfo.nftApy, StakeNftAutoApy__factory.abi, provider) as StakeNftAutoApy;
      const nftCt = new Contract(nftInfo.nftAddress, ERC721Template__factory.abi, provider) as ERC721Template;

      const [
        totalStaked,
        rewardPerSeconds,
        startTime,
        endTimeBonus,
      ] = await Promise.all([
        nftCt.balanceOf(nftInfo.nftApy).then(v => v.toNumber()).catch(_ => 0),
        poolCt.rewardPerSeconds().then(v => formatAmountToken(v)).catch(_ => '0'),
        poolCt.startTime().then(v => v.toNumber()).catch(_ => 0),
        poolCt.endTimeBonus().then(v => v.toNumber()).catch(_ => 0),
      ]);

      console.log(`-------------------`);
      console.log({
        totalStaked,
        rewardPerSeconds,
        startTime,
        endTimeBonus,
      });
      console.log(`-------------------`);
      setPoolInfo({
        totalStaked,
        rewardPerSeconds,
        startTime,
        endTimeBonus,
      })
    } catch (error) {

    }

  }, [nftInfo.nftAddress, nftInfo.nftApy, provider])


  useEffect(() => {
    loadData()
  }, [loadData]);


  return {
    loadDataPoolInfo: loadData,
    poolInfo: {
      chain: "Base",
      price: "0.011 ETH",
      ...poolInfo,
      apr: getPoolApr({
        rewardPerSeconds: Number(poolInfo.rewardPerSeconds),
        rewardTokenPrice: 1,
        stakingTokenPrice: 1870,
        totalStaked: poolInfo.totalStaked
      })
    }
  }

}
