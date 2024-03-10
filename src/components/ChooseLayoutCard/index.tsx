import { Box, HStack, Icon, Text, Image } from "@chakra-ui/react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaThList, } from "react-icons/fa";
import useWindowSize from "~/hooks/useWindowSize"
import { Select, chakraComponents } from "chakra-react-select";
import { configEnv } from "~/@config";
import { useState } from "react";

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

const DATA_SELECT_CHAIN = [{
  value: 0,
  icon: null,
  label: <Text
    fontSize={{ base: "14px" }}
    lineHeight={{ base: "normal", }}
    textAlign={"left"}
    padding={{ base: "10px 4px" }}
    color={"#000"}
    fontWeight={400}
  >
    All Chain
  </Text>,
},
...MAP_CHAIN
]

export const ChooseLayoutCard = (props: {
  chooseLayout: string,
  onChangeLayout: (value: "grid" | "table") => void
  selectChain: number,
  setSelectChain: (value: number) => void
  evn: number,
  setEvn: (value: number) => void
}) => {

  const { width } = useWindowSize();
  const {
    chooseLayout, onChangeLayout,
    selectChain, setSelectChain,
    evn, setEvn
  } = props

  // if (width < 500) {
  //   return null;
  // }

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

  return (
    <HStack
      spacing={2}
    >

      <HStack
        spacing={0}
        w={{ base: "full", md: "180px" }}
      >

        <HStack
          w="full"
          cursor={{ lg: "pointer" }}
          bg={evn === 1 ? "yellow.primary" : "#fff"}
          borderColor={"#000"}
          borderWidth="1px"
          padding="2px 8px"
          borderStartRadius={"12px"}
          onClick={() => { setEvn(1) }}
        >
          <Text
            fontSize={{ base: "14px" }}
            lineHeight={{ base: "normal", }}
            textAlign={"left"}
            padding={{ base: "10px 4px" }}
            color={evn === 1 ? "#FFF" : "#000"}
            fontWeight={evn === 1 ? 600 : 400}
          >
            Mainnet
          </Text>
        </HStack>

        <HStack
          w="full"
          bg={evn === 0 ? "yellow.primary" : "#fff"}
          borderColor={"#000"}
          borderWidth="1px"
          padding="2px 8px"
          borderEndRadius={"12px"}
          cursor={{ lg: "pointer" }}
          onClick={() => { setEvn(0) }}
        >
          <Text
            fontSize={{ base: "14px" }}
            lineHeight={{ base: "normal", }}
            textAlign={"left"}
            padding={{ base: "10px 4px" }}
            color={evn === 0 ? "#FFF" : "#000"}
            fontWeight={evn === 0 ? 600 : 400}
          >
            Testnet
          </Text>
        </HStack>

      </HStack>

      <Box
        w={{ base: "full", md: "180px" }}
      >
        <Select
          isSearchable={false}
          placeholder="Select Chain"
          onChange={e => {
            setSelectChain(e.value)
          }}
          value={DATA_SELECT_CHAIN.find(i => i.value === selectChain)}
          options={DATA_SELECT_CHAIN}
          components={customComponents}
          focusBorderColor={`#000`}
          className="chakra-react-select"
          classNamePrefix="chakra-react-select"
        />
      </Box>

      {width > 500 &&
        <HStack
          spacing={0}
        >

          <HStack
            cursor={{ lg: "pointer" }}
            bg="#fff"
            borderColor={"#000"}
            borderWidth="1px"
            padding="2px 8px"
            borderStartRadius={"12px"}
            onClick={() => onChangeLayout("grid")}
          >
            <Icon
              as={FaThList}
              w="24px"
              h="24px"
              color={chooseLayout === "grid" ? "#ee3824" : "inherit"}
            />
            <Text
              fontSize={{ base: "14px" }}
              lineHeight={{ base: "normal", }}
              textAlign={"left"}
              padding={{ base: "10px 4px" }}
              color={"#000"}
              fontWeight={400}
            >
              Grid
            </Text>
          </HStack>

          <HStack
            bg="#fff"
            borderColor={"#000"}
            borderWidth="1px"
            padding="2px 8px"
            borderEndRadius={"12px"}
            cursor={{ lg: "pointer" }}
            onClick={() => onChangeLayout("table")}
          >
            <Icon
              as={BsFillGrid3X3GapFill}
              w="24px"
              h="24px"
              color={chooseLayout === "table" ? "#ee3824" : "inherit"}
            />
            <Text
              fontSize={{ base: "14px" }}
              lineHeight={{ base: "normal", }}
              textAlign={"left"}
              padding={{ base: "10px 4px" }}
              color={"#000"}
              fontWeight={400}
            >
              Table
            </Text>
          </HStack>

        </HStack>
      }

    </HStack>
  )
}
