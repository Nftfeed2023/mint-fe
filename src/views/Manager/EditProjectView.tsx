import { Accordion, Image, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Center, FormControl, FormHelperText, FormLabel, Grid, GridItem, HStack, Icon, Input, Radio, RadioGroup, SimpleGrid, Text, VStack, Divider, Textarea, ButtonGroup, Flex, Spacer, useDisclosure, } from '@chakra-ui/react';

import useWindowSize from '~/hooks/useWindowSize';
import MainLayout from '~/layouts/MainLayout';
import WrapperHeaderMobile from '~/layouts/MasterLayout/WrapperHeaderMobile';

import Upload from 'rc-upload';
import { MdFileUpload } from 'react-icons/md'
import { uploadApiService } from '~/services/@global';
import DefUpload from '~/@ui/DefUpload';
import { ChangeEvent, useCallback, useState } from 'react';
import ManagerLayout from '~/layouts/ManagerLayout';
import dayjs from 'dayjs';

import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import { CreateProjectReq, NftCollectionDto } from "~/dto/nft-project.dto";
import { EVM_CHAIN_LIST } from "~/@config/chain-list";
import ModalSwitchChain from "~/container/ModalSwitchChain";
import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import { useCreateProjectV2 } from "./hooks/useCreateProjectV2";

