
import { rootApiService, domainApiServiceNft } from "./@global";

const ENPOINT = {
    FAUCET: "/api/public/campaign/faucet".trim(),
    NFT_MINT: "/api/public/nft-event/mint".trim(),
    NFT_MINT_FCOFFEE: "/api/public/nft-event/mint-nft-fcoffee".trim(),
    ONWER_NFT: "/api/public/nft-event/count-nft-onwer".trim(),
    NFT_MINT_REDDER: "/api/public/nft-event/mint-nft-redder".trim(),
    ONWER_NFT_REDDER: "/api/public/nft-event/count-nft-redeem".trim(),
    LIST_NFT_REDDER_REDEEM: "/api/public/nft-event/nft-redder-redeem".trim(),
}

export class MintNftServices {

    async faucet(body: {
        chainId: number,
        account: string
    }) {
        return rootApiService.post(ENPOINT.FAUCET, body);
    }

    async mintNft(body: {
        nftAddress: string,
        mintToAddress: string
    }) {
        return domainApiServiceNft.post(ENPOINT.NFT_MINT, body);
    }

    async mintNftFCoffee(body: {
        nftAddress: string,
        mintToAddress: string,
        code: string,
        email: string,
    }) {
        return domainApiServiceNft.post(ENPOINT.NFT_MINT_FCOFFEE, body);
    }

    async ownerNft(body: {
        nftAddress: string,
        mintToAddress: string
    }) {
        return domainApiServiceNft.post(ENPOINT.ONWER_NFT, body);
    }

    async mintNftRedder(body: {
        nftAddress: string,
        mintToAddress: string,
        code: string
    }) {
        return domainApiServiceNft.post(ENPOINT.NFT_MINT_REDDER, body);
    }

    async ownerNftRedder(body: {
        nftAddress: string,
        mintToAddress: string
    }) {
        return domainApiServiceNft.post(ENPOINT.ONWER_NFT_REDDER, body);
    }

    async listNftRedeemRedder(body: {
        address: string,
    }) {
        return domainApiServiceNft.get(ENPOINT.LIST_NFT_REDDER_REDEEM, body);
    }

}

export default new MintNftServices();
