import { EvmAddressReq } from "~/dto/evm.dto";
import { rootApiService } from "./@global";
import { Leaderboard, LeaderboardReq, PointHolderNftReq } from "~/dto/point.dto";
import { PageResponse } from "~/dto/@common";


const Enpoint = {
  snapshotPointByUser: "/api/manager/points/snapshot-point-by-user".trim(),
  pointHolderNft: "/api/manager/points/point-holder-nft".trim(),
  leaderboard: "/api/manager/points/leaderboard".trim(),
  registerWl: "/api/manager/points/register-whitelist".trim(),
}


export class PointService {
  async snapshotPointByUser(params: EvmAddressReq) {
    return rootApiService.get<{ point: number, zealyPoint: number, stakePoint: number, galxePoint: number }>(Enpoint.snapshotPointByUser, params);
  }

  async pointHolderNft(body: PointHolderNftReq) {
    return rootApiService.post<{ point: number }>(Enpoint.pointHolderNft, body);
  }

  async leaderboard(params: LeaderboardReq) {
    return rootApiService.get<PageResponse<Leaderboard>>(Enpoint.leaderboard, params);
  }

  async registerWl(params: {
    evmAddress: string
  }) {
    return rootApiService.post<{ status: number }>(Enpoint.registerWl, params);
  }

}

export default new PointService();
