import { Button, ButtonProps, Icon } from '@chakra-ui/react'
import { useWalletModal } from '~/hooks/@global/useWalletModal'

import { ReactComponent as WalletIcon } from '~/assets/svgs/wallet.svg'
import { useConnectWallet } from '~/hooks/@global/useConnectWallet'

const ConnectWalletButtonSecondary = (
  props: { fullText?: boolean; name?: string } & ButtonProps,
) => {
  const { login } = useConnectWallet()
  const { onPresentConnectModal } = useWalletModal(login)
  return (
    <Button
      h="auto"
      mt="26px"
      w="100%"
      leftIcon={<Icon as={WalletIcon} color="yellow.dark" w="24px" h="24px" />}
      bg="white !important"
      border="2px solid #DFE6F1"
      borderRadius="12px"
      fontSize="20px"
      lineHeight="23px"
      color="black.light"
      minW="120px"
      py="10px"
      fontWeight="700"
      _focus={{
        backgroundColor: 'yellow.primary',
      }}
      _hover={{
        backgroundColor: '#F9E8C8',
      }}
      _active={{
        backgroundColor: 'yellow.primary',
      }}
      _loading={{
        bgColor: '#ee3824',
      }}
      onClick={onPresentConnectModal}
      {...props}
    >
      {props.name ? props.name : props.fullText ? 'CONNECT WALLET' : 'CONNECT'}
    </Button>
  )
}

export default ConnectWalletButtonSecondary
