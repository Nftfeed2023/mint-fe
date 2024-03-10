import { ICampaign } from "~/dto/ICampaign";
import { rootApiService } from "./@global";
import { HistoryCampaignDTO } from "~/dto/history.campaign";

const ENDPOINT = {
  HISTORY_CAMPAIGN: "/api/public/campaign-history/list-by-user".trim(),

  CREATE_CAMPAIGN: "/api/public/collection-campaign/create".trim(),
  DETAIL: "/api/public/collection-campaign/detail".trim(),
  EXECUTE: "/api/public/collection-campaign/execute".trim(),

  FINISH_CAMPAIGN: "/api/public/campaign-history/create".trim(),
}

export class CampaignService {

  async createCampaign(params: ICampaign) {
    return rootApiService.post<ICampaign>(ENDPOINT.CREATE_CAMPAIGN, params);
  }

  async campaignDetail(params: { campaignId: string, walletAddress: string }) {
    return rootApiService.post<ICampaign>(ENDPOINT.DETAIL, params);
  }

  async campaignExecute(params: { walletAddress: string, questId: string }) {
    return rootApiService.post<{ message: string, data: boolean }>(ENDPOINT.EXECUTE, params);
  }

  async finishClaim(params: {
    walletAddress: string,
    campaignId: string,
    userId: string,
  }) {
    return rootApiService.post<{ message: string, data: boolean }>(ENDPOINT.FINISH_CAMPAIGN, params);
  }


  async historyCampaign(params: { id?: string }) {
    return rootApiService.get<HistoryCampaignDTO[]>(ENDPOINT.HISTORY_CAMPAIGN, params);
  }



}

// eslint-disable-next-line import/no-anonymous-default-export
export default new CampaignService();
