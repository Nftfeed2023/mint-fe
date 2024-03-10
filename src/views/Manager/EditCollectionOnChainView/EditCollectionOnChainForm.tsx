import "react-quill/dist/quill.snow.css";

import {
  Image,
  Button,
  Center,
  FormControl,
  FormLabel,
  Text,
  Box,
  HStack,
  useDisclosure,
  Flex,
  Spacer,
  Divider,
} from "@chakra-ui/react";

import { useCallback } from "react";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import { useParams } from "react-router-dom";
import { EVM_CHAIN_LIST } from "~/@config/chain-list";
import ModalSwitchChain from "~/container/ModalSwitchChain";

import { checkURLType } from "~/common/utils/common.utils";
import { useNftCollectionDetail } from "~/views/FreeMintView/hooks/useNftCollectionDetail";
import { useSwitchChain } from "~/hooks/@global/useSwitchChain";
import UpdatePrice from "./UpdatePrice";
import UpdateMaxTotalSupply from "./UpdateMaxTotalSupply";
import UpdatePromotion from "./UpdatePromotion";
import UpdateEndTime from "./UpdateEndTime";
import useWindowSize from "~/hooks/useWindowSize";

type IEditCollectionOnChainFormProps = {
  chainId: number;
};

const EditCollectionOnChainForm = (props: IEditCollectionOnChainFormProps) => {
  const { chainId } = useConnectWallet();
  const { address } = useParams();
  const switchChain = useSwitchChain();
  const { width } = useWindowSize();

  const { collection } = useNftCollectionDetail({
    address,
    chainId: props.chainId,
  });

  const { isOpen, onClose } = useDisclosure();
  const { chainName, logo, dislayName } = EVM_CHAIN_LIST[props.chainId] || {
    chainName: "",
    logo: "",
    dislayName: "",
    nativeCurrency: { symbol: "" },
  };

  const onSwitchChain = useCallback(() => {
    if (collection) {
      switchChain(collection?.chainId).catch();
    }
  }, [collection, switchChain]);

  const renderChainName = useCallback(() => {
    if (chainId !== collection?.chainId) {
      return (
        <Button
          mt="10px"
          bg="yellow.primary !important"
          borderRadius="8px"
          fontWeight="600"
          fontSize="16px"
          lineHeight="18px"
          h="auto"
          py="5px"
          color="#fff"
          w="full"
          p="10px"
          onClick={onSwitchChain}
          leftIcon={<Image src={logo} w="25px" h="25px" />}
        >
          {`Switch to ${chainName}`}
        </Button>
      );
    }
    return (
      <FormControl mb="3">
        <Box
          cursor="pointer"
          key={"chainId"}
          bg="white"
          role="group"
          borderColor="gray"
          borderWidth="1px"
          borderStyle="solid"
          borderRadius="10px"
        >
          <Flex gap={2}>
            <HStack
              p={2}
              bg="#FAFCFE"
              borderRadius="8px"
              color="secondary"
              border="1px solid #f5f5f5"
              alignItems="center"
              px={{
                base: "20px",
                md: "25px",
              }}
              py="4px"
              spacing={{
                base: "5px",
                md: "12px",
              }}
            >
              <Box>
                <Image src={logo} w="30px" h="30px" />
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
            <Spacer />
          </Flex>
        </Box>
      </FormControl>
    );
  }, [
    chainId,
    chainName,
    collection?.chainId,
    dislayName,
    logo,
    onSwitchChain,
  ]);

  return (
    <>

      <Text fontSize='3xl' fontWeight={"bold"} textAlign={"center"}>
        Edit OnChain Collection: {collection?.name}
      </Text>

      {renderChainName()}
      <FormControl mb="3">
        <FormLabel>NFT Image</FormLabel>
        <Center>
          {(checkURLType(collection?.image) === "Image" ||
            checkURLType(collection?.image) === "Other") && (
              <Image
                boxSize={"30%"}
                src={collection?.image}
                alt="NFT image"
                fallbackSrc={"https://placehold.co/512"}
              />
            )}
          {checkURLType(collection?.image) === "Video" && (
            <video
              style={{
                maxWidth: width <= 500 ? "280px" : "512px",
              }}
              src={collection?.image}
              muted
              autoPlay
              loop
            />
          )}
        </Center>
      </FormControl>
      <UpdateEndTime {...collection} />
      <UpdatePrice {...collection} />
      <UpdateMaxTotalSupply {...collection} />
      <Divider orientation="horizontal" h={"50px"} />
      <Text w={"full"} fontSize="3xl" fontWeight={"bold"}>
        Promotion setup
      </Text>
      <UpdatePromotion {...collection} />
      <ModalSwitchChain isOpen={isOpen} onClose={onClose} />

    </>
  );
};
export default EditCollectionOnChainForm;
