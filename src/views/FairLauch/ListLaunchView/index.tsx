import { Box, Button, Container, Heading, SimpleGrid, Stack, VStack, Text, Image } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import BoxLayout from "~/components/BoxLayout"
import MainLayout from "~/layouts/MainLayout"
import WrapperHeaderMobile from "~/layouts/MasterLayout/WrapperHeaderMobile"
import { useConnectWallet } from "~/hooks/@global/useConnectWallet"
import { usePagination } from "@ajna/pagination"
import PaginationComponent from "~/components/Pagination"
import { useListLaunch } from "./useListLaunch"
import { Fragment, useCallback, useEffect } from "react"
import { ItemLaunch } from "./ItemLaunch"

import BannerIPad from "~/assets/images/feedipad.png"
import { MANAGER_ROUTERS } from "~/routes/routes"
import { Trending } from "./Trending"
import { CHAIN_CODE } from "~/@config/chain-code"

export const ListLaunchView = () => {

  const navigate = useNavigate();
  const { chainId, account } = useConnectWallet();
  const pageSize = 48;

  const {
    isLoading,
    total,
    listLaunch,
    loadListLaunch,
  } = useListLaunch();

  useEffect(() => { loadListLaunch(1) }, [loadListLaunch]);

  const { pages, pagesCount, currentPage, setCurrentPage } = usePagination({
    total,
    limits: {
      outer: 2,
      inner: 2,
    },
    initialState: {
      pageSize,
      isDisabled: false,
      currentPage: 1,
    },
  })

  const handlePageChange = useCallback(
    (nextPage: number): void => {
      // -> request new data using the page number
      setCurrentPage(nextPage)
      console.log('request new data with ->', nextPage)
      loadListLaunch(nextPage);
    },
    [setCurrentPage,],
  )

  return (
    <MainLayout>

      <WrapperHeaderMobile />

      <BoxLayout>

        <Box
          overflow="hidden"
        >

          <Container maxW={'3xl'}>
            <Stack
              as={Box}
              textAlign={'center'}
              spacing={{ base: 4, md: 6 }}
            >
              <Heading
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                lineHeight={'110%'}>
                FEEDIPAD | The Multichain Launchpad of NFTFeed
              </Heading>
              <Text color={'gray.500'}>
                Enter FEEDIPAD, the ultimate launchpad designed to cater to NFTFeed and the broader crypto field. With its unique multichain capabilities and a range of groundbreaking features, FEEDIPAD is set to revolutionize the NFT & token sale landscape.
              </Text>
              <VStack
                w="full"
              >

                <SimpleGrid
                  w="full"
                  spacing={2}
                  columns={{ base: 1, md: 2 }}
                >

                  <VStack alignItems={"end"}>
                    <Button
                      colorScheme={'green'}
                      rounded={'full'}
                      px={6}
                      bg="yellow.primary !important"
                      color="black.1d"
                      w={{ base: "full", md: "fit-content" }}
                      fontSize={{ base: "13px", md: "16px" }}
                      onClick={() => {
                        navigate(MANAGER_ROUTERS.CREATE_PRESALE)
                      }}
                    >
                      Create Token Fairlaunch
                    </Button>
                  </VStack>

                  <VStack alignItems={"start"}>
                    <Button
                      colorScheme={'green'}
                      rounded={'full'}
                      px={6}
                      bg="yellow.primary !important"
                      color="black.1d"
                      w={{ base: "full", md: "fit-content" }}
                      fontSize={{ base: "13px", md: "16px" }}
                      onClick={() => {
                        navigate(MANAGER_ROUTERS.CREATE_TOKEN)
                      }}
                    >
                      Create Token
                    </Button>
                  </VStack>

                </SimpleGrid>

              </VStack>
            </Stack>
          </Container>

        </Box>

        <VStack w="full" pt="30px" spacing={6}>

          <Trending />

          <SimpleGrid
            w="full"
            spacing={3}
            columns={{ base: 1, md: 2, lg: 4, '3xl': 5 }}
          >

            {listLaunch && listLaunch.filter(i =>
              i.chainId !== CHAIN_CODE.BSC_TESTNET
              && i.chainId !== CHAIN_CODE.BLAST_TESTNET
            ).map((item, idx) => {

              return (
                <Fragment key={idx}>
                  <ItemLaunch
                    itemLaunch={item}
                  />
                </Fragment>
              )
            })
            }

          </SimpleGrid>

          {!isLoading && listLaunch.length > 48 &&
            <PaginationComponent
              pagesCount={pagesCount}
              currentPage={currentPage}
              isDisabled={isLoading}
              onPageChange={handlePageChange}
              pages={pages}
            />
          }

        </VStack>

      </BoxLayout>

    </MainLayout>
  )
}
