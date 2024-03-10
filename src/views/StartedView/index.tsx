

import React, { FC, useCallback, useEffect, useState } from 'react'
import MainLayout from "~/layouts/MainLayout";
import WrapperHeaderMobile from "../../layouts/MasterLayout/WrapperHeaderMobile";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  HStack,
  SimpleGrid,
  VStack,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MAIN_ROUTERS, MANAGER_ROUTERS } from "~/routes/routes";
import { EHomeListTag } from '~/dto/nft-collection.dto';
import { useListCollection } from '../FreeMintView/hooks/useListCollection';
import CollectionTrendCard from '../FreeMintView/CollectionTrend/CollectionTrendCard';
import RocketImg from '~/assets/rocket.svg'
import useWindowSize from '~/hooks/useWindowSize';
import { ChooseLayoutCard, } from '~/components/ChooseLayoutCard';
import { CardItemPrimary } from '~/components/CardItemPrimary';
import { WellcomeModal } from './WellcomeModal';

const TitleHeader = ({ children }) => {
  return (
    <Text
      mx="3px"
      fontSize={{ base: "30px", md: "36px" }}
      color="black.light"
      fontWeight="600"
    >
      {children}
    </Text>
  )
}

const TitleViewAll = (props: { title: string, openLink: () => void }) => {
  return (
    <Text
      mx="3px"
      fontSize={{ base: "16px", }}
      color="black.light"
      fontWeight="600"
      cursor={"pointer"}
      _hover={{
        textDecoration: "underline"
      }}
      onClick={props.openLink}
    >
      {props.title}
    </Text>
  )
}
type IStartedViewProps = {
}

const StartedView: FC<IStartedViewProps> = (props: IStartedViewProps) => {
  const navigate = useNavigate();

  const { width } = useWindowSize();
  const [chooseLayout, setChooseLayout] = useState<"table" | "grid">("table");
  const [openModal, setOpenModal] = useState(true);

  // const { data: listFreeMint, isLoading } = useListCollection({
  //   pageSize: 24,
  //   listTag: EHomeListTag.FreeMint,
  // });

  useEffect(() => {
    if (width > 500) {
      setChooseLayout("grid")
    } else {
      setChooseLayout("table")
    }
  }, [width])


  // const renderBody = useCallback(() => {
  //   if (!listFreeMint.length) {
  //     return (
  //       <VStack
  //         pt={{ base: "70px", }}
  //       >
  //         <Text
  //           fontSize={{ base: "16px", md: "20px" }}
  //           lineHeight={{ base: "21px", md: "28px" }}
  //           color="black.light"
  //           fontWeight="600"
  //         >
  //           Data Empty!
  //         </Text>
  //       </VStack>
  //     )
  //   }
  //   if (chooseLayout === "grid") {
  //     return (
  //       <SimpleGrid
  //         pt={{ base: "30px", md: "15px" }}
  //         w={"full"}
  //         spacing={{ base: 6, md: 2 }}
  //         columns={{ base: 1, '3lg': 2, '2xl': 3 }}
  //       >
  //         {listFreeMint.map((item) => {
  //           return (
  //             <Box w="full" key={item.address}>
  //               <CollectionTrendCard {...item} layout="grid" />
  //             </Box>
  //           )
  //         })}
  //       </SimpleGrid>
  //     )
  //   }
  //   return (
  //     <SimpleGrid
  //       pt={{ base: "30px", md: "15px" }}
  //       w={"full"}
  //       spacing={{ base: 6, md: 2 }}
  //       columns={{ base: 1, md: 2, lg: 3, xl: 4, '3xl': 6 }}
  //     >
  //       {listFreeMint.map((item) => {
  //         return (
  //           <Box w="full" key={item.address}>
  //             <CollectionTrendCard {...item} layout="table" />
  //           </Box>
  //         )
  //       })}
  //     </SimpleGrid>
  //   )
  // }, [chooseLayout, listFreeMint])

  // const renderFreeMint = useCallback(() => {
  //   return (
  //     <VStack
  //       w="full"
  //     >

  //       <HStack
  //         w="full"
  //         justifyContent={"space-between"}
  //       >

  //         <HStack
  //           w="full"
  //         >
  //           <Image
  //             w={{ base: "20px", md: "32px" }}
  //             h={{ base: "20px", md: "32px" }}
  //             src={RocketImg}
  //           />
  //           <TitleHeader>
  //             Free Mint
  //           </TitleHeader>
  //         </HStack>

  //         <HStack
  //           w="full"
  //           justifyContent={"end"}
  //           alignSelf={"center"}
  //         >

  //           <ChooseLayoutCard
  //             onChangeLayout={(value) => setChooseLayout(value)}
  //             chooseLayout={chooseLayout}
  //           />

  //           <TitleViewAll
  //             title="View All"
  //             openLink={() => {
  //               navigate(MAIN_ROUTERS.NFT_COLLECTION)
  //             }}
  //           />

  //         </HStack>

  //       </HStack>

  //       <CardItemPrimary
  //         isLoading={isLoading}
  //         chooseLayout={chooseLayout}
  //         dataCollections={listFreeMint.filter(i =>
  //           i.id !== "7282da60-c541-4091-a9f2-3d2bd067bc6f" && i.id !== "0x4397dfdd7d211982efffc572701c2af21e9c35f4")}
  //       />

  //     </VStack>
  //   )
  // }, [chooseLayout, isLoading, listFreeMint, navigate])

  return (
    <MainLayout>

      <WrapperHeaderMobile />

      <Box
        pl={{
          base: '10px',
          md: '35px',
          xl: '50px',
        }}
        pr={{
          base: '10px',
          md: '26px',
        }}
        mt="26px"
        overflow="hidden"
        mb="15px"
      >

        <Container maxW={'3xl'}>
          <Stack
            as={Box}
            textAlign={'center'}
            spacing={{ base: 4, md: 6 }}
            py={{ base: 20, md: 5 }}
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
            <Stack
              direction={'row'}
              spacing={3}
              align={'center'}
              alignSelf={'center'}
              position={'relative'}>

              <Button
                colorScheme={'green'}
                rounded={'full'}
                px={6}
                bg="yellow.primary !important"
                color="#fff"
                w="full"
                onClick={() => {
                  navigate(MAIN_ROUTERS.NFT_COLLECTION)
                }}
              >
                View Collections
              </Button>

              <Button
                colorScheme={'green'}
                rounded={'full'}
                px={6}
                bg="yellow.primary !important"
                color="black.1d"
                w="full"
                onClick={() => {
                  navigate(MANAGER_ROUTERS.MANAGER)
                }}
              >
                Create Collection
              </Button>

              <Box>

              </Box>
            </Stack>
          </Stack>
        </Container>

        {/* {renderFreeMint()} */}

        <Box h="10vh" />
      </Box>

      <WellcomeModal
        isOpen={openModal}
        tweetId='1721478104315785618'
        onClose={() => { setOpenModal(false) }}
      />

    </MainLayout>
  )
}
export default StartedView;
