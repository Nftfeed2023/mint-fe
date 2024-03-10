import { Contract } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react"
import { configEnv } from "~/@config";
import { ERC721Template__factory, ERC721Template } from "~/abi";
import { StakeNftAutoApy } from "~/abi/StakeNftAutoApy";
import { StakeNftAutoApy__factory } from "~/abi/factories/StakeNftAutoApy__factory";
import { formatAmountToken } from "~/common/block-chain.helper";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";


const { customSMC } = configEnv();


export const useMyNft = (props: {
  addressNft: string,
  addressApy: string
}) => {

  const { addressNft, addressApy } = props;
  const { account, chainId, provider } = useConnectWallet();
  const [myTokenIds, setMyTokenIds] = useState<number[]>([]);

  const [selectedMyTokenIds, setSelectedMyTokenIds] = useState([]);

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

  const loadMyTokenIds = useCallback(async () => {
    try {
      // const { SHARKIE_NFT, STAKE_NFT_AUTO_APY } = customSMC[chainId];

      const nftCt = new Contract(nftInfo.nftAddress, ERC721Template__factory.abi, provider) as ERC721Template;

      const tokenIds = await nftCt.tokenIdsOfOwner(account).then(v => v.map(t => t.toNumber()));
      setMyTokenIds(tokenIds.sort());

    } catch (error) {
      console.log(`-------------------`);
      console.log(error);
      console.log(`-------------------`);
    }
  }, [account, nftInfo.nftAddress, provider]);


  useEffect(() => {
    loadMyTokenIds()
  }, [loadMyTokenIds]);


  return {
    loadMyTokenIds,
    myTokenIds,
    selectedMyTokenIds,
    setSelectedMyTokenIds
  }

}
