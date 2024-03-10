import { EVM_CHAIN_LIST } from "~/@config/chain-list";
import { IEvmChainConfig } from "~/@config/dto";
import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { Web3ReactHooks, initializeConnector, } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { Network } from "@web3-react/network";
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'
import { configEnv } from "~/@config";


const { applyChainIds } = configEnv();

function isExtendedChainInformation(
  chainInformation: IEvmChainConfig
): chainInformation is IEvmChainConfig {
  return !!(chainInformation as IEvmChainConfig)?.nativeCurrency;
}

export const getExplorer = (chainId: number): string | undefined => {
  const chainInformation = EVM_CHAIN_LIST[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    if (chainInformation.blockExplorerUrls.length === 0) {
      return "";
    }
    return chainInformation.blockExplorerUrls[0] || "";
  };
  return undefined;
};

export const EVM_RPC_URLS: { [chainId: number]: string[] } = Object.keys(EVM_CHAIN_LIST).reduce<{ [chainId: number]: string[] }>(
  (accumulator, chainId) => {
    const validURLs: string[] = EVM_CHAIN_LIST[Number(chainId)].rpcUrls;
    if (validURLs.length) {
      accumulator[Number(chainId)] = validURLs;
    }
    return accumulator;
  },
  {}
);

export const [metaMaskConnector, metaMaskHooks] = initializeConnector<MetaMask>((actions) => new MetaMask({ actions }));

export const [walletConnectConnectorV2, walletConnectHooksV2] = initializeConnector<WalletConnectV2>(
  (actions) =>
    new WalletConnectV2({
      actions,
      options: {
        projectId: "d885dbf45c4ca9a9b159bd4234c5e6f6",
        chains: applyChainIds,
        optionalChains: applyChainIds,
        showQrModal: true,
      },
    })
);

export const [networkConnector, networkHooks] = initializeConnector<Network>((actions) => new Network({ actions, urlMap: EVM_RPC_URLS }));

export const [coinbaseConnector, coinbaseHooks] = initializeConnector<CoinbaseWallet>(
  (actions) =>
    new CoinbaseWallet({
      actions,
      options: {
        url: "",
        appName: "Antd-Web3-Boilerplate"
      }
    })
);

export const evmConnectors: [MetaMask | WalletConnectV2 | CoinbaseWallet | Network, Web3ReactHooks][] = [
  [metaMaskConnector, metaMaskHooks],
  [walletConnectConnectorV2, walletConnectHooksV2],
  [coinbaseConnector, coinbaseHooks],
  [networkConnector, networkHooks]
]


