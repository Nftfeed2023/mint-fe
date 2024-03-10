import {
  Box,
  Button,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Divider,
  VStack,
  Image,
  useOutsideClick,
  MenuButton,
  MenuList,
  Menu as MenuCharkra,
  MenuItem as MenuItemCharkra,
  SimpleGrid,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import LogoIcon from '~/assets/logo192.png'
import { ReactComponent as SearchIcon } from '~/assets/svgs/search.svg'
import { ReactComponent as WalletIcon } from '~/assets/svgs/wallet.svg'
import { ReactComponent as CopyFilledIcon } from '~/assets/svgs/copy-filled.svg'
import { ReactComponent as CancelIcon } from '~/assets/svgs/cancel.svg'

import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBlockChain } from '~/hooks/useBlockChain'
import { formatAddress } from '~/utils'

import { ChevronDownIcon } from '@chakra-ui/icons'
import { useConnectWallet } from '~/hooks/@global/useConnectWallet'
import { configEnv } from '~/@config'
import { useSwitchChain } from '~/hooks/@global/useSwitchChain'
import { MAIN_ROUTERS, MANAGER_ROUTERS } from "~/routes/routes"
import PrimaryButton from './PrimaryButton'
import WrapperCopy from './WrapperCopy'
import ImgLogo from "~/assets/images/logo.png"
import { useCollectionSearch } from "~/views/FreeMintView/hooks/useCollectionSearch"
import LazyLoad from 'react-lazy-load'
import { checkURLType } from '~/common/utils/common.utils'
const { EVM_CHAINS } = configEnv();

const countries = [
  { value: 'ghana', label: 'Ghana' },
  { value: 'nigeria', label: 'Nigeria' },
  { value: 'kenya', label: 'Kenya' },
  { value: 'southAfrica', label: 'South Africa' },
  { value: 'unitedStates', label: 'United States' },
  { value: 'canada', label: 'Canada' },
  { value: 'germany', label: 'Germany' },
]

