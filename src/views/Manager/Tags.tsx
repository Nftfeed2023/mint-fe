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
      <Text fontSize="14px" lineHeight="16px" fontWeight="500" color="#448AFF">
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
      <Text fontSize="14px" lineHeight="16px" fontWeight="500" color="#E2103D">
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
      <Text fontSize="14px" lineHeight="16px" fontWeight="500" color="orange">
        {props.value}
      </Text>
    </Box>
  )
}

export const TagCustom = (props: { value: number }) => {
  // Upcoming = 0,
  // Live,
  // Failed,
  // Success,
  // Listed,
  // Canceled
  const { value } = props;
  const tags = {
    0: {
      name: "Upcoming",
      color: "orange",
      bg: "#FFFBEA",
    },
    1: {
      name: "Live",
      color: "#448AFF",
      bg: "#DFE9FF",
    },
    2: {
      name: "Failed",
      color: "#E2103D",
      bg: "#FFF1E4",
    },
    3: {
      name: "Success",
      color: "#87d068",
      bg: "#FFFBEA",
    },
    4: {
      name: "Listed",
      color: "#108ee9",
      bg: "#DFE9FF",
    },
    5: {
      name: "Cancel",
      color: "#E2103D",
      bg: "#FFF1E4",
    },
  }

  return (
    <Box
      bg={tags[value].bg}
      borderRadius="10px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      py="6px"
      px="12px"
    >
      <Text fontSize="14px" lineHeight="16px" fontWeight="600" color={tags[value].color}>
        {tags[value].name}
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
      <Text fontSize="14px" lineHeight="16px" fontWeight="500" color="#448AFF">
        {props.value}
      </Text>
    </Box>
  )
}
