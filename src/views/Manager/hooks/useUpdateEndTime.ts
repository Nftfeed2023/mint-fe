import { Contract } from "ethers";
import { useCallback, useState } from "react"
import { configEnv } from "~/@config";
import { ApiException } from "~/@core/dto";
import { getExplorer } from "~/@web3-config/evm";
import { MintNftFactoryV2__factory } from "~/abi/factories/MintNftFactoryV2__factory";
import { MintNftFactoryV2 } from "~/abi/MintNftFactoryV2";


import { getMessageErrorBlockChain, stringDateToUTCDate } from "~/common/block-chain.helper";
import { UpdateEndTimeReq } from "~/dto/nft-collection.dto";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import useCustomToast from "~/hooks/@global/useCustomToast";
import managerService from "~/services/manager.service";


const { customSMC } = configEnv();

export const useUpdateEndTime = () => {

  const [isLoading, setIsLoading] = useState(false);
  const toast = useCustomToast();

  const { provider } = useConnectWallet();


  const updateEndTime = useCallback(async ({ endTime, address, chainId }: UpdateEndTimeReq, funcRunOk?: () => void) => {

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
        await poolFactory.connect(signer).changeEndTime(
          address,
          Math.floor(stringDateToUTCDate(endTime).getTime() / 1000),
        ).catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        })
      ).wait()
        .catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        });

      await managerService.updateEndTime({
        address,
        endTime: new Date(endTime).toISOString(),
        chainId
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
    updateEndTime
  }
}
