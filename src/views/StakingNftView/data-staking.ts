import ImgStake from "~/assets/2s.gif"
import ImgBpunk from "~/assets/images/bpunk.png"
import ImgZeta from "~/assets/images/zeta.png"

export enum ETypeStake {
  STAKE_SINGLE = 1,
  STAKE_ALL = 2
}

export interface INftStaking {
  key: string;
  title?: string;
  image?: string;
  totalReward?: string;
  totalSupply?: string;
  icChain?: string;
  chain?: string;
  chainId?: number;
  nftAddress?: string;
  mirrorNFT?: string;
  poolAddressNft: string;
  poolAddressNftApy: string;
  reward?: string;
  information?: string;
  typeStake?: ETypeStake;
}

export const DATA_STAKING: INftStaking[] = [
  {
    typeStake: ETypeStake.STAKE_SINGLE,
    key: "sharkie-nft",
    title: "Sharkie NFT",
    image: ImgStake,
    totalReward: "1,000,000",
    totalSupply: "2000",
    chain: "Base",
    poolAddressNft: "SHARKIE_NFT",
    poolAddressNftApy: "STAKE_NFT_AUTO_APY",
    icChain: "https://dd.dexscreener.com/ds-data/chains/base.png",
    reward: "WSHARKIE",
    information: `<strong>NFT BENEFITS:</strong>
    1/ 1,000,000 $WSHARKIE of Staking Rewards
    2/ Presale Whitelist for NFT Holders
    3/ NFT Liquidity Boost after Public Sale
    4/ Revenue Sharing from NFTFeed platform
    5/ DAO voting
    <strong>OTHERS:</strong>
    1/ Distribution Platform: NFTFeed
    2/ NFT Type: ERC-721
    3/ Marketplace: Opensea, Mint.Fun`,
  },
  {
    typeStake: ETypeStake.STAKE_SINGLE,
    key: "basepunk-nft",
    title: "BasePunk",
    image: ImgBpunk,
    totalReward: "700,000",
    totalSupply: "643",
    chain: "Base",
    icChain: "https://dd.dexscreener.com/ds-data/chains/base.png",
    poolAddressNft: "BPUNK_NFT",
    poolAddressNftApy: "BPUNK_STAKE_NFT_AUTO_APY",
    reward: "WBPUNK",
    information: `<strong>💡 BasePunk "Exclusive Airdrop" NFT Benefits</strong>
    - WL for minting NFT collection from BasePunk will release additional $BPUNK.
    - 700,000 $BPUNK will be divided among all free mint NFTs that have been minted.
    - Join Staking Pool to receive $WBPUNK reward.
    <strong>NOTE : WBPUNK is a temporary reward that will be converted at a 1:1 ratio to BPUNK tokens, according to the project's token launch roadmap.</strong>`,
  },
  {
    typeStake: ETypeStake.STAKE_ALL,
    key: "nftfeed-zeta",
    title: "Revolutionizing NFT Trading: NFTFeed Partners with ZetaChain",
    image: ImgZeta,
    totalReward: "",
    totalSupply: "",
    chain: "OP",
    icChain: "https://dd.dexscreener.com/ds-data/chains/optimism.png",
    chainId: 10,
    nftAddress: "0x7D01c787eb04C50987AB569351eE6A74f476C268",
    poolAddressNft: "",
    poolAddressNftApy: "",
    reward: "aZeta",
    information: ``,
  },

  // {
  //   typeStake: ETypeStake.STAKE_ALL,
  //   key: "",
  //   title: "",
  //   image: ImgStake,
  //   totalReward: "",
  //   totalSupply: "",
  //   chain: "",
  //   icChain: "",
  //   poolAddressNft: "",
  //   poolAddressNftApy: "",
  //   reward: "",
  //   information: ``,
  // },
]
