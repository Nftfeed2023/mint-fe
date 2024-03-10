import {
  Box,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Text,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Divider,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import * as yup from "yup";
import FormItem from "../FormItem";
import { styleInput } from "~/@ui/common";
import useCustomToast from "~/hooks/@global/useCustomToast";
import { Select, chakraComponents } from "chakra-react-select";

import { BiSolidLike } from "react-icons/bi";
import { FaEye, FaRetweet } from "react-icons/fa";
import { configEnv } from "~/@config";

const DATA_SELECT = [
  {
    value: "FOLLOW",
    icon: <FaEye color="#000" />,
    label: (
      <Text
        fontSize={{ base: "14px" }}
        lineHeight={{ base: "normal" }}
        textAlign={"left"}
        padding={{ base: "10px 4px" }}
        color={"#000"}
        fontWeight={400}
      >
        Follow
      </Text>
    ),
  },
  {
    value: "LIKE",
    icon: <BiSolidLike color="#000" />,
    label: (
      <Text
        fontSize={{ base: "14px" }}
        lineHeight={{ base: "normal" }}
        textAlign={"left"}
        padding={{ base: "10px 4px" }}
        color={"#000"}
        fontWeight={400}
      >
        Like
      </Text>
    ),
  },
  {
    value: "RETWEET",
    icon: <FaRetweet color="#000" />,
    label: (
      <Text
        fontSize={{ base: "14px" }}
        lineHeight={{ base: "normal" }}
        textAlign={"left"}
        padding={{ base: "10px 4px" }}
        color={"#000"}
        fontWeight={400}
      >
        Retweet
      </Text>
    ),
  },
];

const customComponents = {
  Option: ({ children, ...props }) => (
    //@ts-ignore
    <chakraComponents.Option {...props}>
      {props.data.icon && props.data.icon}
      {children}
    </chakraComponents.Option>
  ),
  SingleValue: ({ children, ...props }) => (
    //@ts-ignore
    <chakraComponents.SingleValue {...props}>
      <HStack spacing={0}>
        {props.data.icon && props.data.icon}
        {children}
      </HStack>
    </chakraComponents.SingleValue>
  ),
};

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .max(50, "Description must be < 50 digits")
    .required("Name is a required field"),
  // description: yup.string().max(50, "Description must be < 50 digits").required("Description is a required field"),
  questType: yup.string().required("Quest type is a required field"),
  socialSource: yup.string().required("Twitter Number Numeric ID is a required field"),
  socialRef: yup.string().required("Twitter Profile Link is a required field"),
});

export const CreateQuest = (props: {
  isOpen?: boolean;
  onClose?: () => void;
  addQuest: (quest) => void;
}) => {
  const { isOpen, onClose, addQuest } = props;

  const formik = useFormik({
    initialValues: {
      name: "",
      questType: "",
      socialSource: "",
      socialRef: "",
      // description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      addQuest(values);
      formik.resetForm();
      onClose();
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
                Create Quest
              </Text>

              <Divider my="10px" />

              <form
                style={{
                  width: "100%",
                }}
                onSubmit={formik.handleSubmit}
              >
                <VStack spacing={4}>
                  <VStack w="full">
                    <FormControl
                      isInvalid={Boolean(
                        formik.errors["questType"] &&
                        formik.touched["questType"]
                      )}
                      isRequired
                    >
                      <FormLabel>Quest Type</FormLabel>

                      <Select
                        isSearchable={false}
                        placeholder="Select Type"
                        onChange={(e) => {
                          formik.setFieldValue("questType", e.value);
                        }}
                        value={DATA_SELECT.find(
                          (i) => i.value === formik.values.questType
                        )}
                        options={DATA_SELECT}
                        components={customComponents}
                        focusBorderColor={`#ee3824`}
                        className="chakra-react-select"
                        classNamePrefix="chakra-react-select"
                      />
                    </FormControl>
                    {/* <Text
                      fontWeight="400"
                      color={"#8d8d8d"}
                      fontSize={{ base: "13px", }}
                      alignSelf={"start"}
                    >
                      Select DEX router that you want to add liquidity for token.
                    </Text> */}
                  </VStack>

                  <FormItem formik={formik} name="name" label="Name" isRequired>
                    <Input
                      onChange={(e) => {
                        formik.setFieldValue("name", e.target.value);
                      }}
                      placeholder="Ex: Follow or Like or Retweet on X"
                      {...styleInput}
                    />
                  </FormItem>

                  {/* <FormItem formik={formik} name="description" label="Description" isRequired>
                    <Input
                      onChange={(e) => {
                        formik.setFieldValue("description", e.target.value);
                      }}
                      placeholder="Ex: Follow NFTFeed"
                      {...styleInput}
                    />
                  </FormItem> */}

                  <FormItem
                    formik={formik}
                    name="socialRef"
                    label="Twitter Profile Link"
                    isRequired
                  >
                    <Input
                      onChange={(e) => {
                        formik.setFieldValue("socialRef", e.target.value);
                      }}
                      placeholder={
                        formik.values.questType === "FOLLOW" ?
                          "Ex: https://twitter.com/NFTFeedOfficial/"
                          : "Ex: https://twitter.com/NFTFeedOfficial/status/0123456789"
                      }
                      {...styleInput}
                    />
                  </FormItem>

                  <FormItem
                    formik={formik}
                    name="socialSource"
                    label="Twitter Number Numeric ID"
                    isRequired
                  >
                    <Input
                      onChange={(e) => {
                        formik.setFieldValue("socialSource", e.target.value);
                      }}
                      placeholder={formik.values.questType === "FOLLOW" ? "Ex: 1552929446373773312" : "Ex: 0123456789"}
                      {...styleInput}
                    />
                  </FormItem>

                  {formik.values.questType === "FOLLOW" &&
                    <Text
                      fontSize="13px"
                      fontWeight={"bold"}
                      textAlign={"left"}
                      alignSelf={"start"}
                      cursor={{ lg: "pointer" }}
                      onClick={() => {
                        window.open("https://findidfb.com/find-twitter-id/")
                      }}
                    >
                      You can find TwitterID by: https://findidfb.com/find-twitter-id/#TwitterID
                    </Text>
                  }

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
                  >
                    Add Quest
                  </Button>
                </VStack>
              </form>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
