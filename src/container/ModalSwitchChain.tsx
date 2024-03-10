import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
  Box, Text, Image,
  Divider, HStack, SimpleGrid,
} from "@chakra-ui/react";
import { FC } from 'react'
import { configEnv } from "~/@config";
import { useSwitchChain } from "~/hooks/@global/useSwitchChain";


type IModalSwitchChainProps = {
  isOpen: boolean;
  onClose: () => void;
}
const { EVM_CHAINS } = configEnv();
const ModalSwitchChain: FC<IModalSwitchChainProps> = (props: IModalSwitchChainProps) => {
  const { onClose, isOpen } = props;
  const switchChain = useSwitchChain();

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset='slideInBottom'
    >
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
              Select chain support
            </Text>
          </Box>
          <Divider mt="20px" mb="20px" />
          <SimpleGrid
            columns={{
              md: 2,
              lg: 2,
              xl: 2,
              '2xl': 2,
            }}
            spacing={2}
          >
            {EVM_CHAINS.map(({ chainId, chainName, dislayName, logo }) => (
              <Box
                cursor="pointer"
                key={chainId}
                onClick={async () => {
                  await switchChain(chainId).then(_ => onClose()).catch()
                }}
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
                    {dislayName || chainName || ""}
                  </Text>
                </HStack>
              </Box>
            ))}
          </SimpleGrid>
          <Divider mt="20px" mb="20px" />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
export default ModalSwitchChain;
