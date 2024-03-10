import {
  Box,
  HStack,
  Image,
  Spacer,
  Text,
  Icon,
  VStack,
  Stack,
} from '@chakra-ui/react'
import { useCountDown } from 'ahooks'
import { ReactComponent as DepositIcon } from '~/assets/svgs/demo/deposit.svg'

const LaunchpadCard = ({}) => {
  const [countdown, formattedRes] = useCountDown({
    targetDate: '2022-12-31 24:00:00',
  })
  const { days, hours, minutes, seconds, milliseconds } = formattedRes

  return (
    <Box bg="white" borderRadius="10px" px="20px" py="25px">
      <Stack
        direction={{
          base: 'column',
          xl: 'row',
        }}
      >
        <Box
          flex={1}
          h="100%"
          order={{
            base: 2,
            xl: 1,
          }}
        >
          <VStack alignItems="flex-start">
            <Text
              fontSize="24px"
              lineHeight="28px"
              letterSpacing="-0.5px"
              color="black.light"
              fontWeight="600"
            >
              Hesman Legend
            </Text>
            <Box>
              <Box
                mt="20px"
                bg="#709DFF"
                textAlign="center"
                borderRadius="10px"
                px="15px"
                py="5px"
              >
                <Text
                  fontSize={{
                    xl: '20px',
                    xxl: '24px',
                  }}
                  letterSpacing="-0.5px"
                  fontWeight="600"
                  color="white"
                >
                  {days} days {hours} : {minutes} : {seconds}
                </Text>
              </Box>
            </Box>
            <Spacer />
            <Box w="100%">
              <HStack mt="10px">
                <Text
                  fontSize="18px"
                  fontWeight="400"
                  lineHeight="21px"
                  color="rgba(31, 34, 40, 0.89)"
                >
                  Total items
                </Text>
                <Spacer />
                <Text
                  fontSize="18px"
                  lineHeight="21px"
                  letterSpacing="-0.5px"
                  color="blue.darker"
                  fontWeight="600"
                >
                  100 NFTs
                </Text>
              </HStack>
              <HStack>
                <Text
                  fontSize="18px"
                  fontWeight="400"
                  lineHeight="21px"
                  color="rgba(31, 34, 40, 0.89)"
                >
                  Deposit
                </Text>
                <Spacer />
                <Icon as={DepositIcon} w="35px" h="35px" />
              </HStack>
            </Box>
          </VStack>
        </Box>
        <Box
          flex={1}
          order={{
            base: 1,
            xl: 2,
          }}
        >
          <Image
            src="/assets/images/demo/banner-2.png"
            w="100%"
            h="100%"
            borderRadius="8px"
          />
        </Box>
      </Stack>
    </Box>
  )
}

export default LaunchpadCard
