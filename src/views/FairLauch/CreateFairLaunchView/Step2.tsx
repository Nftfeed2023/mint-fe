import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  VStack,
  useDisclosure,
  Text,
  Image,
  Input,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import * as yup from "yup";
import FormItem from "../../Manager/FormItem";
import { styleInput } from "~/@ui/common";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Select, chakraComponents } from "chakra-react-select";
import { ILauchPool } from "~/dto/ILauchPool";
import { EVM_CHAIN_LIST } from "~/@config/chain-list";
import moment from "moment";
import dayjs from "dayjs";
import { TextHorizon } from "~/@ui/TextHorizon";
import { calculateAmountApprove } from "~/common/code.helper";
import { formatEther } from "ethers/lib/utils";
import { formatMoney } from "~/utils";

const DATA_SELECT_CHAIN = [
  {
    value: 1,
    icon: null,
    label: (
      <Text
        fontSize={{ base: "14px" }}
        lineHeight={{ base: "normal" }}
        textAlign={"left"}
        padding={{ base: "10px 4px" }}
        color={"#000"}
        fontWeight={400}
      >
        Zetaswap
      </Text>
    ),
  },
];

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
  tokensForPresale: yup.number()
    .required("Tokens For Presale is a required field").min(1),
  softCap: yup.number().required("SoftCap is a required field").min(0.1),
  routerAddress: yup.string().required("Router is a required field"),
  liquidity: yup.number().required("Liquidity is a required field").min(60).max(100),
  startTime: yup.string().required("Start Time is a required field"),
  endTime: yup.string().required("End Time is a required field"),
});

