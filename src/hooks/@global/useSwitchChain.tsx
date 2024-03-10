import { useWeb3React } from "@web3-react/core";
import { Network } from "@web3-react/network";
import { WalletConnect } from "@web3-react/walletconnect";
import { EVM_CHAIN_LIST } from "~/@config/chain-list";
import { useConnectWallet } from "./useConnectWallet";


export function useSwitchChain() {
  const { connector } = useConnectWallet();

  const switchChain = async (chanId: number) => {
    try {
      if (connector instanceof WalletConnect || connector instanceof Network) {
        await connector.activate(chanId === -1 ? undefined : chanId);
      } else {
        let chainConfig = undefined;
        if (chanId !== -1) {
          const { logo, ...restConfig } = EVM_CHAIN_LIST[chanId];
          chainConfig = restConfig;
        }
        await connector.activate(chanId === -1 ? undefined : chainConfig);
      }
    } catch (error) {

    }
  };

  return switchChain;
}