const HeaderMobile = ({ isHideSearch = false }) => {
  const navigate = useNavigate()
  const { t } = useTranslation('src/components/Header.mobile.lang.json')

  const [isOpenSearch, setIsOpenSearch] = useState(false)
  const [valueSearch, setValueSearch] = useState('')
  // const { data } = useListSearch()
  const ref = useRef();
  const { chainId, account, logout } = useConnectWallet();
  const switchChain = useSwitchChain();



  useOutsideClick({
    ref: ref,
    handler: () => setIsOpenSearch(false),
  })

  const videoRef = useRef(null);
  const { balanceBnb, balanceBusd } = useBlockChain()

  const [pickerItems, setPickerItems] = useState(countries)
  const [selectedItems, setSelectedItems] = useState([])

  const { data } = useCollectionSearch();

  const handleCreateItem = (item) => {
    setPickerItems((curr) => [...curr, item])
    setSelectedItems((curr) => [...curr, item])
  }

  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedItems(selectedItems)
    }
  }

  const renderChain = useCallback(() => {
    const chainActive = EVM_CHAINS.find(v => v.chainId === chainId);


    return (
      <MenuCharkra>
        {({ isOpen }) => (
          <>
            <MenuButton
              w="full"
              px="0"
              isActive={isOpen}
              as={Button}
              rightIcon={<ChevronDownIcon />}
              bg="white !important"
            >
              <HStack pr="10px" spacing={"5px"}>
                <Image
                  src={chainActive?.logo || ImgLogo}
                  w="18px"
                  h="18px"
                  objectFit={"cover"}
                  borderRadius={"12px"}
                />
                <Text
                  color="secondary"
                  fontWeight="600"
                  fontSize="10px"
                >
                  {!chainActive ? "Select Chain"
                    :
                    chainActive?.dislayName || chainActive?.chainName || ""
                  }
                </Text>
              </HStack>
            </MenuButton>
            <MenuList w="fit-content" style={{ minWidth: 'fit-content' }}>

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
                          w="14px"
                          h="14px"
                          borderRadius={"12px"}
                        />
                        <Text fontSize={"14px"}>{dislayName || chainName || ""}</Text>
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
    <Box ref={ref}>
      <HStack w="100%" px="5px">
        <HStack w="100%">
          <Image
            src={LogoIcon}
            w="30px"
            h="30px"
            onClick={() => navigate('/')}
          />
          {!isHideSearch && (
            <Box position={'relative'} w={isOpenSearch ? '100%' : 'auto'}>
              <InputGroup
                maxW={{
                  '320': isOpenSearch ? '100%' : '110px',
                  '375': isOpenSearch ? '100%' : '165px',
                  md: '300px',
                }}
                w={{
                  base: isOpenSearch ? '100%' : '171px',
                  md: '300px',
                }}
              >
                <Input
                  type="text"
                  bg="#EFF3F9 !important"
                  placeholder="Search collections"
                  fontSize="10px"
                  lineHeight="14px"
                  onFocus={() => {
                    setIsOpenSearch(true)
                  }}
                  value={valueSearch}
                  onChange={(e) =>
                    setValueSearch(e.target.value.toLowerCase() || '')
                  }
                />
                <InputRightElement>
                  <Icon as={SearchIcon} w="24px" />
                </InputRightElement>
              </InputGroup>

              {isOpenSearch && (
                <Box
                  position={'absolute'}
                  bg="white"
                  boxShadow="0px 0px 50px rgba(82, 63, 105, 0.15)"
                  px="20px"
                  py="15px"
                  w="100%"
                  borderRadius="6px"
                  maxH="304px"
                  overflowY="auto"
                >

                  <HStack
                    w="full"
                    justifyContent={"space-between"}
                  >

                    <Text
                      fontSize="15px"
                      lineHeight="18px"
                      color="black"
                      fontWeight="500"
                    >
                      {t('collections')}
                    </Text>

                    <Icon
                      as={CancelIcon}
                      color="#f15b5b"
                      onClick={() => {
                        setIsOpenSearch(false)
                      }}
                    >
                      {t('X')}
                    </Icon>

                  </HStack>


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
                            w="100%"
                            cursor="pointer"
                            onClick={(e) => {
                              navigate(`${MAIN_ROUTERS.NFT_COLLECTION}/${item.chainId}/${item.address}`)
                            }}
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
                                  w={'40px'}
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
          )}
        </HStack>

        {!isOpenSearch && <Spacer />}
        {!isOpenSearch && (
          <HStack>

            {renderChain()}

            <Box>
              {account ? (
                <Popover>
                  <PopoverTrigger>
                    <Button
                      bg="yellow.primary !important"
                      w="24px"
                      h="24px"
                      borderRadius="6px"
                    >
                      <Icon as={WalletIcon} w="18px" h="18px" color="#fff" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent w="200px">
                    <PopoverArrow />
                    <PopoverHeader borderBottomColor="transparent">

                      <VStack w="full" spacing={2}>

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
                                fontSize="13px"
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
                                fontSize="13px"
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
                                fontSize="13px"
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
                            fontSize="13px"
                            lineHeight="19px"
                            letterSpacing="-0.5px"
                          >
                            {formatAddress(account)}
                          </Text>
                          <Spacer />
                          <WrapperCopy copyText={account}>
                            <Box
                              bg="blue.neutral"
                              w="18px"
                              h="18px"
                              borderRadius="18px"
                              display="flex"
                              justifyContent="center"
                              alignItems="center"
                            >
                              <Icon w="13px" h="13px" as={CopyFilledIcon} />
                            </Box>
                          </WrapperCopy>
                        </HStack>
                      </VStack>

                    </PopoverHeader>
                    <PopoverBody>
                      <Divider />
                      <PrimaryButton onClick={logout}>
                        Sign out
                      </PrimaryButton>
                      {/* <HStack w="100%" mb="20px" mt="20px">
                        <HStack>
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

                        <HStack>
                          <Icon as={BNBIcon} />
                          <Text
                            fontSize="14px"
                            lineHeight="16px"
                            fontWeight="400"
                            color="black.1d"
                          >
                            {pipeAmount(balanceBusd)}
                          </Text>
                        </HStack>
                      </HStack> */}
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
                      </Flex> */}
                      {/* <Flex>
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
                      {/*
                      <Divider mt="20px" />
                      <Text
                        mt="20px"
                        mb="20px"
                        fontSize="15px"
                        lineHeight="18px"
                        fontWeight="400"
                        color="grey.66"
                        textAlign="center"
                      >
                        Sign out
                      </Text> */}
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              ) : (
                <Button
                  bg="yellow.primary !important"
                  w="32px"
                  h="32px"
                  minWidth="auto"
                  borderRadius="6px"
                  mx="auto"
                >
                  <Icon as={WalletIcon} w="20px" h="20px" color={"#fff"} />
                </Button>
              )}
            </Box>
          </HStack>
        )}
      </HStack>
    </Box>
  )
}

export const FixedMobileHeader = () => {
  return (
    <Box
      position="fixed"
      bg="white"
      top={0}
      left={0}
      right={0}
      pt="10px"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.05)"
      zIndex={20}
      pb="10px"
      display={{
        base: 'block',
        lg: 'none',
      }}
    >
      <HeaderMobile />
    </Box>
  )
}

export default HeaderMobile
