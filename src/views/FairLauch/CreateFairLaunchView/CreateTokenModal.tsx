import {
  Box,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Text,
  Input,
  RadioGroup,
  Radio,
  SimpleGrid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Divider,
  Center,
  FormErrorMessage,
  Image,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import * as yup from "yup";
import FormItem from "../../Manager/FormItem";
import { styleInput } from "~/@ui/common";
import useCustomToast from "~/hooks/@global/useCustomToast";
import { useTokens } from "./hooks/useTokens";
import DefUpload from "~/@ui/DefUpload";
import { checkURLType } from "~/common/utils/common.utils";
import { uploadApiService } from "~/services/@global";

const acceptImg = `image/png,image/jpeg,image/jpg,image/gif,image/webp,video/mp4,video/x-m4v,video/*`;

const validationSchema = yup.object().shape({
  kind: yup.string(),
  image: yup.string(),
  name: yup.string().required("Name is a required field"),
  symbol: yup.string().required("Symbol is a required field"),
  // decimals: yup.number().required(),
  totalSupply: yup.number().required("Total Supply is a required field"),
});

export const CreateTokenModal = (props: {
  isOpen?: boolean;
  onClose?: () => void;
  onLoadTokenInfo?: (tokenAddress: string) => Promise<void>;
}) => {
  const { isOpen, onClose, onLoadTokenInfo } = props;
  const toast = useCustomToast();
  const { chainId, account } = useConnectWallet();
  const { isLoading, createToken } = useTokens({});

  const formik = useFormik({
    initialValues: {
      kind: "erc721",
      image: "",
      name: "",
      symbol: "",
      decimals: 18,
      totalSupply: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {

        const { kind, image } = values;

        let rs = true;

        if (kind === "erc404" && !image) {
          toast.show({
            type: "warning",
            title: "Warning",
            subTitle: "Image is a required field",
          });
          rs = false;
        }

        if (rs) {
          await createToken(
            values.name,
            values.symbol,
            values.totalSupply,
            async (tokenAddress) => {
              await onLoadTokenInfo(tokenAddress);
              onClose();
            }
          );
        }

        // if (onLoadTokenInfo) {
        //   await onLoadTokenInfo();
        // }
      } catch (error) {
        toast.handleErrorBlockChain(error);
      }
    },
  });

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
            <VStack width={"full"}>
              <Text
                className="textSpinWheel"
                fontSize={{ base: "18px", md: "24px" }}
                textTransform={"capitalize"}
                textAlign={"center"}
                fontWeight={500}
              >
                Create Token
              </Text>

              <Divider my="10px" />

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
                    Token create fee : 50 ZETA
                  </Text>

                  <FormControl
                    mb="3"
                    isInvalid={Boolean(
                      formik.errors["kind"] && formik.touched["kind"]
                    )}
                  >
                    <FormLabel>Kind NFT</FormLabel>
                    <RadioGroup
                      value={formik.values.kind}
                      onChange={(value) => {
                        if (value !== "erc404") {
                          formik.setFieldValue("kind", value);
                        }
                      }}
                    >
                      <SimpleGrid w='full' spacing={4} columns={{ base: 1, md: 2 }}>
                        <Box {...styleInput} p="15px">
                          <Radio value='erc721' border="1px solid #000">ERC721</Radio>
                        </Box>
                        <Box {...styleInput} p="15px">
                          <Radio value='erc404' border="1px solid #000" disabled={true}> ERC404</Radio>
                        </Box>
                      </SimpleGrid>
                    </RadioGroup>
                  </FormControl>

                  {formik.values.kind === "erc404"
                    ? <FormControl
                      mb="3"
                      isRequired
                      isInvalid={Boolean(formik.errors["image"] && formik.touched["image"])}
                    >
                      <FormLabel>Token Image {`(<=1MB)`}</FormLabel>
                      <DefUpload
                        accept={acceptImg}
                        multiple={false}
                        name="image"
                        value={formik.values.image}
                        {...formik.getFieldProps("image")}
                        requestUpload={async (file) => {
                          const formData = new FormData();
                          formData.append("file", file);
                          try {
                            const res = await uploadApiService.uploadFile(
                              "https://cdn.nftfeed.guru/api/upload",
                              formData
                            );
                            return (res?.fullUrl as string) || "";
                          } catch (err) {
                            return "";
                          }
                        }}
                      >
                        <Center>
                          {(checkURLType(formik.values.image) === "Image" ||
                            checkURLType(formik.values.image) === "Other") && (
                              <Image
                                boxSize={"30%"}
                                src={formik.values.image}
                                alt="NFT image"
                                fallbackSrc={"https://placehold.co/512"}
                              />
                            )}
                          {checkURLType(formik.values.image) === "Video" && (
                            <video
                              style={{
                                maxWidth: "512px",
                              }}
                              src={formik.values.image}
                              muted
                              autoPlay
                              loop
                            />
                          )}
                        </Center>
                      </DefUpload>
                      {formik.errors["image"] && formik.touched["image"] && (
                        <FormErrorMessage>
                          {formik.errors["image"] as string}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                    : null
                  }

                  <FormControl>
                    <FormLabel>Token Type</FormLabel>

                    <RadioGroup
                      onChange={(e) => {
                        // formik.setFieldValue("fee", e);
                      }}
                      defaultValue="0"
                    >
                      <SimpleGrid w={"full"} columns={2}>
                        <Radio value="0">Standard Token (ZRC)</Radio>
                      </SimpleGrid>
                    </RadioGroup>
                  </FormControl>

                  <FormItem formik={formik} name="name" label="Name" isRequired>
                    <Input
                      onChange={(e) => {
                        formik.setFieldValue("name", e.target.value);
                      }}
                      placeholder="Ex: NFT Feed"
                      {...styleInput}
                    />
                  </FormItem>

                  <FormItem
                    formik={formik}
                    name="symbol"
                    label="Symbol"
                    isRequired
                  >
                    <Input
                      onChange={(e) => {
                        formik.setFieldValue("symbol", e.target.value);
                      }}
                      placeholder="Ex: FEED"
                      {...styleInput}
                    />
                  </FormItem>

                  <FormItem
                    formik={formik}
                    name="decimals"
                    label="Decimals"
                    isRequired
                  >
                    <Input
                      disabled={true}
                      value={formik.values.decimals}
                      type="number"
                      placeholder="Ex: 18"
                      {...styleInput}
                    />
                  </FormItem>

                  <FormItem
                    formik={formik}
                    name="totalSupply"
                    label="Total Supply"
                    isRequired
                  >
                    <Input
                      type="number"
                      onChange={(e) => {
                        formik.setFieldValue("totalSupply", e.target.value);
                      }}
                      placeholder="Ex: 100000"
                      {...styleInput}
                    />
                  </FormItem>

                  <Button
                    bg="yellow.primary !important"
                    borderRadius="8px"
                    fontWeight="600"
                    fontSize="16px"
                    lineHeight="18px"
                    h="auto"
                    color="black.1d"
                    w="160px"
                    p="10px"
                    type="submit"
                    mt="25px"
                    disabled={!account || !chainId || isLoading}
                    isLoading={isLoading}
                  >
                    Create Token
                  </Button>

                </VStack>
              </form>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent >
    </Modal >
  );
};
