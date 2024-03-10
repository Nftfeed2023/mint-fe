import { useCallback, useMemo, useRef, useState } from 'react'
import {
  Box,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  Menu as MenuCharkra,
  MenuButton,
  MenuList,
  MenuItem as MenuItemCharkra,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Flex,
  Divider,
  Avatar,
  Spacer,
  Image,
  SimpleGrid,
} from '@chakra-ui/react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDownIcon } from '@chakra-ui/icons'

import { ReactComponent as SearchIcon } from '~/assets/svgs/search.svg'
import { ReactComponent as BNBIcon } from '~/assets/svgs/bnb.svg'
import { ReactComponent as BUSDIcon } from '~/assets/svgs/busd.svg'
import { ReactComponent as EnglishIcon } from '~/assets/svgs/english.svg'
import { ReactComponent as WalletIcon } from '~/assets/svgs/wallet.svg'
import { ReactComponent as CopyFilledIcon } from '~/assets/svgs/copy-filled.svg'

import ConnectWalletButton from '../../components/ConnectWalletButton'

import { useTranslation } from 'react-i18next'
import useWindowSize from '~/hooks/useWindowSize'
import useListSearch from '~/hooks/Collections/useListSearch'
import { formatAddress, pipeAmount } from '~/utils'
import { useBlockChain } from '~/hooks/useBlockChain'
import { useConnectWallet } from '~/hooks/@global/useConnectWallet';
import { configEnv } from '~/@config'
import { useSwitchChain } from '~/hooks/@global/useSwitchChain'
import { MAIN_ROUTERS, MANAGER_ROUTERS } from "~/routes/routes"
import PrimaryButton from "~/components/PrimaryButton"
import SecondaryButton from "~/components/SecondaryButton"
import WrapperCopy from '~/components/WrapperCopy'
import ImgLogo from "~/assets/images/logo.png"
import { useCollectionSearch } from "~/views/FreeMintView/hooks/useCollectionSearch"
import LazyLoad from 'react-lazy-load'
import { checkURLType } from '~/common/utils/common.utils'

const { EVM_CHAINS, applyChainIds } = configEnv();


