import React, { forwardRef } from "react";
import ResizeTextarea from "react-textarea-autosize";
import { Textarea, TextareaProps } from "@chakra-ui/react";

export const AutoResizeTextarea = forwardRef<HTMLTextAreaElement, TextareaProps & { disabled?: boolean, minRows?: number }>((props, ref) => {
    return (
        <Textarea
            minH="unset"
            overflow="hidden"
            w="100%"
            resize="none"
            ref={ref}
            minRows={3}
            as={ResizeTextarea}
            {...props}

        />
    );
});