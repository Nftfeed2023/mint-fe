import { ECollectionStatus, ESosialType, ETransactionType } from "~/common/enums";



export interface IBaseMolel {
  id: string
  createdDate: string;
  updatedDate: string;
  createdBy?: any
  updatedBy?: any
}


export interface IAskByAcount extends IBaseMolel {
  name: string
  symbol: string;
  image: string
  description: string
  version: number
  askId: number
  address: string
  tokenId: number
  seller: string
  price: number
  exactPrice: string
  status: string
  collectionName: string
}


export interface IActivityItem extends IBaseMolel {
  name: string
  image: string
  description: string
  version: number
  askId: number
  address: string
  tokenId: number
  transactionHash: string
  transactionType: ETransactionType;
  from: string
  to: string
  price: number
  exactPrice: string
  blockNumber: number
  eventData?: any
}
export interface ISosial {
  link: string
  logo: string
  type: ESosialType
}

export interface ICollectionInfo extends IBaseMolel {
  address: string
  symbol: string
  name: string
  image: string
  projectLogo?: string
  banner?: string
  status: ECollectionStatus;
  creator?: string
  creatorFeePercent: number
  whitelistChecker?: string
  iframe?: string;
  description?: string
  sosials: ISosial[]
}

export * from "./IUserInformation"
export * from "./INftProject"
