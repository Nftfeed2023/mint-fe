import { CopyIcon } from "@chakra-ui/icons";
import { Grid, GridItem, HStack, Tooltip, Icon, Text, Image, } from "@chakra-ui/react";
import { pipeLongTextUi } from "~/common/utils/common.utils";
import WrapperCopy from "~/components/WrapperCopy";
import useWindowSize from "~/hooks/useWindowSize";

export const ValueGrid = (props: {
  t: string,
  value: string | number,
  isCopy?: boolean,
  isShortText?: boolean,
  image?: string,
  isLink?: boolean,
  website?: string,
  isHighlight?: boolean,
}) => {
  const { width } = useWindowSize();
  const {
    isCopy = false,
    isShortText = false,
    value: valueData,
    image,
    website,
    isLink = false,
    isHighlight = false,
  } = props;


  return (
    <Grid
      w="full"
      py="6px"
      templateColumns='repeat(5, 1fr)'
      gap={2}
    >
      <GridItem
        colSpan={{ base: 2, }}
        display={{ base: "block", md: "none" }}
      >
        <Text
          fontWeight={"500"}
          color="black.light"
          fontSize={{ base: "13px", md: "16px" }}
          lineHeight={{ base: "24px" }}
          opacity={"0.8"}
          noOfLines={1}
        >
          {props.t}
        </Text>
      </GridItem>
      <GridItem colSpan={{ base: 3, lg: 5 }} w="full">
        <HStack
          w="fit-content"
          alignItems={'center'}
          spacing={"1px"}
        >
          <HStack>

            {image &&
              <Image
                src={image}
                w={{ base: "24px", lg: "32px" }}
                h={{ base: "24px", lg: "32px" }}
                objectFit={"cover"}
              />
            }

            {/* <Tooltip label={valueData}> */}
            <Text
              fontWeight={"700"}
              color={"black.light"}
              className={isHighlight ? "textPrimary" : ""}
              fontSize={{ base: "13px", md: "16px" }}
              lineHeight={{ base: "24px" }}
              maxW={"100%"}
              noOfLines={width <= 992 ? 4 : 1}
              textAlign={"start"}
              cursor={isLink ? "pointer" : "auto"}
              onClick={() => {
                if (isLink && website) {
                  window.open(website)
                }
              }}
            >
              {isShortText ? (valueData ? pipeLongTextUi(valueData.toString(), 10) : valueData) : valueData}
            </Text>
            {/* </Tooltip> */}

          </HStack>

          {isCopy &&
            <WrapperCopy copyText={valueData}>
              <Icon as={CopyIcon} />
            </WrapperCopy>
          }
        </HStack>

      </GridItem>
    </Grid>
  )
}
