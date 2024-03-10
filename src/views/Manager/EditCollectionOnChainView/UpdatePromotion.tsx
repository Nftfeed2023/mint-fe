import 'react-quill/dist/quill.snow.css';

import {
  Button, FormControl,
  Input, Box, HStack, Flex, InputProps, FormLabel, FormErrorMessage, InputGroup, InputRightAddon,
} from '@chakra-ui/react';

import { useEffect } from 'react';
import * as yup from 'yup';

import { FieldArray, FormikProvider, useFormik } from "formik";
import { NftCollection } from "~/dto/nft-project.dto";
import { MinusIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { useUpdatePromotion } from "../hooks/useUpdatePromotion";
import { UpdatePromotionReq } from "~/dto/nft-collection.dto";

interface IUpdatePromotionProps extends NftCollection {

}

const validationSchema = yup.object({
  promotions: yup.array().of(
    yup.object().shape({
      percent: yup.number().min(0).max(30),
      qty: yup.number().min(1).max(40),
    })
  )
})

const UpdatePromotion = ({ address }: IUpdatePromotionProps) => {



  const { isLoading, updatePromotion, promotions } = useUpdatePromotion({ address });
  const formik = useFormik<UpdatePromotionReq>({

    initialValues: {
      promotions: []
    },
    validationSchema,
    onSubmit: values => {

      updatePromotion({
        promotions: values.promotions
      });
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
    if (promotions && promotions.length > 0) {
      formik.setValues({
        promotions
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promotions]);


  const checkError = (fieldName: string, index: number) => {
    return formik.errors && formik.errors.promotions &&
      formik.errors.promotions.length > 0 && formik.errors?.promotions[index]?.[fieldName]
      &&
      formik.touched && formik.touched.promotions &&
      formik.touched.promotions.length > 0 && formik.touched?.promotions[index]?.[fieldName]
  }

  return (
    <Box w={"100%"}>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <FieldArray
            name="promotions"
            render={(arrayHelpers) => {
              return (
                <>
                  {formik.values.promotions.map((item, index) => (
                    <HStack>
                      <FormControl isInvalid={checkError("qty", index)} >
                        <FormLabel >Qty(Max 40 NFT)</FormLabel>
                        <Input
                          name={`promotions[${index}].qty`}
                          value={formik.values.promotions[index].qty}
                          onChange={formik.handleChange}
                          placeholder="Qty"
                          disabled={false}
                          type="number"
                          {...styleInput}
                        />
                        {checkError("qty", index) && (
                          <FormErrorMessage>
                            {formik.errors?.promotions[index]["qty"] as string}
                          </FormErrorMessage>
                        )}
                      </FormControl>

                      <FormControl

                        isInvalid={checkError("percent", index)}
                      >
                        <FormLabel >Percent(max 30%)</FormLabel>

                        <InputGroup
                          {...styleInput}
                        >
                          <Input
                            name={`promotions[${index}].percent`}
                            value={formik.values.promotions[index].percent}
                            onChange={formik.handleChange}
                            placeholder="Percent"
                            disabled={false}
                            type="number"
                          />
                          <InputRightAddon children='%' />
                        </InputGroup>
                        {/* <Input
                          name={`promotions[${index}].percent`}
                          value={formik.values.promotions[index].percent}
                          onChange={formik.handleChange}
                          placeholder="Percent"
                          disabled={false}
                          type="number"
                          {...styleInput}
                        /> */}
                        {checkError("percent", index) && (
                          <FormErrorMessage>
                            {formik.errors?.promotions[index]["percent"] as string}
                          </FormErrorMessage>
                        )}

                      </FormControl>
                      <Box>
                        <FormLabel>Remove</FormLabel>
                        <Button colorScheme="red"
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        ><MinusIcon />
                        </Button>
                      </Box>




                    </HStack>
                  ))}
                  <Flex h={"20px"} />
                  <HStack>
                    <FormControl >

                      <Button
                        bg="yellow.primary !important"
                        borderRadius="8px"
                        fontWeight="600"
                        fontSize="16px"
                        lineHeight="20px"
                        h="auto"
                        color="black.1d"
                        w="30%"
                        p="10px"
                        isLoading={isLoading}
                        rightIcon={<PlusSquareIcon />}
                        type="button"
                        onClick={() => arrayHelpers.push({ qty: 0, percent: 0 })}
                      >
                        Add
                      </Button>
                    </FormControl>
                  </HStack>
                </>
              )
            }}
          />


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
            Update promotion
          </Button>

        </form>
      </FormikProvider>

    </Box>
  )
}
export default UpdatePromotion;
