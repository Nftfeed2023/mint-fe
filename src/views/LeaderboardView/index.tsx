import { Box, GridItem, Tooltip, Text, Grid, VStack, Input, HStack, Icon, Image, Divider } from '@chakra-ui/react';
import MainLayout from "~/layouts/MainLayout"
import WrapperHeaderMobile from "../../layouts/MasterLayout/WrapperHeaderMobile"
import { Fragment, useCallback, useEffect, useState } from 'react';

import { ReactComponent as ArrowDown } from '~/assets/svgs/arrow-down.svg'
import ImgElite from "~/assets/leaderboard/elite.png"
import ImgLuminary from "~/assets/leaderboard/luminary.png"
import ImgProdigy from "~/assets/leaderboard/prodigy.png"
import ImgTitan from "~/assets/leaderboard/titan.png"
import Img1 from "~/assets/leaderboard/img1.png"

import { ValueGrid } from './ValueGrid';
import { useLeaderboard } from "./useLeaderboard";
import { Leaderboard } from "~/dto/point.dto";
import useWindowSize from '~/hooks/useWindowSize';
import { useConnectWallet } from '~/hooks/@global/useConnectWallet';
import PrimaryButton from '~/components/PrimaryButton';
import BoxLayout from '~/components/BoxLayout';

export const TitleCustom = (props: { t: string }) => {
  return (
    <Tooltip label={props.t}>
      <Text
        fontWeight={"500"}
        color="black.light"
        fontSize={{ base: "16px" }}
        lineHeight={{ base: "24px" }}
        noOfLines={1}
        textAlign={"start"}
      >
        {props.t}
      </Text>
    </Tooltip>
  )
}

interface ILeaderBoard {
  no: string,
  sharkPoint: number,
  address: string,
  rank: string,
  tier: string,
}

