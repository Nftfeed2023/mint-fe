import { Button, ButtonProps } from '@chakra-ui/react'

const SecondaryButton = ({ children, disabled, ...props }: ButtonProps) => {
  return (
    <Button
      w="100%"
      bg="white"
      textTransform="uppercase"
      color="#383C4A"
      fontWeight="500"
      fontSize="14px"
      disabled={disabled}
      borderWidth="1.5px"
      borderRadius="12px"
      borderColor="#000"
      borderStyle="solid"
      _disabled={{
        backgroundColor: '#E8E8E8',
        color: 'subText',
      }}
      _focus={{
        backgroundColor: '#F7F9FA',
        color: '#383C4A',
      }}
      _hover={{
        backgroundColor: disabled ? '#E8E8E8' : 'white',
        boxShadow:
          '0px -2px 10px rgba(0, 0, 0, 0.04), 0px 4px 10px rgba(0, 0, 0, 0.04)',
      }}
      _active={{
        backgroundColor: '#F7F9FA',
        color: '#383C4A',
      }}
      _loading={{
        backgroundColor: '#ee3824',
        color: '#383C4A',
      }}
      loadingText={typeof children === 'string' ? children : ''}
      py={{
        base: '9px',
      }}
      {...props}
    >
      {children}
    </Button>
  )
}

export default SecondaryButton
