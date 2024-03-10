import {
  Box, Text,
  Divider, VStack, Avatar, SimpleGrid, Card, HStack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Spinner,
} from '@chakra-ui/react';
import BoxLayout from "~/components/BoxLayout"
import { useConnectWallet } from '~/hooks/@global/useConnectWallet';
import ManagerLayout from '~/layouts/ManagerLayout';
import WrapperHeaderMobile from "~/layouts/MasterLayout/WrapperHeaderMobile"
import { useListLaunch } from '../FairLauch/ListLaunchView/useListLaunch';
import { useCallback, useEffect } from 'react';
import { checkURLType } from '~/common/utils/common.utils';
import { ILauchPool } from '~/dto/ILauchPool';
import { TagCustom } from '../Manager/Tags';
import { formatMoney } from '~/utils';
import { BiRocket } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '~/components/PrimaryButton';
import { MANAGER_ROUTERS } from '~/routes/routes';

export const ManagerPresale = () => {

  const { account } = useConnectWallet();
  const navigate = useNavigate();

  const {
    isLoading,
    total,
    listLaunch,
    loadListLaunch,
  } = useListLaunch();

  useEffect(() => {
    if (account) {
      loadListLaunch(1, account);
    }
  }, [account, loadListLaunch])

  const renderStatus = useCallback((itemLaunch: ILauchPool) => {
    if (!itemLaunch.startTime || !itemLaunch.endTime) {
      return null;
    }
    return <TagCustom value={Number(itemLaunch.status)} />;
  }, []);

  const renderBody = () => {
    if (isLoading) {
      return (
        <VStack
          w="full"
          p={{ base: "20px", md: "40px" }}
        >
          <Spinner color="#ee3824" size="lg" />
          <Text
            fontWeight={"500"}
            fontSize={{ base: "14px", md: "16px" }}
            lineHeight="21px"
            color="black.light"
            letterSpacing="-0.5px"
          >
            Please wait a second ...
          </Text>
        </VStack>
      )
    }
    if (!listLaunch || !listLaunch.length) {
      return (
        <VStack
          w="full"
          p={{ base: "20px", md: "40px" }}
        >
          <Text
            fontWeight={"500"}
            fontSize={{ base: "18px", md: "20px" }}
            lineHeight="21px"
            color="black.light"
            letterSpacing="-0.5px"
          >
            You don't owner token presale in list
          </Text>

          <PrimaryButton
            w="fit-content"
            onClick={() => {
              navigate(MANAGER_ROUTERS.CREATE_PRESALE)
            }}
          >
            Create Now
          </PrimaryButton>

        </VStack>
      )
    }
    return (
      <SimpleGrid
        w="full"
        spacing={2}
        columns={{ base: 1, md: 2, lg: 3, xl: 5, }}
      >

        {listLaunch.map((itemLaunch, idx) => {
          return (
            <Card
              key={idx}
              cursor={{ lg: "pointer" }}
              onClick={() => {
                navigate(
                  `/feedipad/${itemLaunch.chainId}/${itemLaunch.presaleAddress}`
                );
              }}
            >

              <VStack p="10px">
                <Box>
                  {(checkURLType(itemLaunch.logo) === "Image" ||
                    checkURLType(itemLaunch.logo) === "Other") && (
                      <Avatar
                        p="1px"
                        width={"92px"}
                        height={"92px"}
                        border="1px solid #ccc"
                        src={itemLaunch.logo}
                      />
                    )}
                  {checkURLType(itemLaunch.logo) === "Video" && (
                    <video
                      style={{
                        maxWidth: "92px",
                        maxHeight: "92px",
                      }}
                      src={itemLaunch.logo}
                      muted
                      autoPlay
                      loop
                    />
                  )}
                </Box>

                <Text
                  fontWeight="700"
                  fontSize={{ base: "16px", md: "18px" }}
                  lineHeight={{ base: "20px", md: "28px" }}
                  className="textPrimary"
                >
                  {itemLaunch.tokenName}
                </Text>

                <Divider />

                <VStack w="full" spacing={0}>

                  <HStack w="full" justifyContent={"space-between"}>
                    <Text
                      fontWeight={"400"}
                      fontSize={{ base: "13px" }}
                      color="black.light"
                      letterSpacing="-0.5px"
                      textAlign={"start"}
                      alignSelf={"start"}
                    >
                      Progress:
                    </Text>
                    <HStack spacing={0}>
                      <Text
                        fontWeight={"400"}
                        fontSize={{ base: "13px" }}
                        color="black.light"
                        letterSpacing="-0.5px"
                      >
                        {formatMoney(itemLaunch.totalRaised.toString())}/
                      </Text>
                      <Text
                        fontWeight={"400"}
                        fontSize={{ base: "13px" }}
                        color="black.light"
                        letterSpacing="-0.5px"
                      >
                        {formatMoney(itemLaunch.softCap.toString())} {formatMoney(itemLaunch.currency.toString())}
                      </Text>
                    </HStack>
                  </HStack>

                  <Slider
                    aria-label="slider-ex-1"
                    colorScheme="blue"
                    min={0}
                    value={Number(itemLaunch.totalRaised)}
                    max={Number(itemLaunch.totalRaised) > Number(itemLaunch.softCap) ? Number(itemLaunch.totalRaised) * 2 : Number(itemLaunch.softCap)}
                  >
                    <SliderTrack bg="red.100">
                      <SliderFilledTrack bg="tomato" />
                    </SliderTrack>
                    <SliderThumb boxSize={4}>
                      <Box color="tomato" as={BiRocket} />
                    </SliderThumb>
                  </Slider>
                </VStack>

                <HStack w="full" justifyContent={"space-between"}>
                  <Text
                    fontWeight={"400"}
                    fontSize={{ base: "13px" }}
                    color="black.light"
                    letterSpacing="-0.5px"
                  >
                    Status:
                  </Text>
                  {renderStatus(itemLaunch)}
                </HStack>

                <HStack w="full" justifyContent={"space-between"}>
                  <Text
                    fontWeight={"400"}
                    fontSize={{ base: "13px" }}
                    color="black.light"
                    letterSpacing="-0.5px"
                  >
                    Softcap:
                  </Text>
                  <Text
                    fontWeight={"500"}
                    fontSize={{ base: "14px", md: "16px" }}
                    lineHeight="21px"
                    className="textPrimary"
                    letterSpacing="-0.5px"
                  >
                    {formatMoney(itemLaunch.softCap.toString())} {itemLaunch.currency}
                  </Text>
                </HStack>

                <HStack w="full" justifyContent={"space-between"}>
                  <Text
                    fontWeight={"400"}
                    fontSize={{ base: "13px" }}
                    color="black.light"
                    letterSpacing="-0.5px"
                  >
                    Liquidity %:
                  </Text>
                  <Text
                    fontWeight={"500"}
                    fontSize={{ base: "14px", md: "16px" }}
                    lineHeight="21px"
                    color="black.light"
                    letterSpacing="-0.5px"
                  >
                    {itemLaunch.liquidity}%
                  </Text>
                </HStack>

              </VStack>
            </Card>
          )
        })
        }

      </SimpleGrid>
    )
  }

  return (
    <ManagerLayout>

      <WrapperHeaderMobile />

      <BoxLayout>

        <Box
          w="full"
          p={{ base: '10px', lg: '15px 20px', }}
          bg="white"
          borderRadius="8px"
          border={{ base: "1px solid #ffd3cb" }}
          boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
        >

          {renderBody()}

        </Box>

      </BoxLayout>

    </ManagerLayout>
  )
}
