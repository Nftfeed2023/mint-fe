import {
  Box, Spinner, VStack, Text
} from "@chakra-ui/react";
import BoxLayout from "~/components/BoxLayout";
import MainLayout from "~/layouts/MainLayout";
import WrapperHeaderMobile from "~/layouts/MasterLayout/WrapperHeaderMobile";
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDetailLaunch } from "./useDetailLaunch";
import { DetailLaunch } from "./DetailLaunch";
import PrimaryButton from "~/components/PrimaryButton";
import { ReactComponent as NotFoundIcon } from '~/assets/svgs/not_found.svg'

export const DetailLaunchView = () => {

  const { chainId, presaleAddress } = useParams();
  const navigate = useNavigate()
  const { isLoading, detailLaunch, loadDetailLaunch } = useDetailLaunch();

  useEffect(() => {
    if (chainId && presaleAddress) {
      loadDetailLaunch(chainId, presaleAddress);
    }
  }, [chainId, presaleAddress]);

  return (
    <MainLayout>

      <WrapperHeaderMobile />

      <BoxLayout>

        <Box w="full" px={{ base: "5px", "2xl": "150px" }}>
          {isLoading ?
            <VStack
              w="full"
              bg="white"
              borderRadius="8px"
              border={{ md: "1px solid #ffd3cb" }}
              boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
              py="10vh"
            >
              <Spinner color="#ee3824" size="lg" />
            </VStack>
            :
            (detailLaunch
              ? <DetailLaunch
                detailLaunch={detailLaunch}
              />
              : <VStack
                w="full"
                bg="white"
                borderRadius="8px"
                border={{ md: "1px solid #ffd3cb" }}
                boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
                py="10vh"
              >

                <VStack spacing="40px">
                  <NotFoundIcon />
                  <Text
                    color="grey.66"
                    textAlign="center"
                    fontSize="18px"
                    lineHeight="24px"
                  >
                    The page is not found
                  </Text>
                  <div>
                    <PrimaryButton
                      fontSize="20px"
                      lineHeight="23px"
                      fontWeight="500"
                      letterSpacing="-0.5px"
                      paddingRight="33px"
                      paddingLeft="33px"
                      onClick={() => navigate('/feedipad')}
                    >
                      Go to FeediPad
                    </PrimaryButton>
                  </div>
                </VStack>

              </VStack>
            )
          }

        </Box>

      </BoxLayout>

    </MainLayout>
  );
};
