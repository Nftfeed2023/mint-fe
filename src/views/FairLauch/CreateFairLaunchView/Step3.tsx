import {
  Box, Button, FormControl,
  FormLabel, HStack, VStack,
  Image, Input, Center, FormErrorMessage, Spinner, Text
} from "@chakra-ui/react"
import { useFormik } from "formik";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import * as yup from "yup";
import FormItem from "../../Manager/FormItem";
import { styleInput } from "~/@ui/common";
import { useEffect, useState } from "react";
import DefUpload from "~/@ui/DefUpload";
import { checkURLType } from "~/common/utils/common.utils";
import { uploadApiService } from "~/services/@global";
import ReactQuill from "react-quill";
import { ILauchPool } from "~/dto/ILauchPool";
import { calculateAmountApprove } from "~/common/code.helper";
import { formatEther } from "ethers/lib/utils";
import { formatMoney } from "~/utils";


const validationSchema = yup.object().shape({
  logo: yup.string().required("Logo is a required field"),
  website: yup.string().required("Website is a required field"),
  facebook: yup.string(),
  twitter: yup.string(),
  github: yup.string(),
  telegram: yup.string(),
  instagram: yup.string(),
  discord: yup.string(),
  reddit: yup.string(),
  youtube: yup.string(),
  description: yup.string(),
});


