import { VStack, HStack, SimpleGrid, Accordion, Box, Image, Text, Divider, useColorMode, AccordionButton, AccordionIcon, AccordionItem } from "@chakra-ui/react"
import dayjs from "dayjs"
import { Fragment, useEffect, useState } from "react"
import { TextHorizonCampaign } from "~/@ui/TextHorizon"
import { ECampaignStatus } from "~/common/enums/ECampaign"
import PrimaryButton from "~/components/PrimaryButton"
import { QuestItem } from "./QuestItem"
import ImgSocials from "~/assets/images/img_socials.png"
import { useCampaign } from "../hooks/useCampaign"
import { useConnectWallet } from "~/hooks/@global/useConnectWallet"
import { useNavigate } from "react-router-dom"
import { MANAGER_ROUTERS } from "~/routes/routes"
import { formatMoney } from "~/utils"
import IcTw from "~/assets/icons/ic_x.png"

const TIME_OUT = 30;

const SkeletonAgg = () => {

  const { colorMode } = useColorMode();
  const history = useNavigate();

  return (
    <Box
      mt={{ base: "10px", md: "0px" }}
      w="full"
      p={{
        base: "10px",
        md: "15px",
      }}
      bg="white"
      borderRadius="8px"
      border={{ md: "1px solid #ffd3cb" }}
      boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
    >

      <VStack
        w="full"
        alignItems={"start"}
      >

        <HStack spacing={{ base: 1, md: 2 }}>

          <Box
            alignSelf={{ base: "start", }}
            zIndex={2}
            bg="white"
            border={"1px solid #ffd3cb"}
            boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
            borderRadius="100px"
            p="5px"
            w={{ base: "80px", lg: "60px", }}
            className="shake-vertical"
          >

            <Image
              src={ImgSocials}
            />

          </Box>

          <VStack
            spacing={1}
            alignItems={"start"}
            pl="10px"
          >
            <Text
              color={`#000`}
              fontWeight={500}
              fontSize={{ base: "18px", md: "20px", }}
              lineHeight={"normal"}
            >
              {`Follow, Like, Retweet on X earn $$$`}
            </Text>
          </VStack>

        </HStack>

      </VStack>

      <SimpleGrid
        pt="20px"
        w="full"
        spacing={2}
        columns={{ base: 1, md: 2 }}
      >

        <VStack
          zIndex={1}
          w="full"
          spacing={2}
        >

          <Accordion
            allowMultiple
            w="full"
          >
            <VStack
              w="full"
              spacing={2}
            >

              {['Follow on X', 'Like on X', 'Retweet on X'].map((item, idx) => {
                return (
                  <Fragment key={idx}>
                    <AccordionItem
                      w="full"
                      background={`#fff`}
                      borderRadius={"12px"}
                      borderTop={"none"}
                      borderBottomWidth={"none"}
                      alignItems="start"

                      border={"1px solid #ffd3cb"}

                      transition="all 200ms ease-in-out"
                      _hover={{
                        boxShadow: '0px 0px 10px 0px #ffd3cb',
                        background: "#fff",
                        borderBottomWidth: "0px !important"
                      }}
                    >

                      <AccordionButton
                        alignItems="center"
                        borderBottomWidth={"none"}
                        borderRadius="5px"
                        backgroundColor="transparent"
                        background="transparent"
                        border="1px solid transparent"
                        transition="0.4s"
                        boxShadow="0px 0px 0px 0px rgba(0, 0, 0, 0)"
                        style={{
                          borderBottomWidth: "0px !important"
                        }}
                      >
                        <Box as="span" flex='1' textAlign='left'>

                          <HStack
                            opacity={0.5}
                          >

                            <AccordionIcon />

                            <HStack>
                              <Image
                                src={IcTw}
                                w="13px"
                                h="13px"
                                cursor={{ base: "none", md: "pointer" }}
                              />
                              <Text
                                color={`#000`}
                                fontWeight={500}
                                fontSize={{ base: "13px", }}
                              >
                                {`${item}`}
                              </Text>
                            </HStack>

                          </HStack>

                        </Box>

                      </AccordionButton>

                    </AccordionItem>
                  </Fragment>
                )
              })}

            </VStack>

          </Accordion>

          <PrimaryButton
            bg="transparent"
            color={"#ee3824"}
            _hover={{
              color: "#fff",
              bg: "#ee3824",
            }}
            _disabled={{
              borderColor: '#E8E8E8 !important',
              backgroundColor: '#E8E8E8 !important',
              opacity: .7,
              color: '#ee3824 !important',
              cursor: "not-allowed"
            }}
            onClick={() => {
              history(MANAGER_ROUTERS.SOCIAL_ACCOUNT)
            }}
          >
            Go to Socials Account
          </PrimaryButton>

        </VStack>

        <VStack
          px="10px"
        >

          <Text
            color={`#3A3E45`}
            fontSize={{ base: "18px", md: "20px" }}
            lineHeight={{ base: "26px", md: "28px" }}
            textAlign={"center"}
            maxW={500}
            letterSpacing={"-0.36px"}
          >
            You need to connect and follow Twitter nftfeed.guru first to perform this action
          </Text>

        </VStack>

      </SimpleGrid >

    </Box >
  )
}

