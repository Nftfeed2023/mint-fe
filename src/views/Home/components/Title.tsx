import { Text } from '@chakra-ui/react'
import React from 'react'

const Title = ({ children }) => {
  return (
    <Text
      fontSize={{
        base: '22px',
        lg: '28px',
      }}
      lineHeight={{
        base: '26px',
        lg: '33px',
      }}
      letterSpacing="-0.5px"
      color="secondary"
      fontWeight={{
        base: '700',
        lg: '600',
      }}
    >
      {children}
    </Text>
  )
}

export default Title
