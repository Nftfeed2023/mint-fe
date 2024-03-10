import { Box, Icon, Text } from "@chakra-ui/react";
import Upload, { UploadProps } from "rc-upload";
import { BeforeUploadFileType, RcFile, UploadRequestOption } from "rc-upload/lib/interface";
import React, { useState, useEffect, ReactNode } from "react";
import { MdFileUpload } from "react-icons/md";





interface IDefUploadProps extends Omit<UploadProps, "customRequest"> {
  name: string;
  value: string;
  requestUpload: (file: Exclude<BeforeUploadFileType, File | boolean> | RcFile) => Promise<string>;
  //   onChange?: (value: string) => void;
  children?: ReactNode
}

const DefUpload = React.forwardRef<any, IDefUploadProps>((props, ref) => {
  const { onChange, requestUpload, children, name, value, ...restProps } = props;



  const customRequest = async (options: UploadRequestOption) => {
    const { onSuccess, onError, file, onProgress } = options;
    try {
      onProgress({ percent: 0 });
      const url = await requestUpload(file);
      onProgress({ percent: 100 });
      onSuccess({ value: url });
      if (onChange) {
        onChange({
          target: {
            value: url,
            name
          }
        } as any);
      }
    } catch (error) {
      onError(error);
    }
  };



  return (
    <Upload
      {...restProps}
      name={name}
      customRequest={customRequest}
      ref={ref}
      onChange={onChange}
    >
      {children || <Box
        p="4"
        bg="gray.100"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Icon
          as={MdFileUpload}
          w={8}
          h={8}
          mb="3"
          color="gray.600"
        />
        <Text color="gray.700" fontWeight="semibold">
          {"Click or drag file to this area to upload"}
        </Text>
      </Box>}

    </Upload>
  );
});

export default DefUpload;
