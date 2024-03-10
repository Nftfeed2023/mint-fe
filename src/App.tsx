import "react-quill/dist/quill.snow.css";
import { ChakraProvider } from "@chakra-ui/react";
import { useMemo } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ToastContainer } from "react-toastify";
import { I18nextProvider } from "react-i18next";
import { Web3ReactProvider } from "@web3-react/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Theme from "./styles/Theme";
import ModalProvider from "./contexts/ModalContext";
import ProfileView from "./views/WalletAccounts/Profile/Profile";
import i18n from "./utils/i18n";
import SideBarProvider from "./contexts/SideBarContext";
import { WalletProvider } from "./contexts/WalletContext";

import ManagerView from "./views/Manager";
import { MAIN_ROUTERS, MANAGER_ROUTERS } from "./routes/routes";
import FreeMintView from "./views/FreeMintView";
import { NftCollectionDetail } from "./views/FreeMintView/NftCollectionDetail";
import StartedView from "./views/StartedView";
import { CreateCollectionView } from "./views/Manager/CreateCollectionView";
import { EditProjectView } from "./views/Manager/EditProjectView";
import { evmConnectors } from "./@web3-config/evm";
import NotFoundView from "./views/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import CollectionDetail from "./views/CollectionDetail";
import EditCollectionView from "./views/Manager/EditCollectionView";
import EditCollectionOnChainView from "./views/Manager/EditCollectionOnChainView";
import VerifySubscribeView from "./views/VerifySubscribeView";
import { IDOView } from "./views/Trash/IDOView";
import { StakingTokenView } from "./views/StakingTokenView";
import { LeaderboardView } from "./views/LeaderboardView";
import { StakingNftDetailView } from "./views/StakingNftDetailView";
import { StakingNftView } from "./views/StakingNftView";
import { SendmailView } from "./views/SendmailView";
import { DemoView } from "./views/DemoView";
import { SpecialNftView } from "./views/SpecialNftView";
import { CrawlView } from "./views/CrawlView";
import MaintenanceView from "./views/MaintenanceView";
import { NftPassView } from "./views/NftPassView";
import { SocialsView } from "./views/WalletAccounts/SocialsView";
import { CreateFairLaunchView } from "./views/FairLauch/CreateFairLaunchView";
import { ListLaunchView } from "./views/FairLauch/ListLaunchView";
import { DetailLaunchView } from "./views/FairLauch/DetailLaunchView";
import { CreateTokenView } from "./views/FairLauch/CreateTokenView";
import { ManagerPresale } from "./views/ManagerPresale";
import { CreateCampaignView } from "./views/Manager/CreateCampaignView";
import { DetailCampaignView } from "./views/Manager/DetailCampaignView";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const RouteAdapter = ({ children }: { children: any }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // useEagerConnect();
  const adaptedHistory = useMemo(
    () => ({
      replace(location: any) {
        navigate(location, { replace: true, state: location.state });
      },
      push(location: any) {
        navigate(location, { replace: false, state: location.state });
      },
    }),
    [navigate]
  );
  return children({ history: adaptedHistory, location });
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={Theme}>
        <I18nextProvider i18n={i18n}>
          <QueryParamProvider ReactRouterRoute={RouteAdapter as any}>
            <WalletProvider>
              <ModalProvider>
                <SideBarProvider>

                  <Routes>
                    {/* <Route caseSensitive path="/" element={<StartedView />} /> */}
                    <Route
                      path={"/"}
                      element={<Navigate to={MAIN_ROUTERS.NFT_COLLECTION} />}
                    />
                    <Route
                      caseSensitive
                      path={MAIN_ROUTERS.NFT_COLLECTION}
                      element={<FreeMintView />}
                    />
                    {/* <Route caseSensitive path={MAIN_ROUTERS.NFT_COLLECTION} element={<MaintenanceView />} /> */}
                    {/* <Route caseSensitive path={MAIN_ROUTERS.NFT_COLLECTION} element={<CollectionSearch />} /> */}
                    <Route
                      path={`${MAIN_ROUTERS.NFT_COLLECTION}/:chainId/:address`}
                      element={<NftCollectionDetail />}
                    />
                    <Route
                      path={MAIN_ROUTERS.STAKE_NFTS}
                      element={<StakingNftView />}
                    />
                    <Route
                      path={`${MAIN_ROUTERS.STAKE_NFTS}/:id`}
                      element={<StakingNftDetailView />}
                    />
                    <Route
                      path={`${MAIN_ROUTERS.NFT_COLLECTION_DETAIL}/:listTag`}
                      element={<CollectionDetail />}
                    />
                    <Route
                      caseSensitive
                      path={MAIN_ROUTERS.VERIFY_SUBSCRIBE}
                      element={<VerifySubscribeView />}
                    />

                    {/* Manager ROUTER */}
                    <Route
                      path={MANAGER_ROUTERS.MANAGER}
                      element={<ManagerView />}
                    />
                    <Route
                      path={MANAGER_ROUTERS.MANAGER_PRESALE}
                      element={<ManagerPresale />}
                    />
                    {/* END Manager ROUTER */}


                    {/* <Route
                      path={MANAGER_ROUTERS.CREATE_PROJECT}
                      element={<CreateProjectView />}
                    />
                    <Route
                      path={`${MANAGER_ROUTERS.EDIT_PROJECT}/:projectId`}
                      element={<EditProjectView />}
                    /> */}
                    <Route
                      path={`${MANAGER_ROUTERS.CREATE_COLLECTION}`}
                      element={<CreateCollectionView />}
                    />
                    <Route
                      path={`${MANAGER_ROUTERS.EDIT_COLLECTION}/:chainId/:address`}
                      element={<EditCollectionView />}
                    />
                    <Route
                      path={`${MANAGER_ROUTERS.EDIT_COLLECTION_ON_CHAIN}/:chainId/:address`}
                      element={<EditCollectionOnChainView />}
                    />
                    <Route path={`${MAIN_ROUTERS.IDO}`} element={<IDOView />} />
                    <Route
                      path={`${MAIN_ROUTERS.STAKING_TOKEN}`}
                      element={<StakingTokenView />}
                    />
                    <Route
                      path={`${MAIN_ROUTERS.LEADERBOARD}`}
                      element={<LeaderboardView />}
                    />
                    <Route
                      path={`${MANAGER_ROUTERS.NFT_PASS}`}
                      element={<NftPassView />}
                    />
                    <Route
                      path={`${MANAGER_ROUTERS.SOCIAL_ACCOUNT}`}
                      element={<SocialsView />}
                    />
                    <Route
                      path={`${MANAGER_ROUTERS.CREATE_PRESALE}`}
                      element={<CreateFairLaunchView />}
                    />

                    <Route
                      path={`${MANAGER_ROUTERS.FAIR_LAUNCH}`}
                      element={<ListLaunchView />}
                    />

                    <Route
                      path={`${MANAGER_ROUTERS.CREATE_TOKEN}`}
                      element={<CreateTokenView />}
                    />

                    <Route
                      path={`${MANAGER_ROUTERS.FAIR_LAUNCH}/:chainId/:presaleAddress`}
                      element={<DetailLaunchView />}
                    />

                    <Route
                      path={`${MANAGER_ROUTERS.CREATE_CAMPAIGN}/:chainId/:address`}
                      element={<CreateCampaignView />}
                    />

                    <Route
                      path={`${MANAGER_ROUTERS.MANAGER_CAMPAIGN}/:campaignId`}
                      element={<DetailCampaignView />}
                    />

                    <Route path={`/sendmail`} element={<SendmailView />} />
                    {/* END Manager ROUTER */}

                    <Route path="/profile" element={<ProfileView />} />
                    <Route
                      path={`${MANAGER_ROUTERS.CRAWL}`}
                      element={<CrawlView />}
                    />
                    <Route
                      path={MAIN_ROUTERS.SPECIAL_NFT}
                      element={<SpecialNftView />}
                    />
                    <Route path="/demo" element={<DemoView />} />
                    <Route path="/*" element={<NotFoundView />} />

                  </Routes>
                </SideBarProvider>
              </ModalProvider>
            </WalletProvider>
          </QueryParamProvider>
        </I18nextProvider>
        <ToastContainer />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

const ContainerApp = () => {
  return (
    <Web3ReactProvider connectors={evmConnectors}>
      <BrowserRouter>
        <ScrollToTop>
          <App />
        </ScrollToTop>
      </BrowserRouter>
    </Web3ReactProvider>
  );
};

export default ContainerApp;
