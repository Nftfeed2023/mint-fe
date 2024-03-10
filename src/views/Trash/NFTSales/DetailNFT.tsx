import { Box, Divider } from '@chakra-ui/react'
import BackButtonMobile from '~/components/BackButtonMobile'

import MainLayout from '~/layouts/MainLayout'

import InfoSection from './components/DetailNFT/InfoSection'
import NFTCardMulti from './components/DetailNFT/NFTCardMulti'
import PhaseSection from './components/DetailNFT/PhaseSection'
import WrapperHeaderMobile from '../../../layouts/MasterLayout/WrapperHeaderMobile'

const DetailNFT = () => {
  return (
    <MainLayout>
      <WrapperHeaderMobile />
      <Box
        mt={{
          base: '110px',
          lg: '25px',
          xl: '50px',
        }}
        ml={{
          base: '20px',
          lg: '25px',
          xl: '47px',
        }}
      >
        <BackButtonMobile />
      </Box>
      <Box
        mr={{
          base: '0',
          lg: '25px',
          xl: '41px',
        }}
        ml={{
          base: '0',
          lg: '25px',
          xl: '47px',
        }}
        mt={{
          base: '10px',
          lg: '20px',
          xl: '40px',
        }}
        mb={{
          base: '120px',
          lg: '40px',
        }}
      >
        <Box bg="white" borderRadius="12px" p="12px">
          <InfoSection />
          <Divider bg="red" mt="24px" mb="30px" />
          <NFTCardMulti />
        </Box>

        <PhaseSection />
      </Box>
    </MainLayout>
  )
}

export default DetailNFT
