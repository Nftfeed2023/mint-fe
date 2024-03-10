import { Button, ButtonProps } from '@chakra-ui/react'

const PrimaryButton = ({ children, disabled, ...props }: ButtonProps) => {
  return (
    <Button
      w="100%"
      bg="yellow.primary"
      color="#fff"
      fontWeight="500"
      fontSize="16px"
      borderWidth="1.5px"
      borderColor="#ee3824"
      isDisabled={disabled}
      borderRadius="12px"
      _disabled={{
        opacity: .7,
        borderColor: '#E8E8E8 !important',
        backgroundColor: '#E8E8E8 !important',
        color: '#979797 !important',
        cursor: "not-allowed"
      }}
      _focus={{
        lg: {
          borderColor: '#ee3824',
          backgroundColor: '#ee3824',
          color: '#fff',
        }
      }}
      _hover={{
        lg: {
          borderColor: disabled ? '#E8E8E8' : '#ee3824',
          backgroundColor: disabled ? '#E8E8E8' : '#ee3824',
          boxShadow:
            '0px -2px 10px rgba(0, 0, 0, 0.04), 0px 4px 10px rgba(0, 0, 0, 0.04)',
        }
      }}
      _active={{
        lg: {
          borderColor: '#ee3824',
          backgroundColor: '#ee3824',
          color: '#fff',
        }
      }}
      _loading={{
        borderColor: '#ee3824',
        backgroundColor: '#ee3824',
        color: '#000000',
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

export default PrimaryButton
