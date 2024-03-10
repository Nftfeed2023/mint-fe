import React, { useEffect, useRef } from "react";
import {
  ModalOverlay,
  Modal,
  ModalBody,
  useColorMode,
  ModalContent,
  Box,
  Text,
  VStack,
  Image,
  ModalCloseButton,
  Divider,
  HStack,
  Center,
  SimpleGrid,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import CopyImage from "~/assets/images/home/icon_copy.png";
import PrimaryButton from "~/components/PrimaryButton";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";

interface IProps {
  isOpen?: boolean;
  collectionAddress: string;
  onClose?: () => void;
}

export const RemindModal = (props: IProps) => {
  const { isOpen, collectionAddress, onClose } = props;
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
        <ModalCloseButton
          color={"black"}
          onClick={() => {
            onClose();
          }}
        />
        <ModalBody p="0px" background="transparent">
          <Box w="full" p="10px 15px 30px" borderRadius={"24px"}>
            <Text
              className="textSpinWheel"
              fontSize={{ base: "24px", md: "38px" }}
              textTransform={"capitalize"}
              textAlign={"center"}
              fontWeight={500}
            >
              Create project success
            </Text>

            <VStack spacing={2}>
              <Divider borderBottomColor={"#ccc"} />

              <Text
                pt="20px"
                fontSize={{ base: "16px", md: "18px" }}
                textAlign={"center"}
                fontWeight={400}
              >
                All right! One last final step,
                <strong style={{ color: "#ee3824" }}>
                  {" "}
                  mint at least 1 NFT
                </strong>{" "}
                to officially publish your collection on the
                <strong style={{ color: "#ee3824" }}>
                  {" "}
                  mint.nftfeed.guru
                </strong>{" "}
                homepage.
              </Text>
              <SimpleGrid
                w="full"
                pt="20px"
                spacing={2}
                columns={{ base: 1, md: 2 }}
              >
                <PrimaryButton opacity={0.8} onClick={onClose}>
                  Cancel
                </PrimaryButton>

                <PrimaryButton
                  onClick={() => {
                    history(
                      "/nft-collection/" + chainId + "/" + collectionAddress
                    );
                  }}
                >
                  Go to Project
                </PrimaryButton>
              </SimpleGrid>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
