import { VStack } from "@chakra-ui/react"
import PrimaryButton from "~/components/PrimaryButton"


export const ClaimButton = () => {
  return (
    <VStack
      w="full"
      alignItems={"end"}
    >
      <PrimaryButton
        w={{ base: "full", md: "200px" }}
        onClick={() => {
        }}
      >
        Claim
      </PrimaryButton>
    </VStack>
  )
}
