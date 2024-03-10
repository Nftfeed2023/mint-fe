import { CopyIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  Image,
  Text,
  HStack,
  VStack,
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { FC, useCallback, useRef, useState } from "react";
import { EVM_CHAIN_LIST } from "~/@config/chain-list";
import { getBaseUrl, pipeLongTextUi } from "~/common/utils/common.utils";
import PrimaryButton from "~/components/PrimaryButton";
import SecondaryButton from "~/components/SecondaryButton";
import { NftCollectionDto } from "~/dto/nft-project.dto";
import useCopyToClipboard from "~/hooks/@global/useCopyToClipboard";
import { MAIN_ROUTERS, MANAGER_ROUTERS } from "~/routes/routes";
import { useMint } from "~/views/FreeMintView/hooks/useMint";
import { usePromotion } from "./hooks/usePromotion";
import { TiPencil } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import NoImg from "~/assets/images/no_img.png"
import { wlAccounts } from "~/common/code.helper";
import { useConnectWallet } from "~/hooks/@global/useConnectWallet";

interface INftCollectionCardProps extends NftCollectionDto { }

const NftCollectionCard: FC<INftCollectionCardProps> = (
  props: INftCollectionCardProps
) => {
  const {
    name,
    image,
    address,
    chainId,
    desc,
    symbol,
    endTime,
    exactPrice,
    price,
    versionFactory,
    campaignId,
  } = props;
  const [, copy] = useCopyToClipboard();
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [openCampaign, setOpenCampaign] = useState(false);
  const { account } = useConnectWallet();

  const { logo: chainLogo, chainName = "" } = EVM_CHAIN_LIST[chainId] || {
    logo: "",
    chainName: "",
  };

  const link = `${getBaseUrl()}${MAIN_ROUTERS.NFT_COLLECTION
    }/${chainId}/${address}`;

  const { qtyMintedCollection, maxTotalSupply } = useMint({
    address,
    versionFactory,
  });

  const [promotionData, setPromotionData] = useState({
    qtys: "",
    percents: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLoading, update } = usePromotion();

  const updatePromotion = useCallback(() => {
    const { percents, qtys } = promotionData;

    update(
      {
        address,
        qtys: (JSON.parse(qtys) as any[]).map((v) => Number(v)),
        percents: (JSON.parse(percents) as any[]).map((v) => Number(v) * 100),
      },
      onClose
    );
  }, [address, onClose, promotionData, update]);

  return (
    <>
      <Card p="5px">

        <Grid
          w="full"
          p={{ base: '0', lg: '1px 10px  1px', }}
          gap={2}
          templateColumns="repeat(12, 1fr)"
        >

          <GridItem
            w='full'
            colSpan={{ base: 12, xl: 1 }}
            alignSelf={"center"}
          >

            {image.includes(".mp4") ? (
              <Box h="80px" w="100%">
                <video
                  // loop
                  ref={videoRef}
                  style={{
                    borderRadius: "6px",
                    width: "100%",
                    height: "80px",
                    objectFit: "cover",
                  }}
                  //@ts-ignore
                  autoPlay={true}
                  //@ts-ignore
                  playsInline="playsInline"
                  //@ts-ignore
                  muted="muted"
                  src={image}
                  poster={NoImg}
                ></video>
              </Box>
            ) : (
              <Image
                h={"80px"}
                maxH="80px"
                overflow="hidden"
                w={"full"}
                src={image}
                alt={`logo_${name}`}
                objectFit={"cover"}
                _hover={{
                  transform: "scale(1.05)",
                }}
                borderRadius="6px"
                fallbackSrc={NoImg}
              />
            )}
          </GridItem>

          <GridItem
            w='full'
            colSpan={{ base: 12, xl: 2 }}
            alignSelf={"center"}
          >
            <VStack>
              <Heading size="xs" fontWeight={700} noOfLines={1}>
                {name}
              </Heading>
            </VStack>
          </GridItem>

          <GridItem
            w='full'
            colSpan={{ base: 12, xl: 2 }}
            alignSelf={"center"}
          >
            <VStack
              w="full"
              alignItems={'start'}
            >

              <HStack>
                <Text fontSize="xs">Chain</Text>
                <Image src={chainLogo} w="18px" h="18px" />
              </HStack>

              <HStack>
                <Text fontSize="xs">Minted</Text>
                <Text color="blue.600" fontSize="xs" fontWeight={700}>
                  {qtyMintedCollection}/{maxTotalSupply}
                </Text>
              </HStack>

              <HStack>
                <Text fontSize="xs">End Time</Text>
                <Text color="blue.600" fontSize="xs" fontWeight={700}>
                  {dayjs(endTime).format("YYYY/MM/DD HH:mm")}
                </Text>
              </HStack>

            </VStack>

          </GridItem>

          <GridItem
            w='full'
            colSpan={{ base: 12, xl: 7 }}
            alignSelf={"center"}
          >

            <SimpleGrid
              w={"full"}
              spacing={2}
              columns={{
                base: 1,
                md: 2,
                xl: 4
              }}
            >

              <Button
                w={"full"}
                fontSize={"13px"}
                colorScheme="linkedin"
                onClick={() => {
                  navigate(
                    `${MANAGER_ROUTERS.EDIT_COLLECTION}/${chainId}/${address}`
                  );
                }}
                leftIcon={<TiPencil />}
              >
                Edit
              </Button>

              <Button
                w={"full"}
                fontSize={"13px"}
                colorScheme="linkedin"
                onClick={() => {
                  navigate(
                    `${MANAGER_ROUTERS.EDIT_COLLECTION_ON_CHAIN}/${chainId}/${address}`
                  );
                }}
                leftIcon={<TiPencil />}
              >
                Edit OnChain
              </Button>

              <PrimaryButton
                w={"100%"}
                fontSize={"13px"}
                leftIcon={<CopyIcon />}
                onClick={() => copy(link)}
              >
                Copy link
              </PrimaryButton>

              <SecondaryButton
                fontSize={"13px"}
                onClick={() => window.open(link)}
              >
                View collection
              </SecondaryButton>

              {account && wlAccounts.includes(account.toLowerCase()) &&
                <>

                  {campaignId
                    ? <>
                      <SecondaryButton
                        fontSize={"13px"}
                        onClick={() => {
                          navigate(
                            `${MANAGER_ROUTERS.MANAGER_CAMPAIGN}/${campaignId}`
                          );
                        }}
                        color={"red"}
                      >
                        Edit Campaign
                      </SecondaryButton>
                      {/* <SecondaryButton
                        fontSize={"13px"}
                        onClick={() => {

                        }}
                        color={"red"}
                      >
                        Finalize Campaign
                      </SecondaryButton> */}
                    </>
                    : <SecondaryButton
                      fontSize={"13px"}
                      onClick={() => {
                        navigate(
                          `${MANAGER_ROUTERS.CREATE_CAMPAIGN}/${chainId}/${address}`
                        );
                      }}
                      color={"red"}
                    >
                      Set Up Campaign
                    </SecondaryButton>
                  }

                </>
              }

            </SimpleGrid>

            {/* <Button w={"100%"}
              colorScheme="cyan"
              onClick={onOpen}
            >
              Setup Promotion
            </Button> */}


          </GridItem>

        </Grid>

        {/* <CardBody>
          {image.includes(".mp4") ? (
            <Box h="140px" w="100%">
              <video
                // loop
                ref={videoRef}
                style={{
                  borderRadius: "6px",
                  width: "100%",
                  height: "140px",
                  objectFit: "cover",
                }}
                //@ts-ignore
                autoPlay={true}
                //@ts-ignore
                playsInline="playsInline"
                //@ts-ignore
                muted="muted"
                src={image}
                poster={NoImg}
              ></video>
            </Box>
          ) : (
            <Image
              h={"140px"}
              maxH="140px"
              overflow="hidden"
              w={"full"}
              src={image}
              alt={`logo_${name}`}
              objectFit={"cover"}
              _hover={{
                transform: "scale(1.05)",
              }}
              borderRadius="6px"
              fallbackSrc={NoImg}
            />
          )}

          <Stack mt="6" spacing={2}>

            <Heading size="xs" fontWeight={700} noOfLines={1}>
              {name}
            </Heading>

            <HStack>
              <Text fontSize="xs">Chain</Text>
              <Image src={chainLogo} w="18px" h="18px" />
            </HStack>

            <HStack>
              <Text fontSize="xs">Minted</Text>
              <Text color="blue.600" fontSize="xs" fontWeight={700}>
                {qtyMintedCollection}/{maxTotalSupply}
              </Text>
            </HStack>

            <HStack>
              <Text fontSize="xs">End Time</Text>
              <Text color="blue.600" fontSize="xs" fontWeight={700}>
                {dayjs(endTime).format("YYYY/MM/DD HH:mm")}
              </Text>
            </HStack>
          </Stack>
        </CardBody> */}

        {/* <VStack spacing={2}>

          <Button w={"100%"}
            colorScheme="cyan"
            onClick={onOpen}
          >
            Setup Promotion
          </Button>

          <Button
            w={"full"}
            fontSize={"13px"}
            colorScheme="linkedin"
            onClick={() => {
              navigate(
                `${MANAGER_ROUTERS.EDIT_COLLECTION}/${chainId}/${address}`
              );
            }}
            leftIcon={<TiPencil />}
          >
            Edit
          </Button>

          <Button
            w={"full"}
            fontSize={"13px"}
            colorScheme="linkedin"
            onClick={() => {
              navigate(
                `${MANAGER_ROUTERS.EDIT_COLLECTION_ON_CHAIN}/${chainId}/${address}`
              );
            }}
            leftIcon={<TiPencil />}
          >
            Edit OnChain
          </Button>

          <PrimaryButton
            w={"100%"}
            fontSize={"13px"}
            leftIcon={<CopyIcon />}
            onClick={() => copy(link)}
          >
            Copy link
          </PrimaryButton>

          <SecondaryButton
            fontSize={"13px"}
            onClick={() => window.open(link)}
          >
            View collection
          </SecondaryButton>

          {account && wlAccounts.includes(account.toLowerCase()) &&
            <>

              {campaignId
                ? <SecondaryButton
                  fontSize={"13px"}
                  onClick={() => {
                    navigate(
                      `${MANAGER_ROUTERS.MANAGER_CAMPAIGN}/${campaignId}`
                    );
                  }}
                  color={"red"}
                >
                  Manager Campaign
                </SecondaryButton>
                : <SecondaryButton
                  fontSize={"13px"}
                  onClick={() => {
                    navigate(
                      `${MANAGER_ROUTERS.CREATE_CAMPAIGN}/${chainId}/${address}`
                    );
                  }}
                  color={"red"}
                >
                  Create Campaign
                </SecondaryButton>
              }

            </>
          }

        </VStack> */}

      </Card>

      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent maxWidth="642px" w="100%" borderRadius="12px" mx="15px">
          <ModalHeader bg="#FFFFFF" borderRadius="12px" />
          <ModalCloseButton bg="#FFF" />
          <ModalBody bg="#FFFFFF" px="15px" borderRadius="12px">
            <FormControl mb="3">
              <FormLabel>promotioQtys</FormLabel>
              <Input
                name="qtys"
                value={promotionData.qtys}
                placeholder="qtys"
                onChange={(e) =>
                  setPromotionData({
                    ...promotionData,
                    qtys: e.target.value,
                  })
                }
                onBlur={(e) => { }}
                borderColor="#448AFF !important"
                borderWidth="1px"
                borderStyle="solid"
                borderRadius="10px"
                textAlign="left"
                fontWeight="500"
                fontSize="16px"
                lineHeight="20px"
                bg="#F7F9FA"
                disabled={false}
              />
            </FormControl>
            <FormControl mb="3">
              <FormLabel>promotionPercent</FormLabel>
              <Input
                name="percents"
                value={promotionData.percents}
                placeholder="percents"
                onChange={(e) =>
                  setPromotionData({
                    ...promotionData,
                    percents: e.target.value,
                  })
                }
                onBlur={(e) => { }}
                borderColor="#448AFF !important"
                borderWidth="1px"
                borderStyle="solid"
                borderRadius="10px"
                textAlign="left"
                fontWeight="500"
                fontSize="16px"
                lineHeight="20px"
                bg="#F7F9FA"
                disabled={false}
              />
            </FormControl>
            <Divider mt="20px" mb="20px" />
          </ModalBody>
          <ModalFooter>
            <PrimaryButton variant="ghost" onClick={updatePromotion}>
              Update
            </PrimaryButton>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  );
};
export default NftCollectionCard;
