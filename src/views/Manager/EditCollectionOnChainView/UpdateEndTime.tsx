import 'react-quill/dist/quill.snow.css';

import {
  Button, FormControl,
  Input, Box, HStack, Flex, InputProps, FormLabel,
} from '@chakra-ui/react';

import { useEffect } from 'react';
import * as yup from 'yup';

import { useFormik } from "formik";
import FormItem from "../FormItem";
import { useEditCollectionV2 } from "../hooks/useEditCollectionV2";
import { NftCollection } from "~/dto/nft-project.dto";
import { EVM_CHAIN_LIST } from "~/@config/chain-list";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import { useUpdateEndTime } from "../hooks/useUpdateEndTime";
import dayjs from "dayjs";


interface IUpdateEndTimeProps extends NftCollection {

}

const validationSchema = yup
  .object()
  .shape({
    chainId: yup.number().required(),
    address: yup.string(),
    endTime: yup.date().required(),
  });

const UpdateEndTime = ({ endTime, address, chainId }: IUpdateEndTimeProps) => {


  const { isLoading, updateEndTime } = useUpdateEndTime();
  const formik = useFormik({
    initialValues: {
      endTime: dayjs(endTime).format("YYYY-MM-DD HH:mm"), address, chainId
    },
    validationSchema,
    onSubmit: values => {
      updateEndTime(values);
    },

  });


  const styleInputDisable: InputProps = {
    textAlign: "left",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "20px",
  }
  const styleInput: InputProps = {
    ...styleInputDisable,
    borderColor: "#448AFF !important",
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "10px",
    bg: "#F7F9FA",
  }



  useEffect(() => {
    if (endTime && address) {
      formik.setValues({
        endTime: dayjs(endTime).format("YYYY-MM-DD HH:mm"), address, chainId
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <Box w={"100%"}>
      <form onSubmit={formik.handleSubmit}>
        <HStack>
          <FormItem

            formik={formik}
            name="endTime"
            label="End time of NFT Free Mint"
          >
            <Input
              disabled={false}
              placeholder="End time of NFT Free Mint"
              type="datetime-local"
              {...styleInput}

            />
          </FormItem>



          <FormControl >
            <FormLabel >{"Action"}</FormLabel>
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
        </HStack>
        <Flex h={"20px"} />

      </form>
    </Box>
  )
}
export default UpdateEndTime;
