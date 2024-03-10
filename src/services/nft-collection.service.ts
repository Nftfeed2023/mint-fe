
import { AddressReq, PageResponse } from "~/dto/@common";
import { rootApiService } from "./@global";
import { NftCollection, NftCollectionSearch } from "~/dto/nft-project.dto";
import { ListNftFilterReq, VerifySubscribeReq } from "~/dto/nft-collection.dto";

const ENPOINT = {
  detail: "api/nft-collections/detail".trim(),
  listTrends: "api/nft-collections/list-trends".trim(),
  listSearch: "api/nft-collections/list-search".trim(),
  checkSubscribe: "api/nft-collections/check-subscribe".trim(),
  subscribe: "api/nft-collections/subscribe".trim(),
  verifySubscribe: "api/nft-collections/verify-subscribe".trim(),


  listPopular: "api/nft-collections/list-popular".trim(),
  listOnSale: "api/nft-collections/list-on-sale".trim(),
  listFreeMint: "api/nft-collections/list-free-mint".trim(),
  listSpecial: "api/nft-collections/list-special".trim(),

  mintFunCollectionInfo: "api/nft-collections/mint-fun-collection-info".trim(),

}

export class NftCollectionService {

  async detail(params: AddressReq & { chainId: number }) {
    return rootApiService.get<NftCollection>(ENPOINT.detail, params);
  }

  async listTrends() {
    return rootApiService.get<NftCollection[]>(ENPOINT.listTrends);
  }
  async listSearch() {
    return rootApiService.get<NftCollectionSearch[]>(ENPOINT.listSearch);
  }

  async checkSubscribe(params: { address: string; evmAddress: string }) {
    return rootApiService.get<{ subscribed: boolean }>(ENPOINT.checkSubscribe, params);
  }

  async subscribe(params: { address: string; evmAddress: string; email: string }) {
    return rootApiService.post<{ subscribed: boolean, message: string }>(ENPOINT.subscribe, params);
  }

  async verifySubscribe(params: VerifySubscribeReq) {
    return rootApiService.post<{ subscribed: boolean, message: string }>(ENPOINT.verifySubscribe, params);
  }

  async listPopular(params: ListNftFilterReq) {
    return rootApiService.get<PageResponse<NftCollection>>(ENPOINT.listPopular, params);
  }

  async listOnSale(params: ListNftFilterReq) {
    return rootApiService.get<PageResponse<NftCollection>>(ENPOINT.listOnSale, params);
  }

  async listFreeMint(params: ListNftFilterReq) {
    return rootApiService.get<PageResponse<NftCollection>>(ENPOINT.listFreeMint, params);
  }


  async mintFunCollectionInfo(params: { chainId: number, address: string }) {
    return rootApiService.get<{ totalMints: number }>(ENPOINT.mintFunCollectionInfo, params);
  }

  async listSpecial(params: ListNftFilterReq) {
    return rootApiService.get<PageResponse<NftCollection>>(ENPOINT.listSpecial, params);
  }

}

export default new NftCollectionService();
