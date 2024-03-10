import { Box, HStack, Icon, Text, VStack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { IMenuLayout } from "~/routes/routes"

export interface IBottomBarMobileProps {
  menus: IMenuLayout[]
}

const BottomBarMobile = ({ menus }: IBottomBarMobileProps) => {
  const { t } = useTranslation('src/components/BottomBar.mobile.lang.json')
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <Box>
      <HStack
        bg="white"
        justifyContent="space-around"
        boxShadow="0px 0px 12px rgba(0, 0, 0, 0.1)"
        borderRadius="14px 14px 0px 0px"
      >
        {menus.map((route) => {
          const isActive =
            (pathname !== '/' &&
              route.href !== '/' &&
              pathname.includes(route.href)) ||
            (pathname === '/' && route.href === '/')

          return (
            <Box key={route.key}>
              <VStack
                pt="16px"
                onClick={() => {
                  if (!route.isDisabled) {
                    navigate(route.href)
                  }
                }}
              >
                <Icon
                  as={isActive ? route.iconActive : route.icon}
                  w="16px"
                  h="16px"
                  color={isActive ? '#130F26' : '#979797'}
                />
                <Text
                  fontSize="10px"
                  lineHeight="14px"
                  color="black.light"
                  textAlign={"center"}
                  fontWeight={isActive ? '600' : '400'}
                >
                  {t(route.title)}
                </Text>
              </VStack>
            </Box>
          )
        })}
      </HStack>
    </Box>
  )
}

export default BottomBarMobile
