import {
  Box, Text, VStack,
} from '@chakra-ui/react';

import WrapperHeaderMobile from '~/layouts/MasterLayout/WrapperHeaderMobile';

import ManagerLayout from '~/layouts/ManagerLayout';
import EditCollectionOnChainForm from "./EditCollectionOnChainForm";
import { useParams } from "react-router-dom";
import BoxLayout from '~/components/BoxLayout';




const EditCollectionOnChainView = () => {

  const { chainId, address } = useParams();
  return (
    <ManagerLayout>

      <WrapperHeaderMobile />

      <BoxLayout>

        <Box w="full" px={{ base: "5px", "2xl": "150px" }}>

          <VStack
            w="full"
          >

            <Box
              w="full"
            >

              <VStack
                bg="white"
                borderRadius="8px"
                border={{ md: "1px solid #ffd3cb" }}
                boxShadow="0px 0px 14px rgba(186, 186, 186, 0.25)"
              >

                <VStack
                  w="full"
                  maxW={800}
                  p="20px 5px"
                >
                  <EditCollectionOnChainForm chainId={Number(chainId)} />
                </VStack>

              </VStack>

            </Box>

          </VStack>

        </Box>
      </BoxLayout>

    </ManagerLayout>
  )
}

export default EditCollectionOnChainView;
