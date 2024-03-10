import { useWeb3React } from '@web3-react/core'
import { BigNumberish, Contract } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { configEnv } from '~/@config'
import ERC721__factory from '~/common/abis/ERC721__factory'
import MarketplaceV2__factory from '~/common/abis/MarketplaceV2__factory'
import useCustomToast from '../@global/useCustomToast'
import { useConnectWallet } from '../@global/useConnectWallet'




const MARKET_V2_ADDRESS = "";
const BUSD = "";
const REACT_APP_BSCSCAN = "";

interface IMarketCollectionProps {
  collection: string
}

export const useMarketCollection = (prop: IMarketCollectionProps) => {
  const { collection } = prop
  const { account, provider: library } = useConnectWallet();
  const [isLoading, setLoading] = useState(false)
  const [isApproveCollection, setIsApproveCollection] = useState(false)
  const toast = useCustomToast()

  const approveCollection = useCallback(async () => {
    setLoading(true)
    try {
      const signer = library?.getSigner()
      const erc721Ct = new Contract(collection, ERC721__factory.abi, library)
      await (
        await erc721Ct
          .connect(signer)
          .setApprovalForAll(MARKET_V2_ADDRESS, true)
      ).wait()
      setIsApproveCollection(true)
      toast.show({
        title: 'Transaction is completed!',
        type: 'success',
      })
      setLoading(false)
      return true
    } catch (error) {
      toast.show({
        title: 'ERROR',
        description: error['message']
          ? error['message']
          : 'Transaction is failed',
        type: 'error',
      })
    }
    setLoading(false)

    return false
  }, [collection, library, toast])

  const allowanceCollection = useCallback(async () => {
    setLoading(true)
    try {
      if (!account || !library) {
        throw new Error('Acount empty')
      }
      const erc721Ct = new Contract(collection, ERC721__factory.abi, library)
      const check = await erc721Ct.isApprovedForAll(account, MARKET_V2_ADDRESS)
      console.log('----------allowanceNft---------')
      console.log({ check })
      console.log('-------------------')
      setIsApproveCollection(check)
    } catch (error) {
      console.log(error)
      // toast.show({
      //   title: 'ERROR',
      //   description: error['message']
      //     ? error['message']
      //     : 'Transaction is failed',
      //   type: 'error',
      // })
    }
    setLoading(false)
  }, [account, collection, library, toast])

  useEffect(() => {
    if (account && collection) {
      allowanceCollection()
    }
  }, [account, collection])

  /**
   * Đăng bán nft
   */
  const askListing = useCallback(
    async (tokenId: number, price: BigNumberish) => {
      setLoading(true)
      try {
        const sender = library.getSigner(account)
        const marketCt = new Contract(
          MARKET_V2_ADDRESS,
          MarketplaceV2__factory.abi,
          library,
        )
        const { transactionHash } = await (
          await marketCt.connect(sender).askListing(collection, tokenId, price)
        ).wait()
        const txHash = `${REACT_APP_BSCSCAN}/tx/${transactionHash}`.trim()
        toast.show({
          title: 'Transaction is completed!',
          //   description: `${BLOCK_CHAIN.REACT_APP_BSCSCAN}/tx/${txHash}`,
          type: 'success',
        })
        setLoading(false)
        return true
      } catch (error) {
        toast.show({
          title: 'ERROR',
          description: error['message']
            ? error['message']
            : 'Transaction is failed',
          type: 'error',
        })
      }
      setLoading(false)
      return false
    },
    [account, collection, library, toast],
  )

  /**
   * Hủy đăng bán
   */
  const askCancelListing = useCallback(
    async (askId: number) => {
      setLoading(true)
      try {
        const sender = library.getSigner(account)
        const marketCt = new Contract(
          MARKET_V2_ADDRESS,
          MarketplaceV2__factory.abi,
          library,
        )
        const { transactionHash } = await (
          await marketCt.connect(sender).askCancelListing(askId)
        ).wait()
        const txHash = `${REACT_APP_BSCSCAN}/tx/${transactionHash}`.trim()
        toast.show({
          title: 'Transaction is completed!',
          //  description: `${BLOCK_CHAIN.REACT_APP_BSCSCAN}/tx/${txHash}`,
          type: 'success',
        })
        setLoading(false)
        return true
      } catch (error) {
        toast.show({
          title: 'ERROR',
          description: error['message']
            ? error['message']
            : 'Transaction is failed',
          type: 'error',
        })
      }
      setLoading(false)
      return false
    },
    [account, library, toast],
  )

  /**
   * Thay đổi giá
   */
  const askUpdatePrice = useCallback(
    async (askId: number, price: BigNumberish) => {
      setLoading(true)
      try {
        const sender = library.getSigner(account)
        const marketCt = new Contract(
          MARKET_V2_ADDRESS,
          MarketplaceV2__factory.abi,
          library,
        )
        const { transactionHash } = await (
          await marketCt.connect(sender).askUpdatePrice(askId, price)
        ).wait()
        const txHash = `${REACT_APP_BSCSCAN}/tx/${transactionHash}`.trim()
        toast.show({
          title: 'Transaction is completed!',
          //   description: `${BLOCK_CHAIN.REACT_APP_BSCSCAN}/tx/${txHash}`,
          type: 'success',
        })
        setLoading(false)
        return true
      } catch (error) {
        toast.show({
          title: 'ERROR',
          description: error['message']
            ? error['message']
            : 'Transaction is failed',
          type: 'error',
        })
      }

      setLoading(false)
      return false
    },
    [account, library, toast],
  )

  /**
   * Mua nft
   */
  const askSale = useCallback(
    async (askId: number, price: BigNumberish) => {
      setLoading(true)
      try {
        const sender = library.getSigner(account)
        const marketCt = new Contract(
          MARKET_V2_ADDRESS,
          MarketplaceV2__factory.abi,
          library,
        )
        const { transactionHash } = await (
          await marketCt.connect(sender).askSale(askId, price)
        ).wait()
        const txHash = `${REACT_APP_BSCSCAN}/tx/${transactionHash}`.trim()
        toast.show({
          title: 'Transaction is completed!',
          description: txHash,
          type: 'success',
        })
        setLoading(false)
        return txHash
      } catch (error) {
        console.log('-------------------')
        console.log({ error: error?.error?.error })
        console.log('-------------------')
        toast.show({
          title: 'ERROR',
          description: error?.reason ?? 'Transaction is failed',
          type: 'error',
        })
      }
      setLoading(false)
      return ''
    },
    [account, library, toast],
  )

  /**
   * Trả giá NFT
   */
  const bid = useCallback(
    async (askId: number, price: BigNumberish) => {
      setLoading(true)
      try {
        const sender = library.getSigner(account)
        const marketCt = new Contract(
          MARKET_V2_ADDRESS,
          MarketplaceV2__factory.abi,
          library,
        )
        const { transactionHash } = await (
          await marketCt.connect(sender).bid(askId, price)
        ).wait()
        const txHash = `${REACT_APP_BSCSCAN}/tx/${transactionHash}`.trim()
        setLoading(false)
        return txHash
      } catch (error) {
        toast.show({
          title: 'ERROR',
          description: error['message']
            ? error['message']
            : 'Transaction is failed',
          type: 'error',
        })
      }
      setLoading(false)
      return ''
    },
    [account, library, toast],
  )

  /**
   * Đồng ý Bid
   */
  const acceptBid = useCallback(
    async (askId: number, price: BigNumberish) => {
      try {
        const sender = library.getSigner(account)
        const marketCt = new Contract(
          MARKET_V2_ADDRESS,
          MarketplaceV2__factory.abi,
          library,
        )
        const { transactionHash } = await (
          await marketCt.connect(sender).acceptBid(askId, price)
        ).wait()
        const txHash = `${REACT_APP_BSCSCAN}/tx/${transactionHash}`.trim()
        setLoading(false)
        return txHash
      } catch (error) {
        toast.show({
          title: 'ERROR',
          description: error['message']
            ? error['message']
            : 'Transaction is failed',
          type: 'error',
        })
      }
      setLoading(false)
      return ''
    },
    [account, library, toast],
  )

  /**
   * Gửi NFT
   */

  const sendNft = useCallback(
    async (tokenId: number, receiptAddress: string) => {
      setLoading(true)
      try {
        const sender = library.getSigner(account)
        const erc721Ct = new Contract(collection, ERC721__factory.abi, library)
        const { transactionHash } = await (
          await erc721Ct
            .connect(sender)
            .transferFrom(account, receiptAddress, tokenId)
        ).wait()
        const txHash = `${REACT_APP_BSCSCAN}/tx/${transactionHash}`.trim()

        toast.show({
          title: 'Transaction is completed!',
          //   description: `${BLOCK_CHAIN.REACT_APP_BSCSCAN}/tx/${txHash}`,
          type: 'success',
        })
        setLoading(false)
        return true
      } catch (error) {
        toast.show({
          title: 'ERROR',
          description: error['message']
            ? error['message']
            : 'Transaction is failed',
          type: 'error',
        })
      }
      setLoading(false)
      return false
    },
    [account, collection, library, toast],
  )

  return {
    isLoading,
    isApproveCollection,
    approveCollection,
    askListing,
    askCancelListing,
    askUpdatePrice,
    askSale,
    bid,
    acceptBid,
    sendNft,
  }
}
