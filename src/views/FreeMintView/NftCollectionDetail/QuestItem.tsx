import { useColorMode, AccordionItem, AccordionButton, HStack, AccordionIcon, AccordionPanel, VStack, Image, Text, Box, Tooltip } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { EQuestStatus } from "~/common/enums/ECampaign";
import PrimaryButton from "~/components/PrimaryButton";
import { IQuest } from "~/dto/ICampaign";
import { IUser } from "~/dto/IUser";

import IcArrow from '~/assets/icons/ic_arrow_cricle.png'
import IcCheck from "~/assets/icons/ic_check.png"
import IcRefresh from "~/assets/icons/ic_refresh.png"
import IcTw from "~/assets/icons/ic_x.png"
import { LuCheckCircle } from "react-icons/lu";

const TIME_OUT = 30;

export const QuestItem = (props: {
  isLoading: boolean,
  item: IQuest,
  account: string,
  userInfo: IUser,
  setIsOpen: (value: boolean) => void,
  campaignExecute: (id: string) => void
}) => {

  const {
    item, account, userInfo, setIsOpen, campaignExecute, isLoading,
  } = props;
  const { colorMode } = useColorMode();

  const [clickTws, setClickTws] = useState([]);

  const [duration, setDuration] = useState(TIME_OUT);
  const [paused, setPaused] = useState(false);

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

  const handleClick = (item: IQuest) => {
    if (!account || !userInfo || (!userInfo.status || userInfo.status < 2)) {
      setIsOpen(true);
    } else {
      if (item.status !== EQuestStatus.COMPLETED) {
        campaignExecute(item.id);
      }
    }
  }

  const onOpenAccordion = () => {
    if (!paused) {
      window.open(`${item.socialRef}`);
      setClickTws([...clickTws, item.id])
      setPaused(true);
      setDuration(TIME_OUT);
    }
  }

  return (
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
            opacity={item.status === EQuestStatus.COMPLETED ? 0.5 : 1}
          >

            <AccordionIcon />

            <HStack
              onClick={onOpenAccordion}
            >
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
                {`${item.name}`}
              </Text>
            </HStack>

          </HStack>

        </Box>

        {item.status === EQuestStatus.COMPLETED ?
          <LuCheckCircle
            width={"13px"}
            height={"13px"}
            color={"#87d068"}
          />
          :
          null
        }

      </AccordionButton>

      <AccordionPanel pb={4}
        bg="#fff"
        p="20px"
        borderBottomRadius="12px"
      >

        <VStack
          w="full"
          alignItems={"start"}
          spacing={4}
        >

          <Text
            color={`#000`}
            fontSize={{ base: "13px", }}
            maxW={"90%"}
          >
            {`${item.socialRef}`}
          </Text>

          <HStack
            width={"full"}
            justifyContent={"space-between"}
          >

            {item.status !== EQuestStatus.COMPLETED
              ?
              <HStack
                cursor={{ base: "none", md: "pointer" }}
                onClick={onOpenAccordion}
              >
                <Text
                  color={`#F95F0B`}
                  fontSize={{ base: "13px", }}
                >
                  Detail
                </Text>
                <Image
                  src={IcArrow}
                  w="13px"
                  h="13px"
                  borderRadius={"100px"}
                />
              </HStack>
              : null
            }

            {clickTws.includes(item.id)
              && item.status !== EQuestStatus.COMPLETED
              ? <PrimaryButton
                w="fit-content"
                py="0px !important"
                bg="transparent"
                isLoading={isLoading}
                onClick={() => handleClick(item)}
                color={`#000`}
                _hover={{
                  color: "#000",
                }}
                fontSize={"12px"}
                rightIcon={<Image
                  src={IcRefresh}
                  w="13px"
                  h="13px"
                  borderRadius={"100px"}
                  background={"#87d068"}
                />}
              >
                {paused ? `Verify in ${duration}s` : `Verify`}
              </PrimaryButton>
              : null
            }

          </HStack>

        </VStack>

      </AccordionPanel>

    </AccordionItem>
  )
}
