// import { EVM_CHAIN_LIST } from "./chain-list";
// const data = {};
// Object.values(EVM_CHAIN_LIST).forEach(({ chainId, chainName, }) => {
//   const key = chainName.replace(/\s/g, "_").toUpperCase();
//   Object.assign(data, {
//     [key]: chainId
//   })
// });

// console.log(`-------------------`);
// console.log(data);
// console.log(`-------------------`);

export const CHAIN_CODE = {
  ETH: 1,
  OP_MAINNET: 10,
  BSC_MAINNET: 56,
  BSC_TESTNET: 97,
  POLYGON_MAINNET: 137,
  OP_GOERLI_TESTNET: 420,
  ZETACHAIN_MAINNET: 7000,
  ZETACHAIN_TESTNET: 7001,
  BASE_MAINNET: 8453,
  POLYGON_MUMBAI: 80001,
  BASE_GOERLI_TESTNET: 84531,
  ZKSYNC_ERA_TESTNET: 280,
  ZKSYNC_ERA_MAINNET: 324,
  ARBITRUM_MAINNET: 42161,
  ARBITRUM_GOERLI_TESTNET: 421613,
  SCROLL_SEPOLIA_TESTNET: 534351,
  SCROLL_MAINNET: 534352,
  POLYGON_TESTNET: 80001,
  AVAX: 43114,
  ZORA: 7777777,
  OPBNB: 204,
  LINEA: 59144,
  MANTA: 169,
  TAIKO: 167008,
  BLAST_TESTNET: 168587773,
  BLAST_MAINNET: 81457,
};
