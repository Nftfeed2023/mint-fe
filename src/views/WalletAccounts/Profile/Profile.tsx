import {
  Avatar,
  Box,
  Image,
  Tab,
  Text,
  Icon,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  HStack,
  Spacer,
  Divider,
  AvatarBadge,
  Button,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useCallback, useState, useEffect } from 'react'
import { NumberParam, useQueryParams, withDefault } from 'use-query-params'

import MainLayout from '~/layouts/MainLayout'

import { ReactComponent as CopyFilledIcon } from '~/assets/svgs/copy-filled.svg'
import { ReactComponent as BNBIcon } from '~/assets/svgs/bnb.svg'

import { ReactComponent as EditIcon } from '~/assets/svgs/edit.svg'
import { ReactComponent as CameraIcon } from '~/assets/svgs/camera.svg'
import { ReactComponent as ArrowRightIcon } from '~/assets/svgs/arrow-right.svg'

import FavoriteTab from './components/FavoriteTab'
import MyItems from './components/MyItems'
import OnSalesTab from './components/OnSales'
import ActivitiesTab from './components/Activities'
import useWindowSize from '~/hooks/useWindowSize'
import HeaderMobile from '~/components/Header.mobile'
import { useWeb3React } from '@web3-react/core'
import { formatAddress, pipeAmount } from '~/utils'
import { useBlockChain } from '~/hooks/useBlockChain'
import WrapperCopy from '~/components/WrapperCopy'
import { GoogleLogin, GoogleLogout, useGoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import { configEnv } from '~/@config'
import { ReactComponent as GoogleIcon } from '~/assets/svgs/google.svg'

import { IUserInformation } from '~/dto'
import userService from '~/services/user.service'
import { useConnectWallet } from '~/hooks/@global/useConnectWallet'

const { } = configEnv();

const TabCustom = ({ children, ...rest }) => {
  return (
    <Tab
      fontSize="18px"
      lineHeight="21px"
      fontWeight="500"
      color="black.light"
      borderRadius="0px"
      bg="transparent"
      borderBottomColor="transparent"
      _selected={{
        color: 'blue.neutral',
        borderBottomColor: 'blue.neutral',
      }}
      position="relative"
      {...rest}
    >
      {children}
    </Tab>
  )
}

const AddressButton = () => {
  const { account } = useConnectWallet();
  return (
    <Box
      w={{
        base: '150px',
        lg: '200px',
      }}
    >
      <HStack
        bg="#C7E1FF"
        py={{
          base: '4px',
          lg: '7px',
        }}
        px={{
          base: 0,
          lg: '9px',
        }}
        borderRadius="30px"
        justifyContent="center"
      >
        <Text
          color="blue.neutral"
          fontSize="16px"
          lineHeight="19px"
          letterSpacing="-0.5px"
        >
          {formatAddress(account)}
        </Text>
        <WrapperCopy copyText={account}>
          <Box
            bg="blue.neutral"
            w={{
              base: '24px',
              lg: '35px',
            }}
            h={{
              base: '24px',
              lg: '35px',
            }}
            borderRadius="18px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Icon
              w={{
                base: '16px',
                lg: '24px',
              }}
              h={{
                base: '16px',
                lg: '24px',
              }}
              as={CopyFilledIcon}
            />
          </Box>
        </WrapperCopy>
      </HStack>
    </Box>
  )
}

const ProfileDesktop = () => {
  const { t } = useTranslation('src/views/Profile/Profile.lang.json')
  const { account } = useConnectWallet();

  const { balanceBnb, balanceBusd } = useBlockChain();

  const [accessTokenGoogle, setAccessTokenGoogle] = useState(null);
  const [profileObj, setProfileObj] = useState(null);

  const [{ tabIndex }, setQuery] = useQueryParams({
    tabIndex: withDefault(NumberParam, 0),
  })



  const logoutGoogle = () => {

    setAccessTokenGoogle(null);
    setProfileObj(null);

  }

  const handleTabsChange = useCallback(
    (tabIndex) => {
      setQuery({ tabIndex })
    },
    [setQuery],
  )



  return (
    <HStack mx="53px" mt="11px" overflow="hidden" align="start">
      <Box
        w="238px"
        minW="238px"
        display={{
          base: 'none',
          xl: 'block',
        }}
      >
        <HStack justifyContent="center">
          <Text
            color="black.1d"
            letterSpacing="-0.5px"
            fontSize="24px"
            lineHeight="28px"
            fontWeight="600"
          >
            {profileObj && profileObj.email ? `${profileObj?.email?.substring(0, 13) ?? ''}...` : "Unname"}
          </Text>

          <Icon as={EditIcon} w="28px" h="28px" />
        </HStack>
        <HStack justifyContent="center">
          <Box w="200px" minW="200px" mt="15px">

            <HStack
              bg="#C7E1FF"
              py="10px"
              px="20px"
              borderRadius="30px"
              justifyContent="center"
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
                  w="35px"
                  h="35px"
                  borderRadius="18px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Icon w="24px" h="24px" as={CopyFilledIcon} />
                </Box>
              </WrapperCopy>
            </HStack>



          </Box>
        </HStack>
        <HStack
          justifyContent="center"
          w="100%"
          mt="18px"
          borderRadius="4px"
          bg="white"
        >
          <Box px="20px" bg="white" w="100%" borderRadius="4px">
            <HStack py="20px">
              <Image src="/assets/images/demo/BNB.png" w="24px" h="24px" />
              <Text>{pipeAmount(balanceBnb)}</Text>
            </HStack>
            <Divider />
            <HStack py="20px">
              <Image src="/assets/images/demo/busd.svg" w="24px" h="24px" />
              <Text>{pipeAmount(balanceBusd)}</Text>
            </HStack>
          </Box>
        </HStack>
      </Box>

      <Box flex={1} ml="26px" w="100%">
        <Tabs index={tabIndex} onChange={handleTabsChange}>
          <TabList borderBottomColor="white">
            <TabCustom>{t('my_items')}</TabCustom>
            <TabCustom ml="60px">{t('on_sales')}</TabCustom>
            <TabCustom ml="60px">{t('activities')}</TabCustom>
            {/* <TabCustom ml="60px">{t('favorite')}</TabCustom> */}
          </TabList>

          <TabPanels mt="30px">
            <TabPanel p={0}>
              <MyItems />
            </TabPanel>
            <TabPanel p={0}>
              <OnSalesTab />
            </TabPanel>
            <TabPanel p={0} overflow="hidden">
              <ActivitiesTab />
            </TabPanel>
            {/* <TabPanel p={0}>
              <FavoriteTab />
            </TabPanel> */}
          </TabPanels>
        </Tabs>
      </Box>
    </HStack>
  )
}

const ProfileMobile = () => {
  const { t } = useTranslation('src/views/Profile/Profile.lang.json')

  const [{ tabIndex }, setQuery] = useQueryParams({
    tabIndex: withDefault(NumberParam, -1),
  })

  const { balanceBnb, balanceBusd } = useBlockChain()

  const handleTabsChange = useCallback(
    (nextTabIndex) => {
      if (tabIndex === nextTabIndex) {
        setQuery({
          tabIndex: undefined,
        })
        return
      }

      setQuery({ tabIndex: nextTabIndex })
    },
    [setQuery, tabIndex],
  )

  return (
    <Box>
      <HStack justifyContent="center">
        <Text
          color="black.1d"
          letterSpacing="-0.5px"
          fontSize="24px"
          lineHeight="28px"
          fontWeight="600"
        >
          Unname
        </Text>
        <Icon as={EditIcon} w="28px" h="28px" />
      </HStack>
      <HStack justifyContent={'center'} alignItems="center" w="100%" mt="10px">
        <HStack
          py="8px"
          px="20px"
          bg="#EFF3F9"
          borderRadius="8px"
          border="1px solid #DFE6F1"
        >
          <Image src="/assets/images/demo/BNB.png" />
          <Text>{pipeAmount(balanceBnb)}</Text>
        </HStack>

        <HStack
          py="8px"
          px="20px"
          bg="#EFF3F9"
          borderRadius="8px"
          border="1px solid #DFE6F1"
        >
          <Image src="/assets/images/demo/busd.svg" w="24px" h="24px" />
          <Text>{pipeAmount(balanceBusd)}</Text>
        </HStack>
      </HStack>
      <HStack p="20px" bg="white" onClick={() => handleTabsChange(0)}>
        <Text
          fontWeight="700"
          color="secondary"
          fontSize="22px"
          lineHeight="26px"
        >
          My items
        </Text>
        <Spacer />
        <Icon as={ArrowRightIcon} w="24px" h="24px" />
      </HStack>
      {tabIndex === 0 && (
        <Box px="20px">
          <MyItems />
        </Box>
      )}
      <HStack
        p="20px"
        bg="white"
        onClick={() => {
          handleTabsChange(1)
        }}
      >
        <Text
          fontWeight="700"
          color="secondary"
          fontSize="22px"
          lineHeight="26px"
        >
          On sale
        </Text>
        <Spacer />
        <Icon as={ArrowRightIcon} w="24px" h="24px" />
      </HStack>
      {tabIndex === 1 && (
        <Box px="20px">
          <OnSalesTab />
        </Box>
      )}

      <HStack
        p="20px"
        bg="white"
        onClick={() => {
          handleTabsChange(2)
        }}
        pb={{
          base: tabIndex !== 2 ? '100px' : '0px',
          lg: 0,
        }}
      >
        <Text
          fontWeight="700"
          color="secondary"
          fontSize="22px"
          lineHeight="26px"
        >
          Activities
        </Text>
        <Spacer />
        <Icon as={ArrowRightIcon} w="24px" h="24px" />
      </HStack>
      {tabIndex === 2 && (
        <Box px="20px">
          <ActivitiesTab />
        </Box>
      )}

      {/* <HStack
        p="20px"
        bg="white"
        onClick={() => {
          handleTabsChange(3)
        }}
        pb={{
          base: tabIndex !== 3 ? '100px' : '0px',
          lg: 0,
        }}
      >
        <Text
          fontWeight="700"
          color="secondary"
          fontSize="22px"
          lineHeight="26px"
        >
          Favorite
        </Text>
        <Spacer />
        <Icon as={ArrowRightIcon} w="24px" h="24px" />
      </HStack> */}
      {/* {tabIndex === 3 && (
        <Box px="20px">
          <FavoriteTab />
        </Box>
      )} */}
    </Box>
  )
}

const Profile = () => {
  const { width } = useWindowSize()

  const { balanceBnb, balanceBusd } = useBlockChain()

  return (
    <MainLayout>
      <Box position="relative">
        <Box
          position="fixed"
          bg="white"
          top={0}
          left={0}
          right={0}
          pt="40px"
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.05)"
          zIndex="20"
          pb="20px"
          display={{
            base: 'block',
            lg: 'none',
          }}
        >
          <HeaderMobile />
        </Box>
        <Image
          mt={{
            base: '100px',
            lg: 0,
          }}
          h={{
            base: '145px',
            lg: '263px',
          }}
          w={'full'}
          src={'/assets/images/demo/banner-3.png'}
          objectFit={'cover'}
        />
        <Box
          position={'absolute'}
          top="10px"
          right="10px"
          display={{
            base: 'block',
            lg: 'none',
          }}
        >
          <HStack alignItems="center">
            <AddressButton />
          </HStack>
        </Box>
        {/* <Box
          position="absolute"
          right={{
            base: '20px',
            lg: '50px',
          }}
          bottom="20px"
        >
          <Box
            w={{
              base: '20px',
              lg: '30px',
            }}
            h={{
              base: '20px',
              lg: '30px',
            }}
            bg="white"
            display="flex"
            justifyContent="center"
            alignItems="center"
            borderRadius="50%"
          >
            <Icon as={CameraIcon} w="12px" h="12px" />
          </Box>
        </Box> */}
      </Box>

      <Box mt="-80px">
        <Box
          display="flex"
          justifyContent={{
            base: 'center',
            lg: 'flex-start',
            xl: 'flex-start',
          }}
          w="100%"
          pl={{
            lg: '20px',
            xl: '86px',
          }}
          alignItems={{
            base: 'flex-end',
          }}
        >
          <Avatar
            size={{
              base: '130px',
              lg: '160px',
            }}
            w={{
              base: '130px',
              lg: '160px',
            }}
            h={{
              base: '130px',
              lg: '160px',
            }}
            src="/assets/images/demo/avatar.png"
            borderWidth="6px"
            borderStyle="solid"
            borderColor="white"
          >
            {/* <AvatarBadge
              as={CameraIcon}
              w="24px"
              h="24px"
              right="15px"
              bottom="15px"
              cursor="pointer"
            /> */}
          </Avatar>
          <Box
            w="100%"
            px="30px"
            display={{
              base: 'none',
              lg: 'block',
              xl: 'none',
            }}
          >
            <HStack w="100%">
              <HStack justifyContent="center">
                <Text
                  color="black.1d"
                  letterSpacing="-0.5px"
                  fontSize="24px"
                  lineHeight="28px"
                  fontWeight="600"
                >
                  Unname
                </Text>
                <Icon as={EditIcon} w="28px" h="28px" />
              </HStack>
              <Spacer />
              <HStack>
                <HStack alignItems="center" w="100%">
                  <HStack py="8px" px="20px" bg="white" borderRadius="8px">
                    <Image src="/assets/images/demo/BNB.png" />
                    <Text>{pipeAmount(balanceBnb)}</Text>
                  </HStack>

                  <HStack py="8px" px="20px" bg="white" borderRadius="8px">
                    <Image src="/assets/images/demo/BNB.png" />
                    <Text> {pipeAmount(balanceBusd)}</Text>
                  </HStack>
                </HStack>

                <HStack alignItems="center">
                  <AddressButton />
                </HStack>
              </HStack>
            </HStack>
          </Box>
        </Box>
      </Box>

      {width > 992 ? <ProfileDesktop /> : <ProfileMobile />}
    </MainLayout>
  )
}

export default Profile
