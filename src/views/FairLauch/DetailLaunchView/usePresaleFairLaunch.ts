import { BigNumber, Contract } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useCallback, useEffect, useState } from "react"
import { configEnv } from "~/@config";
import { ApiException } from "~/@core/dto";
import { getExplorer } from "~/@web3-config/evm";
import { ERC20 } from "~/abi";
import { PresaleFairLaunchTemplateV1 } from "~/abi/PresaleFairLaunchTemplateV1";
import { PresaleFairLaunchTemplateV1__factory } from "~/abi/factories/PresaleFairLaunchTemplateV1__factory";
import ERC20__factory from "~/common/abis/ERC20__factory";


import { formatAmountToken, getMessageErrorBlockChain, parseAmountToken } from "~/common/block-chain.helper";
import { EStatusLaunch } from "~/common/enums/EStatusLaunch";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import useCustomToast from "~/hooks/@global/useCustomToast";
import fairlaunchTokenService from "~/services/fairlaunch.token.service";


export const usePresaleFairLaunch = (props: {
  presaleAddress: string;
  tokenAddress: string;
}) => {

  const { presaleAddress } = props;
  const toast = useCustomToast();

  const [isScreenLoading, setScreenLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isClaimed, setIsClaimed] = useState(true);
  const [statusW3, setStatusW3] = useState<EStatusLaunch>(null);

  const { account, chainId, provider } = useConnectWallet();
  const [detailPresale, setDetailPresale] = useState({
    allocation: BigNumber.from(0),
    totalContributors: null,
    tokenForLiquidity: null,
    tokenForPresale: null,
    softCap: null,
    startTime: null,
    endTime: null,
    balance: null,
    totalRaised: null,

    tokenName: null,
    tokenSymbol: null,
    totalSupply: null,
    decimals: null,
  })

  const loadData = useCallback(async () => {
    try {

      if (account) {

        const poolFactory = new Contract(
          presaleAddress,
          PresaleFairLaunchTemplateV1__factory.abi,
          provider,
        ) as PresaleFairLaunchTemplateV1;

        const tokenCt = new Contract(
          props.tokenAddress,
          ERC20__factory.abi,
          provider,
        ) as ERC20;

        const [
          allocation,
          totalContributors,
          tokenForLiquidity,
          tokenForPresale,
          softCap,
          startTime,
          endTime,
          balance,
          totalRaised,
          tokenName,
          tokenSymbol,
          totalSupply,
          decimals,
        ] = await Promise.all([
          poolFactory.userAllocations(account),
          poolFactory.totalContributors(),
          poolFactory.tokensForLiquidity(),
          poolFactory.tokensForPresale(),
          poolFactory.softCap(),
          poolFactory.startTime(),
          poolFactory.endTime(),
          provider.getBalance(account),
          poolFactory.totalRaised(),

          tokenCt.name(),
          tokenCt.symbol(),
          tokenCt.totalSupply(),
          tokenCt.decimals(),
        ])

        const params = {
          allocation,
          totalContributors: totalContributors.toNumber(),
          tokenForLiquidity: formatAmountToken(tokenForLiquidity, decimals),
          tokenForPresale: formatAmountToken(tokenForPresale, decimals),
          softCap: formatAmountToken(softCap, decimals),
          startTime: new Date(startTime.toNumber() * 1000),
          endTime: new Date(endTime.toNumber() * 1000),
          balance: formatAmountToken(balance, decimals),
          totalRaised: formatAmountToken(totalRaised, decimals),
          tokenName,
          tokenSymbol,
          totalSupply: formatAmountToken(totalSupply, decimals),
          decimals: decimals,
        }
        console.log(params);

        setDetailPresale(params);

      }

    } catch (error) {
      console.log({ error });
    }
  }, [account, presaleAddress, props.tokenAddress, provider])

  const buyToken = useCallback(async (amount: string) => {

    setIsLoading(true);
    try {

      const signer = provider.getSigner();
      const poolFactory = new Contract(
        presaleAddress,
        PresaleFairLaunchTemplateV1__factory.abi,
        provider
      ) as PresaleFairLaunchTemplateV1;


      const { transactionHash } = await (
        await poolFactory.connect(signer).deposit({ value: parseAmountToken(amount) }).catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        })
      ).wait()
        .catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        });


      const txLink = `${getExplorer(chainId)}/tx/${transactionHash}`.trim();
      console.log('--------link TX-----------');
      console.log({
        txLink,
      });
      console.log('-------------------');

      await loadData();

      toast.success({
        subTitle: 'Buy success',
        description: `${getExplorer(chainId)}/tx/${transactionHash}`.trim(),
      })

      setIsLoading(false);

    } catch (error) {
      console.log(`-------------------`);
      console.log(error);
      console.log(`-------------------`);
      toast.handleError(error)
      setIsLoading(false);
    }

    setIsLoading(false);
  }, [chainId, loadData, presaleAddress, provider,]);

  const claimToken = useCallback(async () => {

    setIsLoading(true);
    try {

      const signer = provider.getSigner();
      const poolFactory = new Contract(
        presaleAddress,
        PresaleFairLaunchTemplateV1__factory.abi,
        provider
      ) as PresaleFairLaunchTemplateV1;

      const { transactionHash } = await (
        await poolFactory.connect(signer).claim().catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        })
      ).wait()
        .catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        });


      const txLink = `${getExplorer(chainId)}/tx/${transactionHash}`.trim();
      console.log('--------link TX-----------');
      console.log({
        txLink,
      });
      console.log('-------------------');

      setIsClaimed(true);
      await loadData();

      toast.success({
        subTitle: 'Claim success',
        description: `${getExplorer(chainId)}/tx/${transactionHash}`.trim(),
      })

      setIsLoading(false);

    } catch (error) {
      console.log(`-------------------`);
      console.log(error);
      console.log(`-------------------`);
      toast.handleError(error)
      setIsLoading(false);
    }

    setIsLoading(false);
  }, [chainId, loadData, presaleAddress, provider,]);

  // pool không thành công user rút token về ví
  // getStatus() == EStatus.Failed || getStatus() == EStatus.Canceled,
  const withdrawToken = useCallback(async () => {

    setIsLoading(true);
    try {

      const signer = provider.getSigner();
      const poolFactory = new Contract(
        presaleAddress,
        PresaleFairLaunchTemplateV1__factory.abi,
        provider
      ) as PresaleFairLaunchTemplateV1;

      const { transactionHash } = await (
        await poolFactory.connect(signer).withdraw().catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        })
      ).wait()
        .catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        });


      const txLink = `${getExplorer(chainId)}/tx/${transactionHash}`.trim();
      console.log('--------link TX-----------');
      console.log({
        txLink,
      });
      console.log('-------------------');

      await loadData();

      toast.success({
        subTitle: 'Withdraw success',
        description: `${getExplorer(chainId)}/tx/${transactionHash}`.trim(),
      })

      setIsLoading(false);

    } catch (error) {
      console.log(`-------------------`);
      console.log(error);
      console.log(`-------------------`);
      toast.handleError(error)
      setIsLoading(false);
    }

    setIsLoading(false);
  }, [chainId, provider,]);

  const emergencyWithdraw = useCallback(async () => {
    setIsLoading(true);
    try {

      const signer = provider.getSigner();
      const poolFactory = new Contract(
        presaleAddress,
        PresaleFairLaunchTemplateV1__factory.abi,
        signer
      ) as PresaleFairLaunchTemplateV1;

      const { transactionHash } = await (
        await poolFactory.connect(signer).refund().catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        })
      ).wait()
        .catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        });

      const txLink = `${getExplorer(chainId)}/tx/${transactionHash}`.trim();
      console.log('--------link TX-----------');
      console.log({
        txLink,
      });
      console.log('-------------------');

      await loadData();

      toast.success({
        subTitle: 'Emergency Withdraw success',
        description: `${getExplorer(chainId)}/tx/${transactionHash}`.trim(),
      })

      setIsLoading(false);

    } catch (error) {
      console.log(`-------------------`);
      console.log(error);
      console.log(`-------------------`);
      toast.handleError(error)
      setIsLoading(false);
    }
    setIsLoading(false);
  }, [chainId, loadData, presaleAddress, provider,])

  const finalize = useCallback(async () => {
    setIsLoading(true);
    try {

      const signer = provider.getSigner();
      const poolFactory = new Contract(
        presaleAddress,
        PresaleFairLaunchTemplateV1__factory.abi,
        signer
      ) as PresaleFairLaunchTemplateV1;

      const { transactionHash } = await (
        await poolFactory.connect(signer).finalize().catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        })
      ).wait()
        .catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        });

      const txLink = `${getExplorer(chainId)}/tx/${transactionHash}`.trim();
      console.log('--------link TX-----------');
      console.log({
        txLink,
      });
      console.log('-------------------');

      await Promise.all([
        loadData(),
        checkStatus(),
      ])

      toast.success({
        subTitle: 'Finalize success',
        description: `${getExplorer(chainId)}/tx/${transactionHash}`.trim(),
      })

      setIsLoading(false);

    } catch (error) {
      console.log(`-------------------`);
      console.log(error);
      console.log(`-------------------`);
      toast.handleError(error)
      setIsLoading(false);
    }
    setIsLoading(false);
  }, [chainId, loadData, presaleAddress, provider,])

  // cancel
  const cancelToken = useCallback(async () => {

    setIsLoading(true);
    try {

      const signer = provider.getSigner();
      const poolFactory = new Contract(
        presaleAddress,
        PresaleFairLaunchTemplateV1__factory.abi,
        provider
      ) as PresaleFairLaunchTemplateV1;

      const { transactionHash } = await (
        await poolFactory.connect(signer).cancel().catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        })
      ).wait()
        .catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        });


      const txLink = `${getExplorer(chainId)}/tx/${transactionHash}`.trim();
      console.log('--------link TX-----------');
      console.log({
        txLink,
      });
      console.log('-------------------');

      await Promise.all([
        loadData(),
        checkStatus(),
      ])

      toast.success({
        subTitle: 'Cancel success',
        description: `${getExplorer(chainId)}/tx/${transactionHash}`.trim(),
      })

      setIsLoading(false);

    } catch (error) {
      console.log(`-------------------`);
      console.log(error);
      console.log(`-------------------`);
      toast.handleError(error)
      setIsLoading(false);
    }

    setIsLoading(false);
  }, [chainId, provider,]);

  const checkIsClaimed = useCallback(async () => {
    try {

      if (account) {

        const poolFactory = new Contract(
          presaleAddress,
          PresaleFairLaunchTemplateV1__factory.abi,
          provider,
        ) as PresaleFairLaunchTemplateV1;

        const check = await poolFactory.userClaimed(account);
        console.log({ check });
        setIsClaimed(check);
      }

    } catch (error) {
      console.log({ error });
    }
  }, [account, presaleAddress, provider])

  const checkStatus = useCallback(async () => {
    // setScreenLoading(true);
    try {

      const poolFactory = new Contract(
        presaleAddress,
        PresaleFairLaunchTemplateV1__factory.abi,
        provider,
      ) as PresaleFairLaunchTemplateV1;

      const check = await poolFactory.getStatus();
      console.log({ check });
      setStatusW3(check);
      setScreenLoading(false);

    } catch (error) {
      console.log({ error });
      setScreenLoading(false);
    }
  }, [presaleAddress, provider])

  const updateStartTime = useCallback(async (startTime: string, chainId: number, presaleAddress: string) => {
    setIsLoading(true);
    try {
      const startTimeBlockChain = Math.floor(new Date(startTime).getTime() / 1000);
      // const endTimeBlockChain = Math.floor(new Date(endTime).getTime() / 1000);
      const signer = provider.getSigner();
      const poolFactory = new Contract(
        presaleAddress,
        PresaleFairLaunchTemplateV1__factory.abi,
        signer
      ) as PresaleFairLaunchTemplateV1;

      const { transactionHash } = await (
        await poolFactory.connect(signer).updateStartTime(startTimeBlockChain).catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        })
      ).wait()
        .catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        });

      const txLink = `${getExplorer(chainId)}/tx/${transactionHash}`.trim();
      console.log('--------link TX-----------');
      console.log({
        txLink,
      });
      console.log('-------------------');

      await Promise.all([
        loadData(),
        checkStatus(),
      ])

      try {
        await fairlaunchTokenService.updateTime({
          chainId,
          presaleAddress,
          startTime: new Date(startTime).toISOString()
        })
      } catch (error) {
        console.log({ error });
      }

      toast.success({
        subTitle: 'Update success',
        description: `${getExplorer(chainId)}/tx/${transactionHash}`.trim(),
      })

      setIsLoading(false);

    } catch (error) {
      console.log(`-------------------`);
      console.log(error);
      console.log(`-------------------`);
      toast.handleError(error)
      setIsLoading(false);
    }
    setIsLoading(false);
  }, [chainId, checkStatus, loadData, presaleAddress, provider])

  const updateEndTime = useCallback(async (endTime: string, chainId: number, presaleAddress: string) => {
    setIsLoading(true);
    try {

      const endTimeBlockChain = Math.floor(new Date(endTime).getTime() / 1000);
      const signer = provider.getSigner();
      const poolFactory = new Contract(
        presaleAddress,
        PresaleFairLaunchTemplateV1__factory.abi,
        signer
      ) as PresaleFairLaunchTemplateV1;

      const { transactionHash } = await (
        await poolFactory.connect(signer).updateEndTime(endTimeBlockChain).catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        })
      ).wait()
        .catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        });

      const txLink = `${getExplorer(chainId)}/tx/${transactionHash}`.trim();
      console.log('--------link TX-----------');
      console.log({
        txLink,
      });
      console.log('-------------------');

      await Promise.all([
        loadData(),
        checkStatus(),
      ])

      try {
        await fairlaunchTokenService.updateTime({
          chainId,
          presaleAddress,
          endTime: new Date(endTime).toISOString()
        })
      } catch (error) {
        console.log({ error });
      }

      toast.success({
        subTitle: 'Update success',
        description: `${getExplorer(chainId)}/tx/${transactionHash}`.trim(),
      })

      setIsLoading(false);

    } catch (error) {
      console.log(`-------------------`);
      console.log(error);
      console.log(`-------------------`);
      toast.handleError(error)
      setIsLoading(false);
    }
    setIsLoading(false);
  }, [chainId, checkStatus, loadData, presaleAddress, provider])

  useEffect(() => {
    loadData();
  }, [loadData])

  useEffect(() => {
    checkIsClaimed();
  }, [checkIsClaimed])

  useEffect(() => {
    checkStatus();
  }, [checkStatus])

  return {
    statusW3,
    isScreenLoading,
    isLoading,
    detailPresale,
    isClaimed,
    buyToken,
    claimToken,
    emergencyWithdraw,
    finalize,
    withdrawToken,
    cancelToken,
    updateStartTime,
    updateEndTime,
  }
}
