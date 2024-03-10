
import { IUserInformation, } from "~/dto";
import { rootApiService } from "./@global";
import { TwitterPopupDTO } from "~/dto/twitter.popup.dto";
import { IUserTw } from "~/dto/IUserTw";

const ENDPOINT = {
  REGISTER_USER: "/api/public/auth-nft/register".trim(),
  SEND_MAIL: "/api/admin/send-email-mkt".trim(),
  SEND_MAIL_MULTIPLE: "/api/admin/send-email-to-multiple-recipients".trim(),
  DETAIL_POPUP_TWITTER: "/api/public/news/detail".trim(),

  PROFILE: "/api/public/user/profile".trim(),
  FOLLOW_PRIMARY_TWITTER: "/api/public/user/follow-primary-twitter".trim(),
  GET_USERNAME_TW: "/api/public/user/get-username-twitter".trim(),

  SYNC_PROFILE: "/api/public/user/sync-social-profile".trim(),
  AUTHOR_TWITTER: "/api/public/social/verify-connect-twitter".trim(),
}

export class UserService {

  async registerUser(body: IUserInformation) {
    return rootApiService.post(ENDPOINT.REGISTER_USER, body);
  }

  async sendMail(body: {
    subject: string,
    content: string
  }) {
    return rootApiService.post(ENDPOINT.SEND_MAIL, body);
  }

  async sendMailMultiple(body: {
    recipients: string[],
    subject: string,
    content: string
  }) {
    return rootApiService.post(ENDPOINT.SEND_MAIL_MULTIPLE, body);
  }

  async detailPopupTw(body: {
    id: string,
  }) {
    return rootApiService.get<TwitterPopupDTO>(ENDPOINT.DETAIL_POPUP_TWITTER, body);
  }

  async getUserProfile(params: { evmAddress?: string, accessToken?: string }) {
    return rootApiService.get(ENDPOINT.PROFILE, params);
  }

  async syncProfile(params: { evmAddress: string, accessToken: string }) {
    return rootApiService.post(ENDPOINT.SYNC_PROFILE, params);
  }

  async authorTwitter(params: { clientId: string, walletAddress: string }) {
    return rootApiService.get<{ success: boolean, message: string }>(ENDPOINT.AUTHOR_TWITTER, params);
  }

  async getUsernameTw(params: { walletAddress: string }) {
    return rootApiService.post<IUserTw>(ENDPOINT.GET_USERNAME_TW, params);
  }

  async followPrimaryTwitter(params: { evmAddress: string, }) {
    return rootApiService.post(ENDPOINT.FOLLOW_PRIMARY_TWITTER, params);
  }

}

export default new UserService();
