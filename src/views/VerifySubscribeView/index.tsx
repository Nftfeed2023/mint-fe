



import { Box, Center, HStack, Text, VStack } from "@chakra-ui/react"

import { FC, useMemo } from 'react'
import MainLayout from "~/layouts/MainLayout"

import WrapperHeaderMobile from "../../layouts/MasterLayout/WrapperHeaderMobile"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useQueryParams } from "use-query-params"
import { useVerifySubscribe } from "./hooks/useVerifySubscribe"
import { CheckCircleIcon, CheckIcon } from "@chakra-ui/icons"
import PrimaryButton from "~/components/PrimaryButton"
import LoadingContainer from "~/components/LoadingContainer"
import { MdErrorOutline } from "react-icons/md"
import { MAIN_ROUTERS } from "~/routes/routes"



function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}


type IVerifySubscribeViewProps = {
}

const VerifySubscribeView: FC<IVerifySubscribeViewProps> = (props: IVerifySubscribeViewProps) => {
  const query = useQuery();
  const navigate = useNavigate();

  const verifyCode = query.get("verifyCode") || "";
  const address = query.get("address") || "";
  const evmAddress = query.get("evmAddress") || "";
  const email = query.get("email") || "";

  const { subscribed, isLoading } = useVerifySubscribe({
    address, email, evmAddress, verifyCode
  })

  return (
    <MainLayout>

      <WrapperHeaderMobile />

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
        <LoadingContainer isLoading={isLoading}>
          <Center h={"400px"}>
            {isLoading && <Text fontSize={"50px"}>
              Waiting verify
            </Text>}
            {subscribed && <VStack >
              <Text fontSize={"50px"}>
                Verify success
              </Text>
              <CheckCircleIcon color={"green"} fontSize={"50px"} />
              <PrimaryButton w={"200px"} onClick={() => { navigate(`${MAIN_ROUTERS.NFT_COLLECTION}/${address}`) }}>
                Go to collection
              </PrimaryButton>
            </VStack>}
            {!subscribed && <VStack >
              <Text fontSize={"50px"}>
                Verify not success
              </Text>
              <MdErrorOutline color={"red"} fontSize={"50px"} />
            </VStack>}
          </Center>
        </LoadingContainer>
      </Box>
    </MainLayout>
  )
}
export default VerifySubscribeView;
