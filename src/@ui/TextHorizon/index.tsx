import { HStack, Icon, Text, Image } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import WrapperCopy from "~/components/WrapperCopy";
import { pipeLongTextUi } from "~/common/utils/common.utils";

export const TextHorizon = (props: {
  title: string,
  value: string,
  icon?: any,
  isCopy?: boolean,
  isLink?: boolean,
  yourLink?: string,
}) => {
  const { title, value, icon, isCopy, isLink, yourLink } = props;
  return (
    <HStack
      w="full"
      maxW={"100%"}
      justifyContent={"space-between"}
    >
      <Text
        fontWeight={"500"}
        fontSize={{ base: "14px", md: "16px" }}
        lineHeight="21px"
        color="black.light"
        letterSpacing="-0.5px"
        alignSelf={"start"}
      >
        {title}:
      </Text>
      <HStack
        maxW={"100%"}
        cursor={{ base: "auto", lg: isLink ? "pointer" : "auto" }}
        onClick={() => {
          if (isLink) {
            window.open(yourLink);
          }
        }}
      >
        <Text
          className={"textPrimary"}
          textDecorationLine={isLink ? "underline" : "none"}
          fontWeight={"500"}
          fontSize={{ base: "14px", md: "16px" }}
          lineHeight="21px"
          letterSpacing="-0.5px"
          alignSelf={"start"}
        >
          {pipeLongTextUi(value, 20)}
        </Text>
        {isCopy &&
          <WrapperCopy copyText={value}>
            <Icon as={CopyIcon} />
          </WrapperCopy>
        }
        {icon &&
          <Image src={icon} w="24px" h="24px" />
        }
      </HStack>
    </HStack>
  )
}

export const TextHorizonCampaign = (props: {
  title: string,
  value: string | number,
}) => {
  const { title, value, } = props;
  return (
    <HStack
      w="full"
      maxW={"100%"}
      justifyContent={"space-between"}
    >
      <Text
        fontWeight={"400"}
        fontSize={{ base: "14px", md: "16px" }}
        lineHeight="21px"
        color="black.light"
        letterSpacing="-0.5px"
        alignSelf={"start"}
        opacity={.8}
      >
        {title}:
      </Text>
      <Text
        fontWeight={"400"}
        fontSize={{ base: "14px", md: "16px" }}
        lineHeight="21px"
        letterSpacing="-0.5px"
        alignSelf={"start"}
      >
        {pipeLongTextUi(value.toString(), 20)}
      </Text>
    </HStack>
  )
}
