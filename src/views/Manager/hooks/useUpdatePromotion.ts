import { useToast } from "@chakra-ui/react";
import { Contract, ethers } from "ethers";
import { useCallback, useEffect, useState } from "react"
import { configEnv } from "~/@config";
import { ApiException } from "~/@core/dto";
import { getExplorer } from "~/@web3-config/evm";
import { MintNftFactoryV2__factory } from "~/abi/factories/MintNftFactoryV2__factory";
import { MintNftFactoryV2 } from "~/abi/MintNftFactoryV2";


import { getMessageErrorBlockChain, parseAmountToken, stringDateToUTCDate } from "~/common/block-chain.helper";
import { UpdatePriceReq, UpdatePromotionReq } from "~/dto/nft-collection.dto";
import { CreateProjectReq, NftCollectionReq } from "~/dto/nft-project.dto";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import useCustomToast from "~/hooks/@global/useCustomToast";
import managerService from "~/services/manager.service";


const { customSMC, CONNECTORS } = configEnv();

export const useUpdatePromotion = ({ address }) => {

  const [isLoading, setIsLoading] = useState(false);
  const toast = useCustomToast();

  const { account, chainId, provider } = useConnectWallet();

  const [promotions, setPromotions] = useState<{ qty: number; percent: number }[]>([])

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {

      const { MINT_NFT_FACTORY_V2 } = customSMC[chainId];

      const signer = provider.getSigner();
      const poolFactory = new Contract(
        MINT_NFT_FACTORY_V2,
        MintNftFactoryV2__factory.abi,
        signer
      ) as MintNftFactoryV2;

      const [qtys, percents] = await Promise.all([
        poolFactory.getPromotionQtys(address).then(v => v.map(t => t.toNumber())).catch(_ => []),
        poolFactory.getPromotionPercents(address).then(v => v.map(t => t.toNumber())).catch(_ => []),
      ]);

      console.log(`-------------------`);
      console.log({ qtys, percents });
      console.log(`-------------------`);

      if (qtys.length === percents.length) {
        const orderQtys = qtys.sort((x, y) => y - x);
        const orderPercents = percents.sort((x, y) => y - x);
        const dataPr = orderQtys.map((qty, idx) => ({
          qty,
          percent: orderPercents[idx] / 100
        }))
        setPromotions(dataPr)
      }

    } catch (error) {

    }

    setIsLoading(false);
  }, [address, chainId, provider]);


  useEffect(() => { loadData() }, [loadData])


  const updatePromotion = useCallback(async ({ promotions }: UpdatePromotionReq, funcRunOk?: () => void) => {

    setIsLoading(true);
    try {
      // if (promotions.length === 0) {
      //   throw new ApiException("Empty inputs promotions");
      // }
      const { MINT_NFT_FACTORY_V2 } = customSMC[chainId];

      const signer = provider.getSigner();
      const poolFactory = new Contract(
        MINT_NFT_FACTORY_V2,
        MintNftFactoryV2__factory.abi,
        signer
      ) as MintNftFactoryV2;


      const orderPromotions = promotions.sort((x, y) => Number(y.qty) - Number(x.qty));

      const { transactionHash } = await (
        await poolFactory.connect(signer).changePromotion(
          address,
          orderPromotions.map(v => Number(v.qty)),
          orderPromotions.map(v => Number(v.percent) * 100),
        ).catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        })
      ).wait()
        .catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
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
  }, [address, chainId, provider, toast]);


  return {
    isLoading,
    promotions,
    updatePromotion
  }
}
