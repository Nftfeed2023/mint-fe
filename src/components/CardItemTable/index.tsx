import { VStack, Center, HStack, Box, Image, Text } from "@chakra-ui/react"
import { useCallback, useEffect, useMemo, useRef } from "react"
import LazyLoad from "react-lazy-load"
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
import { IoPlayCircleOutline, IoPauseCircleOutline } from "react-icons/io5";

export interface ITableProps extends NftCollection {
  layout?: 'grid' | 'table'
  isPopolar?: boolean
  handleClick: () => void,
  isHardCode: boolean
  isEnded: boolean
  logo: any
}

export const CardItemTable = (props: ITableProps) => {
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
        <Image
          src={isHardCode ? "https://dd.dexscreener.com/ds-data/chains/arbitrum.png" : logo}
          w="25px"
          h="25px"
          bg="#FFFBEA"
          p="1px"
          borderRadius={"10px"}
          border="1px solid #FFFBEA"
        />

        {website && <GlobalIcon onClick={() => window.open(website)} />}
        {twitter && <TwitterIcon onClick={() => window.open(twitter)} />}
        {discord && <DiscordICon onClick={() => window.open(discord)} />}

      </HStack >
    )
  }, [discord, isHardCode, layout, logo, twitter, website, width])

  const renderImage = useMemo(() => {
    return (
      <VStack w="full">

        {image.includes(".mp4") ?
          <Box
            height="inherit"
            position={"relative"}
            h={{ base: "195px", lg: "260px" }}
            w="100%"
            p={{ base: "3px", md: "0px" }}
            borderRadius={{ base: "8px", md: "24px" }}
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
              left={2}
              position={"absolute"}
              cursor={{ lg: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                videoRef.current.play();
              }}
            >
              <IoPlayCircleOutline size={"18px"} />
            </Box>
          </Box>
          :
          <Image
            src={image}
            h={{ base: "195px", lg: "260px" }}
            w="100%"
            borderRadius={{ base: "8px 8px 0px 0px", md: "24px" }}
            p={{ base: "3px", md: "0px" }}
            objectFit={"fill"}
            fallbackSrc={NoImg}
            loading="lazy"
          />
        }

      </VStack>
    )
  }, [image])

  return (
    <VStack
      w="full"
      bg="#FFFFFF"
      borderRadius={{ base: "8px", md: "24px" }}
      p={{ base: '0', lg: '1px', }}
      spacing={2}
      onClick={handleClick}
    >

      {renderImage}

      <VStack
        w="full"
        spacing={2}
        alignItems={"start"}
        p={"10px"}
      >

        <HStack>
          <Text
            fontWeight="600"
            fontSize={{ base: "14px", md: "18px" }}
            lineHeight={{ base: "18px", md: "24px" }}
            textAlign={{ base: "left" }}
            color="black"
            // h={{ base: "40px", md: "80px" }}
            // maxH={{ base: "40px", md: "80px" }}
            noOfLines={1}
          >
            {props.name.length > 30 ? props.name.slice(0, 30).concat("...") : props.name}
          </Text>

          {props.isVerifyTwitter &&
            <Image src={IcVerifyTw} w="18px" h="18px" />
          }
        </HStack>

        {renderSocsialIcon()}

        <HStack
          mt="12px"
          justifyContent={"space-between"}
          w="full"
        >

          {isHardCode ?
            <>
              <TagBlue value={"Live"} />
            </>
            :
            <>
              {isEnded ?
                <TagRed value={"Ended"} />
                :
                <TagBlue value={"Live"} />
              }
            </>
          }

          {layout === "table" && width <= 500 ?
            <Image
              src={isHardCode ? "https://dd.dexscreener.com/ds-data/chains/arbitrum.png" : logo}
              w="24px"
              h="24px"
              bg="#FFFBEA"
              p="1px"
              borderRadius={"10px"}
              border="1px solid #FFFBEA"
            />
            : null
          }

        </HStack>

        {price &&
          <HStack
            mt="12px"
            w="full"
            justifyContent={"space-between"}
          >

            <Text
              fontSize={{ base: "14px", md: "16px" }}
              fontWeight="500"
            >
              Price:
            </Text>

            <HStack>
              <Text
                fontSize={{ base: "14px", md: "16px" }}
                color="black.light"
                fontWeight="600"
              >
                {price}
              </Text>
              <Image
                src={logo}
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
            mt="12px"
            w="full"
            justifyContent={"space-between"}
          >

            <Text
              fontSize={{ base: "14px", md: "16px" }}
              fontWeight="500"
            >
              Price:
            </Text>

            <Text
              fontSize={{ base: "14px", md: "16px" }}
              color="black.light"
              fontWeight="600"
            >
              Free
            </Text>

          </HStack>
        }


        <ButtonMints
          address={address}
          qtyMinted={qtyMinted}
          layout={layout}
          chainId={chainId}
        />

      </VStack>

    </VStack>
  )

}
