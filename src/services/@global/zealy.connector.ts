import { socsialApiService } from ".";


const subdomain = "nftfeed";
const spaceId = "22923";
const Enpoint = {
  users: `api/public/zealy/users`,
  claimedQuests: `api/public/zealy/claimed-quests`,
  galxeUser: `api/public/zealy/galxe/user`,
}

class ZealyConnector {
  async getUserInfoByWalletAddress(params: { ethAddress: string }) {
    return socsialApiService.get(Enpoint.users, {
      ...params,
      subdomain
    })
  }

  async getGalxeUserInfoByWalletAddress(params: { ethAddress: string }) {
    return socsialApiService.get(Enpoint.galxeUser, {
      ...params,
      spaceId
    })
  }


  async claimedQuests(params: { userId: string, questId: string }) {
    return socsialApiService.get(Enpoint.claimedQuests, {
      ...params,
      subdomain
    })
  }

}
export default new ZealyConnector()
