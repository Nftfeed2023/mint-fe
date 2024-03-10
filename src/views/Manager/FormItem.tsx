import { FormControl, FormLabel, FormErrorMessage, FormControlProps } from "@chakra-ui/react";
import React, { PropsWithChildren } from "react";
import { FormikProps } from "formik";

interface IProps<T = any> extends FormControlProps {
  name: string;
  formik: FormikProps<T>;
  label?: string;
}

const FormItem = ({ formik, name, children, label = "", ...restProps }: PropsWithChildren<IProps>) => {
  const names = name.split(".");

  let valError: any = Object.assign({}, formik.errors);
  let valTouched: any = Object.assign({}, formik.touched);

  for (const key of names) {
    if (valError !== null && valError !== undefined) {
      valError = valError[key];
    }
  }
  for (const key of names) {
    if (valTouched !== null && valTouched !== undefined) {
      valTouched = valTouched[key];
    }
  }

  return <FormControl {...restProps} isInvalid={Boolean(valError && valTouched)}>
    <FormLabel htmlFor={name}>{label || ""}</FormLabel>
    {children && React.isValidElement(children) && React.cloneElement(children, { ...formik.getFieldProps(name) })}

    {valError && valTouched && (
      <FormErrorMessage>
        {valError as string}
      </FormErrorMessage>
    )}
  </FormControl>
}

export default FormItem;
