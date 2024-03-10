import { Contract } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react"
import { configEnv } from "~/@config";
import { ERC721Template__factory, ERC721Template } from "~/abi";
import { StakeNftAutoApy } from "~/abi/StakeNftAutoApy";
import { StakeNftAutoApy__factory } from "~/abi/factories/StakeNftAutoApy__factory";
import { formatAmountToken } from "~/common/block-chain.helper";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";


const { customSMC } = configEnv();


export const useStakedNft = (props: {
  addressNft: string,
  addressApy: string
}) => {

  const { addressNft, addressApy } = props;
  const { account, chainId, provider } = useConnectWallet();
  const [stakedTokenIds, setStakedTokenIds] = useState<number[]>([]);
  const [selectedStakedTokenIds, setSelectedStakedTokenIds] = useState([]);

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

  const loadStakedTokenIds = useCallback(async () => {
    try {
      // const { SHARKIE_NFT, STAKE_NFT_AUTO_APY } = customSMC[chainId];

      const poolCt = new Contract(nftInfo.nftApy, StakeNftAutoApy__factory.abi, provider) as StakeNftAutoApy;
      const tokenIds = await poolCt.getTokenIdsStakedByUser(account).then(v => v.map(t => t.toNumber())).catch(_ => []);
      setStakedTokenIds(tokenIds.sort());
    } catch (error) {

    }
  }, [account, nftInfo.nftApy, provider]);


  useEffect(() => {
    loadStakedTokenIds()
  }, [loadStakedTokenIds]);


  return {
    loadStakedTokenIds,
    stakedTokenIds,
    selectedStakedTokenIds,
    setSelectedStakedTokenIds
  }

}
