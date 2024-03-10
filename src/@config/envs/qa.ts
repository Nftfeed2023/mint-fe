import { CHAIN_CODE } from "../chain-code";
import { IEnvConfig } from "../dto";

const config: IEnvConfig = {
  name: "QA",
  CONNECTORS: {
    ROOT: {
      baseUrl: "",
    },
  },
  SSO: {
    loginUrl: "".trim(),
    clientId: "".trim(),
  },
  applyChainIds: [
    CHAIN_CODE.BSC_TESTNET,
    CHAIN_CODE.ARBITRUM_GOERLI_TESTNET,
    CHAIN_CODE.OP_GOERLI_TESTNET,
    CHAIN_CODE.BASE_GOERLI_TESTNET,
    CHAIN_CODE.ZETACHAIN_TESTNET,
    CHAIN_CODE.POLYGON_TESTNET,
    CHAIN_CODE.BLAST_TESTNET,
  ],
  customSMC: {
    // OP
    [CHAIN_CODE.BSC_TESTNET]: {
      MINT_NFT_FACTORY: "",
      MINT_NFT_FACTORY_V2: "0xA0AB7FA5415bec56D6fB7698b4C53cbe3d55598e".trim(),
      STAKE_NFT_AUTO_APY: "".trim(),
      WSHARKIE: "".trim(),
      SHARKIE_NFT: "".trim(),
      STAKE_MULTIPLE_ERC721: "".trim(),

      BPUNK_NFT: "".trim(),
      BPUNK_STAKE_NFT_AUTO_APY: "".trim(),
      TOKEN_FACTORY_V1: "0x349bD40dA4c18c9128De453eecF65923ba587F45".trim(),
      PRESALE_FAIR_LAUNCH_FACTORY_V1: "".trim(),
      USDT: "".trim(),
      SOCIAL_VAULT: "0x3e0003917E78a924F46356eF3036304ca2aF350B".trim(),
    },
    // OP
    [CHAIN_CODE.OP_GOERLI_TESTNET]: {
      MINT_NFT_FACTORY: "0x2c9FF4b226B36D1e180E728fb342D74f82D32b4E",
      MINT_NFT_FACTORY_V2: "".trim(),
      STAKE_NFT_AUTO_APY: "".trim(),
      WSHARKIE: "".trim(),
      SHARKIE_NFT: "".trim(),
      STAKE_MULTIPLE_ERC721: "".trim(),

      BPUNK_NFT: "".trim(),
      BPUNK_STAKE_NFT_AUTO_APY: "".trim(),
      TOKEN_FACTORY_V1: "".trim(),
      PRESALE_FAIR_LAUNCH_FACTORY_V1: "".trim(),
      USDT: "".trim(),
    },
    // BASE
    [CHAIN_CODE.BASE_GOERLI_TESTNET]: {
      MINT_NFT_FACTORY: "0x21E5FD0274e255a5F0D1ef544822aE2bcb71773a",
      MINT_NFT_FACTORY_V2: "0x21587995689c10DC375C87d44e3e8b2220eC31b8".trim(),
      STAKE_NFT_AUTO_APY: "0x5C4401307264c16BbDbe64aB09b21A9F6DD17d87".trim(),
      WSHARKIE: "0x295B04B08a425c882C34a4ce0a85255cD22281fc".trim(),
      SHARKIE_NFT: "0xD858f831511f9e58c5146f4ed643c8bf55ACCfb4".trim(),
      STAKE_MULTIPLE_ERC721: "".trim(),

      BPUNK_NFT: "".trim(),
      BPUNK_STAKE_NFT_AUTO_APY: "".trim(),
      TOKEN_FACTORY_V1: "".trim(),
      PRESALE_FAIR_LAUNCH_FACTORY_V1: "".trim(),
      USDT: "".trim(),
    },
    // Zeta
    [CHAIN_CODE.ZETACHAIN_TESTNET]: {
      MINT_NFT_FACTORY: "",
      MINT_NFT_FACTORY_V2: "0xbcc2e7dde130ef6cb20ad4daa360cfa4e6e2b9ac".trim(),
      STAKE_NFT_AUTO_APY: "".trim(),
      WSHARKIE: "".trim(),
      SHARKIE_NFT: "".trim(),
      STAKE_MULTIPLE_ERC721: "".trim(),

      BPUNK_NFT: "".trim(),
      BPUNK_STAKE_NFT_AUTO_APY: "".trim(),
      TOKEN_FACTORY_V1: "".trim(),
      PRESALE_FAIR_LAUNCH_FACTORY_V1: "".trim(),
      USDT: "".trim(),
    },
    [CHAIN_CODE.ARBITRUM_GOERLI_TESTNET]: {
      MINT_NFT_FACTORY: "",
      MINT_NFT_FACTORY_V2: "0x15ca7e1203F25e4a56D86faCB6c4715bbA52e795".trim(),
      STAKE_NFT_AUTO_APY: "".trim(),
      WSHARKIE: "".trim(),
      SHARKIE_NFT: "".trim(),
      STAKE_MULTIPLE_ERC721: "".trim(),

      BPUNK_NFT: "".trim(),
      BPUNK_STAKE_NFT_AUTO_APY: "".trim(),
      TOKEN_FACTORY_V1: "".trim(),
      PRESALE_FAIR_LAUNCH_FACTORY_V1: "".trim(),
      USDT: "".trim(),
    },
    [CHAIN_CODE.BLAST_TESTNET]: {
      MINT_NFT_FACTORY: "",
      MINT_NFT_FACTORY_V2: "0x15ca7e1203F25e4a56D86faCB6c4715bbA52e795".trim(),
      STAKE_NFT_AUTO_APY: "".trim(),
      WSHARKIE: "".trim(),
      SHARKIE_NFT: "".trim(),
      STAKE_MULTIPLE_ERC721: "".trim(),

      BPUNK_NFT: "".trim(),
      BPUNK_STAKE_NFT_AUTO_APY: "".trim(),
      TOKEN_FACTORY_V1: "".trim(),
      PRESALE_FAIR_LAUNCH_FACTORY_V1: "".trim(),
      USDT: "".trim(),
    },
  },
};

export default config;
