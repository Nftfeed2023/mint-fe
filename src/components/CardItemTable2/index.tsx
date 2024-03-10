import { VStack, Center, HStack, Box, Image, Text, Grid, GridItem } from "@chakra-ui/react"
import { useCallback, useRef, useState } from "react"
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
import { formatPrice } from "~/utils"
import { MAIN_ROUTERS } from "~/routes/routes"
import { useNavigate } from "react-router-dom"

export interface ITableProps extends NftCollection {
  layout?: 'grid' | 'table'
  isPopolar?: boolean
  handleClick: () => void,
  isHardCode: boolean
  isEnded: boolean
  logo: any
}

export const CardItemTable2 = (props: ITableProps) => {
  const videoRef = useRef(null);
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const {
    address, image, chainId, qtyMinted,
    isEnded,
    twitter = "", website = "", discord = "", price,
    layout, isPopolar = false,
    isHardCode,
    handleClick,
    logo,
  } = props;

  const [hover, setHover] = useState(false);

  const textMint = hover ? "Go to mint" : `${formatPrice(qtyMinted) || 0} mints`;

  const renderSocsialIcon = useCallback(() => {
    if (width <= 500) {
      return null;
    }
    return (
      <HStack
        // mt={"12px"}
        cursor={{ base: "none", lg: "pointer" }}
        mb={"4px"}
      >

        <Image
          src={isHardCode ? "https://dd.dexscreener.com/ds-data/chains/arbitrum.png" : logo}
          w="20px"
          h="20px"
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
  }, [discord, isHardCode, logo, twitter, website, width])

  return (
    <VStack
      w="full"
      padding={"10px"}
      bg="#fff"
      borderRadius={{ base: "8px", md: "24px" }}
      // p={{ base: '0', lg: '1px', }}
      // spacing={2}
      onClick={handleClick}
      spacing={0}
    >

      <Grid
        w="full"
        templateColumns='repeat(5, 1fr)'
        gap={0}
        height={"auto"}
      >
        <GridItem
          bg="#e3e3e3"

          border={"1px solid #e3e3e3"}
          // bg="#fff"

          colSpan={{ base: 3, }}
          borderStartStartRadius={"12px"}
          borderStartEndRadius={"32px"}
          w="full"
          p="10px"
        >
          <VStack
            w="full"
            alignItems={"start"}
            pl="10px"
          >
            <Text
              fontWeight="600"
              fontSize={{ base: "14px", }}
              lineHeight={{ base: "normal", }}
              textAlign={{ base: "left" }}
              color="#000"
              noOfLines={2}
            >
              {props.name.length > 30 ? props.name.slice(0, 30).concat("...") : props.name}
            </Text>
          </VStack>
        </GridItem>
        <GridItem
          colSpan={{ base: 2, }}
          bg="#fff"
          borderEndStartRadius={"48px"}
        >
          <VStack
            w="full"
            spacing={0}
          >
            {isEnded ?
              <Text
                fontSize="13px"
                lineHeight="normal"
                fontWeight="600"
                color="#F29F50"
              >
                Ended
              </Text>
              :
              <Text
                fontSize="13px"
                lineHeight="normal"
                fontWeight="600"
                color="#448AFF"
              >
                Live
              </Text>
            }
            {renderSocsialIcon()}
          </VStack>
        </GridItem>

      </Grid>

      <VStack
        w="full"
        p="10px"
        bg="#e3e3e3"
      >
        {image.includes(".mp4") ?
          <Box
            h={{ base: "195px", lg: "260px" }}
            w="100%"
            borderRadius={{ base: "8px 8px 0px 0px", md: "24px" }}
          >
            <video
              loop
              ref={videoRef}
              style={{
                borderRadius: "24px",
                width: "100%",
                height: "inherit",
                objectFit: "fill"
              }}
              //@ts-ignore
              autoPlay={true}
              //@ts-ignore
              playsInline="playsInline"
              //@ts-ignore
              muted="muted"
              src={image}
            />
          </Box>
          :
          <Image
            src={image}
            h={{ base: "195px", lg: "260px" }}
            w="100%"
            borderRadius={{ base: "8px 8px 0px 0px", md: "24px" }}
            objectFit={"fill"}
          />
        }
      </VStack>

      <Grid
        w="full"
        templateColumns='repeat(5, 1fr)'
        gap={2}
        alignItems={"center"}
      >
        <GridItem
          colSpan={{ base: 2, }}
          h="100%"
        >
          <VStack
            spacing={0}
            w="full"
            alignItems={"start"}
            pl="20px"
            pt="10px"
          >

            {price &&
              <>
                {/* <Text
                  fontSize={{ base: "12px", }}
                  fontWeight="500"
                  color={"#000"}
                  lineHeight={"normal"}
                >
                  Price:
                </Text> */}

                <HStack>
                  <Text
                    fontSize={{ base: "20px", }}
                    fontWeight="600"
                    color={"#000"}
                    lineHeight={"normal"}
                  >
                    {price}
                  </Text>
                  <Image
                    src={(chainId === CHAIN_CODE.ZETACHAIN_TESTNET || chainId === CHAIN_CODE.ZETACHAIN_MAINNET) ? logo : IconETH}
                    w="20px"
                    h="20px"
                    bg="#FFFBEA"
                    p="1px"
                    borderRadius={"10px"}
                    border="1px solid #FFFBEA"
                  />
                </HStack>
              </>

            }

            {isPopolar && !price &&
              <>
                {/*
                <Text
                  fontSize={{ base: "12px", }}
                  fontWeight="500"
                  color={"#000"}
                  lineHeight={"normal"}
                >
                  Price:
                </Text> */}

                <Text
                  fontSize={{ base: "20px", }}
                  fontWeight="600"
                  color={"#000"}
                  lineHeight={"normal"}
                >
                  Free
                </Text>

              </>
            }

          </VStack>
        </GridItem>

        <GridItem
          colSpan={{ base: 3, }}
          borderEndStartRadius={"32px"}
          borderEndEndRadius={"12px"}
          border={"1px solid #e3e3e3"}
          bg="#fff"
          h="100%"
        >
          <VStack
            py="8px"
            w="full"
            h="full"
            onClick={() => {
              navigate(`${MAIN_ROUTERS.NFT_COLLECTION}/${chainId}/${address}`)
            }}

            fontSize={"16px"}
            color={"#ee3824"}
            fontWeight={600}
            borderColor={"transparent"}

            _hover={{
              lg: {
                color: "#ee3824",
                transition: "all 250ms ease-in-out",
              }
            }}

            onMouseOver={() => {
              if (width > 900) {
                setHover(true);
              }
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
          >
            <Text
              h="100%"
            >
              {textMint}
            </Text>
          </VStack>
        </GridItem>

      </Grid>

    </VStack >
  )

}
