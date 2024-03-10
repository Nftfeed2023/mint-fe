import { Box, Button, Text, Tooltip } from '@chakra-ui/react'
import React, { useState } from 'react'
import useCopyToClipboard from '~/hooks/@global/useCopyToClipboard'

const WrapperCopy = ({ copyText, children, popupText = 'Copy Address' }) => {
  const [, copy] = useCopyToClipboard()
  const [isCopied, setIsCopied] = useState(false)
  return (
    <Tooltip
      hasArrow
      label={
        <Text fontWeight="500" fontSize={14} lineHeight="140%" color="#F5F5F5">
          {isCopied ? 'Copied!' : popupText}
        </Text>
      }
      bg="secondary"
      p="10px"
      borderRadius="8px"
      defaultIsOpen={false}
      closeOnClick={false}
    >
      <Box
        onClick={() => {
          copy(copyText)
          setIsCopied(true)
          setTimeout(() => {
            setIsCopied(false)
          }, 500)
        }}
        cursor="pointer"
      >
        {children}
      </Box>
    </Tooltip>
  )
}

export default WrapperCopy
