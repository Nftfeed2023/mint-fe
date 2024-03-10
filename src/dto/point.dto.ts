import { ENftType } from "~/common/enums";
import { EvmAddressReq } from "./evm.dto";
import { PageRequest } from "./@common";




export class NftPointConfig {
  chainId: number;
  address: string;
  tokenType: ENftType;
  tokenId?: number | any;

}

export class PointHolderNftReq extends EvmAddressReq {

  nftsConfig: NftPointConfig[]
}
export class LeaderboardReq extends PageRequest {
  keySearch?: string;
}

export class Leaderboard {
  point: number;
  rank: number;
  evmAddress: string;
}