export const Step2 = (props: {
  setActiveStep: () => void;
  onBack: () => void;
  onSaveLauchPool: (values: ILauchPool) => void;
  launchPool: ILauchPool;
}) => {
  const { setActiveStep, onBack, onSaveLauchPool, launchPool } = props;
  const [amountApprove, setAmountApprove] = useState(null);

  const startDate = new Date();
  // startDate.setDate(startDate.getDate() + 1);

  const endDate = new Date();
  // endDate.setDate(endDate.getDate() + 3);

  const { chainId, account } = useConnectWallet();

  const { nativeCurrency } = EVM_CHAIN_LIST[chainId] || {
    chainName: "",
    logo: "",
    dislayName: "",
    nativeCurrency: { symbol: "" },
  };

  const formik = useFormik({
    initialValues: {
      tokensForPresale: null,
      softCap: 0,
      routerAddress: null,
      liquidity: 0,
      startTime: null,
      endTime: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        onSaveLauchPool({
          ...values,
          startTime: new Date(values.startTime).toISOString(),
          endTime: new Date(values.endTime).toISOString(),
          routerAddress: values.routerAddress
            ? "https://app.zetaswap.com/"
            : null,
        });
        setActiveStep();
      } catch (error) { }
    },
  });

  useEffect(() => {
    const {
      tokensForPresale, liquidity
    } = formik.values;
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

  useEffect(() => {
    console.log({ launchPool });

    if (launchPool) {
      formik.setValues({
        tokensForPresale: launchPool.tokensForPresale,
        softCap: launchPool.softCap,
        routerAddress: launchPool.routerAddress ? 1 : null,
        liquidity: launchPool.liquidity,
        startTime: launchPool.startTime,
        endTime: launchPool.endTime,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [launchPool]);

  const renderTextStartTime = useCallback(() => {
    if (formik.values.startTime) {
      return (
        <Text
          fontWeight="500"
          fontSize={{ base: "14px", }}
          alignSelf={"start"}
        >
          Start Time(UTC) :  {dayjs(new Date(formik.values.startTime).toUTCDate()).format("YYYY/MM/DD HH:mm")}
        </Text>
      )
    }
    return null;
  }, [formik])

  const renderTextEndTime = useCallback(() => {
    if (formik.values.endTime) {
      return (
        <Text
          fontWeight="500"
          fontSize={{ base: "14px", }}
          alignSelf={"start"}
        >
          End Time(UTC) :  {dayjs(new Date(formik.values.endTime).toUTCDate()).format("YYYY/MM/DD HH:mm")}
        </Text>
      )
    }
    return null;
  }, [formik])

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

              <VStack w="full">
                <FormItem
                  formik={formik}
                  name="tokensForPresale"
                  label="Tokens For Presale"
                  isRequired
                >
                  <Input
                    onChange={(e) => {
                      formik.setFieldValue("tokensForPresale", e.target.value);
                    }}
                    placeholder="Ex: 100"
                    {...styleInput}
                  />
                </FormItem>
                <Text
                  fontWeight="400"
                  fontSize={{ base: "13px", }}
                  alignSelf={"start"}
                  color={"#8d8d8d"}
                >
                  Enter the number of tokens that will be sold during the presale.
                </Text>
              </VStack>

              <VStack w="full">
                <FormItem
                  formik={formik}
                  name="softCap"
                  label={`Softcap (${nativeCurrency.symbol || ""})`}
                  isRequired
                >
                  <Input
                    type="number"
                    onChange={(e) => {
                      formik.setFieldValue("softCap", e.target.value);
                    }}
                    placeholder="0"
                    {...styleInput}
                  />
                </FormItem>
                <Text
                  fontWeight="400"
                  color={"#8d8d8d"}
                  fontSize={{ base: "13px", }}
                  alignSelf={"start"}
                >
                  Input a reasonable Softcap amount.
                </Text>
              </VStack>

              <VStack w="full">
                <FormControl
                  isInvalid={Boolean(
                    formik.errors["routerAddress"] &&
                    formik.touched["routerAddress"]
                  )}
                  isRequired
                >
                  <FormLabel>Router</FormLabel>

                  <Select
                    isSearchable={false}
                    placeholder="Select Router Exchange"
                    onChange={(e) => {
                      formik.setFieldValue("routerAddress", e.value);
                    }}
                    value={DATA_SELECT_CHAIN.find(
                      (i) => i.value === formik.values.routerAddress
                    )}
                    options={DATA_SELECT_CHAIN}
                    components={customComponents}
                    focusBorderColor={`#ee3824`}
                    className="chakra-react-select"
                    classNamePrefix="chakra-react-select"
                  />
                </FormControl>
                <Text
                  fontWeight="400"
                  color={"#8d8d8d"}
                  fontSize={{ base: "13px", }}
                  alignSelf={"start"}
                >
                  Select DEX router that you want to add liquidity for token.
                </Text>
              </VStack>

              <Box w="full" pt="1 0px">
                <TextHorizon
                  title={`Liquidity Locking Time`}
                  value={`Infinite`}
                />
              </Box>

              <VStack w="full">
                <FormItem
                  formik={formik}
                  name="liquidity"
                  label="Liquidity(%)"
                  isRequired
                >
                  <Input
                    type="number"
                    onChange={(e) => {
                      formik.setFieldValue("liquidity", e.target.value);
                    }}
                    placeholder="Liquidity"
                    {...styleInput}
                  />
                </FormItem>
                <Text
                  fontWeight="400"
                  color={"#8d8d8d"}
                  fontSize={{ base: "13px", }}
                  alignSelf={"start"}
                >
                  Enter the ratio of raised funds that should be allocated to liquidity. The liquidity value must fall within the range of 60% to 100%.
                </Text>
              </VStack>

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
                  fontSize={{ base: "13px", }}
                  alignSelf={"start"}
                >
                  Select the date you want to run the fairlaunch.

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
                  fontSize={{ base: "13px", }}
                  alignSelf={"start"}
                >
                  Select the date you want to run the fairlaunch.
                  Presale pool end time must not exceed 45 days from creation.
                </Text>
              </VStack>

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

              <HStack mt="25px">
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
  );
};
