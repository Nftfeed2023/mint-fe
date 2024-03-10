import { Box, Flex, Grid, GridItem, SimpleGrid, Spinner, VStack } from '@chakra-ui/react';
import MainLayout from "~/layouts/MainLayout"
import WrapperHeaderMobile from "../../layouts/MasterLayout/WrapperHeaderMobile"

import useWindowSize from '~/hooks/useWindowSize';
import { useConnectWallet } from '~/hooks/@global/useConnectWallet';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useNftCollectionDetail } from '../FreeMintView/hooks/useNftCollectionDetail';
import { NftList } from './NftList';
import { NftDetail } from './NftDetail';
import { useSpecialCollection } from '~/hooks/useSpecialCollection';
import { DetailModal } from './DetailModal';

export const SpecialNftView = () => {

  const { width } = useWindowSize();
  const { account } = useConnectWallet();
  const [selectCol, setSelectCol] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const { data: listSpecial, isLoading } = useSpecialCollection({
    pageSize: 8,
    chainId: 0,
    environment: 1,
  });

  const dataSelect = useMemo(() => {
    if (listSpecial && listSpecial.length > 0) {
      if (!selectCol) {
        setSelectCol(listSpecial[0].id);
        return listSpecial[0];
      }
      return listSpecial.find(i => i.id === selectCol)
    }

    return null
  }, [listSpecial, selectCol])

  const { collection } = useNftCollectionDetail({
    address: !dataSelect ? null : dataSelect.address,
    chainId: !dataSelect ? null : dataSelect.chainId
  });

  const renderBody = useCallback(() => {
    if (!listSpecial.length || !collection) {
      return (
        <VStack
          pt={{ base: "5%", }}
        >
          <Flex flex={1} justifyContent="center" alignItems="center">
            <Spinner color="#ee3824" size="lg" />
          </Flex>
        </VStack>
      )
    }
    return (
      <Grid
        w="full"
        gap={4}
        templateColumns="repeat(12, 1fr)"
      >

        <GridItem
          w='full'
          colSpan={{ base: 12, lg: 4, xl: 3 }}
        >

          <NftList
            nftList={listSpecial}
            selectCol={selectCol}
            setSelectCol={(e) => { setSelectCol(e) }}
            openModal={() => { setIsOpen(true) }}
          />

        </GridItem>

        <GridItem
          w='full'
          colSpan={{ base: 12, lg: 8, xl: 9 }}
          p={{ base: '10px', lg: '15px 20px', }}
          bg="white"
          borderRadius="8px"
          border={{ md: "1px solid #ffd3cb" }}
          boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
          display={{ base: "none", lg: "block" }}
        >

          <NftDetail
            collection={collection}
            selectCol={selectCol}
          />

        </GridItem>

      </Grid>
    )
  }, [collection, listSpecial, selectCol])


  return (
    <MainLayout>

      <WrapperHeaderMobile />

      <Box
        mr={{
          base: '10px',
        }}
        ml={{
          base: '5px',
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

        {renderBody()}

      </Box>


      <DetailModal
        isOpen={isOpen}
        selectCol={selectCol}
        collection={collection}
        onClose={() => { setIsOpen(false) }}
      />

    </MainLayout >
  )
}
