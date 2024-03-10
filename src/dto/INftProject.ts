import { EStatus } from "~/common/enums";
import { ECollectionType } from "~/common/enums/ECollectionType";

export interface INftProject {
    collection: ECollectionType,
    name: string;
    banner: string;
    logo: string;
    shortContent: string;
    description: string;
    status: EStatus;
    tag1: string;
    tag2: string;
    tag3: string;
    listNft: IListNft[];
    nftAllowcation: string,
    deposit: string,
}

export interface IListNft {
    askId: string;
    collectionName: string,
    name: string;
    image: string;
    video: string;
    about?: string;
    content?: string[];
    howToMint?: string[];
}
