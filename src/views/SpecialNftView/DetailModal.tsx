import {
  ModalOverlay,
  Modal,
  ModalBody,
  useColorMode,
  ModalContent,
  ModalCloseButton,
  Box,
} from '@chakra-ui/react'

import { useNavigate } from 'react-router-dom'
import { NftCollection } from '~/dto/nft-project.dto'
import { NftDetail } from './NftDetail'


interface IProps {
  isOpen?: boolean
  onClose?: () => void
  collection: NftCollection
  selectCol: string
}

export const DetailModal = (props: IProps) => {

  const {
    isOpen,
    collection,
    selectCol,
    onClose,
  } = props;

  const { colorMode, } = useColorMode();
  const history = useNavigate();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
    >
      <ModalOverlay
        backdropFilter='blur(1px)'
      />

      <ModalContent
        background="transparent"
      >
        <ModalCloseButton
          zIndex={99}
          color={"#000"}
          bg="#fff"
          onClick={() => {
            onClose();
          }}
        />

        <ModalBody
          p="0px"
          background="#fff"
          borderRadius={"12px"}
          borderWidth={"1px"}
          borderStyle="solid"
          borderColor={`transparent`}
          marginX="10px !important"
        >

          <Box
            w="full"
            p="15px 5px"
            borderRadius={"24px"}
          >

            <NftDetail
              collection={collection}
              selectCol={selectCol}
            />

          </Box>

        </ModalBody>

      </ModalContent>

    </Modal>
  )
}
