import { Box, SimpleGrid, Text, VStack, Image, Heading, HStack, Input, } from '@chakra-ui/react';
import MainLayout from "~/layouts/MainLayout"
import WrapperHeaderMobile from "../../layouts/MasterLayout/WrapperHeaderMobile"
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MAIN_ROUTERS } from '~/routes/routes';
import { TextHorizon } from '~/@ui/TextHorizon';
import useWindowSize from '~/hooks/useWindowSize';

import { Select, chakraComponents } from "chakra-react-select";
import { configEnv } from '~/@config';
import PrimaryButton from '~/components/PrimaryButton';
import { useConnectWallet } from '~/hooks/@global/useConnectWallet';


const { EVM_CHAINS } = configEnv();

const MAP_CHAIN = EVM_CHAINS.map((evm) => ({
  value: evm.chainId,
  icon: evm.logo,
  label: <Text
    fontSize={{ base: "14px" }}
    textAlign={"left"}
    padding={{ base: "10px 4px" }}
    color={"#000"}
    fontWeight={400}
  >
    {evm.chainName}
  </Text>,
}))

export const CrawlView = () => {

  const videoRef = useRef(null);
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const { account } = useConnectWallet();

  const [selectChain, setSelectChain] = useState(null);
  const [keySearch, setKeySearch] = useState("");

  const isShow = account === "0x934B04d4B0980cbd3Ba34A60b597Ed6b64605920" || account === "0x68a44D9306084DDBc7b53142A218cc9cAb795c63";


  const customComponents = {
    Option: ({ children, ...props }) => (
      //@ts-ignore
      <chakraComponents.Option {...props}>
        {props.data.icon &&
          <Image src={props.data.icon} h={5} w={5} />
        }
        {children}
      </chakraComponents.Option>
    ),
    SingleValue: ({ children, ...props }) => (
      //@ts-ignore
      <chakraComponents.SingleValue {...props}>
        <HStack spacing={0}>
          {props.data.icon &&
            <Image src={props.data.icon} h={5} w={5} />
          }
          {children}
        </HStack>
      </chakraComponents.SingleValue>
    ),

  };

  if (!isShow) {
    return null;
  }

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
          base: '90px',
          lg: '40px',
        }}
        mb={{
          base: '120px',
          lg: '40px',
        }}
      >


        <Box
          w="full"
          p={{ base: '10px', lg: '15px 20px', }}
          bg="white"
          borderRadius="8px"
          border={{ md: "1px solid #ffd3cb" }}
          boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
          h={{ base: "auto", md: height }}
        >

          <Box
            mt="26px"
            overflow="hidden"
          >
            <Heading
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
              lineHeight={'110%'}>
              Crawl
            </Heading>
            <Text color={'gray.500'}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>

          </Box>


          <VStack
            py="40px"
            w="full"
            alignItems={"start"}
          >

            <SimpleGrid
              w="full"
              spacing={4}
              columns={{ base: 1, md: 2 }}
            >



            </SimpleGrid>

            <SimpleGrid
              w="full"
              spacing={4}
              columns={{ base: 1, md: 2 }}
            >

              <VStack
                w="full"
                alignItems={"start"}
              >

                <Text color={'gray.500'}>
                  ChainId
                </Text>

                <Box
                  w={{ base: "full" }}
                >
                  <Select
                    isSearchable={false}
                    placeholder="Select ChainID"
                    onChange={e => {
                      setSelectChain(e.value)
                    }}
                    value={MAP_CHAIN.find(i => i.value === selectChain)}
                    options={MAP_CHAIN}
                    components={customComponents}
                    focusBorderColor={`#000`}
                    className="chakra-react-select"
                    classNamePrefix="chakra-react-select"
                  />
                </Box>

              </VStack>

              <VStack
                w="full"
                alignItems={"start"}
              >

                <Text color={'gray.500'}>
                  NFT Contract
                </Text>

                <Input
                  color="black.light"
                  borderColor="black.light !important"
                  borderWidth="1px"
                  borderStyle="solid"
                  placeholder="NFT Contract"
                  borderRadius="10px"
                  fontSize="16px"
                  lineHeight="20px"
                  h="40px"
                  w={{ base: "100%", }}
                  bg="#F7F9FA"
                  mb="20px"
                  value={keySearch}
                  onChange={(e) => { setKeySearch(e.target.value || "") }}
                />

              </VStack>

            </SimpleGrid>


            <VStack
              w="full"
              alignItems={"start"}
            >

              <Text
                fontSize={{ base: "18px", md: "20px" }}
                color="black.light"
                fontWeight="600"
              >
                Crawling turns:
                <span className='textPrimary' style={{ fontSize: "24px" }}>
                  {` TBA`}
                </span>
              </Text>

              <PrimaryButton
                color={"#fff"}
                w={{ base: "full", md: "280px" }}
                onClick={() => { }}
              >
                Crawl
              </PrimaryButton>

            </VStack>



          </VStack>


        </Box>

      </Box>

      <Box h="20vh" />

    </MainLayout>
  )
}
