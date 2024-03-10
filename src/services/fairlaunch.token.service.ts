import { rootApiService } from "./@global";
import { PageRequest, PageResponse } from "~/dto/@common";
import { ILauchPool } from "~/dto/ILauchPool";


const ENDPOINT = {
  create: "/api/public/launch-pool/create".trim(),
  detail: "/api/public/launch-pool/detail".trim(),
  list: "/api/public/launch-pool/list-launch-pool".trim(),
  trending: "/api/public/launch-pool/list-trend".trim(),
  updateTime: "/api/public/launch-pool/update".trim(),
}

export class FairLaunchService {

  async create(params: ILauchPool) {
    return rootApiService.post<{}>(ENDPOINT.create, params);
  }

  async detail(params: { presaleAddress: string, chainId?: string }) {
    return rootApiService.post<ILauchPool>(ENDPOINT.detail, params);
  }

  async list(body: PageRequest & { managerAddress?: string }) {
    return rootApiService.get<PageResponse<ILauchPool>>(ENDPOINT.list, body);
  }

  async trending(body: PageRequest) {
    return rootApiService.get<PageResponse<ILauchPool>>(ENDPOINT.trending, body);
  }

  async updateTime(body: {
    chainId: number,
    presaleAddress: string,
    startTime?: string,
    endTime?: string
  }) {
    return rootApiService.post<PageResponse<ILauchPool>>(ENDPOINT.updateTime, body);
  }

}

export default new FairLaunchService();
