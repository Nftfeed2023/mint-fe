import {
  Box,
  Image,
  Center,
  Text,
  HStack,
  Spacer,
  Button,
} from '@chakra-ui/react'

export const KYCTag = () => {
  return (
    <Box
      bg="#F5FFF4"
      borderRadius="10px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      py="6px"
      px="12px"
    >
      <Text fontSize="14px" lineHeight="16px" fontWeight="600" color="#26AC33">
        KYC
      </Text>
    </Box>
  )
}

export const TopVotingTag = () => {
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
      <Text fontSize="14px" lineHeight="16px" fontWeight="600" color="#F29F50">
        Top Voting
      </Text>
    </Box>
  )
}

export const DateTag = () => {
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
        May 2022
      </Text>
    </Box>
  )
}

export const AuditTag = () => {
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
      <Text fontSize="14px" lineHeight="16px" fontWeight="600" color="#448AFF">
        Audit
      </Text>
    </Box>
  )
}

export const TopTrending = () => {
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
        Top Trending
      </Text>
    </Box>
  )
}

export const StatusTag = ({ status = '' }) => {
  return (
    <Box
      bg="#ECECEC"
      borderRadius="6px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      py="6px"
      px="12px"
    >
      <Text fontSize="14px" lineHeight="16px" fontWeight="600" color="#979797">
        Closed
      </Text>
    </Box>
  )
}
