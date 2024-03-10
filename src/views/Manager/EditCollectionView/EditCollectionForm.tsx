import "react-quill/dist/quill.snow.css";

import {
  Image,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Text,
  Box,
  HStack,
  useDisclosure,
  Flex,
  Spacer,
  ButtonGroup,
  FormErrorMessage,
  InputProps,
} from "@chakra-ui/react";

import { uploadApiService } from "~/services/@global";
import DefUpload from "~/@ui/DefUpload";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EVM_CHAIN_LIST } from "~/@config/chain-list";
import ModalSwitchChain from "~/container/ModalSwitchChain";
import ReactQuill from "react-quill";

import * as yup from "yup";

import { useFormik } from "formik";
import FormItem from "../FormItem";
import { checkURLType } from "~/common/utils/common.utils";
import { useNftCollectionDetail } from "~/views/FreeMintView/hooks/useNftCollectionDetail";
import { useEditCollectionV2 } from "../hooks/useEditCollectionV2";
import { MANAGER_ROUTERS } from "~/routes/routes";
import useWindowSize from "~/hooks/useWindowSize";

type IEditCollectionFormProps = {
  chainId: number;
};

const acceptImg = `image/png,image/jpeg,image/jpg,image/gif,image/webp,video/mp4,video/x-m4v,video/*`;

const validationSchema = yup.object().shape({
  chainId: yup.number().required(),
  name: yup.string().required(),
  desc: yup.string().required(),
  image: yup.string().required(),
  address: yup.string(),
  exactPrice: yup.string(),
  website: yup.string(),
  twitter: yup.string(),
  discord: yup.string(),
  telegram: yup.string(),
  logo: yup.string(),
  banner: yup.string(),
  projectDesc: yup.string(),
});

