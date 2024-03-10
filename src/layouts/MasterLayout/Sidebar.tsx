import { Icon, VStack, Box, Image } from '@chakra-ui/react'
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
} from 'react-pro-sidebar'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { IMenuLayout } from '~/routes/routes'
import { useTranslation } from 'react-i18next'

import { useSidebar } from '~/contexts/SideBarContext'
import LogoIcon from '~/assets/logo192.png'
import { ReactComponent as OpenMenuIcon } from '~/assets/svgs/open-menu.svg'
import { useState } from 'react'

const CustomChilItem = ({ routerChild, route }) => {
  const { pathname } = useLocation()
  const { t } = useTranslation('src/components/MainLayout/Sidebar.lang.json')
  const isActiveChil =
    (pathname !== '/' &&
      routerChild.href !== '/' &&
      pathname.includes(routerChild.href)) ||
    (pathname === '/' && routerChild.href === '/')
  return (
    <MenuItem active={isActiveChil} key={routerChild.key} style={{ textTransform: "capitalize" }}>
      {t(routerChild.title)}
      {route.isDisabled ? '' : <Link to={routerChild.href} />}
    </MenuItem >
  )
}

const CustomRenderChild = ({ route, isOpen }) => {
  const { pathname } = useLocation()
  const { t } = useTranslation('src/components/MainLayout/Sidebar.lang.json')
  const [isHover, setIsHover] = useState(false)
  const isActive =
    (pathname !== '/' && route.href !== '/' && pathname.includes(route.href)) ||
    (pathname === '/' && route.href === '/')
  return (
    <SubMenu
      style={{ textTransform: "capitalize" }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      title={isOpen ? '' : t(route.title)}
      key={route.key}
      defaultOpen={isActive}
      icon={<Icon
        as={isHover || isActive ? route.iconActive : route.iconDeActive}
        w="24px"
        h="24px" />}
      placeholder={""}
    >
      {route.children.map((routerChild) => {
        return <CustomChilItem route={route} routerChild={routerChild} />
      })}
    </SubMenu>
  )
}

const CustomItem = ({ route, isOpen }) => {
  const { pathname } = useLocation()
  const { t } = useTranslation('src/components/MainLayout/Sidebar.lang.json')
  const [isHover, setIsHover] = useState(false)
  const isActive =
    (pathname !== '/' && route.href !== '/' && pathname.includes(route.href)) ||
    (pathname === '/' && route.href === '/')

  return (
    <MenuItem
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        transition: 'all 250ms eas-in',
        textTransform: "capitalize"
      }}
      icon={
        <Icon
          as={isHover || isActive ? route.iconActive : route.iconDeActive}
          w="24px"
          h="24px"
        />
      }
      active={!route.isDisabled && isActive}
      key={route.key}
    >
      {isOpen ? '' : t(route.title)}
      {route.isDisabled ? '' : <Link to={route.href} />}
    </MenuItem>
  )
}


export interface ISideBarProps {
  menus: IMenuLayout[];
}

const SideBar = ({ menus }: ISideBarProps) => {
  const { isOpen, onOpen, onClose } = useSidebar()

  const navigate = useNavigate()

  return (
    <Box position={'relative'} width="70px">
      <Box position="absolute" h="100vh">
        <ProSidebar
          width="250px"
          collapsedWidth="70px"
          collapsed={isOpen}
          onMouseEnter={onClose}
          onMouseLeave={onOpen}
        >
          <SidebarHeader>
            <VStack mt="20px">
              <Image
                src={LogoIcon}
                w={!isOpen ? '80px' : '50px'}
                h={!isOpen ? '80px' : '50px'}
                onClick={() => {
                  navigate('/')
                }}
                cursor="pointer"
              />
              <Box position="absolute" right="20px">
                <Icon
                  display={isOpen ? 'none' : 'block'}
                  as={OpenMenuIcon}
                  onClick={onOpen}
                  cursor="pointer"
                />
              </Box>
              <Icon
                opacity={!isOpen ? 0 : 1}
                as={OpenMenuIcon}
                onClick={onClose}
              />
            </VStack>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="circle" innerSubMenuArrows subMenuBullets>
              {menus.map((route) => {
                if (route.children) {
                  return <CustomRenderChild route={route} isOpen={isOpen} key={route.key} />
                }
                return <CustomItem route={route} isOpen={isOpen} key={route.key} />
              })}
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </Box>
    </Box>
  )
}

export default SideBar
