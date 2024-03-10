
import { PageResponse } from "~/dto/@common";
import { rootApiService } from "./@global";
import { CreateProjectReq, ListCollectionByManagerReq, NftCollectionDto, NftCollectionReq } from "~/dto/nft-project.dto";
import { EditCollectionReq, UpdateEndTimeReq, UpdateMaxTotalSupplyReq, UpdatePriceReq } from "~/dto/nft-collection.dto";

const ENDPOINT = {
  createProject: "/api/manager/projects/create".trim(),
  createCollection: "/api/manager/nft-collections/create".trim(),
  editCollection: "/api/manager/nft-collections/edit".trim(),
  listProjectByManager: "api/manager/projects/list-by-manager".trim(),

  listCollectionByManager: "api/manager/nft-collections/list-by-manager".trim(),
  updatePrice: "api/manager/nft-collections/update-price".trim(),
  updateMaxTotalSupply: "api/manager/nft-collections/update-max-total-supply".trim(),
  updateEndTime: "api/manager/nft-collections/update-end-time".trim(),
}

export class ManagerService {

  async createProject(body: CreateProjectReq) {
    return rootApiService.post(ENDPOINT.createProject, body);
  }

  async createCollection(body: NftCollectionReq) {
    return rootApiService.post(ENDPOINT.createCollection, body);
  }

  async editCollection(body: EditCollectionReq) {
    return rootApiService.post(ENDPOINT.editCollection, body);
  }



  async listCollectionByManager(params: ListCollectionByManagerReq) {
    return rootApiService.get<PageResponse<NftCollectionDto>>(ENDPOINT.listCollectionByManager, params);
  }




  async updatePrice(body: UpdatePriceReq) {
    return rootApiService.post(ENDPOINT.updatePrice, body);
  }

  async updateMaxTotalSupply(body: UpdateMaxTotalSupplyReq) {
    return rootApiService.post(ENDPOINT.updateMaxTotalSupply, body);
  }

  async updateEndTime(body: UpdateEndTimeReq) {
    return rootApiService.post(ENDPOINT.updateEndTime, body);
  }


}

export default new ManagerService();
