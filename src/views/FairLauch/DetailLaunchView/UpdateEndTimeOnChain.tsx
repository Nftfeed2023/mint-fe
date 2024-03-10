import "react-quill/dist/quill.snow.css";

import {
  Button,
  FormControl,
  Input,
  Box,
  Text,
  Flex,
  InputProps,
  FormLabel,
  SimpleGrid,
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
  endTime: yup.date().required(),
});

export const UpdateEndTimeOnChain = (props: {
  address: string;
  chainId: number;
  endTime: Date;
  isLoading: boolean;
  onUpdate: (endTime: string, chainId: number, presaleAddress: string) => void;
}) => {
  const { address, chainId, endTime, onUpdate, isLoading } = props;
  const formik = useFormik({
    initialValues: {
      endTime: dayjs(endTime).format("YYYY-MM-DD HH:mm"),
      address,
      chainId,
    },
    validationSchema,
    onSubmit: (values) => {
      onUpdate(values.endTime, chainId, address);
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
    if (endTime && address) {
      formik.setValues({
        endTime: dayjs(endTime).format("YYYY-MM-DD HH:mm"),
        address,
        chainId,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, endTime]);

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
    <Box w={"100%"}>
      <form onSubmit={formik.handleSubmit}>

        <VStack w="full" >

          <SimpleGrid w="full" spacing={2} columns={{ base: 1, md: 2 }}>
            <FormItem formik={formik} name="endTime" label="End time">
              <Input
                disabled={false}
                placeholder="End time"
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
          {renderTextEndTime()}
        </VStack>


      </form>
    </Box>
  );
};