export const EditProjectView = () => {
  const { width } = useWindowSize();

  const { chainId, account } = useConnectWallet();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chainName, logo, dislayName, nativeCurrency } = EVM_CHAIN_LIST[chainId] || { chainName: "", logo: "", dislayName: "", nativeCurrency: { symbol: "" } }


  const [projectForm, setProjectForm] = useState<CreateProjectReq>({
    name: "",
    desc: "",
    banner: "",
    logo: "",
    managerAddress: account
  });
  const [collectionForm, setCollectionForm] = useState<NftCollectionDto>({
    chainId,
    name: "",
    desc: "",
    image: "",
    price: 0,
    address: "",
    exactPrice: "0",
    symbol: "",
    maxTotalSupply: 0,
    endTime: "",
    website: "",
    twitter: "",
    discord: "",
    telegram: "",
    maxAllocationPerUser: 0,
    percentAff: 0
  });

  const onChangeProjectForm = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log(`-------------------`);
    console.log({
      [e.target.name]: e.target.value
    });
    console.log(`-------------------`);
    setProjectForm({
      ...projectForm,
      [e.target.name]: e.target.value
    })
  }, [projectForm])

  const onChangeCollectionForm = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCollectionForm({
      ...collectionForm,
      [e.target.name]: e.target.value
    })
  }, [collectionForm]);

  const clearForm = () => {
    setCollectionForm({
      chainId,
      name: "",
      desc: "",
      image: "",
      price: 0,
      address: "",
      exactPrice: "0",
      symbol: "",
      maxTotalSupply: 0,
      endTime: "",
      website: "",
      twitter: "",
      discord: "",
      telegram: "",
      maxAllocationPerUser: 0,
      percentAff: 0
    });

    setProjectForm({
      name: "",
      desc: "",
      banner: "",
      logo: "",
      managerAddress: account
    })

  }


  const { create, isLoading } = useCreateProjectV2();

  return (
    <ManagerLayout>

      <WrapperHeaderMobile />


      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(4, 1fr)"
        alignItems={"center"}
        gap={{
          base: 4,
          lg: 4,
        }}
      >
        <GridItem display={{ base: "none", md: "block" }} />
        <GridItem w='100%' colSpan={{
          base: 4,
          md: 4,
          xl: 2,
          '3xl': 2,
        }}>
          <Text fontSize='4xl' fontWeight={"bold"}>Project setup</Text>
          <VStack mt="10px">
            <FormControl mb="3">
              <FormLabel>Project name</FormLabel>
              <Input
                name='name'
                value={projectForm.name}
                placeholder="Name"
                onChange={onChangeProjectForm}
                onBlur={(e) => { }}
                borderColor="#448AFF !important"
                borderWidth="1px"
                borderStyle="solid"

                borderRadius="10px"
                textAlign="left"
                fontWeight="500"
                fontSize="16px"
                lineHeight="20px"

                bg="#F7F9FA"
                disabled={false}
              />
            </FormControl>

            <FormControl mb="3">
              <FormLabel>Project description</FormLabel>
              {/* <AutoResizeTextarea
                name="desc"
                value={projectForm.desc}
                placeholder="Description"
                onChange={onChangeProjectForm}
                onBlur={(e) => { }}
                borderColor="#448AFF !important"
                borderWidth="1px"
                borderStyle="solid"
                borderRadius="10px"
                textAlign="left"
                fontWeight="500"
                fontSize="16px"
                lineHeight="20px"
                bg="#F7F9FA"
                disabled={false}
                minRows={4}

              /> */}
              <VStack
                w="full"
                pb="50px"
              >
                <ReactQuill
                  style={{ height: 300 }}
                  formats={[
                    'header', 'font', 'size',
                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'list', 'bullet', 'indent',
                    'link', 'image', 'video'
                  ]}
                  modules={{
                    toolbar: [
                      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                      [{ 'size': ['small', false, 'large', 'huge'] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
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
                  placeholder={"Project description"}
                  theme="snow"
                  value={projectForm.desc}
                  onChange={(value, delta, source, editor) => {
                    setProjectForm({
                      ...projectForm,
                      desc: value
                    })
                  }}
                />
              </VStack>

            </FormControl>
            <FormControl mb="3">
              <FormLabel>Project banner {`(<=1MB)`}</FormLabel>
              <DefUpload
                accept="image/*"
                name="banner"
                value={projectForm.banner}
                multiple={false}
                //  onChange={(value) => { setProjectForm({ ...projectForm, banner: value }) }}
                requestUpload={async (file) => {
                  const formData = new FormData();
                  formData.append("file", file);
                  try {
                    const res = await uploadApiService.uploadFile(
                      "https://cdn.nftfeed.guru/api/upload",
                      formData
                    );
                    return (res?.fullUrl as string || "");
                  } catch (err) {
                    return ""
                  }
                }}
              >
                <Center>
                  <Image boxSize={"100%"} src={projectForm.banner} alt='Banner' fallbackSrc={"https://placehold.co/4000x750"} />
                </Center>
              </DefUpload>

            </FormControl>


            <FormControl mb="3">
              <FormLabel>Project logo {`(<=1MB)`}</FormLabel>
              <DefUpload
                accept="image/*"
                name="logo"
                value={projectForm.logo}
                multiple={false}
                //onChange={(value) => { setProjectForm({ ...projectForm, logo: value }) }}
                requestUpload={async (file) => {
                  const formData = new FormData();
                  formData.append("file", file);
                  try {
                    const res = await uploadApiService.uploadFile(
                      "https://cdn.nftfeed.guru/api/upload",
                      formData
                    );
                    return (res?.fullUrl as string || "");
                  } catch (err) {
                    return ""
                  }
                }}
              >
                <Center>
                  <Image boxSize={"30%"} src={projectForm.logo} alt='Logo' fallbackSrc={"https://placehold.co/512"} />
                </Center>
              </DefUpload>

            </FormControl>

          </VStack>
          <Divider orientation='horizontal' h={"50px"} />
          <Text fontSize='4xl' fontWeight={"bold"}>NFT collection setup</Text>
          <VStack mt="10px">
            <FormControl mb="3">
              <FormLabel>Select chain deploy NFT</FormLabel>

              <Box
                cursor="pointer"
                key={chainId}
                onClick={onOpen}
                bg="white"
                role="group"
                borderColor="#448AFF !important"
                borderWidth="1px"
                borderStyle="solid"
                borderRadius="10px"
              >
                <Flex gap={2}>
                  <HStack
                    p={2}
                    bg="#FAFCFE"
                    borderRadius="8px"
                    color="secondary"
                    border="1px solid #f5f5f5"
                    alignItems="center"
                    px={{
                      base: '20px',
                      md: '25px',
                    }}
                    py="4px"
                    spacing={{
                      base: '5px',
                      md: '12px',
                    }}
                  >
                    <Box>
                      <Image src={logo} w="30px" h="30px" />
                    </Box>
                    <Text
                      fontSize="16px"
                      lineHeight="19px"
                      fontWeight="bold"
                      pl="20px"
                    >
                      {dislayName || chainName || ""}
                    </Text>
                  </HStack>
                  <Spacer />
                  <ButtonGroup gap='2'>
                    <Button
                      onClick={onOpen}
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
                      disabled={true}
                    >Select chain</Button>
                  </ButtonGroup>
                </Flex>
              </Box>
            </FormControl>
            <FormControl mb="3">
              <FormLabel>NFT Image {`(<=1MB)`}</FormLabel>
              <DefUpload
                accept="image/*"
                name=""
                value={collectionForm.image}
                multiple={false}
                //    onChange={(value) => { setCollectionForm({ ...collectionForm, image: value }) }}
                requestUpload={async (file) => {
                  const formData = new FormData();
                  formData.append("file", file);
                  try {
                    const res = await uploadApiService.uploadFile(
                      "https://cdn.nftfeed.guru/api/upload",
                      formData
                    );
                    return (res?.fullUrl as string || "");
                  } catch (err) {
                    return ""
                  }
                }}
              >
                <Center>
                  <Image boxSize={"30%"} src={collectionForm.image} alt='Banner' fallbackSrc={"https://placehold.co/512"} />
                </Center>
              </DefUpload>

            </FormControl>
            <FormControl mb="3">
              <FormLabel>Name of the NFT Collection</FormLabel>
              <Input
                name='name'
                value={collectionForm.name}
                placeholder="Name"
                onChange={onChangeCollectionForm}
                onBlur={(e) => { }}
                borderColor="#448AFF !important"
                borderWidth="1px"
                borderStyle="solid"
                borderRadius="10px"
                textAlign="left"
                fontWeight="500"
                fontSize="16px"
                lineHeight="20px"
                bg="#F7F9FA"
                disabled={false}
              />
            </FormControl>

            <FormControl mb="3">
              <FormLabel>NFT Symbol</FormLabel>
              <Input
                name='symbol'
                value={collectionForm.symbol}
                placeholder="NFT Symbol"
                onChange={onChangeCollectionForm}
                onBlur={(e) => { }}
                borderColor="#448AFF !important"
                borderWidth="1px"
                borderStyle="solid"
                borderRadius="10px"
                textAlign="left"
                fontWeight="500"
                fontSize="16px"
                lineHeight="20px"
                bg="#F7F9FA"
                disabled={false}
              />
            </FormControl>

            <FormControl mb="3">
              <FormLabel>NFT Description</FormLabel>
              {/* <AutoResizeTextarea
                name="desc"
                value={collectionForm.desc}
                placeholder="Description"
                onChange={onChangeCollectionForm}
                onBlur={(e) => { }}
                borderColor="#448AFF !important"
                borderWidth="1px"
                borderStyle="solid"

                borderRadius="10px"
                textAlign="left"
                fontWeight="500"
                fontSize="16px"
                lineHeight="20px"

                bg="#F7F9FA"
                disabled={false}
              /> */}
              <VStack
                w="full"
                pb="50px"
              >
                <ReactQuill
                  style={{ height: 300 }}
                  formats={[
                    'header', 'font', 'size',
                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'list', 'bullet', 'indent',
                    'link', 'image', 'video'
                  ]}
                  modules={{
                    toolbar: [
                      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                      [{ 'size': ['small', false, 'large', 'huge'] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
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
                  value={collectionForm.desc}
                  onChange={(value, delta, source, editor) => {
                    setCollectionForm({
                      ...collectionForm,
                      desc: value
                    })
                  }}
                />
              </VStack>
            </FormControl>

            <FormControl mb="3">
              <FormLabel>`NFT Price (${nativeCurrency?.symbol})`</FormLabel>
              <Input
                name="price"
                value={collectionForm.price}
                placeholder="Price"
                type='number'
                onChange={onChangeCollectionForm}
                onBlur={(e) => { }}
                borderColor="#448AFF !important"
                borderWidth="1px"
                borderStyle="solid"
                borderRadius="10px"
                textAlign="left"
                fontWeight="500"
                fontSize="16px"
                lineHeight="20px"
                bg="#F7F9FA"

              />
            </FormControl>

            <FormControl mb="3">
              <FormLabel>NFT Total Supply</FormLabel>
              <Input
                name="maxTotalSupply"
                value={collectionForm.maxTotalSupply}
                placeholder="NFT Total Supply"
                type='number'
                onChange={onChangeCollectionForm}
                onBlur={(e) => { }}
                borderColor="#448AFF !important"
                borderWidth="1px"
                borderStyle="solid"
                borderRadius="10px"
                textAlign="left"
                fontWeight="500"
                fontSize="16px"
                lineHeight="20px"
                bg="#F7F9FA"

              />
            </FormControl>

            <FormControl mb="3">
              <FormLabel>End time of NFT Free Mint</FormLabel>
              <Input
                name="endTime"
                value={collectionForm.endTime}
                placeholder="End time of NFT Free Mint"
                type="datetime-local"
                onChange={onChangeCollectionForm}
                onBlur={(e) => { }}
                borderColor="#448AFF !important"
                borderWidth="1px"
                borderStyle="solid"
                borderRadius="10px"
                textAlign="left"
                fontWeight="500"
                fontSize="16px"
                lineHeight="20px"
                bg="#F7F9FA"
                disabled={false}
              />
            </FormControl>


            <FormControl mb="3">
              <FormLabel>Website</FormLabel>
              <Input
                name='website'
                value={collectionForm.website}
                placeholder="Website"
                onChange={onChangeCollectionForm}
                onBlur={(e) => { }}
                borderColor="#448AFF !important"
                borderWidth="1px"
                borderStyle="solid"
                borderRadius="10px"
                textAlign="left"
                fontWeight="500"
                fontSize="16px"
                lineHeight="20px"
                bg="#F7F9FA"
                disabled={false}
              />
            </FormControl>


            <FormControl mb="3">
              <FormLabel>Twitter</FormLabel>
              <Input
                name='twitter'
                value={collectionForm.twitter}
                placeholder="Twitter"
                onChange={onChangeCollectionForm}
                onBlur={(e) => { }}
                borderColor="#448AFF !important"
                borderWidth="1px"
                borderStyle="solid"
                borderRadius="10px"
                textAlign="left"
                fontWeight="500"
                fontSize="16px"
                lineHeight="20px"
                bg="#F7F9FA"
                disabled={false}
              />
            </FormControl>


            <FormControl mb="3">
              <FormLabel>Discord</FormLabel>
              <Input
                name='discord'
                value={collectionForm.discord}
                placeholder="Discord"
                onChange={onChangeCollectionForm}
                onBlur={(e) => { }}
                borderColor="#448AFF !important"
                borderWidth="1px"
                borderStyle="solid"
                borderRadius="10px"
                textAlign="left"
                fontWeight="500"
                fontSize="16px"
                lineHeight="20px"
                bg="#F7F9FA"
                disabled={false}
              />
            </FormControl>


            <FormControl mb="3">
              <FormLabel>Telegram</FormLabel>
              <Input
                name='telegram'
                value={collectionForm.telegram}
                placeholder="Telegram"
                onChange={onChangeCollectionForm}
                onBlur={(e) => { }}
                borderColor="#448AFF !important"
                borderWidth="1px"
                borderStyle="solid"
                borderRadius="10px"
                textAlign="left"
                fontWeight="500"
                fontSize="16px"
                lineHeight="20px"
                bg="#F7F9FA"
                disabled={false}
              />
            </FormControl>


            <Divider orientation='horizontal' h={"20px"} />
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
              onClick={() => create({
                ...projectForm,
                nftCollection: {
                  ...collectionForm,
                }
              }, clearForm)}
              isLoading={isLoading}
            >
              Edit
            </Button>

          </VStack>
        </GridItem>
        <GridItem display={{ base: "none", md: "block" }} />
      </Grid>

      <ModalSwitchChain
        isOpen={isOpen}
        onClose={onClose}
      />

    </ManagerLayout >
  )
}

