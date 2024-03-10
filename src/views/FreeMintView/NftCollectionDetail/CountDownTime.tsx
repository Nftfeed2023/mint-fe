

import { HStack, Box } from "@chakra-ui/react";

import React, { FC } from 'react'
import { useTimer } from "react-timer-hook";



type ICountDownTimeProps = {
  endTime: Date;
  title: string;
  fontSize?: string;
  bg?: string;
  color?: string;
}

const Item = ({ timeValue, title, fontSize, bg, color }: {
  timeValue: number, title: string;
  fontSize?: string;
  bg?: string;
  color?: string;
}) => {
  if (timeValue >= 10) {
    return <Box bg={bg} m={"2px"} borderRadius={"4px"} color={color} fontSize={fontSize}>
      {timeValue}
    </Box>
  }
  return <Box bg={bg} borderRadius={"4px"} color={color} fontSize={fontSize}>
    {`0${timeValue}`}
  </Box>
}

const CountDownTime: FC<ICountDownTimeProps> = (props: ICountDownTimeProps) => {
  const { endTime, title, fontSize = "16px", bg, color } = props;
  const {
    seconds,
    minutes,
    hours,
    days,
  } = useTimer({
    expiryTimestamp: endTime,
    // onExpire: () => console.warn('onExpire called'),
  });
  return (
    <HStack>
      <Box fontSize={fontSize}>
        {title}
      </Box>
      <Item
        {...{ endTime, title, fontSize, bg, color }}
        timeValue={days}
      />
      <Box fontSize={fontSize}>
        :
      </Box>
      <Item
        {...{ endTime, title, fontSize, bg, color }}
        timeValue={hours}
      />
      <Box fontSize={fontSize}>
        :
      </Box>

      <Item
        {...{ endTime, title, fontSize, bg, color }}
        timeValue={minutes}
      />
      <Box fontSize={fontSize}>
        :
      </Box>

      <Item
        {...{ endTime, title, fontSize, bg, color }}
        timeValue={seconds}
      />

    </HStack>
  )
}
export default CountDownTime;
