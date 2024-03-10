import React, { useEffect, useRef, } from 'react'
import {
  ModalOverlay,
  Modal,
  ModalBody,
  useColorMode,
  ModalContent,
  Box,
  Text,
  VStack,
  Image,
  ModalCloseButton,
  Divider,
  HStack,
  Center,
  SimpleGrid,
} from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom'

import IcEye from "~/assets/icons/ic_eye.png"
import IcLike from "~/assets/icons/ic_like.png"
import IcComment from "~/assets/icons/ic_comment.png"
import IcQuote from "~/assets/icons/ic_quote.png"
import IcRetweet from "~/assets/icons/ic_retweet.png"

interface IProps {
  isOpen?: boolean
  onClose?: () => void
}



const DATA = [
  {
    ic: IcEye,
    value: "View: 1 point per view",
  },
  {
    ic: IcLike,
    value: "Like: 100 point per like",
  },
  {
    ic: IcComment,
    value: "Reply: 250 points per reply",
  },
  {
    ic: IcQuote,
    value: "Quote: 500 points per quote",
  },
  {
    ic: IcRetweet,
    value: "Retweet: 1000 points per retweet",
  },
]

export const ModalPoint = (props: IProps) => {

  const {
    isOpen,
    onClose,
  } = props;
  const { colorMode, } = useColorMode();
  const history = useNavigate();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      isCentered
    >
      <ModalOverlay
        backdropFilter='blur(1px)'
      />

      <ModalContent
        background="#3E3D3C"
        maxWidth={{
          base: "full",
          lg: "80%",
        }}
        w={{
          base: "fit-content",
          xl: "50%"
        }}
      >
        <ModalCloseButton
          color={"#fff"}
          onClick={() => {
            onClose();
          }}
        />

        <ModalBody
          p={{ base: "10px", md: "20px" }}
          background="#3E3D3C"
          borderRadius={"12px"}
          borderWidth={"1px"}
          borderStyle="solid"
          borderColor={`transparent`}
          marginX="10px !important"
        >

          <Box
            w="full"
            p="5px 15px 10px"
            borderRadius={"24px"}
          >

            <Text
              color={"#fff"}
              fontSize={{ base: "24px", md: "32px" }}
              textTransform={"capitalize"}
              textAlign={"start"}
              fontWeight={500}
            >
              ID POINT MECHANISM
            </Text>

            <Text
              pt="20px"
              color={"#fff"}
              fontSize={{ base: "16px", md: "20px" }}
              textTransform={"capitalize"}
              textAlign={"start"}
              fontWeight={500}
            >
              Accumulating points is easy – just engage on Twitter! Reply, Quote, or Post Tweets with #NFTFeed and #BuildOnBase, you'll instantly earn points!
            </Text>

            <VStack w='full' pt="30px">
              <VStack
                maxW={"550px"}
                alignItems={"start"}
              >

                {DATA.map((item, idx) => {
                  return (
                    <HStack key={idx} alignItems={"center"}>
                      <Image src={item.ic} w="20px" h="20px" />
                      <Text
                        color={"#fff"}
                        fontSize={{ base: "16px" }}
                        fontWeight={400}
                        lineHeight={"normal"}
                        textAlign={"start"}
                      >
                        {item.value} Points
                      </Text>
                    </HStack>
                  )
                })
                }

              </VStack>
            </VStack>

          </Box>

        </ModalBody>
      </ModalContent>

    </Modal >
  )
}
