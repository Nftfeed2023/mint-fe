import { Box, SimpleGrid, Text, VStack, Image, } from '@chakra-ui/react';
import MainLayout from "~/layouts/MainLayout"
import WrapperHeaderMobile from "../../layouts/MasterLayout/WrapperHeaderMobile"
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTERS } from '~/routes/routes';
import { TextHorizon } from '~/@ui/TextHorizon';
import { DATA_STAKING } from './data-staking';
import useWindowSize from '~/hooks/useWindowSize';
import { TagBlue, TagRed } from '../FreeMintView/CollectionTrend/Tags';
import BoxLayout from '~/components/BoxLayout';

export const StakingNftView = () => {

  const videoRef = useRef(null);
  const { width } = useWindowSize();
  const navigate = useNavigate();

  return (
    <MainLayout>

      <WrapperHeaderMobile />

      <BoxLayout>

        <SimpleGrid
          w={"full"}
          spacing={{ base: 1, md: 2 }}
          columns={{ base: 2, md: 2, lg: 3, xl: 4, '3xl': 6 }}
        >
          {DATA_STAKING.map((item, idx) => {
            return (
              <VStack
                key={idx}
                w="full"
                bg="#FFFFFF"
                cursor={{ base: "none", lg: "pointer" }}
                alignItems={"start"}
                borderRadius={{ base: "8px", md: "24px" }}
                p={{ base: '0', lg: '1px', }}
                spacing={2}
                onClick={() => {
                  navigate(`${MAIN_ROUTERS.STAKE_NFTS}/${item.key}`)
                }}
                position={"relative"}
              >

                {item.image.includes(".mp4") ?
                  <Box
                    h={{ base: "195px", lg: "260px" }}
                    w="100%"
                  >
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
                      src={item.image}
                    >
                    </video>
                  </Box>
                  :
                  <Image
                    src={item.image}
                    h={{ base: "195px", lg: "260px" }}
                    w="100%"
                    borderRadius={{ base: "8px 8px 0px 0px", md: "24px" }}
                    p={{ base: "3px", md: "0px" }}
                  // objectFit={"cover"}
                  />
                }

                <Box
                  position={"absolute"}
                  top={3}
                  left={3}
                >
                  {item.key === "sharkie-nft" || item.key === "basepunk-nft" ?
                    <TagRed value='Ended' />
                    :
                    <TagBlue value='Live' />
                  }
                </Box>

                <VStack
                  w="full"
                  p="10px 10px 20px 10px"
                  alignItems={"start"}
                >

                  <Text
                    fontWeight="700"
                    fontSize={{ base: "16px", md: "18px" }}
                    lineHeight={{ base: "20px", md: "28px" }}
                    textAlign={{ md: "left" }}
                    className="textPrimary"
                    h={{ base: "60px", md: "60px" }}
                  >
                    {item.title.length > 40 ? item.title.slice(0, 40).concat("...") : item.title}
                  </Text>

                  <TextHorizon
                    title='Chain'
                    value={item.chain}
                    icon={item.icChain}
                  />

                  <TextHorizon
                    title='Reward'
                    value={item.reward}
                  />

                </VStack>

              </VStack>
            )
          })}
        </SimpleGrid>

      </BoxLayout>

      <Box h="20vh" />

    </MainLayout>
  )
}
