import {
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import { useCallback, useMemo, useState } from "react";
import { TextHorizon } from "~/@ui/TextHorizon";
import ReactQuill from "react-quill";
import { ILauchPool } from "~/dto/ILauchPool";
import { EVM_CHAIN_LIST } from "~/@config/chain-list";
import { useCreatePresaleFairLaunch } from "./hooks/useCreatePresaleFairLaunch";
import dayjs from "dayjs";
import PrimaryButton from "~/components/PrimaryButton";
import { formatEther } from "ethers/lib/utils";
import { SuccessModal } from "./SuccessModal";
import { formatMoney } from "~/utils";

export const Step4 = (props: {
  onBack: () => void;
  launchPool: ILauchPool;
}) => {
  const { onBack, launchPool } = props;
  const { chainId, account } = useConnectWallet();
  const [presaleAddresss, setPresaleAddress] = useState(null);
  const { chainName, logo, dislayName, nativeCurrency } = EVM_CHAIN_LIST[
    chainId
  ] || {
    chainName: "",
    logo: "",
    dislayName: "",
    nativeCurrency: { symbol: "" },
  };

  const {
    isOpen,
    isApprove,
    approve,
    createPool,
    isLoading,
    amountApprove
  } = useCreatePresaleFairLaunch(launchPool);

  const renderButtons = useCallback(() => {

    const onSubmit = () => {
      createPool(
        async (presaleAddress: string) => {
          setPresaleAddress(presaleAddress);
        }
      );
    };

    if (!isApprove) {
      return (
        <PrimaryButton
          bg="yellow.primary !important"
          disabled={!account || isLoading}
          isLoading={isLoading}
          onClick={approve}
        >
          {`You need approve [ ${formatMoney(formatEther(amountApprove))} ${launchPool.tokenSymbol} ]`}
        </PrimaryButton>
      )
    }
    return (
      <PrimaryButton
        onClick={onSubmit}
        disabled={!account || isLoading}
        isLoading={isLoading}
      >
        Submit
      </PrimaryButton>
    )
  }, [account, amountApprove, approve, createPool, isApprove, isLoading, launchPool.tokenSymbol])

  const dataReview = useMemo(() => {
    return [
      {
        name: "Chain ID",
        value: launchPool.chainId,
      },
      {
        name: "Chain Name",
        value: chainName,
      },
      {
        name: "Token Name",
        value: launchPool.tokenName,
      },
      {
        name: "Token Address",
        value: launchPool.tokenAddress,
      },
      {
        name: "Token symbol",
        value: launchPool.tokenSymbol,
      },
      {
        name: "Token decimals",
        value: "18",
      },
      {
        name: "Tokens For Presale",
        value: `${formatMoney(launchPool.tokensForPresale.toString())} ${launchPool.tokenSymbol}`,
      },
      {
        name: "Fee",
        value: launchPool.fee + "%",
      },
      {
        name: "Router",
        value: launchPool.routerAddress,
      },
      {
        name: "Softcap",
        value: `${formatMoney(launchPool.softCap.toString())} ${nativeCurrency.symbol}`,
      },
      {
        name: "Pool Type",
        value: "Standard Token (ZRC)",
      },
      {
        name: "Liquidity",
        value: `${launchPool.liquidity} %`,
      },
      {
        name: "Liquidity Locking Time",
        value: `Infinite`,
      },
      {
        name: "Start time UTC)",
        value:
          dayjs(new Date(launchPool.startTime).toUTCDate()).format("YYYY-MM-DD HH:mm"),
      },
      {
        name: "End time (UTC)",
        value:
          dayjs(new Date(launchPool.endTime).toUTCDate()).format("YYYY-MM-DD HH:mm"),
      },
      {
        name: "Website",
        value: launchPool.website,
      },
      {
        name: "Facebook",
        value: launchPool.facebook,
      },
      {
        name: "X",
        value: launchPool.twitter,
      },
      {
        name: "Github",
        value: launchPool.github,
      },
      {
        name: "Telegram",
        value: launchPool.telegram,
      },
      {
        name: "Instagram",
        value: launchPool.instagram,
      },
      {
        name: "Discord",
        value: launchPool.discord,
      },
      {
        name: "Reddit",
        value: launchPool.reddit,
      },
      {
        name: "Youtube",
        value: launchPool.youtube,
      },
    ];
  }, [
    chainName,
    launchPool.chainId,
    launchPool.discord,
    launchPool.endTime,
    launchPool.facebook,
    launchPool.fee,
    launchPool.github,
    launchPool.instagram,
    launchPool.liquidity,
    launchPool.reddit,
    launchPool.routerAddress,
    launchPool.softCap,
    launchPool.startTime,
    launchPool.telegram,
    launchPool.tokenAddress,
    launchPool.tokenName,
    launchPool.tokenSymbol,
    launchPool.tokensForPresale,
    launchPool.twitter,
    launchPool.website,
    launchPool.youtube,
    nativeCurrency.symbol,
  ]);

  return (
    <Box>

      <VStack width={"full"}>

        <VStack
          pt="50px"
          w={{ base: "100%", lg: "50%" }}
          spacing={4}
        >
          <VStack w="full">
            <Text
              fontWeight="500"
              fontSize={{ base: "14px", md: "16px" }}
              alignSelf={"start"}
            >
              Logo
            </Text>
            <Avatar
              p="1px"
              size={"xl"}
              border="1px solid #ccc"
              src={launchPool.logo}
            />
          </VStack>

          {dataReview.map((item, idx) => {
            return (
              <Box w="full" maxW={"100%"}>
                <TextHorizon
                  key={idx}
                  title={`${item.name}`}
                  value={`${item.value}`}
                />
                <Divider />
              </Box>
            );
          })}

          <VStack w="full" alignItems={"start"}>
            <Text fontWeight="500" fontSize={{ base: "14px", md: "16px" }}>
              Description
            </Text>
            <ReactQuill
              value={launchPool.description}
              readOnly={true}
              theme={"bubble"}
            />
          </VStack>

          <VStack w="full" spacing={0}>
            <Text
              fontWeight="600"
              fontSize={{ base: "20px", }}
              textAlign={"center"}
              className="textPrimary"
              p="0px"
            >
              Pool create fee : 100 ZETA
            </Text>
            <Text
              fontWeight="600"
              fontSize={{ base: "20px", }}
              textAlign={"center"}
              className="textPrimary"
            >
              Send to pre-approval
            </Text>
            <Text
              fontWeight="400"
              fontSize={{ base: "13px", }}
              textAlign={"center"}
            >
              Review before submitting. Double-check all entries for accuracy. Once approved by FEEDIPAD, your fairlaunch pool will be revealed.
            </Text>
          </VStack>

          <HStack mt="10px">

            <Button
              borderRadius="8px"
              fontWeight="500"
              fontSize="16px"
              lineHeight="18px"
              h="auto"
              color="#000"
              w="100px"
              p="10px"
              disabled={!account || isLoading}
              onClick={onBack}
              isLoading={isLoading}
            >
              Back
            </Button>

            {renderButtons()}

          </HStack>

        </VStack>

      </VStack>

      <SuccessModal
        isOpen={isOpen}
        presaleAddress={presaleAddresss}
      />

    </Box>
  );
};
