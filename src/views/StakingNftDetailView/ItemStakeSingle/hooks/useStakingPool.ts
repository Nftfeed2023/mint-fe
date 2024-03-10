import { Contract, ethers } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react"
import { configEnv } from "~/@config";
import { ERC721Template__factory, ERC721Template } from "~/abi";
import { StakeNftAutoApy } from "~/abi/StakeNftAutoApy";
import { StakeNftAutoApy__factory } from "~/abi/factories/StakeNftAutoApy__factory";
import { formatAmountToken, getMessageErrorBlockChain } from "~/common/block-chain.helper";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";

import { usePoolInfo } from "./usePoolInfo";
import { useMyNft } from "./useMyNft";
import { useStakedNft } from "./useStakedNft";

import useCustomToast from "~/hooks/@global/useCustomToast";
import { ref } from "yup";
import { ApiException } from "~/@core/dto";
import { getExplorer } from "~/@web3-config/evm";
import { useReward } from "./useReward";


const { customSMC } = configEnv();


export const useStakingPool = (props: {
  addressNft: string,
  addressApy: string
}) => {

  const { addressNft, addressApy } = props;
  const { account, chainId, provider } = useConnectWallet();

  const toast = useCustomToast();

  const { loadDataPoolInfo, poolInfo } = usePoolInfo({ addressNft, addressApy });
  const { loadMyTokenIds, myTokenIds, selectedMyTokenIds, setSelectedMyTokenIds } = useMyNft({ addressNft, addressApy });
  const { loadStakedTokenIds, stakedTokenIds, selectedStakedTokenIds, setSelectedStakedTokenIds } = useStakedNft({ addressNft, addressApy });
  const { pendingReward, loadReward } = useReward({ addressNft, addressApy });

  const [isLoading, setIsLoading] = useState(false);

  const [isApprove, setIsApprove] = useState(false);

  const nftInfo = useMemo(() => {
    if (chainId) {
      const data = {
        nftAddress: customSMC[chainId] ? customSMC[chainId][addressNft] : "",
        nftApy: customSMC[chainId] ? customSMC[chainId][addressApy] : "",
      }
      return data;
    }
    return {
      nftAddress: "",
      nftApy: "",
    }
  }, [addressApy, addressNft, chainId])

  const getApprove = useCallback(async () => {
    setIsLoading(true);
    try {
      // const { SHARKIE_NFT, STAKE_NFT_AUTO_APY } = customSMC[chainId];
      const nftCt = new Contract(nftInfo.nftAddress, ERC721Template__factory.abi, provider) as ERC721Template;
      const approveAll = await nftCt.isApprovedForAll(account, nftInfo.nftApy).catch(_ => false);
      setIsApprove(approveAll);
    } catch (error) {

    }
    setIsLoading(false);
  }, [account, nftInfo.nftAddress, nftInfo.nftApy, provider]);


  useEffect(() => {
    getApprove()
  }, [getApprove]);


  const approve = useCallback(async () => {
    setIsLoading(true);
    try {
      // const { SHARKIE_NFT, STAKE_NFT_AUTO_APY } = customSMC[chainId];
      const nftCt = new Contract(nftInfo.nftAddress, ERC721Template__factory.abi, provider) as ERC721Template;
      const signer = provider.getSigner();

      const { transactionHash, } = await (
        await nftCt.connect(signer).setApprovalForAll(nftInfo.nftApy, true).catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        })
      ).wait()
        .catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        });
      const txLink = `${getExplorer(chainId)}/tx/${transactionHash}`.trim();
      console.log('--------link TX-----------');
      console.log({
        txLink
      });
      console.log('-------------------');
      setIsApprove(true);
      toast.success({
        subTitle: 'Approved',
        description: `${txLink}`,
      })

    } catch (error) {

    }
    setIsLoading(false);
  }, [chainId, nftInfo.nftAddress, nftInfo.nftApy, provider,]);



  const stakes = useCallback(async () => {
    setIsLoading(true);
    try {
      // const { SHARKIE_NFT, STAKE_NFT_AUTO_APY } = customSMC[chainId];
      const poolCt = new Contract(nftInfo.nftApy, StakeNftAutoApy__factory.abi, provider) as StakeNftAutoApy;
      const signer = provider.getSigner();

      const { transactionHash, } = await (
        await poolCt.connect(signer).stakes(selectedMyTokenIds).catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        })
      ).wait()
        .catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        });
      const txLink = `${getExplorer(chainId)}/tx/${transactionHash}`.trim();
      console.log('--------link TX-----------');
      console.log({
        txLink
      });
      console.log('-------------------');

      toast.success({
        subTitle: 'Staked success',
        description: `${txLink}`,
      });
      setSelectedMyTokenIds([]);
      loadDataPoolInfo();
      loadMyTokenIds();
      loadStakedTokenIds();

    } catch (error) {
      console.log(`-------------------`);
      console.log(error);
      console.log(`-------------------`);
      toast.handleError(error);
    }
    setIsLoading(false);
  }, [chainId, loadDataPoolInfo, loadMyTokenIds, loadStakedTokenIds, nftInfo.nftApy, provider, selectedMyTokenIds, setSelectedMyTokenIds, toast]);

  const stakeAll = useCallback(async () => {
    setIsLoading(true);
    try {
      // const { SHARKIE_NFT, STAKE_NFT_AUTO_APY } = customSMC[chainId];
      const poolCt = new Contract(nftInfo.nftApy, StakeNftAutoApy__factory.abi, provider) as StakeNftAutoApy;
      const signer = provider.getSigner();

      const { transactionHash, } = await (
        await poolCt.connect(signer).stakes(myTokenIds).catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        })
      ).wait()
        .catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        });
      const txLink = `${getExplorer(chainId)}/tx/${transactionHash}`.trim();
      console.log('--------link TX-----------');
      console.log({
        txLink
      });
      console.log('-------------------');

      toast.success({
        subTitle: 'Staked success',
        description: `${txLink}`,
      });
      setSelectedMyTokenIds([]);
      loadDataPoolInfo();
      loadMyTokenIds();
      loadStakedTokenIds();

    } catch (error) {
      console.log(`-------------------`);
      console.log(error);
      console.log(`-------------------`);
      toast.handleError(error);
    }
    setIsLoading(false);
  }, [chainId, loadDataPoolInfo, loadMyTokenIds, loadStakedTokenIds, myTokenIds, nftInfo.nftApy, provider, setSelectedMyTokenIds, toast]);

  const unStakes = useCallback(async () => {
    setIsLoading(true);
    try {
      // const { SHARKIE_NFT, STAKE_NFT_AUTO_APY } = customSMC[chainId];
      const poolCt = new Contract(nftInfo.nftApy, StakeNftAutoApy__factory.abi, provider) as StakeNftAutoApy;
      const signer = provider.getSigner();

      const { transactionHash, } = await (
        await poolCt.connect(signer).unStakes(selectedStakedTokenIds).catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        })
      ).wait()
        .catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        });
      const txLink = `${getExplorer(chainId)}/tx/${transactionHash}`.trim();
      console.log('--------link TX-----------');
      console.log({
        txLink
      });
      console.log('-------------------');

      toast.success({
        subTitle: 'UnStaked success',
        description: `${txLink}`,
      });
      setSelectedStakedTokenIds([]);
      loadDataPoolInfo();
      loadMyTokenIds();
      loadStakedTokenIds();
      loadReward();

    } catch (error) {
      console.log(`-------------------`);
      console.log(error);
      console.log(`-------------------`);
      toast.handleError(error);
    }
    setIsLoading(false);
  }, [chainId, loadDataPoolInfo, loadMyTokenIds, loadReward, loadStakedTokenIds, nftInfo.nftApy, provider, selectedStakedTokenIds, setSelectedStakedTokenIds, toast]);

  const unStakeAll = useCallback(async () => {
    setIsLoading(true);
    try {
      // const { SHARKIE_NFT, STAKE_NFT_AUTO_APY } = customSMC[chainId];
      const poolCt = new Contract(nftInfo.nftApy, StakeNftAutoApy__factory.abi, provider) as StakeNftAutoApy;
      const signer = provider.getSigner();

      const { transactionHash, } = await (
        await poolCt.connect(signer).unStakes(stakedTokenIds).catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        })
      ).wait()
        .catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        });
      const txLink = `${getExplorer(chainId)}/tx/${transactionHash}`.trim();
      console.log('--------link TX-----------');
      console.log({
        txLink
      });
      console.log('-------------------');

      toast.success({
        subTitle: 'UnStaked success',
        description: `${txLink}`,
      });
      setSelectedStakedTokenIds([]);
      loadDataPoolInfo();
      loadMyTokenIds();
      loadStakedTokenIds();
      loadReward();
    } catch (error) {
      console.log(`-------------------`);
      console.log(error);
      console.log(`-------------------`);
      toast.handleError(error);
    }
    setIsLoading(false);
  }, [chainId, loadDataPoolInfo, loadMyTokenIds, loadReward, loadStakedTokenIds, nftInfo.nftApy, provider, setSelectedStakedTokenIds, stakedTokenIds, toast]);


  const claimReward = useCallback(async () => {
    setIsLoading(true);
    try {
      // const { SHARKIE_NFT, STAKE_NFT_AUTO_APY } = customSMC[chainId];
      const poolCt = new Contract(nftInfo.nftApy, StakeNftAutoApy__factory.abi, provider) as StakeNftAutoApy;
      const signer = provider.getSigner();

      const { transactionHash, } = await (
        await poolCt.connect(signer).unStakes([]).catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        })
      ).wait()
        .catch(err => {
          throw new ApiException(getMessageErrorBlockChain(err))
        });
      const txLink = `${getExplorer(chainId)}/tx/${transactionHash}`.trim();
      console.log('--------link TX-----------');
      console.log({
        txLink
      });
      console.log('-------------------');

      toast.success({
        subTitle: 'UnStaked success',
        description: `${txLink}`,
      });

      loadDataPoolInfo();
      loadReward();

    } catch (error) {
      console.log(`-------------------`);
      console.log(error);
      console.log(`-------------------`);
      toast.handleError(error);
    }
    setIsLoading(false);
  }, [chainId, loadDataPoolInfo, loadReward, nftInfo.nftApy, provider, toast]);

  return {
    isLoading,
    isApprove,
    poolInfo,
    myTokenIds,
    stakedTokenIds,
    selectedMyTokenIds, setSelectedMyTokenIds,
    selectedStakedTokenIds, setSelectedStakedTokenIds,
    approve,
    stakes,
    stakeAll,
    unStakes,
    unStakeAll,
    claimReward,
    pendingReward,
  }

}
