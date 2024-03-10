import React, { Fragment, useCallback, useEffect, useRef, useState, } from 'react'
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
  Checkbox,
  Spinner,
} from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom'
import PrimaryButton from '~/components/PrimaryButton'
import { Tweet, } from 'react-tweet'
import { EChainLocalKey } from '~/common/constants/chain.enum'
import userService from '~/services/user.service'


interface IProps {
  isOpen?: boolean
  tweetId: string
  onClose?: () => void
}

export const WellcomeModal = (props: IProps) => {

  const {
    isOpen,
    // tweetId,
    onClose,
  } = props;
  const { colorMode, } = useColorMode();
  const history = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const [twitterId, setTwitterId] = useState("");

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const rs = await userService.detailPopupTw({
        id: "fe27de72-430f-4182-bf9b-a347d2e417f9"
      })
      setTwitterId(rs.twitterId);
      setContent(rs.content);
      setIsLoading(false);
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
    }
  }, [])

  useEffect(() => {
    loadData();
  }, [])

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
        background="transparent"
      >
        <ModalCloseButton
          color={"black"}
          onClick={() => {
            onClose();
          }}
        />

        <ModalBody
          p="0px"
          background="#fff"
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
              className="textSpinWheel"
              fontSize={{ base: "24px", md: "38px" }}
              textTransform={"capitalize"}
              textAlign={"center"}
              fontWeight={500}
            >
              News
            </Text>

            <Divider borderBottomColor={"#ccc"} />

            {isLoading ?
              <Spinner color="#ee3824" size="lg" />
              :
              <Fragment>

                {!content
                  ?
                  <Box
                    w="full"
                    maxH={400}
                    overflowX={"auto"}
                  >

                    <Tweet id={twitterId} />

                  </Box>
                  :
                  <Box
                    p="20px 10px"
                    w='full'
                    maxHeight={"400px"}
                    overflow={"auto"}
                  >
                    <Text
                      color="grey.66"
                      fontSize="19px"
                    >
                      <span
                        style={{ whiteSpace: "pre-line", lineHeight: "normal" }}
                        dangerouslySetInnerHTML={{
                          __html: content
                        }}
                      />
                    </Text>
                  </Box>
                }

                <VStack
                  w="full"
                  pt="20px"
                >

                  <Checkbox
                    onChange={(e) => {
                      localStorage.setItem(EChainLocalKey.closeModalTwitter, e.target.checked ? "1" : "0");
                      localStorage.setItem(EChainLocalKey.today, new Date().getTime().toString())
                    }}
                  >
                    Don't show this again today!
                  </Checkbox>

                  <SimpleGrid
                    w="full"
                    spacing={2}
                    columns={2}
                  >

                    <PrimaryButton
                      opacity={.8}
                      onClick={onClose}
                    >
                      Close
                    </PrimaryButton>

                    <PrimaryButton
                      onClick={() => {
                        window.open(`https://twitter.com/NFTFeedOfficial/status/${twitterId}`)
                      }}
                    >
                      {`Go to `} <strong style={{ paddingLeft: "5px" }}>{` X`}</strong>
                    </PrimaryButton>

                  </SimpleGrid>

                </VStack>
              </Fragment>
            }

          </Box>

        </ModalBody>
      </ModalContent>

    </Modal>
  )
}
