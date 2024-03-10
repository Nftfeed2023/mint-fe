import { ReactNode } from 'react'
import { Box, Flex } from '@chakra-ui/react'

import Sidebar from './Sidebar'
import Header from './Header'
import BottomBarMobile from '../../components/BottomBar.mobile'
import { IMenuLayout } from '~/routes/routes'
import Footer from '~/components/Footer'


export interface IMasterLayoutProps {
  children?: ReactNode;
  menus: IMenuLayout[]
}

const MasterLayout = ({ children, menus = [] }: IMasterLayoutProps) => {

  return (
    <Flex
      overflow="hidden"
      // maxW="100vw"
      h={{ base: "auto", lg: "100vh" }}
    // w="100%"
    >

      <Box
        h="100vh"
        display={{
          base: 'none',
          lg: 'block',
        }}
      >
        <Sidebar menus={menus} />
      </Box>

      <Box
        bg={{
          base: 'antiFlashWhite',
          lg: 'antiFlashWhite',
        }}
        // overflow="hidden"
        w="100%"
        overflowY="auto"
        position="relative"
      // flex={1}
      >

        <Box
          display={{
            base: 'none',
            lg: 'block',
          }}
        >
          <Header />
        </Box>

        <Box
        // w="100%"
        // h={{
        //   base: '100%',
        //   md: 'calc(100% - 85px)',
        // }}
        // overflowY="auto"
        // overflowX="hidden"
        >
          {children}
        </Box>

        <Footer />

        <Box h="10vh" />

        <Box
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          zIndex={20}
          display={{
            base: 'block',
            lg: 'none',
          }}
        >
          <BottomBarMobile menus={menus} />
        </Box>

      </Box>
    </Flex>
  )
}

export default MasterLayout
