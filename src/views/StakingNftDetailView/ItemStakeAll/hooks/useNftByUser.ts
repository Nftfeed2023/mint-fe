
import { useWeb3React } from "@web3-react/core";
import { Alchemy, Network } from "alchemy-sdk";
import { useCallback, useEffect, useState } from "react";
import { ApiException } from "~/@core/dto";

export const useNftByUser = ({ nftAddress }) => {
  const { chainId, provider, account } = useWeb3React();
  const [nfts, setNfts] = useState([]);


  const loadData = useCallback(async () => {

    const getNetwork = () => {
      if (chainId === 10) {
        return Network.OPT_MAINNET
      }
      if (chainId === 420) {
        return Network.OPT_GOERLI
      }
      return "";
    }

    const network = getNetwork();
    if (!network) {
      throw new ApiException("Invalid network")
    }
    const settings = {
      apiKey: "-Kb8fykaZ25WCP-U_5GOyN84364wp0aX", // Replace with your Alchemy API Key.
      network
    };

    const alchemy = new Alchemy(settings);
    const nftsForOwner = await alchemy.nft.getNftsForOwner(account, {
      // omitMetadata: true,
      contractAddresses: [nftAddress]
    });
    const resNfts = nftsForOwner
      .ownedNfts.map(({ tokenId, tokenType, balance, tokenUri, rawMetadata, contract: { address } }) => ({ tokenId, rawMetadata, tokenUri, tokenType, balance, address: address.toLowerCase() }))
    setNfts(resNfts)
  }, [account, chainId, nftAddress]);


  useEffect(() => {
    loadData();
  }, [loadData]);


  return {
    nfts,
    loadData,
    tokenIds: nfts.map(v => v.tokenId)
  }
}
