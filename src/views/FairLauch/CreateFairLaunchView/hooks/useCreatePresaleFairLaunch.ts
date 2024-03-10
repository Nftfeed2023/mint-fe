import { Contract } from "ethers";
import { useCallback, useEffect, useState } from "react"
import { configEnv } from "~/@config";
import { EVM_CHAIN_LIST } from "~/@config/chain-list";
import { ApiException } from "~/@core/dto";
import { getExplorer } from "~/@web3-config/evm";
import { ERC20 } from "~/abi";
import { PresaleFairLaunchFactoryV1__factory } from "~/abi/factories/PresaleFairLaunchFactoryV1__factory";
import { PresaleFairLaunchFactoryV1 } from "~/abi/PresaleFairLaunchFactoryV1";
import ERC20__factory from "~/common/abis/ERC20__factory";


import { formatAmountToken, getMessageErrorBlockChain, parseAmountToken } from "~/common/block-chain.helper";
import { ILauchPool } from "~/dto/ILauchPool";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import useCustomToast from "~/hooks/@global/useCustomToast";
import fairlaunchTokenService from "~/services/fairlaunch.token.service";


const { customSMC, CONNECTORS } = configEnv();
const MUL_DIR = 100;
const dexRouter = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1"; // pancake

const calculateAmountApprove = ({ tokensForPresale, percentForLiquidity, percentFeeRaised }: { tokensForPresale: number, percentForLiquidity: number, percentFeeRaised: number }) => {


  const ONE_HUNDRED_PERCENT = 100 * MUL_DIR;
  const tokensForLiquidity = parseAmountToken(tokensForPresale).mul(percentForLiquidity * MUL_DIR).mul(ONE_HUNDRED_PERCENT - percentFeeRaised * MUL_DIR)
    .div(ONE_HUNDRED_PERCENT).div(ONE_HUNDRED_PERCENT);

  return tokensForLiquidity.add(parseAmountToken(tokensForPresale));

}

export const useCreatePresaleFairLaunch = (props: ILauchPool) => {
  const { tokenAddress, startTime, endTime, liquidity: percentForLiquidity,
    tokensForPresale, fee: percentFeeRaised, totalSupply, softCap = 0, tokenDecimals,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const toast = useCustomToast();

  const { account, chainId, provider } = useConnectWallet();

  const [isApprove, setIsApprove] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const amountApprove = calculateAmountApprove({
    tokensForPresale,
    percentFeeRaised,
    percentForLiquidity
  })

  const loadApprove = useCallback(async () => {

    try {
      const { PRESALE_FAIR_LAUNCH_FACTORY_V1 } = customSMC[chainId];
      if (account) {
        const tokenCt = new Contract(tokenAddress, ERC20__factory.abi, provider) as ERC20;
        const allowance = await tokenCt.allowance(account, PRESALE_FAIR_LAUNCH_FACTORY_V1);

        setIsApprove(allowance.gte(amountApprove));
      }

    } catch (error) {

    }

  }, [account, amountApprove, chainId, provider, tokenAddress]);

  const approve = useCallback(async () => {
    setIsLoading(true);
    try {
      const { PRESALE_FAIR_LAUNCH_FACTORY_V1 } = customSMC[chainId];
      if (account) {
        const signer = provider.getSigner();
        const tokenCt = new Contract(tokenAddress, ERC20__factory.abi, provider) as ERC20;
        const { transactionHash } = await (
          await tokenCt.connect(signer).approve(
            PRESALE_FAIR_LAUNCH_FACTORY_V1,
            amountApprove
          ).catch(err => {
            throw new ApiException(getMessageErrorBlockChain(err))
          })
        ).wait()
          .catch(err => {
            throw new ApiException(getMessageErrorBlockChain(err))
          });
        setIsApprove(true);
        toast.success({
          subTitle: 'Approve success',
          description: `${getExplorer(chainId)}/tx/${transactionHash}`.trim(),
        })
      }

    } catch (error) {

    }
    setIsLoading(false);
  }, [account, amountApprove, chainId, provider, toast, tokenAddress]);

  useEffect(() => {
    loadApprove()
  }, [loadApprove])


  const createPool = useCallback(async (funcRunOk?: (presaleAddress: string) => Promise<void>) => {

    setIsLoading(true);
    try {
      const { PRESALE_FAIR_LAUNCH_FACTORY_V1 } = customSMC[chainId];
      const { chainName, logo, dislayName, nativeCurrency } = EVM_CHAIN_LIST[
        chainId
      ] || {
        chainName: "",
        logo: "",
        dislayName: "",
        nativeCurrency: { symbol: "" },
      };

      const signer = provider.getSigner();
      const poolFactory = new Contract(
        PRESALE_FAIR_LAUNCH_FACTORY_V1,
        PresaleFairLaunchFactoryV1__factory.abi,
        provider
      ) as PresaleFairLaunchFactoryV1;

      const value = await poolFactory.creationFee();
      const startTimeBlockChain = Math.floor(new Date(startTime).getTime() / 1000);
      const endTimeBlockChain = Math.floor(new Date(endTime).getTime() / 1000);
      const { transactionHash, events } = await (
        await poolFactory.connect(signer).deploy(
          tokenAddress,
          Math.floor(percentForLiquidity * MUL_DIR),
          parseAmountToken(tokensForPresale),
          startTimeBlockChain,
          endTimeBlockChain,
          parseAmountToken(softCap),
          parseAmountToken(0), //maxContribution
          dexRouter,
          {
            value
          }
        ).catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        })
      ).wait()
        .catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        });

      // const presaleAddress1 = events[0].address;
      const presaleAddress = events.find(v => v.event === 'DeployPool').args[1]

      const txLink = `${getExplorer(chainId)}/tx/${transactionHash}`.trim();
      console.log('--------link TX-----------');
      console.log({
        presaleAddress,
        txLink,
      });
      console.log('-------------------');

      const exactTokensForPresale = parseAmountToken(tokensForPresale).toString();
      const totalRaised = 0;
      const exactTotalRaised = parseAmountToken(totalRaised).toString();
      await fairlaunchTokenService.create({
        ...props,
        presaleAddress,
        managerAddress: account,
        listingOption: 1,
        exactTokensForPresale,
        totalRaised,
        exactTotalRaised,
        currency: nativeCurrency.symbol,
        tokenDecimals
      });

      if (funcRunOk) {
        await funcRunOk(presaleAddress);
        setIsOpen(true);
      }
      toast.success({
        subTitle: 'Success',
        description: `Create Presale Success`,
      })

    } catch (error) {
      console.log(`-------------------`);
      console.log(error);
      console.log(`-------------------`);
      toast.handleError(error)
    }

    setIsLoading(false);
  }, [account, chainId, endTime, percentForLiquidity, props, provider, softCap, startTime, toast, tokenAddress, tokenDecimals, tokensForPresale, totalSupply]);


  return {
    isOpen,
    isLoading,
    createPool,
    isApprove,
    approve,
    amountApprove,
  }
}
