import { Button, ButtonProps } from '@chakra-ui/react'
import { useConnectWallet } from '~/hooks/@global/useConnectWallet'

import { useWalletModal } from '~/hooks/@global/useWalletModal'

const ConnectWalletButton = ({
  hiddenText,
  ...props
}: {
  fullText?: boolean
  name?: string
  hiddenText?: boolean
} & ButtonProps) => {
  const { login } = useConnectWallet()
  const { onPresentConnectModal } = useWalletModal(login)
  return (
    <Button
      bg="yellow.primary"
      minW="120px"
      color="black.1d"
      fontSize="15px"
      lineHeight="18px"
      fontWeight="500"
      _disabled={{
        backgroundColor: '#E8E8E8',
        color: '#979797',
      }}
      _focus={{
        backgroundColor: '#ee3824',
        color: '#000000',
      }}
      _hover={{
        backgroundColor: props.disabled ? '#E8E8E8' : '#ee3824',
        boxShadow:
          '0px -2px 10px rgba(0, 0, 0, 0.04), 0px 4px 10px rgba(0, 0, 0, 0.04)',
      }}
      _active={{
        backgroundColor: '#ee3824',
        color: '#000000',
      }}
      _loading={{
        backgroundColor: '#ee3824',
        color: '#000000',
      }}
      loadingText={typeof props.children === 'string' ? props.children : ''}
      py={{
        base: '9px',
      }}
      onClick={onPresentConnectModal}
      {...props}
    >
      {!hiddenText &&
        (props.name
          ? props.name
          : props.fullText
            ? props.fullText
            : 'Connect Wallet')}
    </Button>
  )
}

export default ConnectWalletButton