export const Step3 = (props: {
  setActiveStep: () => void
  onBack: () => void
  onSaveLauchPool: (values: ILauchPool) => void
  launchPool: ILauchPool
}) => {

  const { setActiveStep, onBack, onSaveLauchPool, launchPool } = props;
  const { account } = useConnectWallet();
  const [loadingImage, setLoadingImage] = useState(false);
  const [amountApprove, setAmountApprove] = useState(null);

  const formik = useFormik({
    initialValues: {
      logo: "",
      website: "",
      facebook: "",
      twitter: "",
      github: "",
      telegram: "",
      instagram: "",
      discord: "",
      reddit: "",
      youtube: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        onSaveLauchPool({
          ...values,
        });
        setActiveStep();
      } catch (error) { }
    },
  });


  useEffect(() => {
    if (launchPool) {
      formik.setValues({
        logo: launchPool.logo,
        website: launchPool.website,
        facebook: launchPool.facebook,
        twitter: launchPool.twitter,
        github: launchPool.github,
        telegram: launchPool.telegram,
        instagram: launchPool.instagram,
        discord: launchPool.discord,
        reddit: launchPool.reddit,
        youtube: launchPool.youtube,
        description: launchPool.description,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [launchPool])

  useEffect(() => {
    const {
      tokensForPresale, liquidity, fee
    } = launchPool;
    if (tokensForPresale && liquidity) {
      const value = calculateAmountApprove({
        tokensForPresale: tokensForPresale,
        percentFeeRaised: 5,
        percentForLiquidity: liquidity,
      })
      setAmountApprove(value);
    } else {
      setAmountApprove(null)
    }
  }, [formik.values])

  return (
    <Box>

      <VStack
        width={"full"}
      >

        <VStack
          pt="50px"
          w={{ base: "100%", lg: "50%" }}
          spacing={0}
        >

          <form
            style={{
              width: "100%"
            }}
            onSubmit={formik.handleSubmit}
          >

            <VStack
              spacing={4}
            >

              <FormControl
                isInvalid={Boolean(
                  formik.errors["logo"] && formik.touched["logo"]
                )}
                isRequired
              >
                <FormLabel>Logo {`(<=1MB)`}</FormLabel>
                <DefUpload
                  accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                  multiple={false}
                  name="logo"
                  value={formik.values.logo}
                  {...formik.getFieldProps("logo")}
                  requestUpload={async (file) => {
                    const formData = new FormData();
                    formData.append("file", file);
                    setLoadingImage(true);
                    try {
                      const res = await uploadApiService.uploadFile(
                        "https://cdn.nftfeed.guru/api/upload",
                        formData
                      );
                      setLoadingImage(false);
                      return (res?.fullUrl as string) || "";
                    } catch (err) {
                      setLoadingImage(false);
                      return "";
                    }
                  }}
                >
                  {loadingImage ?
                    <Center>
                      <Spinner color="#ee3824" size="lg" />
                    </Center>
                    :
                    <Center>
                      {(checkURLType(formik.values.logo) === "Image" ||
                        checkURLType(formik.values.logo) === "Other") && (
                          <Image
                            boxSize={"30%"}
                            src={formik.values.logo}
                            alt="Logo"
                            fallbackSrc={"https://placehold.co/512"}
                          />
                        )}
                      {checkURLType(formik.values.logo) === "Video" && (
                        <video
                          style={{
                            maxWidth: "512px",
                          }}
                          src={formik.values.logo}
                          muted
                          autoPlay
                          loop
                        />
                      )}
                    </Center>

                  }

                  {formik.errors["logo"] && formik.touched["logo"] && (
                    <FormErrorMessage>
                      {formik.errors["logo"] as string}
                    </FormErrorMessage>
                  )}
                </DefUpload>
              </FormControl>

              <VStack w="full" spacing={0}>
                <Text
                  fontWeight="600"
                  fontSize={{ base: "16px", }}
                  alignSelf={"start"}
                >
                  Social Media (at least one source)
                </Text>
                <Text
                  fontWeight="400"
                  color={"#8d8d8d"}
                  fontSize={{ base: "13px", }}
                  alignSelf={"start"}
                >
                  Include your project's social media links to boost user engagement and channel traffic from the store.
                </Text>
              </VStack>

              <FormItem isRequired formik={formik} name="website" label="Website">
                <Input placeholder="Website" {...styleInput} />
              </FormItem>

              <FormItem formik={formik} name="facebook" label="Facebook">
                <Input placeholder="Facebook" {...styleInput} />
              </FormItem>

              <FormItem formik={formik} name="twitter" label="X">
                <Input placeholder="X" {...styleInput} />
              </FormItem>

              <FormItem formik={formik} name="github" label="Github">
                <Input placeholder="Github" {...styleInput} />
              </FormItem>

              <FormItem formik={formik} name="telegram" label="Telegram">
                <Input placeholder="Telegram" {...styleInput} />
              </FormItem>

              <FormItem formik={formik} name="instagram" label="Instagram">
                <Input placeholder="Instagram" {...styleInput} />
              </FormItem>

              <FormItem formik={formik} name="discord" label="Discord">
                <Input placeholder="Discord" {...styleInput} />
              </FormItem>

              <FormItem formik={formik} name="reddit" label="Reddit">
                <Input placeholder="Reddit" {...styleInput} />
              </FormItem>

              <FormItem formik={formik} name="youtube" label="Youtube">
                <Input placeholder="Youtube" {...styleInput} />
              </FormItem>

              <VStack w="full" spacing={0}>
                <Text
                  fontWeight="600"
                  fontSize={{ base: "16px", }}
                  alignSelf={"start"}
                >
                  Description
                </Text>
                <Text
                  fontWeight="400"
                  color={"#8d8d8d"}
                  fontSize={{ base: "13px", }}
                  alignSelf={"start"}
                >
                  Share clear and factual details about your project.
                </Text>
              </VStack>

              <FormControl
                isInvalid={Boolean(formik.errors["description"] && formik.touched["description"])}
              >
                <Box {...styleInput} padding={"5px"}>
                  <ReactQuill
                    style={{
                      width: "100%",
                      maxHeight: 300,
                      height: 300,
                      marginBottom: 80,
                    }}
                    formats={[
                      "header",
                      "font",
                      "size",
                      "bold",
                      "italic",
                      "underline",
                      "strike",
                      "blockquote",
                      "list",
                      "bullet",
                      "indent",
                      "link",
                      "image",
                      "video",
                      "color",
                    ]}
                    modules={{
                      toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        [{ size: ["small", false, "large", "huge"] }],
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [
                          {
                            color: [
                              "#000000",
                              "#e60000",
                              "#ff9900",
                              "#ffff00",
                              "#008a00",
                              "#0066cc",
                              "#9933ff",
                              "#ffffff",
                              "#facccc",
                              "#ffebcc",
                              "#ffffcc",
                              "#cce8cc",
                              "#cce0f5",
                              "#ebd6ff",
                              "#bbbbbb",
                              "#f06666",
                              "#ffc266",
                              "#ffff66",
                              "#66b966",
                              "#66a3e0",
                              "#c285ff",
                              "#888888",
                              "#a10000",
                              "#b26b00",
                              "#b2b200",
                              "#006100",
                              "#0047b2",
                              "#6b24b2",
                              "#444444",
                              "#5c0000",
                              "#663d00",
                              "#666600",
                              "#003700",
                              "#002966",
                              "#3d1466",
                              "custom-color",
                            ],
                          },
                        ],
                        [
                          { list: "ordered" },
                          { list: "bullet" },
                          { indent: "-1" },
                          { indent: "+1" },
                        ],
                        ["link", "image", "video"],
                        ["clean"],
                      ],
                      clipboard: {
                        // toggle to add extra line breaks when pasting HTML:
                        matchVisual: false,
                      },
                    }}
                    placeholder={"Description"}
                    theme="snow"
                    value={formik.values.description}
                    onChange={(value, delta, source, editor) => {
                      formik.setFieldValue("description", value);
                    }}
                  />
                </Box>
                {formik.errors["description"] && formik.touched["description"] && (
                  <FormErrorMessage>
                    {formik.errors["description"] as string}
                  </FormErrorMessage>
                )}
              </FormControl>


              {amountApprove &&
                <Text
                  fontWeight="600"
                  fontSize={{ base: "20px", }}
                  textAlign={"center"}
                  className="textPrimary"
                >
                  {`You need approve [ ${formatMoney(formatEther(amountApprove))} ${launchPool.tokenSymbol} ]`}
                </Text>
              }

              <HStack
                mt="25px"
              >
                <Button
                  borderRadius="8px"
                  fontWeight="500"
                  fontSize="16px"
                  lineHeight="18px"
                  h="auto"
                  color="#000"
                  w="100px"
                  p="10px"
                  disabled={!account}
                  onClick={onBack}
                >
                  Back
                </Button>
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
                  disabled={!account}
                >
                  Next
                </Button>
              </HStack>

            </VStack>

          </form>

        </VStack>

      </VStack>

    </Box>
  )
}
