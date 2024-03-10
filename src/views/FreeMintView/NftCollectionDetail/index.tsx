import { useCallback } from "react";
import {
  Avatar,
  Box,
  Flex,
  Image,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import MainLayout from "~/layouts/MainLayout";
import Description from "./Description";
import useWindowSize from "~/hooks/useWindowSize";
import WrapperHeaderMobile from "~/layouts/MasterLayout/WrapperHeaderMobile";
import { useNftCollectionDetail } from "../hooks/useNftCollectionDetail";
import { MintContainer } from "./MintContainer";
import { MintContainerCrawl } from "./MintContainerCrawl";
import { EMintType } from "~/common/enums";
import GlobalIcon from "~/components/Icons/Global";
import TwitterIcon from "~/components/Icons/Twitter";
import DiscordICon from "~/components/Icons/Discord";
import { PopularView } from "~/views/PopularView";
import IcVerifyTw from "~/assets/icons/ic_verify_tw.svg";

export const NftCollectionDetail = () => {
  const { width } = useWindowSize();

  const { address, chainId } = useParams();
  const { collection } = useNftCollectionDetail({ address, chainId });

  const renderSocsialIcon = useCallback(() => {
    if (!collection) {
      return null;
    }
    const { website, twitter, discord } = collection;
    // if (width <= 500) {
    //   return null;
    // }
    return (
      <HStack pr="10px" cursor={{ base: "none", lg: "pointer" }}>
        {website && <GlobalIcon onClick={() => window.open(website)} />}
        {twitter && <TwitterIcon onClick={() => window.open(twitter)} />}
        {discord && <DiscordICon onClick={() => window.open(discord)} />}
      </HStack>
    );
  }, [collection, width]);

  const renderHeader = useCallback(() => {
    if (width <= 500) {
      return (
        <VStack w="full" mt="-50px">
          <Avatar
            size={{
              base: "100px",
              lg: "160px",
            }}
            w={{
              base: "100px",
              lg: "160px",
            }}
            h={{
              base: "100px",
              lg: "160px",
            }}
            src={collection?.logo}
            borderWidth="1px"
            borderStyle="solid"
            borderColor="#e2e2e2"
          />

          <HStack>
            <Text
              zIndex={10}
              fontSize={{
                base: "18px",
                lg: "28px",
              }}
              color={{
                base: "black.light",
                lg: "black.light",
              }}
              lineHeight={{
                base: "21px",
                lg: "33px",
              }}
              letterSpacing="-0.5px"
              fontWeight="600"
              textAlign={"center"}
            >
              {collection?.name}
            </Text>
            {collection?.isVerifyTwitter && (
              <Image src={IcVerifyTw} w="18px" h="18px" />
            )}
          </HStack>

          {renderSocsialIcon()}
        </VStack>
      );
    }
    return (
      <Flex
        justify={{
          base: "flex-start",
        }}
        mt={{
          base: "-50px",
          lg: "-80px",
        }}
        alignItems={{
          base: "flex-end",
        }}
        mx={{
          base: "20px",
        }}
        position="relative"
      >
        <Avatar
          size={{
            base: "100px",
            lg: "160px",
          }}
          w={{
            base: "100px",
            lg: "160px",
          }}
          h={{
            base: "100px",
            lg: "160px",
          }}
          src={collection?.logo || ""}
          borderWidth="1px"
          borderStyle="solid"
          borderColor="#e2e2e2"
        />
        <HStack w="100%" justifyContent="space-between" align="start">
          <Box flex={1} position="relative">
            <Flex align="start">
              <HStack>
                <Text
                  zIndex={10}
                  fontSize={{
                    base: "18px",
                    lg: "28px",
                  }}
                  color={{
                    base: "black.light",
                    lg: "black.light",
                  }}
                  lineHeight={{
                    base: "21px",
                    lg: "33px",
                  }}
                  letterSpacing="-0.5px"
                  fontWeight="600"
                  noOfLines={2}
                >
                  {collection?.name}
                </Text>
                {collection?.isVerifyTwitter && (
                  <Image src={IcVerifyTw} w="24px" h="24px" />
                )}
              </HStack>
            </Flex>
          </Box>

          {renderSocsialIcon()}
        </HStack>
      </Flex>
    );
  }, [
    collection?.isVerifyTwitter,
    collection?.logo,
    collection?.name,
    renderSocsialIcon,
    width,
  ]);

  return (
    <MainLayout>
      <Box
        w="100%"
        h="100%"
        bg={{
          base: "white",
          lg: "transparent",
        }}
        position="relative"
      >
        <WrapperHeaderMobile />

        {/* <Color src={collection?.banner || collection?.project?.banner} crossOrigin="anonymous" format="hex">
          {({ data, loading }) => {
            if (loading) return null;
            console.log(`Predominant color: ${data}`);

            return null;
            return (
              <div>
                Predominant color: <strong>{data}</strong>
              </div>
            );
          }}
        </Color> */}

        <Box
          position="relative"
          pt={{
            base: "70px",
            lg: 0,
          }}
        >
          <Box bg="#000">
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
          </Box>

          <VStack position={"absolute"} top={{ base: "25%", lg: 0 }} w="full">
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

        <Box bg="white">{renderHeader()}</Box>

        <VStack p={{ base: "0px", md: "20px" }} w="full" bg="white">
          <Description description={collection?.projectDesc || ""} />
        </VStack>

        {collection?.mintType === EMintType.NFTFEED_V1 && (
          <MintContainer {...collection} quests={collection?.quests || []} />
        )}

        {collection?.mintType === EMintType.CRAWL_V1 && (
          <MintContainerCrawl
            {...collection}
            quests={collection?.quests || []}
          />
        )}

        {/* Running */}
        {collection?.mintType === EMintType.NFTFEED_V2 && (
          <MintContainer {...collection} quests={collection?.quests || []} />
        )}

        <Box
          px={{
            base: "10px",
            lg: "30px",
            xl: "50px",
          }}
          pt={{
            base: "10px",
          }}
          w="full"
        >
          <PopularView />
        </Box>

        <Box h="20vh" />

        {/*
                {renderMobileLayout()}
                {renderDesktopLayout()} */}
      </Box>
    </MainLayout>
  );
};
