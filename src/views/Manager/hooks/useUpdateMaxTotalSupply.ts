import { Contract } from "ethers";
import { useCallback, useState } from "react"
import { configEnv } from "~/@config";
import { ApiException } from "~/@core/dto";
import { getExplorer } from "~/@web3-config/evm";
import { MintNftFactoryV2__factory } from "~/abi/factories/MintNftFactoryV2__factory";
import { MintNftFactoryV2 } from "~/abi/MintNftFactoryV2";


import { getMessageErrorBlockChain } from "~/common/block-chain.helper";
import { UpdateMaxTotalSupplyReq } from "~/dto/nft-collection.dto";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import useCustomToast from "~/hooks/@global/useCustomToast";
import managerService from "~/services/manager.service";


const { customSMC } = configEnv();

export const useUpdateMaxTotalSupply = () => {

  const [isLoading, setIsLoading] = useState(false);
  const toast = useCustomToast();

  const { provider } = useConnectWallet();


  const updateMaxTotalSupply = useCallback(async ({ maxTotalSupply, address, chainId }: UpdateMaxTotalSupplyReq, funcRunOk?: () => void) => {

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
        await poolFactory.connect(signer).changeMaxTotalSupply(
          address,
          maxTotalSupply
        ).catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        })
      ).wait()
        .catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        });

      await managerService.updateMaxTotalSupply({
        chainId,
        address,
        maxTotalSupply: Number(maxTotalSupply),
      });
      toast.success({
        subTitle: 'Update maxTotalSupply collection success',
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
    updateMaxTotalSupply
  }
}
