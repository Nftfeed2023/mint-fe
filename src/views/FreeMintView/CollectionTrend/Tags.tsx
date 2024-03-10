import { Box, Text } from "@chakra-ui/react"

export const TagBlue = (props: { value: string }) => {
  return (
    <Box
      bg="#DFE9FF"
      borderRadius="10px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      py="6px"
      px="12px"
    >
      <Text fontSize="12px" lineHeight="16px" fontWeight="600" color="#448AFF ">
        {props.value}
      </Text>
    </Box>
  )
}

export const TagRed = (props: { value: string }) => {
  return (
    <Box
      bg="#FFF1E4"
      borderRadius="10px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      py="6px"
      px="12px"
    >
      <Text fontSize="12px" lineHeight="16px" fontWeight="600" color="#F29F50">
        {props.value}
      </Text>
    </Box>
  )
}

export const TagOrange = (props: { value: string }) => {
  return (
    <Box
      bg="#FFFBEA"
      borderRadius="10px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      py="6px"
      px="12px"
    >
      <Text fontSize="14px" lineHeight="16px" fontWeight="600" color="#DFB800">
        {props.value}
      </Text>
    </Box>
  )
}


export const DateTag = (props: { value: string }) => {
  return (
    <Box
      bg="#DFE9FF"
      borderRadius="6px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      py="6px"
      px="12px"
    >
      <Text fontSize="14px" lineHeight="16px" fontWeight="600" color="#448AFF">
        {props.value}
      </Text>
    </Box>
  )
}
