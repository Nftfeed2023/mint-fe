import {
  VStack,
  HStack,
  Avatar,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
  Text,
  Slider,
  Image,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { BiRocket } from "react-icons/bi";
import { EVM_CHAIN_LIST } from "~/@config/chain-list";
import { TagCustom } from "~/views/Manager/Tags";
import CountDownTime from "../CountDownTime";
import { ILauchPool } from "~/dto/ILauchPool";
import { useNavigate } from "react-router-dom";
import { BigNumber, Contract } from "ethers";
import { calculateSwapRate, } from "~/common/code.helper";
import { checkURLType } from "~/common/utils/common.utils";
import { formatAmountToken, formatMoney, parseAmountToken } from "~/common/block-chain.helper";
import { EStatusLaunch } from "~/common/enums/EStatusLaunch";
import { PresaleFairLaunchTemplateV1__factory } from "~/abi/factories/PresaleFairLaunchTemplateV1__factory";
import { PresaleFairLaunchTemplateV1 } from "~/abi/PresaleFairLaunchTemplateV1";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";

export const ItemLaunch = (props: { itemLaunch: ILauchPool }) => {

  const { itemLaunch } = props;
  const navigate = useNavigate();
  const { provider } = useConnectWallet();
  const [isScreenLoading, setScreenLoading] = useState(false);
  const [statusW3, setStatusW3] = useState<EStatusLaunch>(null);
  const [totalRaised, setTotalRaised] = useState(0);
  const [softCap, setSoftCap] = useState(0);

  const checkStatus = useCallback(async () => {
    setScreenLoading(true);
    try {

      const poolFactory = new Contract(
        itemLaunch.presaleAddress,
        PresaleFairLaunchTemplateV1__factory.abi,
        provider,
      ) as PresaleFairLaunchTemplateV1;

      const check = await poolFactory.getStatus();
      console.log({ check });
      setStatusW3(check);
      setScreenLoading(false);

    } catch (error) {
      console.log({ error });
      setScreenLoading(false);
    }
  }, [itemLaunch.presaleAddress, provider])

  const loadWeb3 = useCallback(async () => {
    try {

      const poolFactory = new Contract(
        itemLaunch.presaleAddress,
        PresaleFairLaunchTemplateV1__factory.abi,
        provider,
      ) as PresaleFairLaunchTemplateV1;

      const [
        softCapW3,
        // startTime,
        // endTime,
        totalRaised3W,
      ] = await Promise.all([
        poolFactory.softCap(),
        poolFactory.totalRaised(),
      ])

      if (softCapW3) {
        setSoftCap(Math.floor(Number(formatAmountToken(softCapW3))));
      } else {
        setSoftCap(itemLaunch.softCap);
      }

      if (totalRaised3W) {
        setTotalRaised(Number(formatAmountToken(totalRaised3W)));
      } else {
        setTotalRaised(itemLaunch.softCap);
      }

    } catch (error) {
      console.log({ error });
    }
  }, [itemLaunch.presaleAddress, itemLaunch.softCap, provider])

  useEffect(() => {
    checkStatus();
  }, [checkStatus])

  useEffect(() => {
    loadWeb3();
  }, [checkStatus, loadWeb3])

  const renderCowndown = useCallback(() => {
    if (!itemLaunch.startTime || !itemLaunch.endTime) {
      return null;
    }

    const status = statusW3 != null ? statusW3 : itemLaunch.status;

    if (status === EStatusLaunch.Upcoming) {
      return (
        <CountDownTime
          title="Start In"
          endTime={new Date(itemLaunch.startTime)}
          fontSize="14px"
          color="red"
        />
      );
    }
    if (status === EStatusLaunch.Live) {
      return (
        <CountDownTime
          title="End In"
          endTime={new Date(itemLaunch.endTime)}
          fontSize="14px"
          color="red"
        />
      );
    }
  }, [itemLaunch.endTime, itemLaunch.startTime, itemLaunch.status, statusW3]);

  const renderStatus = useCallback(() => {
    if (!itemLaunch.startTime || !itemLaunch.endTime) {
      return null;
    }
    const status = statusW3 != null ? statusW3 : itemLaunch.status;
    return <TagCustom value={Number(status)} />;
  }, [itemLaunch.endTime, itemLaunch.startTime, itemLaunch.status, statusW3]);

  const swapRate = calculateSwapRate({
    amountIn: parseAmountToken(1),
    tokensForPresale: BigNumber.from(itemLaunch.exactTokensForPresale),
    totalRaised: BigNumber.from(itemLaunch.exactTotalRaised)
  })

  const renderProgress = useCallback(() => {
    if (itemLaunch.presaleAddress === "0xe270a5e22bda420b20624ea5e33924f99ef673fc") {
      return (
        <HStack spacing={0}>
          <Text
            fontWeight={"400"}
            fontSize={{ base: "13px" }}
            color="black.light"
            letterSpacing="-0.5px"
          >
            {formatMoney("3568.71")}/
          </Text>
          <Text
            fontWeight={"400"}
            fontSize={{ base: "13px" }}
            color="black.light"
            letterSpacing="-0.5px"
          >
            {formatMoney("50000")}
          </Text>
        </HStack>
      )
    }
    if (itemLaunch.presaleAddress === "0x7aaa39f7ce55da361741f79bce0ca1ed9f0f6ed5") {
      return (
        <HStack spacing={0}>
          <Text
            fontWeight={"400"}
            fontSize={{ base: "13px" }}
            color="black.light"
            letterSpacing="-0.5px"
          >
            {formatMoney("148.89")}/
          </Text>
          <Text
            fontWeight={"400"}
            fontSize={{ base: "13px" }}
            color="black.light"
            letterSpacing="-0.5px"
          >
            {formatMoney("1000")}
          </Text>
        </HStack>
      )
    }
    return (
      <HStack spacing={0}>
        <Text
          fontWeight={"400"}
          fontSize={{ base: "13px" }}
          color="black.light"
          letterSpacing="-0.5px"
        >
          {formatMoney(totalRaised.toFixed(2).toString())}/
        </Text>
        <Text
          fontWeight={"400"}
          fontSize={{ base: "13px" }}
          color="black.light"
          letterSpacing="-0.5px"
        >
          {formatMoney(softCap.toString())} {formatMoney(itemLaunch.currency.toString())}
        </Text>
      </HStack>
    )
  }, [])

  return (
    <VStack
      w="full"
      p={{ base: "15px", }}
      bg="white"
      borderRadius="8px"
      border={{ md: "1px solid #ffd3cb" }}
      boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
      cursor={{ lg: "pointer" }}
      onClick={() => {
        navigate(
          `${itemLaunch.chainId}/${itemLaunch.presaleAddress}`
        );
      }}
    >
      <HStack w="full" justifyContent={"space-between"}>

        <Box>
          {(checkURLType(itemLaunch.logo) === "Image" ||
            checkURLType(itemLaunch.logo) === "Other") && (
              <Avatar
                p="1px"
                width={"92px"}
                height={"92px"}
                border="1px solid #ccc"
                src={itemLaunch.logo}
              />
            )}
          {checkURLType(itemLaunch.logo) === "Video" && (
            <video
              style={{
                maxWidth: "92px",
                maxHeight: "92px",
              }}
              src={itemLaunch.logo}
              muted
              autoPlay
              loop
            />
          )}
        </Box>

        <VStack w="ful">
          {isScreenLoading
            ? null
            : <>
              {renderStatus()}

              <Box w="120px">{renderCowndown()}</Box>
            </>
          }
        </VStack>
      </HStack>

      <VStack w="full" alignItems={"start"} spacing={1}>
        <Text
          fontWeight="700"
          fontSize={{ base: "16px", md: "18px" }}
          lineHeight={{ base: "20px", md: "28px" }}
          className="textPrimary"
        >
          {itemLaunch.tokenName}
        </Text>

        <Text
          fontWeight={"500"}
          fontSize={{ base: "14px", md: "16px" }}
          lineHeight="21px"
          color="black.light"
          letterSpacing="-0.5px"
        >
          {`1 ${itemLaunch.currency} =
           ${swapRate.gt(0) ? formatMoney(Number(formatAmountToken(swapRate, itemLaunch.tokenDecimals || 18)).toFixed(2)) : "TBA"}
           ${itemLaunch.tokenSymbol}`}
        </Text>

        <VStack w="full" spacing={0}>

          <HStack w="full" justifyContent={"space-between"}>
            <Text
              fontWeight={"400"}
              fontSize={{ base: "13px" }}
              color="black.light"
              letterSpacing="-0.5px"
              textAlign={"start"}
              alignSelf={"start"}
            >
              Progress:
            </Text>
            {renderProgress()}
          </HStack>

          <Slider
            aria-label="slider-ex-1"
            colorScheme="blue"
            min={0}
            value={Number(totalRaised)}
            max={Number(totalRaised) > Number(softCap) ? Number(totalRaised) * 2 : Number(softCap)}
          >
            <SliderTrack bg="red.100">
              <SliderFilledTrack bg="tomato" />
            </SliderTrack>
            <SliderThumb boxSize={4}>
              <Box color="tomato" as={BiRocket} />
            </SliderThumb>
          </Slider>
        </VStack>

        <HStack w="full" justifyContent={"space-between"}>
          <Text
            fontWeight={"400"}
            fontSize={{ base: "13px" }}
            color="black.light"
            letterSpacing="-0.5px"
          >
            Chain:
          </Text>
          <Image
            src={EVM_CHAIN_LIST[itemLaunch.chainId].logo}
            w="18px"
            h="18px"
            borderRadius={"20px"}
          />
        </HStack>

        <HStack w="full" justifyContent={"space-between"}>
          <Text
            fontWeight={"400"}
            fontSize={{ base: "13px" }}
            color="black.light"
            letterSpacing="-0.5px"
          >
            Softcap:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={{ base: "14px", md: "16px" }}
            lineHeight="21px"
            className="textPrimary"
            letterSpacing="-0.5px"
          >
            {formatMoney(itemLaunch.softCap.toString())} {itemLaunch.currency}
          </Text>
        </HStack>

        <HStack w="full" justifyContent={"space-between"}>
          <Text
            fontWeight={"400"}
            fontSize={{ base: "13px" }}
            color="black.light"
            letterSpacing="-0.5px"
          >
            Liquidity %:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={{ base: "14px", md: "16px" }}
            lineHeight="21px"
            color="black.light"
            letterSpacing="-0.5px"
          >
            {itemLaunch.liquidity}%
          </Text>
        </HStack>

        <HStack w="full" justifyContent={"space-between"}>
          <Text
            fontWeight={"400"}
            fontSize={{ base: "13px" }}
            color="black.light"
            letterSpacing="-0.5px"
          >
            Lockup Time:
          </Text>
          <Text
            fontWeight={"500"}
            fontSize={{ base: "14px", md: "16px" }}
            lineHeight="21px"
            color="black.light"
            letterSpacing="-0.5px"
          >
            Infinite
          </Text>
        </HStack>

      </VStack>
    </VStack>
  );
};
