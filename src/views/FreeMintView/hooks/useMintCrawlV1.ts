import { BigNumber, Contract } from "ethers";
import { useState, useCallback, useEffect } from "react";
import { configEnv } from "~/@config";
import { ApiException } from "~/@core/dto";
import { getExplorer } from "~/@web3-config/evm";

import { getMessageErrorBlockChain } from "~/common/block-chain.helper";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import useCustomToast from "~/hooks/@global/useCustomToast";
import LZPOWERXLV2Abi from "./crawl-abi/LZPOWERXLV2.abi";
import nftCollectionService from "~/services/nft-collection.service";



const nftAddress = {
  layerZero: "0xcb4aed0f61258627ae110d5c3fc4cefbc3f96af6".toLowerCase(),
  loot2: "0xadBc7EC633B78dc4407215D56Eb0861dD7c51431".toLowerCase(),
}




export const useMintCrawlV1 = ({ address, targetChainId }: { address: string, targetChainId: number }) => {

  const toast = useCustomToast();
  const { account, chainId, provider } = useConnectWallet();

  const [isLoading, setIsLoading] = useState(false);


  const [nftPrice, setNftPrice] = useState(BigNumber.from(0));
  const [mintedData, setMintedData] = useState({
    maxTotalSupply: 0,
    qtyMintedCollection: 0
  });



  const loadData = useCallback(async () => {
    try {

      const { totalMints } = await nftCollectionService.mintFunCollectionInfo({
        chainId: targetChainId,
        address
      })

      setMintedData({
        maxTotalSupply: 0,
        qtyMintedCollection: totalMints
      })

    } catch (error) {

    }
  }, [address, targetChainId]);


  const loadPrice = useCallback(async () => {
    try {

      const poolFactory = new Contract(
        address,
        LZPOWERXLV2Abi.abi,
        provider
      );
      const amountOut: BigNumber = await poolFactory.cost();

      setNftPrice(amountOut);



    } catch (error) {

    }
  }, [address, provider]);




  useEffect(() => { loadPrice() }, [loadPrice]);



  useEffect(() => { loadData() }, [loadData]);


  const getPercentMinted = useCallback(() => {
    const { maxTotalSupply = 0, qtyMintedCollection = 0 } = mintedData;
    if (maxTotalSupply <= 0) {
      return 0;
    }
    return Math.floor(qtyMintedCollection * 100 / maxTotalSupply);
  }, [mintedData])





  const mint = useCallback(async () => {
    console.log(`=====MINT CRAWL V1=====`);
    setIsLoading(true);
    try {

      const signer = provider.getSigner();
      if (nftAddress.layerZero === address.toLowerCase()) {
        const poolFactory = new Contract(
          address,
          LZPOWERXLV2Abi.abi,
          provider
        );
        const amountOut = await poolFactory.cost();
        const { transactionHash } = await (
          await poolFactory.connect(signer).mint({
            value: amountOut
          }).catch(err => {
            throw new ApiException(getMessageErrorBlockChain(err))
          })
        ).wait()
          .catch(err => {
            throw new ApiException(getMessageErrorBlockChain(err))
          });
        const txLink = `${getExplorer(chainId)}/tx/${transactionHash}`.trim();
        console.log('--------link TX-----------');
        console.log({
          txLink
        });
        console.log('-------------------');
        loadData();


        toast.success({
          subTitle: 'Mint success',
          description: `${txLink}`,
        })
      }

      if (nftAddress.loot2 === address.toLowerCase()) {
        const poolFactory = new Contract(
          address,
          ["function mint()"],
          provider
        );

        const { transactionHash } = await (
          await poolFactory.connect(signer).mint().catch(err => {
            throw new ApiException(getMessageErrorBlockChain(err))
          })
        ).wait()
          .catch(err => {
            throw new ApiException(getMessageErrorBlockChain(err))
          });
        const txLink = `${getExplorer(chainId)}/tx/${transactionHash}`.trim();
        console.log('--------link TX-----------');
        console.log({
          txLink
        });
        console.log('-------------------');
        loadData();


        toast.success({
          subTitle: 'Mint success',
          description: `${txLink}`,
        })
      }




    } catch (error) {
      toast.handleError(error)
    }

    setIsLoading(false);
  }, [address, chainId, loadData, provider, toast]);



  return {
    isLoading,
    ...mintedData,
    getPercentMinted,
    mint,
    nftPrice,

  }
}
