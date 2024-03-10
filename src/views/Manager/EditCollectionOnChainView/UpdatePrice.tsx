import 'react-quill/dist/quill.snow.css';

import {
  Button, FormControl,
  Input, Box, HStack, Flex, InputProps, FormLabel,
} from '@chakra-ui/react';

import { useEffect } from 'react';
import * as yup from 'yup';

import { useFormik } from "formik";
import FormItem from "../FormItem";
import { NftCollection } from "~/dto/nft-project.dto";
import { useUpdatePrice } from "../hooks/useUpdatePrice";
import { EVM_CHAIN_LIST } from "~/@config/chain-list";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";

interface IUpdatePriceProps extends NftCollection {

}

const validationSchema = yup
  .object()
  .shape({
    chainId: yup.number().required(),
    address: yup.string(),
    price: yup.number(),
  });

const UpdatePrice = ({ price, address, chainId }: IUpdatePriceProps) => {



  const { isLoading, updatePrice } = useUpdatePrice();
  const { nativeCurrency } = EVM_CHAIN_LIST[chainId] || { chainName: "", logo: "", dislayName: "", nativeCurrency: { symbol: "" } }
  const formik = useFormik({
    initialValues: {
      price, address, chainId
    },
    validationSchema,
    onSubmit: values => {
      updatePrice(values);
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
    if (price !== null && price !== undefined && address) {
      formik.setValues({
        price, address, chainId
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, price]);

  return (
    <Box w={"100%"}>
      <form onSubmit={formik.handleSubmit}>
        <HStack>
          <FormItem

            formik={formik}
            name="price"
            label={`NFT Price (${nativeCurrency?.symbol})`}
          >
            <Input
              placeholder="Price"
              disabled={false}
              type="number"
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
export default UpdatePrice;