export const AggregatorCampaignView = (props: {
  campaignId: string
}) => {

  const { campaignId } = props;
  const { chainId: chainIdActive, userInfo, account } = useConnectWallet();

  const {
    isLoading: isLoadingQuest,
    quest,
    campaignExecute,
    campaign,
    finishClaim,
  } = useCampaign({ campaignId });

  const [duration, setDuration] = useState(TIME_OUT);
  const [paused, setPaused] = useState(false);
  const [isOpenQuest, setIsOpenQuest] = useState(false);

  useEffect(() => {
    let timerId;
    if (paused) {
      timerId = setInterval(() => {
        if (duration <= 0) {
          setPaused(false);
        } else {
          setDuration((prev) => prev - 1);
        }
      }, 1000);
    }

    return function cleanup() {
      clearInterval(timerId);
    };
  }, [duration, paused]);

  if (!account || !userInfo || userInfo?.status < 2) {
    return (
      <SkeletonAgg />
    )
  }

  if (!campaignId || !campaign) {
    return null;
  }

  const isEnd = (new Date()).getTime() > (new Date(campaign.endTime)).getTime();

  return (
    <Box
      mt={{ base: "10px", md: "0px" }}
      w="full"
      p={{
        base: "10px",
        md: "15px",
      }}
      bg="white"
      borderRadius="8px"
      border={{ md: "1px solid #ffd3cb" }}
      boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
    >

      <VStack
        w="full"
        alignItems={"start"}
      >

        <HStack spacing={{ base: 1, md: 2 }}>

          <Box
            alignSelf={{ base: "start", }}
            zIndex={2}
            bg="white"
            border={"1px solid #ffd3cb"}
            boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
            borderRadius="100px"
            p="5px"
            w={{ base: "80px", lg: "60px", }}
            className="shake-vertical"
          >

            <Image
              src={ImgSocials}
            />

          </Box>

          <VStack
            spacing={1}
            alignItems={"start"}
            pl="10px"
          >
            <Text
              color={`#000`}
              fontWeight={500}
              fontSize={{ base: "18px", md: "20px", }}
              lineHeight={"normal"}
            >
              {`${campaign?.campaignTitle ? campaign.campaignTitle.slice(0, 50) : ""}`}
            </Text>
            {/* <Text
              color={`#000`}
              fontWeight={400}
              fontSize={{ base: "13px", }}
              lineHeight={"normal"}
            >
              {`${campaign?.campaignDescription ? campaign.campaignDescription.slice(0, 200) : ""}`}
            </Text> */}
          </VStack>

        </HStack>

        <HStack>

          <Text
            p="6px 8px"
            border='1px solid #dedede'
            borderRadius={"4px"}
            fontSize={"12px"}
            fontWeight={600}
            color={isEnd ? "#000" : "green"}
          >
            {isEnd ? "Ended" : "Live"}
          </Text>

          <Text
            p="6px 8px"
            border='1px solid #dedede'
            borderRadius={"4px"}
            fontSize={"12px"}
            fontWeight={600}
          >
            {`${campaign?.startTime ? dayjs(new Date(campaign.startTime).toUTCDate()).format("YYYY/MM/DD HH:mm") : null}
                 -
            ${campaign?.endTime ? dayjs(new Date(campaign.endTime).toUTCDate()).format("YYYY/MM/DD HH:mm") : null}
          `}
            (UTC)
          </Text>

        </HStack>

      </VStack>

      <SimpleGrid
        pt="20px"
        w="full"
        spacing={2}
        columns={{ base: 1, md: 2 }}
      >

        <VStack
          zIndex={1}
          w="full"
          spacing={2}
        >

          <Accordion
            allowMultiple
            w="full"
          >
            <VStack
              w="full"
              spacing={2}
            >

              {quest && quest.map((item, idx) => {
                return (
                  <Fragment key={idx}>
                    <QuestItem
                      isLoading={isLoadingQuest}
                      item={item}
                      account={account}
                      campaignExecute={campaignExecute}
                      setIsOpen={setIsOpenQuest}
                      userInfo={userInfo}
                    />
                  </Fragment>
                )
              })}

            </VStack>

          </Accordion>

          {campaign
            &&
            <>

              <PrimaryButton
                bg="transparent"
                color={"#ee3824"}
                _hover={{
                  color: "#fff",
                  bg: "#ee3824",
                }}
                _disabled={{
                  borderColor: '#E8E8E8 !important',
                  backgroundColor: '#E8E8E8 !important',
                  opacity: .7,
                  color: '#ee3824 !important',
                  cursor: "not-allowed"
                }}
                onClick={() => { finishClaim(campaign.campaignId, userInfo.id) }}
                isDisabled={isLoadingQuest || paused || campaign.campaignStatus !== ECampaignStatus.CLAIMABLE || isEnd}
                isLoading={isLoadingQuest || paused}
              >
                {campaign.campaignStatus === ECampaignStatus.CLAIMED
                  ? `Confirmed`
                  : (paused ? `Confirmable in ${duration}s` : `Confirm all Quests completed`)
                }
              </PrimaryButton>

            </>
          }

        </VStack>

        <VStack
          px="10px"
        >

          <Box w="full" >
            <HStack
              w="full"
              maxW={"100%"}
              justifyContent={"space-between"}
            >
              <Text
                fontWeight={"500"}
                fontSize={{ base: "16px", md: "18px" }}
                lineHeight="21px"
                color="black.light"
                letterSpacing="-0.5px"
                alignSelf={"center"}
              >
                Reward:
              </Text>

              <Box
                p="5px 15px"
                border="1px solid #ee3824"
                borderRadius="12px"
                backgroundColor='#E8E8E8 !important'
                bg="#fff !important"
              >
                <Text
                  className={"textPrimary"}
                  fontWeight={"600"}
                  fontSize={{ base: "16px", md: "18px" }}
                  lineHeight="21px"
                  letterSpacing="-0.5px"
                  alignSelf={"center"}
                  color={"#ee3824"}
                >
                  {`${campaign?.totalReward} ${campaign?.currency}`}
                </Text>
              </Box>
            </HStack>
          </Box>

          <Divider />

          <VStack w="full" spacing={3}>
            <Box w="full">
              <TextHorizonCampaign
                title={`# of Winner`}
                value={`${campaign.maxWinner ? (campaign.totalReward / campaign.maxWinner) : "-"}`}
              />
            </Box>
            <Box w="full">
              <TextHorizonCampaign
                title={`Total Join`}
                value={formatMoney(campaign?.totalJoin?.toString()).toString()}
              />
            </Box>
            <Box w="full">
              <TextHorizonCampaign
                title={`How to select winners`}
                value={`Auto-Raffle`}
              />
            </Box>
          </VStack>

        </VStack>

      </SimpleGrid>

    </Box>
  )
}
