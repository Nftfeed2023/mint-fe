import "react-quill/dist/quill.snow.css";

import {
  Button,
  FormControl,
  Input,
  Box,
  InputProps,
  FormLabel,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useCallback, useEffect } from "react";
import * as yup from "yup";

import { useFormik } from "formik";
import dayjs from "dayjs";
import FormItem from "../../Manager/FormItem";

const validationSchema = yup.object().shape({
  chainId: yup.number().required(),
  address: yup.string(),
  startTime: yup.date().required(),
});

export const UpdateStartTimeOnChain = (props: {
  address: string;
  chainId: number;
  startTime: Date;
  isLoading: boolean;
  onUpdate: (startTime: string, chainId: number, presaleAddress: string) => void;
}) => {
  const { address, chainId, startTime, onUpdate, isLoading } = props;
  const formik = useFormik({
    initialValues: {
      startTime: dayjs(startTime).format("YYYY-MM-DD HH:mm"),
      address,
      chainId,
    },
    validationSchema,
    onSubmit: (values) => {
      onUpdate(values.startTime, chainId, address);
    },
  });

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

  useEffect(() => {
    if (startTime && address) {
      formik.setValues({
        startTime: dayjs(startTime).format("YYYY-MM-DD HH:mm"),
        address,
        chainId,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, startTime]);

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

  return (
    <Box w={"100%"}>
      <form onSubmit={formik.handleSubmit}>
        <VStack
          w="full"
        >

          <SimpleGrid w="full" spacing={2} columns={{ base: 1, md: 2 }}>

            <FormItem formik={formik} name="startTime" label="Start time">
              <Input
                disabled={false}
                placeholder="Start time"
                type="datetime-local"
                {...styleInput}
              />
            </FormItem>

            <FormControl>
              <FormLabel>{"Action"}</FormLabel>
              <Button
                bg="yellow.primary !important"
                borderRadius="8px"
                fontWeight="600"
                fontSize="16px"
                lineHeight="20px"
                h="auto"
                color="black.1d"
                w="full"
                p="10px"
                type="submit"
                isLoading={isLoading}
              >
                Update
              </Button>
            </FormControl>

          </SimpleGrid>
          {renderTextStartTime()}

        </VStack>

      </form>
    </Box>
  );
};
