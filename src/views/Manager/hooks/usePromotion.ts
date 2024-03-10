import { Contract } from "ethers";
import { useCallback, useState } from "react"
import { configEnv } from "~/@config";
import { ApiException } from "~/@core/dto";
import { getExplorer } from "~/@web3-config/evm";
import { MintNftFactoryV2 } from "~/abi/MintNftFactoryV2";
import { MintNftFactoryV2__factory } from "~/abi/factories/MintNftFactoryV2__factory";

import { getMessageErrorBlockChain } from "~/common/block-chain.helper";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import useCustomToast from "~/hooks/@global/useCustomToast";


const { customSMC } = configEnv();

export const usePromotion = () => {

  const [isLoading, setIsLoading] = useState(false);
  const toast = useCustomToast();

  const { chainId, provider } = useConnectWallet();


  const update = useCallback(async (body: {
    qtys: number[],
    percents: number[],
    address: string;
  }, funcRunOk?: () => void) => {

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
        await poolFactory.connect(signer).changePromotion(
          body.address,
          body.qtys,
          body.percents
        ).catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        })
      ).wait()
        .catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        });
      const txLink = `${getExplorer(chainId)}/tx/${transactionHash}`.trim();

      toast.success({
        subTitle: 'Create project success',
        description: `${txLink}`,
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
  }, [chainId, provider, toast]);


  return {
    isLoading,
    update
  }
}
