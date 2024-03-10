
export interface ICampaign {
  id?: string;
  campaignId?: string;
  chainId: number,
  address: string,
  creatorAddress: string,
  totalReward?: number;
  exactTotalReward?: string;
  currency?: string;
  tokenDecimals?: number;
  startTime: string | Date;
  endTime: string | Date;
  campaignTitle: string;
  campaignName: string;
  campaignDescription: string;
  maxWinner?: number;
  totalJoin?: number;

  status?: null;
  winner?: number;
  campaignType?: string;
  campaignStatus?: string;
  claimedTotal?: number;
  quest?: IQuest[];
  logo?: string;
  banner?: null;
  callBackUrl?: null;
  reward?: IReward[];
}

export interface IQuest {
  id?: string;
  name: string;
  description: string;
  title: string;
  questType: string;
  logo?: null;
  logoContentType?: null;
  socialType: string;
  socialSource: string;
  socialRef: string;
  status?: null;
}

export interface IReward {
  ResourceType: string;
  type: string;
  point: number;
}
