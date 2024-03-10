import { Contract } from "ethers";
import { useCallback, useState } from "react"
import { configEnv } from "~/@config";
import { ApiException } from "~/@core/dto";
import { getExplorer } from "~/@web3-config/evm";
import { MintNftFactoryV2__factory } from "~/abi/factories/MintNftFactoryV2__factory";
import { MintNftFactoryV2 } from "~/abi/MintNftFactoryV2";


import { getMessageErrorBlockChain, parseAmountToken } from "~/common/block-chain.helper";
import { UpdatePriceReq } from "~/dto/nft-collection.dto";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import useCustomToast from "~/hooks/@global/useCustomToast";
import managerService from "~/services/manager.service";


const { customSMC, CONNECTORS } = configEnv();

export const useUpdatePrice = () => {

  const [isLoading, setIsLoading] = useState(false);
  const toast = useCustomToast();

  const { provider } = useConnectWallet();


  const updatePrice = useCallback(async ({ price, address, chainId }: UpdatePriceReq, funcRunOk?: () => void) => {

    setIsLoading(true);
    try {
      const { MINT_NFT_FACTORY_V2 } = customSMC[chainId];

      const signer = provider.getSigner();
      const poolFactory = new Contract(
        MINT_NFT_FACTORY_V2,
        MintNftFactoryV2__factory.abi,
        signer
      ) as MintNftFactoryV2;
      const { transactionHash } = await (
        await poolFactory.connect(signer).changePriceNft(
          address,
          parseAmountToken(price)
        ).catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        })
      ).wait()
        .catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        });

      await managerService.updatePrice({
        address,
        price: Number(price),
        chainId,
      });
      toast.success({
        subTitle: 'Update price collection success',
        description: `${getExplorer(chainId)}/tx/${transactionHash}`.trim(),
      })
      if (funcRunOk) {
        funcRunOk();
      }
    } catch (error) {
      console.log(`-------------------`);
      console.log(error);
      console.log(`-------------------`);
      toast.handleError(error)
    }

    setIsLoading(false);
  }, [provider, toast]);


  return {
    isLoading,
    updatePrice
  }
}
