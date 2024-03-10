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


export const useMintV2 = ({ address, ref }: { address: string, ref?: string }) => {

  const toast = useCustomToast();
  const { account, chainId, provider } = useConnectWallet();

  const [isLoading, setIsLoading] = useState(false);
  const [mintedData, setMintedData] = useState({
    maxTotalSupply: 0,
    qtyMintedCollection: 0
  });

  const [nftPrice, setNftPrice] = useState(BigNumber.from(0));

  const [promotionQtys, setPromotionQtys] = useState([]);
  const [promotionPercents, setPromotionPercents] = useState([]);
  const [endTime, setEndTime] = useState(0);



  const [isMinted, setIsMinted] = useState(false);


  const getUserMinted = useCallback(async () => {
    try {
      const { MINT_NFT_FACTORY_V2 } = customSMC[chainId];
      const poolFactory = new Contract(
        MINT_NFT_FACTORY_V2,
        MintNftFactoryV2__factory.abi,
        provider
      ) as MintNftFactoryV2;
      const [qtyMintedByUser, maxAllocationPerUsers, price, prQtys, prPercents, endT] = await Promise.all([
        poolFactory.minteds(address, account).then(r => r.toNumber()).catch(_ => 0),
        poolFactory.maxAllocationPerUsers(address).then(r => r.toNumber()).catch(_ => 0),
        poolFactory.mapPrice(address).catch(_ => BigNumber.from(0)),
        poolFactory.getPromotionQtys(address).then(arr => arr.map(v => v.toNumber())).catch(_ => []),
        poolFactory.getPromotionPercents(address).then(arr => arr.map(v => v.toNumber())).catch(_ => []),
        poolFactory.endTimes(address).then(v => v.toNumber()).catch(_ => 0)
      ])
      const isMint = maxAllocationPerUsers !== 0 && qtyMintedByUser >= maxAllocationPerUsers;
      setIsMinted(isMint);
      setNftPrice(price);
      setPromotionQtys(prQtys);
      setPromotionPercents(prPercents);
      setEndTime(endT);

    } catch (error) {
      setIsMinted(false);
    }
  }, [account, address, chainId, provider]);



  const loadData = useCallback(async () => {
    try {
      const { MINT_NFT_FACTORY_V2 } = customSMC[chainId];

      const poolFactory = new Contract(
        MINT_NFT_FACTORY_V2,
        MintNftFactoryV2__factory.abi,
        provider
      ) as MintNftFactoryV2;

      const nftCt = new Contract(
        address,
        ERC721Template__factory.abi,
        provider
      ) as ERC721Template;

      const [maxTotalSupply, qtyMintedCollection] = await Promise.all([
        poolFactory.maxTotalSupplys(address).then(t => t.toNumber()),
        nftCt.totalSupply().then(t => t.toNumber())
      ])

      setMintedData({
        maxTotalSupply,
        qtyMintedCollection
      })

    } catch (error) {

    }
  }, [address, chainId, provider]);


  useEffect(() => { getUserMinted() }, [getUserMinted]);
  useEffect(() => { loadData() }, [loadData]);



  const getPercentMinted = useCallback(() => {
    const { maxTotalSupply = 0, qtyMintedCollection = 0 } = mintedData;
    if (maxTotalSupply <= 0) {
      return 0;
    }
    return Math.floor(qtyMintedCollection * 100 / maxTotalSupply);
  }, [mintedData])

  const getPromotionAmountByQty = useCallback(async (qty: number) => {
    try {
      const { MINT_NFT_FACTORY_V2 } = customSMC[chainId];
      const poolFactory = new Contract(
        MINT_NFT_FACTORY_V2,
        MintNftFactoryV2__factory.abi,
        provider
      ) as MintNftFactoryV2;
      const amountOut = await poolFactory.getPromotionAmountByQty(address, qty);
      return formatAmountToken(amountOut)
    } catch (error) {
      return '0'
    }
  }, [address, chainId, provider])




  const mint = useCallback(async () => {
    console.log(`=====MINT V2=====`);
    setIsLoading(true);
    try {
      const { MINT_NFT_FACTORY_V2 } = customSMC[chainId];
      const signer = provider.getSigner();
      const poolFactory = new Contract(
        MINT_NFT_FACTORY_V2,
        MintNftFactoryV2__factory.abi,
        provider
      ) as MintNftFactoryV2;
      const amountOut = await poolFactory.getAmountOut(address)
      const { transactionHash, events } = await (
        await poolFactory.connect(signer).mint(address, ref ? ref : ethers.constants.AddressZero, {
          value: amountOut
        }).catch(err => {
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
      loadData();
      getUserMinted();
      toast.success({
        subTitle: 'Mint success',
        description: `${txLink}`,
      })
    } catch (error) {
      toast.handleError(error)
    }

    setIsLoading(false);
  }, [address, chainId, getUserMinted, loadData, provider, ref, toast]);




  const mintByQty = useCallback(async (qty: number) => {
    console.log(`=====MINT V2=====`);
    setIsLoading(true);
    try {
      const { MINT_NFT_FACTORY_V2 } = customSMC[chainId];
      const signer = provider.getSigner();
      const poolFactory = new Contract(
        MINT_NFT_FACTORY_V2,
        MintNftFactoryV2__factory.abi,
        provider
      ) as MintNftFactoryV2;
      const amountOut = await poolFactory.getAmountOutByQty(address, qty);
      const { transactionHash, events } = await (
        await poolFactory.connect(signer).mintByQty(address, qty, ref ? ref : ethers.constants.AddressZero, {
          value: amountOut
        }).catch(err => {
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
      loadData();
      getUserMinted();
      toast.success({
        subTitle: 'Mint success',
        description: `${txLink}`,
      })
    } catch (error) {
      toast.handleError(error)
    }

    setIsLoading(false);
  }, [address, chainId, getUserMinted, loadData, provider, ref, toast]);

  return {
    isLoading,
    ...mintedData,
    isMinted,
    getPercentMinted,
    mint,
    nftPrice,
    getPromotionAmountByQty,
    mintByQty,
    promotionQtys,
    promotionPercents,
    endTime
  }
}
