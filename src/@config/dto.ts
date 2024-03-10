import type { AddEthereumChainParameter } from "@web3-react/types";

export interface IEvmChainConfig extends AddEthereumChainParameter {
  dislayName?: string;
  logo?: string;
}
export interface IEnvConfig {
  name?: string;
  CONNECTORS: {
    ROOT: {
      baseUrl: string;
    };
  };
  SSO: {
    loginUrl: string;
    clientId: string;
  };
  applyChainIds: number[];
  customSMC?: {
    [chainId: number]: {
      MINT_NFT_FACTORY: string;
      MINT_NFT_FACTORY_V2: string;
      STAKE_NFT_AUTO_APY: string;
      WSHARKIE: string;
      SHARKIE_NFT: string;
      STAKE_MULTIPLE_ERC721: string;

      BPUNK_NFT: string;
      BPUNK_STAKE_NFT_AUTO_APY: string;

      TOKEN_FACTORY_V1: string;
      PRESALE_FAIR_LAUNCH_FACTORY_V1: string;
      USDT: string;
      SOCIAL_VAULT?: string;
    };
  };
}
export type IEnvConfigResult = IEnvConfig & { EVM_CHAINS: IEvmChainConfig[] };
