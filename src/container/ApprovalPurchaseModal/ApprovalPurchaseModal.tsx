import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  HStack,
  Box,
  Divider,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import ConnectWalletButton from '~/components/ConnectWalletButton'
import PrimaryButton from '~/components/PrimaryButton'
import { useConnectWallet } from '~/hooks/@global/useConnectWallet'
import { useMarket } from '~/hooks/market'

const ApprovalPurchaseModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation(
    'src/container/ApprovalPurchaseModal/ApprovalPurchaseModal.lang.json',
  )
  const { account } = useConnectWallet();

  const { isLoading, approveBusd } = useMarket()

  const onClickClose = useCallback(() => {
    if (isLoading) {
      return
    }

    onClose()
  }, [isLoading, onClose])

  const onClickApproval = useCallback(async () => {
    const result = await approveBusd()

    if (result) {
      onClickClose()
    }
  }, [approveBusd, onClickClose])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClickClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW="504px">
          <ModalHeader
            fontSize="18px"
            lineHeight="21px"
            fontWeight="500"
            letterSpacing="-0.5px"
          >
            {t('title')}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider />
            <Text
              mt="20px"
              fontWeight="400"
              fontSize="16px"
              lineHeight="26px"
              color="black.1d"
            >
              {t('description')}
            </Text>

            <Text
              mt="16px"
              fontSize="16px"
              lineHeight="26px"
              color="#5F6774"
              fontWeight="400"
              fontStyle="italic"
            >
              {t('note')}
            </Text>
          </ModalBody>

          <ModalFooter w="100%" mt="30px">
            {account ? (
              <HStack flex={1} w="100%">
                <Box flex={1}>
                  <Button
                    w="100%"
                    fontSize="20px"
                    lineHeight="23px"
                    color="black.1d"
                    letterSpacing="-0.5px"
                    fontWeight="500"
                    borderRadius="12px"
                    border="2px solid #DFE6F1"
                    onClick={onClickClose}
                    py="18px"
                    h="auto"
                    bg="white !important"
                    disabled={isLoading}
                  >
                    {t('cancel')}
                  </Button>
                </Box>

                <Box flex={1}>
                  <PrimaryButton
                    w="100%"
                    fontSize="20px"
                    lineHeight="23px"
                    onClick={onClickApproval}
                    py="16px"
                    isLoading={isLoading}
                    h="auto"
                  >
                    {t('approve')}
                  </PrimaryButton>
                </Box>
              </HStack>
            ) : (
              <Box w="100%">
                <ConnectWalletButton w="100%" />
              </Box>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ApprovalPurchaseModal
