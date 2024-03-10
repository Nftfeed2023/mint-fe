


import { HStack, Box, Text, VStack, Image, Divider, SimpleGrid, Grid, GridItem, } from "@chakra-ui/react"
import { FC, Suspense, useCallback, useEffect, useState } from 'react'
import useWindowSize from "~/hooks/useWindowSize"

import RocketImg from '~/assets/rocket.svg'
import PopularImg from '~/assets/popular.svg'
import MainLayout from "~/layouts/MainLayout"
import WrapperHeaderMobile from "../../layouts/MasterLayout/WrapperHeaderMobile"
import { useParams } from "react-router-dom"
import { EHomeListTag, EListNftFilterStatus } from "~/dto/nft-collection.dto"
import { useListCollection } from "../FreeMintView/hooks/useListCollection"
import { ChooseLayoutCard } from "~/components/ChooseLayoutCard"
import PaginationComponent from "~/components/Pagination"
import { usePagination } from "@ajna/pagination"
import React from "react"
import { Select, chakraComponents } from "chakra-react-select";

const FILTER = [
  {
    value: EListNftFilterStatus.ALL,
    label: <Text
      fontSize={{ base: "14px" }}
      lineHeight={{ base: "normal", }}
      textAlign={"left"}
      padding={{ base: "10px 4px" }}
      color={"#000"}
      fontWeight={400}
    >
      ALL
    </Text>
  },
  {
    value: EListNftFilterStatus.LIVE,
    label: <Text
      fontSize={{ base: "14px" }}
      lineHeight={{ base: "normal", }}
      textAlign={"left"}
      padding={{ base: "10px 4px" }}
      color={"#000"}
      fontWeight={400}
    >
      LIVE
    </Text>
  },
  {
    value: EListNftFilterStatus.ENDED,
    label: <Text
      fontSize={{ base: "14px" }}
      lineHeight={{ base: "normal", }}
      textAlign={"left"}
      padding={{ base: "10px 4px" }}
      color={"#000"}
      fontWeight={400}
    >
      ENDED
    </Text>
  },
]

type ICollectionTrendProps = {
}

const ScreensCollectionDetailLazy = React.lazy(() =>
  import("./CollectionDetailLazy")
    .then(({ CollectionDetailLazy }) => ({ default: CollectionDetailLazy })),
);

