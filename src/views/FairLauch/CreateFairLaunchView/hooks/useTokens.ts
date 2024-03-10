import { BigNumber, Contract } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useCallback, useState } from "react"
import { configEnv } from "~/@config";
import { EVM_CHAIN_LIST } from "~/@config/chain-list";
import { ApiException } from "~/@core/dto";
import { getExplorer } from "~/@web3-config/evm";
import { ERC20, ERC20__factory } from "~/abi";

import { TokenFactoryV2 } from "~/abi/TokenFactoryV2";
import { TokenFactoryV2__factory } from "~/abi/factories/TokenFactoryV2__factory";

import { getMessageErrorBlockChain } from "~/common/block-chain.helper";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import useCustomToast from "~/hooks/@global/useCustomToast";

const { customSMC } = configEnv();

export const useTokens = (props: {
}) => {

  const toast = useCustomToast();
  const [isLoading, setIsLoading] = useState(false);
  const { account, chainId, provider } = useConnectWallet();

  const { chainName, logo, dislayName, nativeCurrency } = EVM_CHAIN_LIST[
    chainId
  ] || {
    chainName: "",
    logo: "",
    dislayName: "",
    nativeCurrency: { symbol: "" },
  };

  const [tokenInfo, setTokenInfo] = useState({
    tokenName: "",
    tokenSymbol: "",
    totalSupply: null,
    decimals: null,
    currency: "",
  })

  const createToken = useCallback(async (
    name: string,
    symbol: string,
    totalSupply: number,
    callBack?: (tokenAddress: string) => Promise<void>
  ) => {

    setIsLoading(true);
    try {

      if (chainId && account) {

        const signer = provider.getSigner();
        const poolFactory = new Contract(
          customSMC[chainId].TOKEN_FACTORY_V1,
          TokenFactoryV2__factory.abi,
          provider
        ) as TokenFactoryV2;
        const creationFee = await poolFactory.creationFee();
        const { transactionHash, logs, events } = await (
          await poolFactory.connect(signer).deploy(
            name,
            symbol,
            BigNumber.from(totalSupply),
            {
              value: creationFee
            }
          ).catch(err => {
            throw new ApiException(getMessageErrorBlockChain(err))
          })
        ).wait()
          .catch(err => {
            throw new ApiException(getMessageErrorBlockChain(err))
          });
        const tokenAddress = events[0].address;
        if (callBack) {
          await callBack(tokenAddress)
        }

        const txLink = `${getExplorer(chainId)}/tx/${transactionHash}`.trim();
        console.log('--------link TX-----------');
        console.log({
          txLink,
        });
        console.log('-------------------');

        toast.success({
          title: "Success",
          subTitle: 'Create Token Success',
          description: `${getExplorer(chainId)}/tx/${transactionHash}`.trim(),
        })
      }

      setIsLoading(false);

    } catch (error) {
      console.log(`-------------------`);
      console.log(error);
      console.log(`-------------------`);
      toast.handleError(error)
      setIsLoading(false);
    }

    setIsLoading(false);
  }, [account, chainId, provider,]);

  const loadTokensInfo = useCallback(async (tokenAddress: string) => {
    setIsLoading(true);
    try {

      if (tokenAddress) {
        const tokenCt = new Contract(
          tokenAddress,
          ERC20__factory.abi,
          provider,
        ) as ERC20;

        const [
          tokenName,
          tokenSymbol,
          totalSupply,
          decimals,
        ] = await Promise.all([

          tokenCt.name(),
          tokenCt.symbol(),
          tokenCt.totalSupply(),
          tokenCt.decimals(),
        ])

        setTokenInfo({
          tokenName,
          tokenSymbol,
          totalSupply: formatEther(totalSupply),
          decimals: decimals,
          currency: nativeCurrency.symbol
        })
      } else {
        setTokenInfo({
          tokenName: "",
          tokenSymbol: "",
          totalSupply: null,
          decimals: null,
          currency: "",
        })
      }

      setIsLoading(false);

    } catch (error) {
      console.log(`-------------------`);
      console.log(error);
      console.log(`-------------------`);
      setIsLoading(false);
    }
  }, [nativeCurrency.symbol, provider])

  return {
    isLoading,
    tokenInfo,
    createToken,
    loadTokensInfo,
  }
}
