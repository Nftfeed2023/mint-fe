import { EMintType } from "~/common/enums"
import { PageRequest } from "./@common"


export class NftCollectionDto {
  chainId: number
  address: string
  name: string
  desc: string
  image: string
  symbol: string
  maxTotalSupply: number
  exactPrice: string
  price: number;
  endTime: string;
  website: string;
  twitter: string;
  discord: string;
  telegram: string;
  maxAllocationPerUser: number;
  percentAff: number;
  versionFactory?: "V1" | "V2";
  logo?: string;
  banner?: string;
  projectDesc?: string;
  campaignId?: string;
}

export class NftCollectionReq extends NftCollectionDto {
  managerAddress: string;
}


export class CreateProjectReq {
  name: string;
  logo: string;
  banner: string;
  desc: string;
  managerAddress: string;
  nftCollection?: NftCollectionDto
}

// export class ProjectDto {
//   id?: string;
//   createdDate?: Date;
//   updatedDate?: Date;
//   createdBy?: null;
//   updatedBy?: null;
//   version?: number;
//   name?: string;
//   code?: string;
//   logo?: string;
//   banner?: string;
//   desc?: string;
//   managerAddress?: string;
// }

export class ListProjectByManagerReq extends PageRequest {
  managerAddress: string;
}



export class ListCollectionByManagerReq extends PageRequest {
  managerAddress: string;
  keyword?: string
}

export interface IQuest {
  name: string
  desc: string
  link: string
  nftCollectionId: string
  refId: string
  createdBy: any
  updatedBy: any
  id: string
  createdDate: string
  updatedDate: string
  version: number;
  claimed?: boolean;
}

export class NftCollection {
  id: string;
  createdDate: Date;
  updatedDate: Date;
  createdBy: null;
  updatedBy: null;
  version: number;
  chainId: number;
  address: string;
  name: string;
  image: string;
  symbol: string;
  desc: string;
  maxTotalSupply: number;
  exactPrice: string;
  price: number;
  endTime: Date;
  orderTrend: number;
  website?: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
  //  project: ProjectDto;
  versionFactory?: "V1" | "V2";
  quests: IQuest[];
  mintType: EMintType;
  logo?: string;
  banner?: string;
  projectDesc?: string;
  qtyMinted?: number
  isVerifyTwitter?: boolean
  campaignId: string
}


export class NftCollectionSearch {
  id: string
  address: string
  name: string
  image: string
  chainId: number
  isEnded: boolean
}



