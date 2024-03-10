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
  Th,
  Thead,
  Tr,
  Button,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  SimpleGrid,
  Tooltip,
  Image,
  WrapItem,
  Wrap,
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
import { useCallback, useState } from "react";
import SecondaryButton from "~/components/SecondaryButton";
import { CreateQuest } from "./CreateQuest";
import { useCampaign } from "../hooks/useCampaign";
import { ICampaign, IQuest } from "~/dto/ICampaign";
import { useParams } from "react-router-dom";
import { useNftCollectionDetail } from "~/views/FreeMintView/hooks/useNftCollectionDetail";
import { Select, chakraComponents } from "chakra-react-select";
import ImgUSDT from "~/assets/images/usdt.png";
import { useSwitchChain } from "~/hooks/@global/useSwitchChain";
import { EVM_CHAIN_LIST } from "~/@config/chain-list";
import PrimaryButton from "~/components/PrimaryButton";
import { configEnv } from "~/@config";
import { SUPPORT_CHAIN } from "~/common/code.helper";

const customComponents = {
  Option: ({ children, ...props }) => (
    //@ts-ignore
    <chakraComponents.Option {...props}>
      {props.data.icon && <Image src={props.data.icon} h={5} w={5} />}
      {children}
    </chakraComponents.Option>
  ),
  SingleValue: ({ children, ...props }) => (
    //@ts-ignore
    <chakraComponents.SingleValue {...props}>
      <HStack spacing={0}>
        {props.data.icon && <Image src={props.data.icon} h={5} w={5} />}
        {children}
      </HStack>
    </chakraComponents.SingleValue>
  ),
};

const validationSchema = yup.object().shape({
  campaignTitle: yup.string().required("Name is a required field"),
  // campaignDescription: yup.string().required("Description is a required field"),
  startTime: yup.string().required("Start Time is a required field"),
  endTime: yup.string().required("End Time is a required field"),
  quest: yup.array().min(1, `ou must add at least 1 Quest to run the campaign`),
});