const CollectionDetail: FC<ICollectionTrendProps> = (props: ICollectionTrendProps) => {
  const { width } = useWindowSize()


  const [chooseLayout, setChooseLayout] = useState<"table" | "grid">("table");
  const [selectChain, setSelectChain] = useState(0);
  const pageSize = 48;

  const { listTag, } = useParams<{ listTag: EHomeListTag }>();

  const { data, loadData, setFilterStatus, isLoading, total, filterStatus, evn, setEvn } = useListCollection({
    listTag,
    pageSize,
    chainId: selectChain,
    environment: 1,
  });

  const { pages, pagesCount, currentPage, setCurrentPage } = usePagination({
    total,
    limits: {
      outer: 2,
      inner: 2,
    },
    initialState: {
      pageSize,
      isDisabled: false,
      currentPage: 1,
    },
  })

  useEffect(() => {
    if (width > 500) {
      setChooseLayout("grid")
    } else {
      setChooseLayout("table")
    }
  }, [width])

  const handlePageChange = useCallback(
    (nextPage: number): void => {
      // -> request new data using the page number
      setEvn(evn);
      setCurrentPage(nextPage)
      console.log('request new data with ->', nextPage)
      loadData(nextPage);
    },
    [evn, setCurrentPage, setEvn],
  )

  const renderTitle = useCallback(() => {
    if (!listTag) {
      return null;
    }
    if (listTag === EHomeListTag.Popular) {
      return (
        <HStack
          p="10px 8px"
          borderRadius={{ base: "16px", md: "8px" }}
          bg="transparent"
        >
          <Image
            w="20px"
            h="20px"
            src={PopularImg}
          />
          <Text
            fontSize={{ base: "24px", md: "30px" }}
            lineHeight={{ base: "21px", md: "28px" }}
            color="black.light"
            fontWeight="600"
          >
            Popular
          </Text>
        </HStack>
      )
    }
    if (listTag === EHomeListTag.OnSale) {
      return (
        <HStack
          p="10px 8px"
          borderRadius={{ base: "16px", md: "8px" }}
          bg="transparent"
        >
          <span style={{ fontSize: "16px", }}>🔥</span>

          <Text
            fontSize={{ base: "24px", md: "30px" }}
            lineHeight={{ base: "21px", md: "28px" }}
            color="black.light"
            fontWeight="600"
          >
            OnSale
          </Text>
        </HStack>
      )
    }
    return (
      <HStack
        p="10px 8px"
        borderRadius={{ base: "16px", md: "8px" }}
        bg="transparent"
      >
        <Image
          w="20px"
          h="20px"
          src={RocketImg}
        />
        <Text
          fontSize={{ base: "24px", md: "30px" }}
          lineHeight={{ base: "21px", md: "28px" }}
          color="black.light"
          fontWeight="600"
        >
          Free Mint
        </Text>
      </HStack>
    )
  }, [listTag])

  const customComponents = {
    Option: ({ children, ...props }) => (
      //@ts-ignore
      <chakraComponents.Option {...props}>
        {props.data.icon &&
          <Image src={props.data.icon} h={5} w={5} />
        }
        {children}
      </chakraComponents.Option>
    ),
    SingleValue: ({ children, ...props }) => (
      //@ts-ignore
      <chakraComponents.SingleValue {...props}>
        <HStack spacing={0}>
          {props.data.icon &&
            <Image src={props.data.icon} h={5} w={5} />
          }
          {children}
        </HStack>
      </chakraComponents.SingleValue>
    ),

  };

  return (
    <MainLayout>

      <WrapperHeaderMobile />

      <Suspense fallback={<div>Loading...</div>}>

        <Box
          mr={{
            base: '10px',
            xl: '41px',
          }}
          ml={{
            base: '10px',
            xl: '47px',
          }}
          mt={{
            base: '14px',
            lg: '40px',
          }}
          mb={{
            base: '10px',
            lg: '40px',
          }}
        >

          <VStack
            w='full'
            pt={{ base: "70px", lg: "0px" }}
          >

            <VStack
              w='full'
              alignItems={{ base: "start", }}
              alignSelf={"center"}
            >
              {renderTitle()}
            </VStack>

            <VStack
              w='full'
            >
              <Grid
                w="full"
                gap={2}
                templateColumns="repeat(12, 1fr)"
              >

                <GridItem
                  w='full'
                  colSpan={{ base: 12, lg: 4 }}
                >
                  <VStack
                    w="full"
                    alignItems={{ base: "center", lg: "start" }}
                  >
                    <Box
                      w={{ base: "180px", md: "180px" }}
                    >
                      <Select
                        isSearchable={false}
                        onChange={e => {
                          setFilterStatus(e.value as EListNftFilterStatus)
                        }}
                        value={FILTER.find(i => i.value === filterStatus)}
                        options={FILTER}
                        components={customComponents}
                        focusBorderColor={`#000`}
                        className="chakra-react-select"
                        classNamePrefix="chakra-react-select"
                      />
                    </Box>
                  </VStack>
                </GridItem>

                <GridItem
                  w='full'
                  colSpan={{ base: 12, lg: 8 }}
                >
                  <VStack
                    w="full"
                    alignItems={{ base: "center", lg: "end" }}
                  >
                    <ChooseLayoutCard
                      evn={evn}
                      setEvn={(value) => {
                        setCurrentPage(1);
                        setEvn(value)
                      }}
                      onChangeLayout={(value) => setChooseLayout(value)}
                      chooseLayout={chooseLayout}
                      selectChain={selectChain}
                      setSelectChain={(value) => setSelectChain(value)}
                    />
                  </VStack>
                </GridItem>
              </Grid>

            </VStack>


            {width <= 1000 &&
              <Divider pt="20px" borderBottomColor={"#ccc"} borderBottomStyle={"dashed"} />
            }

            <ScreensCollectionDetailLazy
              isLoading={isLoading}
              chooseLayout={chooseLayout}
              listData={data}
              listTag={listTag}
            />

          </VStack>
        </Box>

        {!isLoading &&
          <PaginationComponent
            pagesCount={pagesCount}
            currentPage={currentPage}
            isDisabled={isLoading}
            onPageChange={handlePageChange}
            pages={pages}
          />
        }

      </Suspense>

      <Box h="20vh" />

    </MainLayout>
  )
}
export default CollectionDetail;
