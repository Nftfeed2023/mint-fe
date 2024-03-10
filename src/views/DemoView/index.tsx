import { VStack, Image, Box, Text, HStack, SimpleGrid } from "@chakra-ui/react"
import { useRef, useState } from "react";

import QRCode from "qrcode.react"
import ImgFrameNft from "~/assets/images/img_frame_nft.png"

import IcEye from "~/assets/icons/ic_eye.png"
import IcLike from "~/assets/icons/ic_like.png"
import IcComment from "~/assets/icons/ic_comment.png"
import IcQuote from "~/assets/icons/ic_quote.png"
import IcRetweet from "~/assets/icons/ic_retweet.png"

import Img1 from "~/assets/demo/1.png"
import Img2 from "~/assets/demo/2.png"

//@ts-ignore
import VideoFrameNft from "~/assets/video_nft_social.mp4"
import { ModalPoint } from "./ModalPoint";

const DATA = [
  {
    ic: IcEye,
    value: "1,000",
  },
  {
    ic: IcLike,
    value: "200",
  },
  {
    ic: IcComment,
    value: "1,500",
  },
  {
    ic: IcQuote,
    value: "500",
  },
  {
    ic: IcRetweet,
    value: "1,000",
  },
]

export const DemoView = () => {

  const videoRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      w="full"
    >

      <SimpleGrid
        columns={3}
        maxW={"300px"}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, idx) => {
          return (
            <VStack
              h="100px"
              w="100px"
              bgImage={Img1}
              bgPosition="center"
              bgSize="cover"
              bgRepeat="no-repeat"
              justifyContent={"center"}
              style={{
                perspective: "800px"
              }}
            >
              {/* <Image
                src={Img1}
              /> */}
              <Box
              // position={"absolute"}
              // top={5}
              >
                <Image
                  src={Img2}
                  h="50px"
                  w="50px"
                />
              </Box>
            </VStack>
          )
        })

        }

      </SimpleGrid>


    </Box>

    // <VStack
    //   w='full'
    // >

    //   <VStack
    //     maxW={500}
    //     position={"relative"}
    //   >

    //     <Image
    //       src={ImgFrameNft}
    //     />

    //     <Box
    //       h="150px"
    //       // w="140px"
    //       position={"absolute"}
    //       top={"32%"}
    //       left="19%"
    //     >
    //       <video
    //         loop
    //         ref={videoRef}
    //         style={{
    //           borderRadius: "8px",
    //           width: "inherit",
    //           height: "inherit",
    //           objectFit: "cover"
    //         }}
    //         //@ts-ignore
    //         autoPlay={true}
    //         //@ts-ignore
    //         playsInline="playsInline"
    //         //@ts-ignore
    //         muted="muted"
    //         src={VideoFrameNft}
    //       >
    //       </video>
    //     </Box>

    //     <VStack
    //       position={"absolute"}
    //       bottom={"20%"}
    //       left="20%"
    //     >

    //       <Text
    //         color={"#fff"}
    //         fontSize={{ base: "18px" }}
    //         fontWeight={700}
    //         lineHeight={"normal"}
    //       >
    //         ID #202311-01
    //       </Text>

    //       <QRCode
    //         id='qrcode'
    //         value={"https://mint.nftfeed.guru/"}
    //         size={100}
    //         level={'H'}
    //         includeMargin={true}
    //       />

    //     </VStack>

    //     <VStack
    //       position={"absolute"}
    //       top={"25%"}
    //       right="20%"
    //       spacing={3}
    //     >

    //       <Text
    //         color={"#fff"}
    //         fontSize={{ base: "16px" }}
    //         fontWeight={600}
    //         lineHeight={"normal"}
    //         textDecorationLine={"underline"}
    //         cursor={{ lg: "pointer" }}
    //         onClick={() => { setIsOpen(!isOpen) }}
    //       >
    //         DETAIL POINT
    //       </Text>

    //       {DATA.map((item, idx) => {
    //         return (
    //           <HStack key={idx} alignItems={"center"}>
    //             <Image src={item.ic} w="20px" h="20px" />
    //             <Text
    //               color={"#fff"}
    //               fontSize={{ base: "14px" }}
    //               fontWeight={600}
    //               lineHeight={"normal"}
    //               textAlign={"start"}
    //             >
    //               {item.value} Points
    //             </Text>
    //           </HStack>
    //         )
    //       })
    //       }

    //       <Box
    //         pt="10px"
    //         w="full"
    //         alignItems={"start"}
    //         textAlign={"left"}
    //       >

    //         <Text
    //           color={"#fff"}
    //           fontSize={{ base: "16px" }}
    //           fontWeight={600}
    //           lineHeight={"normal"}
    //           textDecorationLine={"underline"}
    //         >
    //           TOTAL POINT
    //         </Text>

    //         <Text
    //           color={"#fff"}
    //           fontSize={{ base: "20px" }}
    //           fontWeight={700}
    //           lineHeight={"normal"}
    //         >
    //           4,200 Points
    //         </Text>

    //       </Box>

    //     </VStack>

    //   </VStack>

    //   <ModalPoint
    //     isOpen={isOpen}
    //     onClose={() => {
    //       setIsOpen(!isOpen)
    //     }}
    //   />

    // </VStack>
  )
}
