import { Box, SimpleGrid, } from '@chakra-ui/react';
import MainLayout from "~/layouts/MainLayout"
import WrapperHeaderMobile from "../../layouts/MasterLayout/WrapperHeaderMobile"
import { ItemStakeToken } from './ItemStakeToken';
import { Fragment } from 'react';

export const StakingTokenView = () => {

  return (
    <MainLayout>

      <WrapperHeaderMobile />

      <Box
        mr={{
          base: '5px',
          xl: '41px',
        }}
        ml={{
          base: '5px',
          xl: '47px',
        }}
        mt={{
          base: '90px',
          lg: '40px',
        }}
        mb={{
          base: '120px',
          lg: '40px',
        }}
      >

        <SimpleGrid
          w="full"
          spacing={4}
          columns={{ base: 1, md: 2, lg: 3, xl: 4, }}
        >

          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, idx) => {
            return (
              <Fragment key={idx}>
                <ItemStakeToken />
              </Fragment>
            )
          })
          }

        </SimpleGrid>


      </Box>


    </MainLayout>
  )
}
