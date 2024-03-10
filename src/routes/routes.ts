import { Icon, List, } from '@chakra-ui/react';

import { ReactComponent as HomeIcon } from '~/assets/svgs/components/home.svg'
import { ReactComponent as MarketplaceIcon } from '~/assets/svgs/components/marketplace.svg'
import { ReactComponent as NFTSalesIcon } from '~/assets/svgs/components/nft-sales.svg'
import { ReactComponent as UpcomingDrop } from '~/assets/svgs/components/upcoming-drop.svg'
import { ReactComponent as CreatorIcon } from '~/assets/svgs/components/creator.svg'
import { ReactComponent as NewsIcon } from '~/assets/svgs/components/news.svg'

import { ReactComponent as HomeActiveIcon } from '~/assets/svgs/components/home-active.svg'
import { ReactComponent as MarketplaceActiveIcon } from '~/assets/svgs/components/market-place-active.svg'
import { ReactComponent as NFTSalesActiveIcon } from '~/assets/svgs/components/nft-sales-active.svg'
import { ReactComponent as UpcomingActiveDrop } from '~/assets/svgs/components/upcoming-active.svg'
import { ReactComponent as CreatorActiveIcon } from '~/assets/svgs/components/creator-active.svg'
import { ReactComponent as NewsActiveIcon } from '~/assets/svgs/components/news-active.svg'

import { ReactComponent as HomeDeActiveIcon } from '~/assets/svgs/components/home-deactive.svg'
import { ReactComponent as MarketplaceDeActiveIcon } from '~/assets/svgs/components/market-place-deactive.svg'
import { ReactComponent as NFTSalesDeActiveIcon } from '~/assets/svgs/components/nft-sales-deactive.svg'
import { ReactComponent as UpcomingDeActiveDrop } from '~/assets/svgs/components/upcoming-drop-deactive.svg'
import { ReactComponent as CreatorDeActiveIcon } from '~/assets/svgs/components/creator-deactive.svg'
import { ReactComponent as NewsDeActiveIcon } from '~/assets/svgs/components/news-deactive.svg'

import { ReactComponent as StakeIcon } from '~/assets/svgs/components/stake-token.svg'
import { ReactComponent as StakeIconActive } from '~/assets/svgs/components/stake-token-active.svg'

import { ReactComponent as LeaderboardIcon } from '~/assets/svgs/components/leaderboard.svg'
import { ReactComponent as LeaderboardIconActive } from '~/assets/svgs/components/leaderboard-active.svg'

import { ReactComponent as CoinIcon } from '~/assets/svgs/components/coin.svg'
import { ReactComponent as CoinIconActive } from '~/assets/svgs/components/coin-active.svg'

import { ReactComponent as CreateIcon } from '~/assets/svgs/components/create.svg'
import { ReactComponent as CreateActiveIcon } from '~/assets/svgs/components/create-active.svg'

import { ReactComponent as ListIcon } from '~/assets/svgs/components/list.svg'
import { ReactComponent as ListActiveIcon } from '~/assets/svgs/components/list-active.svg'

import { ReactComponent as SpecialIcon } from '~/assets/svgs/components/special.svg'
import { ReactComponent as SpecialIconActive } from '~/assets/svgs/components/special-active.svg'

export interface IMenuLayout {
  title: string;
  key: string;
  icon: any;
  iconActive: any;
  iconDeActive: any;
  href: string;
  isDisabled?: boolean;
  children?: IMenuLayout[]
}

// mananger

export const MANAGER_ROUTERS = {
  MANAGER: "/manager",
  MANAGER_PRESALE: "/presale-manager",
  // PROJECTS: "/manager/projects",
  // CREATE_PROJECT: "/manager/create-project",
  // EDIT_PROJECT: "/manager/edit-project",
  CREATE_COLLECTION: "/manager/create-collection",
  EDIT_COLLECTION: "/manager/edit-collection",
  EDIT_COLLECTION_ON_CHAIN: "/manager/edit-collection-on-chain",
  CRAWL: "/crawl",
  NFT_PASS: "/nft-pass",
  SOCIAL_ACCOUNT: "/socials-account",
  CREATE_PRESALE: "/create-presale",
  FAIR_LAUNCH: "/feedipad",
  CREATE_TOKEN: "/create-token",
  SPECIAL_NFT: "/special-nft",
  CREATE_CAMPAIGN: "/manager/create-campaign",
  MANAGER_CAMPAIGN: "/manager/manager-campaign",
}

export const MAIN_ROUTERS = {
  HOME_ROUTER: '/',
  MARKET_PLACE_ROUTER: '/marketplace/collections',
  NFT_SALE_ROUTER: '/nft-sales',
  NFT_MINT: '/nft-mint',
  NEWS: '/news',
  COLLECTIONS: '/shop',
  NFT_COLLECTION: "/nft-collection",
  NFT_COLLECTION_DETAIL: "/nft-collection-detail",
  NFT_SEARCH: "/search",
  STAKING_NFT: "/staking-nft",
  STAKE_NFTS: "/stake-nfts",
  VERIFY_SUBSCRIBE: "/verify-subscribe",
  IDO: "/ido",
  STAKING_TOKEN: "/staking-token",
  LEADERBOARD: "/leaderboard",
  SPECIAL_NFT: "/special-nft",
}

