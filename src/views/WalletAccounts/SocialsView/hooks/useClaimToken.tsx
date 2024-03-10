import { Contract } from "ethers";
import { useCallback, useState } from "react";
import { configEnv } from "~/@config";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import { SocialVault } from "~/abi/SocialVault";
import { SocialVault__factory } from "~/abi/factories/SocialVault__factory";
import useCustomToast from "~/hooks/@global/useCustomToast";
import { ERC20__factory, ERC20 } from "~/abi";
import { formatAmountToken, getMessageErrorBlockChain, parseAmountToken } from "~/common/block-chain.helper";
import { ApiException } from "~/@core/dto";
import { getExplorer } from "~/@web3-config/evm";


export const useClaimToken = (props: {
  SOCIAL_VAULT_ADDRESS: string,
  USDT_ADDRESS: string,
}) => {
  const { SOCIAL_VAULT_ADDRESS, USDT_ADDRESS } = props;

  const { account, chainId, provider } = useConnectWallet();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useCustomToast();
  const [amount, setAmount] = useState("0");

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {

      if (account) {
        const poolCt = new Contract(
          SOCIAL_VAULT_ADDRESS,
          SocialVault__factory.abi,
          provider
        ) as SocialVault;
        const tokenCt = new Contract(
          USDT_ADDRESS,
          ERC20__factory.abi,
          provider
        ) as ERC20;
        const [decimal,] = await Promise.all([
          tokenCt.decimals(),
        ]);

        const amount = await poolCt.amountUsers(USDT_ADDRESS, account);

        setAmount(formatAmountToken(amount.toString(), decimal))
      }

    } catch (error) {
      console.log(`------------------- `);
      console.log(error);
      console.log(`------------------- `);
      // toast.handleError(error);
    }
    setIsLoading(false);
  }, [SOCIAL_VAULT_ADDRESS, USDT_ADDRESS, account, provider])

  const claim = useCallback(async () => {
    setIsLoading(true);
    try {

      if (account) {
        const signer = provider.getSigner();

        const poolCt = new Contract(
          SOCIAL_VAULT_ADDRESS,
          SocialVault__factory.abi,
          provider
        ) as SocialVault;


        const { transactionHash } = await (
          await poolCt
            .connect(signer)
            .claim(USDT_ADDRESS)
            .catch((err) => {
              throw new ApiException(getMessageErrorBlockChain(err));
            })
        )
          .wait()
          .catch((err) => {
            throw new ApiException(getMessageErrorBlockChain(err));
          });

        await loadData();

        toast.success({
          title: "Claim Success!",
          description: `${getExplorer(chainId)}/tx/${transactionHash}`.trim(),
        });
      }


    } catch (error) {
      setIsLoading(false);
      console.log(`------------------- `);
      console.log(error);
      console.log(`------------------- `);
      toast.handleError(error);
    }
    setIsLoading(false);
  }, [SOCIAL_VAULT_ADDRESS, USDT_ADDRESS, account, chainId, loadData, provider, toast])


  return {
    isLoading,
    loadData,
    claim,
    amount,
  }
}
