import { useWeb3React } from '@web3-react/core'
import { BigNumber, constants, Contract } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import { configEnv } from '~/@config'
import ERC20__factory from '~/common/abis/ERC20__factory'
import { useConnectWallet } from '../@global/useConnectWallet'

const MARKET_V2_ADDRESS = "";
const BUSD = "";
const REACT_APP_BSCSCAN = "";

export const useMarket = () => {
  const { account, provider: library } = useConnectWallet();
  const [isLoading, setLoading] = useState(false)
  const [isApproveBusd, setIsApproveBusd] = useState(false)

  const approveBusd = useCallback(async () => {
    setLoading(true)
    try {
      if (!account || !library) {
        throw new Error('Acount empty')
      }
      const signer = library.getSigner(account)
      const busdCt = new Contract(BUSD, ERC20__factory.abi, library)
      const { transactionHash } = await (
        await busdCt
          .connect(signer)
          .approve(MARKET_V2_ADDRESS, constants.MaxInt256)
      ).wait()
      setIsApproveBusd(true)
      return true
    } catch (error) {
      console.log('error', error)
    }

    setLoading(false)
    return false
  }, [account, library])

  const allowanceBusd = useCallback(async () => {
    setLoading(true)
    try {
      if (!account || !library) {
        throw new Error('Acount empty')
      }

      const busdCt = new Contract(BUSD, ERC20__factory.abi, library)
      const data: BigNumber = await busdCt.allowance(account, MARKET_V2_ADDRESS)
      setIsApproveBusd(data.gt(BigNumber.from(0)))
    } catch (error) { }
    setLoading(false)
  }, [account, library])

  useEffect(() => {
    allowanceBusd()
  }, [library, account, allowanceBusd])

  return {
    isLoading,
    isApproveBusd,
    approveBusd,
  }
}
