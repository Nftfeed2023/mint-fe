import { BigNumber, Contract } from "ethers";
import { useState, useCallback, useEffect } from "react";
import { configEnv } from "~/@config";
import { ApiException } from "~/@core/dto";
import { getExplorer } from "~/@web3-config/evm";
import { MintNftFactory__factory, MintNftFactory, ERC721Template__factory, ERC721Template } from "~/abi";

import { parseAmountToken, stringDateToUTCDate, getMessageErrorBlockChain } from "~/common/block-chain.helper";
import { CreateProjectReq } from "~/dto/nft-project.dto";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import useCustomToast from "~/hooks/@global/useCustomToast";
import managerService from "~/services/manager.service";

const { customSMC, CONNECTORS } = configEnv();


export const useMintV1 = ({ address }) => {

  const toast = useCustomToast();
  const { account, chainId, provider } = useConnectWallet();

  const [isLoading, setIsLoading] = useState(false);
  const [mintedData, setMintedData] = useState({
    maxTotalSupply: 0,
    qtyMintedCollection: 0
  })

  const [isMinted, setIsMinted] = useState(false);

  const [nftPrice, setNftPrice] = useState(BigNumber.from(0))

  const getUserMinted = useCallback(async () => {
    try {
      const { MINT_NFT_FACTORY } = customSMC[chainId];

      const poolFactory = new Contract(
        MINT_NFT_FACTORY,
        MintNftFactory__factory.abi,
        provider
      ) as MintNftFactory;


      const price = await poolFactory.mapPrice(address).catch(_ => BigNumber.from(0));

      const isMint = await poolFactory.minteds(address, account);
      setIsMinted(isMint);
      setNftPrice(price);

    } catch (error) {
      setIsMinted(false);
    }
  }, [account, address, chainId, provider]);



  const loadData = useCallback(async () => {
    try {
      const { MINT_NFT_FACTORY } = customSMC[chainId];

      const poolFactory = new Contract(
        MINT_NFT_FACTORY,
        MintNftFactory__factory.abi,
        provider
      ) as MintNftFactory;

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






  const mint = useCallback(async () => {
    console.log(`=====MINT V1=====`);
    setIsLoading(true);
    try {
      const { MINT_NFT_FACTORY } = customSMC[chainId];
      const signer = provider.getSigner();
      const poolFactory = new Contract(
        MINT_NFT_FACTORY,
        MintNftFactory__factory.abi,
        provider
      ) as MintNftFactory;
      const amountOut = await poolFactory.getAmountOut(address)
      const { transactionHash, events } = await (
        await poolFactory.connect(signer).mint(address, {
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
  }, [address, chainId, getUserMinted, loadData, provider, toast]);

  return {
    isLoading,
    ...mintedData,
    isMinted,
    getPercentMinted,
    mint,
    nftPrice,
    getPromotionAmountByQty: (qty: number) => { return BigNumber.from(0) },
    mintByQty: (qty: number) => { return BigNumber.from(0) },
    promotionQtys: [],
    promotionPercents: [],
    endTime: 0
  }
}
