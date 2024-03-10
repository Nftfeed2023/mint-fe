import { Button, ButtonProps } from '@chakra-ui/react'

const TextButton = ({ children, disabled, ...props }: ButtonProps) => {
  return (
    <Button
      w="100%"
      bg="white"
      textTransform="uppercase"
      color="#666666"
      fontWeight="bold"
      fontSize="16px"
      disabled={disabled}
      _disabled={{
        backgroundColor: '#E8E8E8',
        color: '#979797',
      }}
      _focus={{
        backgroundColor: '#FFFFFF',
        color: '#666666',
      }}
      _hover={{
        backgroundColor: disabled ? '#E8E8E8' : 'white',
        color: '#666666',
        boxShadow:
          '0px -2px 10px rgba(0, 0, 0, 0.04), 0px 4px 10px rgba(0, 0, 0, 0.04)',
      }}
      _active={{
        backgroundColor: '#FFFFFF',
        color: '#666666',
      }}
      _loading={{
        backgroundColor: '#FFFFFF',
        color: '#666666',
      }}
      loadingText={typeof children === 'string' ? children : ''}
      //   py={{
      //     base: '10px',
      //     lg: '14px',
      //   }}
      {...props}
    >
      {children}
    </Button>
  )
}

export default TextButton
