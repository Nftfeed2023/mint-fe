import {
  Box,
  VStack,
  Text,
  Input,
  Divider,
  Textarea,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Button,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Spinner,
  Flex,
  Tooltip,
  SimpleGrid,
} from "@chakra-ui/react";
import BoxLayout from "~/components/BoxLayout";
import MainLayout from "~/layouts/MainLayout";
import WrapperHeaderMobile from "~/layouts/MasterLayout/WrapperHeaderMobile";
import * as yup from "yup";
import { useFormik } from "formik";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import { styleInput } from "~/@ui/common";
import FormItem from "../FormItem";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCampaign } from "../hooks/useCampaign";

const validationSchema = yup.object().shape({
  campaignTitle: yup.string().required("Name is a required field"),
  // campaignDescription: yup.string().required("Description is a required field"),
  startTime: yup.string().required("Start Time is a required field"),
  endTime: yup.string().required("End Time is a required field"),
  quest: yup.array().min(1, `Quest must have at least 1 items`),
});

export const DetailCampaignView = () => {
  const { chainId, account } = useConnectWallet();
  const [openQuest, setOpenQuest] = useState(false);
  const { campaignId } = useParams();

  const startDate = new Date();
  const endDate = new Date();

  const { isLoading, detailCampaign, loadDetailCampaign } = useCampaign({
    nftAddress: "",
  });

  useEffect(() => {
    if (campaignId) {
      loadDetailCampaign(campaignId);
    }
  }, [campaignId,]);

  const formik = useFormik({
    initialValues: {
      campaignTitle: null,
      campaignDescription: null,
      startTime: null,
      endTime: null,
      quest: [],
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        console.log({ values });
      } catch (error) { }
    },
  });

  useEffect(() => {
    if (detailCampaign) {
      formik.setValues({
        campaignTitle: detailCampaign.campaignTitle,
        campaignDescription: detailCampaign.campaignDescription,
        startTime: dayjs(new Date(detailCampaign.startTime).toUTCDate()).format(
          "YYYY-MM-DD HH:mm"
        ),
        endTime: dayjs(new Date(detailCampaign.endTime).toUTCDate()).format(
          "YYYY-MM-DD HH:mm"
        ),
        quest: detailCampaign.quest || [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailCampaign]);

  const renderTextStartTime = useCallback(() => {
    if (formik.values.startTime) {
      return (
        <Text fontWeight="500" fontSize={{ base: "14px" }} alignSelf={"start"}>
          Start Time(UTC) :{" "}
          {dayjs(new Date(formik.values.startTime).toUTCDate()).format(
            "YYYY/MM/DD HH:mm"
          )}
        </Text>
      );
    }
    return null;
  }, [formik]);

  const renderTextEndTime = useCallback(() => {
    if (formik.values.endTime) {
      return (
        <Text fontWeight="500" fontSize={{ base: "14px" }} alignSelf={"start"}>
          End Time(UTC) :{" "}
          {dayjs(new Date(formik.values.endTime).toUTCDate()).format(
            "YYYY/MM/DD HH:mm"
          )}
        </Text>
      );
    }
    return null;
  }, [formik]);

  return (
    <MainLayout>
      <WrapperHeaderMobile />

      <BoxLayout>
        <Box
          w="full"
          p={{ base: "10px", lg: "15px 20px" }}
          bg="white"
          borderRadius="8px"
          border={{ base: "1px solid #ffd3cb" }}
          boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
        >
          {isLoading ? (
            <VStack py={{ base: "20vh" }}>
              <Flex flex={1} justifyContent="center" alignItems="center">
                <Spinner color="#ee3824" size="lg" />
              </Flex>
            </VStack>
          ) : (
            <VStack w="full">
              <Text
                fontSize="xl"
                fontWeight={"bold"}
                textAlign={"left"}
                alignSelf={"start"}
              >
                Manager Campaign
              </Text>

              <Divider variant="dashed" mb="20px" />

              <form
                style={{
                  width: "100%",
                }}
                onSubmit={formik.handleSubmit}
              >
                <VStack spacing={4}>
                  <Text
                    fontSize="xl"
                    fontWeight={"bold"}
                    textAlign={"left"}
                    alignSelf={"start"}
                  >
                    Campaign
                  </Text>

                  <FormItem
                    formik={formik}
                    name="campaignTitle"
                    label="Title"
                    isRequired
                  >
                    <Input
                      onChange={(e) => {
                        formik.setFieldValue("campaignTitle", e.target.value);
                      }}
                      placeholder="Input title (Max 100 characters)"
                      {...styleInput}
                    />
                  </FormItem>

                  {/* <FormItem
                    formik={formik}
                    name="campaignDescription"
                    label="Description"
                    isRequired
                  >
                    <Textarea
                      onChange={(e) => {
                        formik.setFieldValue(
                          "campaignDescription",
                          e.target.value
                        );
                      }}
                      placeholder="Input description (Max 200 characters)"
                      style={{
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderRadius: "10px",
                        background: "#F7F9FA",
                      }}
                    />
                  </FormItem> */}

                  <SimpleGrid w="full" spacing={2} columns={{ base: 1, md: 2 }}>
                    <VStack w="full">
                      <VStack w="full">
                        <FormItem
                          formik={formik}
                          name="startTime"
                          label={`Start Time`}
                          isRequired
                        >
                          <Input
                            placeholder="Start Time"
                            type="datetime-local"
                            min={dayjs(startDate).format("YYYY-MM-DD HH:mm")}
                            {...styleInput}
                          />
                        </FormItem>
                        {renderTextStartTime()}
                      </VStack>
                      <Text
                        fontWeight="400"
                        color={"#8d8d8d"}
                        fontSize={{ base: "13px" }}
                        alignSelf={"start"}
                      >
                        Select the date you want to run the campaign
                      </Text>
                    </VStack>

                    <VStack w="full">
                      <VStack w="full">
                        <FormItem
                          formik={formik}
                          name="endTime"
                          label="End Time"
                          isRequired
                        >
                          <Input
                            placeholder="End Time"
                            type="datetime-local"
                            min={dayjs(endDate).format("YYYY-MM-DD HH:mm")}
                            {...styleInput}
                          />
                        </FormItem>
                        {renderTextEndTime()}
                      </VStack>
                      <Text
                        fontWeight="400"
                        color={"#8d8d8d"}
                        fontSize={{ base: "13px" }}
                        alignSelf={"start"}
                      >
                        Select the date you want to end the campaign
                      </Text>
                    </VStack>
                  </SimpleGrid>

                  <FormControl
                    isInvalid={Boolean(
                      formik.errors["quest"] && formik.touched["quest"]
                    )}
                  >
                    <HStack
                      alignSelf={"start"}
                      w="full"
                      justifyContent={"space-between"}
                    >
                      <FormLabel>
                        <Text
                          fontSize="xl"
                          fontWeight={"bold"}
                          textAlign={"left"}
                          alignSelf={"start"}
                        >
                          Quest{" "}
                          <span style={{ color: "red", fontSize: 10 }}>*</span>
                        </Text>
                      </FormLabel>

                      {/* <SecondaryButton
                      w="fit-content"
                      h="auto"
                      fontSize={"13px"}
                      onClick={() => { setOpenQuest(true) }}
                      color={"red"}
                    >
                      Add Quest
                    </SecondaryButton> */}
                    </HStack>
                    {formik.errors["quest"] && formik.touched["quest"] && (
                      <FormErrorMessage>
                        {formik.errors["quest"] as string}
                      </FormErrorMessage>
                    )}
                  </FormControl>

                  <TableContainer w="full">
                    <Table w="full">
                      <Thead>
                        <Tr>
                          <Th>Quest Type</Th>
                          <Th>Name</Th>
                          <Th>Twitter Number Numeric ID</Th>
                          <Th>Twitter Profile Link</Th>
                          {/* <Th>Description</Th> */}
                        </Tr>
                      </Thead>
                      <Tbody>
                        {formik.values.quest.map((item, idx) => {
                          return (
                            <Tr key={idx}>
                              <Td style={{ fontWeight: 600 }}>
                                {item.questType}
                              </Td>
                              <Td>{item.name}</Td>
                              <Td>{item.socialSource}</Td>
                              <Td
                                cursor={{ lg: "pointer" }}
                                onClick={() => {
                                  window.open(item.socialRef);
                                }}
                              >
                                <Tooltip label={item.socialRef}>
                                  {item.socialRef.slice(0, 10).concat("...")}
                                </Tooltip>
                              </Td>
                              {/* <Td>
                                <Tooltip
                                  label={item.description}
                                >
                                  {item.description.slice(0, 10).concat("...")}
                                </Tooltip>
                              </Td> */}
                            </Tr>
                          );
                        })}
                      </Tbody>
                    </Table>
                  </TableContainer>

                  {/* <Button
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
                  Create
                </Button> */}
                </VStack>
              </form>
            </VStack>
          )}
        </Box>
      </BoxLayout>
    </MainLayout>
  );
};
