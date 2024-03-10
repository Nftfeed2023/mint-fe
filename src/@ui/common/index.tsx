
import { InputProps, Text, } from "@chakra-ui/react"

export const TitleHeader = ({ children }) => {
  return (
    <Text
      mx="3px"
      fontSize={{ base: "24px", md: "30px" }}
      color="black.light"
      fontWeight="600"
    >
      {children}
    </Text>
  )
}

export const TitleViewAll = (props: { title: string, openLink: () => void }) => {
  return (
    <Text
      mx="3px"
      fontSize={{ base: "13px", md: "16px" }}
      color="black.light"
      fontWeight="600"
      cursor={"pointer"}
      _hover={{
        textDecoration: "underline"
      }}
      onClick={props.openLink}
    >
      {props.title}
    </Text>
  )
}

export const styleInputDisable: InputProps = {
  textAlign: "left",
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "20px",
};

export const styleInput: InputProps = {
  ...styleInputDisable,
  borderWidth: "1px",
  borderStyle: "solid",
  borderRadius: "10px",
  background: "#F7F9FA",
};