const EditCollectionForm = (props: IEditCollectionFormProps) => {
  const { address } = useParams();

  const navigate = useNavigate();
  const { width } = useWindowSize();

  const { collection } = useNftCollectionDetail({
    address,
    chainId: props.chainId,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chainId } = props;
  const { chainName, logo, dislayName, nativeCurrency } = EVM_CHAIN_LIST[
    chainId
  ] || {
    chainName: "",
    logo: "",
    dislayName: "",
    nativeCurrency: { symbol: "" },
  };

  const { update, isLoading } = useEditCollectionV2();
  const formik = useFormik({
    initialValues: {
      ...collection,
    },
    validationSchema,
    onSubmit: (values) => {
      const {
        chainId,
        address,
        name,
        image,
        desc,
        website,
        twitter,
        discord,
        telegram,
        logo,
        banner,
        projectDesc,
      } = values;

      update(
        {
          chainId,
          address,
          name,
          image,
          desc,
          website,
          twitter,
          discord,
          telegram,
          logo,
          banner,
          projectDesc,
        },
        () => {
          navigate(MANAGER_ROUTERS.MANAGER);
        }
      );
    },
  });

  useEffect(() => {
    if (collection) {
      formik.setValues(collection);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection]);

  const styleInputDisable: InputProps = {
    textAlign: "left",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "20px",
  };
  const styleInput: InputProps = {
    ...styleInputDisable,
    borderColor: "#448AFF !important",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "10px",
    bg: "#F7F9FA",
  };

  return (
    <>

      <Text fontSize='3xl' fontWeight={"bold"} textAlign={"center"}>
        Edit Collection: {collection?.name}
      </Text>

      <form onSubmit={formik.handleSubmit}>
        <FormControl
          mb="3"
          isInvalid={Boolean(
            formik.errors["chainId"] && formik.touched["chainId"]
          )}
          isDisabled={true}
        >
          <FormLabel>Select chain deploy NFT</FormLabel>
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
              <ButtonGroup gap="2">
                <Button
                  disabled={true}
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

        <FormControl
          mb="3"
          isInvalid={Boolean(formik.errors["image"] && formik.touched["image"])}
        >
          <FormLabel>NFT Image {`(<=1MB)`}</FormLabel>
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
                    maxWidth: width <= 500 ? "280px" : "512px",
                  }}
                  src={formik.values.image}
                  muted
                  autoPlay
                  loop
                />
              )}
            </Center>

            {formik.errors["image"] && formik.touched["image"] && (
              <FormErrorMessage>
                {formik.errors["image"] as string}
              </FormErrorMessage>
            )}
          </DefUpload>
        </FormControl>
        <FormItem
          mb="3"
          formik={formik}
          name="name"
          label="Name of the NFT Collection"
        >
          <Input placeholder="Name" disabled={false} {...styleInput} />
        </FormItem>

        <FormControl
          mb="3"
          isInvalid={Boolean(formik.errors["desc"] && formik.touched["desc"])}
        >
          <FormLabel>NFT Description</FormLabel>

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
              placeholder={"NFT Description"}
              theme="snow"
              value={formik.values.desc}
              onChange={(value, delta, source, editor) => {
                formik.setFieldValue("desc", value);
              }}
            />
          </Box>
          {formik.errors["desc"] && formik.touched["desc"] && (
            <FormErrorMessage>
              {formik.errors["desc"] as string}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormItem mb="3" formik={formik} name="website" label="Website">
          <Input placeholder="Website" {...styleInput} />
        </FormItem>

        <FormItem mb="3" formik={formik} name="twitter" label="Twitter">
          <Input placeholder="Twitter" {...styleInput} />
        </FormItem>

        <FormItem mb="3" formik={formik} name="discord" label="Discord">
          <Input placeholder="Discord" {...styleInput} />
        </FormItem>

        <FormItem mb="3" formik={formik} name="telegram" label="Telegram">
          <Input placeholder="Telegram" {...styleInput} />
        </FormItem>

        <FormControl
          mb="3"
          isInvalid={Boolean(
            formik.errors["banner"] && formik.touched["banner"]
          )}
        >
          <FormLabel>Banner {`(<=1MB)`}</FormLabel>
          <DefUpload
            accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
            multiple={false}
            name="banner"
            value={formik.values.banner}
            {...formik.getFieldProps("banner")}
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
              {(checkURLType(formik.values.banner) === "Image" ||
                checkURLType(formik.values.banner) === "Other") && (
                  <Image
                    boxSize={"100%"}
                    src={formik.values.banner}
                    alt="NFT image"
                    fallbackSrc={"https://placehold.co/4000x750"}
                  />
                )}
              {checkURLType(formik.values.banner) === "Video" && (
                <video
                  style={{
                    maxWidth: "512px",
                  }}
                  src={formik.values.banner}
                  muted
                  autoPlay
                  loop
                />
              )}
            </Center>

            {formik.errors["banner"] && formik.touched["banner"] && (
              <FormErrorMessage>
                {formik.errors["banner"] as string}
              </FormErrorMessage>
            )}
          </DefUpload>
        </FormControl>

        <FormControl
          mb="3"
          isInvalid={Boolean(formik.errors["logo"] && formik.touched["logo"])}
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
              {(checkURLType(formik.values.logo) === "Image" ||
                checkURLType(formik.values.logo) === "Other") && (
                  <Image
                    boxSize={"30%"}
                    src={formik.values.logo}
                    alt="NFT image"
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

            {formik.errors["logo"] && formik.touched["logo"] && (
              <FormErrorMessage>
                {formik.errors["logo"] as string}
              </FormErrorMessage>
            )}
          </DefUpload>
        </FormControl>

        <FormControl
          mb="3"
          isInvalid={Boolean(formik.errors["desc"] && formik.touched["desc"])}
        >
          <FormLabel>Project Description</FormLabel>

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
              placeholder={"NFT Description"}
              theme="snow"
              value={formik.values.projectDesc}
              onChange={(value, delta, source, editor) => {
                formik.setFieldValue("projectDesc", value);
              }}
            />
          </Box>
          {formik.errors["projectDesc"] && formik.touched["projectDesc"] && (
            <FormErrorMessage>
              {formik.errors["projectDesc"] as string}
            </FormErrorMessage>
          )}
        </FormControl>

        <Flex h={"20px"} />
        <Button
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
          type="submit"
          isLoading={isLoading}
        >
          Update
        </Button>
      </form>

      <ModalSwitchChain isOpen={isOpen} onClose={onClose} />
    </>
  );
};
export default EditCollectionForm;
