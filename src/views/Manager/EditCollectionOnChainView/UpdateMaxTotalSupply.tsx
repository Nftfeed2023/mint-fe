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
import { useUpdateMaxTotalSupply } from "../hooks/useUpdateMaxTotalSupply";

interface IUpdateMaxTotalSupplyProps extends NftCollection {

}

const validationSchema = yup
  .object()
  .shape({
    chainId: yup.number().required(),
    address: yup.string(),
    maxTotalSupply: yup.number(),
  });

const UpdateMaxTotalSupply = ({ maxTotalSupply, address, chainId }: IUpdateMaxTotalSupplyProps) => {



  const { isLoading, updateMaxTotalSupply } = useUpdateMaxTotalSupply();
  const formik = useFormik({
    initialValues: {
      maxTotalSupply, address, chainId
    },
    validationSchema,
    onSubmit: values => {
      updateMaxTotalSupply(values);
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
    if (maxTotalSupply !== null && maxTotalSupply !== undefined && address) {
      formik.setValues({
        maxTotalSupply, address, chainId
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, maxTotalSupply]);

  return (
    <Box w={"100%"}>
      <form onSubmit={formik.handleSubmit}>
        <HStack>
          <FormItem

            formik={formik}
            name="maxTotalSupply"
            label="NFT Total Supply (=0 or not set unlimited)"
          >
            <Input
              placeholder="NFT Total Supply"
              type="number"

              {...styleInput}
            />
          </FormItem>
          <FormControl  >
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
export default UpdateMaxTotalSupply;
