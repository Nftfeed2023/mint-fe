import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  InputProps,
  Spacer,
  VStack,
  useDisclosure,
  Text,
  Image,
  Input,
  RadioGroup,
  Stack,
  Radio,
  SimpleGrid,
  Divider,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import * as yup from "yup";
import ModalSwitchChain from "~/container/ModalSwitchChain";
import { EVM_CHAIN_LIST } from "~/@config/chain-list";
import FormItem from "../../Manager/FormItem";
import PrimaryButton from "~/components/PrimaryButton";
import { styleInput } from "~/@ui/common";
import { useCallback, useEffect, useState } from "react";
import { CreateTokenModal } from "./CreateTokenModal";
import { TextHorizon } from "~/@ui/TextHorizon";
import { ILauchPool } from "~/dto/ILauchPool";
import { useTokens } from "./hooks/useTokens";

const validationSchema = yup.object().shape({
  chainId: yup.number(),
  tokenAddress: yup.string().required("Token Address is a required field"),
  fee: yup.string().required(),
});

export const Step1 = (props: {
  setActiveStep: () => void;
  onSaveLauchPool: (values: ILauchPool) => void;
  launchPool: ILauchPool;
}) => {
  const { setActiveStep, onSaveLauchPool, launchPool } = props;
  const { chainId, account } = useConnectWallet();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openModal, setOpenModal] = useState(false);

  const {
    isLoading: loadingTokenAddress,
    tokenInfo,
    loadTokensInfo,
  } = useTokens({});

  const { chainName, logo, dislayName, nativeCurrency } = EVM_CHAIN_LIST[
    chainId
  ] || {
    chainName: "",
    logo: "",
    dislayName: "",
    nativeCurrency: { symbol: "" },
  };

  const formik = useFormik({
    initialValues: {
      chainId,
      tokenAddress: "",
      fee: "5",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        onSaveLauchPool({
          ...values,
          chainId,
          fee: parseInt(values.fee),
          tokenSymbol: tokenInfo.tokenSymbol,
          tokenName: tokenInfo.tokenName,
          tokenDecimals: tokenInfo.decimals,
        });
        setActiveStep();
      } catch (error) { }
    },
  });

  useEffect(() => {
    console.log({ launchPool });

    if (launchPool) {
      formik.setValues({
        chainId: chainId,
        tokenAddress: launchPool.tokenAddress,
        fee: "5",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, launchPool]);

  useEffect(() => {
    if (launchPool.tokenAddress) {
      loadTokensInfo(launchPool.tokenAddress);
    }
  }, [launchPool.tokenAddress,])

  const handleTokenInfo = useCallback(async () => {
    try {
      await loadTokensInfo(formik.values.tokenAddress);
    } catch (error) {
      console.log({ error });
    }
  }, [formik.values.tokenAddress, loadTokensInfo]);

  return (
    <Box>
      <VStack width={"full"}>
        <VStack
          pt="50px"
          w={{ base: "100%", lg: "50%" }}
          spacing={0}
        >
          <form
            style={{
              width: "100%",
            }}
            onSubmit={formik.handleSubmit}
          >
            <VStack spacing={4}>

              <Text
                fontWeight="600"
                fontSize={{ base: "16px", }}
                textAlign={"left"}
                alignSelf={"start"}
                className="textPrimary"
                p="0px"
              >
                Pool create fee : 100 ZETA
              </Text>

              <FormControl
                isRequired
                isInvalid={Boolean(
                  formik.errors["chainId"] && formik.touched["chainId"]
                )}
              >
                <FormLabel>Select chain</FormLabel>
                <Box
                  cursor="pointer"
                  key={chainId}
                  onClick={onOpen}
                  role="group"
                  borderColor="#ee3824"
                  borderWidth="1px"
                  borderStyle="solid"
                  borderRadius="10px"
                >
                  <Flex gap={2}>
                    <HStack
                      p={2}
                      borderRadius="8px"
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
                      <Image src={logo} w="30px" h="30px" />
                      <Text fontSize="16px" lineHeight="19px" fontWeight="bold">
                        {dislayName || chainName || ""}
                      </Text>
                    </HStack>

                    <Spacer />

                    <ButtonGroup gap="2">
                      <Button
                        onClick={onOpen}
                        bg="yellow.primary !important"
                        borderRadius="8px"
                        fontWeight="600"
                        fontSize="16px"
                        lineHeight="18px"
                        h="auto"
                        py="5px"
                        color="black.1d"
                        w="full"
                        p="10px"
                      >
                        Select chain
                      </Button>
                    </ButtonGroup>
                  </Flex>
                </Box>
                {formik.errors["chainId"] && formik.touched["chainId"] && (
                  <FormErrorMessage>
                    {formik.errors["chainId"] as string}
                  </FormErrorMessage>
                )}
              </FormControl>

              <VStack w="full">
                <FormItem
                  formik={formik}
                  name="tokenAddress"
                  label="Token Smart Contract"
                  isRequired
                >
                  <HStack w="full">
                    <InputGroup>
                      <Input
                        value={formik.values.tokenAddress}
                        onBlur={handleTokenInfo}
                        onChange={(e) => {
                          formik.setFieldValue("tokenAddress", e.target.value);
                        }}
                        placeholder="Ex: NFTFeed"
                        {...styleInput}
                      />
                      {loadingTokenAddress && (
                        <InputRightElement width="4.5rem">
                          <Spinner color="#ee3824" size={"xs"} />
                        </InputRightElement>
                      )}
                    </InputGroup>
                    <PrimaryButton
                      w="fit-content"
                      onClick={() => {
                        setOpenModal(true);
                      }}
                    >
                      Create token
                    </PrimaryButton>
                  </HStack>
                </FormItem>
                <Text
                  fontWeight="400"
                  fontSize={{ base: "13px", }}
                  alignSelf={"start"}
                  color={"#8d8d8d"}
                >
                  Past your your project token smart contract to verify
                </Text>
              </VStack>

              <VStack alignItems={"left"} w="full" p="0px !important">
                <Box w="full">
                  <TextHorizon
                    title={`Name`}
                    value={`${tokenInfo?.tokenName}`}
                  />
                  <Divider />
                </Box>
                <Box w="full">
                  <TextHorizon
                    title={`Symbol`}
                    value={`${tokenInfo?.tokenSymbol}`}
                  />
                  <Divider />
                </Box>
                <Box w="full">
                  <TextHorizon
                    title={`Decimals`}
                    value={`${tokenInfo?.decimals || ""}`}
                  />
                  <Divider />
                </Box>
                <Box w="full">
                  <TextHorizon
                    title={`Currency`}
                    value={`${tokenInfo?.currency}`}
                  />
                  <Divider />
                </Box>
              </VStack>

              <FormControl
                isInvalid={Boolean(
                  formik.errors["fee"] && formik.touched["fee"]
                )}
              >
                <FormLabel>Fee Options</FormLabel>

                <RadioGroup
                  onChange={(e) => {
                    formik.setFieldValue("fee", e);
                  }}
                  value={formik.values.fee}
                >
                  <SimpleGrid w={"full"} columns={2}>
                    <Radio value="5">{`5% ${nativeCurrency.symbol || ""
                      } raised only`}</Radio>
                    <Radio value="1" disabled={true} isDisabled={true}>
                      Other
                    </Radio>
                  </SimpleGrid>
                </RadioGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Listing Options</FormLabel>

                <RadioGroup
                  onChange={(e) => {
                    // formik.setFieldValue("fee", e);
                  }}
                  defaultValue="0"
                >
                  <SimpleGrid w={"full"} columns={2}>
                    <Radio value="0">Auto Listing</Radio>
                    <Radio value="1" disabled={true} isDisabled={true}>
                      Manual Listing
                    </Radio>
                  </SimpleGrid>
                </RadioGroup>
              </FormControl>

              <Button
                bg="yellow.primary !important"
                borderRadius="8px"
                fontWeight="600"
                fontSize="16px"
                lineHeight="18px"
                h="auto"
                color="black.1d"
                w="100px"
                p="10px"
                type="submit"
                mt="25px"
                disabled={!account || !chainId || !tokenInfo}
              >
                Next
              </Button>
            </VStack>
          </form>
        </VStack>
      </VStack>

      <ModalSwitchChain isOpen={isOpen} onClose={onClose} />

      <CreateTokenModal
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        onLoadTokenInfo={async (tokenAddress: string) => {
          await formik.setFieldValue("tokenAddress", tokenAddress);
          await loadTokensInfo(tokenAddress);
        }}
      />
    </Box>
  );
};
