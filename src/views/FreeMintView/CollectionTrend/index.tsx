

import { Box, Text, VStack, Divider, Button, Container, Heading, Stack, SimpleGrid, HStack } from "@chakra-ui/react"
import { FC, Suspense, useEffect, useState, } from 'react'
import useWindowSize from "~/hooks/useWindowSize"

import { MAIN_ROUTERS, MANAGER_ROUTERS } from "~/routes/routes"
import { useNavigate } from "react-router-dom"

import { ChooseLayoutCard } from "~/components/ChooseLayoutCard"
import { WellcomeModal } from "~/views/StartedView/WellcomeModal"
import React from "react"
import { TitleViewAll } from "~/@ui/common"
import { EChainLocalKey } from "~/common/constants/chain.enum"
import moment from "moment"

type ICollectionTrendProps = {
}

const ScreensPopularLazy = React.lazy(() =>
  import("./PopularLazy")
    .then(({ PopularLazy }) => ({ default: PopularLazy })),
);

const ScreensHotMintLazy = React.lazy(() =>
  import("./HotMintLazy")
    .then(({ HotMintLazy }) => ({ default: HotMintLazy })),
);

const ScreensFreeMintLazy = React.lazy(() =>
  import("./FreeMintLazy")
    .then(({ FreeMintLazy }) => ({ default: FreeMintLazy })),
);

const CollectionTrend: FC<ICollectionTrendProps> = (props: ICollectionTrendProps) => {
  const { width } = useWindowSize()
  const [chooseLayout, setChooseLayout] = useState<"table" | "grid">("table");
  const [selectChain, setSelectChain] = useState(0);
  const [evn, setEvn] = useState(1);

  const closeModalTwitter = localStorage.getItem(EChainLocalKey.closeModalTwitter);
  const todayLocal = localStorage.getItem(EChainLocalKey.today);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (todayLocal) {
      const date1 = moment(new Date(parseInt(todayLocal))).format("DD/MM/YYYY");
      const date2 = moment(new Date()).format("DD/MM/YYYY");

      const checkDay = date1 !== date2;
      // console.log({ checkDay, date1, date2 });

      if (checkDay) {
        localStorage.setItem(EChainLocalKey.closeModalTwitter, "0");
      }
    } else {
      localStorage.setItem(EChainLocalKey.closeModalTwitter, "0");
    }
    // localStorage.setItem(EChainLocalKey.today, new Date().getTime().toString())
  }, [closeModalTwitter, todayLocal])

  useEffect(() => {
    if (!closeModalTwitter || closeModalTwitter === "0") {
      setOpenModal(true);
    }
  }, [closeModalTwitter])

  const navigate = useNavigate();

  useEffect(() => {
    if (width > 500) {
      setChooseLayout("grid")
    } else {
      setChooseLayout("table")
    }
  }, [width])

  return (
    <VStack
      w="full"
      spacing={{ base: 6, md: 2 }}
    >

      <Box
        mt="26px"
        overflow="hidden"
      >

        <Container maxW={'3xl'}>
          <Stack
            as={Box}
            textAlign={'center'}
            spacing={{ base: 4, md: 6 }}
          >
            <Heading
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}>
              Unlock the WEB3 NFT Power - NFTFeed Free Mint
            </Heading>
            <Text color={'gray.500'}>
              Step into the exciting world of NFT Free Mint, where innovation meets exclusivity to revolutionize the NFT landscape by offering a unique and groundbreaking feature - NFT giveaways with an unmatched liquidity mechanism.
            </Text>
            <VStack
              w="full"
            >
              <VStack
                // spacing={3}
                // columns={2}
                w="full"
              >

                {/* <Button
                  justifySelf={"end"}
                  colorScheme={'green'}
                  rounded={'full'}
                  px={6}
                  bg="yellow.primary !important"
                  color="#fff"
                  w={{ base: "full", md: "180px" }}
                  fontSize={{ base: "13px", md: "16px" }}
                  onClick={() => {
                    navigate(MAIN_ROUTERS.NFT_COLLECTION)
                  }}
                >
                  View Collections
                </Button> */}

                <Button
                  colorScheme={'green'}
                  rounded={'full'}
                  px={6}
                  bg="yellow.primary !important"
                  color="black.1d"
                  w={{ base: "full", md: "180px" }}
                  fontSize={{ base: "13px", md: "16px" }}
                  onClick={() => {
                    navigate(MANAGER_ROUTERS.CREATE_COLLECTION)
                  }}
                >
                  Create Collection
                </Button>

                <Box>

                </Box>
              </VStack>
            </VStack>
          </Stack>
        </Container>

      </Box>

      <VStack
        py="10px"
        w="full"
        alignItems={{ base: "center", md: "end" }}
      >
        <ChooseLayoutCard
          evn={evn}
          setEvn={(value) => setEvn(value)}
          onChangeLayout={(value) => setChooseLayout(value)}
          chooseLayout={chooseLayout}
          selectChain={selectChain}
          setSelectChain={(value) => setSelectChain(value)}
        />

      </VStack>

      <Suspense>

        <ScreensPopularLazy
          chooseLayout={chooseLayout}
          chainId={selectChain}
          evn={null}
        />
        <Divider borderBottomColor={"#ccc"} borderBottomStyle={"dashed"} pt="20px" />

        <ScreensHotMintLazy
          chooseLayout={chooseLayout}
          chainId={selectChain}
          evn={evn}
        />
        {width <= 500 &&
          <TitleViewAll
            title="View All"
            openLink={() => {
              navigate(MAIN_ROUTERS.NFT_COLLECTION_DETAIL + "/on-sale")
            }}
          />
        }
        <Divider borderBottomColor={"#ccc"} borderBottomStyle={"dashed"} pt="20px" />

        <ScreensFreeMintLazy
          chooseLayout={chooseLayout}
          chainId={selectChain}
          evn={evn}
        />
        {width <= 500 &&
          <TitleViewAll
            title="View All"
            openLink={() => {
              navigate(MAIN_ROUTERS.NFT_COLLECTION_DETAIL + "/free-mint")
            }}
          />
        }

      </Suspense>

      <WellcomeModal
        isOpen={openModal}
        tweetId='1746788474752295027'
        onClose={() => {
          setOpenModal(false);
        }}
      />

    </VStack>
  )
}
export default CollectionTrend;