export const LeaderboardView = () => {

  const { width } = useWindowSize();

  const { account } = useConnectWallet();
  const { data, total, isLoading, keySearch, setKeySearch, yourRank, registerWl, isRegisted } = useLeaderboard();
  const [isSchema, setIsSchema] = useState(true);

  useEffect(() => {
    if (account) {
      registerWl(true)
    }
  }, [account])

  const renderContent = (idx: number, item: Leaderboard) => {

    const getTier = (point: number) => {
      if (point < 300) {
        return {
          imgTier: ImgLuminary,
          tier: "Shark Luminary"
        }
      }
      if (point < 1050) {
        return {
          imgTier: ImgProdigy,
          tier: "Shark Prodigy"
        }
      }
      if (point < 4989) {
        return {
          imgTier: ImgElite,
          tier: "Shark Elite"
        }
      }
      if (point >= 4989) {
        return {
          imgTier: ImgTitan,
          tier: "Shark Titan"
        }
      }
      return {
        imgTier: "",
        tier: ""
      }
    }

    const { tier, imgTier } = getTier(item?.point);

    return (
      <Grid
        key={idx}
        w="full"
        mt={{ md: "10px" }}
        padding="1px 15px"
        templateColumns='repeat(13, 1fr)'
        gap={{ base: 0, lg: 2 }}
        bg="white"
        borderRadius="8px"
        border={{ base: "1px solid #ffd3cb", md: "none" }}
        boxShadow={{ base: "0px 0px 14px rgba(186, 186, 186, 0.25)", md: "none" }}
        _hover={{
          borderBottom: "1px solid #ffd3cb",
          boxShadow: "0px 0px 14px rgba(186, 186, 186, 0.25)"
        }}
      >

        {/* <GridItem colSpan={{ base: 13, md: 1 }}  >
          <ValueGrid
            t="No:"
            value={item?.rank || '-'}
          />
        </GridItem> */}

        <GridItem colSpan={{ base: 13, md: 4 }}  >
          <ValueGrid
            t="Tier:"
            value={tier}
            image={imgTier}
            isHighlight={true}
          />
          {/* <ValueGrid
            t="Tier:"
            value={"Coming Soon"}
          /> */}
        </GridItem>

        <GridItem colSpan={{ base: 13, md: 6 }}  >
          <ValueGrid
            t="Address:"
            value={item?.evmAddress}
            // isCopy={true}
            isShortText={true}
          />
        </GridItem>

        <GridItem colSpan={{ base: 13, md: 3 }}  >
          <ValueGrid
            t="Shark Point:"
            value={item?.point}
          />
        </GridItem>

      </Grid>
    )
  }

  const renderSchema = useCallback(() => {

    return (
      <VStack
        w="full"
        alignItems={"start"}
        spacing={2}
      >

        <HStack
          w="full"
          justifyContent={width <= 1100 ? "space-between" : "center"}
        >
          <Text
            fontSize={{ base: "20px", md: "32px" }}
            color="black.light"
            fontWeight="600"
            textTransform={"capitalize"}
            textAlign={"start"}
          >
            Shark Point Reward Scheme
          </Text>
          {width <= 1100 &&
            <Icon
              as={ArrowDown}
              w="28px"
              h="28px"
              onClick={() => {
                setIsSchema(!isSchema)
              }}
            />
          }
        </HStack>

        {isSchema &&
          <>

            <PrimaryButton
              isLoading={isLoading}
              // disabled={isLoading || !account || isRegisted}
              disabled={true}
              onClick={() => registerWl(false)}
            >
              {isRegisted ? "Registration Successful" : "Verification ended"}
            </PrimaryButton>

            <Text
              fontSize={{ base: "14px", md: "16px", }}
              lineHeight={"24px"}
              color={'gray.900'}
              textTransform={"capitalize"}
            >
              Click this button to confirm your registration and verify your eligibility for the airdrop.
              <br />
              This mechanism is designed to filter out wallet spammers and inactive users, ensuring that the airdrop rewards are allocated to genuine contributors who have achieved a position on the leaderboard.
            </Text>

            <Text
              fontSize={{ base: "12px", }}
              lineHeight={"18px"}
              color="#ee3824"
              textTransform={"capitalize"}
            >
              NOTE: Only users who are on the leaderboard will have the option to click the registration button.
            </Text>

            <Divider borderBottomColor={"#ccc"} borderBottomStyle={"dashed"} my="20px !important" />

            <Image src={Img1} />

            <Text
              fontSize={{ base: "16px", md: "18px" }}
              color="black.light"
              fontWeight="600"
              textTransform={"capitalize"}
            >
              {/* 1,000,000 $SHARKIE will be shared for: */}
              SHARK Point Tier Mechanism:
            </Text>

            <Text
              fontSize={{ base: "14px", md: "16px", }}
              lineHeight={"32px"}
              color={'gray.900'}
              textTransform={"capitalize"}
            >
              {`- Points from 4,989 and above: "Shark Titan"`}
              <br />
              {`- Points from 1,050 to under 4,989: "Shark Elite"`}
              <br />
              {`- Points from 300 to under 1,050: "Shark Prodigy"`}
              <br />
              {`- Points under 300: "Shark Luminary"`}
            </Text>

            {/* <Text
              fontSize={{ base: "14px", md: "16px", }}
              lineHeight={"32px"}
              color={'gray.500'}
              textTransform={"capitalize"}
            >
              {`- Rank 1 -> Rank 3,028: Shark Titan`}
              <br />
              {`- Rank 3,029 -> Rank 9,247: Shark Elite`}
              <br />
              {`- Rank  9,248 -> Rank 24,012: Shark Prodigy`}
              <br />
              {`- Rank 24,013 -> Rank 30,260: Shark Luminary`}
            </Text> */}

            {/* <Text
              fontSize={{ base: "14px", md: "16px", }}
              lineHeight={"32px"}
              color={'gray.500'}
              textTransform={"capitalize"}
            >
              {`-Shark Titan : 132 $SHARKIE`}
              <br />
              {`-Shark Elite : 50 $SHARKIE`}
              <br />
              {`-Shark Prodigy : 22 $SHARKIE`}
              <br />
              {`-Shark Luminary : 8 $SHARKIE`}
              <br />
            </Text> */}

            <Text
              fontSize={{ base: "12px", }}
              lineHeight={"18px"}
              color="#ee3824"
              textTransform={"capitalize"}
            >
              *NFTFeed will need to confirm the total number of holders in order to determine the Reward Sharing for eligible winners.
            </Text>
          </>

        }

      </VStack>
    )
  }, [account, isLoading, isRegisted, isSchema, registerWl, width])

  const renderLeaderBoard = useCallback(() => {

    return (
      <VStack
        w="full"
        alignItems={"start"}
        spacing={2}
      >

        <HStack
          w="full"
          justifyContent={"space-between"}
          alignItems={"center"}
          wrap={"wrap"}
        >

          <Text
            fontSize={{ base: "20px", md: "32px" }}
            color="black.light"
            fontWeight="600"
          >
            Leaderboard
          </Text>

          <Text
            fontSize={{ base: "18px", md: "20px" }}
            color="black.light"
            fontWeight="600"
          >
            Total Shark Point Holders:
            <span className='textPrimary' style={{ fontSize: "24px" }}>
              {/* {` ${total}`} */}
              9300
            </span>
          </Text>
        </HStack>

        {yourRank ?
          <Box
            w="full"
            p={{ base: '10px', lg: '15px 20px', }}
            bg="white"
            borderRadius="8px"
            border={{ md: "1px solid #ffd3cb" }}
            boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
          >

            <Text
              fontWeight={"500"}
              color="black.light"
              fontSize={{ base: "13px", md: "16px" }}
              lineHeight={{ base: "24px" }}
              opacity={"0.8"}
              noOfLines={1}
            >
              Your Tier:
            </Text>

            {renderContent(parseInt(account), yourRank)}

          </Box>
          : null
        }

        <Text
          color={'#ee3824'}
          fontWeight={"500"}
          fontSize={{ base: "14px", md: "16px", }}
        >
          As there are numerous users, NFTFeed will only showcase the tier of the first 10 Shark Point holders.
        </Text>

        {/* <Input
          color="black.light"
          borderColor="black.light !important"
          borderWidth="1px"
          borderStyle="solid"
          placeholder="Search address"
          borderRadius="10px"
          fontSize="16px"
          lineHeight="20px"
          h="40px"
          w={{ base: "100%", md: "80%" }}
          bg="#F7F9FA"
          mb="20px"
          value={keySearch}
          onChange={(e) => { setKeySearch(e.target.value || "") }}
        /> */}

        <Box
          mt="20px !important"
          w="full"
          p={{ base: '10px', lg: '15px 20px', }}
          bg="white"
          borderRadius="8px"
          // border={{ md: "1px solid #ffd3cb" }}
          boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
        >

          <Grid
            w="full"
            templateColumns='repeat(13, 1fr)'
            gap={6}
            pt={{ md: "12px" }}
            pb={{ md: "20px" }}
            display={{ base: "none", md: "grid" }}
            borderBottom="1px solid #ffd3cb"
          >

            {/* <GridItem colSpan={{ base: 12, md: 1 }}  >
              <TitleCustom t="No" />
            </GridItem> */}

            <GridItem colSpan={{ base: 12, md: 4 }}  >
              <TitleCustom t="Tier" />
            </GridItem>

            <GridItem colSpan={{ base: 12, md: 5 }}  >
              <TitleCustom t="Address" />
            </GridItem>

            <GridItem colSpan={{ base: 12, md: 4 }}  >
              <TitleCustom t="Shark Point" />
            </GridItem>

          </Grid>

          <VStack
            spacing={{ base: 2, lg: 3 }}
            w="full"
          >

            {data.map((item, idx) => {
              return (
                <Fragment key={idx}>
                  {renderContent(idx, item)}
                </Fragment>
              )
            })
            }

          </VStack>

        </Box>

      </VStack>
    )
  }, [account, data, keySearch, setKeySearch, yourRank])


  return (
    <MainLayout>

      <WrapperHeaderMobile />

      <BoxLayout>

        <Grid
          w="full"
          gap={4}
          templateColumns="repeat(12, 1fr)"
        >

          <GridItem
            w='full'
            colSpan={{ base: 12, '3lg': 6, }}
            cursor={"pointer"}
            order={{ base: 2, '3lg': 1 }}
            p={{ base: '10px', lg: '15px 20px', }}
            bg="white"
            borderRadius="8px"
            border={{ md: "1px solid #ffd3cb" }}
            boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
          >

            {renderLeaderBoard()}

          </GridItem>

          <GridItem
            w='full'
            colSpan={{ base: 12, '3lg': 6, }}
            order={{ base: 1, '3lg': 2 }}
            p={{ base: '10px', lg: '15px 20px', }}
            bg="white"
            borderRadius="8px"
            border={{ md: "1px solid #ffd3cb" }}
            boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
          >

            {renderSchema()}

          </GridItem>

        </Grid>

      </BoxLayout>


    </MainLayout>
  )
}
