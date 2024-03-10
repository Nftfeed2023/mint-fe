import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  Input,
  InputGroup,
  Text,
  InputRightElement,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  VStack,
  Icon,
  Spinner,
} from "@chakra-ui/react";
import { TagCustom } from "~/views/Manager/Tags";
import CountDownTime from "../CountDownTime";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TextHorizon } from "~/@ui/TextHorizon";
import { BiRocket } from "react-icons/bi";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import PrimaryButton from "~/components/PrimaryButton";
import { usePresaleFairLaunch } from "./usePresaleFairLaunch";
import { EVM_CHAIN_LIST } from "~/@config/chain-list";
import { formatEther } from "ethers/lib/utils";
import {
  calculateSwapRate,
  calculateTokensForLiquidity,
} from "~/common/code.helper";
import dayjs from "dayjs";
import { ILauchPool } from "~/dto/ILauchPool";
import { checkURLType } from "~/common/utils/common.utils";

import { AiOutlineGlobal } from "react-icons/ai";
import {
  FaGithub,
  FaTelegram,
  FaInstagram,
  FaDiscord,
  FaReddit,
  FaYoutube,
  FaFacebook,
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

import { BigNumber, Contract } from "ethers";
import {
  formatAmountToken,
  formatMoney,
  parseAmountToken,
} from "~/common/block-chain.helper";
import { EStatusLaunch } from "~/common/enums/EStatusLaunch";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import { useSwitchChain } from "~/hooks/@global/useSwitchChain";
import useWindowSize from "~/hooks/useWindowSize";
import { ReactComponent as ArrowDown } from "~/assets/svgs/arrow-down.svg";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { UpdateEndTimeOnChain } from "./UpdateEndTimeOnChain";
import { UpdateStartTimeOnChain } from "./UpdateStartTimeOnChain";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DetailLaunch = (props: { detailLaunch: ILauchPool }) => {

  const [qty, setQty] = useState("0");
  const { detailLaunch: detailLaunchW2 } = props;
  const { tokenAddress, presaleAddress } = detailLaunchW2;
  const { account, chainId, } = useConnectWallet();
  const switchChain = useSwitchChain();
  const { width } = useWindowSize();
  const [isHide, setIsHide] = useState(false);

  const {
    isScreenLoading,
    statusW3,
    isClaimed,
    isLoading,
    detailPresale: detailPresaleW3,
    buyToken,
    claimToken,
    emergencyWithdraw,
    finalize,
    withdrawToken,
    cancelToken,
    updateEndTime,
    updateStartTime,
  } = usePresaleFairLaunch({
    presaleAddress: presaleAddress,
    tokenAddress: tokenAddress,
  });

  const swapRate = calculateSwapRate({
    amountIn: parseAmountToken(1),
    tokensForPresale:
      parseAmountToken(
        detailPresaleW3?.tokenForPresale || 0,
        detailPresaleW3?.decimals
      ) || BigNumber.from(detailLaunchW2.exactTokensForPresale),
    totalRaised:
      parseAmountToken(
        detailPresaleW3?.totalRaised || 0,
        detailPresaleW3?.decimals
      ) || BigNumber.from(detailLaunchW2.exactTotalRaised),
  });

  const tokensForLiquidity = calculateTokensForLiquidity({
    tokensForPresale: detailLaunchW2.tokensForPresale,
    percentFeeRaised: detailLaunchW2.fee,
    percentForLiquidity: detailLaunchW2.liquidity,
  });

  const dataDetailLaunch = useMemo(() => {
    return [
      {
        name: "Presale Address",
        value: `${detailLaunchW2?.presaleAddress}`,
      },
      {
        name: "Token Address",
        value: `${detailLaunchW2?.tokenAddress}`,
      },
      {
        name: "Chain Name",
        value: `${EVM_CHAIN_LIST[detailLaunchW2?.chainId]?.chainName}`,
      },
      {
        name: "Token name",
        value: detailLaunchW2.tokenName,
      },
      {
        name: "Token symbol",
        value: detailLaunchW2.tokenSymbol,
      },
      {
        name: "Token decimals",
        value: detailLaunchW2.tokenDecimals,
      },
      {
        name: "Total Supply",
        value: `${formatMoney(detailLaunchW2.totalSupply.toString())} ${detailLaunchW2.tokenSymbol
          }`,
      },
      {
        name: "Tokens For Presale",
        value: `${formatMoney(detailLaunchW2.tokensForPresale.toString())} ${detailLaunchW2.tokenSymbol
          }`,
      },
      {
        name: "Tokens For Liquidity",
        value: `${formatMoney(formatAmountToken(tokensForLiquidity))} ${detailLaunchW2.tokenSymbol
          }`,
      },
      {
        name: "Router",
        value: "-",
      },
      {
        name: "Softcap",
        value: `${formatMoney(detailLaunchW2.softCap.toString())} ${detailLaunchW2?.currency
          }`,
      },
      {
        name: "Swap Rate",
        value: `1 ${detailLaunchW2.currency} = ${swapRate.gt(0)
          ? formatMoney(
            Number(
              formatAmountToken(
                swapRate,
                detailLaunchW2.tokenDecimals || 18
              )
            ).toFixed(2)
          )
          : "TBA"
          } ${detailLaunchW2.tokenSymbol}`,
      },
      {
        name: "Pool Type",
        value: "Public",
      },
      {
        name: "Liquidity",
        value: `${detailLaunchW2?.liquidity} %`,
      },
      {
        name: "Liquidity Locking Time",
        value: `Infinite`,
      },
      {
        name: "Start time (UTC)",
        value: dayjs(new Date(detailPresaleW3?.startTime || detailLaunchW2.startTime).toUTCDate()).format(
          "YYYY-MM-DD HH:mm"
        ),
      },
      {
        name: "End time (UTC)",
        value: dayjs(new Date(detailPresaleW3?.endTime || detailLaunchW2.endTime).toUTCDate()).format(
          "YYYY-MM-DD HH:mm"
        ),
      },
    ];
  }, [detailLaunchW2?.presaleAddress, detailLaunchW2?.tokenAddress, detailLaunchW2?.chainId, detailLaunchW2.tokenName, detailLaunchW2.tokenSymbol, detailLaunchW2.tokenDecimals, detailLaunchW2.totalSupply, detailLaunchW2.tokensForPresale, detailLaunchW2.softCap, detailLaunchW2.currency, detailLaunchW2?.liquidity, detailLaunchW2.startTime, detailLaunchW2.endTime, tokensForLiquidity, swapRate, detailPresaleW3?.startTime, detailPresaleW3?.endTime]);

  const renderButton = useCallback(() => {
    if (!detailLaunchW2.startTime || !detailLaunchW2.endTime) {
      return null;
    }

    if (detailLaunchW2.chainId !== chainId) {
      return (
        <Button
          mt="10px"
          bg="yellow.primary !important"
          borderRadius="8px"
          fontWeight="600"
          fontSize="16px"
          lineHeight="18px"
          h="auto"
          py="5px"
          color="#fff"
          w="full"
          p="10px"
          onClick={() => switchChain(detailLaunchW2.chainId).catch()}
        >
          Switch to {EVM_CHAIN_LIST[detailLaunchW2.chainId].chainName}
        </Button>
      );
    }

    const status = statusW3 != null ? statusW3 : detailLaunchW2.status;
    const amountToken = calculateSwapRate({
      amountIn: detailPresaleW3.allocation,
      tokensForPresale: parseAmountToken(
        detailPresaleW3?.tokenForPresale || 0,
        detailPresaleW3?.decimals
      ),
      totalRaised: parseAmountToken(
        detailPresaleW3?.totalRaised || 0,
        detailPresaleW3?.decimals
      ),
    });

    return (
      <VStack w="full" spacing={4}>
        {status <= EStatusLaunch.Live && (
          <PrimaryButton
            w="80%"
            onClick={() => buyToken(qty)}
            disabled={isLoading || !(status === EStatusLaunch.Live)}
            isLoading={isLoading}
          >
            Buy
          </PrimaryButton>
        )}

        {status === EStatusLaunch.Listed && (
          <PrimaryButton
            w="80%"
            onClick={() => claimToken()}
            disabled={isLoading || isClaimed}
            isLoading={isLoading}
          >
            {`${isClaimed ? "Claimed" : `Claim `} ${formatAmountToken(
              amountToken || 0
            )} ${detailLaunchW2.tokenSymbol}`}
          </PrimaryButton>
        )}

        {detailPresaleW3?.allocation?.gt(0) &&
          (status === EStatusLaunch.Failed ||
            status === EStatusLaunch.Canceled) && (
            <PrimaryButton
              w="80%"
              onClick={() => withdrawToken()}
              disabled={
                isLoading ||
                !(
                  status === EStatusLaunch.Failed ||
                  status === EStatusLaunch.Canceled
                )
              }
              isLoading={isLoading}
            >
              Withdraw
            </PrimaryButton>
          )}

        {detailPresaleW3?.allocation?.gt(0) &&
          status === EStatusLaunch.Live && (
            <VStack w="full">
              <PrimaryButton
                w="80%"
                onClick={() => emergencyWithdraw()}
                disabled={isLoading}
                isLoading={isLoading}
              >
                Emergency Withdraw
              </PrimaryButton>
              <Text
                fontWeight="400"
                fontSize={{ base: "13px" }}
                textAlign={"center"}
                color={"#8d8d8d"}
              >
                Emergency withdrawal takes your contribution (with 10% penalty)
                out of Presale Pool
              </Text>
            </VStack>
          )}
      </VStack>
    );
  }, [
    detailLaunchW2.startTime,
    detailLaunchW2.endTime,
    detailLaunchW2.chainId,
    detailLaunchW2.status,
    detailLaunchW2.tokenSymbol,
    chainId,
    statusW3,
    detailPresaleW3.allocation,
    detailPresaleW3?.tokenForPresale,
    detailPresaleW3?.decimals,
    detailPresaleW3?.totalRaised,
    isLoading,
    isClaimed,
    switchChain,
    buyToken,
    qty,
    claimToken,
    withdrawToken,
    emergencyWithdraw,
  ]);

  const renderButtonManager = useCallback(() => {
    if (detailLaunchW2.chainId !== chainId) {
      return (
        <Button
          mt="10px"
          bg="yellow.primary !important"
          borderRadius="8px"
          fontWeight="600"
          fontSize="16px"
          lineHeight="18px"
          h="auto"
          py="5px"
          color="#fff"
          w="full"
          p="10px"
          onClick={() => switchChain(detailLaunchW2.chainId).catch()}
        >
          Switch to {EVM_CHAIN_LIST[detailLaunchW2.chainId].chainName}
        </Button>
      );
    }

    const status = statusW3 != null ? statusW3 : detailLaunchW2.status;

    return (
      <VStack w="full" spacing={4}>
        <PrimaryButton
          w="80%"
          onClick={finalize}
          disabled={isLoading || status !== EStatusLaunch.Success}
          isLoading={isLoading}
        >
          Finalize
        </PrimaryButton>

        <Text
          fontWeight="400"
          fontSize={{ base: "13px" }}
          textAlign={"center"}
          color={"#8d8d8d"}
        >
          For successful Presale Pools, project owners can finalize to list the
          token for user claims. If not done in 7 days, FEEDIPAD cancels,
          refunding users.
        </Text>

        {status === EStatusLaunch.Failed && (
          <Fragment>
            <PrimaryButton
              w="80%"
              onClick={cancelToken}
              disabled={isLoading}
              isLoading={isLoading}
            >
              Cancel
            </PrimaryButton>
            <Text
              fontWeight="400"
              fontSize={{ base: "13px" }}
              textAlign={"center"}
              color={"#8d8d8d"}
            >
              "Cancel" is for project owners in case of Presale pool failure,
              allowing user refunds.
            </Text>
          </Fragment>
        )}

        {/*
        {status < EStatusLaunch.Live && (
          <UpdateStartTimeOnChain
            address={presaleAddress}
            chainId={chainId}
            startTime={detailPresaleW3.startTime}
            onUpdate={updateStartTime}
            isLoading={isLoading}
          />
        )}

        {status < EStatusLaunch.Listed && (
          <UpdateEndTimeOnChain
            address={presaleAddress}
            chainId={chainId}
            endTime={detailPresaleW3.endTime}
            onUpdate={updateEndTime}
            isLoading={isLoading}
          />
        )} */}

      </VStack>
    );
  }, [
    cancelToken,
    chainId,
    detailLaunchW2.chainId,
    detailLaunchW2.status,
    detailPresaleW3.endTime,
    detailPresaleW3.startTime,
    finalize,
    isLoading,
    presaleAddress,
    statusW3,
    switchChain,
    updateEndTime,
    updateStartTime,
  ]);

  const renderCowndown = useCallback(() => {
    const startTime = detailPresaleW3?.startTime || detailLaunchW2?.startTime;
    const endTime = detailPresaleW3?.endTime || detailLaunchW2?.endTime;

    if (!startTime || !endTime) {
      return null;
    }

    const status = statusW3 != null ? statusW3 : detailLaunchW2.status;

    if (status === EStatusLaunch.Upcoming) {
      return (
        <CountDownTime
          title="Start In"
          endTime={new Date(startTime)}
          fontSize="18px"
          color="red"
        />
      );
    }
    if (status === EStatusLaunch.Live) {
      return (
        <CountDownTime
          title="End In"
          endTime={new Date(endTime)}
          fontSize="18px"
          color="red"
        />
      );
    }
    return null;
  }, [
    detailPresaleW3.startTime,
    detailPresaleW3.endTime,
    detailLaunchW2.startTime,
    detailLaunchW2.endTime,
    detailLaunchW2.status,
    statusW3,
  ]);

  const renderStatus = useCallback(() => {
    if (!detailLaunchW2.startTime || !detailLaunchW2.endTime) {
      return null;
    }

    const status = statusW3 != null ? statusW3 : detailLaunchW2.status;

    return <TagCustom value={Number(status)} />;
  }, [
    detailLaunchW2.startTime,
    detailLaunchW2.endTime,
    detailLaunchW2.status,
    statusW3,
  ]);

  const renderCharts = useCallback(() => {
    const presale = detailLaunchW2.tokensForPresale;
    const liquidity = parseFloat(formatAmountToken(tokensForLiquidity));
    // let unlocked = detailLaunchW2.totalSupply - (presale + liquidity);

    let data = [
      // unlocked,
      presale,
      liquidity,
    ];
    let labels = ["Presale", "Liquidity"];

    if (presaleAddress === "0xe270a5e22bda420b20624ea5e33924f99ef673fc") {
      data = [
        // (unlocked - (200000000 + 300000000)),
        presale,
        liquidity,
        200000000,
        300000000,
      ];
      labels = [...labels, "Burn", "Marketing/Staking"];
    }

    const dataChart = {
      labels,
      datasets: [
        {
          label: "",
          data: data,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    return (
      <VStack w="full">
        <VStack maxW={"1000px"}>
          <Doughnut
            data={dataChart}
            style={{ width: width <= 500 ? 250 : 400 }}
          />
        </VStack>
      </VStack>
    );
  }, [
    detailLaunchW2.tokensForPresale,
    presaleAddress,
    tokensForLiquidity,
    width,
  ]);

  const renderSocials = useCallback(() => {
    const data = [
      {
        name: "Website",
        value: detailLaunchW2.website,
        icon: <AiOutlineGlobal />,
      },
      {
        name: "Facebook",
        value: detailLaunchW2.facebook,
        icon: FaFacebook,
      },
      {
        name: "X",
        value: detailLaunchW2.twitter,
        icon: <BsTwitterX />,
      },
      {
        name: "Github",
        value: detailLaunchW2.github,
        icon: <FaGithub />,
      },
      {
        name: "Telegram",
        value: detailLaunchW2.telegram,
        icon: <FaTelegram />,
      },
      {
        name: "Instagram",
        value: detailLaunchW2.instagram,
        icon: <FaInstagram />,
      },
      {
        name: "Discord",
        value: detailLaunchW2.discord,
        icon: <FaDiscord />,
      },
      {
        name: "Reddit",
        value: detailLaunchW2.reddit,
        icon: <FaReddit />,
      },
      {
        name: "Youtube",
        value: detailLaunchW2.youtube,
        icon: <FaYoutube />,
      },
    ];

    return (
      <HStack cursor={{ base: "none", lg: "pointer" }}>
        {data
          .filter((i) => i.value)
          .map((item, idx) => {
            return (
              <Box key={idx} onClick={() => window.open(item.value)}>
                {item.icon as any}
              </Box>
            );
          })}
      </HStack>
    );
  }, [
    detailLaunchW2.discord,
    detailLaunchW2.facebook,
    detailLaunchW2.github,
    detailLaunchW2.instagram,
    detailLaunchW2.reddit,
    detailLaunchW2.telegram,
    detailLaunchW2.twitter,
    detailLaunchW2.website,
    detailLaunchW2.youtube,
  ]);

  if (isScreenLoading) {
    return (
      <Box
        w="full"
        p={{ base: '10px', lg: '15px 20px', }}
        bg="white"
        borderRadius="8px"
        border={{ base: "1px solid #ffd3cb" }}
        boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
      >

        <VStack
          w="full"
          p={{ base: "20px", md: "40px" }}
        >
          <Spinner color="#ee3824" size="lg" />
          <Text
            fontWeight={"500"}
            fontSize={{ base: "14px", md: "16px" }}
            lineHeight="21px"
            color="black.light"
            letterSpacing="-0.5px"
          >
            Please wait a second ...
          </Text>
        </VStack>
      </Box>
    )
  }

  return (
    <Box w="full">
      <Grid
        w="full"
        borderRadius="4px"
        p={{ base: "0", lg: "1px 10px  1px" }}
        gap={2}
        templateColumns="repeat(12, 1fr)"
      >
        <GridItem w="full" colSpan={{ base: 12, md: 7 }} alignSelf={"start"}>
          <VStack
            w="full"
            p={{ base: "10px 15px", lg: "15px 20px" }}
            bg="white"
            borderRadius="8px"
            border={{ md: "1px solid #ffd3cb" }}
            boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
          >
            <HStack w="full" justifyContent={"space-between"}>
              <HStack>
                <Box>
                  {(checkURLType(detailLaunchW2?.logo) === "Image" ||
                    checkURLType(detailLaunchW2?.logo) === "Other") && (
                      <Avatar
                        p="1px"
                        width={"92px"}
                        height={"92px"}
                        border="1px solid #ccc"
                        src={detailLaunchW2?.logo}
                      />
                    )}
                  {checkURLType(detailLaunchW2?.logo) === "Video" && (
                    <video
                      style={{
                        maxWidth: "92px",
                        maxHeight: "92px",
                      }}
                      src={detailLaunchW2?.logo}
                      muted
                      autoPlay
                      loop
                    />
                  )}
                </Box>

                <VStack>
                  <Text
                    fontWeight="700"
                    fontSize={{ base: "20px", md: "28px" }}
                    lineHeight={{ base: "20px", md: "28px" }}
                    className="textPrimary"
                  >
                    {detailLaunchW2?.tokenName}
                  </Text>

                  {renderSocials()}
                </VStack>
              </HStack>

              {renderStatus()}
            </HStack>

            {width <= 1100 && (
              <HStack spacing={0}>
                <Text
                  fontWeight={"400"}
                  fontSize={{ base: "13px" }}
                  color="black.light"
                  letterSpacing="-0.5px"
                >
                  Show {!isHide ? `less` : `all`}
                </Text>
                <Icon
                  as={ArrowDown}
                  w="28px"
                  h="28px"
                  onClick={() => {
                    setIsHide(!isHide);
                  }}
                />
              </HStack>
            )}
            {!isHide && (
              <>
                <VStack w="full" alignItems={"start"} px="10px">
                  {detailLaunchW2?.description && (
                    <ReactQuill
                      value={detailLaunchW2.description}
                      readOnly={true}
                      theme={"bubble"}
                    />
                  )}

                  {dataDetailLaunch.map((item, idx) => {
                    const isShow = idx === 0 || idx === 1;
                    return (
                      <Box w="full" key={idx}>
                        <TextHorizon
                          key={idx}
                          title={`${item.name}`}
                          value={`${item.value}`}
                          isCopy={isShow}
                          isLink={isShow}
                          yourLink={isShow ? `${EVM_CHAIN_LIST[detailLaunchW2.chainId].blockExplorerUrls[0]}/address/${item.value}` : null}
                          icon={isShow ? "https://img.icons8.com/?size=256&id=85777&format=png" : null}
                        />
                        <Divider />
                      </Box>
                    );
                  })}
                </VStack>
              </>
            )}
          </VStack>

          <VStack
            w="full"
            mt="10px"
            p={{ base: "10px 15px", lg: "15px 20px" }}
            bg="white"
            borderRadius="8px"
            border={{ md: "1px solid #ffd3cb" }}
            boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
          >
            <Text
              fontWeight="500"
              fontSize={{ base: "14px", md: "16px" }}
              lineHeight={"normal"}
              pb="30px"
            >
              Token Metrics
            </Text>

            {renderCharts()}
          </VStack>
        </GridItem>

        <GridItem w="full" colSpan={{ base: 12, md: 5 }} alignSelf={"start"}>
          <VStack
            w="full"
            spacing={4}
            p={{ base: "10px 15px", lg: "15px 20px" }}
            bg="white"
            borderRadius="8px"
            border={{ md: "1px solid #ffd3cb" }}
            boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
          >
            <Text
              fontWeight="500"
              fontSize={{ base: "14px", md: "16px" }}
              lineHeight={"normal"}
              pb="20px"
            >
              For User
            </Text>

            <Box w="120px">{renderCowndown()}</Box>

            <VStack w="full" spacing={0}>
              <HStack w="full" justify={"space-between"}>
                <Text color="black.5d" fontSize={"13px"}>
                  {`${parseFloat(
                    detailPresaleW3.totalRaised || detailLaunchW2.totalRaised
                  )} ${detailLaunchW2.currency} `}
                  <strong style={{ color: "green" }}>
                    {`(~${Math.floor(
                      (Number(
                        detailPresaleW3.totalRaised ||
                        detailLaunchW2.totalRaised
                      ) /
                        Number(
                          detailPresaleW3.softCap || detailLaunchW2.softCap
                        )) *
                      100
                    )}%) `}
                  </strong>
                </Text>
                <Text color="black.5d" fontSize={"13px"}>
                  {`${parseFloat(
                    detailPresaleW3.softCap || detailLaunchW2.softCap
                  )} ${detailLaunchW2.currency}`}
                </Text>
              </HStack>

              <Slider
                aria-label="slider-ex-1"
                colorScheme="blue"
                value={parseFloat(
                  detailPresaleW3.totalRaised || detailLaunchW2.totalRaised
                )}
                min={0}
                max={
                  Number(
                    detailPresaleW3.totalRaised || detailLaunchW2.totalRaised
                  ) >= Number(detailPresaleW3.softCap || detailLaunchW2.softCap)
                    ? Number(
                      detailPresaleW3.totalRaised ||
                      detailLaunchW2.totalRaised
                    ) * 2
                    : parseFloat(
                      detailPresaleW3.softCap || detailLaunchW2.softCap
                    )
                }
              >
                <SliderTrack bg="red.100">
                  <SliderFilledTrack bg="tomato" />
                </SliderTrack>
                <SliderThumb boxSize={4}>
                  <Box color="tomato" as={BiRocket} />
                </SliderThumb>
              </Slider>
            </VStack>

            <Box w="full">
              <TextHorizon
                title={`Your Balance`}
                value={`${formatMoney(detailPresaleW3?.balance)} ${detailLaunchW2.currency}`}
              />
              <Divider />
            </Box>

            <Box w="full">
              <TextHorizon
                title={`Your Bought`}
                value={`${formatEther(detailPresaleW3?.allocation)} ${detailLaunchW2.currency}`}
              />
              <Divider />
            </Box>

            <Box w="full">
              <TextHorizon
                title={`Total Contributors`}
                value={`${detailPresaleW3?.totalContributors || "-"}`}
              />
              <Divider />
            </Box>

            <Box w="full">
              <TextHorizon
                title={`Total Deposit`}
                value={`${detailPresaleW3?.totalRaised || detailLaunchW2.totalRaised
                  } ${detailLaunchW2.currency}`}
              />
              <Divider />
            </Box>

            <InputGroup>
              <Input
                placeholder="Input quantity"
                borderRadius={"8px"}
                type="number"
                color={"#000"}
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  bg={"transparent"}
                  _hover={{ bg: "transparent" }}
                  fontSize="16px"
                  fontWeight="500"
                  lineHeight="20px"
                  color="#ee3824"
                  onClick={() => {
                    setQty(detailPresaleW3?.balance);
                  }}
                >
                  MAX
                </Button>
              </InputRightElement>
            </InputGroup>

            {renderButton()}
          </VStack>

          {!account ||
            !detailLaunchW2.managerAddress ||
            account.toLowerCase() !==
            detailLaunchW2.managerAddress.toLowerCase() ? null : (
            <VStack
              mt="10px"
              w="full"
              p={{ base: "10px 15px", lg: "15px 20px" }}
              bg="white"
              borderRadius="8px"
              border={{ md: "1px solid #ffd3cb" }}
              boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
            >
              <Text
                fontWeight="500"
                fontSize={{ base: "14px", md: "16px" }}
                lineHeight={"normal"}
                pb="20px"
              >
                For Manager
              </Text>

              {renderButtonManager()}
            </VStack>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};
