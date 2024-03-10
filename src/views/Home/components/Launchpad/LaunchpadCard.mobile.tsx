import { Box, HStack, Spacer, Text, VStack } from '@chakra-ui/react'
import { useCountDown } from 'ahooks'
import { useTranslation } from 'react-i18next'

const LaunchpadCardMobile = ({ index }) => {
  const { t } = useTranslation('')

  const [countdown, formattedRes] = useCountDown({
    targetDate: '2022-12-31 24:00:00',
  })
  const { days, hours, minutes, seconds, milliseconds } = formattedRes

  return (
    <Box
      bgImage="url('/assets/images/demo/collection-monkey.png')"
      bgPosition="center"
      bgSize="cover"
      bgRepeat="no-repeat"
      h="248px"
      maxW="220px"
      borderRadius="10px"
    >
      <VStack
        w="100%"
        justifyContent="space-between"
        h="100%"
        borderRadius="10px"
        alignItems="flex-start"
      >
        <Box
          bg="rgba(0, 5, 46, 0.5)"
          backdropFilter="blur(20px)"
          borderRadius="20px"
          px="13px"
          py="5px"
          m="10px"
        >
          <Text
            w="165px"
            fontWeight="600"
            color="white"
            lineHeight="24px"
            fontSize="16px"
          >
            {days} days {hours} : {minutes >= 10 ? minutes : `0${minutes}`} :{' '}
            {seconds >= 10 ? seconds : `0${seconds}`}
          </Text>
        </Box>
        <Box
          bg="rgba(0, 5, 46, 0.5)"
          w="100%"
          backdropFilter="blur(20px)"
          p="10px"
          borderRadius="10px"
        >
          <HStack w="100%">
            <Box>
              <Text
                fontSize="12px"
                fontWeight="600"
                lineHeight="18px"
                color="white"
              >
                CALIMOVE MONKEY
              </Text>
            </Box>
            <Spacer />
            <Text
              fontSize="10px"
              fontWeight="600"
              lineHeight="15px"
              color="white"
            >
              {index} ETH
            </Text>
          </HStack>
          {/* <Text
            mt="4px"
            fontSize="10px"
            fontWeight="500"
            lineHeight="12px"
            color="white"
          >
            Created by CryptoPunk
          </Text> */}
        </Box>
      </VStack>
    </Box>
  )
}

export default LaunchpadCardMobile
