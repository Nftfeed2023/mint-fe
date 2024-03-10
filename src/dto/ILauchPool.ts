import { EStatusLaunch } from "~/common/enums/EStatusLaunch";

export interface ILauchPool {
  chainId?: number;
  tokenAddress?: string;
  presaleAddress?: string;
  tokenName?: string;
  tokenSymbol?: string;
  tokenDecimals?: number;
  currency?: string;
  fee?: number;
  listingOption?: number;
  tokensForPresale?: number;
  softCap?: number;
  routerAddress?: string;
  liquidity?: number;
  startTime?: string;
  endTime?: string;
  logo?: string;
  website?: string;
  facebook?: string;
  twitter?: string;
  github?: string;
  telegram?: string;
  instagram?: string;
  discord?: string;
  reddit?: string;
  youtube?: string;
  description?: string;
  managerAddress?: string;
  status?: EStatusLaunch;

  exactTokensForPresale?: string;
  totalRaised?: number;
  exactTotalRaised?: string;
  totalSupply?: number;
  exactTotalSupply?: string
}
