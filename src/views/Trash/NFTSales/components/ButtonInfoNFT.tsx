import {
  Box,
  Image,
  Text,
  HStack,
  Spacer,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react'

import { ReactComponent as NFTInfoIcon } from '~/assets/svgs/nft-info.svg'
import { ReactComponent as CopyIcon } from '~/assets/svgs/copy.svg'
import BNBIcon from '~/components/Icons/BNB'

const ButtonInfoNFT = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button bg="transparent !important">
        <Box
          w="30px"
          h="30px"
          bgColor="white"
          borderRadius="30px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          onClick={onOpen}
          cursor="pointer"
        >
          <Icon as={NFTInfoIcon} w="20px" h="20px" />
        </Box>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent maxW="489px">
          <ModalHeader>NFT Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              h={'318px'}
              maxH="318px"
              overflow="hidden"
              w={'full'}
              src={'/assets/images/demo/nft-demo.png'}
              objectFit={'cover'}
              _groupHover={{
                transform: 'scale(1.1)',
              }}
              borderRadius="6px"
            />
            <Text
              mt="24px"
              fontSize="24px"
              lineHeight="28px"
              fontWeight="700"
              color="black"
              textAlign="center"
              textTransform="capitalize"
            >
              diamond box
            </Text>
            <HStack>
              <Text
                fontSize="18px"
                lineHeight="21px"
                fontWeight="400"
                color="rgba(31, 34, 40, 0.89)"
                textTransform="capitalize"
              >
                Price:
              </Text>
              <Spacer />
              <HStack>
                <BNBIcon />
                <Text
                  fontSize="18px"
                  lineHeight="21px"
                  fontWeight="600"
                  color="#00052E"
                >
                  500 BUSD
                </Text>
              </HStack>
            </HStack>

            <HStack mt="12px">
              <Text
                fontSize="18px"
                lineHeight="21px"
                fontWeight="400"
                color="rgba(31, 34, 40, 0.89)"
                textTransform="capitalize"
              >
                Total bought/ Pool allocation:
              </Text>
              <Spacer />
              <Text
                fontSize="18px"
                lineHeight="21px"
                fontWeight="600"
                color="#00052E"
              >
                533/533 NFTs
              </Text>
            </HStack>
            <HStack mt="12px">
              <Text
                fontSize="18px"
                lineHeight="21px"
                fontWeight="400"
                color="rgba(31, 34, 40, 0.89)"
                textTransform="capitalize"
              >
                Token:
              </Text>
              <Spacer />
              <Text
                fontSize="18px"
                lineHeight="21px"
                fontWeight="600"
                color="#00052E"
              >
                ERC721
              </Text>
            </HStack>
            <HStack mt="12px">
              <Text
                fontSize="18px"
                lineHeight="21px"
                fontWeight="400"
                color="rgba(31, 34, 40, 0.89)"
                textTransform="capitalize"
              >
                Total supply:
              </Text>
              <Spacer />
              <Text
                fontSize="18px"
                lineHeight="21px"
                fontWeight="600"
                color="#00052E"
              >
                100,000
              </Text>
            </HStack>
            <Text
              mt="12px"
              fontSize="18px"
              lineHeight="21px"
              fontWeight="400"
              color="rgba(31, 34, 40, 0.89)"
              textTransform="capitalize"
            >
              NFT address:
            </Text>
            <HStack w="100%" mt="4px">
              <Box flex={1}>
                <Text
                  fontSize="18px"
                  lineHeight="21px"
                  fontWeight="500"
                  color="#00052E"
                  w="100%"
                >
                  0x21350764A49B7dF406e571201d483510af98f83B
                </Text>
              </Box>
              <Box>
                <Icon as={CopyIcon} />
              </Box>
            </HStack>
            <Text
              mt="12px"
              fontSize="18px"
              lineHeight="21px"
              fontWeight="400"
              color="rgba(31, 34, 40, 0.89)"
              textTransform="capitalize"
            >
              Description:
            </Text>
            <Text
              mt="4px"
              fontSize="18px"
              lineHeight="21px"
              fontWeight="500"
              color="#00052E"
            >
              With 1.4 billion people worldwide learning English, the social and
              economic impacts could be enormous. With paid learning, many
              millions of people could improve their economic and social
              mobility and earn a meaningful income in the process.
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ButtonInfoNFT