const ButtonProfilePopover = () => {
  const { account, logout } = useConnectWallet()
  const { width } = useWindowSize()
  const { balanceBnb, balanceBusd } = useBlockChain();


  return (
    <Popover>
      <PopoverTrigger>
        <Button
          bg="yellow.primary !important"
          h="auto"
          py="8px"
          borderRadius="12px"
          leftIcon={
            <Box
              w="36px"
              h="36px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius="6px"
            >
              <Icon as={WalletIcon} w="24px" h="24px" color="#fff" />
            </Box>
          }
          color={"#fff"}
        >
          {width < 1025 ? (
            <></>
          ) : (
            <>
              {account?.substring(0, 4) ?? ''}...
              {account?.substring(account.length - 5) ?? ''}
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent w="250px">
        <PopoverArrow />
        <PopoverHeader borderBottomColor="transparent">
          <HStack>
            <VStack w="100%" alignItems="flex-start" spacing={2}>

              {/* <HStack
                mt="15px !important"
                w="100%"
                bg="blue.lighter"
                px="10px"
                borderRadius="30px"
                justifyContent={"space-between"}
                py="5px"
              >
                <Box w="full">
                  <Link to={`${MANAGER_ROUTERS.SOCIAL_ACCOUNT}`}>
                    <Text
                      color="blue.neutral"
                      fontSize="16px"
                      lineHeight="19px"
                      letterSpacing="-0.5px"
                    >
                      Social Accounts
                    </Text>
                  </Link>
                </Box>
                <Box>
                  <Text
                    color="blue.neutral"
                    fontSize="16px"
                    lineHeight="19px"
                  >
                    ➤
                  </Text>
                </Box>
              </HStack> */}

              <HStack
                mt="10px !important"
                w="100%"
                bg="blue.lighter"
                px="10px"
                borderRadius="30px"
                justifyContent={"space-between"}
                py="5px"
              >
                <Box w="full">
                  <Link to="/manager">
                    <Text
                      color="blue.neutral"
                      fontSize="16px"
                      lineHeight="19px"
                      letterSpacing="-0.5px"
                    >
                      Collection Setting
                    </Text>
                  </Link>
                </Box>
                <Box>
                  <Text
                    color="blue.neutral"
                    fontSize="16px"
                    lineHeight="19px"
                  >
                    ➤
                  </Text>
                </Box>
              </HStack>

              <HStack
                w="100%"
                bg="blue.lighter"
                px="10px"
                borderRadius="30px"
                justifyContent={"space-between"}
                py="5px"
              >
                <Box w="full">
                  <Link to="/presale-manager">
                    <Text
                      color="blue.neutral"
                      fontSize="16px"
                      lineHeight="19px"
                      letterSpacing="-0.5px"
                    >
                      Presale Setting
                    </Text>
                  </Link>
                </Box>
                <Box>
                  <Text
                    color="blue.neutral"
                    fontSize="16px"
                    lineHeight="19px"
                  >
                    ➤
                  </Text>
                </Box>
              </HStack>

              <HStack
                w="100%"
                bg="blue.lighter"
                px="10px"
                borderRadius="30px"
                justifyContent={"space-between"}
                py="5px"
              >
                <Box w="full">
                  <Link to="/socials-account">
                    <Text
                      color="blue.neutral"
                      fontSize="16px"
                      lineHeight="19px"
                      letterSpacing="-0.5px"
                    >
                      Socials Account
                    </Text>
                  </Link>
                </Box>
                <Box>
                  <Text
                    color="blue.neutral"
                    fontSize="16px"
                    lineHeight="19px"
                  >
                    ➤
                  </Text>
                </Box>
              </HStack>

              <HStack
                w="full"
                bg="blue.lighter"
                px="10px"
                borderRadius="30px"
                justifyContent="center"
                py="5px"
              >
                <Text
                  color="blue.neutral"
                  fontSize="16px"
                  lineHeight="19px"
                  letterSpacing="-0.5px"
                >
                  {formatAddress(account)}
                </Text>
                <Spacer />

                <WrapperCopy copyText={account}>
                  <Box
                    bg="blue.neutral"
                    w="24px"
                    h="24px"
                    borderRadius="18px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Icon w="14px" h="14px" as={CopyFilledIcon} />
                  </Box>
                </WrapperCopy>

              </HStack>

            </VStack>
          </HStack>
        </PopoverHeader>
        <PopoverBody>
          <Divider />
          <HStack w="100%" mb="20px" cursor="pointer">
            {/* <HStack>
              <Icon as={BNBIcon} />
              <Text
                fontSize="14px"
                lineHeight="16px"
                fontWeight="400"
                color="black.1d"
              >
                {pipeAmount(balanceBnb)}
              </Text>
            </HStack>

            <HStack cursor="pointer">
              <Icon as={BUSDIcon} />
              <Text
                fontSize="14px"
                lineHeight="16px"
                fontWeight="400"
                color="black.1d"
              >
                {pipeAmount(balanceBusd)}
              </Text>
            </HStack> */}
          </HStack>
          <Divider />
          {/* <Flex>
            <Link to="/profile">
              <Text
                fontSize="15px"
                lineHeight="18px"
                fontWeight="400"
                color="black.1d"
                mt="20px"
              >
                My Items
              </Text>
            </Link>
          </Flex> */}
          {/* <Flex>
            <Link to="/profile?tabIndex=1">
              <Text
                fontSize="15px"
                lineHeight="18px"
                fontWeight="400"
                color="black.1d"
                mt="20px"
              >
                On Sales
              </Text>
            </Link>
          </Flex> */}
          {/* <Flex>
            <Link to="/profile?tabIndex=2">
              <Text
                fontSize="15px"
                lineHeight="18px"
                fontWeight="400"
                color="black.1d"
                mt="20px"
              >
                Activities History
              </Text>
            </Link>
          </Flex>
          <Flex>
            <Link to="/profile?tabIndex=3">
              <Text
                fontSize="15px"
                lineHeight="18px"
                fontWeight="400"
                color="black.1d"
                my="20px"
              >
                Favorite
              </Text>
            </Link>
          </Flex> */}
          <PrimaryButton onClick={logout}>
            Sign out
          </PrimaryButton>

        </PopoverBody>
      </PopoverContent>
    </Popover >
  )
}

const InputAutoFill = () => {
  const [isOpenSearch, setIsOpenSearch] = useState(false)
  const [valueSearch, setValueSearch] = useState('')
  const navigate = useNavigate()
  const { pathname } = useLocation()
  // const { data } = useListSearch()
  const videoRef = useRef(null);
  const splitPageName = pathname.split('/')

  const isCollection = pathname.includes(MAIN_ROUTERS.MARKET_PLACE_ROUTER)

  const isShow = pathname.includes(MAIN_ROUTERS.NEWS);

  const { data } = useCollectionSearch();

  if (isShow) {
    return null;
  }



  return (
    <Box position={'relative'}>
      <InputGroup
        maxW={{
          lg: '300px',
          '2lg': '355px',
          xl: '475px',
        }}
        w={{
          lg: '300px',
          '2lg': '355px',
          xl: '475px',
        }}
        _focus={{ boxShadow: 'none' }}
      >
        <Input
          _focus={{ boxShadow: 'none' }}
          pr="4.5rem"
          type="text"
          bg="#EFF3F9 !important"
          placeholder={'Search collections'}
          onClick={() => {
            setIsOpenSearch(!isOpenSearch)
          }}
          value={valueSearch}
          onChange={(e) => setValueSearch(e.target.value.toLowerCase() || '')}
        />
        <InputRightElement width="4.5rem">
          <Icon as={SearchIcon} />
        </InputRightElement>
      </InputGroup>

      {isOpenSearch && (
        <Box
          position={'absolute'}
          bg="white"
          boxShadow="0px 0px 50px rgba(82, 63, 105, 0.15)"
          py="15px"
          w="100%"
          borderRadius="6px"
          maxH="304px"
          overflowY="auto"
          zIndex={30}
          onMouseLeave={() => {
            setIsOpenSearch(false)
          }}
        >
          <Text
            fontSize="15px"
            lineHeight="18px"
            color="black"
            fontWeight="500"
            px="20px"
          >
            Collections
          </Text>
          <VStack alignItems="flex-start" spacing="10px" mt="15px">
            {data
              .filter(
                (v) =>
                  v.name.toLowerCase().includes(valueSearch.toLowerCase()) ||
                  v.address.toLowerCase().includes(valueSearch.toLowerCase()),
              )
              .map((item, index) => {
                return (
                  <HStack
                    key={index}
                    cursor="pointer"
                    onClick={(e) => {
                      navigate(`${MAIN_ROUTERS.NFT_COLLECTION}/${item.chainId}/${item.address}`)
                    }}
                    px="20px"
                    py="10px"
                    w="100%"
                    _hover={{
                      bg: 'rgba(199, 225, 255, 0.5)',
                    }}
                  >
                    {checkURLType(item.image || "") === "Video" ?
                      <LazyLoad>
                        <Box
                          h={{
                            base: '40px',
                          }}
                          maxH={{
                            base: '40px',
                          }}
                          w="100%"
                        >
                          <video
                            loop
                            ref={videoRef}
                            style={{
                              borderRadius: "8px",
                              width: "100%",
                              height: "inherit",
                              objectFit: "cover"
                            }}
                            //@ts-ignore
                            autoPlay={true}
                            //@ts-ignore
                            playsInline="playsInline"
                            //@ts-ignore
                            muted="muted"
                            src={item.image}
                          >
                          </video>
                        </Box>
                      </LazyLoad>
                      :
                      <Image
                        w={'40px'}
                        h={{
                          base: '40px',
                        }}
                        borderRadius="8px"
                        src={item.image}
                        objectFit={{ base: "contain", md: 'contain' }}
                        fallbackSrc="/assets/images/empty-item.png"
                      />
                    }
                    <Text>
                      {item.name}
                    </Text>
                  </HStack>
                )
              })}
          </VStack>
        </Box>
      )}
    </Box>
  )
}

const Header = () => {
  const { t } = useTranslation('src/views/Home/components/Header.lang.json')

  const { pathname } = useLocation()
  const { width } = useWindowSize()
  const navigation = useNavigate();

  const { chainId, account } = useConnectWallet();
  const switchChain = useSwitchChain();


  const splitPageName = pathname.split('/')

  const nameHeader = useMemo(() => {
    // if (splitPageName.length === 2) {
    //   if (splitPageName[1]) {
    //     const newName = splitPageName[1].replace("-", " ");
    //     return newName;
    //   } else {
    //     return "Home";
    //   }
    // }
    // if (splitPageName.length > 2) {
    //   if (splitPageName[1] === "news") {
    //     return splitPageName[1];
    //   } else {
    //     return splitPageName[2].replaceAll("-", " ");
    //   }
    // }
    return "Home";
  }, [])

  const renderChain = useCallback(() => {
    const chainActive = EVM_CHAINS.find(v => v.chainId === chainId);
    return (
      <MenuCharkra>
        {({ isOpen }) => (
          <>
            <MenuButton
              w="auto"
              px="0"
              isActive={isOpen}
              as={Button}
              rightIcon={<ChevronDownIcon />}
              bg="white !important"
            >
              <HStack>
                {chainActive?.logo && <Image
                  src={chainActive?.logo || ImgLogo}
                  w="22px"
                  h="22px"
                  borderRadius={"12px"}
                />}
                <Text
                  color="secondary"
                  fontWeight="600"
                  fontSize="16px"
                  lineHeight="22px"
                >
                  {!chainActive ? "Select Chain" : chainActive?.dislayName || chainActive?.chainName || ""}
                </Text>
              </HStack>
            </MenuButton>
            <MenuList>

              <SimpleGrid
                w="full"
                columns={2}
                spacing={2}
                pr="15px"
              >
                {EVM_CHAINS.map(({ dislayName, chainId, chainName, logo, }) => {
                  return (
                    <MenuItemCharkra
                      key={chainId}
                      cursor="pointer"
                      onClick={() => switchChain(chainId)}
                      borderRadius={"8px"}
                      mx="8px"
                    >
                      <HStack>
                        <Image
                          src={logo || ""}
                          w="22px"
                          h="22px"
                          borderRadius={"12px"}
                        />
                        <Text>{dislayName || chainName || ""}</Text>
                      </HStack>
                    </MenuItemCharkra>
                  )
                })}
              </SimpleGrid>

            </MenuList>
          </>
        )}
      </MenuCharkra>
    )
  }, [chainId, switchChain])

  return (
    <Box w="100%" h="85px" bg="white" py="17px" px="50px">
      <HStack justifyContent="space-between" alignItems="center" w="100%">
        <VStack
          h="100%"
          justifyContent="center"
          spacing={0}
          alignItems="flex-start"
          cursor={"pointer"}
          onClick={() => {
            navigation("/")
          }}
        >
          <Text
            color="black.1d"
            lineHeight="31px"
            fontSize="22px"
            fontWeight="600"
            textTransform="capitalize"
          >
            {/* {nameHeader} */}
          </Text>
        </VStack>

        <InputAutoFill />

        <HStack spacing="20px" alignItems="center">
          <MenuCharkra>
            {({ isOpen }) => (
              <>
                <MenuButton
                  w="auto"
                  px="0"
                  isActive={isOpen}
                  as={Button}
                  rightIcon={<ChevronDownIcon />}
                  bg="white !important"
                >
                  <Icon as={EnglishIcon} w="28px" h="19px" />
                </MenuButton>
                <MenuList>
                  <MenuItemCharkra>
                    <HStack>
                      <Icon as={EnglishIcon} w="28px" h="19px" />
                      <Text>English</Text>
                    </HStack>
                  </MenuItemCharkra>
                </MenuList>
              </>
            )}
          </MenuCharkra>

          {renderChain()}

          {account ? (
            <ButtonProfilePopover />
          ) : (
            <Box>
              <ConnectWalletButton
                h="auto"
                py="5px"
                leftIcon={
                  <Box
                    w="36px"
                    h="36px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderRadius="6px"
                  >
                    <Icon as={WalletIcon} w="24px" h="24px" />
                  </Box>
                }
                hiddenText={width < 1280}
                w="auto"
                minW="auto"
                px={{
                  '2lg': 0,
                  '3lg': '9px',
                }}
                pl={{
                  '2lg': '8px',
                  '3lg': '9px',
                }}
              />
            </Box>
          )}
        </HStack>
      </HStack>
    </Box>
  )
}

export default Header
