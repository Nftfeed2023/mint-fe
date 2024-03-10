import { PageRequest } from "./@common";


export enum EHomeListTag {
  Popular = "popular",
  OnSale = "on-sale",
  FreeMint = "free-mint"
}

export enum EListNftFilterStatus {
  ALL = "ALL",
  LIVE = "LIVE",
  ENDED = "ENDED"
}

export class ListNftFilterReq extends PageRequest {
  filterStatus?: EListNftFilterStatus
  chainId?: number
  environment?: boolean
}



export class EditCollectionReq {
  chainId: number;
  address: string;
  name: string;
  image: string;
  desc: string;
  website: string;
  twitter: string;
  discord: string;
  telegram: string;
  logo?: string;
  banner?: string;
  projectDesc?: string;
}



export class UpdatePriceReq {
  chainId: number;
  address: string;
  price: number;
}

export class UpdateEndTimeReq {
  chainId: number;
  address: string;
  endTime: string;
}

export class UpdateMaxTotalSupplyReq {
  chainId: number;
  address: string;
  maxTotalSupply: number;
}

export class UpdatePromotionReq {
  promotions: { qty: number; percent: number }[]
}


export class VerifySubscribeReq {
  verifyCode?: string;
  address?: string;
  evmAddress?: string;
  email?: string;
}
