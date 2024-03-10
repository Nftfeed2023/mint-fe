import { Box } from '@chakra-ui/react'

import MainLayout from '~/layouts/MainLayout'
import { FixedMobileHeader } from '~/components/Header.mobile'

import Trending from './components/Trending'
import NewestCollections from './components/NewestCollections'
import CioMembership from './components/CioMembership'
import NewestListed from "./components/NewestListed"

const WrapperContent = ({ children }) => {
  return (
    <Box
      mt={{
        base: '20px',
        lg: '77px',
      }}
    >
      {children}
    </Box>
  )
}

const Home = () => {
  return (
    <MainLayout>
      <FixedMobileHeader />
      <Box
        pt={{
          base: '120px',
          lg: '30px',
        }}
        px={{ base: '20px', lg: '30px', xl: '50px' }}
      >

        <CioMembership />

        <Trending />

        <WrapperContent>
          <NewestCollections />
        </WrapperContent>
        <Box h="30vh" />
        <WrapperContent>
          <NewestListed />
        </WrapperContent>
      </Box>
    </MainLayout>
  )
}

export default Home
