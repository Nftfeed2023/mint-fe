import {
  VStack,
  HStack,
  Text,
  Image,
  Box,
  Grid,
  GridItem,
  SimpleGrid,
} from "@chakra-ui/react";
import { Fragment, useCallback, useRef } from "react";
import { CHAIN_CODE } from "~/@config/chain-code";
import { EVM_CHAIN_LIST } from "~/@config/chain-list";
import { NftCollection } from "~/dto/nft-project.dto";
import { formatPrice } from "~/utils";
import GlobalIcon from "~/components/Icons/Global";
import TwitterIcon from "~/components/Icons/Twitter";
import DiscordICon from "~/components/Icons/Discord";
import IconETH from "~/assets/images/eth.png";
import useWindowSize from "~/hooks/useWindowSize";
import PrimaryButton from "~/components/PrimaryButton";

export const NftList = (props: {
  nftList: NftCollection[];
  selectCol: string;
  setSelectCol: (e) => void;
  openModal: () => void;
}) => {
  const { nftList, setSelectCol, selectCol, openModal } = props;
  const videoRef = useRef(null);
  const { width } = useWindowSize();

  const renderBody = useCallback(
    (item: NftCollection) => {
      const {
        id,
        image,
        chainId,
        qtyMinted,
        price,
        name,
        twitter = "",
        website = "",
        discord = "",
      } = item;
      const { logo } = EVM_CHAIN_LIST[chainId] || {
        chainName: "",
        logo: "",
        dislayName: "",
        nativeCurrency: { symbol: "" },
      };

      return (
        <VStack
          w="full"
          spacing={4}
          cursor={"pointer"}
          p={{ base: "10px", lg: "15px 5px" }}
          bg="white"
          borderRadius="8px"
          border={selectCol === id ? "3px solid #E53E3E" : "1px solid #ccc"}
          boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
          onClick={() => {
            setSelectCol(id);
            if (width <= 920) {
              openModal();
            }
          }}
        >
          <Grid
            w="full"
            gap={4}
            templateColumns="repeat(12, 1fr)"
            alignItems={"center"}
          >
            <GridItem w="full" colSpan={{ base: 12, "2xl": 5 }}>
              <VStack h="180px">
                {image.includes(".mp4") ? (
                  <Box w="inherit" height="inherit">
                    <video
                      loop
                      ref={videoRef}
                      style={{
                        borderRadius: "8px",
                        width: "inherit",
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
              </VStack>
            </GridItem>

            <GridItem w="full" colSpan={{ base: 12, "2xl": 7 }}>
              <VStack
                w="full"
                spacing={2}
                alignItems={{ base: "center", "2xl": "start" }}
              >
                <Text
                  fontWeight="600"
                  fontSize={{ base: "18px" }}
                  lineHeight="24px"
                  textAlign={{ base: "center", "2xl": "left" }}
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

                <HStack cursor={{ base: "none", lg: "pointer" }} pb={"8px"}>
                  <Image
                    src={
                      chainId === CHAIN_CODE.ZETACHAIN_TESTNET ||
                      chainId === CHAIN_CODE.ZETACHAIN_MAINNET
                        ? logo
                        : IconETH
                    }
                    w="24px"
                    h="24px"
                    bg="#FFFBEA"
                    p="1px"
                    borderRadius={"10px"}
                    border="1px solid #FFFBEA"
                  />
                  {website && (
                    <GlobalIcon onClick={() => window.open(website)} />
                  )}
                  {twitter && (
                    <TwitterIcon onClick={() => window.open(twitter)} />
                  )}
                  {discord && (
                    <DiscordICon onClick={() => window.open(discord)} />
                  )}
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
                    <Text
                      fontSize={{ base: "13px", md: "16px" }}
                      fontWeight="500"
                    >
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

                <Text fontSize="16px" fontWeight="500" color={"#ee3824"}>
                  {`${formatPrice(qtyMinted) || 0} mints`}
                </Text>

                {width <= 900 && (
                  <PrimaryButton size={"sm"} w="50%" fontSize={"13px"}>
                    Mint
                  </PrimaryButton>
                )}
              </VStack>
            </GridItem>
          </Grid>
        </VStack>
      );
    },
    [openModal, selectCol, setSelectCol, width]
  );

  if (width <= 920) {
    return (
      <SimpleGrid w="full" spacing={2} columns={{ base: 1, md: 3 }}>
        {nftList.map((item, idx) => {
          return <Fragment key={idx}>{renderBody(item)}</Fragment>;
        })}
      </SimpleGrid>
    );
  }

  return (
    <VStack w="full" spacing={2} alignItems={{ lg: "start" }}>
      {nftList.map((item, idx) => {
        return <Fragment key={idx}>{renderBody(item)}</Fragment>;
      })}
    </VStack>
  );
};
