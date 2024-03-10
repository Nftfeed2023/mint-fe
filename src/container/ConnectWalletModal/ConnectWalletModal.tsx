import { FC, useCallback } from 'react'
import { Connector } from "@web3-react/types";
import {
  ModalOverlay,
  Modal,
  ModalContent,
  ModalCloseButton,
  HStack,
  Text,
  ModalHeader,
  Box,
  ModalBody,
  SimpleGrid,
  Icon,
  Divider,
  Image,
} from '@chakra-ui/react'
import coinbase_Logo from "~/assets/wallets/coinbase_Logo.png";
import metamask_Logo from "~/assets/wallets/metamask_Logo.svg";
import okx_logo from "~/assets/wallets/okx.png";
import walletconnect_Logo from "~/assets/wallets/walletconnect_Logo.svg";
import { coinbaseConnector, evmConnectors, metaMaskConnector, walletConnectConnectorV2 } from "~/@web3-config/evm";



const mapWalletInfos = {
  metaMask: {
    key: "metaMask",
    label: "MetaMask",
    logo: metamask_Logo,
    connector: metaMaskConnector
  },
  walletConnect: {
    key: "walletConnect",
    label: "WalletConnect",
    logo: walletconnect_Logo,
    connector: walletConnectConnectorV2
  },
  coinbase: {
    key: "coinbase",
    label: "Coinbase Wallet",
    logo: coinbase_Logo,
    connector: coinbaseConnector
  },
  okx: {
    key: "okx",
    label: "OKX Wallet",
    logo: okx_logo,
    connector: metaMaskConnector
  }
}

const walletInfos = Object.values(mapWalletInfos);

export const mapConnector = walletInfos.reduce<{ [key: string]: Connector }>((res, item) => {
  return {
    ...res,
    [item.key]: item.connector,
  }
}, {});

export type IWalletKey = keyof typeof mapWalletInfos;

interface IConnectorWalletModal {
  isOpen?: boolean
  onDismiss?: () => void
  login?: any
}

const ConnectorWalletModal: FC<IConnectorWalletModal> = ({
  login,
  isOpen,
  onDismiss: onClose = () => {
    return null
  },
}) => {

  const activateConnector = useCallback(async (connector: Connector, key: string) => {
    try {
      //  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
      onClose()
      await login(connector, key);
    } catch (error) {
      console.log(`-------------------`);
      console.log(error);
      console.log(`-------------------`);
    }
  }, [login, onClose]);

  return (
    <Modal isOpen={isOpen || false} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxWidth="642px" w="100%" borderRadius="12px" mx="15px">
        <ModalHeader bg="#FFFFFF" borderRadius="12px" />
        <ModalCloseButton bg="#FFF" />
        <ModalBody bg="#FFFFFF" px="15px" borderRadius="12px">
          <Box>
            <Text
              fontSize="22px"
              lineHeight="27px"
              color="secondary"
              fontWeight="bold"
              textAlign="center"
              textTransform="uppercase"
            >
              Connect to a wallet
            </Text>
          </Box>
          <Divider mt="27px" mb="20px" />
          <SimpleGrid
            columns={{
              md: 2,
              lg: 2,
              xl: 2,
              '2xl': 2,
            }}
            spacing={2}
          >
            {walletInfos.map(({ key, label, logo, connector }) => (
              <Box
                cursor="pointer"
                key={key}
                onClick={() => activateConnector(connector, key)}
                bg="white"
                role="group"
              >
                <HStack
                  bg="#FAFCFE"
                  borderRadius="8px"
                  color="secondary"
                  border="1px solid #f5f5f5"
                  _hover={{
                    bg: '#F2F2F2',
                    color: 'subText',
                    borderRadius: '8px',
                  }}
                  alignItems="center"
                  px={{
                    base: '20px',
                    md: '25px',
                  }}
                  py="4px"
                  spacing={{
                    base: '5px',
                    md: '12px',
                  }}
                >
                  <Box>
                    <Image src={logo} w="64px" h="64px" />
                  </Box>
                  <Text
                    fontSize="16px"
                    lineHeight="19px"
                    fontWeight="bold"
                    pl="20px"
                  >
                    {label}
                  </Text>
                </HStack>
              </Box>
            ))}
          </SimpleGrid>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ConnectorWalletModal
