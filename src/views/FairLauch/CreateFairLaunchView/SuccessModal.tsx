import {
  ModalOverlay,
  Modal,
  ModalBody,
  useColorMode,
  ModalContent,
  Box,
  Text,
  VStack,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import PrimaryButton from "~/components/PrimaryButton";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";

interface IProps {
  isOpen?: boolean;
  presaleAddress: string;
  onClose?: () => void;
}

export const SuccessModal = (props: IProps) => {
  const { isOpen, presaleAddress, onClose } = props;
  const { colorMode } = useColorMode();
  const history = useNavigate();
  const { chainId } = useConnectWallet();

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      isCentered
    >
      <ModalOverlay backdropFilter="blur(1px)" />
      <ModalContent
        borderRadius={"12px"}
        borderWidth={"1px"}
        borderStyle="solid"
        borderColor={`transparent`}
        maxWidth={{
          base: "full",
          md: "578px",
        }}
        w={{
          base: "fit-content",
          md: "578px",
        }}
      >
        <ModalBody p="0px" background="transparent">
          <Box w="full" p="10px 15px 30px" borderRadius={"24px"}>
            <Text
              className="textSpinWheel"
              fontSize={{ base: "24px", md: "38px" }}
              textTransform={"capitalize"}
              textAlign={"center"}
              fontWeight={500}
            >
              Create Presale success
            </Text>

            <VStack spacing={2}>
              <Divider borderBottomColor={"#ccc"} />

              <Text
                pt="20px"
                fontSize={{ base: "16px", md: "18px" }}
                textAlign={"center"}
                fontWeight={400}
              >
                All right! You have successfully created the Presale Pool.
              </Text>

              <VStack
                w="full"
                pt="20px"
              >
                <PrimaryButton
                  onClick={() => {
                    history(
                      "/feedipad/" + chainId + "/" + presaleAddress
                    );
                  }}
                >
                  Check your Presale Pool
                </PrimaryButton>
              </VStack>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
