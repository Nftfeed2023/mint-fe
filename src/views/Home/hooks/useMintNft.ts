import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import PartnershipMintNft from "~/common/abis/PartnershipMintNft__factory"
import FaucetNativeToken from "~/common/abis/FaucetNativeToken__factory"
import { ethers, } from "ethers";
import useCustomToast from "~/hooks/@global/useCustomToast";

import { useConnectWallet } from "~/hooks/@global/useConnectWallet";

import mintNftServices from "~/services/mint.nft.services";
import { configEnv } from "~/@config";

const { } = configEnv();

const POOL_FAUCET = "";

const useMintNft = (props: { poolNft: string }) => {
    const toast = useCustomToast();
    const { poolNft: POOL_NFT } = props;
    const { provider: library, account, chainId } = useConnectWallet();

    const [isLoading, setIsLoading] = useState(false);
    const [isGrantedNft, setIsGrantedNft] = useState(false);
    const [isGrantedFaucet, setIsGrantedFaucet] = useState(false);
    const [isChainPolygon, setIsChainPolygon] = useState(false);

    const deplayTime = async (ms: number) => {
        await new Promise(res => {
            setTimeout(() => {
                res("ok");
            }, ms)
        })
    }


    const getUserInfo = useCallback(async (isFirst: boolean, isGrantedFaucet: boolean, isGrantedNft: boolean) => {
        setIsLoading(true);
        try {
            if (!account || !library) {
                setIsGrantedNft(true);
                setIsGrantedFaucet(true);
            } else {
                if (isFirst) {
                    const poolNft = new ethers.Contract(
                        POOL_NFT,
                        PartnershipMintNft.abi,
                        library
                    );
                    const poolFaucet = new ethers.Contract(
                        POOL_FAUCET,
                        FaucetNativeToken.abi,
                        library
                    );

                    // await deplayTime(5 * 1000);
                    const isCheckFaucet = await poolFaucet.userFauceted(account);
                    const isCheckGrantedNft = await poolNft.usersClaimed(account);

                    // console.log({ isCheckFaucet, isCheckGrantedNft });

                    setIsGrantedNft(isCheckGrantedNft);
                    setIsGrantedFaucet(isCheckFaucet);
                } else {
                    setIsGrantedNft(isGrantedNft);
                    setIsGrantedFaucet(isGrantedFaucet);
                }
            }
        } catch (error) {
            console.log("error", error);
            setIsGrantedNft(true);
            setIsGrantedFaucet(true);
        }
        setIsLoading(false);
    }, [POOL_NFT, account, library])

    const faucet = async () => {
        setIsLoading(true);
        try {
            if (!account || !library) {
                throw new Error("Acount empty");
            }
            const { transactionHash } = await mintNftServices.faucet({ chainId, account, })
            await getUserInfo(false, true, false);

            toast.show({
                title: 'SUCCESS',
                subTitle: 'Faucet is completed.',
                //   description: `${ChainConfig.getUrlScan()}/tx/${transactionHash}`,
                type: 'success',
            })

        } catch (error) {
            toast.handleErrorBlockChain(error)
        }
        setIsLoading(false);
    }

    const minftNft = async () => {
        setIsLoading(true);
        try {
            if (!account || !library) {
                throw new Error("Acount empty");
            }

            const signer = library.getSigner(account);
            const poolNft = new ethers.Contract(
                POOL_NFT,
                PartnershipMintNft.abi,
                library
            );

            const tx = await poolNft.connect(signer).mintNft();
            const { transactionHash } = tx;

            toast.show({
                title: 'SUCCESS',
                subTitle: 'Transaction is completed.',
                // description: `${ChainConfig.getUrlScan()}/tx/${transactionHash}`,
                type: 'success',
            })
            await getUserInfo(false, true, true);

        } catch (error) {
            toast.handleErrorBlockChain(error)
        }
        setIsLoading(false);
    }

    const minftNftByApi = async () => {
        setIsLoading(true);
        try {
            if (!account || !library) {
                throw new Error("Acount empty");
            }

            const tx = await mintNftServices.mintNft({ nftAddress: POOL_NFT, mintToAddress: account });
            const { transactionHash } = tx;

            toast.show({
                title: 'SUCCESS',
                subTitle: 'Transaction is completed.',
                //    description: `${ChainConfig.getUrlScan()}/tx/${transactionHash}`,
                type: 'success',
            })
            await getUserInfo(false, true, true,);

        } catch (error) {
            toast.handleErrorBlockChain(error)
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getUserInfo(true, false, false);

    }, [library, account, getUserInfo]);

    return {
        isChainPolygon,
        isLoading,
        isGrantedNft,
        isGrantedFaucet,
        minftNft,
        minftNftByApi,
        faucet,
    }

}

export default useMintNft;