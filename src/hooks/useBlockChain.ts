import { useWeb3React } from "@web3-react/core";
import { Contract, utils } from "ethers";
import { useCallback, useEffect, useState } from "react";
import { configEnv } from "~/@config";
import ERC20__factory from "~/common/abis/ERC20__factory";
import { useConnectWallet } from "./@global/useConnectWallet";


const { } = configEnv();

const BUSD = "";

export const useBlockChain = () => {

    const { provider: library, account } = useConnectWallet();
    const [balanceBusd, setBalanceBusd] = useState(0);
    const [balanceBnb, setBalanceBnb] = useState(0);

    const loadBalance = useCallback(async () => {
        try {
            //   const signer = library.getSigner(account)
            const busdCt = new Contract(BUSD, ERC20__factory.abi, library)
            const [bnb, busd] = await Promise.all([library.getBalance(account), busdCt.balanceOf(account)]);
            setBalanceBnb(Number(utils.formatEther(bnb)));
            setBalanceBusd(Number(utils.formatEther(busd)))
        } catch (error) {

        }
    }, [account, library])

    useEffect(() => {
        loadBalance();
    }, [loadBalance])

    return {
        balanceBnb,
        balanceBusd
    }
}