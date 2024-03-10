import { VStack, Center, HStack, layout, Box, Image, Text, Grid, GridItem, Button } from "@chakra-ui/react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { CHAIN_CODE } from "~/@config/chain-code"
import useWindowSize from "~/hooks/useWindowSize"
import { ButtonMints } from "~/views/FreeMintView/CollectionTrend/ButtonMints"
import { TagBlue, TagRed } from "~/views/Manager/Tags"
import GlobalIcon from "../Icons/Global"
import TwitterIcon from "../Icons/Twitter"
import DiscordICon from '~/components/Icons/Discord'
import { NftCollection } from "~/dto/nft-project.dto"
import IconETH from "~/assets/images/eth.png"
import NoImg from "~/assets/images/no_img.png"
import IcVerifyTw from "~/assets/icons/ic_verify_tw.svg"
import { EVM_CHAIN_LIST } from "~/@config/chain-list"
import { IoPlayCircleOutline, IoPauseCircleOutline } from "react-icons/io5";

export interface ITableProps extends NftCollection {
  layout?: 'grid' | 'table'
  isPopolar?: boolean
  handleClick: () => void,
  isHardCode: boolean
  isEnded: boolean
  logo: any
}

export const CardItemGrid = (props: ITableProps) => {
  const videoRef = useRef(null);
  const { width } = useWindowSize();
  const {
    address, image, chainId, qtyMinted,
    isEnded,
    twitter = "", website = "", discord = "", price,
    layout, isPopolar = false,
    isHardCode,
    handleClick,
    logo,
  } = props;

  useEffect(() => {
    videoRef?.current?.load()
  }, [])

  const renderSocsialIcon = useCallback(() => {
    if (width <= 500) {
      return null;
    }
    return (
      <HStack
        mt={layout === "grid" ? "0px" : "12px"}
        cursor={{ base: "none", lg: "pointer" }}
        mb={"4px"}
      >
        {website && <GlobalIcon onClick={() => window.open(website)} />}
        {twitter && <TwitterIcon onClick={() => window.open(twitter)} />}
        {discord && <DiscordICon onClick={() => window.open(discord)} />}

      </HStack >
    )
  }, [discord, layout, twitter, website, width])

  const icPrice = useMemo(() => {
    if (
      chainId === CHAIN_CODE.BSC_MAINNET || chainId === CHAIN_CODE.BSC_TESTNET
      || chainId === CHAIN_CODE.OPBNB
      || chainId === CHAIN_CODE.ZETACHAIN_TESTNET || chainId === CHAIN_CODE.ZETACHAIN_MAINNET
    ) {
      return EVM_CHAIN_LIST[chainId].logo;
    }
    return IconETH;
  }, [chainId,])

  const renderImage = useCallback(() => {

    return (
      <VStack
        alignItems={"start"}
        h="64px"
        w="100px"
      >

        {image.includes(".mp4") ?
          <Box
            w="100%"
            height="inherit"
            position={"relative"}
          >

            <Box
              w="100%"
              height="inherit"
            >
              <video
                ref={videoRef}
                //@ts-ignore
                playsInline="playsInline"
                //@ts-ignore
                muted="muted"
                style={{
                  borderRadius: "8px",
                  width: "100%",
                  height: "inherit",
                  objectFit: "cover"
                }}
                controls={false}
              >
                <source src={image} type="video/mp4" />
              </video>
            </Box>

            <Box
              bg="#fff"
              borderRadius={"8px"}
              bottom={1}
              left={1}
              position={"absolute"}
              cursor={{ lg: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                videoRef.current.play();
              }}
            >
              <IoPlayCircleOutline size={"16px"} />
            </Box>
          </Box>
          :
          <Image
            src={image}
            h="inherit"
            w="full"
            borderRadius={"8px"}
            objectFit={"cover"}
            loading="lazy"
            fallbackSrc={NoImg}
          />
        }

      </VStack>
    )
  }, [image])

  return (
    <Grid
      w="full"
      bg="#FFFFFF"
      borderRadius="4px"
      p={{ base: '0', lg: '1px 10px  1px', }}
      gap={2}
      templateColumns="repeat(12, 1fr)"
    >

      <GridItem
        w='full'
        colSpan={{ md: 6 }}
        alignSelf={"center"}
        cursor={"pointer"}
        onClick={handleClick}
      >

        <HStack
          w="full"
          spacing={2}
        >

          {renderImage()}

          <VStack
            w="full"
            spacing={2}
            alignItems={"start"}
          >

            <HStack alignItems={"center"}>
              <Text
                fontWeight="600"
                fontSize={{ base: "16px" }}
                lineHeight="24px"
                textAlign="left"
                color="black"
                _hover={{
                  textDecorationLine: "underline"
                }}
                noOfLines={1}
              >
                {props.name && props.name.length > 40 ? props.name.slice(0, 40).concat("...") : props.name}
              </Text>

              {props.isVerifyTwitter &&
                <Image src={IcVerifyTw} w="15px" h="15px" />
              }
            </HStack>

            {price &&
              <HStack
                mt="0px !important"
                w="full"
              >

                <Text
                  fontSize="13px"
                  fontWeight="500"
                >
                  Price:
                </Text>

                <HStack spacing={"3px"}>
                  <Text
                    fontSize="16px"
                    color="black.light"
                    fontWeight="600"
                  >
                    {price}
                  </Text>
                  <Image
                    src={icPrice}
                    w="20px"
                    h="20px"
                    bg="#FFFBEA"
                    p="1px"
                    borderRadius={"10px"}
                    border="1px solid #FFFBEA"
                  />
                </HStack>

              </HStack>
            }

            {isPopolar && !price &&
              <HStack
                mt="0px !important"
                w="full"
              >

                <Text
                  fontSize={{ base: "13px", }}
                  fontWeight="500"
                >
                  Price:
                </Text>

                <Text
                  fontSize={{ base: "13px", }}
                  color="black.light"
                  fontWeight="600"
                >
                  Free
                </Text>

              </HStack>
            }

          </VStack>

        </HStack>

      </GridItem>

      <GridItem
        w='full'
        colSpan={{ md: 4, }}
        alignSelf={"center"}
      >

        <VStack>
          {renderSocsialIcon()}

          <HStack mt={"0px !important"}>

            {isHardCode ?
              <>
                <TagBlue value={"Live"} />
                <Image
                  src={"https://dd.dexscreener.com/ds-data/chains/arbitrum.png"}
                  w="25px"
                  h="25px"
                  bg="#FFFBEA"
                  p="1px"
                  borderRadius={"10px"}
                  border="1px solid #FFFBEA"
                />
              </>
              :
              <>
                {isEnded ?
                  <TagRed value={"Ended"} />
                  :
                  <TagBlue value={"Live"} />
                }
                <Image
                  src={logo}
                  w="25px"
                  h="25px"
                  bg="#FFFBEA"
                  p="1px"
                  borderRadius={"10px"}
                  border="1px solid #FFFBEA"
                />
              </>
            }

          </HStack>
        </VStack>

      </GridItem>

      <GridItem
        w='full'
        colSpan={{ md: 2, }}
        alignSelf={"center"}
      >
        <VStack
          w="full"
          alignItems={"end"}
        >

          <ButtonMints
            address={address}
            qtyMinted={qtyMinted}
            layout={layout}
            chainId={chainId}
          />

        </VStack>
      </GridItem>

    </Grid>
  )

}
