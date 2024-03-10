import { BigNumber, Contract, ethers } from "ethers";
import { useState, useCallback, useEffect } from "react";
import { configEnv } from "~/@config";
import { ApiException } from "~/@core/dto";
import { getExplorer } from "~/@web3-config/evm";
import { ERC721Template__factory, ERC721Template } from "~/abi";
import { MintNftFactoryV2__factory } from "~/abi/factories/MintNftFactoryV2__factory";
import { MintNftFactoryV2 } from "~/abi/MintNftFactoryV2";

import { parseAmountToken, stringDateToUTCDate, getMessageErrorBlockChain, formatAmountToken } from "~/common/block-chain.helper";
import { CreateProjectReq } from "~/dto/nft-project.dto";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import useCustomToast from "~/hooks/@global/useCustomToast";
import managerService from "~/services/manager.service";

const { customSMC, CONNECTORS } = configEnv();


export const useSystemFee = () => {

  const toast = useCustomToast();
  const { account, chainId, provider } = useConnectWallet();

  const [isLoading, setIsLoading] = useState(false);

  const [systemFee, setSystemFee] = useState("0");


  const loadData = useCallback(async () => {
    try {
      const { MINT_NFT_FACTORY_V2 } = customSMC[chainId];

      const poolFactory = new Contract(
        MINT_NFT_FACTORY_V2,
        MintNftFactoryV2__factory.abi,
        provider
      ) as MintNftFactoryV2;

      const royaltyFee = await poolFactory.royaltyFee().catch(_ => BigNumber.from(0));
      setSystemFee(formatAmountToken(royaltyFee))


    } catch (error) {

    }
  }, [chainId, provider]);


  useEffect(() => { loadData() }, [loadData]);

  return {
    isLoading,
    systemFee,
  }
}
