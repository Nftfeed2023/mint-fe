import { useCallback, useRef, useState } from "react";
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
  Center,
} from "@chakra-ui/react";

// import { ReactComponent as CopyIcon } from '~/assets/svgs/copy.svg'
import { ReactComponent as InfoIcon } from "~/assets/svgs/info.svg";
import { ReactComponent as ArrowDown } from "~/assets/svgs/arrow-down.svg";

import { configEnv } from "~/@config";
import HeaderMobile from "./Header.mobile";

import { IQuest, NftCollection } from "~/dto/nft-project.dto";
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
import { checkURLType } from "~/common/utils/common.utils";
import useCopyToClipboard from "~/hooks/@global/useCopyToClipboard";
import { formatAmountToken } from "~/common/block-chain.helper";
import CountDownTime from "./CountDownTime";
import LazyLoad from "react-lazy-load";
import { useMintCrawlV1 } from "../hooks/useMintCrawlV1";
import { BiRocket } from "react-icons/bi";
import ReactQuill from "react-quill";

const {} = configEnv();
interface IMintContainerProps extends NftCollection {
  quests: IQuest[];
}

export const MintContainerCrawl = (props: IMintContainerProps) => {
  const { chainId: chainIdActive } = useConnectWallet();
  const {
    address,
    name,
    image,
    desc,
    symbol,
    quests = [],
    chainId,
    endTime: endTimeCol,
  } = props;

  const [isOpenAboutCollection, setIsOpenAboutCollection] = useState(true);
  const [, copy] = useCopyToClipboard();
  const switchChain = useSwitchChain();
  const [searchParams] = useSearchParams();

  const { address: addressId } = useParams();
  const videoRef = useRef(null);
  const { account } = useConnectWallet();
  const { width } = useWindowSize();
  const [email, setEmail] = useState("");

  const {
    mint,
    isLoading,
    nftPrice,
    maxTotalSupply,
    qtyMintedCollection,
    getPercentMinted,
  } = useMintCrawlV1({ address, targetChainId: chainId });

  const {
    isLoading: loadingSub,
    registerSubscribe,
    subscribed,
  } = useSubscribe({ address });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const { logo: chainLogo, chainName = "" } = EVM_CHAIN_LIST[chainId] || {
    logo: "",
    chainName: "",
    nativeCurrency: { symbol: "" },
  };

  const isEnded = new Date(endTimeCol).getTime() < new Date().getTime();

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

  const defaultActive = quests.map((_, idx) => idx);

  const renderQuest = useCallback(() => {
    if (!quests.length) {
      return null;
    }

    return (
      <Accordion allowMultiple w="full" defaultIndex={defaultActive}>
        {quests.map((quest) => {
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
          disabled={!isWhiteList() || !subscribed}
        >
          {nftPrice.gt(0)
            ? `Mint 1 for ${formatAmountToken(nftPrice)}`
            : "Mint for Free"}
        </Button>
      </VStack>
    );
  }, [
    chainId,
    chainIdActive,
    chainLogo,
    chainName,
    isLoading,
    isWhiteList,
    mint,
    nftPrice,
    onSwitchChain,
    subscribed,
  ]);

  const renderTitleNftMinted = useCallback(() => {
    return (
      <HStack justify={"space-between"}>
        <Text color="black.1d" letterSpacing="-0.5px">
          {"Total Minted"}
        </Text>
        <Text color="black.5d" letterSpacing="-0.5px">
          {isEnded && maxTotalSupply === 0
            ? `(${qtyMintedCollection}/${qtyMintedCollection})`
            : maxTotalSupply
            ? `${getPercentMinted()}% (${qtyMintedCollection}/${maxTotalSupply})`
            : `(${qtyMintedCollection})/∞`}
        </Text>
      </HStack>
    );
  }, [getPercentMinted, isEnded, maxTotalSupply, qtyMintedCollection]);

  const renderMinted = useCallback(() => {
    return (
      <>
        <Box p={"4"} border="1px solid #ccc">
          <Slider
            aria-label="slider-ex-1"
            colorScheme="blue"
            value={0}
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
            {new Date(endTimeCol).getTime() >= new Date().getTime() && (
              <CountDownTime
                title="ENDS IN"
                endTime={new Date(endTimeCol)}
                fontSize="20px"
                color="red"
              />
            )}
          </Center>
        </Box>
      </>
    );
  }, [endTimeCol]);

  return (
    <Box>
      <HeaderMobile />
      <Box
        px={{
          base: 0,
          lg: "30px",
          xl: "50px",
        }}
        pt={{
          base: "10px",
        }}
        overflow="hidden"
      >
        <Grid
          templateColumns="repeat(8, 1fr)"
          gap={{
            base: 0,
            lg: 4,
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
            bg="white"
          >
            <VStack position="relative" w="100%" h="100%" alignItems={"center"}>
              {checkURLType(image || "") === "Video" ? (
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
                  <LazyLoad>
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
                      autoPlay={true}
                      //@ts-ignore
                      playsInline="playsInline"
                      //@ts-ignore
                      muted="muted"
                      src={image}
                    ></video>
                  </LazyLoad>
                </Box>
              ) : (
                <Image
                  w={"full"}
                  h={{
                    base: "374px",
                    lg: "512px",
                  }}
                  padding={"10px"}
                  borderRadius="8px"
                  src={image}
                  objectFit={{ base: "contain", md: "contain" }}
                  fallbackSrc="/assets/images/empty-item.png"
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
            p={{
              base: "10px",
              md: "20px",
            }}
            bg="white"
            borderRadius="8px"
            rowSpan={1}
          >
            <SimpleGrid
              w="full"
              columns={{ base: 1, md: 4, "2xl": 5 }}
              spacing={2}
              pb="20px"
            >
              <Button
                colorScheme="red"
                color="#fff"
                borderRadius="12px"
                onClick={onOpen}
                isLoading={loadingSub}
                disabled={subscribed}
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
                  if (
                    addressId === "0x4fe086527e06a660cabddb964c285a938f3c8336"
                  ) {
                    website += "collection/foxnft-3";
                  }
                  window.open(website);
                }}
              >
                opensea
              </SecondaryButton>
            </SimpleGrid>

            {renderTitleNftMinted()}

            {renderMinted()}

            {renderButton()}

            <VStack py="10px" w="full" spacing={4}>
              {renderQuest()}
            </VStack>

            <VStack w="full" pt="10px">
              <Box w="full">
                <HStack
                  w="full"
                  px={{
                    base: "10px",
                    lg: "30px",
                  }}
                  py="14px"
                  bg="rgba(68, 138, 255, 0.12)"
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
                  <Box>
                    {width <= 500 && (
                      <Icon
                        as={ArrowDown}
                        w="24px"
                        h="24px"
                        onClick={() => {
                          setIsOpenAboutCollection((current) => !current);
                        }}
                      />
                    )}
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
                    {/* <Text
                      fontWeight="400"
                      fontSize="16px"
                      lineHeight="19px"
                      letterSpacing="-0.5px"
                      color="grey.66"
                      textAlign="justify"
                    >
                      <span
                        style={{ whiteSpace: "pre-line", lineHeight: "26px" }}
                        dangerouslySetInnerHTML={{
                          __html: desc
                        }}
                      />
                    </Text> */}
                  </Box>
                )}
              </Box>
            </VStack>
          </GridItem>
        </Grid>
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
                onBlur={() => {}}
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
    </Box>
  );
};
