import { VStack, Divider, FormControl, FormLabel, RadioGroup, SimpleGrid, Radio, Input, Image, Box, Text, Center, FormErrorMessage } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { styleInput } from "~/@ui/common";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import useCustomToast from "~/hooks/@global/useCustomToast";
import FormItem from "~/views/Manager/FormItem";
import { useTokens } from "../CreateFairLaunchView/hooks/useTokens";
import * as yup from "yup";
import { useFormik } from "formik";
import BoxLayout from "~/components/BoxLayout";
import MainLayout from "~/layouts/MainLayout";
import WrapperHeaderMobile from "~/layouts/MasterLayout/WrapperHeaderMobile";
import { TextHorizon } from "~/@ui/TextHorizon";
import { EVM_CHAIN_LIST } from "~/@config/chain-list";
import { CHAIN_CODE } from "~/@config/chain-code";
import PrimaryButton from "~/components/PrimaryButton";
import DefUpload from "~/@ui/DefUpload";
import { checkURLType } from "~/common/utils/common.utils";
import { uploadApiService } from "~/services/@global";

const acceptImg = `image/png,image/jpeg,image/jpg,image/gif,image/webp,video/mp4,video/x-m4v,video/*`;

const validationSchema = yup.object().shape({
  kind: yup.string(),
  image: yup.string(),
  name: yup.string().required("Name is a required field"),
  symbol: yup.string().required("Symbol is a required field"),
  totalSupply: yup.number().required("Total Supply is a required field"),
});

export const CreateTokenView = () => {

  const toast = useCustomToast();
  const { chainId, account } = useConnectWallet();
  const [tokenAddress, setTokenAddress] = useState(null);
  const { isLoading, createToken } = useTokens({});
  const {
    tokenInfo,
    loadTokensInfo,
  } = useTokens({});

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
          console.log({ values });
          await createToken(
            values.name,
            values.symbol,
            values.totalSupply,
            async (tokenAddress) => {
              setTokenAddress(tokenAddress);
              await loadTokensInfo(tokenAddress);
            }
          );
        }


      } catch (error) {
        toast.handleErrorBlockChain(error);
      }
    },
  });

  const renderBody = useCallback(() => {
    if (!tokenAddress) {
      return (
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
                    <Radio value='erc404' border="1px solid #000" disabled={true}>ERC404</Radio>
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

            <PrimaryButton
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
              disabled={!account || !chainId || chainId !== CHAIN_CODE.ZETACHAIN_MAINNET || isLoading}
              isLoading={isLoading}
            >
              Create Token
            </PrimaryButton>

          </VStack>
        </form>
      );
    }
    return (
      <VStack alignItems={"left"} w="full" p="0px !important">
        <Box w="full" pt={{ base: "30px", md: "50px" }}>
          <TextHorizon
            title={`Token Address`}
            value={`${tokenAddress}`}
            isCopy={true}
          />
          <Divider />
        </Box>
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

        <Box h="30vh" />
      </VStack>
    )
  }, [account, chainId, formik, isLoading, tokenAddress, tokenInfo?.currency, tokenInfo?.decimals, tokenInfo?.tokenName, tokenInfo?.tokenSymbol])

  return (
    <MainLayout>

      <WrapperHeaderMobile />

      <BoxLayout>

        <Box
          w="full"
          p={{ base: '10px', lg: '15px 20px', }}
          bg="white"
          borderRadius="8px"
          border={{ md: "1px solid #ffd3cb" }}
          boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
        >

          <Box w="full" p="10px 15px 30px" borderRadius={"24px"}>
            <VStack
              width={{ base: "full", }}
            >
              <Text
                className="textSpinWheel"
                fontSize={{ base: "18px", md: "24px" }}
                textTransform={"capitalize"}
                textAlign={"center"}
                fontWeight={500}
              >
                Create Token
              </Text>

              <VStack w={{ base: "full", md: "60%" }}>
                <Divider my="10px" />
                {renderBody()}
              </VStack>

            </VStack>
          </Box>

        </Box>

      </BoxLayout>
    </MainLayout>
  )
}
