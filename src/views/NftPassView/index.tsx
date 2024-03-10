import { Box, Grid, GridItem, HStack, Icon, SimpleGrid, Slider, SliderFilledTrack, SliderThumb, SliderTrack, VStack, Image, Text } from '@chakra-ui/react';
import MainLayout from "~/layouts/MainLayout"
import WrapperHeaderMobile from "../../layouts/MasterLayout/WrapperHeaderMobile"
import { Fragment, useRef, useState } from 'react';
import { MdGraphicEq } from 'react-icons/md';
import { TextHorizon } from '~/@ui/TextHorizon';
import { formatDateBlockChain } from '~/common/block-chain.helper';
import { formatMoney, pipeAmount } from '~/utils';

import ImgStake from "~/assets/2s.gif"
import { useNavigate } from 'react-router-dom';
import useWindowSize from '~/hooks/useWindowSize';
import { ReactComponent as ArrowDown } from '~/assets/svgs/arrow-down.svg'
import PrimaryButton from '~/components/PrimaryButton';

export const NftPassView = () => {

  const videoRef = useRef(null);
  const { width } = useWindowSize();
  const navigate = useNavigate();

  const [isOpenNft, setIsOpenNft] = useState(true);

  return (
    <MainLayout>

      <WrapperHeaderMobile />

      <Box
        mr={{
          base: '10px',
        }}
        ml={{
          base: '5px',
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

        <Grid
          templateColumns="repeat(9, 1fr)"
          gap={{
            base: 4,
            lg: 4,
          }}
        >

          <GridItem
            colSpan={{
              base: 9,
              '3lg': 3,
              xxl: 3,
            }}
            p={{
              base: '10px',
              '3lg': '0',
            }}
            borderRadius="8px"
            w="full"
            h="100%"
            bg="white"
            border="1px solid #ffd3cb"
            boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
            alignSelf={"center"}
          >

            <Image
              src={ImgStake}
              style={{
                borderRadius: "8px",
                width: "100%",
                height: "inherit",
                objectFit: "cover",
                padding: "1px"
              }}
            />

            {/* <VStack
            h={{
              base: '374px',
              lg: '512px',
            }}
            maxH={{
              base: '374px',
              lg: '512px',
            }}
            w="100%"
          >
            <Image
              src={itemNft.image}
              style={{
                borderRadius: "8px",
                width: "100%",
                height: "inherit",
                objectFit: "cover",
                padding: "1px"
              }}
            />
            <video
              loop
              ref={videoRef}
              style={{
                borderRadius: "8px",
                width: "100%",
                height: "inherit",
                objectFit: "cover"
              }}
              //@ts-ignore
              autoPlay={true}
              //@ts-ignore
              playsInline="playsInline"
              //@ts-ignore
              muted="muted"
              src={VideosNft}
            >
            </video>
          </VStack> */}

          </GridItem>

          <GridItem
            colSpan={{
              base: 9,
              '3lg': 6,
              xxl: 6,
            }}
            p={{
              base: '10px',
              lg: '20px 30px',
            }}
            bg="white"
            borderRadius="8px"
            border="1px solid #ffd3cb"
            boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
          >

            <VStack
              w="full"
              pt="10px"
              spacing={4}
            >

              <Text
                fontWeight="700"
                fontSize={{ base: "24px", md: "30px" }}
                lineHeight={{ base: "32px", md: "42px" }}
                letterSpacing="-0.5px"
                alignSelf={"start"}
                className="textPrimary"
                textTransform={"uppercase"}
              >
                NFT PASS
              </Text>

              <Text
                color="grey.66"
                fontWeight="400"
                lineHeight="19px"
                letterSpacing="-0.5px"
                fontSize="16px"
                alignSelf={"start"}
              >
                <span
                  style={{ whiteSpace: "pre-line", lineHeight: "38px" }}
                  dangerouslySetInnerHTML={{
                    __html: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                      `
                  }}
                />
              </Text>

              <PrimaryButton>
                Mint NFT x1
              </PrimaryButton>

              <PrimaryButton>
                Mint NFT x10
              </PrimaryButton>

              <PrimaryButton>
                Mint NFT x20
              </PrimaryButton>

              <PrimaryButton>
                Mint NFT x30
              </PrimaryButton>


            </VStack>

          </GridItem>

        </Grid>

      </Box>


    </MainLayout >
  )
}
