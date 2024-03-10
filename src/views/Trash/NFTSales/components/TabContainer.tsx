import { Tabs, TabList, Tab } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { NumberParam, useQueryParams, withDefault } from 'use-query-params'
import { MAIN_ROUTERS } from "~/routes/routes"


const TabCustom = ({ children, ...rest }) => {
  return (
    <Tab
      fontSize="18px"
      lineHeight="21px"
      fontWeight="500"
      color="black.light"
      borderRadius="0px"
      bg="transparent"
      pl={0}
      pr={0}
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

const TabContainer = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [{ tabIndex }, setQuery] = useQueryParams({
    tabIndex: withDefault(NumberParam, 0),
  })

  const handleTabsChange = useCallback(
    (tabIndex) => {
      switch (tabIndex) {
        case 0:
          navigate(`${MAIN_ROUTERS.NFT_SALE_ROUTER}/all-projects`)
          break
        case 1:
          navigate(`${MAIN_ROUTERS.NFT_SALE_ROUTER}/claim`)
          break
        case 2:
          navigate(`${MAIN_ROUTERS.NFT_SALE_ROUTER}/refund`)
          break

        default:
          break
      }
    },
    [setQuery],
  )
  return (
    <Tabs index={tabIndex} onChange={handleTabsChange}>
      <TabList borderBottomColor="#F7F9FA">
        <TabCustom>{t('All Projects')}</TabCustom>
        <TabCustom ml="30px">{t('Claim')}</TabCustom>
        <TabCustom ml="30px">{t('Refund')}</TabCustom>
      </TabList>
    </Tabs>
  )
}

export default TabContainer
