import { Box, Text, Input, Textarea, Image, VStack } from '@chakra-ui/react';
import MainLayout from "~/layouts/MainLayout"
import WrapperHeaderMobile from "../../layouts/MasterLayout/WrapperHeaderMobile"
import { useCallback, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import PrimaryButton from '~/components/PrimaryButton';
import userService from '~/services/user.service';
import useCustomToast from '~/hooks/@global/useCustomToast';
import { templateMail1, templateMailCode } from './template';

import ImageTemplate from '~/assets/images/template_mail.jpg'

export const SendmailView = () => {

  const toast = useCustomToast();
  const [isLoading, setIsLoading] = useState(false);

  const [subject, setSubject] = useState(null);
  const [content, setContent] = useState("");
  const [recipients, setRecipients] = useState("");

  const [imgUrl, setImgUrl] = useState("");
  const [mintUrl, setMintUrl] = useState("");
  const [headerMail, setHeaderMail] = useState("");

  const parseMail = () => {
    let templateMail = templateMailCode;

    templateMail = templateMail.replace("{{IMAGE_HERO}}", imgUrl);
    templateMail = templateMail.replace("{{HEADER_MAIL}}", headerMail);
    templateMail = templateMail.replace("{{CONTENT}}", content);
    templateMail = templateMail.replace("{{URL_MINT}}", mintUrl);

    return templateMail;
  }

  const sendMail = useCallback(async () => {
    setIsLoading(true);
    try {

      const body = {
        subject,
        content: parseMail(),
      }
      console.log(body);

      await userService.sendMail(body);
      toast.show({
        type: "success",
        description: "Send Mail Success"
      })
    } catch (error) {
      console.log({ error });
      toast.show({
        type: "error",
        description: error
      })

    }
    setIsLoading(false);

  }, [parseMail, subject,]);

  const sendMailMultiple = useCallback(async () => {
    setIsLoading(true);
    try {

      const body = {
        recipients: recipients.split(";"),
        subject,
        content: parseMail(),
      }
      console.log(body, recipients);

      await userService.sendMailMultiple(body);
      toast.show({
        type: "success",
        description: "Send Mail Multiple Success"
      })
    } catch (error) {
      console.log({ error });
      toast.show({
        type: "error",
        description: error
      })

    }
    setIsLoading(false);

  }, [parseMail, recipients, subject,]);

  return (
    <MainLayout>

      <WrapperHeaderMobile />

      <Box
        mr={{
          base: '5px',
          xl: '41px',
        }}
        ml={{
          base: '5px',
          xl: '47px',
        }}
        mt={{
          base: '50px',
          lg: '40px',
        }}
        mb={{
          base: '120px',
          lg: '40px',
        }}
      >


        <Text>Subject</Text>
        <Input
          color="black.light"
          borderColor="black.light !important"
          borderWidth="1px"
          borderStyle="solid"
          placeholder="Search address"
          borderRadius="10px"
          fontSize="16px"
          lineHeight="20px"
          h="40px"
          w={{ base: "100%", }}
          bg="#F7F9FA"
          mb="20px"
          value={subject}
          onChange={(e) => { setSubject(e.target.value || "") }}
        />

        <VStack py="10px">
          <Text>Mail Example</Text>
          <Image src={ImageTemplate} w="500px" h="250px" />
        </VStack>


        <Text>Image Url</Text>
        <Input
          color="black.light"
          borderColor="black.light !important"
          borderWidth="1px"
          borderStyle="solid"
          placeholder="Search address"
          borderRadius="10px"
          fontSize="16px"
          lineHeight="20px"
          h="40px"
          w={{ base: "100%", }}
          bg="#F7F9FA"
          mb="20px"
          value={imgUrl}
          onChange={(e) => { setImgUrl(e.target.value || "") }}
        />

        <Text>Mint Url</Text>
        <Input
          color="black.light"
          borderColor="black.light !important"
          borderWidth="1px"
          borderStyle="solid"
          placeholder="Search address"
          borderRadius="10px"
          fontSize="16px"
          lineHeight="20px"
          h="40px"
          w={{ base: "100%", }}
          bg="#F7F9FA"
          mb="20px"
          value={mintUrl}
          onChange={(e) => { setMintUrl(e.target.value || "") }}
        />

        <Text>Header Mail</Text>
        <ReactQuill
          style={{
            width: "100%",
            maxHeight: 150,
            height: 150,
            marginBottom: 80
          }}

          formats={[
            'header', 'font', 'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image', 'video', 'color'
          ]}
          modules={{
            toolbar: [
              [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ 'color': ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' },
              { 'indent': '-1' }, { 'indent': '+1' }],
              ['link', 'image', 'video'],
              ['clean']
            ],
            clipboard: {
              // toggle to add extra line breaks when pasting HTML:
              matchVisual: false,
            }
          }}

          placeholder={"NFT Description"}
          theme="snow"
          value={headerMail}
          onChange={(value, delta, source, editor) => {
            setHeaderMail(value)
          }}
        />

        <Text>Content</Text>
        <ReactQuill
          style={{
            width: "100%",
            maxHeight: 150,
            height: 150,
            marginBottom: 80
          }}

          formats={[
            'header', 'font', 'size',
            'bold', 'italic', 'underline', 'strike', 'blockquote',
            'list', 'bullet', 'indent',
            'link', 'image', 'video', 'color'
          ]}
          modules={{
            toolbar: [
              [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ 'color': ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' },
              { 'indent': '-1' }, { 'indent': '+1' }],
              ['link', 'image', 'video'],
              ['clean']
            ],
            clipboard: {
              // toggle to add extra line breaks when pasting HTML:
              matchVisual: false,
            }
          }}

          placeholder={"NFT Description"}
          theme="snow"
          value={content}
          onChange={(value, delta, source, editor) => {
            setContent(value)
          }}
        />

        <PrimaryButton
          isLoading={isLoading}
          isDisabled={isLoading}
          onClick={sendMail}
        >
          Send All Mail
        </PrimaryButton>


        <Text
          mt="10px"
        >
          Recipients (Format mail : abc@gmail.com;abc1@gmail.com)
        </Text>
        <Textarea
          color="black.light"
          borderColor="black.light !important"
          borderWidth="1px"
          borderStyle="solid"
          placeholder="Search address"
          borderRadius="10px"
          fontSize="16px"
          lineHeight="20px"
          h="40px"
          w={{ base: "100%", }}
          bg="#F7F9FA"
          mb="20px"
          value={recipients}
          onChange={(e) => { setRecipients(e.target.value || "") }}
        />

        <PrimaryButton
          mt="10px"
          isLoading={isLoading}
          isDisabled={isLoading}
          onClick={sendMailMultiple}
        >
          Send Mail Multiple
        </PrimaryButton>

      </Box>


    </MainLayout>
  )
}