export const CreateCampaignView = () => {

  const { account, chainId: chainActive } = useConnectWallet();
  const { address, chainId } = useParams();
  const [openQuest, setOpenQuest] = useState(false);
  const switchChain = useSwitchChain();

  const { logo, chainName } = EVM_CHAIN_LIST[parseInt(chainId)];

  const {
    isLoading,
    createCampaign,

    tokenAddress,
    setTokenAddress,
    isApprove,
    approve,
    amountApprove,
    setAmountApprove,
    maxWinner,
    setMaxWinner,
  } = useCampaign({ nftAddress: address });

  const { collection } = useNftCollectionDetail({
    address,
    chainId: chainId,
  });

  const startDate = new Date();
  const endDate = new Date();

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
      const { campaignTitle, campaignDescription, startTime, endTime, quest } =
        values;

      try {
        const newQuest: IQuest[] = quest.map((itemQ) => ({
          name: itemQ.name,
          description: itemQ.description,
          title: itemQ.name,
          questType: itemQ.questType,
          socialType: "TWITTER",
          socialSource: itemQ.socialSource,
          socialRef: itemQ.socialRef,
        }));

        const body: ICampaign = {
          chainId: parseInt(chainId),
          address,
          creatorAddress: account,
          startTime: new Date(startTime).toISOString(),
          endTime: new Date(endTime).toISOString(),
          campaignTitle,
          campaignDescription: campaignTitle,
          campaignName: campaignTitle,
          quest: newQuest,
        };
        console.log({ body });

        await createCampaign(body);

      } catch (error) {
        console.log({ error });
      }
    },
  });

  const tokens = useCallback(() => {
    const { USDT: usdtAddress } = configEnv().customSMC[chainId];
    return [
      {
        value: usdtAddress,
        icon: ImgUSDT,
        label: (
          <Text
            fontSize={{ base: "14px" }}
            lineHeight={{ base: "normal" }}
            textAlign={"left"}
            padding={{ base: "10px 4px" }}
            color={"#000"}
            fontWeight={400}
          >
            USDT
          </Text>
        ),
      },
    ];
  }, [chainId]);

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

  const addQuest = ({
    name,
    questType,
    socialSource,
    socialRef,
    description,
  }) => {
    formik.setFieldValue("quest", [
      ...formik.values.quest,
      {
        name,
        questType,
        socialSource,
        socialRef,
        description: name,
      },
    ]);
  };

  const renderButton = useCallback(() => {
    if (!isApprove) {
      return (
        <PrimaryButton
          w="180px"
          disabled={!account || parseInt(amountApprove || '0') === 0
            || !tokenAddress
            || !formik.values.quest.length}
          isLoading={isLoading}
          onClick={approve}
        >
          1. Approve reward
        </PrimaryButton>
      )
    }
    return (
      <PrimaryButton
        w="180px"
        type="submit"
        disabled={!account}
        isLoading={isLoading}
      >
        2. Create campaign
      </PrimaryButton>
    )
  }, [account, amountApprove, approve, formik.values.quest.length, isApprove, isLoading, tokenAddress])

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
          <VStack w="full">
            <Text
              fontSize="xl"
              fontWeight={"600"}
              textAlign={"left"}
              alignSelf={"start"}
            >
              {`Create Campaign: [ ${collection?.name} ]`}
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
                  fontWeight={"600"}
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
                <Text fontSize={"10px"} alignSelf={"end"} lineHeight={"normal"}>
                  {formik.values.campaignTitle?.length || 0}/100
                </Text>

                {/* <FormItem
                  formik={formik}
                  name="campaignDescription"
                  label="Input description (Max 200 characters)"
                  isRequired
                >
                  <Textarea
                    onChange={(e) => {
                      formik.setFieldValue(
                        "campaignDescription",
                        e.target.value
                      );
                    }}
                    placeholder="Input description"
                    maxLength={200}
                    style={{
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderRadius: "10px",
                      background: "#F7F9FA",
                    }}
                  />
                </FormItem>
                <Text fontSize={"10px"} alignSelf={"end"} lineHeight={"normal"}>
                  {formik.values.campaignDescription?.length || 0}/200
                </Text> */}

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
                        fontWeight={"600"}
                        textAlign={"left"}
                        alignSelf={"start"}
                      >
                        Quest{" "}
                        <span style={{ color: "red", fontSize: 10 }}>*</span>
                      </Text>
                    </FormLabel>

                    <SecondaryButton
                      w="fit-content"
                      h="auto"
                      fontSize={"13px"}
                      onClick={() => {
                        setOpenQuest(true);
                      }}
                      color={"red"}
                    >
                      Add Quest
                    </SecondaryButton>
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
                        <Th>Delete</Th>
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
                                {item.socialRef?.slice(0, 10).concat("...")}
                              </Tooltip>
                            </Td>
                            <Td>
                              <Button
                                onClick={() => {
                                  const newQuest = formik.values.quest.filter((_, qIdx) => qIdx !== idx);
                                  formik.setFieldValue("quest", newQuest);
                                }}
                                color={"red"}
                              >
                                X
                              </Button>
                            </Td>

                            {/* <Td>
                              <Tooltip
                                label={item.description}
                              >
                                {item.description?.slice(0, 10).concat("...")}
                              </Tooltip>
                            </Td> */}
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>

                {chainActive !== parseInt(chainId) ? (
                  <PrimaryButton
                    onClick={() => switchChain(parseInt(chainId)).catch()}
                    w="fit-content"
                    leftIcon={
                      <Image
                        src={logo || ""}
                        w="18px"
                        h="18px"
                        borderRadius={"12px"}
                      />
                    }
                  >
                    <Text fontSize={"14px"}>Switch to {chainName || ""}</Text>
                  </PrimaryButton>
                ) : (
                  <VStack
                    my="40px"
                    w={{ base: "full", md: "60%" }}
                    p={{ base: "20px", lg: "30px 20px" }}
                    bg="white"
                    borderRadius="8px"
                    boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
                    spacing={8}
                  >

                    <Text
                      fontSize="18px"
                      fontWeight={"700"}
                      textAlign={"left"}
                      alignSelf={"start"}
                    >
                      Set up reward and create campaign
                    </Text>

                    <VStack
                      w="full"
                      spacing={2}
                      maxW={{ base: "full", md: 380 }}
                    >

                      <Text
                        fontSize="16px"
                        fontWeight={"600"}
                        textAlign={"left"}
                        alignSelf={"start"}
                      >
                        Token Name <span style={{ color: "red" }}>*</span>
                      </Text>

                      <Box w="full">
                        <Select
                          isSearchable={false}
                          placeholder="Select Token"
                          onChange={(e) => {
                            console.log(e);

                            setTokenAddress(e.value);
                            console.log({ tokenAddress });

                          }}
                          value={tokens().find(
                            (i) => i.value === tokenAddress
                          )}
                          options={tokens()}
                          components={customComponents}
                          focusBorderColor={`#ee3824`}
                          className="chakra-react-select"
                          classNamePrefix="chakra-react-select"
                        />
                      </Box>

                      <Text
                        fontSize="16px"
                        fontWeight={"600"}
                        textAlign={"left"}
                        alignSelf={"start"}
                      >
                        Total Reward Amount <span style={{ color: "red" }}>*</span>
                      </Text>

                      <Input
                        placeholder="Input quantity"
                        borderRadius={"12px"}
                        type="number"
                        color={"#000"}
                        borderColor={"#000"}
                        value={amountApprove}
                        onChange={(e) => setAmountApprove(e.target.value)}
                      />

                      <Text
                        fontSize="16px"
                        fontWeight={"600"}
                        textAlign={"left"}
                        alignSelf={"start"}
                      >
                        {`Max Winner ( 1 <= Max Winner <= 250 )`} <span style={{ color: "red" }}>*</span>
                      </Text>

                      <Input
                        placeholder="Input quantity"
                        borderRadius={"12px"}
                        type="number"
                        color={"#000"}
                        borderColor={"#000"}
                        value={maxWinner}
                        onChange={(e) => setMaxWinner(parseInt(e.target.value))}
                      />

                      {amountApprove && maxWinner &&
                        <Text
                          fontSize="13px"
                          fontWeight={"600"}
                          textAlign={"left"}
                          alignSelf={"start"}
                          fontStyle={"italic"}
                        >
                          {`Winners will get the same reward (5 USDT) (${parseInt(amountApprove) / maxWinner} USDT)`}
                        </Text>
                      }

                      <HStack
                        py="10px"
                        w="full"
                        justifyContent={"space-between"}
                      >

                        <Text
                          fontSize="16px"
                          fontWeight={"600"}
                          textAlign={"left"}
                          alignSelf={"start"}
                        >
                          Method:
                        </Text>

                        <Text
                          fontSize="16px"
                          fontWeight={"600"}
                        >
                          Auto-Raffle
                        </Text>

                      </HStack>

                      <VStack
                        w="full"
                        justifyContent={"space-between"}
                        alignItems={"start"}
                      >

                        <Text
                          fontSize="16px"
                          fontWeight={"600"}
                          textAlign={"left"}
                          alignSelf={"start"}
                        >
                          Chain Support:
                        </Text>

                        <Wrap>
                          {SUPPORT_CHAIN.map((item, idx) => {
                            return (
                              <WrapItem key={idx}>
                                <HStack
                                  border="1px solid #ccc"
                                  p="5px 10px"
                                  borderRadius={"8px"}
                                >
                                  <Image src={item.logo} w="14px" h="14px" />
                                  <Text
                                    fontSize="14px"
                                    fontWeight={"600"}
                                  >
                                    {item.chainName}
                                  </Text>
                                </HStack>
                              </WrapItem>
                            )
                          })
                          }
                        </Wrap>

                      </VStack>

                    </VStack>

                    <Text
                      pt="20px"
                      fontSize={{ base: "16px", md: "18px" }}
                      textAlign={"center"}
                      fontWeight={400}
                    >
                      <strong style={{ color: "#ee3824" }}>
                        ATTENTION! Once the campaign goes live, it cannot be edited.
                      </strong>
                    </Text>

                    {renderButton()}

                  </VStack>
                )}
              </VStack>
            </form>
          </VStack>
        </Box>
      </BoxLayout>

      <CreateQuest
        isOpen={openQuest}
        onClose={() => {
          setOpenQuest(false);
        }}
        addQuest={(values) => {
          addQuest({ ...values });
        }}
      />
    </MainLayout>
  );
};
