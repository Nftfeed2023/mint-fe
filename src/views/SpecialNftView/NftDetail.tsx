import {
  VStack,
  SimpleGrid,
  HStack,
  Divider,
  Box,
  Text,
  Image,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Icon,
  Grid,
  GridItem,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import { CHAIN_CODE } from "~/@config/chain-code";
import { EVM_CHAIN_LIST } from "~/@config/chain-list";
import { NftCollection } from "~/dto/nft-project.dto";
import { formatPrice } from "~/utils";
import GlobalIcon from "~/components/Icons/Global";
import TwitterIcon from "~/components/Icons/Twitter";
import DiscordICon from "~/components/Icons/Discord";
import IconETH from "~/assets/images/eth.png";
import { useCallback, useRef } from "react";
import MintQty from "../FreeMintView/NftCollectionDetail/MintQty";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import { useSwitchChain } from "~/hooks/@global/useSwitchChain";
import { useMint } from "../FreeMintView/hooks/useMint";
import { useParams, useSearchParams } from "react-router-dom";
import { CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { getExplorer } from "~/@web3-config/evm";
import SecondaryButton from "~/components/SecondaryButton";
import WrapperCopy from "~/components/WrapperCopy";
import { MAIN_ROUTERS } from "~/routes/routes";
import { useSubscribe } from "../FreeMintView/hooks/useSubscribe";
import LazyLoad from "react-lazy-load";

export const NftDetail = (props: {
  collection: NftCollection;
  selectCol: string;
}) => {
  const { collection, selectCol } = props;
  const videoRef = useRef(null);
  const {
    address,
    image,
    chainId,
    qtyMinted,
    price,
    name,
    twitter = "",
    website = "",
    discord = "",
    banner,
    desc,
    versionFactory,
  } = collection;
  const {
    logo: chainLogo,
    chainName = "",
    nativeCurrency,
  } = EVM_CHAIN_LIST[chainId] || {
    logo: "",
    chainName: "",
    nativeCurrency: { symbol: "" },
  };

  const { chainId: chainIdActive } = useConnectWallet();
  const switchChain = useSwitchChain();
  const [searchParams] = useSearchParams();
  const { address: addressId } = useParams();

  const {
    mint,
    isLoading,
    maxTotalSupply,
    qtyMintedCollection,

    getPercentMinted,
    isMinted,
    getPromotionAmountByQty,
    mintByQty,
    nftPrice,
    promotionQtys,
    promotionPercents,
    endTime,
  } = useMint({ address, versionFactory, ref: searchParams.get("ref") || "" });

  const {
    isLoading: loadingSub,
    registerSubscribe,
    subscribed,
  } = useSubscribe({ address });

  const onSwitchChain = useCallback(() => {
    switchChain(chainId).catch();
  }, [chainId, switchChain]);

  const renderButton = useCallback(() => {
    if (chainIdActive !== chainId) {
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
          onClick={onSwitchChain}
          leftIcon={<Image src={chainLogo} w="25px" h="25px" />}
        >
          Switch to {chainName}
        </Button>
      );
    }

    return (
      <MintQty
        symbol={nativeCurrency?.symbol || ""}
        address={address}
        // disabled={
        //   isMinted ||
        //   !subscribed}
        isLoading={isLoading}
        isMinted={isMinted}
        mintByQty={mintByQty}
        getPromotionAmountByQty={getPromotionAmountByQty}
        disabled={false}
      />
    );
  }, [
    address,
    chainId,
    chainIdActive,
    chainLogo,
    chainName,
    getPromotionAmountByQty,
    isLoading,
    isMinted,
    mintByQty,
    nativeCurrency?.symbol,
    onSwitchChain,
  ]);

  return (
    <VStack w="full" spacing={2} alignItems={"start"}>
      <VStack w="full" position={"relative"}>

        <Box
          w="full"
          position="relative"
        >
          <Box bg="#000" w='full'>
            <LazyLoad>
              <Image
                h={{
                  base: "160px",
                  lg: "320px",
                }}
                w={"full"}
                src={collection?.banner || ""}
                blockSize={"auto"}
                objectPosition={"center"}
                objectFit={{ base: "cover" }}
                style={{
                  aspectRatio: 16 / 9,
                }}
                opacity={0.2}
                loading="lazy"
              />
            </LazyLoad>
          </Box>

          <VStack position={"absolute"} top={{ base: 0, lg: 0 }} w="full">
            <Image
              h={{
                base: "160px",
                lg: "320px",
              }}
              w={"full"}
              src={collection?.banner || ""}
              objectFit={{ base: "contain" }}
              style={{
                aspectRatio: 16 / 9,
              }}
              loading="lazy"
            />
          </VStack>
        </Box>

        <VStack
          position={"absolute"}
          bottom={{ base: "-48%", lg: "-35%", xl: "-25%" }}
        >
          <Image
            bg="white"
            w={{
              base: "80px",
              lg: "100px",
            }}
            h={{
              base: "80px",
              lg: "100px",
            }}
            src={collection?.logo}
            borderWidth="1px"
            borderStyle="solid"
            borderColor="#e2e2e2"
            borderRadius={"100px"}
            objectFit={"contain"}
          />
        </VStack>
      </VStack>

      <Grid pt="70px" w="full" gap={4} templateColumns="repeat(12, 1fr)">
        <GridItem w="full" colSpan={{ base: 12, xl: 5 }}>
          <VStack w="full">
            <Box
              h={{ base: "300px", lg: "600px", xl: "400px", "2xl": "500px" }}
              w="full"
            >
              {image.includes(".mp4") ? (
                <Box w="100%" height="inherit">
                  <video
                    loop
                    ref={videoRef}
                    style={{
                      borderRadius: "8px",
                      width: "100%",
                      height: "inherit",
                      objectFit: "cover",
                    }}
                    //@ts-ignore
                    autoPlay={true}
                    //@ts-ignore
                    playsInline="playsInline"
                    //@ts-ignore
                    muted="muted"
                    src={image}
                  ></video>
                </Box>
              ) : (
                <Image
                  src={image}
                  h="inherit"
                  w="full"
                  borderRadius={"8px"}
                  objectFit={"cover"}
                />
              )}
            </Box>
          </VStack>
        </GridItem>

        <GridItem w="full" colSpan={{ base: 12, xl: 7 }}>
          <VStack spacing={2} alignItems={"start"} px="10px">
            <Text
              fontWeight="600"
              fontSize={{ base: "18px", md: "24px" }}
              lineHeight="24px"
              textAlign="left"
              color="black"
              _hover={{
                textDecorationLine: "underline",
                color: "#ee3824",
              }}
              noOfLines={2}
            >
              {name && name.length > 40
                ? name.slice(0, 40).concat("...")
                : name}
            </Text>

            <HStack cursor={{ base: "none", lg: "pointer" }} mb={"4px"}>
              <Image
                src={
                  chainId === CHAIN_CODE.ZETACHAIN_TESTNET ||
                    chainId === CHAIN_CODE.ZETACHAIN_MAINNET
                    ? chainLogo
                    : IconETH
                }
                w="24px"
                h="24px"
                bg="#FFFBEA"
                p="1px"
                borderRadius={"10px"}
                border="1px solid #FFFBEA"
              />
              {website && <GlobalIcon onClick={() => window.open(website)} />}
              {twitter && <TwitterIcon onClick={() => window.open(twitter)} />}
              {discord && <DiscordICon onClick={() => window.open(discord)} />}
            </HStack>

            {price ? (
              <HStack mt="0px !important" alignItems={"baseline"}>
                <Text
                  fontSize={{ base: "12px", md: "14px" }}
                  fontWeight="500"
                  lineHeight={"normal"}
                >
                  Price:
                </Text>

                <Text
                  fontSize={{ base: "15px", md: "18px" }}
                  color="#ee3824"
                  fontWeight={700}
                  lineHeight={"normal"}
                >
                  {price}
                </Text>

                <Text
                  fontSize={{ base: "12px", md: "14px" }}
                  fontWeight="500"
                  lineHeight={"normal"}
                >
                  {EVM_CHAIN_LIST[chainId].nativeCurrency.symbol}
                </Text>
              </HStack>
            ) : (
              <HStack>
                <Text fontSize={{ base: "13px", md: "16px" }} fontWeight="500">
                  Price:
                </Text>

                <Text
                  fontSize={{ base: "13px", md: "16px" }}
                  color="black.light"
                  fontWeight="600"
                >
                  Free
                </Text>
              </HStack>
            )}

            <Text
              fontSize={{ base: "16px", md: "20px" }}
              fontWeight="500"
              color={"#ee3824"}
            >
              {`${formatPrice(qtyMinted) || 0} mints`}
            </Text>

            <SimpleGrid
              w="full"
              columns={{ base: 1, md: 2 }}
              spacing={2}
              pb="20px"
            >
              <Button
                colorScheme="red"
                color="#fff"
                borderRadius="12px"
              // onClick={onOpen}
              // isLoading={loadingSub}
              // disabled={subscribed}
              >
                {subscribed ? "Subscribed" : "Subscribe"}
              </Button>

              <SecondaryButton
                rightIcon={
                  <WrapperCopy copyText={address}>
                    <Icon as={CopyIcon} />
                  </WrapperCopy>
                }
              >
                Copy Address
              </SecondaryButton>

              <SecondaryButton
                rightIcon={<ExternalLinkIcon />}
                onClick={() => {
                  window.open(`${getExplorer(chainId)}/token/${address}`);
                }}
              >
                View scan
              </SecondaryButton>

              <SecondaryButton
                rightIcon={<Image src={"https://mint.fun/icon16.png?v=4"} />}
                onClick={() => {
                  let website = `https://mint.fun/`;
                  if (chainId === 8453) {
                    website += "base/" + addressId;
                  }
                  window.open(website);
                }}
              >
                mint.fun
              </SecondaryButton>

              <SecondaryButton
                rightIcon={
                  <Image
                    src={
                      "https://opensea.io/static/images/logos/opensea-logo.svg"
                    }
                    h="20px"
                    w="20px"
                  />
                }
                onClick={() => {
                  let website = `https://opensea.io/`;
                  window.open(website);
                }}
              >
                opensea
              </SecondaryButton>
            </SimpleGrid>

            {renderButton()}
          </VStack>
        </GridItem>
      </Grid>

      <Divider
        pt="30px"
        borderBottomColor={"#ee3824"}
        borderBottomStyle={"dashed"}
      />

      <VStack p={{ base: "10px", md: "20px" }} w="full" bg="white">
        <Box bg="white" borderRadius="8px">
          <ReactQuill value={desc} readOnly={true} theme={"bubble"} />
        </Box>
      </VStack>
    </VStack>
  );
};
