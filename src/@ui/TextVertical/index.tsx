import { CopyIcon } from "@chakra-ui/icons";
import { VStack, HStack, Icon, Text, Image } from "@chakra-ui/react";
import { pipeLongTextUi } from "~/common/utils/common.utils";
import WrapperCopy from "~/components/WrapperCopy";


export const TextVertical = (props: {
  title: string,
  value: string
  icon?: string,
  isCopy?: boolean,
  isLink?: boolean,
}) => {
  const { title, value, icon, isCopy, isLink } = props;
  return (
    <VStack
      w="full"
      spacing={2}
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
        w="full"
        alignItems={"start"}
        cursor={{ base: "auto", lg: isLink ? "pointer" : "auto" }}
        onClick={() => {
          if (isLink) {
            window.open(value);
          }
        }}
      >
        <Text
          textDecorationLine={isLink ? "underline" : "none"}
          className="textPrimary"
          fontWeight={"700"}
          fontSize={{ base: "14px", md: "16px" }}
          lineHeight="21px"
          letterSpacing="-0.5px"
          alignSelf={"start"}
        >
          {isLink ? "Go to" : value}
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
    </VStack>
  )
}
