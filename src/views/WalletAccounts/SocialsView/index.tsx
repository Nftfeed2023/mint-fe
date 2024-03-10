import { Box, SimpleGrid, Text, VStack, Heading, HStack, Divider, AbsoluteCenter, Icon, Spinner, Avatar, AvatarBadge, Tooltip } from '@chakra-ui/react';
import MainLayout from "~/layouts/MainLayout"
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MAIN_ROUTERS, MANAGER_ROUTERS } from '~/routes/routes';
import useWindowSize from '~/hooks/useWindowSize';
import { IoMdWallet } from "react-icons/io";
import { CopyIcon } from "@chakra-ui/icons";
import { FaXTwitter, FaCheck } from "react-icons/fa6";

import { configEnv } from '~/@config';
import PrimaryButton from '~/components/PrimaryButton';
import { useConnectWallet } from '~/hooks/@global/useConnectWallet';
import WrapperHeaderMobile from '~/layouts/MasterLayout/WrapperHeaderMobile';
import { parseParams, getBaseUrl, pipeLongTextUi } from '~/common/utils/common.utils';
import userService from '~/services/user.service';
import useCustomToast from '~/hooks/@global/useCustomToast';
import WrapperCopy from '~/components/WrapperCopy';
import { useClaimToken } from './hooks/useClaimToken';
import ImgUSDT from "~/assets/images/usdt.png"
import { useHistoryCampaign } from './hooks/useHistoryCampaign';
import { MdOutlineManageSearch } from "react-icons/md";
import { SUPPORT_CHAIN } from '~/common/code.helper';

const { SSO, customSMC } = configEnv();
const { loginUrl, clientId } = SSO;

const AssetWallet = (props: {
  SOCIAL_VAULT_ADDRESS: string,
  USDT_ADDRESS: string,
  icChain: string
}) => {
  const {
    SOCIAL_VAULT_ADDRESS, USDT_ADDRESS, icChain,
  } = props;

  const {
    isLoading: isLoadingClaim,
    loadData,
    claim,
    amount,
  } = useClaimToken({ SOCIAL_VAULT_ADDRESS, USDT_ADDRESS });

  useEffect(() => {
    loadData();
  }, [loadData])

  return (
    <HStack
      h="60px"
      w="full"
      p="10px"
      borderRadius={"8px"}
      border="1px solid green"
      justifyContent={"space-between"}
    >
      <HStack>

        <Avatar src={ImgUSDT} h="32px" w="32px">
          <AvatarBadge>
            <Avatar src={icChain} h={"14px"} w={"14px"} />
          </AvatarBadge>
        </Avatar>

        <Text>
          {amount} USDT
        </Text>
      </HStack>

      <PrimaryButton
        w="160px"
        disabled={amount < '10'}
        onClick={claim}
        isLoading={isLoadingClaim}
      >
        Withdraw
      </PrimaryButton>

    </HStack>
  )
}

