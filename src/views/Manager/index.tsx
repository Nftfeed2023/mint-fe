import { Box, HStack, Input, SimpleGrid, Stack, VStack } from "@chakra-ui/react";
import { FC, useCallback, useEffect, useState } from "react";
import ManagerLayout from "~/layouts/ManagerLayout";
import WrapperHeaderMobile from "~/layouts/MasterLayout/WrapperHeaderMobile";

import { useNavigate } from "react-router-dom";
import PrimaryButton from "~/components/PrimaryButton";
import { MANAGER_ROUTERS } from "~/routes/routes";
import NftCollectionCard from "./NftCollectionCard";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";
import { useManagerCollections } from "./hooks/useManagerCollections";
import { usePagination } from '@ajna/pagination';
import PaginationComponent from "~/components/Pagination";
import BoxLayout from "~/components/BoxLayout";

type IManagerViewProps = {};

const ManagerView: FC<IManagerViewProps> = (props: IManagerViewProps) => {


  const navigate = useNavigate();
  const { account: managerAddress } = useConnectWallet();

  const isShow = managerAddress === "0x934B04d4B0980cbd3Ba34A60b597Ed6b64605920" || managerAddress === "0x68a44D9306084DDBc7b53142A218cc9cAb795c63";

  const [keyword, setKeyword] = useState(null);;

  const { data, loadData, total } = useManagerCollections({ managerAddress });
  const pageSize = 20;

  useEffect(() => {
    loadData(1, keyword)
  }, [managerAddress])

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
      loadData(nextPage, keyword);
    },
    [keyword, loadData, setCurrentPage],
  )


  return (
    <ManagerLayout>
      <WrapperHeaderMobile />

      <BoxLayout>

        <Box
          w="full"
          p={{ base: '10px', lg: '15px 20px', }}
          bg="white"
          borderRadius="8px"
          border={{ md: "1px solid #ffd3cb" }}
          boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
        >
          <SimpleGrid
            w="full"
            spacing={2}
            columns={{ base: 1, md: 2 }}
            py={"20px"}
          >

            <HStack>

              <Input
                borderColor="#448AFF !important"
                borderWidth="1px"
                borderStyle="solid"
                placeholder="Search collection name or collection address"
                borderRadius="10px"
                fontSize="16px"
                lineHeight="20px"
                bg="#F7F9FA"
                value={keyword}
                onChange={(e) => { setKeyword(e.target.value) }}
              />

              <PrimaryButton
                w={"150px"}
                onClick={async () => {
                  await loadData(currentPage, keyword);
                }}
              >
                Search
              </PrimaryButton>

            </HStack>

            <VStack
              w={"full"}
              alignItems={"end"}
            >
              <HStack>

                <PrimaryButton
                  w={"150px"}
                  onClick={() => navigate(`${MANAGER_ROUTERS.CREATE_COLLECTION}`)}
                >
                  Create Collection
                </PrimaryButton>

                {isShow &&
                  <PrimaryButton
                    color={"#fff"}
                    w={"150px"}
                    onClick={() => navigate(MANAGER_ROUTERS.CRAWL)}
                  >
                    Crawl
                  </PrimaryButton>
                }

              </HStack>
            </VStack>

          </SimpleGrid>


          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              xl: 1
            }}
            spacing={4}
          >
            {data.map((item, idx) => {
              return <NftCollectionCard key={idx} {...item} />;
            })}
          </SimpleGrid>


          {total > 0 && total > pageSize && (
            <Stack justify="center">
              <Box>
                <PaginationComponent
                  pagesCount={pagesCount}
                  currentPage={currentPage}
                  isDisabled={false}
                  onPageChange={handlePageChange}
                  pages={pages}
                />
              </Box>
            </Stack>
          )}

        </Box>

      </BoxLayout>

    </ManagerLayout>
  );
};
export default ManagerView;
