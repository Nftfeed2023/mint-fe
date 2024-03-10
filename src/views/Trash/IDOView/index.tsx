import { Box, Grid, GridItem, HStack, SimpleGrid, Text, VStack, Icon, Image, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Divider, Center } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import MainLayout from "~/layouts/MainLayout"
import WrapperHeaderMobile from "../../../layouts/MasterLayout/WrapperHeaderMobile"
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import useWindowSize from '~/hooks/useWindowSize';
import { useConnectWallet } from '~/hooks/@global/useConnectWallet';
import { AiFillRocket } from 'react-icons/ai';

import CountDownTime from '../../FreeMintView/NftCollectionDetail/CountDownTime';
import { InfoHeader } from './InfoHeader';
import { AboutIdo } from './AboutIdo';
import { VestingView } from './VestingView';
import { InfoIdo } from './InfoIdo';
import { DepositButton } from './DepositButton';

export const IDOView = () => {

  const navigate = useNavigate();
  const videoRef = useRef(null);
  const { width } = useWindowSize();
  const { account } = useConnectWallet();
  const { chainId: chainIdActive } = useConnectWallet();

  const renderCountdown = useCallback(() => {
    return (
      <Center>
        {new Date(1725814800 * 1000).getTime() >= new Date().getTime() && <CountDownTime
          title="FCFS ENDS IN"
          endTime={new Date(1725814800 * 1000)}
          fontSize="20px"
          color="red"
        />}
      </Center>
    )
  }, [])

  const renderSlider = useCallback(() => {
    return (
      <Slider
        aria-label='slider-ex-1'
        value={1}
        min={0} max={100}
      >
        <SliderTrack bg='red.100'>
          <SliderFilledTrack bg='tomato' />
        </SliderTrack>
        <SliderThumb boxSize={4} >
          <Box color='tomato' as={AiFillRocket} />
        </SliderThumb>
      </Slider>
    )
  }, [])

  const renderTotalDeposit = useCallback(() => {
    return (
      <HStack
        pt={{ base: "15px", md: "0px" }}
        w="full"
        justifyContent={"start"}
        fontSize={"14px"}
        order={{ base: 2, md: 1 }}
      >
        <Text
          letterSpacing="-0.5px"
        >
          {"Total Deposit"}
        </Text>
        <Text
          color="black.5d"
          letterSpacing="-0.5px"
        >
          (500,000/500,000) USDT
        </Text>
      </HStack>
    )
  }, [])

  return (
    <MainLayout>

      <WrapperHeaderMobile />

      <Box
        mr={{
          base: '5px',
          xl: '41px',
        }}
        ml={{
          base: '5px',
          xl: '47px',
        }}
        mt={{
          base: '90px',
          lg: '40px',
        }}
        mb={{
          base: '120px',
          lg: '40px',
        }}
      >

        <VStack
          w='full'
          spacing={6}
        >


          <VStack
            w="full"
            bg="#FFFFFF"
            borderRadius="24px"
            boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
            p={{
              base: '20px 10px',
              lg: '12px 32px',
            }}
            spacing={4}
          >

            <InfoHeader />

            <Divider borderBottomColor={"#ccc"} borderBottomStyle={"dashed"} />

            <VStack
              w="full"
              pt="20px"
            >
              <VStack
                w='full'
                spacing={4}
                maxWidth={{ base: "full", md: "80%", lg: "60%" }}
              >

                {renderCountdown()}

                <SimpleGrid
                  w="full"
                  columns={{ base: 1, md: 2 }}
                >

                  {renderTotalDeposit()}

                  <DepositButton />

                </SimpleGrid>

                {renderSlider()}

              </VStack>
            </VStack>

            <InfoIdo />

          </VStack>

          <VestingView />

          <AboutIdo />

        </VStack>

      </Box>


    </MainLayout>
  )
}
