import { Box, Text, VStack } from "@chakra-ui/react";

import WrapperHeaderMobile from "~/layouts/MasterLayout/WrapperHeaderMobile";

import ManagerLayout from "~/layouts/ManagerLayout";
import CreateCollectionForm from "./CreateCollectionForm";
import BoxLayout from "~/components/BoxLayout";
// import 'react-quill/dist/quill.snow.css';

export const CreateCollectionView = () => {
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

                  <Text fontSize="3xl" fontWeight={"bold"}>
                    NFT Collection Setup
                  </Text>

                  <CreateCollectionForm />

                </VStack>

              </VStack>

            </Box>

          </VStack>

        </Box>
      </BoxLayout>

    </ManagerLayout>
  );
};
