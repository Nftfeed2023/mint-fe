import { VStack } from "@chakra-ui/react"
import PrimaryButton from "~/components/PrimaryButton"


export const DepositButton = () => {
  return (
    <VStack
      w="full"
      alignItems={"end"}
      order={{ base: 1, md: 2 }}
    >
      <PrimaryButton
        w={{ base: "full", md: "200px" }}
        onClick={() => {
        }}
      >
        Deposit
      </PrimaryButton>
    </VStack>
  )
}
