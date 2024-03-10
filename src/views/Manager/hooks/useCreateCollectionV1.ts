import { useToast } from "@chakra-ui/react";
import { Contract, ethers } from "ethers";
import { useCallback, useState } from "react"
import { configEnv } from "~/@config";
import { ApiException } from "~/@core/dto";
import { getExplorer } from "~/@web3-config/evm";
import { MintNftFactory__factory, MintNftFactory } from "~/abi";

import { getMessageErrorBlockChain, parseAmountToken, stringDateToUTCDate } from "~/common/block-chain.helper";
import { CreateProjectReq, NftCollectionReq } from "~/dto/nft-project.dto";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import useCustomToast from "~/hooks/@global/useCustomToast";
import managerService from "~/services/manager.service";


const { customSMC, CONNECTORS } = configEnv();

export const useCreateCollectionV1 = () => {

  const [isLoading, setIsLoading] = useState(false);
  const toast = useCustomToast();

  const { account, chainId, provider } = useConnectWallet();


  const create = useCallback(async (nftCollection: NftCollectionReq, funcRunOk?: () => void) => {

    setIsLoading(true);
    try {
      const { MINT_NFT_FACTORY } = customSMC[chainId];
      const signer = provider.getSigner();
      const poolFactory = new Contract(
        MINT_NFT_FACTORY,
        MintNftFactory__factory.abi,
        signer
      ) as MintNftFactory;

      const baseUrlNft = `${CONNECTORS.ROOT.baseUrl}/api/public/metadata/${chainId}`;

      const { transactionHash, events, logs } = await (
        await poolFactory.connect(signer).deploy(
          nftCollection.name,
          nftCollection.symbol,
          baseUrlNft, // baseUri,
          parseAmountToken(nftCollection.price),
          Math.floor(stringDateToUTCDate(nftCollection.endTime).getTime() / 1000),
          nftCollection.maxTotalSupply
        ).catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        })
      ).wait()
        .catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        });


      const nftAddress = events[0].address;

      const txLink = `${getExplorer(chainId)}/tx/${transactionHash}`.trim();
      console.log('--------link TX-----------');
      console.log({
        txLink,
        nftAddress,
        events
      });
      console.log('-------------------');

      await managerService.createCollection({
        ...nftCollection,
        price: Number(nftCollection.price),
        maxTotalSupply: Number(nftCollection.maxTotalSupply),
        endTime: new Date(nftCollection.endTime).toISOString(),
        chainId,
        address: nftAddress
      });
      toast.success({
        subTitle: 'Create collection success',
        description: ``,
      })
      if (funcRunOk) {
        funcRunOk();
      }
    } catch (error) {
      toast.handleError(error)
    }

    setIsLoading(false);
  }, [chainId, provider, toast]);


  return {
    isLoading,
    create
  }
}
