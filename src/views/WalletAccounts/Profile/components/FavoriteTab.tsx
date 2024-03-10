import {
  Box,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import CollectionCard from '~/components/CollectionCard'
import useWindowSize from '~/hooks/useWindowSize'
import NFTItem from './NFTItem'
import NFTItemMobile from './NFTItem.mobile'

const TabCustom = ({ children }) => {
  return (
    <Tab
      fontSize="15px"
      lineHeight="18px"
      fontWeight="400"
      color="black.lighter"
      borderRadius="16px 16px 0px 0px"
      bg="grey.light_blue"
      borderBottomColor="transparent"
      _selected={{
        color: 'blue.darker',
        borderBottomColor: 'transparent',

        bg: 'white',
        fontWeight: '600',
      }}
      w={{
        base: '100px',
        lg: '200px',
      }}
      position="relative"
    >
      {children}
    </Tab>
  )
}

const FavoriteTab = () => {
  const { t } = useTranslation(
    'src/views/Profile/components/FavoriteTab.lang.json',
  )

  const { width } = useWindowSize()

  return (
    <Box>
      <Tabs>
        <TabList borderBottomWidth={0}>
          <TabCustom>{t('collection')}</TabCustom>
          <TabCustom>{t('items')}</TabCustom>
        </TabList>

        <TabPanels mt="30px" p={0} m={0}>
          <TabPanel px={0}>
            <SimpleGrid columns={{ base: 1, lg: 4 }} spacing="16px">
              {/* {[1, 2, 3, 4, 5].map((key) => {
                return <CollectionCard key={key} />
              })} */}
            </SimpleGrid>
          </TabPanel>
          <TabPanel px={0}>
            <SimpleGrid columns={{ base: 1, lg: 4 }} spacing="16px">
              {[1, 2, 3, 4, 5].map((key) => {
                if (width < 992) {
                  return <NFTItemMobile key={key} />
                }
                return <NFTItem key={key} />
              })}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default FavoriteTab