export const MAIN_MENUS: IMenuLayout[] = [
  // {
  //   title: 'Home',
  //   key: 'home',
  //   icon: HomeIcon,
  //   iconActive: HomeActiveIcon,
  //   iconDeActive: HomeDeActiveIcon,
  //   href: MAIN_ROUTERS.HOME_ROUTER,
  // },
  {
    title: 'NFT Collections',
    key: 'nftCollection',
    icon: MarketplaceIcon,
    iconActive: MarketplaceActiveIcon,
    iconDeActive: MarketplaceDeActiveIcon,
    href: MAIN_ROUTERS.NFT_COLLECTION,
    //   children: [
    //     {
    //       title: 'All',
    //       key: 'all',
    //       icon: null,
    //       href: `${MAIN_ROUTERS.MARKET_PLACE_ROUTER}?order=newest`,
    //     },
    //     // {
    //     //   title: 'sport',
    //     //   key: 'sport',
    //     //   icon: null,
    //     //   href: `${MAIN_ROUTERS.MARKET_PLACE_ROUTER}/sport`,
    //     // },
    //   ],
  },
  {
    title: 'FeediPad',
    key: 'fairlaunch',
    icon: CoinIcon,
    iconActive: CoinIconActive,
    iconDeActive: CoinIcon,
    href: MANAGER_ROUTERS.FAIR_LAUNCH,
    isDisabled: false,
  },
  {
    title: 'Special NFT',
    key: 'special-nft',
    icon: SpecialIcon,
    iconActive: SpecialIconActive,
    iconDeActive: SpecialIcon,
    href: MANAGER_ROUTERS.SPECIAL_NFT,
    isDisabled: false,
  },
  {
    title: 'Stake NFTs',
    key: 'stake-nfts',
    icon: StakeIcon,
    iconActive: StakeIconActive,
    iconDeActive: StakeIcon,
    href: MAIN_ROUTERS.STAKE_NFTS,
    isDisabled: false,
  },
  // {
  //   title: 'Stake NFT',
  //   key: 'staking-nft',
  //   icon: UpcomingDrop,
  //   iconActive: UpcomingActiveDrop,
  //   iconDeActive: UpcomingDeActiveDrop,
  //   href: MAIN_ROUTERS.STAKING_NFT,
  //   isDisabled: false,
  // },
  // {
  //   title: 'IDO',
  //   key: 'ido',
  //   icon: NewsIcon,
  //   iconActive: NewsActiveIcon,
  //   iconDeActive: NewsDeActiveIcon,
  //   href: MAIN_ROUTERS.IDO,
  //   isDisabled: false,
  // },
  {
    title: 'Leaderboad',
    key: 'leaderboad',
    icon: LeaderboardIcon,
    iconActive: LeaderboardIconActive,
    iconDeActive: LeaderboardIcon,
    href: MAIN_ROUTERS.LEADERBOARD,
    isDisabled: false,
  },
]

export const MANAGER_MENUS: IMenuLayout[] = [
  {
    title: 'Home',
    key: 'home',
    icon: HomeIcon,
    iconActive: HomeActiveIcon,
    iconDeActive: HomeDeActiveIcon,
    href: MAIN_ROUTERS.HOME_ROUTER,
  },
  {
    title: 'Collection Setting',
    key: 'manager-collection',
    icon: ListIcon,
    iconActive: ListActiveIcon,
    iconDeActive: ListIcon,
    href: MANAGER_ROUTERS.MANAGER,
  },
  {
    title: 'Presale Setting',
    key: 'presale-manager',
    icon: ListIcon,
    iconActive: ListActiveIcon,
    iconDeActive: ListIcon,
    href: MANAGER_ROUTERS.MANAGER_PRESALE,
  },
  {
    title: 'Create Collection',
    key: 'create-collection',
    icon: CreateIcon,
    iconActive: CreateActiveIcon,
    iconDeActive: CreateIcon,
    href: MANAGER_ROUTERS.CREATE_COLLECTION,
  },
  {
    title: 'Create Presale',
    key: 'create-presale',
    icon: CreateIcon,
    iconActive: CreateActiveIcon,
    iconDeActive: CreateIcon,
    href: MANAGER_ROUTERS.CREATE_PRESALE,
  },
  // {
  //   title: 'Create Collection',
  //   key: 'createCollection',
  //   icon: HomeIcon,
  //   iconActive: HomeActiveIcon,
  //   iconDeActive: HomeDeActiveIcon,
  //   href: MANAGER_ROUTERS.CREATE_COLLECTION,
  // },
]


