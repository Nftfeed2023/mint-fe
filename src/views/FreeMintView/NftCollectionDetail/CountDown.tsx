import {
  Text,
  HStack,
  useColorMode,
  VStack,
  SimpleGrid,
} from '@chakra-ui/react'

import { FC, } from 'react'
import { useTimer } from 'react-timer-hook'
import useWindowSize from "~/hooks/useWindowSize"
type IProps = {
  time: Date
  title?: string,
}

const CustomTimeShow = ({ title, time, isSecond = false }) => {

  const { colorMode, } = useColorMode();
  return (
    <VStack spacing={0} w="max-content" pr="5px">
      <HStack spacing={1}>
        <Text
          color={`${colorMode}.tPrimary`}
          fontSize={{ base: "11px" }}
          lineHeight={{ base: "16px" }}
          textTransform={"capitalize"}
          fontFamily={"Josefin-Bold"}
        >
          {time < 10 ? `0${time}` : time}
        </Text>
      </HStack>
    </VStack>

  )
}

export const CountDown: FC<IProps> = (props: IProps) => {
  const { time, } = props;
  const { width } = useWindowSize();
  const { colorMode, } = useColorMode();

  const {
    seconds,
    minutes,
    hours,
    days,
  } = useTimer({
    expiryTimestamp: time,
    // onExpire: () => console.warn('onExpire called'),
  });

  return (
    <SimpleGrid
      spacing={0}
      columns={{ base: 7 }}
      w={{ base: "120px", sm: "full" }}
      alignItems={"center"}
    >
      <CustomTimeShow title={width <= 500 ? "D" : "Day"} time={days} />

      <VStack>
        <Text
          color={`${colorMode}.tPrimary`}
          fontFamily={"Josefin-Bold"}
          fontSize={{ base: "11px" }}
        >
          :
        </Text>
      </VStack>

      <CustomTimeShow title={width <= 500 ? "H" : "Hrs"} time={hours} />

      <VStack>
        <Text
          color={`${colorMode}.tPrimary`}
          fontFamily={"Josefin-Bold"}
          fontSize={{ base: "11px" }}
        >
          :
        </Text>
      </VStack>
      <CustomTimeShow title={width <= 500 ? "M" : "Mins"} time={minutes} />

      <VStack>
        <Text
          color={`${colorMode}.tPrimary`}
          fontFamily={"Josefin-Bold"}
          fontSize={{ base: "11px" }}
        >
          :
        </Text>
      </VStack>

      <CustomTimeShow title={width <= 500 ? "S" : "Sec"} time={seconds} isSecond={true} />
    </SimpleGrid>
  )
}
