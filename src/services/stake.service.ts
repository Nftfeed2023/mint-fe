
import { IUserInformation, } from "~/dto";
import { rootApiService } from "./@global";
import { EvmAddressReq } from "~/dto/evm.dto";


// @DefGet("pending-reward-azeta-satke-nft")
// pendingRewardAzetaSatkeNft(@Query() params: EvmAddressReq) {
//     return this.stakeService.pendingRewardAzetaSatkeNft(params);
// }


// @DefPost("claim-azeta")
// claimAzeta(@Body() body: EvmAddressReq) {
//     return this.stakeService.claimAzeta(body);
// }
const ENDPOINT = {
  pendingRewardAzetaSatkeNft: "api/stakes/pending-reward-azeta-satke-nft".trim(),
  claimAzeta: "api/stakes/claim-azeta".trim(),
}

export class UserService {

  async claimAzeta(body: EvmAddressReq) {
    return rootApiService.post<{ txHash: string }>(ENDPOINT.claimAzeta, body);
  }

  async pendingRewardAzetaSatkeNft(params: EvmAddressReq) {
    return rootApiService.get<{
      qtyStaked: number,
      pending: number,
      amoutClaimed: number,
      itemClaimed: any
    }>(ENDPOINT.pendingRewardAzetaSatkeNft, params);
  }

}

export default new UserService();
