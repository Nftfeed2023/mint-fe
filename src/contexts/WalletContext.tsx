
import { Web3ContextType, useWeb3React } from "@web3-react/core";
import { Connector } from "@web3-react/types";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { BaseProvider, Web3Provider } from '@ethersproject/providers';
import { useNavigate } from "react-router-dom";
import { metaMaskConnector, walletConnectConnectorV2 } from "~/@web3-config/evm";
import useCustomToast from "~/hooks/@global/useCustomToast";
import { EVM_CHAIN_LIST } from "~/@config/chain-list";
import { configEnv } from "~/@config";
import { URI_AVAILABLE } from "@web3-react/walletconnect-v2";
import { EChainLocalKey } from "~/common/constants/chain.enum";
import { IWalletKey, mapConnector } from "~/container/ConnectWalletModal/ConnectWalletModal";
import { IUser } from "~/dto/IUser";
import userService from "~/services/user.service";


export interface IWalletContextProps<T extends BaseProvider = Web3Provider> extends Web3ContextType<T> {
  login: (connector: Connector, key: string) => Promise<boolean>
  logout: () => void;
  userInfo?: IUser;
  loadUserInfo: () => void;
  isExpriryTw: boolean
}


const { applyChainIds, SSO } = configEnv();
const { clientId } = SSO;

const WalletContext = createContext<IWalletContextProps>(null);

const WalletProvider = ({ children }) => {
  const { account, connector, chainId, isActive, isActivating, accounts, hooks, provider, ENSName, ENSNames, } = useWeb3React();
  const navigate = useNavigate()
  const toast = useCustomToast();
  const [userInfo, setUserInfo] = useState<IUser>();
  const [isExpriryTw, setIsExpriryTw] = useState<boolean>(true);

  useEffect(() => {
    if (chainId) {
      if (!applyChainIds.includes(chainId)) {
        console.log(`=====OK=====`);
        const { logo, ...restConfig } = EVM_CHAIN_LIST[applyChainIds[0]];
        connector.activate({
          ...restConfig
        })
      }
    }
    console.log(`=====useEffect CHAIN=====`, chainId);
  }, [chainId, connector, provider])


  const login = useCallback(async (connector: Connector, key: IWalletKey) => {
    try {
      localStorage.setItem(EChainLocalKey.connectorKey, key)
      await connector.activate();
      return true;
    } catch (error) {
      return false;
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      localStorage.removeItem(EChainLocalKey.connectorKey)
      if (connector.deactivate) {
        await connector.deactivate();
      } else {
        await connector.resetState();
      }
      // @ts-expect-error close can be returned by wallet
      if (connector && connector.close) {
        // @ts-expect-error close can be returned by wallet
        await connector.close();
      }
    } catch (error) {

    }
  }, [connector])


  const loadUserInfo = useCallback(async () => {
    try {
      if (account) {
        const userRes = await userService.getUserProfile({ evmAddress: account, });
        setUserInfo({
          ...userRes,
          fullNameTw: userRes?.twitterUserName,
          screenNameTw: userRes?.screenName || userRes?.twitterUserName,
        });
      }

    } catch (error) {
      setUserInfo(null);
    }
  }, [account])

  const loadExprireAuthTwitter = useCallback(async () => {
    try {
      if (account && userInfo && userInfo?.status >= 2) {
        const authRes = await userService.authorTwitter({ walletAddress: account, clientId });
        setIsExpriryTw(authRes.success);

        if (!authRes.success) {
          toast.show({
            type: "warning",
            title: "Session Twitter Expried!",
            subTitle: 'Session twitter was expried, Please go to your socials account and re-login to Twitter to get the new session!',
          })
        }
      }
    } catch (error) {
      console.log({ error });
    }
  }, [account, userInfo])


  // log URI when available
  useEffect(() => {
    walletConnectConnectorV2.events.on(URI_AVAILABLE, (uri: string) => {
      console.log(`uri: ${uri}`)
    })
  }, [])

  // attempt to connect eagerly on mount
  useEffect(() => {
    walletConnectConnectorV2.connectEagerly().catch((error) => {
      console.debug('Failed to connect eagerly to walletconnect', error)
    })
  }, [])


  useEffect(() => {
    console.log(`-------------------`);
    console.log({ isActive, });
    console.log(`-------------------`);

    try {
      const connectorKeyLocal = localStorage.getItem(EChainLocalKey.connectorKey) as IWalletKey;
      const connectorLocal = mapConnector[connectorKeyLocal];
      if (!isActive) {
        login(connectorLocal, connectorKeyLocal).then(_ => {
          console.log(`=====OK=====`, { chainId });

        }).catch(err => {
          console.log(`==========`, err);
        })
      }
    } catch (error) {
      console.log(error);

    }

  }, [])


  useEffect(() => {
    loadUserInfo();
  }, [loadUserInfo]);

  useEffect(() => {
    setTimeout(() => {
      loadExprireAuthTwitter();
    }, 5000)
  }, []);

  const values = useMemo(
    () => ({
      login,
      logout,
      loadUserInfo,
      userInfo,
      isExpriryTw,
      account, connector, chainId, isActive, isActivating, accounts, hooks, provider, ENSName, ENSNames,
    }),
    [ENSName, ENSNames, account, accounts, chainId, connector, hooks, isActivating, isActive, isExpriryTw, loadUserInfo, login, logout, provider, userInfo]
  )

  return <WalletContext.Provider value={values}>{children}</WalletContext.Provider>
}


export { WalletContext, WalletProvider }
