import { useModal } from './useModal'
import ConnectWalletModal from '~/container/ConnectWalletModal/ConnectWalletModal'
// import AccountModal from '~/container/AccountModal'

export const useWalletModal = (
  login: any,
  logout?: () => void,
  account?: string,
) => {
  const [onPresentConnectModal] = useModal(<ConnectWalletModal login={login} />)
  //   const [onPresentAccountModal] = useModal(<AccountModal logout={logout} />)
  return { onPresentConnectModal }
}
