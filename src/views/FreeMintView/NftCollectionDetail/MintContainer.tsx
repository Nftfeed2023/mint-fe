import { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  HStack,
  Icon,
  Image,
  Spacer,
  Text,
  VStack,
  Input,
  Button,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  SimpleGrid,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Center,
} from "@chakra-ui/react";

// import { ReactComponent as CopyIcon } from '~/assets/svgs/copy.svg'
import { ReactComponent as InfoIcon } from "~/assets/svgs/info.svg";
import { ReactComponent as ArrowDown } from "~/assets/svgs/arrow-down.svg";

import HeaderMobile from "./Header.mobile";

import { IQuest, NftCollection } from "~/dto/nft-project.dto";
import { useMint } from "../hooks/useMint";
import { CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import WrapperCopy from "~/components/WrapperCopy";
import SecondaryButton from "~/components/SecondaryButton";
import { getExplorer } from "~/@web3-config/evm";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import { useSubscribe } from "../hooks/useSubscribe";
import { whiteListInput } from "../whiteListInput";
import { EVM_CHAIN_LIST } from "~/@config/chain-list";
import { useSwitchChain } from "~/hooks/@global/useSwitchChain";
import useWindowSize from "~/hooks/useWindowSize";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { checkURLType, getBaseUrl } from "~/common/utils/common.utils";
import useCopyToClipboard from "~/hooks/@global/useCopyToClipboard";
import ButtonPromotion from "./ButtonPromotion";
import MintQty from "./MintQty";
import CountDownTime from "./CountDownTime";
import LazyLoad from "react-lazy-load";
import { MAIN_ROUTERS } from "~/routes/routes";
import { useSystemFee } from "../hooks/useSystemFee";
import { BiRocket } from "react-icons/bi";
import ReactQuill from "react-quill";
import { formatPrice } from "~/utils";
import NoImg from "~/assets/images/no_img.png"
import { AggregatorCampaignView } from "./AggregatorCampaignView";
interface IMintContainerProps extends NftCollection {
  quests: IQuest[];
}

export const MintContainer = (props: IMintContainerProps) => {

  const { chainId: chainIdActive, account } = useConnectWallet();
  const {
    address,
    name,
    image,
    desc,
    symbol,
    quests = [],
    chainId,
    versionFactory,
    endTime: endTimeCol,
    campaignId,
  } = props;

  const [isOpenAboutCollection, setIsOpenAboutCollection] = useState(true);
  const [, copy] = useCopyToClipboard();
  const switchChain = useSwitchChain();
  const [searchParams] = useSearchParams();

  const { address: addressId } = useParams();
  const { pathname } = useLocation();
  const navigation = useNavigate();
  const videoRef = useRef(null);
  const { width } = useWindowSize();
  const [email, setEmail] = useState("");

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

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const {
    logo: chainLogo,
    chainName = "",
    nativeCurrency,
  } = EVM_CHAIN_LIST[chainId] || {
    logo: "",
    chainName: "",
    nativeCurrency: { symbol: "" },
  };

  // const isShakie = pathname === "/nft-collection/0x268174ff68633901a2ec6511b33c590aac4fe263";

  const isShakie = false;

  const isNftDog =
    pathname === "/nft-collection/0x4549b6864b3902b8ebce89b964c59d51876a91d8";

  // const isHidedNft = pathname === "/nft-collection/0x268174ff68633901a2ec6511b33c590aac4fe263";

  const isHidedNft = false;

  const isEnded = new Date(endTimeCol).getTime() < new Date().getTime();

  const { systemFee } = useSystemFee();

  useEffect(() => {
    videoRef?.current?.load();
    setTimeout(() => {
      videoRef?.current?.play();
    }, 2500)
  }, [])

  const isWhiteList = useCallback(() => {
    if (!whiteListInput || !whiteListInput[(address || "").toLowerCase()]) {
      return true;
    }

    const wls: string[] = whiteListInput[(address || "").toLowerCase()] || [];

    if (wls.length === 0) {
      return true;
    }
    if (!account) {
      return false;
    }
    return wls.includes(account.toLowerCase());
  }, [account, address]);

  const isCompleteQuest = useCallback(() => {
    if (!quests) {
      return false;
    }
    return quests.filter((v) => v.claimed).length === quests.length;
  }, [quests]);

  const defaultActive = quests.map((_, idx) => idx);

  const renderQuest = useCallback(() => {
    if (!quests.length) {
      return null;
    }

    const isCheck =
      pathname === "/nft-collection/0x5f05fa19200f054a7249b092ff4cbaa6ae3a75a1";

    return (
      <Accordion allowMultiple w="full" defaultIndex={defaultActive}>
        {quests
          .filter(
            (i) => i.id !== "999c288f-007c-4219-88b7-d679fff941f2" && isCheck
          )
          .map((quest) => {
            return (
              <AccordionItem key={quest.id} py="5px" border="1px solid #fff">
                <AccordionButton bg="rgba(68, 138, 255, 0.12)" py="10px">
                  <HStack alignItems="center" w={"100%"}>
                    <Icon as={InfoIcon} h="24px" w="24px" />
                    <Text
                      fontWeight="600"
                      fontSize="16px"
                      lineHeight="21px"
                      color="black.light"
                      letterSpacing="-0.5px"
                    >
                      {quest?.name}
                    </Text>
                  </HStack>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel p={"0px 10px"}>
                  <VStack w="full" spacing={4} alignItems={"start"}>
                    <span
                      style={{ whiteSpace: "pre-line", lineHeight: "36px" }}
                      dangerouslySetInnerHTML={{ __html: quest?.desc || "" }}
                    />
                    {quest.claimed ? (
                      <Button
                        colorScheme="green"
                        color={"#fff"}
                        w={{ base: "full", md: "180px" }}
                        onClick={() => window.open(quest?.link)}
                      >
                        Success
                      </Button>
                    ) : (
                      <Button
                        colorScheme="cyan"
                        color={"#fff"}
                        w={{ base: "full", md: "180px" }}
                        onClick={() => window.open(quest?.link)}
                      >
                        View Quest
                      </Button>
                    )}
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            );
          })}
      </Accordion>
    );
  }, [defaultActive, quests]);

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
    if (isHidedNft) {
      return null;
    }
    if (isNftDog) {
      <VStack mt="10px">
        <Button
          bg="yellow.primary !important"
          borderRadius="8px"
          fontWeight="600"
          fontSize="16px"
          lineHeight="18px"
          h="auto"
          py="5px"
          color="black.1d"
          w="full"
          p="10px"
          onClick={mint}
          isLoading={isLoading}
          disabled={true}
        >
          {"Mint for Free"}
        </Button>
      </VStack>;
    }
    if (nftPrice.gt(0)) {
      if (versionFactory === "V1") {
        return (
          <SimpleGrid
            mt="10px"
            w="full"
            columns={{ base: 1, md: 2 }}
            spacing={2}
          >
            <InputGroup>
              <InputLeftAddon pointerEvents="none" children="Quantity mint" />
              <Input
                placeholder="Input quantity"
                borderRadius={"2px"}
                type="number"
                //  border="1px solid #E53E3E !important"
                color={"#000"}
              />
            </InputGroup>
            <Button
              bg="yellow.primary !important"
              borderRadius="8px"
              fontWeight="600"
              fontSize="16px"
              lineHeight="18px"
              h="auto"
              py="5px"
              color="black.1d"
              w="full"
              p="10px"
              onClick={mint}
              isLoading={isLoading}
              disabled={
                !isWhiteList() ||
                isMinted ||
                // !isCompleteQuest() ||
                !subscribed
              }
            >
              {isMinted ? "Minted" : "Mint for Free"}
            </Button>
          </SimpleGrid>
        );
      }
      // version2

      return (
        <MintQty
          symbol={nativeCurrency?.symbol || ""}
          address={address}
          disabled={
            !isWhiteList() ||
            isMinted ||
            // !isCompleteQuest() ||
            !subscribed
          }
          isLoading={isLoading}
          isMinted={isMinted}
          mintByQty={mintByQty}
          getPromotionAmountByQty={getPromotionAmountByQty}
        />
      );
    }
    return (
      <VStack mt="10px">
        <Button
          bg="yellow.primary !important"
          borderRadius="8px"
          fontWeight="600"
          fontSize="16px"
          lineHeight="18px"
          h="auto"
          py="5px"
          color="black.1d"
          w="full"
          p="10px"
          onClick={mint}
          isLoading={isLoading}
          disabled={
            !isWhiteList() ||
            isMinted ||
            // !isCompleteQuest() ||
            !subscribed
          }
        >
          {isMinted ? "Minted" : "Mint for Free"}
        </Button>
      </VStack>
    );
  }, [
    address,
    chainId,
    chainIdActive,
    chainLogo,
    chainName,
    getPromotionAmountByQty,
    isHidedNft,
    isLoading,
    isMinted,
    isNftDog,
    isWhiteList,
    mint,
    mintByQty,
    nativeCurrency?.symbol,
    nftPrice,
    onSwitchChain,
    subscribed,
    versionFactory,
  ]);

  const renderTitleNftMinted = useCallback(() => {
    if (isNftDog) {
      return (
        <HStack justify={"space-between"}>
          <Text color="black.1d" letterSpacing="-0.5px">
            {"Total Minted"}
          </Text>
          <Text color="black.5d" letterSpacing="-0.5px">
            {`100% (1026/1026)`}
          </Text>
        </HStack>
      );
    }
    return (
      <HStack justify={"space-between"}>
        <Text color="black.1d" letterSpacing="-0.5px">
          {"Total Minted"}
        </Text>
        <Text color="black.5d" letterSpacing="-0.5px">
          {isEnded && maxTotalSupply === 0
            ? `(${formatPrice(qtyMintedCollection)}/${formatPrice(
              qtyMintedCollection
            )})`
            : maxTotalSupply
              ? `${getPercentMinted()}% (${formatPrice(
                qtyMintedCollection
              )}/${maxTotalSupply})`
              : `(${formatPrice(qtyMintedCollection)})/∞`}
        </Text>
      </HStack>
    );
  }, [
    getPercentMinted,
    isEnded,
    isNftDog,
    maxTotalSupply,
    qtyMintedCollection,
  ]);

  const renderMinted = useCallback(() => {
    if (isNftDog) {
      return (
        <Box p={"4"} borderWidth="2px">
          <Slider
            aria-label="slider-ex-1"
            colorScheme="blue"
            value={100}
            min={0}
            max={100}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </Box>
      );
    }
    return (
      <>
        <Box p={"4"} border="1px solid #ccc">
          <Slider
            aria-label="slider-ex-1"
            colorScheme="blue"
            value={getPercentMinted()}
            min={0}
            max={100}
          >
            <SliderTrack bg="red.100">
              <SliderFilledTrack bg="tomato" />
            </SliderTrack>
            <SliderThumb boxSize={4}>
              <Box color="tomato" as={BiRocket} />
            </SliderThumb>
          </Slider>
          <Center>
            {new Date(endTime * 1000).getTime() >= new Date().getTime() && (
              <CountDownTime
                title="ENDS IN"
                endTime={new Date(endTime * 1000)}
                fontSize="20px"
                color="red"
              />
            )}
          </Center>
        </Box>
      </>
    );
  }, [endTime, getPercentMinted, isNftDog]);

  const renderAffLink = useCallback(() => {
    const affLink = `${getBaseUrl()}/nft-collection/${address}?ref=${account}`;
    return (
      <InputGroup py="10px">
        <InputLeftAddon
          pointerEvents="none"
          children="Affiliate link"
          border="1px solid #ccc !important"
        />
        <Input value={affLink} border="1px solid #ccc !important" />
        <InputRightAddon border="1px solid #ccc !important">
          <Button onClick={() => copy(affLink)} bg={"transparent"}>
            <CopyIcon />
          </Button>
        </InputRightAddon>
      </InputGroup>
    );
  }, [account, address, copy]);

  const renderSystemFee = useCallback(() => {
    if (chainIdActive !== chainId) {
      return null;
    }
    return (
      <Text
        fontWeight="400"
        fontSize={{
          base: "10px",
          md: "14px",
        }}
        color="grey.66"
        textAlign="center"
      >
        Collectors pay a {systemFee} {nativeCurrency?.symbol} mint fee
      </Text>
    );
  }, [chainId, chainIdActive, nativeCurrency?.symbol, systemFee]);

  return (
    <Box>
      <HeaderMobile />

      <Box
        w="full"
        p={{
          base: "10px",
          lg: "20px",
        }}
      >

        <Grid
          templateColumns="repeat(8, 1fr)"
          gap={{
            base: 2,
            lg: 2,
          }}
        >
          <GridItem
            rowSpan={2}
            colSpan={{
              base: 8,
              "3lg": 4,
              xxl: 3,
            }}
            p={{
              base: "20px",
              "3lg": "0",
            }}
            borderRadius="8px"
            h={"fit-content"}
            w="full"
            bg="white"
          >
            <VStack position="relative" w="100%" h="100%" alignItems={"center"}>

              {checkURLType(image || "") === "Video" ? (
                <LazyLoad>
                  <Box
                    h={{
                      base: "374px",
                      lg: "512px",
                    }}
                    maxH={{
                      base: "374px",
                      lg: "512px",
                    }}
                    w="100%"
                  >
                    <video
                      loop
                      ref={videoRef}
                      style={{
                        borderRadius: "8px",
                        width: "100%",
                        height: "inherit",
                        objectFit: "cover",
                        padding: "10px",
                      }}
                      //@ts-ignore
                      playsInline="playsInline"
                      //@ts-ignore
                      muted="muted"
                      src={image}
                    ></video>
                  </Box>
                </LazyLoad>
              ) : (
                <Image
                  w={"full"}
                  h={{
                    base: "374px",
                    lg: "512px",
                  }}
                  p="10px"
                  borderRadius="8px"
                  src={image}
                  objectFit={{ base: "contain", md: "contain" }}
                  fallbackSrc={NoImg}
                />
              )}
            </VStack>
          </GridItem>

          <GridItem
            colSpan={{
              base: 8,
              "3lg": 4,
              xxl: 5,
            }}
            gap={2}
            rowSpan={1}
          >

            <VStack
              w="full"
              spacing={2}
            >

              {/* Socials Action */}

              <AggregatorCampaignView
                campaignId={campaignId}
              />

              {/* Button Action */}

              <Box
                w="full"
                p={{
                  base: "10px",
                  md: "20px",
                }}
                bg="white"
                borderRadius="8px"
              >

                <SimpleGrid
                  w="full"
                  columns={{
                    base: 1,
                    md: isShakie ? 3 : 5,
                    "2xl": isShakie ? 4 : 5,
                  }}
                  spacing={2}
                  py="10px"
                >

                  <Button
                    colorScheme="red"
                    color="#fff"
                    borderRadius="12px"
                    onClick={onOpen}
                    isLoading={loadingSub}
                    disabled={subscribed}
                    fontSize={{ base: 13, }}
                  >
                    {subscribed ? "Subscribed" : "Subscribe"}
                  </Button>

                  <SecondaryButton
                    rightIcon={
                      <WrapperCopy copyText={address}>
                        <Icon as={CopyIcon} />
                      </WrapperCopy>
                    }
                    fontSize={{ base: 13, }}
                  >
                    Copy Address
                  </SecondaryButton>

                  {isShakie && (
                    <Button
                      colorScheme="red"
                      color="#fff"
                      borderRadius="12px"
                      onClick={() => {
                        navigation(MAIN_ROUTERS.STAKE_NFTS);
                      }}
                      fontSize={{ base: 13, }}
                    >
                      Go to Stake SHARKIE
                    </Button>
                  )}

                  <SecondaryButton
                    rightIcon={<ExternalLinkIcon />}
                    onClick={() => {
                      window.open(`${getExplorer(chainId)}/token/${address}`);
                    }}
                    fontSize={{ base: 13, }}
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
                    fontSize={{ base: 13, }}
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
                      if (
                        addressId === "0x4fe086527e06a660cabddb964c285a938f3c8336"
                      ) {
                        website += "collection/foxnft-3";
                      }
                      window.open(website);
                    }}
                    fontSize={{ base: 13, }}
                  >
                    opensea
                  </SecondaryButton>

                  {address === "0xfc1cd25eefeafb059fd04b57277a9e5c4b9fbdab" && chainId === 59144 && (
                    <SecondaryButton
                      rightIcon={
                        <Image
                          src={"https://taskon.xyz/assets/h_icon-20cf61e0.svg"}
                          h="20px"
                          w="20px"
                        />
                      }
                      onClick={() => {
                        let website = `https://taskon.xyz/campaign/detail/30716`;
                        window.open(website);
                      }}
                    >
                      taskon
                    </SecondaryButton>
                  )}
                </SimpleGrid>

                {renderTitleNftMinted()}

                {renderMinted()}

                {renderButton()}

                {promotionQtys.length > 0 && !isHidedNft && (
                  <SimpleGrid
                    w="full"
                    columns={{ base: 1, md: 3, "3lg": 2, "2xl": 3 }}
                    spacing={2}
                    mt={"10px"}
                  >
                    {promotionQtys.map((qty, idx) => {
                      return (
                        <ButtonPromotion
                          symbol={nativeCurrency?.symbol || ""}
                          qty={qty}
                          percent={promotionPercents[idx] / 100}
                          getPromotionAmountByQty={getPromotionAmountByQty}
                          mintByQty={mintByQty}
                          isLoading={isLoading}
                          disabled={
                            !isWhiteList() ||
                            isMinted ||
                            // !isCompleteQuest() ||
                            !subscribed
                          }
                        />
                      );
                    })}
                  </SimpleGrid>
                )}

                {renderAffLink()}

                {renderSystemFee()}

                <VStack py="10px" w="full" spacing={4}>
                  {renderQuest()}
                </VStack>

              </Box>

            </VStack>

          </GridItem>

        </Grid>

        <Box
          w="full"
          bg="#fff"
          borderRadius={"8px"}
          mt="5px"
        >

          <HStack
            w="full"
            px={{
              base: "10px",
              lg: "30px",
            }}
            py="14px"
            bg="rgba(68, 138, 255, 0.4)"
            borderRadius="8px 8px 0px 0px"
          >
            <Box>
              <HStack alignItems="center">
                <Icon as={InfoIcon} h="24px" w="24px" />
                <Text
                  fontWeight="600"
                  fontSize="18px"
                  lineHeight="21px"
                  color="black.light"
                  letterSpacing="-0.5px"
                >
                  Description
                </Text>
                <HStack
                  display={{
                    base: "none",
                    md: "flex",
                  }}
                >
                  <Text
                    fontWeight="500"
                    fontSize="15px"
                    lineHeight="18px"
                    letterSpacing="-0.5px"
                    color="grey.66"
                  >
                    {symbol}
                  </Text>
                </HStack>
              </HStack>
              <HStack
                mt="10px"
                display={{
                  base: "flex",
                  md: "none",
                }}
              >
                <Text
                  fontWeight="500"
                  fontSize="15px"
                  lineHeight="18px"
                  letterSpacing="-0.5px"
                  color="grey.66"
                >
                  <span
                    style={{ whiteSpace: "pre-line", lineHeight: "26px" }}
                    dangerouslySetInnerHTML={{
                      __html:
                        desc && desc.length > 100
                          ? desc.slice(0, 50).concat("...")
                          : desc,
                    }}
                  />
                </Text>
              </HStack>
            </Box>
            <Spacer />
            <Box cursor={{ lg: "pointer" }}>
              <Icon
                as={ArrowDown}
                w="24px"
                h="24px"
                bg="#fff"
                borderRadius={"100px"}
                onClick={() => {
                  setIsOpenAboutCollection((current) => !current);
                }}
              />
            </Box>
          </HStack>

          {isOpenAboutCollection && (
            <Box
              p={{
                base: "20px 15px 30px 15px",
                lg: "20px 68px 30px 30px",
              }}
              bg="white"
              borderRadius="8px"
            >
              <ReactQuill value={desc} readOnly={true} theme={"bubble"} />
            </Box>
          )}

        </Box>

      </Box>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Subscribe {name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => { }}
                borderColor="#448AFF !important"
                borderWidth="1px"
                borderStyle="solid"
                borderRadius="10px"
                textAlign="left"
                fontWeight="500"
                fontSize="16px"
                lineHeight="20px"
                bg="#F7F9FA"
                disabled={false}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={loadingSub}
              colorScheme="red"
              onClick={async () => {
                await registerSubscribe(email);

                onClose();
              }}
            >
              Subscribe
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box >
  );
};