export const SocialsView = () => {

  const videoRef = useRef(null);
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const toast = useCustomToast();
  const {
    account,
    loadUserInfo,
    userInfo,
    isExpriryTw,
  } = useConnectWallet();

  const [isLoading, setIsLoading] = useState(false);
  const [click, setClick] = useState(false);
  const [isOpenTool, setIsOpenTool] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const accessToken = params.get("accessToken");

  const {
    historyCampaign,
  } = useHistoryCampaign();

  const loadSyncUser = useCallback(async () => {
    try {
      if (account && accessToken) {
        await userService.syncProfile({ evmAddress: account, accessToken });
        loadUserInfo();
      }
    } catch (error) {
      console.log({ error });
      navigate(location.pathname)
      toast.show({
        type: "error",
        title: "Sign In X Error!",
        description: error?.message,
      })
    }
  }, [accessToken, account, loadUserInfo])

  useEffect(() => {
    loadSyncUser();
  }, [loadSyncUser]);

  const onLogin = useCallback(() => {
    const paramUrl = parseParams({
      clientId,
      redirectUrl: `${getBaseUrl()}${MANAGER_ROUTERS.SOCIAL_ACCOUNT}`
    })
    window.location.href = `${loginUrl}?${paramUrl}`.trim();
  }, [])

  const followTwitter = useCallback(async () => {
    setIsLoading(true)
    try {
      await userService.followPrimaryTwitter({ evmAddress: account });
      loadUserInfo();
      toast.show({
        type: "success",
        title: "Verify Successfully",
        subTitle: 'You following twitter',
      })

      setIsLoading(false);
    } catch (error) {
      console.log({ error });
      navigate(location.pathname)
      toast.handleErrorBlockChain(error)
      setIsLoading(false);
    }
  }, [account, loadUserInfo,])

  return (
    <MainLayout>

      <WrapperHeaderMobile />

      <Box
        mr={{
          base: '5px',
          xl: '41px',
        }}
        ml={{
          base: '5px',
          xl: '47px',
        }}
        mt={{
          base: '90px',
          lg: '40px',
        }}
        mb={{
          base: '120px',
          lg: '40px',
        }}
      >


        <Box
          w="full"
          p={{ base: '10px', lg: '15px 20px', }}
          bg="white"
          borderRadius="8px"
          border={{ md: "1px solid #ffd3cb" }}
          boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
        >

          <Box
            overflow="hidden"
          >
            <Heading
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', }}
              lineHeight={'110%'}>
              Socials Account
            </Heading>

          </Box>

          <VStack
            pt="20px"
            w="full"
          >

            <VStack
              alignSelf={"start"}
              alignItems={"start"}
              w="full"
            >

              <VStack
                alignSelf={"start"}
                alignItems={"start"}
                w="full"
              >

                <Text
                  color={'#000'}
                  fontWeight={700}
                  textAlign={"left"}
                >
                  Account Wallet
                </Text>

                <HStack
                  h="60px"
                  w="320px"
                  p="10px"
                  borderRadius={"8px"}
                  border="1px solid green"
                >
                  <IoMdWallet />
                  <Text>
                    {pipeLongTextUi(account, 8, 8)}
                  </Text>
                  <WrapperCopy copyText={account}>
                    <Icon as={CopyIcon} />
                  </WrapperCopy>
                </HStack>

              </VStack>

              <VStack
                alignSelf={"start"}
                alignItems={"start"}
                w="full"
              >

                <Tooltip
                  label={`The minimum amount must be >= $10 to withdraw`}
                  hasArrow
                  isOpen={isOpenTool}
                >
                  <Text
                    color={'#000'}
                    fontWeight={700}
                    textAlign={"left"}
                    onMouseOver={() => {
                      setIsOpenTool(true);
                    }}
                    onMouseLeave={() => {
                      setIsOpenTool(false);
                    }}
                    onClick={() => {
                      setIsOpenTool(true);
                    }}
                  >
                    Asset Wallet *
                  </Text>
                </Tooltip>

                <SimpleGrid
                  w="full"
                  spacing={4}
                  columns={{ base: 1, lg: 3 }}
                >
                  {SUPPORT_CHAIN.map((item, idx) => {

                    return (
                      <Fragment key={idx}>
                        <AssetWallet
                          SOCIAL_VAULT_ADDRESS={customSMC[item.chainId].SOCIAL_VAULT}
                          USDT_ADDRESS={customSMC[item.chainId].USDT}
                          icChain={item.logo}
                        />
                      </Fragment>
                    )
                  })}
                </SimpleGrid>

              </VStack>


            </VStack>

            <VStack
              w="full"
              alignSelf={"start"}
              alignItems={"start"}
            >

              <Text color={'#000'} fontWeight={700}>
                Your X Twitter account
              </Text>
              <Text color={'gray.500'} fontSize={"13px"}>
                Follow NFTFeed on X for the latest updates and announcements, and tweet about your experience.
              </Text>

              <SimpleGrid
                pt="10px"
                w="full"
                spacing={4}
                columns={{ base: 1, md: 2, lg: 4 }}
              >

                <HStack
                  w={{ base: "full" }}
                  p={{ base: "10px 20px" }}
                  fontSize={"13px"}
                  borderRadius={"8px"}
                  borderWidth={"1px"}
                  borderStyle={"solid"}
                  borderColor={userInfo?.status >= 1 ? "green" : "#ccc"}
                  color={userInfo?.status >= 1 ? "green" : "#000"}
                  onClick={() => {
                    if (!userInfo || userInfo.status < 1) {
                      onLogin();
                    }
                  }}
                  cursor={{ lg: "pointer" }}
                >
                  <FaXTwitter />
                  <Text
                    textAlign={{ base: "start", lg: "center", xl: "start" }}
                  >
                    {userInfo?.screenNameTw ? userInfo?.screenNameTw : `1. Sign in your X Account`}
                  </Text>
                  {userInfo?.status >= 1 &&
                    <FaCheck />
                  }
                </HStack>

                <HStack
                  w={{ base: "full" }}
                  p={{ base: "10px 20px" }}
                  fontSize={"13px"}
                  borderRadius={"8px"}
                  borderWidth={"1px"}
                  borderStyle={"solid"}
                  borderColor={userInfo?.status >= 2 ? "green" : "#ccc"}
                  color={userInfo?.status >= 2 ? "green" : "#000"}
                  onClick={() => {
                    window.open("https://twitter.com/NFTFeedOfficial");
                    setClick(true);
                  }}
                  cursor={{ lg: "pointer" }}
                >
                  {isLoading &&
                    <Spinner size={"xs"} />
                  }
                  <FaXTwitter />
                  <Text
                    textAlign={{ base: "start", lg: "center", xl: "start" }}>
                    2. Follow NFTFeed on X
                  </Text>
                  {userInfo?.status >= 2 &&
                    <FaCheck />
                  }
                </HStack>

                <HStack
                  w={{ base: "full" }}
                  p={{ base: "10px 20px" }}
                  fontSize={"13px"}
                  borderRadius={"8px"}
                  borderWidth={"1px"}
                  borderStyle={"solid"}
                  borderColor={userInfo?.status >= 2 ? "green" : "#ccc"}
                  color={userInfo?.status >= 2 ? "green" : "#000"}
                  onClick={() => {
                    if (userInfo?.status < 2) {
                      followTwitter();
                    }
                  }}
                  cursor={{ lg: "pointer" }}
                >
                  {isLoading &&
                    <Spinner size={"xs"} />
                  }
                  <FaXTwitter />
                  <Text
                    textAlign={{ base: "start", lg: "center", xl: "start" }}>
                    {userInfo?.status >= 2 ? `3. Following NFTFeed` : `3. Check Follow NFTFeed on X`}
                  </Text>
                  {userInfo?.status >= 2 &&
                    <FaCheck />
                  }
                </HStack>

                {userInfo && userInfo.status >= 1 && !isExpriryTw ?
                  <HStack
                    w={{ base: "full" }}
                    p={{ base: "10px 20px" }}
                    fontSize={"13px"}
                    borderRadius={"8px"}
                    borderWidth={"1px"}
                    borderStyle={"solid"}
                    borderColor={"#ccc"}
                    color={"#ee3824"}
                    onClick={onLogin}
                    cursor={{ lg: "pointer" }}
                  >
                    <FaXTwitter />
                    <Text
                      textAlign={{ base: "start", lg: "center", xl: "start" }}>
                      {`Refresh Session X`}
                    </Text>
                  </HStack>
                  :
                  <HStack
                    w={{ base: "full" }}
                    p={{ base: "10px 20px" }}
                    fontSize={"13px"}
                    borderRadius={"8px"}
                    borderWidth={"1px"}
                    borderStyle={"solid"}
                    borderColor={userInfo?.status >= 2 ? "green" : "#ccc"}
                    color={userInfo?.status >= 2 ? "green" : "#000"}
                    onClick={() => {
                      navigate(MAIN_ROUTERS.NFT_COLLECTION)
                    }}
                    cursor={{ lg: "pointer" }}
                  >
                    <Text
                      textAlign={{ base: "start", lg: "center", xl: "start" }}>
                      {`4. Done! Go to collections `}
                    </Text>
                    {userInfo?.status >= 2 &&
                      <FaCheck />
                    }
                  </HStack>
                }

              </SimpleGrid>

            </VStack>

            <VStack
              pt="30px"
              alignSelf={"start"}
              alignItems={"start"}
              w="full"
            >

              <Text
                color={'#000'}
                fontWeight={700}
                textAlign={"left"}
              >
                Joined Campaigns
              </Text>


              {historyCampaign.length > 0
                ?
                <SimpleGrid
                  w="full"
                  spacing={4}
                  columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
                >


                  {historyCampaign.map((item, idx) => {
                    return (
                      <HStack
                        key={idx}
                        w="full"
                        justifyContent={"space-between"}
                        p="10px 20px"
                        bg="white"
                        borderRadius="8px"
                        border={{ md: "1px solid #ffd3cb" }}
                        boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
                        cursor={{ lg: "pointer" }}
                        onClick={() => {
                          navigate(`${MAIN_ROUTERS.NFT_COLLECTION}/${item.chainId}/${item.address}`)
                        }}
                      >
                        <Text>
                          {item.name}
                        </Text>
                        <MdOutlineManageSearch />
                      </HStack>
                    )
                  })}

                </SimpleGrid>
                :
                <VStack
                  w="full"
                  py="60px"
                >
                  <Text fontWeight={500}>
                    No Found Campaign
                  </Text>
                </VStack>
              }



            </VStack>

          </VStack>

          <Box h="20vh" />

        </Box>

      </Box>

      <Box h="20vh" />

    </MainLayout >
  )
}
