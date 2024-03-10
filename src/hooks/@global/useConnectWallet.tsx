import { useContext } from 'react'
import { WalletContext } from '~/contexts/WalletContext'


export const useConnectWallet = () => {
    const context = useContext(WalletContext)
    if (context === undefined) {
        throw new Error('useWallet hook must be used with a WalletProvider component')
    }
    return context
}