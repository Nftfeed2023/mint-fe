import { Contract } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { configEnv } from "~/@config";
import { ApiException } from "~/@core/dto";
import { getExplorer } from "~/@web3-config/evm";
import { ERC20__factory, ERC20 } from "~/abi";
import { SocialVault } from "~/abi/SocialVault";
import { SocialVault__factory } from "~/abi/factories/SocialVault__factory";
import {
  getMessageErrorBlockChain,
  parseAmountToken,
} from "~/common/block-chain.helper";
import { ICampaign } from "~/dto/ICampaign";

import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import useCustomToast from "~/hooks/@global/useCustomToast";
import { MAIN_ROUTERS } from "~/routes/routes";
import campaignService from "~/services/campaign.service";

const { customSMC, CONNECTORS } = configEnv();

export const useCampaign = ({ nftAddress }: { nftAddress: string }) => {

  const [isLoading, setIsLoading] = useState(false);
  const toast = useCustomToast();
  const navigate = useNavigate();
  const [detailCampaign, setDetailCampaign] = useState<ICampaign>(null);

  const { account, chainId, provider } = useConnectWallet();
  const [tokenAddress, setTokenAddress] = useState("");
  const [amountApprove, setAmountApprove] = useState("0");
  const [maxWinner, setMaxWinner] = useState(0);
  const [isApprove, setIsApprove] = useState(false);

  const loadApprove = useCallback(async () => {
    try {
      const { SOCIAL_VAULT } = customSMC[chainId];
      if (account) {
        const tokenCt = new Contract(
          tokenAddress,
          ERC20__factory.abi,
          provider
        ) as ERC20;
        const decimal = await tokenCt.decimals();
        const allowance = await tokenCt.allowance(account, SOCIAL_VAULT);

        setIsApprove(allowance.gte(parseAmountToken(amountApprove, decimal)));
      }
    } catch (error) { }
  }, [account, amountApprove, chainId, provider, tokenAddress]);

  const approve = useCallback(async () => {
    setIsLoading(true);
    try {
      const { SOCIAL_VAULT } = customSMC[chainId];
      if (account) {
        const signer = provider.getSigner();
        const tokenCt = new Contract(
          tokenAddress,
          ERC20__factory.abi,
          provider
        ) as ERC20;
        const decimal = await tokenCt.decimals();
        const { transactionHash } = await (
          await tokenCt
            .connect(signer)
            .approve(SOCIAL_VAULT, parseAmountToken(amountApprove, decimal))
            .catch((err) => {
              throw new ApiException(getMessageErrorBlockChain(err));
            })
        )
          .wait()
          .catch((err) => {
            throw new ApiException(getMessageErrorBlockChain(err));
          });
        setIsApprove(true);
        toast.success({
          subTitle: "Approve success",
          description: `${getExplorer(chainId)}/tx/${transactionHash}`.trim(),
        });
      }
    } catch (error) {
      toast.handleErrorBlockChain(error)
    }
    setIsLoading(false);
  }, [account, amountApprove, chainId, provider, toast, tokenAddress]);

  const createCampaign = useCallback(
    async (body: ICampaign) => {
      setIsLoading(true);
      try {

        if (maxWinner >= 1 && maxWinner <= 250) {

          const { SOCIAL_VAULT } = customSMC[chainId];
          const signer = provider.getSigner();
          const tokenCt = new Contract(
            tokenAddress,
            ERC20__factory.abi,
            provider
          ) as ERC20;

          const poolCt = new Contract(
            SOCIAL_VAULT,
            SocialVault__factory.abi,
            provider
          ) as SocialVault;

          const [decimal, value] = await Promise.all([
            tokenCt.decimals(),
            poolCt.creationFee(),
          ]);

          const startTimeBlockChain = Math.floor(
            new Date(body.startTime).getTime() / 1000
          );
          const endTimeBlockChain = Math.floor(
            new Date(body.endTime).getTime() / 1000
          );
          const { transactionHash } = await (
            await poolCt
              .connect(signer)
              .createCampaign(
                nftAddress,
                tokenAddress,
                parseAmountToken(amountApprove, decimal),
                startTimeBlockChain,
                endTimeBlockChain,
                {
                  value,
                }
              )
              .catch((err) => {
                throw new ApiException(getMessageErrorBlockChain(err));
              })
          )
            .wait()
            .catch((err) => {
              throw new ApiException(getMessageErrorBlockChain(err));
            });
          setIsApprove(true);
          toast.success({
            subTitle: "Create Campaign Success",
            description: `${getExplorer(chainId)}/tx/${transactionHash}`.trim(),
          });

          const rs = await campaignService.createCampaign(
            {
              ...body,
              totalReward: parseInt(amountApprove),
              exactTotalReward: parseAmountToken(amountApprove, decimal).toString(),
              currency: "USDT",// TODO
              tokenDecimals: decimal,
              maxWinner,
            });
          console.log({ rs });

          navigate(`${MAIN_ROUTERS.NFT_COLLECTION}/${chainId}/${body.address}`);


        }
        else {

          toast.show({
            type: "warning",
            title: "Warning",
            description: maxWinner < 1 ? "Max Winner >= 1" : 'Max Winner <= 250',
          });

        }


      } catch (error) {
        console.log(`------------------- `);
        console.log(error);
        console.log(`------------------- `);
        toast.handleError(error);
      }

      setIsLoading(false);
    },
    [amountApprove, chainId, maxWinner, navigate, nftAddress, provider, toast, tokenAddress]
  );

  const loadDetailCampaign = useCallback(
    async (id: string) => {
      setIsLoading(true);
      try {
        const rs = await campaignService.campaignDetail({
          campaignId: id,
          walletAddress: account,
        });
        setDetailCampaign(rs);
      } catch (error) {
        setDetailCampaign(null);
        console.log(`------------------- `);
        console.log(error);
        console.log(`------------------- `);
        toast.handleError(error);
      }

      setIsLoading(false);
    },
    [account, toast]
  );

  useEffect(() => {
    loadApprove();
  }, [loadApprove]);

  return {
    isLoading,
    createCampaign,
    loadDetailCampaign,
    detailCampaign,
    tokenAddress,
    setTokenAddress,
    amountApprove,
    approve,
    setAmountApprove,
    isApprove,
    maxWinner,
    setMaxWinner,
  };
};
