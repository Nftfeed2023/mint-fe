


import { VStack, Text, Box, Icon, Image } from "@chakra-ui/react";
import { FC, } from 'react'
import LazyLoad from "react-lazy-load";
import { ReactComponent as CheckNftIcon } from '~/assets/svgs/check-nft-icon.svg'
import ImgStake from "~/assets/2s.gif"
import ImgBpunk from "~/assets/images/bpunk.png"
import { useParams } from "react-router-dom";

type INftCardProps = {
  name: string;
  tokenId: number;
  selectedTokenIds: number[];
  setSelectedTokenIds: (values: number[]) => void;
}

const NftCard: FC<INftCardProps> = ({ name, tokenId, selectedTokenIds, setSelectedTokenIds }: INftCardProps) => {

  const setTokenIds = new Set(selectedTokenIds);
  const { id } = useParams()



  const renderImageNft = (checkTick: boolean) => {
    if (!checkTick) {
      return null;
    }
    return (
      <VStack
        background={`linear-gradient(0deg, rgba(0, 5, 46, 0.8), rgba(0, 5, 46, 0.8))`}
        position="absolute"
        h={{ base: "230px", md: "180px" }}
        width='100%'
        rounded={'lg'}
      >
        <Icon
          as={CheckNftIcon}
          fontSize="40px"
          mt={{
            base: '25%',
            md: '30%',
            lg: '25%',
            '3lg': '35%',
            xl: '40%'
          }}
        />
      </VStack>
    )
  }
  return (
    <Box
      w="full"
      bg="#F2F2F2"
      rounded={'lg'}
      position={"relative"}
      cursor={{ base: "auto", lg: "pointer" }}
      onClick={(e) => {
        e.stopPropagation()
        if (setTokenIds.has(tokenId)) {
          setTokenIds.delete(tokenId)

        } else {
          setTokenIds.add(tokenId)
        }
        setSelectedTokenIds(Array.from(setTokenIds))
      }}
    >

      {renderImageNft(setTokenIds.has(tokenId))}

      <LazyLoad>
        <Box
          p="1px"
          h={{ base: "230px", md: "180px" }}
        >

          <Image
            src={id === "sharkie-nft" ? ImgStake : ImgBpunk}
            style={{
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              width: "100%",
              height: "inherit",
              objectFit: "cover"
            }}
          />
          {/* <video
            loop
            ref={videoRef}
            style={{
              borderRadius: "8px",
              width: "100%",
              height: "inherit",
              objectFit: "cover"
            }}
            //@ts-ignore
            autoPlay={false}
            //@ts-ignore
            playsInline="playsInline"
            //@ts-ignore
            muted="muted"
            src={"https://cdn.nftfeed.guru/files/72debc876502471b91b78d7f0d18926dCase_Holographic_360(Impulse)_AB_WHITE.mp4"}
          >
          </video> */}
        </Box>
      </LazyLoad>

      <VStack
        w="full"
        p="10px"
        spacing={2}
      >
        <Text
          fontWeight="700"
          fontSize={{ base: "14px", }}
          lineHeight="18px"
          color="black.light"
          alignSelf={"start"}
        >
          {name} #{tokenId}
        </Text>
        <Text
          fontWeight="500"
          fontSize={{ base: "13px", }}
          lineHeight="18px"
          color="black.light"
          alignSelf={"start"}
        >
          NFTFeed
        </Text>
        <Text
          fontWeight="500"
          fontSize={{ base: "14px", }}
          lineHeight="18px"
          color="black.light"
          alignSelf={"start"}
        >
          Genesis
        </Text>
      </VStack>


    </Box>
  )
}
export default NftCard;
