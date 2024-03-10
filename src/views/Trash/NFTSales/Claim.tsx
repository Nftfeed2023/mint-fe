import { Box, Text, SimpleGrid } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import MainLayout from '~/layouts/MainLayout'

import RefundCard from './components/RefundCard'
import WrapperHeaderMobile from '../../../layouts/MasterLayout/WrapperHeaderMobile'
import TabContainer from './components/TabContainer'

const ClaimView = () => {
  const { t } = useTranslation('')
  return (
    <MainLayout>
      <WrapperHeaderMobile />
      <Box
        mt="110px"
        ml="20px"
        mr="20px"
        display={{
          base: 'block',
          lg: 'none',
        }}
      >
        <TabContainer />
      </Box>
      <Box
        mr={{
          base: '10px',
          xl: '41px',
        }}
        ml={{
          base: '10px',
          xl: '47px',
        }}
        mt={{
          base: '14px',
          lg: '40px',
        }}
        mb={{
          base: '120px',
          lg: '40px',
        }}
      >
        <Text
          fontSize="28px"
          lineHeight="33px"
          color="black.light"
          fontWeight="600"
        >
          Claim
        </Text>
        <SimpleGrid
          mt="24px"
          columns={{
            base: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 4,
          }}
          spacingX={{
            base: 0,
            lg: '12px',
          }}
          spacingY="20px"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => {
            return <RefundCard key={item} />
          })}
        </SimpleGrid>
      </Box>
    </MainLayout>
  )
}

export default ClaimView
